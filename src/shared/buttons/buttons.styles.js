import styled, { css } from 'styled-components';
import { lovelyBlueColor } from 'styles/colours';

export const RoundButton = styled.button.attrs({
	type: 'button',
})`
	align-items: center;
	appearance: none;
	background: #9c9c9c;
	border: none;
	border-radius: 40px;
	color: white;
	display: flex;
	height: 40px;
	justify-content: center;
	overflow: hidden;
	width: 40px;

	&:hover {
		background: #777;
	}

	&:focus {
		outline: none;
	}

	${props =>
		props.isSelected &&
		css`
			background: ${lovelyBlueColor};

			&:hover {
				background: darken(${lovelyBlueColor}, 0.1);
			}
		`};
`;
