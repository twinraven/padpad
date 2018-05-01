import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	min-height: 50px;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Row = styled.div`
	align-items: center;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	min-height: 50px;
`;

export const CloseButton = styled.div.attrs({
	children: 'x', // <MoreVerticalIcon width={2} height={12} />
})`
	position: absolute;
	right: 10px;
	top: 10px;
	z-index: 1;
`;

export const Link = styled.a`
	color: blue;
	text-decoration: underline;
	text-decoration-style: dotted;
`;

export const Swatch = styled.div`
	${props =>
		props.color &&
		css`
			background-color: ${props.color};
		`};
	width: 50px;
	height: 30px;
	border-radius: 2px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
`;

export const CloseColorButton = styled.button`
	//
`;
