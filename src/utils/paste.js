import { stopEvent } from './event';
import { cleanMarkup } from './parse';

export function tryPaste(event, fallback) {
	if (event.clipboardData) {
		stopEvent(event);

		const content = event.clipboardData.getData('text/plain');
		const cleanContent = cleanMarkup(content);
		document.execCommand('insertText', false, cleanContent);
	} else if (window.clipboardData && window.getSelection) {
		stopEvent(event);

		const content = window.clipboardData.getData('Text');

		if (window.getSelection) {
			const cleanContent = cleanMarkup(content);
			window
				.getSelection()
				.getRangeAt(0)
				.insertNode(document.createTextNode(cleanContent));
		}
	} else {
		fallback();
	}
}
