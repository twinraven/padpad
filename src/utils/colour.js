export function getAutoTextColor(hex = '#fff') {
	let color = hex.replace('#', '');

	if (color.length === 3) {
		color = color
			.split('')
			.map(char => char + char)
			.join('');
	}
	return `0x${color}` > 0xffffff * 0.75 ? '#333' : '#fff';
}
