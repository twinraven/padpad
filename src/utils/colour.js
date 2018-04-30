import { DEFAULT_BG_COLOR, DEFAULT_FONT_COLOR } from 'config';

export function getAutoTextColor(hex = DEFAULT_BG_COLOR) {
	let color = hex.replace('#', '');

	if (color.length === 3) {
		color = color
			.split('')
			.map(char => char + char)
			.join('');
	}
	return `0x${color}` > 0xffffff * 0.75 ? DEFAULT_FONT_COLOR : DEFAULT_BG_COLOR;
}
