"""C盘垃圾清理 · 桌面应用程序入口

用 pywebview（Windows 上基于 Edge WebView2 的原生窗口）承载前端界面，
后台线程运行本地 HTTP 服务（复用 server.py 封装的 查找文件.py 核心逻辑）。

源码运行：    python desktop.py
打包产物：    c-clean.exe（单文件，双击或终端输入 c-clean 运行）

空白窗口问题的根治：目标设备缺少 Edge WebView2 运行时时，pywebview 只在
内部日志里记录失败（窗口化打包后完全不可见），窗口保持空白。因此启动前
先检测运行时，缺失时经用户确认后从微软官方源下载引导器静默安装。

隐私说明：本程序完全本地运行，不收集、不上传任何数据；唯一可能的网络
访问是用户主动确认后的 WebView2 运行时安装（仅访问微软官方下载地址）。
"""

import os
import socket
import subprocess
import sys
import tempfile
import threading
import time
import urllib.request

import webview

import server

# 微软官方 Evergreen 引导器（仅在系统缺少 WebView2 运行时且用户同意时下载）
WEBVIEW2_BOOTSTRAPPER = 'https://go.microsoft.com/fwlink/p/?LinkId=2124703'
WEBVIEW2_DOWNLOAD_PAGE = 'https://developer.microsoft.com/microsoft-edge/webview2/'
WEBVIEW2_REG_KEYS = (
    r'SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients'
    r'\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}',
    r'SOFTWARE\Microsoft\EdgeUpdate\Clients'
    r'\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}',
)


def webview2_runtime_present() -> bool:
    """检测系统是否已安装 Edge WebView2 运行时（注册表 Evergreen 标记）。"""
    try:
        import winreg

        for hive in (winreg.HKEY_LOCAL_MACHINE, winreg.HKEY_CURRENT_USER):
            for subkey in WEBVIEW2_REG_KEYS:
                try:
                    with winreg.OpenKey(hive, subkey):
                        return True
                except OSError:
                    continue
    except ImportError:
        pass
    return False


def ensure_webview2() -> bool:
    """确保 WebView2 运行时可用；缺失时征得同意后自动安装。返回是否可继续。"""
    if webview2_runtime_present():
        return True

    if not _ask(
        '运行本程序需要 Microsoft Edge WebView2 运行时（免费系统组件，'
        '当前未安装，这也是窗口空白的常见原因）。\n\n'
        '是否现在从微软官方网站下载并自动安装？\n'
        '（安装可能弹出系统授权提示，预计需要 1~2 分钟）'
    ):
        _fatal(
            '未安装 WebView2 运行时，界面无法显示。\n\n'
            f'请手动下载安装后重试：\n{WEBVIEW2_DOWNLOAD_PAGE}'
        )
        return False

    bootstrapper = os.path.join(tempfile.gettempdir(), 'MicrosoftEdgeWebview2Setup.exe')
    try:
        _download(WEBVIEW2_BOOTSTRAPPER, bootstrapper)
    except OSError as e:
        _fatal(f'WebView2 运行时下载失败：{e}\n\n请手动安装：\n{WEBVIEW2_DOWNLOAD_PAGE}')
        return False

    try:
        # /silent /install 为微软官方支持的静默安装参数（会触发一次 UAC 授权）
        subprocess.run(
            [bootstrapper, '/silent', '/install'],
            timeout=600,
            check=False,
        )
    except (OSError, subprocess.TimeoutExpired) as e:
        _fatal(f'WebView2 运行时安装未能完成：{e}\n\n请手动安装：\n{WEBVIEW2_DOWNLOAD_PAGE}')
        return False
    finally:
        try:
            os.remove(bootstrapper)
        except OSError:
            pass

    # 安装器写入注册表可能略有延迟，轮询等待最多 60 秒
    for _ in range(60):
        if webview2_runtime_present():
            return True
        time.sleep(1)

    _fatal(
        'WebView2 运行时安装后仍未能检测到。\n\n'
        f'请重启系统后重试，或手动安装：\n{WEBVIEW2_DOWNLOAD_PAGE}'
    )
    return False


def _download(src: str, dst: str, timeout: float = 60.0) -> None:
    with urllib.request.urlopen(src, timeout=timeout) as resp, open(dst, 'wb') as out:
        while chunk := resp.read(1024 * 64):
            out.write(chunk)


def _ask(message: str) -> bool:
    """无控制台环境下用系统消息框提问，返回用户是否选择「是」。"""
    import ctypes

    MB_YESNO = 0x4
    MB_ICONQUESTION = 0x20
    IDYES = 6
    return (
        ctypes.windll.user32.MessageBoxW(
            None, message, 'C盘垃圾清理', MB_YESNO | MB_ICONQUESTION
        )
        == IDYES
    )


def _fatal(message: str) -> None:
    """打包为无控制台应用时，用系统消息框报告致命错误。"""
    print(message, file=sys.stderr)
    try:
        import ctypes

        MB_ICONERROR = 0x10
        ctypes.windll.user32.MessageBoxW(None, message, 'C盘垃圾清理', MB_ICONERROR)
    except Exception:  # noqa: BLE001
        pass


def _wait_for_server(host: str, port: int, timeout: float = 10.0) -> bool:
    """等待本地 HTTP 服务真正开始接受连接，避免窗口先于服务就绪导致加载失败。"""
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            with socket.create_connection((host, port), timeout=0.5):
                return True
        except OSError:
            time.sleep(0.1)
    return False


def main() -> int:
    # 0. 前置检测 WebView2 运行时（根治目标设备空白窗口问题）
    if not ensure_webview2():
        return 1

    # 1. 在本机空闲端口上启动 HTTP 服务（前端静态资源 + 扫描/清理 API）
    try:
        httpd = server.create_server(port=0)  # port=0 → 由系统分配空闲端口
    except OSError as e:
        _fatal(f'本地服务启动失败: {e}')
        return 1
    port = httpd.server_address[1]
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    if not _wait_for_server(server.HOST, port):
        _fatal('本地服务未能就绪，请稍后重试。')
        return 1

    # 2. 打开原生桌面窗口（1280×800 基准视口）
    url = f'http://{server.HOST}:{port}/'
    window = webview.create_window(
        'C盘垃圾清理',
        url,
        width=1280,
        height=800,
        min_size=(1000, 640),
        background_color='#FAF9FD',
    )

    def on_closed():
        # 窗口关闭后停止后台服务，进程随之退出
        httpd.shutdown()
        httpd.server_close()

    window.events.closed += on_closed

    try:
        # 显式指定 edgechromium 后端，避免任何静默回退到无法渲染现代前端的引擎
        webview.start(gui='edgechromium')
    except Exception as e:  # noqa: BLE001
        _fatal(f'窗口创建失败: {e}\n\n请确认系统已安装 WebView2 运行时：\n{WEBVIEW2_DOWNLOAD_PAGE}')
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
