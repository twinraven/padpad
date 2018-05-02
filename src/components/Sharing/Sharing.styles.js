import styled from 'styled-components';
import { opacify } from 'polished';
import { Icon } from 'shared/icons/Icons.styles';
import { highlightColor, successColor } from 'styles/colours';

export const Title = styled.h2`
	font-size: 18px;
	text-align: left;
	margin: 5px 0 10px;
`;

export const Input = styled.input`
	border: 1px solid #ccc;
	border-right-width: 0;
	border-radius: 2px 0 0 2px;
	line-height: 25px;
	padding: 0 10px;
	flex: 1;
	font-size: 13px;

	&:focus {
		outline: none;
		border-color: ${highlightColor};
		box-shadow: 0 0 3px ${opacify(0.5, highlightColor)};
	}
`;

export const CopyButton = styled.button.attrs({
	type: 'button',
})`
	align-items: center;
	appearance: none;
	background: #333;
	border: 1px solid #333;
	border-radius: 0 2px 2px 0;
	color: white;
	cursor: pointer;
	display: flex;
	font-size: 13px;
	justify-content: center;
	line-height: 25px;
	outline: none;
	padding: 0 10px;
	transition: background-color 0.1s;

	${Icon} {
		margin-right: 7px;
	}

	&:hover,
	&:focus {
		background: #555;
	}
`;

export const Message = styled.p`
	background-color: ${successColor};
	font-size: 12px;
	margin: 5px 0 0;
	padding: 3px 7px;
`;
