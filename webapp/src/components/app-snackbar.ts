/**
 * M3 Snackbar：底部滑入的消息提示（inverseSurface / inverseOnSurface），
 * 用于“了解使用”提示与各类操作反馈。
 */
import '@material/web/button/text-button.js';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

const AUTO_DISMISS = 4200;

@customElement('app-snackbar')
export class AppSnackbar extends LitElement {
  @property({ type: String }) message = '';
  @property({ type: String }) actionLabel = '知道了';
  @state() private visible = false;

  private timer = 0;

  show(message: string, options?: { actionLabel?: string }): void {
    this.message = message;
    if (options?.actionLabel) this.actionLabel = options.actionLabel;
    this.visible = true;
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.dismiss(), AUTO_DISMISS);
  }

  dismiss(): void {
    this.visible = false;
    window.clearTimeout(this.timer);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.timer);
  }

  static styles = css`
    :host {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 24px;
      display: flex;
      justify-content: center;
      pointer-events: none;
      z-index: 120;
    }
    .bar {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 288px;
      max-width: 560px;
      padding: 14px 12px 14px 20px;
      background: var(--md-sys-color-inverse-surface);
      color: var(--md-sys-color-inverse-on-surface);
      border-radius: 8px;
      box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 2px 4px rgba(0, 0, 0, 0.24);
      transform: translateY(140%);
      opacity: 0;
      transition:
        transform 0.42s var(--app-ease-spring),
        opacity 0.3s var(--app-ease-standard);
    }
    .bar.visible {
      transform: translateY(0);
      opacity: 1;
    }
    .text {
      flex: 1;
      font-size: var(--md-sys-typescale-body-medium-size);
      line-height: 1.4;
    }
    md-text-button {
      --md-text-button-label-text-color: var(--md-sys-color-inverse-primary);
      --md-text-button-hover-state-layer-color: var(--md-sys-color-inverse-primary);
      --md-text-button-focus-state-layer-color: var(--md-sys-color-inverse-primary);
      color: var(--md-sys-color-inverse-primary);
    }
  `;

  render() {
    return html`
      <div class="bar ${this.visible ? 'visible' : ''}" role="status" aria-live="polite">
        <span class="text">${this.message}</span>
        <md-text-button @click=${this.dismiss}>${this.actionLabel}</md-text-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-snackbar': AppSnackbar;
  }
}
