# C盘垃圾清理（C Drive Junk Cleaner）

一款仅约 20 MB 的 Windows 桌面应用，用于安全地扫描并清理 C 盘垃圾文件（系统缓存、浏览器缓存、微信/QQ 聊天缓存），界面采用 Material 3 设计语言。PyInstaller 打包为单文件 exe，目标电脑无需安装 Python。

A lightweight (~20 MB) Windows desktop app that safely scans and cleans junk files on your C drive (system cache, browser cache, WeChat/QQ caches), built with a Material 3 UI, packaged as a single self-contained exe.

---

## 一键安装（One-click install）v2.0.0

CMD 和 PowerShell 中均可执行（Works in both CMD and PowerShell）。内置多下载源容错与 TLS 1.2，网络波动时自动切换源：

```powershell
powershell -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; $s=$null; foreach($u in @('https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/install-github.ps1','https://ghfast.top/https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/install-github.ps1','https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/install-github.ps1')){ try{ $s=irm $u -TimeoutSec 20; break }catch{} }; if($s){ iex $s }else{ Write-Host '所有下载源均无法访问，请检查网络连接' }"
```

> 注意：请整行完整复制（不要混入多余字符）。`irm ... | iex` 简写只能在 PowerShell 中使用，在 CMD 中会提示「irm 不是内部或外部命令」。

纯 PowerShell 环境也可用简写：

```powershell
irm https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/install-github.ps1 | iex
```

**v2.0.0 改进：**

- 下载源自动测速选择最快镜像（解决国内直连 GitHub 慢/失败的问题，实测 20 MB 约 3~13 秒）
- SHA-256 完整性校验，第三方镜像也无法投毒
- 下载源自动故障转移 + 网络重试
- 覆盖升级时自动停止旧版本进程
- 快捷方式 / WebView2 步骤失败不再中断安装

脚本自动完成：停止旧版本 → 测速选源 → 下载并校验 `c-clean.exe` → 安装到用户目录 → 注册 `c-clean` 命令 → 创建开始菜单快捷方式「C盘垃圾清理」→ 检测并自动安装 Edge WebView2 运行时（如缺失）→ 立即启动。

**常见问题：**

| 现象 | 原因与解决 |
|------|-----------|
| 「irm 不是内部或外部命令」 | 在 CMD 中使用了 PowerShell 专用简写，请用上面的通用命令 |
| 「基础连接已经关闭」 | 网络到下载源的瞬时故障，通用命令已内置多源容错，直接重试即可 |
| 下载很慢 | v2.0.0 已自动测速选最快镜像，如仍慢请重试（测速择优） |
| 校验失败自动换源 | 正常容错行为，脚本会自动切换下一个下载源 |

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

## 卸载（Uninstall）

CMD 和 PowerShell 中均可执行（Works in both CMD and PowerShell）：

```powershell
powershell -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; $s=$null; foreach($u in @('https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/uninstall-github.ps1','https://ghfast.top/https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/uninstall-github.ps1','https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/uninstall-github.ps1')){ try{ $s=irm $u -TimeoutSec 20; break }catch{} }; if($s){ iex $s }else{ Write-Host '所有下载源均无法访问，请检查网络连接' }"
```

纯 PowerShell 环境也可用简写：

```powershell
irm https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/uninstall-github.ps1 | iex
```

脚本自动完成：停止运行中的程序 → 删除 `%LOCALAPPDATA%\Programs\c-drive-cleaner` → 从用户 PATH 移除安装目录 → 删除开始菜单快捷方式。Edge WebView2 为系统共享组件，将保留（不影响其他应用）。重复执行安全无副作用。

## 许可证

本项目采用 [MIT License](LICENSE) 开源协议。
