/**
 * 动态配色：浏览器/系统提供用户强调色时，以其为种子生成 Material 3 浅色方案；
 * 无法获取时使用 tokens.css 中的 Blue 备用主题。
 *
 * 获取途径（按优先级）：
 *  1. URL 参数 ?accent=#RRGGBB
 *  2. localStorage 中保存的强调色（应用内记忆）
 *  3. 浏览器/系统强调色（标准 Web API 暂未提供，未来可用时此处接入）
 */
import { argbFromHex, hexFromArgb, themeFromSourceColor } from '@material/material-color-utilities';

const ACCENT_KEY = 'app-accent-color';

const ROLE_MAP: Record<string, string> = {
  primary: 'primary',
  onPrimary: 'on-primary',
  primaryContainer: 'primary-container',
  onPrimaryContainer: 'on-primary-container',
  secondary: 'secondary',
  onSecondary: 'on-secondary',
  secondaryContainer: 'secondary-container',
  onSecondaryContainer: 'on-secondary-container',
  tertiary: 'tertiary',
  onTertiary: 'on-tertiary',
  tertiaryContainer: 'tertiary-container',
  onTertiaryContainer: 'on-tertiary-container',
  error: 'error',
  onError: 'on-error',
  errorContainer: 'error-container',
  onErrorContainer: 'on-error-container',
  surface: 'surface',
  onSurface: 'on-surface',
  surfaceVariant: 'surface-variant',
  onSurfaceVariant: 'on-surface-variant',
  surfaceDim: 'surface-dim',
  surfaceBright: 'surface-bright',
  surfaceContainerLowest: 'surface-container-lowest',
  surfaceContainerLow: 'surface-container-low',
  surfaceContainer: 'surface-container',
  surfaceContainerHigh: 'surface-container-high',
  surfaceContainerHighest: 'surface-container-highest',
  outline: 'outline',
  outlineVariant: 'outline-variant',
  inverseSurface: 'inverse-surface',
  inverseOnSurface: 'inverse-on-surface',
  inversePrimary: 'inverse-primary',
};

function kebab(name: string): string {
  return name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/** 尝试获取用户强调色 */
function obtainAccentColor(): string | null {
  try {
    const url = new URL(location.href);
    const fromUrl = url.searchParams.get('accent');
    if (fromUrl && /^#[0-9a-fA-F]{6}$/.test(fromUrl)) {
      localStorage.setItem(ACCENT_KEY, fromUrl);
      return fromUrl;
    }
    const stored = localStorage.getItem(ACCENT_KEY);
    if (stored && /^#[0-9a-fA-F]{6}$/.test(stored)) return stored;
  } catch {
    /* 忽略：无法访问 localStorage 时使用备用主题 */
  }
  // 浏览器/系统强调色：当前无标准 Web API 可读取，保持备用主题
  return null;
}

/** 应用动态配色；返回是否已启用动态主题 */
export function applyDynamicTheme(): boolean {
  const accent = obtainAccentColor();
  if (!accent) return false;
  try {
    const { schemes } = themeFromSourceColor(argbFromHex(accent));
    const light = schemes.light;
    for (const [prop, role] of Object.entries(ROLE_MAP)) {
      const value = (light as unknown as Record<string, number>)[prop];
      if (typeof value === 'number') {
        document.documentElement.style.setProperty(`--md-sys-color-${role}`, hexFromArgb(value));
      }
    }
    // surfaceTint 跟随 primary
    document.documentElement.style.setProperty('--md-sys-color-surface-tint', hexFromArgb(light.primary));
    return true;
  } catch {
    return false;
  }
}

/** 设置/清除强调色（供设置能力使用） */
export function setAccentColor(hex: string | null): void {
  try {
    if (hex && /^#[0-9a-fA-F]{6}$/.test(hex)) {
      localStorage.setItem(ACCENT_KEY, hex.toLowerCase());
    } else {
      localStorage.removeItem(ACCENT_KEY);
    }
    location.reload();
  } catch {
    /* ignore */
  }
}
