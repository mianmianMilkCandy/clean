/**
 * 屏幕 2：C盘扫描界面
 * - 容器框（primaryContainer，28dp 圆角）内展示核心代码扫描结果
 * - 进入后先弹出「确定开始扫描」确认框，用户确认后才启动扫描
 * - 扫描过程显示进度条（约 10~20 秒），完成后自动跳转清理界面
 * - 底部一行：形状变形加载指示器 + “前往清理垃圾”浮起按钮（占满剩余宽度）
 */
import '@material/web/button/outlined-button.js';
import '@material/web/chips/assist-chip.js';
import '@material/web/fab/fab.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/progress/linear-progress.js';
import '@material/web/ripple/ripple.js';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../components/app-bar';
import '../components/confirm-dialog';
import '../components/loading-indicator';
import { api } from '../services/api';
import { db } from '../services/db';
import { router } from '../services/router';
import { appState, notifyState, onStateChange } from '../services/state';
import {
  CATEGORY_ICONS,
  CATEGORY_ORDER,
  formatBytes,
  type JunkCategory,
  type ScanProgress,
  type ScanResult,
} from '../types';

@customElement('scan-screen')
export class ScanScreen extends LitElement {
  @state() private scan: ScanResult | null = null;
  @state() private scanning = false;
  @state() private error = '';
  @state() private offline = false;
  /** 是否弹出「确定开始扫描」确认框 */
  @state() private showStartDialog = false;
  /** 后台扫描进度（进度条数据源） */
  @state() private progress: ScanProgress | null = null;
  private unsubscribe?: () => void;
  private pollTimer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    this.scan = appState.scan;
    this.offline = appState.serverOnline === false;
    this.unsubscribe = onStateChange(() => {
      this.scan = appState.scan;
    });
    // 每次被路由激活时重新执行进入逻辑（返回则保留已有结果）
    this.addEventListener('screen-active', () => void this.handleActivation());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribe?.();
    this.stopPolling();
  }

  private async handleActivation(): Promise<void> {
    // 首次进入：优先恢复本地缓存的扫描结果
    if (!this.scan) {
      const cached = await db.getScanCache();
      if (cached) {
        this.scan = cached;
        appState.scan = cached;
        notifyState();
      }
    }
    // 从主页“开始扫描/快速开始”进入时要求重新扫描；返回（回清理页）则保留结果
    const detail = (router.currentDetail ?? {}) as { rescan?: boolean };
    if (detail.rescan || !this.scan) {
      // 若后端扫描已在进行中（如中途离开又返回），直接恢复进度轮询
      try {
        const p = await api.scanProgress();
        if (p.state === 'scanning') {
          this.progress = p;
          this.beginScanFollow();
          return;
        }
      } catch {
        /* 服务不可达时按离线处理 */
      }
      // 需求：由用户点击「确定开始扫描」后再开始扫描
      this.showStartDialog = true;
    }
    void this.refreshDisk();
  }

  private async refreshDisk(): Promise<void> {
    try {
      appState.diskUsage = await api.diskUsage();
      notifyState();
      this.offline = false;
    } catch {
      this.offline = true;
    }
  }

  /** 用户在确认框中点击「确定开始扫描」 */
  private async startScan(): Promise<void> {
    this.showStartDialog = false;
    if (this.scanning) return;
    this.scanning = true;
    this.error = '';
    this.progress = null;
    appState.scanning = true;
    notifyState();
    try {
      await api.scanStart();
      this.offline = false;
      this.beginScanFollow();
    } catch (e) {
      this.scanning = false;
      appState.scanning = false;
      notifyState();
      this.error = e instanceof Error ? e.message : '扫描启动失败';
      this.offline = true;
    }
  }

  /** 轮询后台扫描进度直至完成 */
  private beginScanFollow(): void {
    this.stopPolling();
    this.scanning = true;
    appState.scanning = true;
    notifyState();
    this.pollTimer = window.setInterval(() => void this.pollProgress(), 400);
  }

  private async pollProgress(): Promise<void> {
    try {
      const p = await api.scanProgress();
      this.progress = p;
      this.offline = false;
      if (p.state === 'done' && p.result) {
        this.stopPolling();
        this.scanning = false;
        appState.scanning = false;
        this.scan = p.result;
        appState.scan = p.result;
        notifyState();
        await db.saveScanCache(p.result);
        // 需求：扫描完毕之后自动转跳到清理的界面
        router.navigate('clean', { direction: 'right' });
      } else if (p.state === 'error') {
        this.stopPolling();
        this.scanning = false;
        appState.scanning = false;
        notifyState();
        this.error = p.error || '扫描失败';
      }
    } catch {
      /* 网络闪断时继续轮询 */
    }
  }

  private stopPolling(): void {
    if (this.pollTimer !== undefined) {
      window.clearInterval(this.pollTimer);
      this.pollTimer = undefined;
    }
  }

  private goClean(): void {
    router.navigate('clean', { direction: 'right' });
  }

  private goBack(): void {
    router.back();
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--md-sys-color-surface);
      overflow: hidden;
    }
    .toolbar-row {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 8px 24px 12px;
    }
    md-outlined-button {
      --md-outlined-button-container-shape: var(--app-shape-full);
      width: 88px;
    }
    .stage {
      flex: 1;
      display: flex;
      align-items: stretch;
      justify-content: center;
      padding: 0 24px 24px;
      min-height: 0;
    }
    .container-frame {
      position: relative;
      width: min(1048px, 100%);
      background: var(--md-sys-color-primary-container);
      border-radius: var(--app-shape-container);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      color: var(--md-sys-color-on-primary-container);
    }
    .scroll-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px 28px 12px;
      min-height: 0;
    }
    .summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(4, 30, 73, 0.12);
      margin-bottom: 12px;
    }
    .total-block .label {
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-primary-container);
      opacity: 0.75;
    }
    .total-block .value {
      font-size: 34px;
      font-weight: 500;
      line-height: 1.2;
      color: var(--md-sys-color-on-primary-container);
    }
    .disk-block {
      display: flex;
      gap: 20px;
      align-items: center;
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-primary-container);
    }
    .disk-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .disk-item .k {
      opacity: 0.7;
      font-size: var(--md-sys-typescale-body-small-size);
    }
    .disk-item .v {
      font-weight: 500;
    }
    .chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }
    .chips md-assist-chip {
      --md-assist-chip-container-shape: var(--app-shape-full);
      --md-assist-chip-container-color: rgba(255, 255, 255, 0.55);
      --md-assist-chip-label-text-color: var(--md-sys-color-on-primary-container);
      --md-assist-chip-outline-color: rgba(4, 30, 73, 0.2);
      --md-assist-chip-icon-color: var(--md-sys-color-on-primary-container);
      --md-assist-chip-label-text-font: var(--app-font-family);
    }
    .targets {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .target-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.42);
      border-radius: var(--app-shape-list-inner);
    }
    .target-row:first-child {
      border-start-start-radius: var(--app-shape-list-outer);
      border-start-end-radius: var(--app-shape-list-outer);
    }
    .target-row:last-child {
      border-end-start-radius: var(--app-shape-list-outer);
      border-end-end-radius: var(--app-shape-list-outer);
    }
    .target-row md-icon {
      color: var(--md-sys-color-on-primary-container);
      flex: 0 0 auto;
    }
    .target-info {
      flex: 1;
      min-width: 0;
    }
    .target-name {
      font-size: var(--md-sys-typescale-body-large-size);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .target-path {
      font-size: var(--md-sys-typescale-body-small-size);
      opacity: 0.72;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      direction: rtl;
      text-align: left;
    }
    .target-size {
      font-size: var(--md-sys-typescale-body-medium-size);
      font-weight: 500;
      color: var(--md-sys-color-on-primary-container);
      white-space: nowrap;
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      height: 100%;
      text-align: center;
      color: var(--md-sys-color-on-primary-container);
    }
    .empty md-icon {
      font-size: 56px;
    }
    .empty .hint {
      max-width: 480px;
      font-size: var(--md-sys-typescale-body-medium-size);
      opacity: 0.8;
      line-height: 1.5;
    }
    .bottom-row {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 14px 24px 22px;
      background: linear-gradient(to top, rgba(211, 227, 253, 0.95), rgba(211, 227, 253, 0));
    }
    .bottom-row md-fab {
      --md-fab-container-shape: var(--app-shape-full);
      --md-fab-primary-container-color: var(--md-sys-color-primary);
      --md-fab-primary-label-text-color: var(--md-sys-color-on-primary);
      --md-fab-primary-icon-color: var(--md-sys-color-on-primary);
      --md-fab-primary-hover-state-layer-color: var(--md-sys-color-on-primary);
      --md-fab-primary-pressed-state-layer-color: var(--md-sys-color-on-primary);
      --md-fab-label-text-font: var(--app-font-family);
      --md-fab-label-text-size: 16px;
      --md-fab-label-text-weight: 500;
      --md-fab-container-height: 56px;
      flex: 1;
      min-width: 0;
    }
    .scan-status {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-primary-container);
      white-space: nowrap;
    }
    /* ---- 扫描进度（进度条加载模块） ---- */
    .progress-box {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 14px;
      width: min(560px, 86%);
    }
    .progress-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      font-size: var(--md-sys-typescale-body-large-size);
      font-weight: 500;
    }
    .progress-percent {
      font-size: 22px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
    }
    .progress-current {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--md-sys-typescale-body-medium-size);
      opacity: 0.8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .progress-current md-icon {
      font-size: 18px;
      flex: 0 0 auto;
    }
    md-linear-progress {
      --md-linear-progress-active-indicator-color: var(--md-sys-color-primary);
      --md-linear-progress-track-color: rgba(4, 30, 73, 0.14);
      --md-linear-progress-active-indicator-height: 10px;
      --md-linear-progress-track-shape: var(--app-shape-full);
      border-radius: var(--app-shape-full);
    }
    /* ---- 待扫描（等待用户确认） ---- */
    .ready-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    md-outlined-button {
      --md-outlined-button-container-shape: var(--app-shape-full);
    }
  `;

  private renderSummary(scan: ScanResult) {
    const disk = appState.diskUsage;
    const cats = CATEGORY_ORDER.filter((c) => (scan.totals[c] ?? 0) > 0 || c === 'sys');
    return html`
      <div class="summary">
        <div class="total-block">
          <div class="label">共发现 ${scan.targets.length} 个垃圾目录</div>
          <div class="value">${formatBytes(scan.totalSize)}</div>
        </div>
        <div class="disk-block">
          <div class="disk-item">
            <span class="k">C盘总容量</span>
            <span class="v">${disk ? formatBytes(disk.total) : '--'}</span>
          </div>
          <div class="disk-item">
            <span class="k">已用空间</span>
            <span class="v">${disk ? formatBytes(disk.used) : '--'}</span>
          </div>
          <div class="disk-item">
            <span class="k">剩余空间</span>
            <span class="v">${disk ? formatBytes(disk.free) : '--'}</span>
          </div>
        </div>
      </div>
      <div class="chips">
        ${cats.map(
          (c: JunkCategory) => html`
            <md-assist-chip label="${c === 'sys' ? '系统及通用' : c === 'browser' ? '浏览器缓存' : c === 'wechat' ? '微信缓存' : 'QQ缓存'} ${formatBytes(scan.totals[c] ?? 0)}">
              <md-icon slot="icon">${CATEGORY_ICONS[c]}</md-icon>
            </md-assist-chip>
          `,
        )}
      </div>
    `;
  }

  render() {
    const percent = Math.max(0, Math.min(100, this.progress?.percent ?? 0));
    const currentText = this.progress?.current ?? '正在准备…';

    const emptyState = this.error
      ? html`
          <div class="empty">
            <md-icon>cloud_off</md-icon>
            <div class="hint">
              无法连接本地清理服务（${this.error}）。<br />
              请在应用目录运行 <b>python server.py</b> 后重试。
            </div>
            <md-outlined-button @click=${() => (this.showStartDialog = true)}>
              <md-icon slot="icon">refresh</md-icon>重新扫描
            </md-outlined-button>
          </div>
        `
      : html`
          <div class="empty">
            <md-icon>search</md-icon>
            <div class="hint">
              将扫描系统临时文件、浏览器缓存、微信与 QQ 聊天缓存，<br />
              全程约需 10~20 秒。
            </div>
            <div class="ready-actions">
              <md-outlined-button @click=${() => (this.showStartDialog = true)}>
                <md-icon slot="icon">play_arrow</md-icon>开始扫描
              </md-outlined-button>
            </div>
          </div>
        `;

    const scanningState = html`
      <div class="empty">
        <app-loading-indicator size="44" color-var="--md-sys-color-primary"></app-loading-indicator>
        <div class="progress-box">
          <div class="progress-head">
            <span>正在扫描电脑垃圾文件…</span>
            <span class="progress-percent">${percent}%</span>
          </div>
          <md-linear-progress .value=${percent / 100}></md-linear-progress>
          <div class="progress-current">
            <md-icon>folder_open</md-icon>
            <span>${currentText}</span>
          </div>
        </div>
      </div>
    `;

    const listHtml =
      this.scan && this.scan.targets.length > 0
        ? html`
            ${this.renderSummary(this.scan)}
            <div class="targets">
              ${this.scan.targets.map(
                (t) => html`
                  <div class="target-row">
                    <md-icon>${CATEGORY_ICONS[t.category]}</md-icon>
                    <div class="target-info">
                      <div class="target-name">${t.name}</div>
                      <div class="target-path" title=${t.path}>${t.path}</div>
                    </div>
                    <div class="target-size">${formatBytes(t.size)}</div>
                  </div>
                `,
              )}
            </div>
          `
        : this.scan
          ? html`
              <div class="empty">
                <md-icon>verified</md-icon>
                <div class="hint">未发现垃圾文件，系统非常干净。</div>
              </div>
            `
          : this.scanning
            ? scanningState
            : emptyState;

    return html`
      <app-bar heading="C盘垃圾清理">
        <md-icon-button slot="leading" aria-label="应用图标">
          <md-icon>local_shipping</md-icon>
        </md-icon-button>
      </app-bar>

      <div class="toolbar-row">
        <md-outlined-button @click=${this.goBack}>返回</md-outlined-button>
      </div>

      <div class="stage">
        <div class="container-frame">
          <div class="scroll-area">${listHtml}</div>
          <div class="bottom-row">
            ${this.scanning
              ? html`
                  <div class="scan-status">
                    <app-loading-indicator size="44" color-var="--md-sys-color-primary"></app-loading-indicator>
                    <span>正在扫描… ${percent}%</span>
                  </div>
                `
              : ''}
            <md-fab
              variant="primary"
              label=${this.scanning ? '扫描中…' : '前往清理垃圾'}
              ?disabled=${this.scanning}
              @click=${this.goClean}
            >
              <md-icon slot="icon">arrow_forward_ios</md-icon>
            </md-fab>
          </div>
        </div>
      </div>

      <app-confirm-dialog
        .open=${this.showStartDialog}
        heading="确定开始扫描"
        body="即将扫描系统临时文件、浏览器缓存、微信与 QQ 聊天缓存，全程约需 10~20 秒。确定开始扫描吗？"
        icon-name="search"
        confirm-label="确定开始扫描"
        cancel-label="取消"
        @confirm=${() => void this.startScan()}
        @cancel=${() => (this.showStartDialog = false)}
      ></app-confirm-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scan-screen': ScanScreen;
  }
}
