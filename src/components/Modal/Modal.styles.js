import styled from 'styled-components';
import { media } from 'styles/mixins';
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
	z-index: 10;
`;

export const enterTransitionMs = 250;
export const exitTransitionMs = 180;

const transitions = {
	bigScreens: {
		entering: { opacity: 0, transform: 'scale(0.85, 0.85)' },
		entered: { opacity: 1, transform: 'scale(1, 1)' },
		exiting: {
			opacity: 0,
			transform: 'scale(0.9, 0.9)',
			transitionDuration: exitTransitionMs,
		},
		exited: { opacity: 0 },
	},
	smallScreens: {
		entering: { opacity: 0, transform: 'translateY(10%)' },
		entered: { opacity: 1, transform: 'translateY(0)' },
		exiting: {
			opacity: 0,
			transform: 'translateY(10%)',
			transitionDuration: exitTransitionMs,
		},
		exited: { opacity: 0 },
	},
};

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
	transition: opacity ${enterTransitionMs}ms, transform ${enterTransitionMs}ms;
	transition-timing-function: cubic-bezier(0.66, 0.075, 0.195, 0.98);
	transform-origin: 90% top;

	${props =>
		props.transitionState && {
			...transitions.bigScreens[props.transitionState],
		}};

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
		box-shadow: 0 -2px 25px rgba(0, 0, 0, 0.15);
		max-width: none;
		transform-origin: right bottom;
		width: 350px;

		&::before,
		&::after {
			display: none;
		}
	`};

	${media.small`
		width: 100%;
		transform-origin: center bottom;

		${props =>
			props.transitionState && {
				...transitions.smallScreens[props.transitionState],
			}};
	`};
`;
