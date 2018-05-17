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
// TODO: move
export function removeMarkup(val) {
	// TODO: tidy up
	let out = val;
	out = out.replace(/<([a-zA-Z]+)( [a-zA-Z]+=[^>]+)*>/gim, '<$1>');
	out = out.replace(/([\w\d\s]+)(<div>)([\w\d\s]+)/gim, '$1<br>$3');
	out = out.replace(/<[/]?(?!(br|b|i))[a-zA-Z]+>/gim, '');
	out = out.replace(/(&nbsp;)/gim, ' ');

	return out;
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
