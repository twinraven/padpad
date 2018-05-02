import styled from 'styled-components';

export const Wrapper = styled.div`
	background: white;
	display: flex;
	margin: 10px 5px 0 0;
	position: relative;
	width: 100%;
`;

export const HueWrapper = styled.div`
	height: 100px;
	position: relative;
	width: 25px;

	.hue-vertical {
		margin-right: 5px;
	}
`;

export const SaturationWrapper = styled.div`
	height: 100px;
	flex: 1;
	position: relative;
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
