import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import {
	DEFAULT_FONT_SIZE,
	transitionEasing,
	FONT_STYLES_MAP,
} from 'config.js';
import _ContentEditable from 'react-contenteditable';

export const Wrapper = styled.div`
	display: flex;
	font-size: ${DEFAULT_FONT_SIZE}px;
	justify-content: center;
	padding: 0 15px;
	width: 100%;

	${props =>
		props.fontSize &&
		css`
			font-size: ${props.fontSize}px;
		`};

	${props =>
		props.fontColor &&
		css`
			color: ${props.fontColor};
		`};

	${props =>
		props.fontStyle &&
		css`
			font-family: ${FONT_STYLES_MAP[props.fontStyle]};
		`};
`;

Wrapper.propTypes = {
	fontSize: PropTypes.string,
	fontColor: PropTypes.string,
	fontStyle: PropTypes.string,
};

export const ContentEditable = styled(_ContentEditable)`
	background-color: transparent;
	border: none;
	color: inherit;
	font-family: inherit;
	line-height: 1.3;
	margin: 0;
	max-width: 800px;
	min-height: 100vh;
	overflow: hidden;
	padding: 30px 0;
	resize: none;
	text-align: left;
	transition: font 0.15s ${transitionEasing}, color 0.15s ${transitionEasing};
	white-space: pre-wrap;
	width: 100%;
	word-wrap: break-word;

	&:focus {
		outline: none;
	}

	* {
		font-size: inherit !important;
	}

	/* &::-moz-selection {
		background-color: #f5d688;
	}

	&::selection {
		background-color: #f5d688;
	} */
`;

export const Label = styled.label`
	left: 50%;
	max-width: 830px;
	opacity: 0.3;
	padding: 28px 15px;
	pointer-events: none;
	position: absolute;
	text-align: left;
	top: 0;
	transform: translateX(-50%);
	width: 100%;
	z-index: 10;
`;
