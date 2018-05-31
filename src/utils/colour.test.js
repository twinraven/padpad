import { getAutoTextColor } from './colour';
import { DEFAULT_LIGHT_COLOR, DEFAULT_DARK_COLOR } from 'config.js';

describe('getAutoTextColor', () => {
	it('returns the default dark colour if given a non-hex', () => {
		const output = getAutoTextColor('test');
		expect(output).toBe(DEFAULT_DARK_COLOR);
	});

	it('works if no colour is provided', () => {
		const output = getAutoTextColor();
		expect(output).toBe(DEFAULT_DARK_COLOR);
	});

	it('works for shorthand colours', () => {
		const output = getAutoTextColor('#aaa');
		expect(output).toBe(DEFAULT_LIGHT_COLOR);
	});

	it('works for uppercase colours', () => {
		const output = getAutoTextColor('#0F0F0F');
		expect(output).toBe(DEFAULT_LIGHT_COLOR);
	});

	it('returns the default dark color if given a light color', () => {
		const output = getAutoTextColor('#eeeeeee');
		expect(output).toBe(DEFAULT_DARK_COLOR);
	});

	it('returns the default light color if given a dark color', () => {
		const output = getAutoTextColor('#111111');
		expect(output).toBe(DEFAULT_LIGHT_COLOR);
	});
});
