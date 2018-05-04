import styled from 'styled-components';
import { media } from 'styles/mixins';
import { modalBgColor, modalBorderColor } from 'styles/colours';
import { MIN_MODAL_WIDTH } from 'config.js';

export const ModalOverlay = styled.div`
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 2;
`;

export const ModalContent = styled.div`
	background: ${modalBgColor};
	border: 1px solid ${modalBorderColor};
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	font-size: 16px;
	font-weight: 200;
	max-width: 350px;
	padding: 10px 12px 12px;
	position: fixed;
	text-align: center;

	&::before,
	&::after {
		border-width: 0 7px 12px;
		border-color: ${modalBgColor} transparent;
		border-style: solid;
		content: '';
		display: block;
		height: 0;
		position: absolute;
		right: 12px;
		top: -10px;
		width: 0;
		z-index: 2;
	}

	&::after {
		border-color: ${modalBorderColor} transparent;
		top: -12px;
		z-index: 1;
	}

	${media.medium`
		border: none;
		border-radius: 0;
		box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.25);
		max-height: 70vh;
		max-width: 500px;
		min-width: ${MIN_MODAL_WIDTH}px;
		overflow: auto;
		padding: 10px 15px;

		&::before,
		&::after {
			display: none;
		}
	`};

	${media.small`
	min-width: 0px;
	`};
`;
