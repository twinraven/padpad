import React from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';
import { HuePicker, SaturationPicker } from './ColorPicker.styles';

const ColorPicker = props => {
	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: 20, height: 100, position: 'relative' }}>
				<Hue {...props} pointer={HuePicker} direction={'vertical'} />
			</div>
			<div style={{ width: 200, height: 100, position: 'relative' }}>
				<Saturation {...props} pointer={SaturationPicker} />
			</div>
		</div>
	);
};

export default CustomPicker(ColorPicker);
