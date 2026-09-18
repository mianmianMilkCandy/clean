"""C盘垃圾清理 · 本地服务端

将 查找文件.py 的核心逻辑（扫描垃圾目录 / 统计目录大小 / 清空目录内容 /
磁盘容量）封装为 HTTP API，并托管前端构建产物（webapp/dist）。

启动：
    python server.py
然后浏览器访问 http://127.0.0.1:8765/

API：
    GET  /api/health        服务健康检查
    GET  /api/disk-usage    C盘容量 / 已用 / 剩余
    POST /api/scan/start    启动后台扫描（带进度上报，全程约 10~20 秒）
    GET  /api/scan/progress 查询扫描进度（state/percent/current/result）
    POST /api/scan          同步扫描（兼容旧接口，同样带进度延时）
    POST /api/clean         清理勾选的目录内容（仅限最近一次扫描结果中的路径）
    POST /api/feedback      提交建议与反馈（保存至 data/feedback.json，可选 SMTP 转发邮箱）

反馈邮箱配置：在应用目录创建 config.json：
{
  "smtp": {
    "host": "smtp.example.com",
    "port": 465,
    "ssl": true,
    "user": "you@example.com",
    "password": "应用专用密码",
    "to": "target@example.com"
  }
}
"""

import json
import mimetypes
import os
import shutil
import smtplib
import socket
import sys
import threading
import time
from email.header import Header
from email.mime.text import MIMEText
from email.utils import formataddr
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import 查找文件 as finder

# ---------- 路径（兼容 PyInstaller 打包与源码运行两种模式） ----------
if getattr(sys, 'frozen', False):
    # 打包后：前端资源在临时解包目录 _MEIPASS；数据写到用户目录（保证可写）
    ROOT = Path(sys.executable).resolve().parent
    DIST = Path(sys._MEIPASS) / 'webapp' / 'dist'  # noqa: SLF001
    _data_root = Path(os.environ.get('LOCALAPPDATA', str(ROOT))) / 'c-drive-cleaner'
    DATA = _data_root / 'data'
    CONFIG = _data_root / 'config.json'
else:
    ROOT = Path(__file__).resolve().parent
    DIST = ROOT / 'webapp' / 'dist'
    DATA = ROOT / 'data'
    CONFIG = ROOT / 'config.json'

PORT = 8765
HOST = '127.0.0.1'

MB = 1024 * 1024
GB = 1024 * MB

CATEGORY_LABELS = {
    'sys': '系统及通用垃圾',
    'browser': '浏览器缓存',
    'wechat': '微信聊天缓存',
    'qq': 'QQ聊天缓存',
}

# ---------- 业务逻辑（基于 查找文件.py 的构件） ----------

_scan_lock = threading.Lock()
_last_scan: dict = {'targets': []}  # path -> target 映射的原始列表

# 后台扫描进度状态（进度条加载模块的数据源，前端轮询 /api/scan/progress）
_scan_progress: dict = {
    'state': 'idle',  # idle | scanning | done | error
    'percent': 0,
    'current': '',
    'error': '',
    'result': None,
}
_progress_lock = threading.Lock()


def _build_scan_result(targets_totals):
    """将 查找文件.scan_junk_progress 的返回值组装为 HTTP 响应结构。"""
    targets, totals = targets_totals
    result = []
    for category, name, path, size in targets:
        result.append(
            {
                'name': name,
                'path': str(path),
                'category': category,
                'categoryLabel': CATEGORY_LABELS[category],
                'size': size,
            }
        )
    return {
        'targets': result,
        'totals': totals,
        'totalSize': sum(totals.values()),
        'scannedAt': time.time() * 1000,
    }


def _scan_worker():
    """后台扫描线程：逐目录统计并上报进度（整体约 10~20 秒）。"""

    def on_step(done, total, name, _path):
        with _progress_lock:
            _scan_progress['percent'] = round(done * 100 / total)
            _scan_progress['current'] = name

    try:
        result = _build_scan_result(finder.scan_junk_progress(on_step))
        with _scan_lock:
            _last_scan['targets'] = result['targets']
        with _progress_lock:
            _scan_progress['percent'] = 100
            _scan_progress['state'] = 'done'
            _scan_progress['error'] = ''
            _scan_progress['result'] = result
    except Exception as e:  # noqa: BLE001
        with _progress_lock:
            _scan_progress['state'] = 'error'
            _scan_progress['error'] = str(e)


def start_scan_async() -> dict:
    """启动后台扫描（幂等：扫描中重复调用不会重启）。"""
    with _progress_lock:
        if _scan_progress['state'] == 'scanning':
            return {'ok': True, 'running': True}
        _scan_progress.update(
            {'state': 'scanning', 'percent': 0, 'current': '', 'error': '', 'result': None}
        )
    threading.Thread(target=_scan_worker, daemon=True).start()
    return {'ok': True}


def scan_progress_payload() -> dict:
    with _progress_lock:
        return dict(_scan_progress)


def disk_usage_payload():
    drive = Path(os.environ.get('SystemDrive', 'C:'))
    total, used, free = shutil.disk_usage(drive)
    return {
        'drive': str(drive),
        'total': total,
        'used': used,
        'free': free,
    }


def scan_junk_payload():
    """同步执行一次完整扫描（兼容旧接口；内部同样带进度延时，约 10~20 秒）。"""
    with _scan_lock:
        result = _build_scan_result(finder.scan_junk_progress())
        _last_scan['targets'] = result['targets']
        return result


def clean_selected_payload(paths):
    """仅允许清理最近一次扫描结果中的路径；受保护目录直接拒绝。"""
    allowed = {t['path']: t for t in _last_scan['targets']}
    if not allowed:
        # 服务重启后内存丢失：重新扫描一次以恢复白名单
        scan_junk_payload()
        allowed = {t['path']: t for t in _last_scan['targets']}

    freed = 0
    failures = []
    seen = set()
    for raw in paths:
        if not isinstance(raw, str):
            continue
        path = str(Path(raw))
        if path in seen:
            continue
        seen.add(path)
        target = allowed.get(path)
        if target is None:
            failures.append({'name': raw, 'path': raw, 'error': '路径不在最近扫描结果中，已拒绝'})
            continue
        if finder.is_protected(Path(path)):
            failures.append({'name': target['name'], 'path': path, 'error': '受保护的系统目录，已跳过'})
            continue
        try:
            result = finder.clean_directory_contents(Path(path))
        except OSError as e:
            failures.append({'name': target['name'], 'path': path, 'error': str(e)})
            continue
        if result >= 0:
            freed += result
        else:
            failures.append({'name': target['name'], 'path': path, 'error': '清理失败（权限不足）'})
    return {'freed': freed, 'failures': failures}


# ---------- 反馈提交 ----------

def save_feedback(payload):
    DATA.mkdir(exist_ok=True)
    record = {
        'time': time.strftime('%Y-%m-%d %H:%M:%S'),
        'suggestion': payload.get('suggestion', ''),
        'feedback': payload.get('feedback', ''),
        'contact': payload.get('contact', ''),
    }
    store = DATA / 'feedback.json'
    items = []
    if store.exists():
        try:
            items = json.loads(store.read_text(encoding='utf-8'))
        except (OSError, json.JSONDecodeError):
            items = []
    items.append(record)
    store.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding='utf-8')


def try_send_feedback_mail(payload) -> bool:
    if not CONFIG.exists():
        return False
    try:
        cfg = json.loads(CONFIG.read_text(encoding='utf-8')).get('smtp', {})
        host = cfg.get('host')
        user = cfg.get('user')
        password = cfg.get('password')
        to = cfg.get('to')
        if not all([host, user, password, to]):
            return False
        body = (
            f"建议：\n{payload.get('suggestion', '') or '（无）'}\n\n"
            f"反馈：\n{payload.get('feedback', '') or '（无）'}\n\n"
            f"联系方式：{payload.get('contact', '') or '（未填写）'}\n"
        )
        msg = MIMEText(body, 'plain', 'utf-8')
        msg['Subject'] = Header('C盘垃圾清理 · 用户反馈', 'utf-8')
        msg['From'] = formataddr((str(Header('C盘清理应用', 'utf-8')), user))
        msg['To'] = to
        port = int(cfg.get('port', 465))
        if cfg.get('ssl', True):
            server = smtplib.SMTP_SSL(host, port, timeout=15)
        else:
            server = smtplib.SMTP(host, port, timeout=15)
            server.starttls()
        try:
            server.login(user, password)
            server.sendmail(user, [to], msg.as_string())
        finally:
            server.quit()
        return True
    except Exception:
        return False


# ---------- HTTP 服务 ----------

class Handler(BaseHTTPRequestHandler):
    server_version = 'CDiskCleaner/2.0'

    def log_message(self, fmt, *args):
        print(f'  [{self.command}] {self.path} - ' + (fmt % args))

    # ----- 响应工具 -----
    def _json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)

    def _error(self, message, status=400):
        self._json({'error': message}, status)

    def _read_json(self):
        length = int(self.headers.get('Content-Length') or 0)
        if length <= 0:
            return {}
        raw = self.rfile.read(length)
        try:
            return json.loads(raw.decode('utf-8'))
        except (UnicodeDecodeError, json.JSONDecodeError):
            return None

    # ----- API 路由 -----
    def do_GET(self):
        path = self.path.split('?')[0]
        if path == '/api/health':
            self._json({'ok': True, 'version': '2.0.0'})
        elif path == '/api/scan/progress':
            self._json(scan_progress_payload())
        elif path == '/api/disk-usage':
            try:
                self._json(disk_usage_payload())
            except OSError as e:
                self._error(f'无法获取磁盘容量信息: {e}', 500)
        elif path.startswith('/api/'):
            self._error('未知接口', 404)
        else:
            self._static(path)

    def do_POST(self):
        path = self.path.split('?')[0]
        payload = self._read_json()
        if payload is None:
            self._error('请求体不是有效 JSON')
            return
        if path == '/api/scan/start':
            self._json(start_scan_async())
        elif path == '/api/scan':
            try:
                self._json(scan_junk_payload())
            except Exception as e:  # noqa: BLE001
                self._error(f'扫描失败: {e}', 500)
        elif path == '/api/clean':
            paths = payload.get('paths')
            if not isinstance(paths, list) or not paths:
                self._error('请提供要清理的路径列表（paths）')
                return
            try:
                self._json(clean_selected_payload(paths))
            except Exception as e:  # noqa: BLE001
                self._error(f'清理失败: {e}', 500)
        elif path == '/api/feedback':
            if not any(str(payload.get(k, '')).strip() for k in ('suggestion', 'feedback')):
                self._error('建议与反馈不能同时为空')
                return
            try:
                save_feedback(payload)
            except OSError as e:
                self._error(f'反馈保存失败: {e}', 500)
                return
            emailed = try_send_feedback_mail(payload)
            self._json({'ok': True, 'saved': True, 'emailed': emailed})
        else:
            self._error('未知接口', 404)

    # ----- 静态资源（前端构建产物） -----
    def _static(self, path):
        if not DIST.exists():
            self._error('前端尚未构建：请先在 webapp 目录执行 npm run build', 503)
            return
        rel = path.lstrip('/') or 'index.html'
        if rel in ('', '/'):
            rel = 'index.html'
        target = (DIST / rel).resolve()
        if not str(target).startswith(str(DIST.resolve())):
            self._error('禁止访问', 403)
            return
        if target.is_dir():
            target = target / 'index.html'
        if not target.is_file():
            # SPA 回退
            target = DIST / 'index.html'
        if not target.is_file():
            self._error('未找到资源', 404)
            return
        ctype, _ = mimetypes.guess_type(str(target))
        if ctype is None:
            ctype = 'application/octet-stream'
        if ctype.startswith('text/') or ctype in ('application/javascript', 'application/json'):
            ctype += '; charset=utf-8'
        body = target.read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-cache')
        self.end_headers()
        self.wfile.write(body)


def create_server(port: int = 0):
    """在 127.0.0.1 上创建 HTTP 服务（port=0 时自动分配空闲端口）。"""
    httpd = ThreadingHTTPServer((HOST, port), Handler)
    socket.setdefaulttimeout(120)
    return httpd


def main():
    try:
        httpd = create_server(PORT)
    except OSError as e:
        print(f'端口 {PORT} 被占用或无法监听: {e}')
        return
    print('=' * 56)
    print('  C盘垃圾清理 · 本地服务已启动')
    print(f'  请用浏览器访问:  http://{HOST}:{PORT}/')
    print(f'  前端目录: {DIST}')
    print('  按 Ctrl+C 停止服务')
    print('=' * 56)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\n服务已停止。')


if __name__ == '__main__':
    main()
