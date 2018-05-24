import { hasDefaultParams, createUrl } from './url';

const pathname = 'http://www.site.com/';
const params = {
	empty: {},
	simple: { text: 'hello' },
	complex: {
		text: 'hello',
		bgColor: '#f00',
		fontColor: '#00f',
		fontSize: '16',
		fontStyle: 'monospaced',
	},
};

describe('createUrl', () => {
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
		const output = hasDefaultParams(params.empty);
		expect(output).toBe(true);
	});

	it('handles params with only text defined', () => {
		const output = hasDefaultParams(params.simple);
		expect(output).toBe(true);
	});

	it('handles non-default params', () => {
		const output = hasDefaultParams(params.complex);
		expect(output).toBe(false);
	});
});
