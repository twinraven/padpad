import { DEFAULT_PARAMS } from 'config.js';

// TODO: add tests
export function cleanMarkup(val) {
	let output = val;
	// remove all element props, e.g. style="padding: 12px"
	output = output.replace(/<([a-zA-Z]+)( [a-zA-Z]+=[^>]+)*>/gim, '<$1>');

	// if a <br> is wrapped in a div and any other tags, completely unwrap it
	// and replace with two <br>s
	output = output.replace(
		/<div>(<[a-zA-Z]+>)*<br ?(\/)?>(<\/[a-zA-Z]+>)*<\/div>/gim,
		'<br><br>'
	);

	// if there are 3 <br>s in a row (as a result of previous 'replace's above)
	// then it's v likely we only want 2
	output = output.replace(/<br ?(\/)?><br ?(\/)?><br ?(\/)?>/gim, '<br><br>');

	// after the cleaning above, if a br directly precedes a div, remove the div.
	// any divs remaining after this step should become <br>s, as below
	output = output.replace(/(<br ?(\/)?>)<div>/gim, '$1');

	// replace any remaining <div>s with <br>s, but NOT
	// if it's the very first thing in the input
	output = output.replace(/(?!^)<div>/gim, '<br>');

	// replace line breaks and returns with <br>s
	output = output.replace(/[\n\r]/gim, '<br>');

	// remove all remaining opening/closing tags except br, b & i
	output = output.replace(/<[/]?(?!(br|b|i))[a-zA-Z]+>/gim, '');

	// remove non-breaking spaces
	output = output.replace(/(&nbsp;)/gim, ' ');

	return output;
}

// TODO: add tests
export function removeDefaultValues(params) {
	for (const [key, value] of Object.entries(params)) {
		if (value === DEFAULT_PARAMS[key]) delete params[key];
	}

	return params;
}
