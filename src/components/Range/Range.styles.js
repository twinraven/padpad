import styled from 'styled-components';
import { highlightColor } from 'styles/colours';

export const Range = styled.input.attrs({
	type: 'range',
})`
	appearance: none;
	-webkit-appearance: none;
	background: transparent;
	max-width: 50%;
	margin: 4px 0;
	transition: all 0.1s;
	width: 100%;

	&:focus {
		outline: none;
	}

	&::-webkit-slider-runnable-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: #969696;
		border-radius: 10px;
		border: 0px solid #010101;
	}

	&::-webkit-slider-thumb {
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
		border: none;
		height: 15px;
		width: 15px;
		border-radius: 2px;
		background: #fff;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -5px;
	}

	&:focus::-webkit-slider-runnable-track {
		background: ${highlightColor};
	}

	&::-moz-range-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: #969696;
		border-radius: 10px;
		border: 0px solid #010101;
	}

	&::-moz-range-thumb {
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
		border: none;
		height: 15px;
		width: 15px;
		border-radius: 2px;
		background: #fff;
		cursor: pointer;
	}

	&::-ms-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}

	&::-ms-fill-lower {
		background: #7a7a7a;
		border: 0px solid #010101;
		border-radius: 20px;
	}

	&::-ms-fill-upper {
		background: #969696;
		border: 0px solid #010101;
		border-radius: 20px;
	}

	&::-ms-thumb {
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5),
			0px 0px 1px rgba(13, 13, 13, 0.5);
		border: none;
		height: 15px;
		width: 15px;
		border-radius: 2px;
		background: #fff;
		cursor: pointer;
		height: 4px;
	}

	&:focus::-ms-fill-lower {
		background: #969696;
	}

	&:focus::-ms-fill-upper {
		background: ${highlightColor};
	}
`;
