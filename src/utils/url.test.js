import { createUrl, hasDefaultParams } from './url';

describe('createUrl', () => {
	const pathname = 'http://www.site.com/';

	it('creates a valid url with parameters', () => {
		const output = createUrl('text=hello', pathname);
		expect(output).toEqual(`${pathname}?text=hello`);
	});

	it('creates a valid url without parameters', () => {
		const output = createUrl('', pathname);
		expect(output).toEqual(pathname);
	});
});

describe('hasDefaultParams', () => {
	it('handles empty parameters', () => {
		const input = {};
		const output = hasDefaultParams(input);
		expect(output).toBe(true);
	});

	it('handles params with only text defined', () => {
		const input = { text: 'test' };
		const output = hasDefaultParams(input);
		expect(output).toBe(true);
	});

	it('handles user-defined params', () => {
		const input = {
			text: 'test',
			bgColor: '#f00',
			fontColor: '#00f',
			fontSize: '16',
			fontStyle: 'monospaced',
		};
		const output = hasDefaultParams(input);
		expect(output).toBe(false);
	});
});
