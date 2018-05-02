import styled from 'styled-components';
import { modalBgColor, modalBorderColor } from 'styles/colours';

export const ModalOverlay = styled.div`
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 100;
`;

export const ModalContent = styled.div`
	background: ${modalBgColor};
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border: 1px solid ${modalBorderColor};
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
`;
