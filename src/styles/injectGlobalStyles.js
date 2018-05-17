import { injectGlobal } from 'styled-components';
import { normalize } from 'polished';
import { systemFontStack } from 'config.js';

export default function() {
	return injectGlobal`
		${normalize()};
		*,
		*:before,
		*:after {
			box-sizing: border-box;
		}

		html {
			-ms-overflow-style: -ms-autohiding-scrollbar;
		}

		body {
			font-family: ${systemFontStack};
			font-size: 12px;
			font-weight: normal;
			line-height: 1.5;
			-webkit-font-smoothing: antialiased;
			transition: background 0.15s cubic-bezier(0.745, 0.19, 0.3, 0.955);
		}

		a {
			color: inherit;
			text-decoration: none;
		}

		h1, h2, h3, h4, h5, h6 {
			margin: 0;
			font-weight: inherit;
		}

		p {
			margin: 0;
		}

		table {
			border-collapse: collapse;
		}

		button {
			font-family: inherit;
			line-height: normal;
			border-radius: 0;
		}

		small {
			font-size: 0.7em;
		}

		input {
			font-family: inherit;
		}
	`;
}
