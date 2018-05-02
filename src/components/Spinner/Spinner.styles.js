import styled, { keyframes } from 'styled-components';
import { Icon } from 'shared/icons/Icons.styles';

const spin = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

export const Wrapper = styled.div`
	width: 16px;
	height: 16px;
	animation: ${spin} 1s infinite;
	animation-timing-function: linear;
	transform-origin: center;

	${Icon} {
		height: 16px !important;
		width: 16px !important;
	}
`;
