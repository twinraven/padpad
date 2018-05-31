import { stopEvent } from './event';
import { cleanMarkup } from './parse';

// manual handling of paste event to ensure only cleaned text is inserted
export function tryPasteFromClipboard(event, fallback) {
	if (event.clipboardData) {
		stopEvent(event);

		const htmlContent = event.clipboardData.getData('text/html');
		const textContent = event.clipboardData.getData('text/plain');
		const cleanContent = cleanMarkup(htmlContent || textContent);
		document.execCommand('insertHTML', false, cleanContent);
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
