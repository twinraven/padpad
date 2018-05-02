import styled from 'styled-components';
import { DEFAULT_FONT_SIZE } from 'config.js';

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	padding: 0 15px;
	width: 100%;
`;

export const Text = styled.textarea`
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
	transition: font 0.1s linear, color 0.1s ease-in-out;
	width: 100%;

	&:focus {
		outline: none;
	}

	/* &::-moz-selection {
		background-color: #f5d688;
	}

	&::selection {
		background-color: #f5d688;
	} */
`;

export const GhostText = styled(Text)`
	position: absolute;
	top: 0;
	visibility: hidden;
`;
