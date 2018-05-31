export function stopEvent(event) {
	if (event) {
		event.stopPropagation();
		event.preventDefault();
	}
}
