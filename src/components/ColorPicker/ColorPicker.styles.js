import styled from 'styled-components';

const PICKER_SIZE = 12;

const Picker = styled.span`
	background: white;
	border-radius: ${PICKER_SIZE}px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
	display: block;
	height: ${PICKER_SIZE}px;
	width: ${PICKER_SIZE}px;
`;

export const HuePicker = styled(Picker)`
	transform: translateX(4px);
`;

export const SaturationPicker = styled(Picker)`
	background: transparent;
	border: 1px solid white;
	box-shadow: none;
`;
