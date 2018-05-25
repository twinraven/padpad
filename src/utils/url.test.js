import { createUrl } from './url';

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
