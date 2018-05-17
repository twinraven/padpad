import { css } from 'styled-components';

export const DEFAULT_LIGHT_COLOR = '#ffffff';
export const DEFAULT_DARK_COLOR = '#333333';
export const DEFAULT_FONT_SIZE = '16';
export const DEFAULT_TEXT = '';

export const DEFAULT_TITLE = 'Pad';

export const DEFAULT_SETTINGS = {
	bgColor: DEFAULT_LIGHT_COLOR,
	fontColor: DEFAULT_DARK_COLOR,
	fontSize: DEFAULT_FONT_SIZE,
};

export const DEFAULT_PARAMS = {
	...DEFAULT_SETTINGS,
	text: DEFAULT_TEXT,
};

export const URL_UPDATE_DELAY = 250;
export const COLOR_UPDATE_DELAY = 100;
export const RESIZE_UPDATE_DELAY = 100;

export const MIN_FONT_SIZE = 10;
export const MAX_FONT_SIZE = 60;
export const MIN_CANVAS_HEIGHT = 100;
export const MIN_MODAL_WIDTH = 350;

export const transitionEasing = css`cubic-bezier(0.745, 0.190, 0.300, 0.955)`;

export const systemFontStack =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif';

// TODO: add font stacks
// export const serifFontStack = '';
// export const monoFontStack = '';
