import qs from 'qs';
import pipe from 'ramda/src/pipe';
import map from 'ramda/src/map';
import evolve from 'ramda/src/evolve';
import { fetchShortUrl } from 'api/api';
import { removeDefaultParams, cleanMarkup } from './parse';

export function setUrlParams(newParams) {
	const params = { ...getQueryParams(), ...newParams };
	const querystring = createQuerystring(params);
	const url = createUrl(querystring, document.location.pathname);

	if (window.history.pushState) {
		window.history.pushState({ path: url }, '', url);
	}
}

export const getQueryParams = () =>
	qs.parse(document.location.search, {
		ignoreQueryPrefix: true,
	});

export function hasDefaultParams(params) {
	const testParams = { ...params };
	delete testParams.text;

	return Object.keys(testParams).length === 0;
}

const cleanParams = pipe(
	evolve({ text: cleanMarkup }),
	removeDefaultParams,
	map(encodeURIComponent)
);

const createQuerystring = params =>
	qs.stringify(cleanParams(params), { encode: false });

export const createUrl = (qs, pathname) =>
	`${pathname}${qs.length ? '?' : ''}${qs}`;

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
