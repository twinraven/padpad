import qs from 'qs';
import { map } from 'ramda';
import {
	DEFAULT_BG_COLOR,
	DEFAULT_FONT_COLOR,
	DEFAULT_FONT_SIZE,
} from 'config';

export function setUrlParams(newParams) {
	const { pathname } = document.location;
	const params = { ...getUrlParams(), ...newParams };

	const cleanParams = removeDefaultValues(params);
	const encodedParams = map(encodeURIComponent, cleanParams);

	const querystring = qs.stringify(encodedParams, { encode: false });
	const qmark = querystring.length ? '?' : '';
	const url = `${pathname}${qmark}${querystring}`;

	if (window.history.pushState) {
		window.history.pushState({ path: url }, '', url);
	}
}

function removeDefaultValues(params) {
	if (params.bgColor === DEFAULT_BG_COLOR) delete params.bgColor;
	if (params.fontColor === DEFAULT_FONT_COLOR) delete params.fontColor;
	if (params.fontSize === DEFAULT_FONT_SIZE) delete params.fontSize;
	if (params.text === '') delete params.text;

	return params;
}

export function getUrlParams() {
	const params = qs.parse(document.location.search, {
		ignoreQueryPrefix: true,
	});

	return map(decodeURIComponent, params);
}
