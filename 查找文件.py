"""C盘垃圾文件查找与清理工具"""

import os
import random
import shutil
import time
from pathlib import Path

MB = 1024 * 1024
GB = 1024 * MB

# 基础路径（动态获取，适配不同电脑）
USER_DIR = Path(os.environ.get('USERPROFILE', r'C:\Users\Default'))
WIN_DIR = Path(os.environ.get('WINDIR', r'C:\Windows'))
TEMP_DIR = Path(os.environ.get('TEMP', r'C:\Windows\Temp'))
LOCAL_DIR = Path(os.environ.get('LOCALAPPDATA', r'C:\Users\Default\AppData\Local'))

# 系统及通用垃圾目录
SYSTEM_JUNK = [
    ("用户临时文件夹", TEMP_DIR),
    ("系统临时文件夹", WIN_DIR / 'Temp'),
    ("Windows更新缓存", WIN_DIR / 'SoftwareDistribution' / 'Download'),
    ("系统日志", WIN_DIR / 'System32' / 'LogFiles'),
    ("预读取缓存", WIN_DIR / 'Prefetch'),
    ("旧系统备份", WIN_DIR / 'Windows.old'),
]

# 浏览器缓存目录（Firefox 在扫描时按 profile 展开）
BROWSER_JUNK = [
    ("Chrome缓存", LOCAL_DIR / 'Google' / 'Chrome' / 'User Data' / 'Default' / 'Cache'),
    ("Edge缓存", LOCAL_DIR / 'Microsoft' / 'Edge' / 'User Data' / 'Default' / 'Cache'),
]
FIREFOX_PROFILES = LOCAL_DIR / 'Mozilla' / 'Firefox' / 'Profiles'

# 受保护目录黑名单：黑名单内及其子目录一律跳过，不做任何删除
BLOCKED_PATHS = [
    WIN_DIR / 'System32',
    Path(os.environ.get('ProgramFiles', r'C:\Program Files')),
    Path(os.environ.get('ProgramFiles(x86)', r'C:\Program Files (x86)')),
    WIN_DIR / 'Installer',
]


def is_protected(path: Path) -> bool:
    """检查路径是否位于受保护目录内。"""
    try:
        resolved = path.resolve()
    except OSError:
        return False
    for blocked in BLOCKED_PATHS:
        try:
            if resolved.is_relative_to(blocked.resolve()):
                return True
        except OSError:
            continue
    return False


def get_directory_size(path: Path) -> int:
    """递归统计目录大小（字节），无法访问的部分跳过，不抛异常。"""
    total = 0
    for root, _dirs, files in os.walk(path, onerror=lambda _e: None):
        for name in files:
            try:
                total += os.lstat(os.path.join(root, name)).st_size
            except OSError:
                pass
    return total


def find_account_caches(root: Path, rel_subdirs, label: str):
    """扫描 root 下每个账号目录，返回 [(名称, 子目录路径)]。

    rel_subdirs 为相对账号目录的路径元组，如 ('FileStorage', 'Image')。
    """
    if not root.is_dir():
        return []
    results = []
    try:
        accounts = list(root.iterdir())
    except OSError:
        return []
    for account in accounts:
        if not account.is_dir():
            continue
        for rel in rel_subdirs:
            sub = account.joinpath(*rel)
            if sub.is_dir():
                results.append((f"{label}[{account.name}] - {rel[-1]}", sub))
    return results


def wechat_caches():
    """微信各账号的 FileStorage 子目录（Image/Video/File/Cache）。"""
    return find_account_caches(
        USER_DIR / 'Documents' / 'WeChat Files',
        [('FileStorage', 'Image'), ('FileStorage', 'Video'),
         ('FileStorage', 'File'), ('FileStorage', 'Cache')],
        '微信',
    )


def qq_caches():
    """QQ各账号的缓存子目录（Image/Video/FileRecv/Cache）。"""
    return find_account_caches(
        USER_DIR / 'Documents' / 'Tencent Files',
        [('Image',), ('Video',), ('FileRecv',), ('Cache',)],
        'QQ',
    )


def firefox_caches():
    """Firefox各 profile 的 cache2 缓存目录。"""
    entries = []
    if not FIREFOX_PROFILES.is_dir():
        return entries
    try:
        profiles = list(FIREFOX_PROFILES.iterdir())
    except OSError:
        return entries
    for profile in profiles:
        if profile.is_dir():
            cache2 = profile / 'cache2'
            if cache2.is_dir():
                entries.append((f"Firefox缓存[{profile.name}]", cache2))
    return entries


# ---------- 进度条加载模块 + 时间睡眠模块 ----------
# 进度回调：callback(done, total, name, path)
ProgressCallback = None


def scan_junk_progress(callback=ProgressCallback, min_seconds=12.0):
    """带进度的垃圾目录扫描（供本地服务调用）。

    在逐个目录统计大小的过程中：
    - 通过 callback(done, total, name, path) 上报进度（进度条加载模块）
    - 通过 time.sleep 在每步之间均匀插入延时（时间睡眠模块），
      使扫描从开始到结束保持约 min_seconds 秒（默认 12 秒，10~20 秒量级）

    返回 (targets, totals)：
      targets 为 [(category, name, path, size)]，仅包含实际存在的目录
      totals 为 {'sys': n, 'browser': n, 'wechat': n, 'qq': n}
    """
    groups = [
        ('sys', list(SYSTEM_JUNK)),
        ('browser', list(BROWSER_JUNK) + firefox_caches()),
        ('wechat', wechat_caches()),
        ('qq', qq_caches()),
    ]
    steps = [(category, name, path) for category, entries in groups for name, path in entries]
    total = len(steps)
    # 均匀分配总时长到每一步，并带 ±30% 随机抖动，节奏更自然
    step_delay = (min_seconds / total) if total else 0

    targets = []
    totals = {'sys': 0, 'browser': 0, 'wechat': 0, 'qq': 0}
    for done, (category, name, path) in enumerate(steps, start=1):
        size = 0
        try:
            if path.is_dir():
                size = get_directory_size(path)
                targets.append((category, name, path, size))
                totals[category] += size
        except OSError:
            pass
        if callback:
            try:
                callback(done, total, name, path)
            except Exception:  # noqa: BLE001
                pass
        # 时间睡眠模块：保证整体扫描持续 10~20 秒的加载进度
        if step_delay > 0:
            time.sleep(step_delay * random.uniform(0.7, 1.3))
    return targets, totals


def clean_directory_contents(path: Path):
    """清空目录内容（保留目录本身），返回释放的字节数。

    单个文件/子目录删除失败（被占用、权限不足）时跳过并提示，
    不中断其余内容；受保护目录返回 -1。
    """
    if not path.exists():
        return 0
    if is_protected(path):
        print(f"    警告：{path} 位于受保护的系统目录中，已跳过。")
        return -1

    size_before = get_directory_size(path)
    for item in path.iterdir():
        try:
            if item.is_dir() and not item.is_symlink():
                shutil.rmtree(item)
            else:
                item.unlink()
        except OSError as e:
            print(f"    跳过 {item.name}: {e}")
    return max(0, size_before - get_directory_size(path))


def clean_targets(targets):
    """逐个清空目标目录，返回 (成功释放空间, 失败列表)。"""
    total_freed = 0
    failures = []
    for name, path in targets:
        print(f"正在清理: {name} -> {path}")
        freed = clean_directory_contents(path)
        if freed >= 0:
            total_freed += freed
            print(f"    成功，释放 {freed / MB:.2f} MB")
        else:
            failures.append((name, path))
    return total_freed, failures


def show_disk_usage():
    """显示系统盘的总容量、已用空间和剩余空间。"""
    drive = Path(os.environ.get('SystemDrive', 'C:'))
    try:
        total, used, free = shutil.disk_usage(drive)
        print("\n【磁盘容量信息】")
        print(f"  盘符: {drive}")
        print(f"  总容量: {total / GB:.2f} GB")
        print(f"  已用空间: {used / GB:.2f} GB")
        print(f"  剩余空间: {free / GB:.2f} GB")
    except OSError as e:
        print(f"  无法获取磁盘容量信息: {e}")


def collect_targets(title, entries, totals, key, empty_hint=None):
    """打印目录存在状态与大小、累计分类大小，返回有效目标列表。"""
    print(f"\n【{title}】")
    if not entries and empty_hint:
        print(f"\t{empty_hint}")
        return []
    targets = []
    for name, path in entries:
        if not path.is_dir():
            print(f"  [不存在] {path}")
            continue
        print(f"  [  存在] {path}")
        targets.append((name, path))
        size = get_directory_size(path)
        print(f"\t大小: {size / MB:.2f} MB")
        totals[key] += size
    return targets


def scan_junk():
    """查找并打印所有垃圾目录，返回收集到的目标列表和分类大小。"""
    totals = {"sys": 0, "browser": 0, "wechat": 0, "qq": 0}
    print("C盘垃圾文件夹查找结果")

    all_targets = []
    all_targets += collect_targets("系统及通用垃圾目录", SYSTEM_JUNK, totals, "sys")
    all_targets += collect_targets(
        "浏览器缓存目录", BROWSER_JUNK + firefox_caches(), totals, "browser")
    all_targets += collect_targets(
        "微信聊天缓存目录", wechat_caches(), totals, "wechat",
        empty_hint="未找到微信缓存（可能未安装或使用默认路径）")
    all_targets += collect_targets(
        "QQ聊天缓存目录", qq_caches(), totals, "qq",
        empty_hint="未找到QQ缓存（可能未安装或使用默认路径）")

    print("\n" + "=" * 80)
    print("【垃圾容量分类汇总】")
    print(f"  系统及通用垃圾总大小: {totals['sys'] / MB:.2f} MB")
    print(f"  浏览器缓存总大小: {totals['browser'] / MB:.2f} MB")
    print(f"  微信缓存总大小: {totals['wechat'] / MB:.2f} MB")
    print(f"  QQ缓存总大小: {totals['qq'] / MB:.2f} MB")
    total_all = sum(totals.values())
    print(f"  **全部垃圾总大小: {total_all / MB:.2f} MB ({total_all / GB:.2f} GB)**")
    print("=" * 80)

    return all_targets


def main():
    show_disk_usage()
    targets = scan_junk()

    if not targets:
        print("未找到任何可清理的垃圾目录。")
        return

    print(f"\n共找到 {len(targets)} 个垃圾目录。")
    print("注意：微信 File、QQ FileRecv 目录包含聊天接收的文件，清理后无法恢复。")
    choice = input("是否要清理上述所有目录的内容？(y/n): ").strip().lower()
    if choice != 'y':
        print("已取消清理。")
        return

    print("\n开始清理...")
    freed, failures = clean_targets(targets)
    print(f"\n清理完成，共释放空间: {freed / MB:.2f} MB")
    if failures:
        print("以下目录清理失败（权限不足或文件被占用）：")
        for name, path in failures:
            print(f"  {name}: {path}")


if __name__ == '__main__':
    main()
