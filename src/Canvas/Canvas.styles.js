import styled from 'styled-components';

export const Wrapper = styled.div`
	display: block;
	height: 100%;
	margin: 0 auto;
	max-width: 80%;
	padding: 20px;
	width: 100%;
`;

export const Text = styled.textarea`
	background-color: transparent;
	border: none;
	font-family: inherit;
	height: 100%;
	margin: 0 auto;
	max-width: 800px;
	resize: none;
	text-align: left;
	width: 100%;

	&:focus {
		outline: none;
	}
`;
