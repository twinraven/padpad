import styled from 'styled-components';

export const Wrapper = styled.div`
	background: white;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	min-height: 50px;
	padding: 20px;
	position: relative;
`;

export const Content = styled.div`
	display: block;
`;

export const CloseButton = styled.div.attrs({
	children: 'x', // <MoreVerticalIcon width={2} height={12} />
})`
	position: absolute;
	right: 10px;
	top: 10px;
	z-index: 1;
`;
