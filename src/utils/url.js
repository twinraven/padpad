import qs from 'qs';
import { map } from 'ramda';

export function setUrlParams(params) {
	const { protocol, host, pathname } = document.location;
	const currentParams = getUrlParams();
	const encodedParams = map(encodeURIComponent, { ...currentParams, ...params });
	const querystring = qs.stringify(encodedParams);
	const url = `${protocol}//${host}${pathname}/?${querystring}`;

	if (window.history.pushState) {
		window.history.pushState({ path: url }, '', url);
	}
}

export function getUrlParams() {
	const search = document.location.search.replace('?', '');
	const params = qs.parse(search);

	return map(decodeURIComponent, params);
}
