import styled from 'styled-components';
import React from 'react';
import { CloseIcon } from 'components/Icons/CloseIcon';

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
	background: #f1f1f1;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(0, 0, 0, 0.1);
	font-size: 16px;
	font-weight: 200;
	max-width: 350px;
	padding: 10px 15px 15px;
	position: fixed;
	text-align: center;
`;

export const ModalClose = styled.button.attrs({
	type: 'button',
	children: <CloseIcon width={20} height={20} />,
})`
	background-color: transparent;
	border: 0;
	opacity: 0.4;
	padding: 0;
	position: absolute;
	right: 15px;
	top: 15px;
`;
