import { css } from 'styled-components';
import { systemFontStack, serifFontStack, monoFontStack } from 'styles/fonts';

export const FONT_STYLES = {
	SYSTEM: 'default',
	SERIF: 'serif',
	MONO: 'monospaced',
};

export const FONT_STYLES_MAP = {
	[FONT_STYLES.SYSTEM]: systemFontStack,
	[FONT_STYLES.SERIF]: serifFontStack,
	[FONT_STYLES.MONO]: monoFontStack,
};

export const DEFAULT_LIGHT_COLOR = '#ffffff';
export const DEFAULT_DARK_COLOR = '#333333';
export const DEFAULT_FONT_SIZE = '16';
export const DEFAULT_FONT_STYLE = FONT_STYLES.SYSTEM;
export const DEFAULT_TEXT = '';

export const DEFAULT_TITLE = 'PadPad';

export const DEFAULT_SETTINGS = {
	bgColor: DEFAULT_LIGHT_COLOR,
	fontColor: DEFAULT_DARK_COLOR,
	fontSize: DEFAULT_FONT_SIZE,
	fontStyle: DEFAULT_FONT_STYLE,
};

export const DEFAULT_PARAMS = {
	...DEFAULT_SETTINGS,
	text: DEFAULT_TEXT,
};

export const URL_UPDATE_DELAY = 320;
export const COLOR_UPDATE_DELAY = 100;

export const MIN_FONT_SIZE = 10;
export const MAX_FONT_SIZE = 60;
export const MIN_MODAL_WIDTH = 350;

export const transitionEasing = css`cubic-bezier(0.745, 0.190, 0.300, 0.955)`;
