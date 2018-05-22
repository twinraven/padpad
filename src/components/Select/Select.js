import React from 'react';
import { FONT_STYLES } from 'config.js';
import { Wrapper, SelectedValue, SelectInput } from './Select.styles';

export const Select = ({ value, onChange, ...props }) => {
	return (
		<Wrapper>
			<SelectInput value={value} onChange={onChange}>
				{Object.entries(FONT_STYLES).map(([, type]) => (
					<option value={type} key={type}>
						{type}
					</option>
				))}
			</SelectInput>
			<SelectedValue>{value}</SelectedValue>
		</Wrapper>
	);
};
