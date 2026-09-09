/** IndexedDB 持久化：反馈草稿/历史、扫描缓存、偏好 */
import type { FeedbackSubmission, ScanResult } from '../types';

const DB_NAME = 'c-drive-cleaner';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('kv')) {
        db.createObjectStore('kv');
      }
      if (!db.objectStoreNames.contains('feedback')) {
        db.createObjectStore('feedback', { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(store, mode);
        const request = fn(transaction.objectStore(store));
        request.onsuccess = () => resolve(request.result as T);
        request.onerror = () => reject(request.error);
        transaction.oncomplete = () => db.close();
      }),
  );
}

export const db = {
  async getKV<T>(key: string): Promise<T | undefined> {
    return tx<T>('kv', 'readonly', (s) => s.get(key));
  },

  async setKV(key: string, value: unknown): Promise<void> {
    await tx('kv', 'readwrite', (s) => s.put(value, key));
  },

  async removeKV(key: string): Promise<void> {
    await tx('kv', 'readwrite', (s) => s.delete(key));
  },

  /** 反馈草稿 */
  async getDraft(): Promise<Record<string, string> | undefined> {
    return db.getKV<Record<string, string>>('feedback-draft');
  },

  async saveDraft(draft: Record<string, string>): Promise<void> {
    await db.setKV('feedback-draft', draft);
  },

  async clearDraft(): Promise<void> {
    await db.removeKV('feedback-draft');
  },

  /** 已提交反馈历史 */
  async listFeedback(): Promise<FeedbackSubmission[]> {
    const all = await tx<FeedbackSubmission[]>('feedback', 'readonly', (s) => s.getAll());
    return (all ?? []).sort((a, b) => b.submittedAt - a.submittedAt);
  },

  async addFeedback(item: FeedbackSubmission): Promise<void> {
    await tx('feedback', 'readwrite', (s) => s.add(item));
  },

  async clearFeedback(): Promise<void> {
    await tx('feedback', 'readwrite', (s) => s.clear());
  },

  /** 最近一次扫描结果缓存 */
  async getScanCache(): Promise<ScanResult | undefined> {
    return db.getKV<ScanResult>('scan-cache');
  },

  async saveScanCache(result: ScanResult): Promise<void> {
    await db.setKV('scan-cache', result);
  },

  async clearScanCache(): Promise<void> {
    await db.removeKV('scan-cache');
  },

  /** 清除全部本地数据（保留强调色偏好以外的用户数据均可清） */
  async clearAll(): Promise<void> {
    await db.clearDraft();
    await db.clearFeedback();
    await db.clearScanCache();
  },
};
