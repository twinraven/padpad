import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Canvas as _Canvas } from 'components/Canvas/Canvas';
import { Modal } from 'components/Modal/Modal';
import { CloseIcon } from 'components/Icons/CloseIcon';
import { SettingsIcon } from 'components/Icons/SettingsIcon';

export const Wrapper = styled.div`
	position: relative;
	text-align: center;
	transition: background 0.1s ease-in-out;
	width: 100%;

	${props =>
		props.bgColor &&
		css`
			background-color: ${props.bgColor};
		`};
`;

Wrapper.propTypes = {
	bgColor: PropTypes.string,
};

export const Canvas = styled(_Canvas)`
	${props =>
		props.fontColor &&
		css`
			color: ${props.fontColor};
		`};

	${props =>
		props.fontSize &&
		css`
			font-size: ${props.fontSize}px;
		`};
`;

Wrapper.propTypes = {
	fontColor: PropTypes.string,
	fontSize: PropTypes.number,
};

export const Controls = styled.div`
	top: 20px;
	display: flex;
	justify-content: space-between;
	position: fixed;
	right: 20px;

	> button {
		margin-left: 5px;
	}
`;

export const SettingsButton = styled.button.attrs({
	type: 'button',
	children: <SettingsIcon width="20" height="20" />,
});

export const CloseButton = styled.button.attrs({
	type: 'button',
	children: <CloseIcon width="20" height="20" />,
});

export const SettingsModal = styled(Modal)`
	position: fixed;
	top: 70px;
	right: 20px;
`;
