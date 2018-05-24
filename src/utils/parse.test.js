import {
	removeDefaultValues,
	removeElementProps,
	partiallyUnwrapBreaks,
	unwrapBreaks,
	removeBreakBeforeDiv,
	replaceBlockTagsWithBreaks,
	replaceStrongTags,
	replaceEmTags,
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
		it('removes a break before a div', () => {
			const input = '<br><div>test</div>';
			const output = removeBreakBeforeDiv(input);
			expect(output).toBe('<div>test</div>');
		});

		it('only removes one break', () => {
			const input = '<br><br><div>test</div>';
			const output = removeBreakBeforeDiv(input);
			expect(output).toBe('<br><div>test</div>');
		});

		it('ignores tags other than a div', () => {
			const input = '<br><span>test</span>';
			const output = removeBreakBeforeDiv(input);
			expect(output).toBe(input);
		});

		it('handles self-closing break tag', () => {
			const input = '<br /><div>test</div>';
			const output = removeBreakBeforeDiv(input);
			expect(output).toBe('<div>test</div>');
		});
	});

	describe('replaceBlockTagsWithBreaks', () => {
		// regex only matches after beginning of string
		it('replaces a div tag', () => {
			const input = 'prefix text<div>';
			const output = replaceBlockTagsWithBreaks(input);
			expect(output).toBe('prefix text<br>');
		});

		it('replaces a heading tag', () => {
			const input = 'prefix text<h6>';
			const output = replaceBlockTagsWithBreaks(input);
			expect(output).toBe('prefix text<br>');
		});

		it("doesn't replace a div tag at the start", () => {
			const input = '<div>';
			const output = replaceBlockTagsWithBreaks(input);
			expect(output).toBe('<div>');
		});

		it("doesn't replace an inline element", () => {
			const input = '<span>';
			const output = replaceBlockTagsWithBreaks(input);
			expect(output).toBe('<span>');
		});
	});

	describe('replaceStrongTags', () => {
		it('replace an opening strong tag', () => {
			const input = '<strong>';
			const output = replaceStrongTags(input);
			expect(output).toBe('<b>');
		});

		it('replace a closing strong tag', () => {
			const input = '</strong>';
			const output = replaceStrongTags(input);
			expect(output).toBe('</b>');
		});
	});

	describe('replaceEmTags', () => {
		it('replace an opening em tag', () => {
			const input = '<em>';
			const output = replaceEmTags(input);
			expect(output).toBe('<i>');
		});

		it('replace a closing em tag', () => {
			const input = '</em>';
			const output = replaceEmTags(input);
			expect(output).toBe('</i>');
		});
	});

	describe('removeAllTagsExceptWhitelist', () => {
		it('removes an opening tag', () => {
			const input = '<div>';
			const output = removeAllTagsExceptWhitelist(input);
			expect(output).toBe('');
		});

		it('removes a closing tag', () => {
			const input = '</div>';
			const output = removeAllTagsExceptWhitelist(input);
			expect(output).toBe('');
		});

		it('removes a self-closing tag', () => {
			const input = '<b />';
			const output = removeAllTagsExceptWhitelist(input);
			expect(output).toBe('');
		});

		it('does not remove a br tag', () => {
			const input = '<br>';
			const output = removeAllTagsExceptWhitelist(input);
			expect(output).toBe(input);
		});

		it('does not remove a b tag', () => {
			const input = '<b>';
			const output = removeAllTagsExceptWhitelist(input);
			expect(output).toBe(input);
		});

		it('does not remove an i tag', () => {
			const input = '<i>';
			const output = removeAllTagsExceptWhitelist(input);
			expect(output).toBe(input);
		});
	});

	describe('replaceLineWrapsWithBreaks', () => {
		it('removes a line wrap', () => {
			const input = `
`;
			const output = replaceLineWrapsWithBreaks(input);
			expect(output).toBe('<br>');
		});
	});

	describe('removeNonBreakingSpaces', () => {
		it('replaces a non-breaking space with a single space', () => {
			const input = '&nbsp;';
			const output = removeNonBreakingSpaces(input);
			expect(output).toBe(' ');
		});

		it('ignores a non-matching string', () => {
			const input = '&hellip;';
			const output = removeNonBreakingSpaces(input);
			expect(output).toBe('&hellip;');
		});
	});

	describe('removeTrailingWhitespaceOrBreaks', () => {
		it('removes a break from the end of the input', () => {
			const input = 'test<div><br>';
			const output = removeTrailingWhitespaceOrBreaks(input);
			expect(output).toBe('test<div>');
		});

		it('removes whitespace from the end of the input', () => {
			const input = 'test<div>   ';
			const output = removeTrailingWhitespaceOrBreaks(input);
			expect(output).toBe('test<div>');
		});

		it('does not remove a break from the middle of the input', () => {
			const input = 'test<br><div>';
			const output = removeTrailingWhitespaceOrBreaks(input);
			expect(output).toBe('test<br><div>');
		});
	});

	describe('cleanMarkup', () => {
		it('correctly cleans a complex string', () => {
			const input =
				'<div class="max-w-sm" style="box-sizing: inherit; border-width: 0px; border-style: solid; border-color: rgb(218, 225, 231); max-width: 30rem; color: rgb(34, 41, 47); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(242, 246, 248);"><div class="flex mx-2 sm:my-8" style="box-sizing: inherit; border-width: 0px; border-style: solid; border-color: rgb(218, 225, 231); display: flex; margin: 2rem 0.5rem;"><img class="avatar  hidden  sm:block h-12 mt-2 ml-4 sm:ml-0 rounded-full mr-4 sm:mb-0 sm:mr-4 sm:ml-0" src="http://www.website.com/" alt="" style="box-sizing: inherit; border-width: 0px; border-style: solid; border-color: rgb(218, 225, 231); max-width: 100%; border-radius: 9999px; display: block; height: 3rem; margin: 0.5rem 1rem 0px 0px;"><div class="sm:text-left pt-1 sm:flex-grow" style="box-sizing: inherit; border-width: 0px; border-style: solid; border-color: rgb(218, 225, 231); padding-top: 0.25rem; -webkit-box-flex: 1; flex-grow: 1;"><p class="text-grey-dark pb-2" style="box-sizing: inherit; border-width: 0px; border-style: solid; border-color: rgb(218, 225, 231); line-height: 1.5; padding-bottom: 0.5rem; color: rgb(135, 149, 161);">Tom Bran - Contract Front-end Developer&nbsp;</p><p class="text-xs pb-2" style="box-sizing: inherit; border-width: 0px; border-style: solid; border-color: rgb(218, 225, 231); line-height: 1.5; padding-bottom: 0.5rem; font-size: 0.75rem;"><a href="https://twitter.com/CedricSoulas" class="no-underline font-semibold rounded px-4 py-1 bg-blue text-white hover:bg-blue-dark" style="box-sizing: inherit; border-width: 0px; border-style: solid; border-color: rgb(218, 225, 231); background-color: rgb(52, 144, 220); color: rgb(255, 255, 255); border-radius: 0.25rem; font-weight: 600; padding: 0.25rem 1rem;">Follow</a>&nbsp;<a href="mailto:test@email.com" class="hidden sm:inline no-underline font-semibold rounded px-4 py-1 bg-white border border-grey text-grey-darker hover:bg-grey-light hover:text-grey-darker" style="box-sizing: inherit; border-width: 1px; border-style: solid; border-color: rgb(184, 194, 204); background-color: rgb(255, 255, 255); color: rgb(96, 111, 123); border-radius: 0.25rem; display: inline; font-weight: 600; padding: 0.25rem 1rem;">Contact</a>&nbsp;<a href="https://www.website.com/" class="no-underline font-semibold rounded px-4 py-1 bg-white border border-grey text-grey-darker hover:bg-grey-light hover:text-grey-darker" style="box-sizing: inherit; border-width: 1px; border-style: solid; border-color: rgb(184, 194, 204); background-color: rgb(255, 255, 255); color: rgb(96, 111, 123); border-radius: 0.25rem; font-weight: 600; padding: 0.25rem 1rem;">Hire me</a></p></div></div></div><div class="max-w-sm" style="box-sizing: inherit; border-width: 0px; border-style: solid; border-color: rgb(218, 225, 231); max-width: 30rem; color: rgb(34, 41, 47); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium; white-space: normal; background-color: rgb(242, 246, 248);"><div class="hidden md:block shadow rounded mx-auto bg-white pb-4 p-4 sm:p-8" style="box-sizing: inherit; border-width: 0px; border-style: solid; border-color: rgb(218, 225, 231); background-color: rgb(255, 255, 255); border-radius: 0.25rem; margin-left: auto; margin-right: auto; padding: 2rem; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;"></div></div>';
			const expected =
				'<br><br><br>Tom Bran - Contract Front-end Developer <br>Follow Contact Hire me';
			const output = cleanMarkup(input);
			expect(output).toBe(expected);
		});

		it('correctly cleans a simpler string', () => {
			const input =
				'<div><h1>This should be a simple <strong>bold</strong> bit</h1><hr><span>of text</span></div>';
			const expected = '<br>This should be a simple <b>bold</b> bit<br>of text';
			const output = cleanMarkup(input);
			expect(output).toBe(expected);
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
