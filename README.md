# C盘垃圾清理（C Drive Junk Cleaner）

一款仅约 20 MB 的 Windows 桌面应用，用于安全地扫描并清理 C 盘垃圾文件（系统缓存、浏览器缓存、微信/QQ 聊天缓存），界面采用 Material 3 设计语言。PyInstaller 打包为单文件 exe，目标电脑无需安装 Python。

A lightweight (~20 MB) Windows desktop app that safely scans and cleans junk files on your C drive (system cache, browser cache, WeChat/QQ caches), built with a Material 3 UI, packaged as a single self-contained exe.

---

## 一键安装（One-click install）

在 Windows PowerShell 中执行（Right-click → "Run with PowerShell" 或在终端粘贴）：

```powershell
irm https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/install-github.ps1 | iex
```

海外网络也可以用 raw 地址：

```powershell
irm https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/install-github.ps1 | iex
```

脚本自动完成：下载 `c-clean.exe` → 安装到用户目录 → 注册 `c-clean` 命令 → 创建开始菜单快捷方式「C盘垃圾清理」→ 检测并自动安装 Edge WebView2 运行时（如缺失）→ 立即启动。

## 功能特性

- **智能垃圾扫描**：系统及通用垃圾（临时文件夹、Windows 更新缓存、系统日志、预读取缓存、旧系统备份）、浏览器缓存（Chrome / Edge / Firefox 多 Profile）、微信缓存（各账号 Image/Video/File/Cache）、QQ 缓存（各账号 Image/Video/FileRecv/Cache），自动适配不同电脑路径
- **可视化进度**：扫描约 10–20 秒，进度条实时显示当前扫描目录与百分比
- **分类勾选清理**：按 系统/浏览器/微信/QQ 四类展示目录大小，自由勾选清理范围
- **磁盘总览**：C 盘总容量、已用、剩余空间一目了然
- **三重安全防护**：受保护目录黑名单（System32、Program Files 等绝不触碰）、删除失败自动跳过不中断、聊天文件清理前警示
- **新手引导**：「了解使用」箭头指引 + 可跳过；「建议与反馈」页提交意见
- **清理完成自动返回主页**

## 使用手册 / User Manuals

| 语言 | 文档 |
|---|---|
| 简体中文 | [docs/manual_zh-CN.md](docs/manual_zh-CN.md) |
| English | [docs/manual_en-US.md](docs/manual_en-US.md) |
| 日本語 | [docs/manual_ja-JP.md](docs/manual_ja-JP.md) |

## 从源码运行

需要 Python 3.10+ 与 Node.js：

```powershell
git clone https://github.com/mianmianMilkCandy/clean.git
cd clean
python -m venv .venv
.venv\Scripts\pip install pywebview pillow
.venv\Scripts\python desktop.py
```

（`webapp/dist` 已包含前端构建产物；如需重新构建前端：`cd webapp && npm install && npm run build`）

打包为 exe：

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

## 技术架构

- **后端**：Python 内嵌 HTTP 服务（`server.py`）+ 垃圾目录扫描/清理引擎（`查找文件.py`），后台线程 + 进度上报
- **前端**：Lit + TypeScript + Material Web Components（`webapp/`），Vite 构建
- **桌面壳**：pywebview + Edge WebView2 渲染，PyInstaller 单文件打包
- **分发**：GitHub Release 托管 exe + PowerShell 一键安装脚本

## 卸载

运行 `uninstall.ps1`，或手动删除 `%LOCALAPPDATA%\Programs\c-drive-cleaner` 与开始菜单快捷方式，并从用户 PATH 移除安装目录。
