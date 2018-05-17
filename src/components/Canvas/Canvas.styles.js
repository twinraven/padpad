import styled, { css } from 'styled-components';
import { DEFAULT_FONT_SIZE, transitionEasing } from 'config.js';
import _ContentEditable from 'react-contenteditable';

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	padding: 0 15px;
	width: 100%;
`;

export const ContentEditable = styled(_ContentEditable)`
	background-color: transparent;
	border: none;
	color: inherit;
	font-family: inherit;
	font-size: ${DEFAULT_FONT_SIZE}px;
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

	/* &::-moz-selection {
		background-color: #f5d688;
	}

	&::selection {
		background-color: #f5d688;
	} */
`;

// export const GhostText = styled(Text)`
// 	position: absolute;
// 	top: 0;
// 	visibility: hidden;
// `;
