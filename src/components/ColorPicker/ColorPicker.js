import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';
import {
	Wrapper,
	HueWrapper,
	HuePicker,
	SaturationWrapper,
	SaturationPicker,
} from './ColorPicker.styles';

const _ColorPicker = props => {
	return (
		<Wrapper>
			<HueWrapper>
				<Hue {...props} pointer={HuePicker} direction={'vertical'} />
			</HueWrapper>
			<SaturationWrapper>
				<Saturation {...props} pointer={SaturationPicker} />
			</SaturationWrapper>
		</Wrapper>
	);
};

_ColorPicker.propTypes = {
	color: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export const ColorPicker = CustomPicker(_ColorPicker);
