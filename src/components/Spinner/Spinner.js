import React from 'react';
import { Wrapper } from './Spinner.styles';
import { SpinnerIcon } from 'shared/icons';

export function Spinner(props) {
	return (
		<Wrapper>
			<SpinnerIcon width="30" height="30" />
		</Wrapper>
	);
}
