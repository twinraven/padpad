import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { media, context } from 'styles/mixins';
import { Canvas as _Canvas } from 'components/Canvas/Canvas';
import { Modal } from 'components/Modal/Modal';

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
	opacity: 0.4;
	position: fixed;
	right: 20px;
	transition: opacity 0.15s;
	z-index: 20;

	> button {
		margin-left: 5px;
		position: relative;
		z-index: 1;
	}

	&::before {
		content: '';
		background: transparent;
		display: block;
		height: 250%;
		left: -50%;
		opacity: 1;
		position: absolute;
		top: -75%;
		width: 200%;
		z-index: 0;
	}

	&:hover {
		opacity: 1;
	}

	${props =>
		props.isActive &&
		css`
			opacity: 1;
		`};

	${media.medium`
		bottom: 20px;
		top: auto;
	`};

	${context.touch`
		opacity: 1;
	`};
`;

Controls.propTypes = {
	isActive: PropTypes.bool.isRequired,
};

export const SettingsModal = styled(Modal)`
	position: fixed;
	top: 75px;
	right: 20px;

	${media.medium`
		bottom: 0;
		left: 0;
		right: 0;
		top: auto;
	`};
`;

export const SharingModal = styled(Modal)`
	position: fixed;
	top: 75px;
	right: 65px;

	${media.medium`
		bottom: 0;
		left: 0;
		right: 0;
		top: auto;
	`};
`;
