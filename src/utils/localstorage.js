export function storeText(value) {
	window.localStorage.setItem('tb-pad-text', value);
}

export function retrieveText() {
	return window.localStorage.getItem('tb-pad-text');
}
