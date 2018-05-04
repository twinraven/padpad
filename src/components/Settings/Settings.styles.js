import React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'styles/mixins';
import { CloseIcon, DownArrowIcon } from 'shared/icons';
import { Icon } from 'shared/icons/Icons.styles';

const ROW_HEIGHT = 25;

export const Wrapper = styled.div`
	font-size: 13px;
	min-height: 50px;
	z-index: 2;

	${media.medium`
		font-size: 15px;
		padding-bottom: 60px;
	`};
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Row = styled.div`
	align-items: center;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: center;
	padding: 10px 0;

	&:first-child {
		padding-top: 5px;
	}

	&:last-child {
		border-bottom: 0;
		padding-bottom: 0;
		min-height: 0;
	}
`;

export const Range = styled.input.attrs({
	type: 'range',
})`
	appearance: none;
	-webkit-appearance: none;
	background: transparent;
	max-width: 50%;
	margin: 5px 0;
	transition: all 0.1s;
	width: 100%;

	&:focus {
		outline: none;
	}

	&::-webkit-slider-runnable-track {
		width: 100%;
		height: 5px;
		cursor: pointer;
		background: #969696;
		border-radius: 10px;
		border: 0px solid #010101;
	}

	&::-webkit-slider-thumb {
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5),
			0px 0px 1px rgba(13, 13, 13, 0.5);
		border: none;
		height: 15px;
		width: 15px;
		border-radius: 29px;
		background: #fff;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -5px;
	}

	&:focus::-webkit-slider-runnable-track {
		background: #b2b2b2;
	}

	&::-moz-range-track {
		width: 100%;
		height: 5px;
		cursor: pointer;
		background: #969696;
		border-radius: 10px;
		border: 0px solid #010101;
	}

	&::-moz-range-thumb {
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5),
			0px 0px 1px rgba(13, 13, 13, 0.5);
		border: none;
		height: 15px;
		width: 15px;
		border-radius: 29px;
		background: #fff;
		cursor: pointer;
	}

	&::-ms-track {
		width: 100%;
		height: 5px;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}

	&::-ms-fill-lower {
		background: #7a7a7a;
		border: 0px solid #010101;
		border-radius: 20px;
	}

	&::-ms-fill-upper {
		background: #969696;
		border: 0px solid #010101;
		border-radius: 20px;
	}

	&::-ms-thumb {
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5),
			0px 0px 1px rgba(13, 13, 13, 0.5);
		border: none;
		height: 15px;
		width: 15px;
		border-radius: 29px;
		background: #fff;
		cursor: pointer;
		height: 5px;
	}

	&:focus::-ms-fill-lower {
		background: #969696;
	}

	&:focus::-ms-fill-upper {
		background: #b2b2b2;
	}
`;

export const Label = styled.div`
	display: flex;
	justify-content: space-between;
	line-height: ${ROW_HEIGHT}px;
	min-height: ${ROW_HEIGHT}px;
`;

export const Footer = styled.div`
	background: #f6f6f6;
	display: flex;
	font-size: 0.85em;
	justify-content: space-between;
	padding: 4px 2px 2px 7px;
	margin-bottom: -10px;

	${media.medium`
		font-size: 1em;
		padding: 8px 4px;
	`};
`;

export const Link = styled.a`
	color: blue;
	cursor: pointer;
	text-decoration: underline;
`;

export const ResetLink = styled(Link)`
	font-size: 0.85em;
	margin-left: auto;

	${media.medium`
		font-size: 1em;
	`};
`;

export const Swatch = styled.div.attrs({
	children: <DownArrowIcon width="15" height="10" />,
})`
	align-items: center;
	border-radius: 2px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	${props =>
		props.color &&
		css`
			background-color: ${props.color};
		`};
	display: flex;
	height: ${ROW_HEIGHT}px;
	justify-content: center;
	width: ${ROW_HEIGHT * 1.5}px;

	${Icon} {
		color: rgba(180, 180, 180, 0.5);
	}
`;

export const CloseColorButton = styled.button.attrs({
	type: 'button',
	children: <CloseIcon width="12" height="12" />,
})`
	appearance: none;
	background: transparent;
	border: none;
	color: rgba(0, 0, 0, 0.4);
	margin-left: auto;
	outline: none;

	&:hover,
	&:focus {
		color: rgba(0, 0, 0, 0.6);
	}
`;
