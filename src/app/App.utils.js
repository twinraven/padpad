import { isUndefined } from 'utils/type';
import { DEFAULT_TITLE } from 'config.js';

export function getTitle(text) {
	if (isUndefined(text) || text.length === 0) return DEFAULT_TITLE;

	const firstLine = text.split('\n')[0];
	let title = firstLine.substring(0, 25);

	if (title.length < firstLine.length) {
		title = `${title}…`;
	}

	return title;
}
