/**
 * 应用外壳：屏幕挂载、路由初始化、全局 Snackbar、服务健康检查
 */
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './components/app-snackbar';
import './screens/clean-screen';
import './screens/feedback-screen';
import './screens/home-screen';
import './screens/scan-screen';
import { api } from './services/api';
import { router, type NavOptions } from './services/router';
import { appState, notifyState } from './services/state';
import type { ScreenId } from './types';

@customElement('cleaner-app')
export class CleanerApp extends LitElement {
  private screens: Record<ScreenId, HTMLElement> | null = null;

  firstUpdated(): void {
    const query = (s: ScreenId) => this.renderRoot.querySelector<HTMLElement>(`${s}-screen`);
    this.screens = {
      home: query('home') as HTMLElement,
      scan: query('scan') as HTMLElement,
      feedback: query('feedback') as HTMLElement,
      clean: query('clean') as HTMLElement,
    };
    // 初始仅显示当前屏幕
    for (const [id, el] of Object.entries(this.screens)) {
      if (id !== router.current) el.style.visibility = 'hidden';
    }
    router.init(
      (s) => this.screens?.[s] ?? null,
      (to: ScreenId, _options: NavOptions) => {
        void _options;
        // 屏幕切换时通知各屏幕（connectedCallback 已在挂载时执行）
        const el = this.screens?.[to];
        el?.dispatchEvent(new CustomEvent('screen-active', { bubbles: false }));
      },
    );
    void this.checkServer();
  }

  private async checkServer(): Promise<void> {
    try {
      await api.health();
      appState.serverOnline = true;
      appState.serverChecked = true;
      notifyState();
      appState.diskUsage = await api.diskUsage();
      notifyState();
    } catch {
      appState.serverOnline = false;
      appState.serverChecked = true;
      notifyState();
    }
  }

  private onSnackbar(e: Event): void {
    const detail = (e as CustomEvent).detail as { message: string; actionLabel?: string };
    const bar = this.renderRoot.querySelector('app-snackbar');
    bar?.show(detail.message, { actionLabel: detail.actionLabel });
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: var(--md-sys-color-surface);
      position: relative;
      overflow: hidden;
    }
    .screens {
      position: absolute;
      inset: 0;
    }
    home-screen,
    scan-screen,
    feedback-screen,
    clean-screen {
      position: absolute;
      inset: 0;
      will-change: transform, opacity;
    }
  `;

  render() {
    return html`
      <div class="screens" @show-snackbar=${(e: Event) => this.onSnackbar(e)}>
        <home-screen></home-screen>
        <scan-screen></scan-screen>
        <feedback-screen></feedback-screen>
        <clean-screen></clean-screen>
      </div>
      <app-snackbar></app-snackbar>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cleaner-app': CleanerApp;
  }
}
