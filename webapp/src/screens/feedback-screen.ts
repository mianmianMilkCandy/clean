/**
 * 屏幕 3：建议与反馈
 * - 容器框（surfaceContainerHigh，28dp 圆角）
 * - 三行：建议 / 反馈 / 联系方式（28sp 标签 + 描边文本输入框，同一行垂直居中）
 * - 右下角“提交确认”填充按钮（380dp）：提交到邮箱并自动返回主页
 */
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/textfield/outlined-text-field.js';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../components/app-bar';
import { api } from '../services/api';
import { db } from '../services/db';
import { router } from '../services/router';
import type { FeedbackPayload } from '../types';

const CONTACT_RE = /^([^\s@]+@[^\s@]+\.[^\s@]+|1[3-9]\d{9}|[0-9]{3,4}-?[0-9]{7,8})$/;

@customElement('feedback-screen')
export class FeedbackScreen extends LitElement {
  @state() private suggestion = '';
  @state() private feedback = '';
  @state() private contact = '';
  @state() private errors: Record<string, string> = {};
  @state() private submitting = false;
  @state() private offline = false;
  private draftTimer = 0;

  connectedCallback(): void {
    super.connectedCallback();
    // 每次进入屏幕恢复未提交的草稿
    this.addEventListener('screen-active', () => void this.restoreDraft());
  }

  private async restoreDraft(): Promise<void> {
    const draft = await db.getDraft();
    if (draft) {
      this.suggestion = draft.suggestion ?? '';
      this.feedback = draft.feedback ?? '';
      this.contact = draft.contact ?? '';
    }
  }

  private saveDraft(): void {
    window.clearTimeout(this.draftTimer);
    this.draftTimer = window.setTimeout(() => {
      void db.saveDraft({ suggestion: this.suggestion, feedback: this.feedback, contact: this.contact });
    }, 400);
  }

  private updateField(key: 'suggestion' | 'feedback' | 'contact', value: string): void {
    this[key] = value;
    if (this.errors[key]) {
      const next = { ...this.errors };
      delete next[key];
      this.errors = next;
    }
    this.saveDraft();
  }

  private validate(): boolean {
    const errors: Record<string, string> = {};
    if (!this.suggestion.trim() && !this.feedback.trim()) {
      errors.content = '请至少填写“建议”或“反馈”中的一项';
    }
    if (this.contact.trim() && !CONTACT_RE.test(this.contact.trim())) {
      errors.contact = '联系方式需为有效邮箱或手机号';
    }
    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  private async submit(): Promise<void> {
    if (this.submitting) return;
    if (!this.validate()) return;

    const payload: FeedbackPayload = {
      suggestion: this.suggestion.trim(),
      feedback: this.feedback.trim(),
      contact: this.contact.trim(),
    };
    this.submitting = true;

    let emailed = false;
    let delivered = false;
    try {
      const result = await api.submitFeedback(payload);
      delivered = result.saved;
      emailed = result.emailed;
    } catch {
      delivered = false;
    }

    try {
      await db.addFeedback({
        ...payload,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        submittedAt: Date.now(),
        emailed,
      });
    } catch {
      /* 本地保存失败不阻塞 */
    }

    this.submitting = false;
    await db.clearDraft();

    const message = delivered
      ? emailed
        ? '提交成功，已发送至邮箱，即将返回主页'
        : '提交成功（已送达本地服务，邮箱未配置 SMTP），即将返回主页'
      : '本地服务未运行，反馈已保存在浏览器中';
    this.dispatchEvent(
      new CustomEvent('show-snackbar', { bubbles: true, composed: true, detail: { message } }),
    );

    // 返回上一个屏幕（反向播放进入时的过渡动画），随后回主页
    window.setTimeout(() => router.back(), 620);
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
      align-items: center;
      justify-content: center;
      padding: 0 24px 24px;
      min-height: 0;
    }
    .container-frame {
      width: min(996px, 100%);
      height: min(528px, 100%);
      background: var(--md-sys-color-surface-container-high);
      border-radius: var(--app-shape-container);
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 36px 44px;
      overflow-y: auto;
    }
    .field-row {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .field-label {
      flex: 0 0 auto;
      width: 148px;
      text-align: right;
      font-size: 28px;
      line-height: 1.3;
      font-weight: 400;
      color: var(--md-sys-color-on-surface);
    }
    .field-wrap {
      flex: 1;
      min-width: 0;
    }
    md-outlined-text-field {
      width: 100%;
      --md-outlined-text-field-container-shape: var(--app-shape-textfield);
      --md-outlined-text-field-container-height: 56px;
      --md-outlined-text-field-input-text-font: var(--app-font-family);
      --md-outlined-text-field-input-text-size: 15px;
      --md-outlined-text-field-outline-color: var(--md-sys-color-outline);
      --md-outlined-text-field-focus-outline-color: var(--md-sys-color-primary);
      --md-outlined-text-field-textarea-padding: 14px 16px;
    }
    md-outlined-text-field[error] {
      --md-outlined-text-field-input-text-color: var(--md-sys-color-on-surface);
    }
    .error-text {
      margin: 6px 0 0 6px;
      font-size: var(--md-sys-typescale-body-small-size);
      color: var(--md-sys-color-error);
      line-height: 1.4;
    }
    .multi md-outlined-text-field {
      --md-outlined-text-field-container-height: 92px;
    }
    .actions-row {
      margin-top: auto;
      display: flex;
      justify-content: flex-end;
      padding-top: 8px;
    }
    md-filled-button {
      --md-filled-button-container-shape: var(--app-shape-full);
      width: 380px;
      --md-filled-button-container-height: 56px;
    }
    .offline-hint {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--md-sys-typescale-body-small-size);
      color: var(--md-sys-color-on-surface-variant);
    }
    .offline-hint md-icon {
      font-size: 18px;
    }
  `;

  render() {
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
          <div class="field-row">
            <span class="field-label">建议：</span>
            <div class="field-wrap multi">
              <md-outlined-text-field
                type="textarea"
                rows="2"
                label="对产品的改进建议"
                .value=${this.suggestion}
                @input=${(e: InputEvent) => this.updateField('suggestion', (e.target as HTMLInputElement).value)}
              ></md-outlined-text-field>
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">反馈：</span>
            <div class="field-wrap multi">
              <md-outlined-text-field
                type="textarea"
                rows="2"
                label="使用中遇到的问题"
                .value=${this.feedback}
                @input=${(e: InputEvent) => this.updateField('feedback', (e.target as HTMLInputElement).value)}
              ></md-outlined-text-field>
              ${this.errors.content ? html`<div class="error-text">${this.errors.content}</div>` : nothing}
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">联系方式：</span>
            <div class="field-wrap">
              <md-outlined-text-field
                type="text"
                label="邮箱或手机号（选填）"
                .value=${this.contact}
                @input=${(e: InputEvent) => this.updateField('contact', (e.target as HTMLInputElement).value)}
              ></md-outlined-text-field>
              ${this.errors.contact ? html`<div class="error-text">${this.errors.contact}</div>` : nothing}
            </div>
          </div>

          <div class="actions-row">
            <md-filled-button
              ?disabled=${this.submitting}
              @click=${() => void this.submit()}
            >
              ${this.submitting ? '提交中…' : '提交确认'}
            </md-filled-button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'feedback-screen': FeedbackScreen;
  }
}
