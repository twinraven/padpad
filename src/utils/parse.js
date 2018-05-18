import { DEFAULT_PARAMS } from 'config.js';

// TODO: add tests
export function cleanMarkup(val) {
	let output = val;
	// remove all element props, e.g. style="padding: 12px"
	output = output.replace(/<([a-zA-Z]+)( [a-zA-Z]+=[^>]+)*>/gim, '<$1>');

	// if a <br> is wrapped in a div and any other tags, partially unwrap it
	output = output.replace(
		/<div>(<[a-zA-Z]+>)*<br ?\/?>(<\/[a-zA-Z]+>)*<\/div>/gim,
		'<div><br></div>'
	);

	// if a br directly precedes a div, remove the br
	output = output.replace(/(<br ?\/?>)(<div>)/gim, '$2');

	// unwrap the remaining <div><br></div> patterns to just the <br>
	output = output.replace(/<div><br ?\/?><\/div>/gim, '<br>');

	// replace any remaining <div>s with <br>s, but NOT if it's at the start of the string
	output = output.replace(/(?!^)<div>/gim, '<br>');

	// remove all remaining opening/closing tags except br, b & i
	output = output.replace(/<[/]?(?!(br|b|i))[a-zA-Z]+>/gim, '');

	// replace line breaks and returns with <br>s
	output = output.replace(/[\n\r]/gim, '<br>');

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
