import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { SettingsPanel as _SettingsPanel } from '../components/SettingsPanel/SettingsPanel';

export const Wrapper = styled.div`
	text-align: center;
	width: 100%;
	height: 100%;

	${props =>
		props.bgColor &&
		css`
			background-color: #${props.bgColor};
		`};
	
	${props =>
		props.textColor &&
		css`
			color: #${props.textColor};
		`};
`;

Wrapper.propTypes = {
	bgColor: PropTypes.string,
	textColor: PropTypes.string,
};

export const Controls = styled.div`
	bottom: 20px;
	display: flex;
	justify-content: space-between;
	position: absolute;
	right: 20px;

	> button {
		padding-left: 15px;
	}
`;

export const SettingsButton = styled.button`
	background: red;
`;

export const SettingsPanel = styled(_SettingsPanel)`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
`;
