import { css } from 'styled-components';

const sizes = {
	vlarge: 1200,
	large: 990,
	medium: 768,
	small: 480,
	micro: 380,
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
	// use em in breakpoints to work properly cross-browser and support users
	// changing their browsers font-size: https://zellwk.com/blog/media-query-units/
	const emSize = sizes[label] / 16;
	accumulator[label] = (...args) => css`
		@media (max-width: ${emSize}em) {
			${css(...args)};
		}
	`;
	return accumulator;
}, {});

export const context = {
	touch: (...args) => css`
		@media (hover: none) {
			${css(...args)};
		}
	`,
};
