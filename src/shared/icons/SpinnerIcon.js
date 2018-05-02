import React from 'react';
import { Icon } from './Icons.styles';

export const SpinnerIcon = props => (
	<Icon viewBox="0 0 20 20" {...props}>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M10.263.003v2.224a7.778 7.778 0 1 0 6.54 4l1.85-1.244A9.954 9.954 0 0 1 20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0c.088 0 .176.001.263.003z"
		/>
	</Icon>
);
