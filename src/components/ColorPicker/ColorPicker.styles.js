import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	position: relative;
`;

export const HueWrapper = styled.div`
	border-radius: 20px;
	height: 100px;
	margin-right: 5px;
	position: relative;
	width: 20px;
`;

export const SaturationWrapper = styled.div`
	height: 100px;
	position: relative;
	width: 200px;
`;

const PICKER_SIZE = 12;

const Picker = styled.span`
	background: white;
	border-radius: ${PICKER_SIZE}px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
	display: block;
	height: ${PICKER_SIZE}px;
	transform: translate(-${PICKER_SIZE / 2}px, -${PICKER_SIZE / 2}px);
	width: ${PICKER_SIZE}px;
`;

export const HuePicker = styled(Picker)`
	transform: translate(4px, -${PICKER_SIZE / 2}px);
`;

export const SaturationPicker = styled(Picker)`
	background: transparent;
	border: 1px solid white;
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
`;
