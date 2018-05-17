import qs from 'qs';
import pipe from 'ramda/src/pipe';
import map from 'ramda/src/map';
import evolve from 'ramda/src/evolve';
import { DEFAULT_PARAMS } from 'config.js';

export function setUrlParams(newParams) {
	const { pathname } = document.location;
	const params = { ...getQueryParams(), ...newParams };
	const parsedParams = pipe(
		removeDefaultValues,
		evolve({ text: removeMarkup }),
		map(encodeURIComponent)
	)(params);

	const querystring = qs.stringify(parsedParams, { encode: false });
	const queryPrefix = querystring.length ? '?' : '';
	const url = `${pathname}${queryPrefix}${querystring}`;

	if (window.history.pushState) {
		window.history.pushState({ path: url }, '', url);
	}
}

function removeDefaultValues(params) {
	for (const [key, value] of Object.entries(params)) {
		if (value === DEFAULT_PARAMS[key]) delete params[key];
	}

	return params;
}

// TODO: add tests
// TODO: move out from here, into markup.js in utils?
export function removeMarkup(val) {
	// TODO: tidy up
	let output = val;
	// remove all element props, e.g. style=X
	output = output.replace(/<([a-zA-Z]+)( [a-zA-Z]+=[^>]+)*>/gim, '<$1>');

	/*
	// if a <br> is needlessly wrapped in another tag, unwrap it
	// output = output.replace(/(<[a-zA-Z]+>)<br ?(\/)?>(<\/[a-zA-Z]+>)/gim, '<br>');
	// same as above, just to unwrap double-wrapped <br>s
	// output = output.replace(/(<[a-zA-Z]+>)<br ?(\/)?>(<\/[a-zA-Z]+>)/gim, '<br>');
	// would you believe it - triple wrapped. This is because we can expect 3 tags:
	// div, b, and i, and in any order.
	// output = output.replace(/(<[a-zA-Z]+>)<br ?(\/)?>(<\/[a-zA-Z]+>)/gim, '<br>');
	*/

	// REPLACES ABOVE
	// if a <br> is wrapped in a div and any other tags, completely unwrap it
	output = output.replace(
		/<div>(<[a-zA-Z]+>)*<br ?(\/)?>(<\/[a-zA-Z]+>)*<\/div>/gim,
		'<br>'
	);

	// after the cleaning above, if a br directly precedes a div, remove the div.
	// any divs remaining after this step should become <br>s, as below
	output = output.replace(/(<br ?(\/)?>)<div>/gim, '$1');

	// replace any remaining <div>s with <br>s, but NOT
	// if it's the very first thing in the value
	output = output.replace(/(?!^)<div>/gim, '<br>');

	// replace line breaks and returns with <br>s
	output = output.replace(/[\n\r]/gim, '<br>');

	// remove all remaining opening/closing tags except br, b & i
	output = output.replace(/<[/]?(?!(br|b|i))[a-zA-Z]+>/gim, '');

	// remove non-breaking spaces
	output = output.replace(/(&nbsp;)/gim, ' ');

	return output;
}

export const getQueryParams = () =>
	qs.parse(document.location.search, {
		ignoreQueryPrefix: true,
	});

export function hasDefaultParams() {
	const params = getQueryParams();
	delete params.text;

	return Object.keys(params).length === 0;
}

export function getShortUrl(longUrl) {
	const token = process.env.REACT_APP_BITLY_API_TOKEN;

	return fetch(
		`https://api-ssl.bitly.com/v3/shorten?access_token=${token}&longUrl=${longUrl}`
	).then(response => response.json());
}

export function getShareUrl(urlToShare) {
	return getShortUrl(encodeURIComponent(urlToShare))
		.then(({ data, status_code }) => {
			if (status_code === 500) {
				throw new Error();
			}

			return data.url;
		})
		.catch(() => urlToShare);
}
