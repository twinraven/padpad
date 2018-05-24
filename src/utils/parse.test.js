import {
	removeDefaultValues,
	removeElementProps,
	partiallyUnwrapBreaks,
	unwrapBreaks,
	removeBreakBeforeDiv,
	replaceBlockTagsWithBreaks,
	removeAllTagsExceptWhitelist,
	replaceLineWrapsWithBreaks,
	removeNonBreakingSpaces,
	removeTrailingWhitespaceOrBreaks,
	cleanMarkup,
} from './parse';
import {
	DEFAULT_FONT_SIZE,
	DEFAULT_DARK_COLOR,
	DEFAULT_LIGHT_COLOR,
	DEFAULT_FONT_STYLE,
} from 'config';

const params = {
	empty: {},
	simple: { text: 'hello' },
	removeOne: {
		text: 'hello',
		bgColor: '#f00',
		fontColor: '#00f',
		fontSize: DEFAULT_FONT_SIZE,
		fontStyle: 'monospaced',
	},
	removeAll: {
		bgColor: DEFAULT_LIGHT_COLOR,
		fontColor: DEFAULT_DARK_COLOR,
		fontSize: DEFAULT_FONT_SIZE,
		fontStyle: DEFAULT_FONT_STYLE,
	},
};

describe('clean markup', () => {
	describe('removeElementProps', () => {
		const createElem = (elem, params = '') =>
			`<${elem}${params.length > 0 ? ' ' : ''}${params}>test</${elem}>`;

		it('handles element without props', () => {
			const input = createElem('div');
			const expected = createElem('div');
			const output = removeElementProps(input);
			expect(output).toBe(expected);
		});

		it('handles div element with props', () => {
			const input = createElem('div', 'style="font-size: 20px;"');
			const output = removeElementProps(input);
			const expected = createElem('div');
			expect(output).toBe(expected);
		});

		it('handles multiple props', () => {
			const input = createElem('div', 'style="font-size: 20px" bgcolor="red"');
			const expected = createElem('div');
			const output = removeElementProps(input);
			expect(output).toBe(expected);
		});

		it('handles heading elements', () => {
			const input = createElem('h2', 'style="font-size: 20px" bgcolor="red"');
			const expected = createElem('h2');
			const output = removeElementProps(input);
			expect(output).toBe(expected);
		});

		it('handles single-letter elements', () => {
			const input = createElem('b', 'style="font-size: 20px" bgcolor="red"');
			const expected = createElem('b');
			const output = removeElementProps(input);
			expect(output).toBe(expected);
		});

		it('handles svg props', () => {
			const input = createElem('svg', 'd="Z1.23 4.56X" stroke-linecap="round"');
			const expected = createElem('svg');
			const output = removeElementProps(input);
			expect(output).toBe(expected);
		});

		it('handles custom elements', () => {
			const input = createElem(
				'test-elem',
				'd="Z1.23 4.56X" stroke-linecap="round"'
			);
			const expected = createElem('test-elem');
			const output = removeElementProps(input);
			expect(output).toBe(expected);
		});
	});

	describe('partiallyUnwrapBreaks', () => {
		const wrapElement = (element, wrappers) => {
			let startTags = '';
			let endTags = '';

			wrappers.map(tag => {
				startTags += `<${tag}>`;
				endTags = `</${tag}>` + endTags;
			});

			return `${startTags}${element}${endTags}`;
		};
		const result = '<div><br></div>';

		it('ignores a perfect result', () => {
			const input = wrapElement('<br>', ['div']);
			const output = partiallyUnwrapBreaks(input);
			expect(output).toBe(result);
		});

		it('ignores whitespace', () => {
			const input = '<div> <br> </div>';
			const output = partiallyUnwrapBreaks(input);
			expect(output).toBe('<div><br></div>');
		});

		it('removes single wrapping elements', () => {
			const input = wrapElement('<br>', ['div', 'span']);
			const output = partiallyUnwrapBreaks(input);
			expect(output).toBe(result);
		});

		it('removes multiple wrapping elements', () => {
			const input = wrapElement('<br>', ['div', 'span', 'div']);
			const output = partiallyUnwrapBreaks(input);
			expect(output).toBe(result);
		});

		it('tidies up break element to replace self-closing tags', () => {
			const input = wrapElement('<br />', ['div']);
			const output = partiallyUnwrapBreaks(input);
			expect(output).toBe(result);
		});
	});

	describe('unwrapBreaks', () => {
		it('removes divs round from a breal', () => {
			const input = '<div><br></div>';
			const output = unwrapBreaks(input);
			expect(output).toBe('<br>');
		});

		it('ignores non-div wrappers', () => {
			const input = '<p><br></p>';
			const output = unwrapBreaks(input);
			expect(output).toBe(input);
		});

		it('handles self-closing breaks', () => {
			const input = '<div><br /></div>';
			const output = unwrapBreaks(input);
			expect(output).toBe('<br>');
		});
	});

	describe('removeBreakBeforeDiv', () => {
		it('', () => {
			expect(true).toBe(true);
		});
	});

	describe('replaceBlockTagsWithBreaks', () => {
		it('', () => {
			expect(true).toBe(true);
		});
	});

	describe('removeAllTagsExceptWhitelist', () => {
		it('', () => {
			expect(true).toBe(true);
		});
	});

	describe('replaceLineWrapsWithBreaks', () => {
		it('', () => {
			expect(true).toBe(true);
		});
	});

	describe('removeNonBreakingSpaces', () => {
		it('', () => {
			expect(true).toBe(true);
		});
	});

	describe('removeTrailingWhitespaceOrBreaks', () => {
		it('', () => {
			expect(true).toBe(true);
		});
	});

	describe('cleanMarkup', () => {
		it('', () => {
			expect(true).toBe(true);
		});
	});
});

describe('removeDefaultValues', () => {
	it('handles empty params', () => {
		const output = removeDefaultValues(params.empty);
		expect(output).toEqual({});
	});

	it('handles params with only text defined', () => {
		const output = removeDefaultValues(params.simple);
		expect(output).toEqual(params.simple);
	});

	it('removes 1 of 5 params with default value', () => {
		const output = removeDefaultValues(params.removeOne);
		expect(output).not.toContain('fontSize');
	});

	it('removes all params', () => {
		const output = removeDefaultValues(params.removeAll);
		expect(output).toEqual({});
	});
});
