import pipe from 'ramda/src/pipe';
import { DEFAULT_PARAMS } from 'config.js';

// remove all element props, e.g. style="padding: 12px"
export const removeElementProps = input =>
	input.replace(/<([a-zA-Z-]+[1-6]?)( [a-zA-Z-]+=[^>]+)*>/gim, '<$1>');

// TODO: potential bug -- <div><br><br></div> not handled here
// if a <br> is wrapped in a div and any other tags, partially unwrap it
export const partiallyUnwrapBreaks = input =>
	input.replace(
		/<div>(<[a-zA-Z]+>)*\s*<br ?\/?>(<\/[a-zA-Z]+>)*\s*<\/div>/gim,
		'<div><br></div>'
	);

// unwrap the remaining <div><br></div> patterns to just the <br>
export const unwrapBreaks = input =>
	input.replace(/<div><br ?\/?><\/div>/gim, '<br>');

// if a br directly precedes a div, remove the br
export const removeBreakBeforeDiv = input =>
	input.replace(/(<br ?\/?>)(<div>)/gim, '$2');

// NOT if it's at the start of the string
export const replaceBlockTagsWithBreaks = input =>
	input.replace(
		/(?!^)<(div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|dl|dd|dt|pre|hr) ?\/?>/gim,
		'<br>'
	);

export const replaceStrongTagsWithBs = input =>
	input.replace(/(<\/?)strong>/gim, '$1b>');

export const replaceEmTagsWithIs = input =>
	input.replace(/(<\/?)em>/gim, '$1i>');

// except br, b & i
export const removeAllTagsExceptWhitelist = input =>
	input.replace(/<[/]?(?!(br|b>|i>))[a-zA-Z]+[1-6]? ?\/?>/gim, '');

export const replaceLineWrapsWithBreaks = input =>
	input.replace(/[\n\r]/gim, '<br>');

export const removeNonBreakingSpaces = input =>
	input.replace(/(&nbsp;)/gim, ' ');

export const removeTrailingWhitespaceOrBreaks = input =>
	input.replace(/(<br ?\/?>|\s)+$/gim, '');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const cleanMarkup = pipe(
	removeElementProps,
	partiallyUnwrapBreaks,
	removeBreakBeforeDiv,
	unwrapBreaks,
	replaceBlockTagsWithBreaks,
	replaceStrongTagsWithBs,
	replaceEmTagsWithIs,
	removeAllTagsExceptWhitelist,
	replaceLineWrapsWithBreaks,
	removeNonBreakingSpaces,
	removeTrailingWhitespaceOrBreaks
);

export function removeDefaultValues(params) {
	for (const [key, value] of Object.entries(params)) {
		if (value === DEFAULT_PARAMS[key]) delete params[key];
	}

	return params;
}
