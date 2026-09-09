/** 入口：样式加载、动态配色、应用挂载 */
import './app';
import './styles/fonts.css';
import './styles/base.css';
import './styles/tokens.css';
import { applyDynamicTheme } from './services/theme';

// 动态配色：能获取到用户强调色时生成 M3 方案，否则保持 Blue 备用主题
applyDynamicTheme();
