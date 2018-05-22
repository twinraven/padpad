import styled from 'styled-components';
import { darken } from 'polished';
import { highlightColor } from 'styles/colours';

export const Wrapper = styled.div`
	position: relative;
`;

export const SelectedValue = styled.span`
	border-bottom: 1px dotted ${darken(0.3, highlightColor)};
	display: block;
	line-height: 1.7;
	padding: 0 2px;
	color: ${darken(0.3, highlightColor)};
	cursor: pointer;
`;

export const SelectInput = styled.select`
	appearance: none;
	background: transparent;
	border: none;
	bottom: 0;
	cursor: pointer;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.7;
	opacity: 0;
	position: absolute;
	right: 0;
	text-align: right;
	top: 0;
	z-index: 1;

	&:hover {
		& + ${SelectedValue} {
			border-bottom-color: transparent;
		}
	}

	&:focus {
		& + ${SelectedValue} {
			color: ${darken(0.1, highlightColor)};
			border-bottom-color: ${darken(0.1, highlightColor)};
		}
	}
`;
