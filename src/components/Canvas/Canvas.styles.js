import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	padding: 0 15px;
	width: 100%;
`;

export const Text = styled.textarea`
	background-color: transparent;
	border: none;
	color: inherit;
	font-family: inherit;
	margin: 0;
	max-width: 800px;
	min-height: 100vh;
	padding: 15px 0;
	overflow: hidden;
	resize: none;
	text-align: left;
	width: 100%;

	&:focus {
		outline: none;
	}
`;

export const GhostText = styled(Text)`
	position: absolute;
	top: 0;
	visibility: hidden;
`;
