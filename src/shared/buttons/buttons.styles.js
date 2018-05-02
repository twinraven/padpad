import styled, { css } from 'styled-components';
import { opacify } from 'polished';
import { highlightColor, buttonColor, buttonHoverColor } from 'styles/colours';

export const RoundButton = styled.button.attrs({
	type: 'button',
})`
	align-items: center;
	appearance: none;
	background: ${buttonColor};
	border: none;
	border-radius: 40px;
	color: white;
	display: flex;
	height: 40px;
	justify-content: center;
	overflow: hidden;
	transition: background 0.1s;
	width: 40px;

	&:hover {
		background: ${buttonHoverColor};
	}

	&:focus {
		outline: none;
	}

	${props =>
		props.isSelected &&
		css`
			background: ${opacify(0.9, highlightColor)};

			&:hover {
				background: ${opacify(0.2, highlightColor)};
			}
		`};
`;
