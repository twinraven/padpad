import styled from 'styled-components';
import PropTypes from 'prop-types';

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
	width: 8px;

	.hue-vertical {
		margin-right: 5px;
	}
`;

export const SaturationWrapper = styled.div`
	height: 100px;
	flex: 1;
	position: relative;
`;

const PICKER_SIZE = 9;

const Picker = styled.span`
	background: ${props => props.color};
	border: 2px solid white;
	border-radius: ${PICKER_SIZE}px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
	display: block;
	height: ${PICKER_SIZE}px;
	transform: translate(-${PICKER_SIZE / 2}px, -${PICKER_SIZE / 2}px);
	width: ${PICKER_SIZE}px;
`;

Picker.propTypes = {
	color: PropTypes.string,
};

Picker.defaultProps = {
	color: 'white',
};

export const HuePicker = styled(Picker)`
	background: white;
	transform: translate(-2.5px, -${PICKER_SIZE / 2}px);
`;

export const SaturationPicker = styled(Picker)`
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
`;
