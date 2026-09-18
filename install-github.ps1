# ============================================================
#  C Drive Junk Cleaner - GitHub one-click installer  (v2.0.0)
#
#  Universal command (works in both CMD and PowerShell):
#      powershell -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; $s=$null; foreach($u in @('https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/install-github.ps1','https://ghfast.top/https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/install-github.ps1','https://raw.githubusercontent.com/mianmianMilkCandy/clean/main/install-github.ps1')){ try{ $s=irm $u -TimeoutSec 20; break }catch{} }; if($s){ iex $s }else{ Write-Host 'ALL DOWNLOAD SOURCES UNREACHABLE - CHECK NETWORK' }"
#  Shorthand (PowerShell only):
#      irm https://cdn.jsdelivr.net/gh/mianmianMilkCandy/clean@main/install-github.ps1 | iex
#
#  NOTE: this file is 100% ASCII on purpose. Chinese UI strings are
#  decoded at runtime from UTF-8 base64, so they survive PS 5.1's
#  ISO-8859-1 default decoding when the script is piped from irm.
#
#  v2.0.0 improvements over v1.0.0:
#    1. exe is downloaded from the fastest of 4 mirrors (speed probe)
#       - fixes slow / failed direct GitHub downloads in mainland China
#    2. SHA-256 integrity verification of the downloaded exe
#       - a third-party mirror can never serve tampered content
#    3. automatic failover to the next mirror on any failure
#    4. stops a running old version before upgrading in place
#    5. retry logic on transient network errors
#
#  Steps:
#    1. Stop a running old version
#    2. Probe mirror speeds (first 256 KB of the exe)
#    3. Download c-clean.exe (~20.4 MB) from the fastest mirror
#    4. Verify SHA-256 + size + PE header, failover on mismatch
#    5. Install to %LOCALAPPDATA%\Programs\c-drive-cleaner
#    6. Register `c-clean` command in user PATH
#    7. Create Start Menu shortcut
#    8. Detect and install Edge WebView2 runtime if missing
#    9. Launch the app
# ============================================================

$ErrorActionPreference = 'Stop'
$ProgressPreference     = 'SilentlyContinue'

# TLS 1.2 for older PowerShell
try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch {}

$AppVersion  = '2.0.0'
$ExeName     = 'c-clean.exe'
$ExeUrl      = 'https://github.com/mianmianMilkCandy/clean/releases/download/v2.0.0/c-clean.exe'
$ExpectedSha = '92E3D186DEBF0C2C1389E36E116406CA91ADF3A89722CBAE8F8E93D8B5A33C43'
$MinBytes    = 15MB
$InstallDir  = Join-Path $env:LOCALAPPDATA 'Programs\c-drive-cleaner'

# exe download mirrors: GitHub release accelerators first (fast in
# mainland China), direct GitHub last (fast elsewhere). Every file
# is verified by SHA-256, so a mirror cannot serve tampered content.
$Mirrors = @(
    @{ Label = 'gh-proxy.com'; Url = "https://gh-proxy.com/$ExeUrl" }
    @{ Label = 'ghproxy.net';  Url = "https://ghproxy.net/$ExeUrl"  }
    @{ Label = 'ghfast.top';   Url = "https://ghfast.top/$ExeUrl"   }
    @{ Label = 'github.com';   Url = $ExeUrl                         }
)

# Decode UTF-8 base64 into a .NET string (keeps this file pure ASCII)
function ZH([string]$b64) { [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($b64)) }

$T_TITLE       = ZH 'Q+ebmOWeg+Wcvua4heeQhiAtIOS4gOmUruWuieijhSB2Mi4wLjA='
$T_APP         = ZH 'Q+ebmOWeg+Wcvua4heeQhg=='
$T_STOP        = ZH '5YGc5q2i6L+Q6KGM5Lit55qE5pen54mI5pys56iL5bqPLi4u'
$T_STOP_OK     = ZH '5pen54mI5pys5bey5YGc5q2i'
$T_STOP_NA     = ZH '5peg6L+Q6KGM5Lit55qE5pen54mI5pys'
$T_PROBE       = ZH '5q2j5Zyo5rWL6YCf6YCJ5oup5pyA5b+r5LiL6L295rqQLi4u'
$T_PROBE_OK    = ZH '5bey6YCJ5oup5LiL6L295rqQ'
$T_PROBE_NA    = ZH '5rWL6YCf5aSx6LSl77yM5oyJ6buY6K6k6aG65bqP5bCd6K+V5LiL6L29Li4u'
$T_DL          = ZH '5q2j5Zyo5LiL6L29IGMtY2xlYW4uZXhlICjnuqYgMjAuNCBNQikuLi4='
$T_DL_OK       = ZH '5LiL6L295a6M5oiQ'
$T_DL_FAIL     = ZH '5q2k5rqQ5LiL6L295aSx6LSl77yM5YiH5o2i5LiL5LiA5LiqLi4u'
$T_VERIFY      = ZH '5q2j5Zyo5qCh6aqM5paH5Lu25a6M5pW05oCnIChTSEEtMjU2KS4uLg=='
$T_VERIFY_OK   = ZH '5qCh6aqM6YCa6L+H'
$T_VERIFY_FAIL = ZH '5qCh6aqM5aSx6LSl77yM5YiH5o2i5LiL5LiA5Liq5LiL6L295rqQ6YeN6K+VLi4u'
$T_ALL_FAIL    = ZH '5omA5pyJ5LiL6L295rqQ5Z2H5LiL6L295aSx6LSl77yB'
$T_MANUAL      = ZH '6K+35qOA5p+l572R57uc5ZCO6YeN6K+V77yM5oiW5omL5Yqo5LiL6L295a6J6KOF77ya'
$T_INST        = ZH '5q2j5Zyo5a6J6KOF5Yiw55So5oi355uu5b2VLi4u'
$T_INST_OK     = ZH '5a6J6KOF5a6M5oiQ'
$T_PATH_OK     = ZH '5bey5rOo5YaMIGMtY2xlYW4g5ZG95Luk5Yiw55So5oi3IFBBVEg='
$T_PATH_SP     = ZH 'UEFUSCDlt7LljIXlkKvlronoo4Xnm67lvZXvvIzot7Pov4c='
$T_LNK_OK      = ZH '5bey5Yib5bu65byA5aeL6I+c5Y2V5b+r5o235pa55byP44CMQ+ebmOWeg+Wcvua4heeQhuOAjQ=='
$T_LNK_FAIL    = ZH '5b+r5o235pa55byP5Yib5bu65aSx6LSl77yI5LiN5b2x5ZON5L2/55So77yM5Y+v55SoIGMtY2xlYW4g5ZG95Luk5ZCv5Yqo77yJ'
$T_WV2_CHK     = ZH '5qOA5rWLIEVkZ2UgV2ViVmlldzIg6L+Q6KGM5pe277yI5aSa5pWwIFdpbjEwLzExIOW3suiHquW4pu+8jOe8uuWkseaXtuiHquWKqOWuieijhe+8iQ=='
$T_WV2_MIS     = ZH '5pyq5qOA5rWL5YiwIFdlYlZpZXcyIOi/kOihjOaXtu+8jOato+WcqOiHquWKqOWuieijheKApg=='
$T_WV2_OK      = ZH 'V2ViVmlldzIg6L+Q6KGM5pe25a6J6KOF5a6M5oiQ'
$T_WV2_FAIL    = ZH 'V2ViVmlldzIg5a6J6KOF5aSx6LSl77yI5bqU55So5ZCv5Yqo5pe25Lya6Ieq5Yqo5qOA5rWL5a6J6KOF77yJ'
$T_WV2_RDY     = ZH 'V2ViVmlldzIg6L+Q6KGM5pe25bey5bCx57uq'
$T_DONE        = ZH '5a6J6KOF5a6M5oiQ77yB'
$T_WAYS        = ZH '5ZCv5Yqo5pa55byP77yI5Lu76YCJ5YW25LiA77yJ77ya'
$T_WAY1        = ZH 'MS4g5Lu75oSP57uI56uv6L6T5YWl5ZG95LukOiAgYy1jbGVhbg=='
$T_WAY2        = ZH 'Mi4g5byA5aeL6I+c5Y2V54K55Ye744CMQ+ebmOWeg+Wcvua4heeQhuOAjQ=='
$T_WAY3        = ZH 'My4g55u05o6l6L+Q6KGMOg=='
$T_LAUNCH      = ZH '5q2j5Zyo5ZCv5Yqo5bqU55SoLi4u'
$T_LAUNCHED   = ZH '5bey5ZCv5Yqo'

function Write-Step($msg)  { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-Ok($msg)    { Write-Host "    $msg" -ForegroundColor Green }
function Write-Warn2($msg) { Write-Host "    $msg" -ForegroundColor Yellow }

# Probe a mirror: download the first 256 KB and return KB/s (0 = unreachable)
function Probe-Mirror($url) {
    $tmp = [IO.Path]::GetTempFileName()
    try {
        $sw = [Diagnostics.Stopwatch]::StartNew()
        & curl.exe -sfL -r 0-262143 --max-time 12 --connect-timeout 8 -o $tmp $url
        if ($LASTEXITCODE -ne 0) { return 0 }
        $len = (Get-Item $tmp).Length
        if ($len -lt 100KB) { return 0 }
        return [math]::Round($len / 1KB / $sw.Elapsed.TotalSeconds, 1)
    } catch {
        return 0
    } finally {
        Remove-Item $tmp -Force -ErrorAction SilentlyContinue
    }
}

# Download the exe via curl.exe (visible progress meter) with an
# Invoke-WebRequest fallback for systems without curl.exe.
function Get-Exe($url, $out) {
    Remove-Item $out -Force -ErrorAction SilentlyContinue
    if (Get-Command curl.exe -ErrorAction SilentlyContinue) {
        & curl.exe -fL --retry 2 --retry-delay 2 --connect-timeout 15 --max-time 900 -o $out $url
        if ($LASTEXITCODE -eq 0 -and (Test-Path $out)) { return $true }
        return $false
    }
    try {
        Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 900
        return $true
    } catch {
        return $false
    }
}

# Verify the downloaded exe: minimum size + PE header magic + SHA-256
function Test-Exe($path) {
    if (-not (Test-Path $path)) { return $false }
    if ((Get-Item $path).Length -lt $MinBytes) { return $false }
    try {
        $fs = [IO.File]::OpenRead($path)
        try {
            $b = New-Object byte[] 2
            $null = $fs.Read($b, 0, 2)
            if ($b[0] -ne 0x4D -or $b[1] -ne 0x5A) { return $false }
        } finally { $fs.Close() }
    } catch { return $false }
    return ((Get-FileHash $path -Algorithm SHA256).Hash -eq $ExpectedSha)
}

Write-Host '========================================' -ForegroundColor Blue
Write-Host "   $T_TITLE" -ForegroundColor Blue
Write-Host '========================================' -ForegroundColor Blue

# ---------- 1. stop a running old version (enables in-place upgrade) ----------
Write-Step $T_STOP
$procs = Get-Process -Name 'c-clean' -ErrorAction SilentlyContinue
if ($procs) {
    $procs | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 500
    Write-Ok $T_STOP_OK
} else {
    Write-Ok $T_STOP_NA
}

# ---------- 2. probe mirror speeds ----------
Write-Step $T_PROBE
$ranked = @()
if (Get-Command curl.exe -ErrorAction SilentlyContinue) {
    foreach ($m in $Mirrors) {
        $spd = Probe-Mirror $m.Url
        if ($spd -gt 0) {
            $ranked += [pscustomobject]@{ Label = $m.Label; Url = $m.Url; Speed = $spd }
        }
    }
}
if ($ranked.Count -gt 0) {
    $ranked = @($ranked | Sort-Object Speed -Descending)
    $best = $ranked[0]
    Write-Ok ("$T_PROBE_OK $($best.Label) ($($best.Speed) KB/s)")
} else {
    # no probe result (curl missing or all probes failed): default order
    $ranked = @($Mirrors | ForEach-Object { [pscustomobject]@{ Label = $_.Label; Url = $_.Url; Speed = 0 } })
    Write-Warn2 $T_PROBE_NA
}

# ---------- 3. download + verify (with failover) ----------
$tmpExe = Join-Path $env:TEMP $ExeName
$dlOk = $false
Write-Step $T_DL
foreach ($c in $ranked) {
    if (Get-Exe $c.Url $tmpExe) {
        Write-Host "    [$($c.Label)] $T_DL_OK"
        Write-Host "    $T_VERIFY"
        if (Test-Exe $tmpExe) {
            Write-Ok $T_VERIFY_OK
            $dlOk = $true
            break
        } else {
            Write-Warn2 $T_VERIFY_FAIL
        }
    } else {
        Write-Warn2 "[$($c.Label)] $T_DL_FAIL"
    }
}

if (-not $dlOk) {
    Write-Host ''
    Write-Host "    $T_ALL_FAIL" -ForegroundColor Red
    Write-Host "    $T_MANUAL $ExeUrl" -ForegroundColor Yellow
} else {
    # ---------- 4. install to user directory ----------
    Write-Step $T_INST
    New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
    Copy-Item $tmpExe (Join-Path $InstallDir $ExeName) -Force
    Remove-Item $tmpExe -Force -ErrorAction SilentlyContinue
    Write-Ok "$T_INST_OK : $InstallDir\$ExeName"

    # ---------- 5. register PATH (idempotent) ----------
    $userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    if (-not $userPath) { $userPath = '' }
    if (($userPath -split ';') -notcontains $InstallDir) {
        if ($userPath.Trim()) {
            $newPath = $userPath.TrimEnd(';') + ';' + $InstallDir
        } else {
            $newPath = $InstallDir
        }
        [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
        Write-Ok $T_PATH_OK
    } else {
        Write-Ok $T_PATH_SP
    }

    # ---------- 6. Start Menu shortcut (non-fatal) ----------
    try {
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
    } catch {
        Write-Warn2 $T_LNK_FAIL
    }

    # ---------- 7. WebView2 runtime check ----------
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
        try {
            $wv2Setup = Join-Path $env:TEMP 'MicrosoftEdgeWebview2Setup.exe'
            Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/p/?LinkId=2124703' -OutFile $wv2Setup -UseBasicParsing
            Start-Process -FilePath $wv2Setup -ArgumentList '/silent','/install' -Wait
            Remove-Item $wv2Setup -Force -ErrorAction SilentlyContinue
            Write-Ok $T_WV2_OK
        } catch {
            Write-Warn2 $T_WV2_FAIL
        }
    } else {
        Write-Ok $T_WV2_RDY
    }

    # ---------- 8. done + launch ----------
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
}
