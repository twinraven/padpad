import { isUndefined } from 'utils/type';
import { DEFAULT_TITLE } from 'config.js';
import { getText } from 'utils/parse';

export function getTitle(markup) {
	if (isUndefined(markup) || markup.length === 0) return DEFAULT_TITLE;

	const firstLine = markup.split(/<(br|div) ?\/?>/i)[0];
	const text = getText(firstLine);
	let title = text.substring(0, 25);

	if (title.length < text.length) {
		title = `${title}…`;
	}

	return `${DEFAULT_TITLE} | ${title}`;
}
