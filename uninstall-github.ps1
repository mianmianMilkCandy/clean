# ============================================================
#  C Drive Junk Cleaner - GitHub one-click uninstaller
#
#  Usage (works in both CMD and PowerShell):
#      powershell -Command "iex (irm 'https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/uninstall-github.ps1')"
#  Shorthand (PowerShell only):
#      irm https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/uninstall-github.ps1 | iex
#
#  NOTE: this file is 100% ASCII on purpose. Chinese UI strings are
#  decoded at runtime from UTF-8 base64, so they survive PS 5.1's
#  ISO-8859-1 default decoding when the script is piped from irm.
#
#  Steps:
#    1. Stop running c-clean.exe
#    2. Remove %LOCALAPPDATA%\Programs\c-drive-cleaner
#    3. Remove install dir from user PATH
#    4. Remove Start Menu shortcut
#    5. Keep Edge WebView2 (shared system component)
# ============================================================

$ErrorActionPreference = 'Stop'

# TLS 1.2 for older PowerShell
try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch {}

$ExeName    = 'c-clean.exe'
$InstallDir = Join-Path $env:LOCALAPPDATA 'Programs\c-drive-cleaner'

# Decode UTF-8 base64 into a .NET string (keeps this file pure ASCII)
function ZH([string]$b64) { [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($b64)) }

$T_TITLE   = ZH 'Q+ebmOWeg+Wcvua4heeQhiAtIOS4gOmUruWNuOi9vQ=='
$T_APP     = ZH 'Q+ebmOWeg+Wcvua4heeQhg=='
$T_STOP    = ZH '5YGc5q2i6L+Q6KGM5Lit55qE56iL5bqPLi4u'
$T_STOP_OK = ZH '56iL5bqP5bey5YGc5q2i'
$T_STOP_NA = ZH '56iL5bqP5pyq5Zyo6L+Q6KGM'
$T_DEL     = ZH '5Yig6Zmk56iL5bqP55uu5b2VLi4u'
$T_DEL_OK  = ZH '56iL5bqP55uu5b2V5bey5Yig6Zmk'
$T_DEL_NA  = ZH '56iL5bqP55uu5b2V5LiN5a2Y5Zyo77yI5Y+v6IO95bCa5pyq5a6J6KOF77yJ'
$T_PATH    = ZH '5riF55CG55So5oi3IFBBVEguLi4='
$T_PATH_OK = ZH '5bey5LuOIFBBVEgg56e76Zmk5a6J6KOF55uu5b2V'
$T_PATH_NA = ZH 'UEFUSCDkuK3ml6DmrovnlZk='
$T_LNK     = ZH '5Yig6Zmk5byA5aeL6I+c5Y2V5b+r5o235pa55byPLi4u'
$T_LNK_OK  = ZH '5b+r5o235pa55byP5bey5Yig6Zmk'
$T_LNK_NA  = ZH '5b+r5o235pa55byP5LiN5a2Y5Zyo'
$T_DONE    = ZH '5Y246L295a6M5oiQ77yB'
$T_WV2     = ZH '5o+Q56S677yaRWRnZSBXZWJWaWV3MiDkuLrns7vnu5/lhbHkuqvnu4Tku7bvvIzlt7Lkv53nlZnvvIjkuI3lvbHlk43lhbbku5blupTnlKjvvInjgII='

function Write-Step($msg)  { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-Ok($msg)    { Write-Host "    $msg" -ForegroundColor Green }
function Write-Warn2($msg) { Write-Host "    $msg" -ForegroundColor Yellow }

Write-Host '========================================' -ForegroundColor Blue
Write-Host "   $T_TITLE" -ForegroundColor Blue
Write-Host '========================================' -ForegroundColor Blue

# ---------- 1. Stop running app ----------
Write-Step $T_STOP
$procs = Get-Process -Name 'c-clean' -ErrorAction SilentlyContinue
if ($procs) {
    $procs | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 500
    Write-Ok $T_STOP_OK
} else {
    Write-Ok $T_STOP_NA
}

# ---------- 2. Remove install directory ----------
Write-Step $T_DEL
if (Test-Path $InstallDir) {
    Remove-Item $InstallDir -Recurse -Force -ErrorAction SilentlyContinue
    if (Test-Path $InstallDir) {
        # retry after a short wait (file locks may need a moment to release)
        Start-Sleep -Seconds 2
        Remove-Item $InstallDir -Recurse -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path $InstallDir) { Write-Warn2 $T_DEL_NA } else { Write-Ok $T_DEL_OK }
} else {
    Write-Ok $T_DEL_NA
}

# ---------- 3. Clean user PATH ----------
# Match by substring so every storage form is caught:
# exact path, trailing backslash, different case, or unexpanded
# %LOCALAPPDATA% form stored as REG_EXPAND_SZ.
Write-Step $T_PATH
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath) {
    $entries = @($userPath -split ';' | Where-Object { $_ -ne '' })
    $kept    = @($entries | Where-Object { $_ -notlike '*c-drive-cleaner*' })
    if ($kept.Count -lt $entries.Count) {
        [Environment]::SetEnvironmentVariable('Path', ($kept -join ';'), 'User')
        Write-Ok $T_PATH_OK
    } else {
        Write-Ok $T_PATH_NA
    }
} else {
    Write-Ok $T_PATH_NA
}

# ---------- 4. Remove Start Menu shortcut ----------
Write-Step $T_LNK
$StartMenu = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs'
$Shortcut  = Join-Path $StartMenu ($T_APP + '.lnk')
if (Test-Path $Shortcut) {
    Remove-Item $Shortcut -Force -ErrorAction SilentlyContinue
    Write-Ok $T_LNK_OK
} else {
    Write-Ok $T_LNK_NA
}

# ---------- 5. Done ----------
Write-Host ''
Write-Host '========================================' -ForegroundColor Blue
Write-Host "   $T_DONE" -ForegroundColor Green
Write-Host '========================================' -ForegroundColor Blue
Write-Host ''
Write-Host "  $T_WV2"
Write-Host ''
