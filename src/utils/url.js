import qs from 'qs';
import pipe from 'ramda/src/pipe';
import map from 'ramda/src/map';
import evolve from 'ramda/src/evolve';
import { removeDefaultValues, cleanMarkup } from 'utils/parse';

export function setUrlParams(newParams) {
	const params = { ...getQueryParams(), ...newParams };
	const querystring = createQuerystring(params);
	const url = createUrl(querystring);

	if (window.history.pushState) {
		window.history.pushState({ path: url }, '', url);
	}
}
// TODO: add tests
const cleanParams = pipe(
	removeDefaultValues,
	evolve({ text: cleanMarkup }),
	map(encodeURIComponent)
);

// TODO: add tests
const createQuerystring = params =>
	qs.stringify(cleanParams(params), { encode: false });

// TODO: add tests
const createUrl = qs => `${document.location.pathname}${qs.length && '?'}${qs}`;

export const getQueryParams = () =>
	qs.parse(document.location.search, {
		ignoreQueryPrefix: true,
	});

export function hasDefaultParams() {
	const params = getQueryParams();
	delete params.text;

	return Object.keys(params).length === 0;
}

// TODO: move to api file?
function fetchShortUrl(longUrl) {
	const token = process.env.REACT_APP_BITLY_API_TOKEN;

	return fetch(
		`https://api-ssl.bitly.com/v3/shorten?access_token=${token}&longUrl=${longUrl}`
	).then(response => response.json());
}

export function getShareUrl(urlToShare) {
	return fetchShortUrl(encodeURIComponent(urlToShare))
		.then(({ data, status_code }) => {
			if (status_code === 500) {
				throw new Error();
			}

			return data.url;
		})
		.catch(() => urlToShare);
}
