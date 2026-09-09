"""C盘垃圾清理 · 局域网一键安装分发服务器

在本机运行后，同一局域网内的其他 Windows 设备只需在终端执行一条命令，
即可完成「下载 → 安装 → 注册 PATH/快捷方式 → 启动」：

    irm http://<本机IP>:9000/i | iex

用法：
    python share.py            # 默认端口 9000
    python share.py 8888       # 自定义端口
按 Ctrl+C 停止。
"""

import json
import socket
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
EXE = ROOT / 'build-app' / 'c-clean.exe'
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 9000

if not EXE.is_file():
    print('未找到 build-app/c-clean.exe，请先运行 install.ps1 完成打包。')
    sys.exit(1)


def lan_ips():
    """获取本机所有局域网 IPv4 地址。"""
    ips = []
    try:
        hostname = socket.gethostname()
        for info in socket.getaddrinfo(hostname, None, socket.AF_INET):
            ip = info[4][0]
            if not ip.startswith('127.') and ip not in ips:
                ips.append(ip)
    except OSError:
        pass
    # 兜底：UDP 连接法（不真正发包）
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        if ip not in ips:
            ips.insert(0, ip)
    except OSError:
        pass
    return ips or ['127.0.0.1']


def build_install_ps1(host: str) -> str:
    """生成在目标设备上执行的安装脚本（内嵌本机地址）。"""
    return f'''# C盘垃圾清理 · 一键安装（来自局域网分发服务器）
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$src = 'http://{host}/c-clean.exe'
$dir = Join-Path $env:LOCALAPPDATA 'Programs\\c-drive-cleaner'
$exe = Join-Path $dir 'c-clean.exe'

Write-Host '==> 正在下载 C盘垃圾清理（约 20 MB）…' -ForegroundColor Cyan
$tmp = Join-Path $env:TEMP 'c-clean-setup.exe'
Invoke-WebRequest -Uri $src -OutFile $tmp -UseBasicParsing

Write-Host '==> 正在安装…' -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $dir | Out-Null
Move-Item $tmp $exe -Force

# 注册用户 PATH（幂等）
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -notlike "*$dir*") {{
    [Environment]::SetEnvironmentVariable('Path', "$userPath;$dir", 'User')
}}

# 开始菜单快捷方式
$scPath = Join-Path $env:APPDATA 'Microsoft\\Windows\\Start Menu\\Programs\\C盘垃圾清理.lnk'
$shell = New-Object -ComObject WScript.Shell
$sc = $shell.CreateShortcut($scPath)
$sc.TargetPath = $exe
$sc.WorkingDirectory = $dir
$sc.IconLocation = $exe
$sc.Description = 'C盘垃圾清理桌面应用'
$sc.Save()

# WebView2 运行时检测（缺失会导致应用窗口空白）
$wv2Keys = @(
    'HKLM:\SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}}',
    'HKLM:\SOFTWARE\Microsoft\EdgeUpdate\Clients\{{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}}',
    'HKCU:\SOFTWARE\Microsoft\EdgeUpdate\Clients\{{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}}'
)
$hasWv2 = $false
foreach ($k in $wv2Keys) {{ if (Test-Path $k) {{ $hasWv2 = $true }} }}
if (-not $hasWv2) {{
    Write-Host '==> 检测到缺少 Edge WebView2 运行时（界面显示必需），正在从微软官方下载安装…' -ForegroundColor Yellow
    $wv2Setup = Join-Path $env:TEMP 'MicrosoftEdgeWebview2Setup.exe'
    Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/p/?LinkId=2124703' -OutFile $wv2Setup -UseBasicParsing
    Start-Process -FilePath $wv2Setup -ArgumentList '/silent','/install' -Wait
    Remove-Item $wv2Setup -Force -ErrorAction SilentlyContinue
    Write-Host '    WebView2 运行时安装完成' -ForegroundColor Green
}} else {{
    Write-Host '==> WebView2 运行时已就绪' -ForegroundColor Green
}}

Write-Host '==> 安装完成，正在启动应用…' -ForegroundColor Cyan
Start-Process -FilePath $exe
Write-Host ''
Write-Host '安装成功！' -ForegroundColor Green
Write-Host '  · 以后在任意新终端输入命令:  c-clean'
Write-Host '  · 或开始菜单搜索「C盘垃圾清理」'
Write-Host ''
'''


PAGE = '''<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>C盘垃圾清理 · 局域网安装</title>
<style>
  body {{ font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif; background: #faf9fd; color: #1b1b1f;
         max-width: 760px; margin: 48px auto; padding: 0 24px; }}
  h1 {{ color: #0b57d0; }}
  .cmd {{ background: #1b1b1f; color: #f2f0f4; padding: 14px 18px; border-radius: 14px;
         font-family: Consolas, monospace; font-size: 15px; word-break: break-all; position: relative; }}
  .cmd b {{ color: #a8c7fa; }}
  .tip {{ color: #44474e; line-height: 1.7; }}
  code {{ background: #e9e8ef; padding: 2px 8px; border-radius: 8px; }}
</style>
</head>
<body>
<h1>C盘垃圾清理 · 局域网安装页</h1>
<p class="tip">在<b>同一局域网</b>的其他 Windows 电脑上，以管理员或普通用户打开 <b>PowerShell</b>，执行：</p>
<div class="cmd">irm <b>http://{host}/i</b> | iex</div>
<p class="tip">该命令会自动完成：下载应用 → 安装到用户目录 → 注册 <code>c-clean</code> 命令 →
创建开始菜单快捷方式 → <b>立即启动应用</b>。</p>
<p class="tip">需要 Windows 10/11（64 位）+ Edge WebView2 运行时（系统预装）。</p>
</body>
</html>
'''


class Handler(BaseHTTPRequestHandler):
    server_version = 'CCleanShare/1.0'

    def log_message(self, fmt, *args):
        print(f'  [{self.client_address[0]}] {self.command} {self.path}')

    # ---- 工具 ----
    def _text(self, body: str, ctype: str):
        raw = body.encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(raw)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        path = self.path.split('?')[0]
        host = self.headers.get('Host') or f'127.0.0.1:{PORT}'
        # HEAD 请求只发响应头不发正文（部分安全软件会探测）
        head_only = self.command == 'HEAD'
        if path in ('/', '/index.html'):
            self._text(PAGE.format(host=host), 'text/html; charset=utf-8')
        elif path in ('/i', '/install.ps1', '/install'):
            self._text(build_install_ps1(host), 'text/plain; charset=utf-8')
        elif path == '/c-clean.exe':
            self.send_response(200)
            self.send_header('Content-Type', 'application/octet-stream')
            self.send_header('Content-Length', str(EXE.stat().st_size))
            self.send_header('Content-Disposition', 'attachment; filename="c-clean.exe"')
            self.end_headers()
            if head_only:
                return
            with EXE.open('rb') as f:
                while chunk := f.read(1024 * 256):
                    self.wfile.write(chunk)
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            body = json.dumps({'error': 'not found'}).encode('utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            if not head_only:
                self.wfile.write(body)

    do_HEAD = do_GET


def main():
    httpd = ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
    ips = lan_ips()
    print('=' * 60)
    print('  C盘垃圾清理 · 局域网分发服务器已启动')
    print('=' * 60)
    print()
    print('  在同一局域网的其他 Windows 设备上，打开 PowerShell 执行：')
    print()
    for ip in ips:
        print(f'      irm http://{ip}:{PORT}/i | iex')
    print()
    print(f'  浏览器访问 http://{ips[0]}:{PORT}/ 可查看安装页')
    print('  按 Ctrl+C 停止分发服务器')
    print()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\n分发服务器已停止。')


if __name__ == '__main__':
    main()
