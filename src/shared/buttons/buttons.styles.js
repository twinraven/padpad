import styled, { css } from 'styled-components';
import { opacify } from 'polished';
import { media } from 'styles/mixins';
import { highlightColor, buttonColor, buttonHoverColor } from 'styles/colours';

export const RoundButton = styled.button.attrs({
	type: 'button',
})`
	align-items: center;
	appearance: none;
	background: ${buttonColor};
	border: none;
	border-radius: 40px;
	color: #888;
	cursor: pointer;
	display: flex;
	height: 40px;
	justify-content: center;
	overflow: hidden;
	transition: background-color 0.1s, color 0.1s;
	width: 40px;

	-webkit-tap-highlight-color: transparent;

	&:hover {
		background: ${buttonHoverColor};
		color: white;
	}

	&:focus {
		outline: none;
	}

	${props =>
		props.isSelected &&
		css`
			background: ${opacify(0.9, highlightColor)};
			color: white;
			z-index: 20;

			&:hover {
				background: ${opacify(0.2, highlightColor)};
			}
		`};

	${media.medium`
		border-radius: 46px;
		height: 46px;
		width: 46px;
	`};
`;
