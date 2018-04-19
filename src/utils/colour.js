export function getAutoTextColor(hex = 'fff') {
	let color = hex;

	if (color.length === 3) {
		color = color
			.split('')
			.map(char => char + char)
			.join('');
	}
	return `0x${color}` > 0xffffff / 2 ? '333' : 'fff';
}
