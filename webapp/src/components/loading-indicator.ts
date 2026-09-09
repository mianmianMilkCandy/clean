/**
 * M3 Expressive 形状变形加载指示器：
 * 旋转并在正多边形（3→4→5→6→圆）之间连续变形。
 * 带容器变体放在 secondaryContainer 的圆形中。
 */
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/** 正 n 边形的极坐标半径；n → ∞ 即圆 */
function polygonRadius(theta: number, sides: number, radius: number): number {
  if (!Number.isFinite(sides) || sides > 60) return radius;
  const seg = (Math.PI * 2) / sides;
  const t = ((theta % seg) + seg) % seg;
  return (radius * Math.cos(Math.PI / sides)) / Math.cos(t - Math.PI / sides);
}

const SHAPES = [3, 4, 5, 6, Infinity];
const POINTS = 72;

@customElement('app-loading-indicator')
export class LoadingIndicator extends LitElement {
  /** 指示器直径（px） */
  @property({ type: Number }) size = 44;
  /** 带容器变体：secondaryContainer 圆形背景 */
  @property({ type: Boolean, reflect: true }) boxed = false;
  /** 颜色角色（CSS 变量名） */
  @property({ type: String }) colorVar = '--md-sys-color-primary';

  private raf = 0;
  private startTime = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.startTime = performance.now();
    this.loop(this.startTime);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    cancelAnimationFrame(this.raf);
  }

  private loop = (now: number): void => {
    const t = (now - this.startTime) / 1000;
    const polygon = this.renderRoot.querySelector('polygon');
    if (polygon) {
      polygon.setAttribute('points', this.buildPoints(t));
      polygon.setAttribute('transform', `rotate(${(t * 140) % 360} 50 50)`);
    }
    this.raf = requestAnimationFrame(this.loop);
  };

  private buildPoints(t: number): string {
    // 每个形状停留 ~0.55s，变形 ~0.45s（带缓动）
    const cycle = 1.0;
    const pos = (t / cycle) % SHAPES.length;
    const i = Math.floor(pos);
    const frac = pos - i;
    const hold = 0.55;
    let mix = 0;
    if (frac > hold) {
      const k = (frac - hold) / (1 - hold);
      mix = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; // easeInOut
    }
    const fromSides = SHAPES[i];
    const toSides = SHAPES[(i + 1) % SHAPES.length];
    const rIn = 46; // 略缩，避免贴边
    const pts: string[] = [];
    for (let p = 0; p < POINTS; p += 1) {
      const theta = (p / POINTS) * Math.PI * 2;
      const rA = polygonRadius(theta, fromSides, rIn);
      const rB = polygonRadius(theta, toSides, rIn);
      const r = rA + (rB - rA) * mix;
      const x = 50 + r * Math.cos(theta - Math.PI / 2);
      const y = 50 + r * Math.sin(theta - Math.PI / 2);
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return pts.join(' ');
  }

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--md-sys-color-secondary-container);
    }
    svg {
      display: block;
    }
  `;

  render() {
    const inner = Math.round(this.size * (this.boxed ? 0.52 : 1));
    const svg = html`<svg width="${inner}" height="${inner}" viewBox="0 0 100 100" aria-label="加载中" role="progressbar">
      <polygon points="" style="fill: var(${this.colorVar})" />
    </svg>`;
    if (this.boxed) {
      return html`<span class="circle" style="width:${this.size}px;height:${this.size}px">${svg}</span>`;
    }
    return svg;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-loading-indicator': LoadingIndicator;
  }
}
