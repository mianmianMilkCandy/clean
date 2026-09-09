/** 顶部应用栏：高 64dp，surface 背景，滚动时变为 surfaceContainer */
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-bar')
export class AppBar extends LitElement {
  @property({ type: String }) heading = 'C盘垃圾清理';
  /** 由所在屏幕的滚动容器联动 */
  @property({ type: Boolean, reflect: true }) scrolled = false;

  static styles = css`
    :host {
      display: block;
      height: 64px;
      flex: 0 0 auto;
    }
    header {
      height: 64px;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0 8px 0 4px;
      background: var(--md-sys-color-surface);
      color: var(--md-sys-color-on-surface);
      transition:
        background-color 0.25s var(--app-ease-standard),
        box-shadow 0.25s var(--app-ease-standard);
      position: relative;
      z-index: 10;
    }
    :host([scrolled]) header {
      background: var(--md-sys-color-surface-container);
      box-shadow: 0 1px 0 0 var(--md-sys-color-outline-variant);
    }
    .title {
      flex: 1;
      font-size: var(--md-sys-typescale-title-large-size);
      line-height: var(--md-sys-typescale-title-large-line-height);
      font-weight: var(--md-sys-typescale-title-large-weight);
      color: var(--md-sys-color-on-surface);
      padding-left: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .leading {
      color: var(--md-sys-color-on-surface-variant);
      display: flex;
      align-items: center;
    }
    .trailing {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `;

  render() {
    return html`
      <header>
        <span class="leading"><slot name="leading"></slot></span>
        <span class="title">${this.heading}</span>
        <span class="trailing"><slot name="trailing"></slot></span>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-bar': AppBar;
  }
}
