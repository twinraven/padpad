import styled from 'styled-components';
import { ShareButton as _ShareButton } from './ShareButton/ShareButton';

export const Wrapper = styled.div`
	text-align: center;
	width: 100%;
	height: 100%;
`;

export const ShareButton = styled(_ShareButton)`
	position: absolute;
	right: 20px;
	bottom: 20px;
`;
