# ============================================================
#  C Drive Junk Cleaner - GitHub one-click installer
#
#  Usage (any Windows PowerShell):
#      irm https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/install-github.ps1 | iex
#  Also works (outside mainland China):
#      irm https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/install-github.ps1 | iex
#
#  NOTE: this file is 100% ASCII on purpose. Chinese UI strings are
#  decoded at runtime from UTF-8 base64, so they survive PS 5.1's
#  ISO-8859-1 default decoding when the script is piped from irm.
#
#  Steps:
#    1. Download c-clean.exe from GitHub Release (~20 MB, single file)
#    2. Install to %LOCALAPPDATA%\Programs\c-drive-cleaner
#    3. Register `c-clean` command in user PATH
#    4. Create Start Menu shortcut
#    5. Detect and install Edge WebView2 runtime if missing
#    6. Launch the app
# ============================================================

$ErrorActionPreference = 'Stop'

# TLS 1.2 for older PowerShell
try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch {}

$RepoOwner   = 'mianmianMilkCandy'
$RepoName    = 'clean'
$ExeName     = 'c-clean.exe'
$DownloadUrl = "https://github.com/$RepoOwner/$RepoName/releases/latest/download/$ExeName"
$InstallDir  = Join-Path $env:LOCALAPPDATA 'Programs\c-drive-cleaner'

# Decode UTF-8 base64 into a .NET string (keeps this file pure ASCII)
function ZH([string]$b64) { [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($b64)) }

$T_TITLE   = ZH 'Q+ebmOWeg+Wcvua4heeQhiAtIEdpdEh1YiDkuIDplK7lronoo4XnqIvluo8='
$T_APP     = ZH 'Q+ebmOWeg+Wcvua4heeQhg=='
$T_DL      = ZH '5LuOIEdpdEh1YiBSZWxlYXNlIOS4i+i9veW6lOeUqO+8iOe6piAyMCBNQu+8jOWNleaWh+S7tuWFjeS+nei1lu+8iQ=='
$T_DL_OK   = ZH '5LiL6L295a6M5oiQ'
$T_DL_FAIL = ZH '5LiL6L295aSx6LSl'
$T_NET     = ZH '6K+35qOA5p+l572R57uc6L+e5o6l5ZCO6YeN6K+V77yI5Zu95YaF572R57uc5Y+v6IO96ZyA6KaB5Luj55CG6K6/6ZeuIEdpdEh1Yu+8iQ=='
$T_INST    = ZH '5a6J6KOF5Yiw55So5oi356iL5bqP55uu5b2V'
$T_INST_OK = ZH '5bey5a6J6KOF'
$T_PATH_OK = ZH '5bey5bCG5a6J6KOF55uu5b2V5Yqg5YWl55So5oi3IFBBVEg='
$T_PATH_SP = ZH 'UEFUSCDlt7LljIXlkKvlronoo4Xnm67lvZXvvIzot7Pov4c='
$T_LNK_OK  = ZH '5bey5Yib5bu65byA5aeL6I+c5Y2V5b+r5o235pa55byP44CMQ+ebmOWeg+Wcvua4heeQhuOAjQ=='
$T_WV2_CHK = ZH '5qOA5p+lIEVkZ2UgV2ViVmlldzIg6L+Q6KGM5pe277yI55WM6Z2i5pi+56S65b+F6ZyA77yM57y65aSx5Lya5a+86Ie056qX5Y+j56m655m977yJ'
$T_WV2_MIS = ZH '5pyq5qOA5rWL5YiwIFdlYlZpZXcyIOi/kOihjOaXtu+8jOato+WcqOS7juW+rui9r+WumOaWueS4i+i9veWuieijheKApg=='
$T_WV2_OK  = ZH 'V2ViVmlldzIg6L+Q6KGM5pe25a6J6KOF5a6M5oiQ'
$T_WV2_RDY = ZH 'V2ViVmlldzIg6L+Q6KGM5pe25bey5bCx57uq'
$T_DONE    = ZH '5a6J6KOF5a6M5oiQ77yB'
$T_WAYS    = ZH '5ZCv5Yqo5pa55byP77yI5Lu76YCJ5YW25LiA77yJ77ya'
$T_WAY1    = ZH 'MS4g5paw5byA5LiA5Liq57uI56uv77yM6L6T5YWl5ZG95LukOiAgYy1jbGVhbg=='
$T_WAY2    = ZH 'Mi4g5byA5aeL6I+c5Y2V5pCc57Si44CMQ+ebmOWeg+Wcvua4heeQhuOAjQ=='
$T_WAY3    = ZH 'My4g55u05o6l6L+Q6KGMOg=='
$T_LAUNCH  = ZH '5q2j5Zyo5ZCv5Yqo5bqU55So4oCm'
$T_LAUNCHED = ZH '5bey5ZCv5Yqo'

function Write-Step($msg)  { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-Ok($msg)    { Write-Host "    $msg" -ForegroundColor Green }
function Write-Warn2($msg) { Write-Host "    $msg" -ForegroundColor Yellow }

Write-Host '========================================' -ForegroundColor Blue
Write-Host "   $T_TITLE" -ForegroundColor Blue
Write-Host '========================================' -ForegroundColor Blue

# ---------- 1. Download app ----------
Write-Step $T_DL
$tmpExe = Join-Path $env:TEMP $ExeName
$ProgressPreference = 'SilentlyContinue'
try {
    Invoke-WebRequest -Uri $DownloadUrl -OutFile $tmpExe -UseBasicParsing
} catch {
    throw "$T_DL_FAIL : $($_.Exception.Message)`n    $T_NET"
}
$sizeMB = [math]::Round((Get-Item $tmpExe).Length / 1MB, 1)
Write-Ok "$T_DL_OK ($sizeMB MB)"

# ---------- 2. Install to user directory ----------
Write-Step $T_INST
New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
Copy-Item $tmpExe (Join-Path $InstallDir $ExeName) -Force
Remove-Item $tmpExe -Force -ErrorAction SilentlyContinue
Write-Ok "$T_INST_OK : $InstallDir\$ExeName"

# ---------- 3. Register PATH (idempotent) ----------
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -notlike "*$InstallDir*") {
    [Environment]::SetEnvironmentVariable('Path', "$userPath;$InstallDir", 'User')
    Write-Ok $T_PATH_OK
} else {
    Write-Ok $T_PATH_SP
}

# ---------- 4. Start Menu shortcut ----------
$StartMenu = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs'
$Shortcut  = Join-Path $StartMenu ($T_APP + '.lnk')
$Shell = New-Object -ComObject WScript.Shell
$Sc = $Shell.CreateShortcut($Shortcut)
$Sc.TargetPath = Join-Path $InstallDir $ExeName
$Sc.WorkingDirectory = $InstallDir
$Sc.IconLocation = Join-Path $InstallDir $ExeName
$Sc.Description = $T_APP
$Sc.Save()
Write-Ok $T_LNK_OK

# ---------- 5. WebView2 runtime check ----------
Write-Step $T_WV2_CHK
$wv2Keys = @(
    'HKLM:\SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}',
    'HKLM:\SOFTWARE\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}',
    'HKCU:\SOFTWARE\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}'
)
$hasWv2 = $false
foreach ($k in $wv2Keys) { if (Test-Path $k) { $hasWv2 = $true } }
if (-not $hasWv2) {
    Write-Warn2 $T_WV2_MIS
    $wv2Setup = Join-Path $env:TEMP 'MicrosoftEdgeWebview2Setup.exe'
    Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/p/?LinkId=2124703' -OutFile $wv2Setup -UseBasicParsing
    Start-Process -FilePath $wv2Setup -ArgumentList '/silent','/install' -Wait
    Remove-Item $wv2Setup -Force -ErrorAction SilentlyContinue
    Write-Ok $T_WV2_OK
} else {
    Write-Ok $T_WV2_RDY
}

# ---------- 6. Done + launch ----------
Write-Host ''
Write-Host '========================================' -ForegroundColor Blue
Write-Host "   $T_DONE" -ForegroundColor Green
Write-Host '========================================' -ForegroundColor Blue
Write-Host ''
Write-Host "  $T_WAYS"
Write-Host "  $T_WAY1"
Write-Host "  $T_WAY2"
Write-Host "  $T_WAY3 $InstallDir\$ExeName"
Write-Host ''

Write-Step $T_LAUNCH
Start-Process -FilePath (Join-Path $InstallDir $ExeName)
Write-Ok $T_LAUNCHED
