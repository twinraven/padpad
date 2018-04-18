import styled from 'styled-components';
import { SettingsPanel as _SettingsPanel } from './SettingsPanel/SettingsPanel';

export const Wrapper = styled.div`
	text-align: center;
	width: 100%;
	height: 100%;
`;

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
