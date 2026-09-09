/** 全局应用状态（轻量响应式：变更事件广播） */
import type { DiskUsage, ScanResult } from '../types';

export interface AppState {
  serverOnline: boolean | null;
  serverChecked: boolean;
  diskUsage: DiskUsage | null;
  scan: ScanResult | null;
  scanning: boolean;
}

export const appState: AppState = {
  serverOnline: null,
  serverChecked: false,
  diskUsage: null,
  scan: null,
  scanning: false,
};

const listeners = new Set<() => void>();

export function notifyState(): void {
  listeners.forEach((fn) => fn());
}

export function onStateChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
