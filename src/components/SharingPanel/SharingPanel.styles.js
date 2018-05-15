import styled from 'styled-components';
import { opacify } from 'polished';
import { media } from 'styles/mixins';
import { Icon } from 'shared/icons/Icons.styles';
import { highlightColor, successColor } from 'styles/colours';

export const Wrapper = styled.div`
	${media.medium`
		font-size: 15px;
		padding-bottom: 70px;
	`};
`;

export const Title = styled.h2`
	font-size: 18px;
	text-align: left;
	margin: 5px 0 10px;
`;

export const Row = styled.div`
	display: flex;

	${media.medium`
		flex-direction: column;
	`};
`;

export const Input = styled.input`
	border: 1px solid #ccc;
	border-right-width: 0;
	border-radius: 2px 0 0 2px;
	line-height: 2;
	padding: 0 10px;
	flex: 1;
	font-size: 13px;

	&:focus {
		outline: none;
		border-color: ${highlightColor};
		box-shadow: 0 0 3px ${opacify(0.5, highlightColor)};
	}

	${media.medium`
		border-right-width: 1px;
		font-size: 16px;
		line-height: 2.5;
		margin-bottom: 10px;
	`};
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
	line-height: 2;
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

	${media.medium`
		border-radius: 4px;
		font-size: 15px;
		line-height: 2.5;
	`};
`;

export const Message = styled.p`
	background-color: ${successColor};
	font-size: 12px;
	margin: 5px 0 0;
	padding: 3px 7px;
`;
