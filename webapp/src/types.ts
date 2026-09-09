/** 共享类型定义 */

export type ScreenId = 'home' | 'scan' | 'feedback' | 'clean';

export type JunkCategory = 'sys' | 'browser' | 'wechat' | 'qq';

export interface JunkTarget {
  /** 展示名称，如 “Chrome缓存” / “微信[wxid_xxx] - Image” */
  name: string;
  /** 目录绝对路径 */
  path: string;
  /** 分类标识 */
  category: JunkCategory;
  /** 分类展示名 */
  categoryLabel: string;
  /** 目录大小（字节） */
  size: number;
}

export interface ScanResult {
  targets: JunkTarget[];
  totals: Record<JunkCategory, number>;
  totalSize: number;
  scannedAt: number;
}

/** 后台扫描进度（GET /api/scan/progress） */
export interface ScanProgress {
  state: 'idle' | 'scanning' | 'done' | 'error';
  percent: number;
  current: string;
  error: string;
  result: ScanResult | null;
}

export interface DiskUsage {
  drive: string;
  total: number;
  used: number;
  free: number;
}

export interface CleanFailure {
  name: string;
  path: string;
  error: string;
}

export interface CleanResult {
  freed: number;
  failures: CleanFailure[];
}

export interface FeedbackPayload {
  suggestion: string;
  feedback: string;
  contact: string;
}

export interface FeedbackSubmission extends FeedbackPayload {
  id: string;
  submittedAt: number;
  emailed: boolean;
}

/** 字节数格式化 */
export function formatBytes(bytes: number, digits = 2): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let idx = 0;
  let value = bytes;
  while (value >= 1024 && idx < units.length - 1) {
    value /= 1024;
    idx += 1;
  }
  return `${value.toFixed(idx <= 1 ? 0 : digits)} ${units[idx]}`;
}

export const CATEGORY_ORDER: JunkCategory[] = ['sys', 'browser', 'wechat', 'qq'];

export const CATEGORY_ICONS: Record<JunkCategory, string> = {
  sys: 'settings_suggest',
  browser: 'language',
  wechat: 'chat',
  qq: 'forum',
};
