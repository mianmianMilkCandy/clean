/**
 * 确认对话框：宽 312dp、圆角 28dp、surfaceContainerHigh 背景，
 * 带 info 图标，底部右对齐 取消/确定 文字按钮。
 */
import '@material/web/button/text-button.js';
import '@material/web/dialog/dialog.js';
import '@material/web/icon/icon.js';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-confirm-dialog')
export class ConfirmDialog extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: String }) heading = '确认/取消';
  @property({ type: String }) body = '';
  @property({ type: String }) confirmLabel = '确定';
  @property({ type: String }) cancelLabel = '取消';
  @property({ type: String, attribute: 'icon-name' }) iconName = 'info';

  show(): void {
    this.open = true;
  }

  private onClose(kind: 'confirm' | 'cancel'): void {
    const dialog = this.renderRoot.querySelector('md-dialog');
    this.open = false;
    void dialog?.close();
    this.dispatchEvent(new CustomEvent(kind, { bubbles: true, composed: true }));
  }

  /** ESC / 点击遮罩关闭时按取消处理 */
  private onDialogClosed(): void {
    if (this.open) {
      this.open = false;
      this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    }
  }

  static styles = css`
    :host {
      display: contents;
    }
    md-dialog {
      --md-dialog-container-shape: var(--app-shape-dialog);
      --md-dialog-container-color: var(--md-sys-color-surface-container-high);
    }
    .headline-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--app-font-family);
      font-size: var(--md-sys-typescale-headline-small-size);
      line-height: var(--md-sys-typescale-headline-small-line-height);
      font-weight: var(--md-sys-typescale-headline-small-weight);
      color: var(--md-sys-color-on-surface);
      padding: 6px 4px 0;
    }
    md-icon {
      color: var(--md-sys-color-primary);
      flex: 0 0 auto;
    }
    .body {
      margin: 16px 0 4px;
      font-size: var(--md-sys-typescale-body-medium-size);
      line-height: 1.5;
      color: var(--md-sys-color-on-surface-variant);
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
      padding-bottom: 4px;
    }
  `;

  render() {
    return html`
      <md-dialog .open=${this.open} @closed=${() => this.onDialogClosed()}>
        <div slot="headline" class="headline-row">
          <md-icon>${this.iconName}</md-icon>
          <span>${this.heading}</span>
        </div>
        <div slot="content" class="body">${this.body}</div>
        <div slot="actions" class="actions">
          <md-text-button @click=${() => this.onClose('cancel')}>${this.cancelLabel}</md-text-button>
          <md-text-button @click=${() => this.onClose('confirm')}>${this.confirmLabel}</md-text-button>
        </div>
      </md-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-confirm-dialog': ConfirmDialog;
  }
}
