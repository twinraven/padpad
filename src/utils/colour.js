import { DEFAULT_LIGHT_COLOR, DEFAULT_DARK_COLOR } from 'config.js';

export function getAutoTextColor(hex = DEFAULT_LIGHT_COLOR) {
	if (!/^#(?:[0-9a-f]{3}){1,2}$/gi.test(hex)) return DEFAULT_DARK_COLOR;

	let color = hex.replace('#', '');

	if (color.length === 3) {
		color = color
			.split('')
			.map(char => char + char)
			.join('');
	}
	return `0x${color}` > 0xffffff * 0.75
		? DEFAULT_DARK_COLOR
		: DEFAULT_LIGHT_COLOR;
}
