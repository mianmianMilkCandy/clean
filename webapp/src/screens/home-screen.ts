/**
 * 屏幕 1：垃圾文件自助清理系统（主页）
 * - 顶部应用栏：local_shipping / 标题 / remove
 * - 三个标签（开始扫描 / 建议与反馈 / 了解使用）居中、从上到下垂直排列
 * - 点击「了解使用」展开快速开始区域，并弹出引导层（箭头指示点击快速开始，
 *   点击「跳过指引」即可取消引导界面）
 */
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/dialog/dialog.js';
import '@material/web/fab/fab.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/ripple/ripple.js';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../components/app-bar';
import '../components/confirm-dialog';
import { db } from '../services/db';
import { appState, notifyState, onStateChange } from '../services/state';
import { router } from '../services/router';

@customElement('home-screen')
export class HomeScreen extends LitElement {
  @state() private showClearDialog = false;
  @state() private offline = false;
  @state() private serverChecked = false;
  /** 快速开始区域是否展开（点击「了解使用」后展开） */
  @state() private quickStartOpen = false;
  /** 上层引导界面是否可见（箭头指示点击快速开始，可跳过） */
  @state() private guideVisible = false;
  private unsubscribe?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.offline = appState.serverOnline === false;
    this.serverChecked = appState.serverChecked;
    this.unsubscribe = onStateChange(() => {
      this.offline = appState.serverOnline === false;
      this.serverChecked = appState.serverChecked;
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }

  private goScan(): void {
    this.guideVisible = false;
    router.navigate('scan', { direction: 'bottom', detail: { rescan: true } });
  }

  private goFeedback(): void {
    router.navigate('feedback', { direction: 'right' });
  }

  /** 点击「了解使用」：展开快速开始区域，并弹出引导界面 */
  private onLearnUsage(): void {
    this.quickStartOpen = !this.quickStartOpen;
    if (this.quickStartOpen) {
      this.guideVisible = true;
    } else {
      this.guideVisible = false;
    }
  }

  /** 点击「跳过指引」：仅取消引导界面（快速开始区域保持展开） */
  private skipGuide(): void {
    this.guideVisible = false;
  }

  /** remove 图标：清除本地数据（扫描缓存、反馈草稿与历史） */
  private async onClearData(): Promise<void> {
    try {
      await db.clearAll();
      appState.scan = null;
      notifyState();
      this.dispatchEvent(
        new CustomEvent('show-snackbar', {
          bubbles: true,
          composed: true,
          detail: { message: '已清除本地缓存数据' },
        }),
      );
    } catch {
      this.dispatchEvent(
        new CustomEvent('show-snackbar', {
          bubbles: true,
          composed: true,
          detail: { message: '清除失败，请重试' },
        }),
      );
    }
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--md-sys-color-surface);
      overflow: hidden;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 18px;
      padding: 16px clamp(16px, 6vw, 64px) 24px;
      overflow-y: auto;
    }
    .tabs {
      display: flex;
      flex-direction: column;
      gap: 18px;
      width: min(560px, 100%);
    }
    .list-item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 16px;
      height: 72px;
      padding: 0 24px 0 20px;
      background: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      border-radius: var(--app-shape-list-outer);
      cursor: pointer;
      overflow: hidden;
      -webkit-user-select: none;
      user-select: none;
      transition: transform 0.18s var(--app-ease-spring);
    }
    .list-item:active {
      transform: scale(0.98);
    }
    .list-item .text {
      flex: 1;
      font-size: var(--md-sys-typescale-body-large-size);
      line-height: var(--md-sys-typescale-body-large-line-height);
      font-weight: 500;
      white-space: nowrap;
    }
    .list-item md-icon {
      color: var(--md-sys-color-on-primary-container);
    }
    /* ---- 快速开始区域（点击「了解使用」后展开） ---- */
    .quick-start {
      width: min(560px, 100%);
      animation: quick-start-expand 0.35s var(--app-ease-spring);
    }
    @keyframes quick-start-expand {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .hero-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      height: 188px;
      width: 100%;
      background: var(--md-sys-color-surface-container-highest);
      border-radius: var(--app-shape-card);
      cursor: pointer;
      overflow: hidden;
      transition: transform 0.18s var(--app-ease-spring), box-shadow 0.25s var(--app-ease-standard);
    }
    .hero-card:hover {
      box-shadow: 0 2px 10px 2px rgba(11, 87, 208, 0.12);
    }
    .hero-card:active {
      transform: scale(0.985);
    }
    .hero-card .card-title {
      font-size: var(--md-sys-typescale-title-medium-size);
      line-height: 1.4;
      font-weight: var(--md-sys-typescale-title-medium-weight);
      color: var(--md-sys-color-on-surface);
      margin: 0;
    }
    .hero-card md-fab {
      --md-fab-container-shape: var(--app-shape-full);
      --md-fab-primary-container-color: var(--md-sys-color-primary);
      --md-fab-primary-label-text-color: var(--md-sys-color-on-primary);
      --md-fab-primary-icon-color: var(--md-sys-color-on-primary);
      --md-fab-primary-hover-state-layer-color: var(--md-sys-color-on-primary);
      --md-fab-primary-pressed-state-layer-color: var(--md-sys-color-on-primary);
      --md-fab-label-text-font: var(--app-font-family);
      --md-fab-label-text-size: 15px;
      --md-fab-label-text-weight: 500;
      --md-fab-container-height: 56px;
      width: 160px;
    }
    /* ---- 上层引导界面（箭头指示 + 跳过指引） ---- */
    .guide-overlay {
      position: absolute;
      inset: 0;
      z-index: 30;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: guide-fade-in 0.2s var(--app-ease-standard);
    }
    @keyframes guide-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .guide-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      max-width: 440px;
      padding: 28px 36px 24px;
      background: var(--md-sys-color-surface-container-high);
      border-radius: var(--app-shape-dialog);
      box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.22);
    }
    .guide-arrow {
      font-size: 48px;
      color: var(--md-sys-color-primary);
      animation: guide-bounce 1.1s var(--app-ease-standard) infinite;
    }
    @keyframes guide-bounce {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(12px);
      }
    }
    .guide-text {
      font-size: var(--md-sys-typescale-body-large-size);
      line-height: 1.6;
      color: var(--md-sys-color-on-surface);
      text-align: center;
    }
    .guide-text b {
      color: var(--md-sys-color-primary);
    }
    md-outlined-button {
      --md-outlined-button-container-shape: var(--app-shape-full);
    }
    .offline-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 18px;
      background: var(--md-sys-color-error-container);
      color: var(--md-sys-color-on-error-container);
      border-radius: var(--app-shape-list-inner);
      font-size: var(--md-sys-typescale-body-medium-size);
      width: min(560px, 100%);
    }
    .offline-bar md-icon {
      font-size: 20px;
    }
    .offline-bar code {
      font-family: 'Cascadia Code', Consolas, monospace;
      background: rgba(65, 14, 11, 0.08);
      padding: 1px 6px;
      border-radius: 4px;
    }
  `;

  render() {
    return html`
      <app-bar heading="C盘垃圾清理">
        <md-icon-button slot="leading" aria-label="应用图标">
          <md-icon>local_shipping</md-icon>
        </md-icon-button>
        <md-icon-button slot="trailing" aria-label="清除本地数据" @click=${() => (this.showClearDialog = true)}>
          <md-icon>remove</md-icon>
        </md-icon-button>
      </app-bar>

      <div class="content">
        ${this.offline
          ? html`<div class="offline-bar">
              <md-icon>warning</md-icon>
              <span
                >本地清理服务未运行：请在应用目录执行
                <code>python server.py</code>
                后刷新页面，即可扫描并清理真实垃圾文件。</span
              >
            </div>`
          : ''}

        <div class="tabs">
          <div class="list-item" role="button" tabindex="0" @click=${this.goScan} @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.goScan()}>
            <md-ripple></md-ripple>
            <md-icon>check_circle</md-icon>
            <span class="text">开始扫描电脑垃圾文件</span>
            <md-icon>chevron_right</md-icon>
          </div>
          <div class="list-item" role="button" tabindex="0" @click=${this.goFeedback} @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.goFeedback()}>
            <md-ripple></md-ripple>
            <md-icon>check_circle</md-icon>
            <span class="text">建议与反馈</span>
            <md-icon>chevron_right</md-icon>
          </div>
          <div class="list-item" role="button" tabindex="0" @click=${this.onLearnUsage} @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.onLearnUsage()}>
            <md-ripple></md-ripple>
            <md-icon>check_circle</md-icon>
            <span class="text">了解使用</span>
            <md-icon>${this.quickStartOpen ? 'expand_less' : 'chevron_right'}</md-icon>
          </div>
        </div>

        ${this.quickStartOpen
          ? html`
              <div class="quick-start">
                <div
                  class="hero-card"
                  role="button"
                  tabindex="0"
                  @click=${this.goScan}
                  @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.goScan()}
                >
                  <md-ripple></md-ripple>
                  <p class="card-title">点击开始扫描快速开始</p>
                  <md-fab variant="primary" label="快速开始" @click=${(e: Event) => { e.stopPropagation(); this.goScan(); }}>
                    <md-icon slot="icon">bolt</md-icon>
                  </md-fab>
                </div>
              </div>
            `
          : ''}
      </div>

      ${this.guideVisible
        ? html`
            <div class="guide-overlay" @click=${this.skipGuide}>
              <div class="guide-card" role="dialog" aria-label="使用引导" @click=${(e: Event) => e.stopPropagation()}>
                <md-icon class="guide-arrow">arrow_downward</md-icon>
                <div class="guide-text">
                  点击下方的 <b>「快速开始」</b> 按钮，<br />
                  立即开始扫描电脑垃圾文件。
                </div>
                <md-outlined-button @click=${this.skipGuide}>
                  <md-icon slot="icon">close</md-icon>跳过指引
                </md-outlined-button>
              </div>
            </div>
          `
        : ''}

      <app-confirm-dialog
        .open=${this.showClearDialog}
        heading="确认/取消"
        body="确定清除本机保存的扫描缓存与反馈草稿吗？"
        icon-name="delete_forever"
        confirm-label="清除"
        @confirm=${() => {
          this.showClearDialog = false;
          void this.onClearData();
        }}
        @cancel=${() => (this.showClearDialog = false)}
      ></app-confirm-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-screen': HomeScreen;
  }
}
