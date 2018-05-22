import React from 'react';
import { FONT_STYLES } from 'config.js';
import { Wrapper, SelectedValue, SelectField } from './Select.styles';

export const Select = ({ value, onChange, ...props }) => {
	return (
		<Wrapper>
			<SelectField value={value} onChange={onChange}>
				{Object.entries(FONT_STYLES).map(([, type]) => (
					<option value={type} key={type}>
						{type}
					</option>
				))}
			</SelectField>
			<SelectedValue aria-hidden="true">{value}</SelectedValue>
		</Wrapper>
	);
};
