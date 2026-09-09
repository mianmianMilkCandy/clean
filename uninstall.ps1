# ============================================================
#  C盘垃圾清理 · 桌面应用卸载脚本
#
#  用法：powershell -ExecutionPolicy Bypass -File .\uninstall.ps1
# ============================================================

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$InstallDir = Join-Path $env:LOCALAPPDATA 'Programs\c-drive-cleaner'
$Shortcut   = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\C盘垃圾清理.lnk'

# 1. 结束运行中的进程
Get-Process -Name c-clean -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host '==> 已结束运行中的应用进程'

# 2. 删除安装目录
if (Test-Path $InstallDir) {
    Remove-Item $InstallDir -Recurse -Force
    Write-Host "==> 已删除安装目录: $InstallDir"
}

# 3. 删除开始菜单快捷方式
if (Test-Path $Shortcut) {
    Remove-Item $Shortcut -Force
    Write-Host '==> 已删除开始菜单快捷方式'
}

# 4. 从用户 PATH 移除安装目录
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -like "*$InstallDir*") {
    $parts = ($userPath -split ';') | Where-Object { $_ -and ($_ -ne $InstallDir) }
    [Environment]::SetEnvironmentVariable('Path', ($parts -join ';'), 'User')
    Write-Host '==> 已从用户 PATH 移除安装目录'
}

Write-Host ''
Write-Host '卸载完成。' -ForegroundColor Green
Write-Host "用户数据（反馈记录等）保留在: $env:LOCALAPPDATA\c-drive-cleaner"
Write-Host "如需彻底清除，可手动删除该目录。"
