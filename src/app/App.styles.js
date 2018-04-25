import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { SettingsPanel as _SettingsPanel } from '../components/SettingsPanel/SettingsPanel';
import { Canvas as _Canvas } from '../components/Canvas/Canvas';

export const Wrapper = styled.div`
	position: relative;
	text-align: center;
	width: 100%;

	${props =>
		props.bgColor &&
		css`
			background-color: #${props.bgColor};
		`};
`;

export const Canvas = styled(_Canvas)`
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
	position: fixed;
	right: 20px;

	/*> button {
		padding-left: 15px;
	}*/
`;

export const SettingsButton = styled.button`
	background: white;
`;

export const SettingsPanel = styled(_SettingsPanel)`
	bottom: 0;
	left: 0;
	position: fixed;
	right: 0;
`;
