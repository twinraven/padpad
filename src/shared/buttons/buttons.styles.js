import styled, { css } from 'styled-components';
import { opacify } from 'polished';
import { media } from 'styles/mixins';
import { highlightColor } from 'styles/colours';

export const RoundButton = styled.button.attrs({
	type: 'button',
})`
	align-items: center;
	appearance: none;
	background: rgba(0, 0, 0, 0.2);
	border: 1px solid rgba(255, 255, 255, 0.7);
	border-radius: 40px;
	color: white;
	cursor: pointer;
	display: flex;
	height: 40px;
	justify-content: center;
	overflow: hidden;
	transition: 0.1s;
	width: 40px;

	-webkit-tap-highlight-color: transparent;

	&:hover,
	&:focus {
		background: rgba(0, 0, 0, 0.4);
		border-color: white;
		outline: none;
		color: white;
	}

	${props =>
		props.isSelected &&
		css`
			background: ${opacify(0.9, highlightColor)};
			color: white;
			z-index: 20;

			&:hover,
			&:focus {
				background: ${opacify(0.2, highlightColor)};
			}
		`};

	${media.medium`
		border-radius: 46px;
		height: 46px;
		width: 46px;
	`};
`;
