import qs from 'qs';
import { map } from 'ramda';
import { DEFAULT_PARAMS } from 'config';

export function setUrlParams(newParams) {
	const { pathname } = document.location;
	const params = { ...getQueryParams(), ...newParams };

	const cleanParams = removeDefaultValues(params);
	const encodedParams = map(encodeURIComponent, cleanParams);

	const querystring = qs.stringify(encodedParams, { encode: false });
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

export const getQueryParams = () =>
	qs.parse(document.location.search, {
		ignoreQueryPrefix: true,
	});

export function getShortUrl(longUrl) {
	const token = process.env.REACT_APP_BITLY_API_TOKEN;

	return fetch(
		`https://api-ssl.bitly.com/v3/shorten?access_token=${token}&longUrl=${longUrl}`
	).then(response => response.json());
}
