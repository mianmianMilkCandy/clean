/**
 * 屏幕路由与过渡动画（MotionScheme.expressive：轻微回弹的弹簧效果）
 * - 进入方向：bottom（从底部滑入）/ right（从右侧滑入）
 * - 返回：反向播放进入时的动画；浏览器返回键/手势同样生效
 */
import type { ScreenId } from '../types';

export type EnterDirection = 'bottom' | 'right';

export interface NavOptions {
  /** 进入新屏幕的方向 */
  direction: EnterDirection;
  /** 附加数据（如要求重新扫描） */
  detail?: Record<string, unknown>;
}

interface HistoryState {
  screen: ScreenId;
  direction: EnterDirection;
  detail?: Record<string, unknown>;
}

const DURATION = 460;
const ENTER_EASING = 'cubic-bezier(0.34, 1.46, 0.64, 1)'; // spring：轻微回弹
const EXIT_EASING = 'cubic-bezier(0.2, 0, 0, 1)';

class Router {
  private screenLookup: (screen: ScreenId) => HTMLElement | null = () => null;
  private navHandler: ((to: ScreenId, options: NavOptions) => void) | null = null;
  /** 当前可见屏幕及其进入方向（用于反向播放） */
  private active: { screen: ScreenId; direction: EnterDirection } = { screen: 'home', direction: 'right' };
  private animating = false;

  init(
    screenLookup: (screen: ScreenId) => HTMLElement | null,
    onNavigate: (to: ScreenId, options: NavOptions) => void,
  ): void {
    this.screenLookup = screenLookup;
    this.navHandler = onNavigate;
    if (!history.state) {
      history.replaceState({ screen: 'home', direction: 'right' } satisfies HistoryState, '');
    }
    window.addEventListener('popstate', () => this.handlePop());
  }

  get current(): ScreenId {
    return this.active.screen;
  }

  get currentDetail(): Record<string, unknown> | undefined {
    return (history.state as HistoryState | null)?.detail;
  }

  navigate(to: ScreenId, options: NavOptions): void {
    const from = this.active.screen;
    const state: HistoryState = { screen: to, direction: options.direction, detail: options.detail };
    history.pushState(state, '');
    this.navHandler?.(to, options);
    this.playForward(from, to, options.direction);
    this.active = { screen: to, direction: options.direction };
  }

  back(): void {
    history.back();
  }

  private handlePop(): void {
    const target = (history.state as HistoryState | null) ?? { screen: 'home' as ScreenId, direction: 'right' as EnterDirection };
    const leaving = { ...this.active };
    this.navHandler?.(target.screen, { direction: target.direction, detail: target.detail });
    // 反向播放进入时的过渡动画：离开的屏幕沿进入方向滑出
    this.playReverse(leaving, target.screen);
    this.active = { screen: target.screen, direction: target.direction };
  }

  /** 前进过渡：新屏幕按方向滑入（带回弹），旧屏幕退向反方向并淡出 */
  private playForward(from: ScreenId, to: ScreenId, direction: EnterDirection): void {
    const fromEl = this.screenLookup(from);
    const toEl = this.screenLookup(to);
    if (!fromEl || !toEl || from === to) {
      if (toEl) toEl.style.visibility = 'visible';
      if (fromEl && from !== to) fromEl.style.visibility = 'hidden';
      return;
    }

    const axis = direction === 'bottom' ? 'Y' : 'X';
    const enterFrom = `translate${axis}(100%)`;
    const exitTo = `translate${axis}(${direction === 'bottom' ? '-14%' : '-10%'})`;

    toEl.style.visibility = 'visible';
    toEl.style.zIndex = '2';
    fromEl.style.zIndex = '1';

    const enter = toEl.animate(
      [
        { transform: enterFrom, opacity: 0.45 },
        { transform: 'translate(0, 0)', opacity: 1 },
      ],
      { duration: DURATION, easing: ENTER_EASING, fill: 'both' },
    );
    const exit = fromEl.animate(
      [
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: exitTo, opacity: 0 },
      ],
      { duration: DURATION * 0.7, easing: EXIT_EASING, fill: 'both' },
    );

    let finished = 0;
    const finish = () => {
      finished += 1;
      if (finished < 2) return;
      exit.cancel();
      fromEl.style.visibility = 'hidden';
      fromEl.style.zIndex = '0';
      toEl.style.zIndex = '1';
    };
    enter.onfinish = finish;
    enter.oncancel = finish;
    void this.animating;
  }

  /** 反向过渡：离开的屏幕沿其进入方向滑出，下层屏幕回位 */
  private playReverse(leaving: { screen: ScreenId; direction: EnterDirection }, to: ScreenId): void {
    const leaveEl = this.screenLookup(leaving.screen);
    const toEl = this.screenLookup(to);
    if (!leaveEl || !toEl || leaving.screen === to) {
      if (toEl) toEl.style.visibility = 'visible';
      if (leaveEl && leaving.screen !== to) leaveEl.style.visibility = 'hidden';
      return;
    }

    const axis = leaving.direction === 'bottom' ? 'Y' : 'X';
    const exitTo = `translate${axis}(100%)`;
    const revealFrom = `translate${axis}(${leaving.direction === 'bottom' ? '-14%' : '-10%'})`;

    leaveEl.style.zIndex = '2';
    toEl.style.zIndex = '1';
    toEl.style.visibility = 'visible';

    const exit = leaveEl.animate(
      [
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: exitTo, opacity: 0.45 },
      ],
      { duration: DURATION * 0.7, easing: EXIT_EASING, fill: 'both' },
    );
    const reveal = toEl.animate(
      [
        { transform: revealFrom, opacity: 0 },
        { transform: 'translate(0, 0)', opacity: 1 },
      ],
      { duration: DURATION, easing: ENTER_EASING, fill: 'both' },
    );

    let finished = 0;
    const finish = () => {
      finished += 1;
      if (finished < 2) return;
      exit.cancel();
      leaveEl.style.visibility = 'hidden';
      leaveEl.style.zIndex = '0';
      toEl.style.zIndex = '1';
    };
    reveal.onfinish = finish;
    reveal.oncancel = finish;
  }
}

export const router = new Router();
