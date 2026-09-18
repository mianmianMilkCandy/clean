# PC Junk File Auto-Cleaner · User Manual (English)

## 1 Introduction

### 1.1 Purpose

This document is the user manual for the "PC Junk File Auto-Cleaner" application. It helps users quickly understand and master all features and operations of the software.

### 1.2 Background

This software was developed by Du Hongxi. Nowadays computer storage often fills up, and cleaning junk usually requires downloading various bulky tools with cumbersome operations. This application is only about 20 MB in size, allowing users to quickly download, install, clean junk files, and uninstall just as easily without occupying storage space.

## 2 Software Overview

### 2.1 Goals

Enable users to quickly master the application and clean junk files efficiently, freeing up C drive space.

### 2.2 Feature Overview

- **Start scanning junk files**: Quickly scan and clean junk files
- **Suggestions & Feedback**: Submit issues or feedback about the application
- **Learn Usage**: A simple quick-start guide

## 3 Runtime Environment

### 3.1 Hardware

Any ordinary PC.

### 3.2 Software

- Windows 10/11 x64
- Edge WebView2 Runtime (built into Windows 11 and recent Windows 10; the installer downloads it automatically if missing)
- No Python required — PyInstaller bundles the interpreter and dependencies into a single `c-clean.exe` (~20 MB)

## 4 Download & Installation

### 4.1 One-click install (recommended)

Works in both CMD and PowerShell (v2.0.0: multi-source failover + TLS 1.2 built in; copy the whole line):

```powershell
powershell -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; $s=$null; foreach($u in @('https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/install-github.ps1','https://ghfast.top/https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/install-github.ps1','https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/install-github.ps1')){ try{ $s=irm $u -TimeoutSec 20; break }catch{} }; if($s){ iex $s }else{ Write-Host '所有下载源均无法访问，请检查网络连接' }"
```

> Note: the `irm ... | iex` shorthand only works in PowerShell; in CMD it reports "'irm' is not recognized". Use the universal command above instead.

(Inside PowerShell you may also use `irm https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/install-github.ps1 | iex`.)

The v2.0.0 installer automatically probes mirror speeds and downloads from the fastest source, verifies the exe with SHA-256, fails over to the next mirror on error, then installs the app, registers the `c-clean` command, creates a Start Menu shortcut, installs the WebView2 Runtime if missing, and launches the app.

Troubleshooting:

| Symptom | Cause / fix |
|---------|------------|
| "'irm' is not recognized" | You used the PowerShell-only shorthand in CMD; use the universal command above |
| "The underlying connection was closed" | Transient network failure to a source; the universal command has built-in failover, just retry |
| Slow download | v2.0.0 already picks the fastest mirror; if still slow, retry (speed-based selection) |

### 4.2 Launching (any of the following)

1. Open a new terminal and type: `c-clean`
2. Search "C盘垃圾清理" in the Start Menu
3. Run directly: `%LOCALAPPDATA%\Programs\c-drive-cleaner\c-clean.exe`

## 5 How to Use

### 5.1 Scanning Junk Files

1. After launching the app, the three feature entries are vertically centered on the home screen.
2. Click "开始扫描电脑垃圾文件" (Start Scanning) to jump to the scan screen.
3. Click "确定" (Confirm) to start the scan.
4. The scan takes about 10–20 seconds, with a progress bar showing the current directory and percentage.
5. Clicking "返回" (Back) returns to the home screen without interrupting the scan; when finished, the app automatically jumps to the cleanup screen.
6. The cleanup screen shows an overview of the C drive: total space, free space, used space, and junk usage.

### 5.2 Cleaning Junk Files

1. Core code protects system junk paths; unchecked paths are protected by default. You may check them manually if you insist on cleaning them.
2. Click "开始清理" (Start Cleaning) and a confirmation dialog appears.
3. After confirming, cleaning begins. When finished, the app automatically returns to the home screen.

### 5.3 Permissions

If some paths report "access denied" or insufficient permissions during cleanup, run the program as an administrator (right-click → Run as administrator):

- Without elevation: some system directories (system logs, Windows Update cache) are skipped
- With elevation: these directories clean normally

We recommend closing WeChat, QQ, and browsers before cleaning to avoid files being locked.

### 5.4 Suggestions & Feedback

Click "建议与反馈" (Suggestions & Feedback) to enter the feedback page and submit your comments. Click "返回" (Back) to return to the home screen.

### 5.5 Learn Usage (Beginner's Guide)

Click "了解使用" (Learn Usage) to open a simple guide with an arrow pointing to the quick-start entry:

Click "跳过指引" (Skip Guide), then click "快速开始" (Quick Start) at the bottom to enter the scan-and-clean screen.

## 6 FAQ

| Issue | Cause & Solution |
|---|---|
| Blank window | Missing Edge WebView2 Runtime; reinstall (auto-installs it) or install manually from Microsoft |
| Access denied on some directories | Run the app as administrator |
| WeChat/QQ directories fail to clean | Close WeChat/QQ first (files in use) |
| System directories skipped | Safety design: System32, Program Files, etc. are protected |

## 7 Uninstall

One-click uninstall, works in both CMD and PowerShell (copy the whole line):

```powershell
powershell -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; $s=$null; foreach($u in @('https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/uninstall-github.ps1','https://ghfast.top/https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/uninstall-github.ps1','https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/uninstall-github.ps1')){ try{ $s=irm $u -TimeoutSec 20; break }catch{} }; if($s){ iex $s }else{ Write-Host '所有下载源均无法访问，请检查网络连接' }"
```

Shorthand (PowerShell only):

```powershell
irm https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/uninstall-github.ps1 | iex
```

The script automatically stops the running app, deletes the `%LOCALAPPDATA%\Programs\c-drive-cleaner` directory, removes the install directory from the user PATH, and deletes the Start Menu shortcut. Edge WebView2 is kept as a shared system component. Re-running is safe.

Alternatively, delete manually:

- The `%LOCALAPPDATA%\Programs\c-drive-cleaner` directory
- The Start Menu shortcut
- The install directory entry in the user PATH
