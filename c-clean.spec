# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['c:/Users/Tatsumi/Desktop/c盘清理/desktop.py'],
    pathex=[],
    binaries=[],
    datas=[('c:/Users/Tatsumi/Desktop/c盘清理/webapp/dist', 'webapp/dist')],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='c-clean',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['c:/Users/Tatsumi/Desktop/c盘清理/assets_appicon.ico'],
)
