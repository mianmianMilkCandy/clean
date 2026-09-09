/** 本地清理服务（server.py）API 客户端 */
import type { CleanResult, DiskUsage, FeedbackPayload, ScanProgress, ScanResult } from '../types';

const BASE = '';
const TIMEOUT = 0; // 扫描/清理耗时较长，不设超时

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const data = await fetch(`${BASE}${path}`, {
    ...init,
    signal: init?.signal ?? controller.signal,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });
  if (!data.ok) {
    let message = `HTTP ${data.status}`;
    try {
      const body = await data.json();
      if (body?.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  return (await data.json()) as T;
}

export const api = {
  async health(): Promise<{ ok: boolean; version: string }> {
    return request('/api/health');
  },

  async diskUsage(): Promise<DiskUsage> {
    return request('/api/disk-usage');
  },

  async scan(): Promise<ScanResult> {
    return request('/api/scan', { method: 'POST' });
  },

  /** 启动后台扫描（带进度上报，约 10~20 秒） */
  async scanStart(): Promise<{ ok: boolean; running?: boolean }> {
    return request('/api/scan/start', { method: 'POST' });
  },

  /** 查询后台扫描进度 */
  async scanProgress(): Promise<ScanProgress> {
    return request('/api/scan/progress');
  },

  async clean(paths: string[]): Promise<CleanResult> {
    return request('/api/clean', {
      method: 'POST',
      body: JSON.stringify({ paths }),
    });
  },

  async submitFeedback(payload: FeedbackPayload): Promise<{ ok: boolean; saved: boolean; emailed: boolean }> {
    return request('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
