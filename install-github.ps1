# ============================================================
#  C盘垃圾清理 · GitHub 一键安装脚本
#
#  用法（在任意 Windows 电脑的 PowerShell 中执行）：
#      irm https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/install-github.ps1 | iex
#  海外网络亦可用：
#      irm https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/install-github.ps1 | iex
#
#  自动完成：
#    1. 从 GitHub Release 下载 c-clean.exe（约 20 MB，单文件免依赖）
#    2. 安装到 %LOCALAPPDATA%\Programs\c-drive-cleaner
#    3. 注册 c-clean 命令到用户 PATH
#    4. 创建开始菜单快捷方式「C盘垃圾清理」
#    5. 检测并自动安装 Edge WebView2 运行时（如缺失）
#    6. 立即启动应用
# ============================================================

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# 兼容老版本 PowerShell 的 TLS 配置
try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch {}

$RepoOwner  = 'mianmianMilkCandy'
$RepoName   = 'clean'
$ExeName    = 'c-clean.exe'
$DownloadUrl = "https://github.com/$RepoOwner/$RepoName/releases/latest/download/$ExeName"
$InstallDir = Join-Path $env:LOCALAPPDATA 'Programs\c-drive-cleaner'

function Write-Step($msg)  { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-Ok($msg)    { Write-Host "    $msg" -ForegroundColor Green }
function Write-Warn2($msg) { Write-Host "    $msg" -ForegroundColor Yellow }

Write-Host '========================================' -ForegroundColor Blue
Write-Host '   C盘垃圾清理 · GitHub 一键安装程序'     -ForegroundColor Blue
Write-Host '========================================' -ForegroundColor Blue

# ---------- 1. 下载应用 ----------
Write-Step '从 GitHub Release 下载应用（约 20 MB，单文件免依赖）'
$tmpExe = Join-Path $env:TEMP $ExeName
$ProgressPreference = 'SilentlyContinue'
try {
    Invoke-WebRequest -Uri $DownloadUrl -OutFile $tmpExe -UseBasicParsing
} catch {
    throw "下载失败: $($_.Exception.Message)`n    请检查网络连接后重试（国内网络可能需要代理访问 GitHub）"
}
$sizeMB = [math]::Round((Get-Item $tmpExe).Length / 1MB, 1)
Write-Ok "下载完成 ($sizeMB MB)"

# ---------- 2. 安装到用户目录 ----------
Write-Step '安装到用户程序目录'
New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
Copy-Item $tmpExe (Join-Path $InstallDir $ExeName) -Force
Remove-Item $tmpExe -Force -ErrorAction SilentlyContinue
Write-Ok "已安装: $InstallDir\$ExeName"

# ---------- 3. 注册 PATH（幂等） ----------
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -notlike "*$InstallDir*") {
    [Environment]::SetEnvironmentVariable('Path', "$userPath;$InstallDir", 'User')
    Write-Ok '已将安装目录加入用户 PATH'
} else {
    Write-Ok 'PATH 已包含安装目录，跳过'
}

# ---------- 4. 开始菜单快捷方式 ----------
$StartMenu = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs'
$Shortcut  = Join-Path $StartMenu 'C盘垃圾清理.lnk'
$Shell = New-Object -ComObject WScript.Shell
$Sc = $Shell.CreateShortcut($Shortcut)
$Sc.TargetPath = Join-Path $InstallDir $ExeName
$Sc.WorkingDirectory = $InstallDir
$Sc.IconLocation = Join-Path $InstallDir $ExeName
$Sc.Description = 'C盘垃圾清理桌面应用'
$Sc.Save()
Write-Ok '已创建开始菜单快捷方式「C盘垃圾清理」'

# ---------- 5. WebView2 运行时检测 ----------
Write-Step '检查 Edge WebView2 运行时（界面显示必需，缺失会导致窗口空白）'
$wv2Keys = @(
    'HKLM:\SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}',
    'HKLM:\SOFTWARE\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}',
    'HKCU:\SOFTWARE\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}'
)
$hasWv2 = $false
foreach ($k in $wv2Keys) { if (Test-Path $k) { $hasWv2 = $true } }
if (-not $hasWv2) {
    Write-Warn2 '未检测到 WebView2 运行时，正在从微软官方下载安装（约 2 MB 引导器）…'
    $wv2Setup = Join-Path $env:TEMP 'MicrosoftEdgeWebview2Setup.exe'
    Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/p/?LinkId=2124703' -OutFile $wv2Setup -UseBasicParsing
    Start-Process -FilePath $wv2Setup -ArgumentList '/silent','/install' -Wait
    Remove-Item $wv2Setup -Force -ErrorAction SilentlyContinue
    Write-Ok 'WebView2 运行时安装完成'
} else {
    Write-Ok 'WebView2 运行时已就绪'
}

# ---------- 6. 完成 + 启动 ----------
Write-Host ''
Write-Host '========================================' -ForegroundColor Blue
Write-Host '   安装完成！' -ForegroundColor Green
Write-Host '========================================' -ForegroundColor Blue
Write-Host ''
Write-Host '  启动方式（任选其一）：'
Write-Host '    1. 新开一个终端，输入命令:  c-clean'
Write-Host "    2. 开始菜单搜索「C盘垃圾清理」"
Write-Host "    3. 直接运行: $InstallDir\$ExeName"
Write-Host ''

Write-Step '正在启动应用…'
Start-Process -FilePath (Join-Path $InstallDir $ExeName)
Write-Ok '已启动'
