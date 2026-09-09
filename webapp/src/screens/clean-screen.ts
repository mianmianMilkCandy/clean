/**
 * 屏幕 4：勾选清理文件路径
 * - 容器框（surfaceContainerHigh，28dp 圆角）内勾选垃圾文件路径，
 *   显示 C盘容量/占用/剩余/垃圾占用量
 * - 顶部右侧：主页 / 返回清理页面 连接按钮组（描边）
 * - 确认/取消 对话框（info 图标）在按下主页按钮时弹出
 */
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/dialog/dialog.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/ripple/ripple.js';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../components/app-bar';
import '../components/confirm-dialog';
import { api } from '../services/api';
import { db } from '../services/db';
import { router } from '../services/router';
import { appState, notifyState, onStateChange } from '../services/state';
import {
  CATEGORY_ICONS,
  CATEGORY_ORDER,
  formatBytes,
  type CleanResult,
  type JunkCategory,
  type JunkTarget,
  type ScanResult,
} from '../types';

@customElement('clean-screen')
export class CleanScreen extends LitElement {
  @state() private scan: ScanResult | null = null;
  @state() private selected = new Set<string>();
  @state() private cleaning = false;
  @state() private cleanResult: CleanResult | null = null;
  @state() private cleanFailed = '';
  @state() private dialogAction: 'home' | 'scan' | null = null;
  @state() private cleanConfirmOpen = false;
  private unsubscribe?: () => void;
  /** 清理完成后自动返回主页的定时器（需求：清理完自动退出清理界面） */
  private autoHomeTimer: number | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.scan = appState.scan;
    this.unsubscribe = onStateChange(() => {
      this.scan = appState.scan;
    });
    this.addEventListener('screen-active', () => void this.handleActivation());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribe?.();
    if (this.autoHomeTimer !== null) {
      window.clearTimeout(this.autoHomeTimer);
      this.autoHomeTimer = null;
    }
  }

  private async handleActivation(): Promise<void> {
    if (!this.scan) {
      const cached = await db.getScanCache();
      if (cached) {
        this.scan = cached;
        appState.scan = cached;
        notifyState();
      }
    }
    // 默认勾选浏览器缓存与系统临时类（聊天记录相关的文件默认不勾选，避免误删）
    if (this.scan && this.selected.size === 0 && !this._defaultApplied) {
      this._defaultApplied = true;
      const picks = new Set<string>();
      for (const t of this.scan.targets) {
        if (t.category === 'browser' || /缓存|Cache|Temp|Prefetch|Download/i.test(t.name + t.path)) {
          picks.add(t.path);
        }
      }
      this.selected = picks;
    }
    try {
      appState.diskUsage = await api.diskUsage();
      notifyState();
    } catch {
      /* 保持旧值 */
    }
  }

  private _defaultApplied = false;

  private get grouped(): Array<{ category: JunkCategory; items: JunkTarget[] }> {
    if (!this.scan) return [];
    return CATEGORY_ORDER.map((category) => ({
      category,
      items: this.scan!.targets.filter((t) => t.category === category),
    })).filter((g) => g.items.length > 0);
  }

  private get selectedSize(): number {
    if (!this.scan) return 0;
    return this.scan.targets.filter((t) => this.selected.has(t.path)).reduce((sum, t) => sum + t.size, 0);
  }

  private toggle(path: string, checked: boolean): void {
    const next = new Set(this.selected);
    if (checked) next.add(path);
    else next.delete(path);
    this.selected = next;
  }

  private toggleCategory(category: JunkCategory, checked: boolean): void {
    const group = this.grouped.find((g) => g.category === category);
    const next = new Set(this.selected);
    for (const item of group?.items ?? []) {
      if (checked) next.add(item.path);
      else next.delete(item.path);
    }
    this.selected = next;
  }

  private toggleAll(checked: boolean): void {
    this.selected = checked ? new Set(this.scan?.targets.map((t) => t.path) ?? []) : new Set();
  }

  private requestHome(): void {
    this.dialogAction = 'home';
  }

  private requestBackScan(): void {
    this.dialogAction = 'scan';
  }

  private async onDialogConfirm(): Promise<void> {
    const action = this.dialogAction;
    this.dialogAction = null;
    if (action === 'home') {
      router.navigate('home', { direction: 'right' });
    } else if (action === 'scan') {
      router.navigate('scan', { direction: 'right' });
    }
  }

  /** 清理完成后关闭结果框并自动返回主页面 */
  private finishCleanAndGoHome(): void {
    if (this.autoHomeTimer !== null) {
      window.clearTimeout(this.autoHomeTimer);
      this.autoHomeTimer = null;
    }
    this.cleanResult = null;
    router.navigate('home', { direction: 'right' });
  }

  private async startClean(): Promise<void> {
    if (this.cleaning || this.selected.size === 0) return;
    this.cleaning = true;
    this.cleanFailed = '';
    try {
      const result = await api.clean([...this.selected]);
      this.cleanResult = result;
      // 需求：清理完之后自动退出清理界面回到主页面（停留 2.8 秒展示结果）
      if (this.autoHomeTimer !== null) window.clearTimeout(this.autoHomeTimer);
      this.autoHomeTimer = window.setTimeout(() => this.finishCleanAndGoHome(), 2800);
      // 清理后刷新磁盘信息并静默重扫
      try {
        appState.diskUsage = await api.diskUsage();
      } catch {
        /* ignore */
      }
      try {
        const fresh = await api.scan();
        appState.scan = fresh;
        this.scan = fresh;
        await db.saveScanCache(fresh);
        this.selected = new Set();
      } catch {
        /* ignore */
      }
      notifyState();
    } catch (e) {
      this.cleanFailed = e instanceof Error ? e.message : '清理失败';
    } finally {
      this.cleaning = false;
    }
  }

  private goScanForFresh(): void {
    router.navigate('scan', { direction: 'right', detail: { rescan: true } });
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
    .button-group {
      display: flex;
      gap: 3px;
    }
    .button-group md-outlined-button {
      --md-outlined-button-container-shape: var(--app-shape-full);
      --md-outlined-button-container-height: 48px;
      --md-outlined-button-outline-color: var(--md-sys-color-outline);
      --md-outlined-button-outline-width: 1px;
      background: var(--md-sys-color-surface);
    }
    .button-group md-outlined-button:first-child {
      --md-outlined-button-container-shape: var(--app-shape-button-group-inner);
      border-end-end-radius: var(--app-shape-button-group-inner);
      border-start-end-radius: var(--app-shape-button-group-inner);
    }
    .button-group md-outlined-button:last-child {
      --md-outlined-button-container-shape: var(--app-shape-button-group-inner);
      border-start-start-radius: var(--app-shape-button-group-inner);
      border-end-start-radius: var(--app-shape-button-group-inner);
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
      width: min(1036px, 100%);
      background: var(--md-sys-color-surface-container-high);
      border-radius: var(--app-shape-container);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .stats-row {
      flex: 0 0 auto;
      display: flex;
      gap: 12px;
      padding: 20px 24px 14px;
      flex-wrap: wrap;
    }
    .stat {
      flex: 1;
      min-width: 150px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      background: var(--md-sys-color-surface-container-low);
      border-radius: var(--app-shape-list-inner);
    }
    .stat.tone-primary {
      background: var(--md-sys-color-primary-container);
    }
    .stat md-icon {
      color: var(--md-sys-color-primary);
      flex: 0 0 auto;
    }
    .stat.tone-primary md-icon {
      color: var(--md-sys-color-on-primary-container);
    }
    .stat .k {
      font-size: var(--md-sys-typescale-body-small-size);
      color: var(--md-sys-color-on-surface-variant);
    }
    .stat.tone-primary .k {
      color: var(--md-sys-color-on-primary-container);
    }
    .stat .v {
      font-size: 19px;
      font-weight: 500;
      color: var(--md-sys-color-on-surface);
    }
    .stat.tone-primary .v {
      color: var(--md-sys-color-on-primary-container);
    }
    .list-area {
      flex: 1;
      overflow-y: auto;
      padding: 4px 24px 8px;
      min-height: 0;
    }
    .category-block {
      margin-bottom: 18px;
    }
    .category-head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 10px;
      color: var(--md-sys-color-on-surface);
    }
    .category-head md-icon {
      color: var(--md-sys-color-primary);
    }
    .category-head .title {
      font-size: var(--md-sys-typescale-title-medium-size);
      font-weight: var(--md-sys-typescale-title-medium-weight);
    }
    .category-head .size {
      margin-left: auto;
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-surface-variant);
    }
    .rows {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .row {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px 10px 10px;
      background: var(--md-sys-color-surface-container-low);
      border-radius: var(--app-shape-list-inner);
      cursor: pointer;
      overflow: hidden;
      transition: background-color 0.2s var(--app-ease-standard);
    }
    .row:hover {
      background: var(--md-sys-color-surface-container);
    }
    .row:first-child {
      border-start-start-radius: var(--app-shape-list-outer);
      border-start-end-radius: var(--app-shape-list-outer);
    }
    .row:last-child {
      border-end-start-radius: var(--app-shape-list-outer);
      border-end-end-radius: var(--app-shape-list-outer);
    }
    .row md-checkbox {
      flex: 0 0 auto;
    }
    .row .info {
      flex: 1;
      min-width: 0;
    }
    .row .name {
      font-size: var(--md-sys-typescale-body-large-size);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row .path {
      font-size: var(--md-sys-typescale-body-small-size);
      color: var(--md-sys-color-on-surface-variant);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      direction: rtl;
      text-align: left;
    }
    .row .size {
      font-size: var(--md-sys-typescale-body-medium-size);
      font-weight: 500;
      white-space: nowrap;
      color: var(--md-sys-color-on-surface-variant);
    }
    .bottom-bar {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 24px 18px;
      border-top: 1px solid var(--md-sys-color-outline-variant);
      background: var(--md-sys-color-surface-container-high);
    }
    .selection-info {
      flex: 1;
      font-size: var(--md-sys-typescale-body-medium-size);
      color: var(--md-sys-color-on-surface-variant);
    }
    .selection-info b {
      color: var(--md-sys-color-on-surface);
      font-size: var(--md-sys-typescale-body-large-size);
    }
    md-filled-button {
      --md-filled-button-container-shape: var(--app-shape-full);
      --md-filled-button-container-height: 56px;
    }
    .empty {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-align: center;
      color: var(--md-sys-color-on-surface-variant);
      padding: 24px;
    }
    .empty md-icon {
      font-size: 56px;
      color: var(--md-sys-color-on-surface-variant);
    }
    .empty .hint {
      max-width: 460px;
      line-height: 1.5;
    }
    md-dialog {
      --md-dialog-container-shape: var(--app-shape-dialog);
    }
    .result-body {
      font-size: var(--md-sys-typescale-body-medium-size);
      line-height: 1.6;
      color: var(--md-sys-color-on-surface-variant);
    }
    .result-body .freed {
      font-size: 22px;
      font-weight: 500;
      color: var(--md-sys-color-on-surface);
    }
    .result-body .auto-home-hint {
      margin-top: 10px;
      font-size: var(--md-sys-typescale-body-small-size);
      color: var(--md-sys-color-on-surface-variant);
    }
    .fail-list {
      margin: 8px 0 0;
      padding-left: 18px;
      color: var(--md-sys-color-on-error-container);
    }
    .warn-note {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
      padding: 10px 12px;
      border-radius: var(--app-shape-list-inner);
      background: var(--md-sys-color-error-container);
      color: var(--md-sys-color-on-error-container);
      font-size: var(--md-sys-typescale-body-small-size);
      line-height: 1.5;
    }
  `;

  private renderStat(icon: string, k: string, v: string, primary = false) {
    return html`
      <div class="stat ${primary ? 'tone-primary' : ''}">
        <md-icon>${icon}</md-icon>
        <div>
          <div class="k">${k}</div>
          <div class="v">${v}</div>
        </div>
      </div>
    `;
  }

  render() {
    const disk = appState.diskUsage;
    const junkTotal = this.scan?.totalSize ?? 0;

    const emptyState = html`
      <div class="empty">
        <md-icon>find_in_page</md-icon>
        <div class="hint">暂无扫描结果，请先扫描电脑垃圾文件后再勾选清理。</div>
        <md-filled-button @click=${this.goScanForFresh}>
          <md-icon slot="icon">search</md-icon>去扫描
        </md-filled-button>
      </div>
    `;

    const listState =
      this.scan && this.scan.targets.length > 0
        ? this.grouped.map(
            (g) => html`
              <div class="category-block">
                <div class="category-head">
                  <md-checkbox
                    touch-target="wrapper"
                    .checked=${g.items.every((i) => this.selected.has(i.path))}
                    .indeterminate=${g.items.some((i) => this.selected.has(i.path)) && !g.items.every((i) => this.selected.has(i.path))}
                    @change=${(e: Event) => this.toggleCategory(g.category, (e.target as HTMLInputElement).checked)}
                  ></md-checkbox>
                  <md-icon>${CATEGORY_ICONS[g.category]}</md-icon>
                  <span class="title">${g.category === 'sys' ? '系统及通用垃圾' : g.category === 'browser' ? '浏览器缓存' : g.category === 'wechat' ? '微信聊天缓存' : 'QQ聊天缓存'}</span>
                  <span class="size">${formatBytes(g.items.reduce((s, i) => s + i.size, 0))}</span>
                </div>
                <div class="rows">
                  ${g.items.map(
                    (item) => html`
                      <div class="row" @click=${() => this.toggle(item.path, !this.selected.has(item.path))}>
                        <md-ripple></md-ripple>
                        <md-checkbox
                          touch-target="wrapper"
                          .checked=${this.selected.has(item.path)}
                          @click=${(e: Event) => e.stopPropagation()}
                          @change=${(e: Event) => this.toggle(item.path, (e.target as HTMLInputElement).checked)}
                        ></md-checkbox>
                        <div class="info">
                          <div class="name">${item.name}</div>
                          <div class="path" title=${item.path}>${item.path}</div>
                        </div>
                        <div class="size">${formatBytes(item.size)}</div>
                      </div>
                    `,
                  )}
                </div>
              </div>
            `,
          )
        : this.scan
          ? emptyState
          : emptyState;

    return html`
      <app-bar heading="C盘垃圾清理">
        <md-icon-button slot="leading" aria-label="应用图标">
          <md-icon>local_shipping</md-icon>
        </md-icon-button>
      </app-bar>

      <div class="toolbar-row">
        <div class="button-group">
          <md-outlined-button @click=${this.requestHome}>主页</md-outlined-button>
          <md-outlined-button @click=${this.requestBackScan}>返回清理页面</md-outlined-button>
        </div>
      </div>

      <div class="stage">
        <div class="container-frame">
          <div class="stats-row">
            ${this.renderStat('database', 'C盘容量', disk ? formatBytes(disk.total) : '--')}
            ${this.renderStat('data_usage', '占用空间', disk ? formatBytes(disk.used) : '--')}
            ${this.renderStat('free_cancellation', '剩余空间', disk ? formatBytes(disk.free) : '--')}
            ${this.renderStat('delete_sweep', '垃圾文件占用量', formatBytes(junkTotal), true)}
          </div>
          <div class="list-area">${listState}</div>
          <div class="bottom-bar">
            <span class="selection-info">
              已勾选 <b>${this.selected.size}</b> 项 · 可释放约 <b>${formatBytes(this.selectedSize)}</b>
            </span>
            <md-outlined-button
              ?disabled=${this.scan?.targets.length ? false : true}
              @click=${() => this.toggleAll(this.selected.size < (this.scan?.targets.length ?? 0))}
            >
              ${this.selected.size < (this.scan?.targets.length ?? 0) ? '全选' : '全不选'}
            </md-outlined-button>
            <md-filled-button
              ?disabled=${this.selected.size === 0 || this.cleaning}
              @click=${() => (this.cleanConfirmOpen = true)}
            >
              ${this.cleaning ? '清理中…' : '开始清理'}
              <md-icon slot="icon">delete_sweep</md-icon>
            </md-filled-button>
          </div>
        </div>
      </div>

      ${this.cleanFailed
        ? html`<app-confirm-dialog
            .open=${true}
            heading="清理失败"
            body=${this.cleanFailed}
            icon-name="error"
            @confirm=${() => (this.cleanFailed = '')}
            @cancel=${() => (this.cleanFailed = '')}
          ></app-confirm-dialog>`
        : nothing}

      <app-confirm-dialog
        .open=${this.cleanConfirmOpen}
        heading="确认清理"
        .body=${`即将清空已勾选目录中的内容，共 ${this.selected.size} 项、约 ${formatBytes(this.selectedSize)}。微信 File、QQ FileRecv 目录包含聊天接收的文件，清理后无法恢复。`}
        icon-name="delete_forever"
        confirm-label="清理"
        @confirm=${() => {
          this.cleanConfirmOpen = false;
          void this.startClean();
        }}
        @cancel=${() => (this.cleanConfirmOpen = false)}
      ></app-confirm-dialog>

      ${this.cleanResult
        ? html`<md-dialog open @closed=${() => (this.cleanResult = null)}>
            <div slot="headline">清理完成</div>
            <div slot="content" class="result-body">
              <span class="freed">已释放 ${formatBytes(this.cleanResult.freed)}</span>
              ${this.cleanResult.failures.length > 0
                ? html`<div>以下目录部分内容被占用或权限不足，未能完全清理：</div>
                    <ul class="fail-list">
                      ${this.cleanResult.failures.map((f) => html`<li>${f.name}：${f.error}</li>`)}
                    </ul>`
                : html`<div>所选目录内容已全部清理完成。</div>`}
              <div class="auto-home-hint">即将自动返回主页面…</div>
            </div>
            <div slot="actions">
              <md-text-button @click=${() => this.finishCleanAndGoHome()}>知道了</md-text-button>
            </div>
          </md-dialog>`
        : nothing}

      <app-confirm-dialog
        .open=${this.dialogAction !== null}
        heading="确认/取消"
        body="真的不需要清理电脑垃圾文件返回到主页面吗？"
        icon-name="info"
        @confirm=${() => void this.onDialogConfirm()}
        @cancel=${() => (this.dialogAction = null)}
      ></app-confirm-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'clean-screen': CleanScreen;
  }
}
