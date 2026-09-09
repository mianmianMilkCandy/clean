# ============================================================
#  C盘垃圾清理 · 桌面应用一键安装脚本
#
#  用法（在项目根目录的终端中执行）：
#      powershell -ExecutionPolicy Bypass -File .\install.ps1
#      powershell -ExecutionPolicy Bypass -File .\install.ps1 -Run   # 安装完立即运行
#
#  安装完成后，在任意新终端输入命令即可启动：
#      c-clean
# ============================================================

param(
    [switch]$Run  # 安装完成后立即启动应用
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Root       = $PSScriptRoot
$VenvPython = Join-Path $Root '.venv\Scripts\python.exe'
$WebappDir  = Join-Path $Root 'webapp'
$DistDir    = Join-Path $WebappDir 'dist'
$BuildOut   = Join-Path $Root 'build-app'
$InstallDir = Join-Path $env:LOCALAPPDATA 'Programs\c-drive-cleaner'
$ExeName    = 'c-clean.exe'

function Write-Step($msg)  { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-Ok($msg)     { Write-Host "    $msg" -ForegroundColor Green }
function Write-Warn2($msg)  { Write-Host "    $msg" -ForegroundColor Yellow }

Write-Host '========================================' -ForegroundColor Blue
Write-Host '   C盘垃圾清理 · 桌面应用安装程序'         -ForegroundColor Blue
Write-Host '========================================' -ForegroundColor Blue

# ---------- 1. Python 虚拟环境 ----------
Write-Step '检查 Python 虚拟环境'
if (-not (Test-Path $VenvPython)) {
    Write-Warn2 '未找到 .venv，正在创建虚拟环境…'
    $py = Get-Command python -ErrorAction SilentlyContinue
    if (-not $py) { throw '未找到 python，请先安装 Python 3.10+ 并加入 PATH' }
    & python -m venv (Join-Path $Root '.venv')
}
Write-Ok "虚拟环境就绪: $VenvPython"

# ---------- 2. 安装 Python 依赖（下载） ----------
Write-Step '下载并安装 Python 依赖（pywebview / pyinstaller / pillow）'
& $VenvPython -m pip install --disable-pip-version-check -q pywebview pyinstaller pillow
if ($LASTEXITCODE -ne 0) { throw 'Python 依赖安装失败，请检查网络连接' }
Write-Ok '依赖安装完成'

# ---------- 3. 前端构建产物 ----------
Write-Step '检查前端构建产物（webapp/dist）'
if (-not (Test-Path (Join-Path $DistDir 'index.html'))) {
    Write-Warn2 '未发现前端产物，尝试执行 npm run build …'
    Push-Location $WebappDir
    try {
        if (Test-Path (Join-Path $WebappDir 'node_modules')) {
            npm run build
        } else {
            npm install
            npm run build
        }
        if ($LASTEXITCODE -ne 0) { throw '前端构建失败' }
    } finally { Pop-Location }
}
Write-Ok '前端产物就绪'

# ---------- 4. 生成应用图标 ----------
Write-Step '生成应用图标'
if (-not (Test-Path (Join-Path $Root 'assets_appicon.ico'))) {
    Push-Location $Root
    try {
        & $VenvPython -c @'
from PIL import Image, ImageDraw
PRIMARY = (11, 87, 208, 255)
BG = (250, 249, 253, 255)
def make(size):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=max(2, size // 5), fill=BG)
    m = size * 0.22
    d.polygon([(size / 2, m), (size - m, size - m * 0.9), (m, size - m * 0.9)], fill=PRIMARY)
    return img
sizes = [16, 24, 32, 48, 64, 128, 256]
imgs = [make(s) for s in sizes]
imgs[-1].save('assets_appicon.ico', format='ICO', sizes=[(s, s) for s in sizes], append_images=imgs[:-1])
'@
    } finally { Pop-Location }
}
Write-Ok '图标就绪'

# ---------- 5. PyInstaller 打包 ----------
Write-Step '打包桌面应用（PyInstaller 单文件 exe）'
& $VenvPython -m PyInstaller --noconfirm --onefile --windowed `
    --name c-clean `
    --icon (Join-Path $Root 'assets_appicon.ico') `
    --distpath $BuildOut `
    --workpath  (Join-Path $Root 'build-work') `
    --add-data  "$DistDir;webapp/dist" `
    (Join-Path $Root 'desktop.py')
if ($LASTEXITCODE -ne 0) { throw '打包失败' }
$ExePath = Join-Path $BuildOut $ExeName
if (-not (Test-Path $ExePath)) { throw '未找到打包产物' }
Write-Ok "打包完成: $ExePath ($([math]::Round((Get-Item $ExePath).Length / 1MB, 1)) MB)"

# ---------- 6. 安装到用户目录并注册 PATH ----------
Write-Step '安装到用户程序目录并注册 PATH'
New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
Copy-Item $ExePath (Join-Path $InstallDir $ExeName) -Force
Write-Ok "已安装: $InstallDir\$ExeName"

# 注册到用户 PATH（幂等）
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -notlike "*$InstallDir*") {
    [Environment]::SetEnvironmentVariable('Path', "$userPath;$InstallDir", 'User')
    Write-Ok '已将安装目录加入用户 PATH'
} else {
    Write-Ok 'PATH 已包含安装目录，跳过'
}

# 创建「开始菜单」快捷方式（中文名，便于在开始菜单搜索）
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

# ---------- 6.5 WebView2 运行时检测 ----------
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

# ---------- 7. 完成 ----------
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
Write-Host '  注意: PATH 修改对「已打开的终端」不生效，请打开新终端再输入 c-clean。'
Write-Host ''

if ($Run) {
    Write-Step '正在启动应用…'
    Start-Process -FilePath (Join-Path $InstallDir $ExeName)
    Write-Ok '已启动'
}
