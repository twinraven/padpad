import { injectGlobal } from 'styled-components';
import { normalize } from 'polished';

export default function() {
	return injectGlobal`
		${normalize()};

		/*@font-face {
			font-family: 'Univers';
			src: url() format('woff');
			font-weight: 200;
			font-style: normal;
		}

		@font-face {
			font-family: 'Univers';
			src: url() format('woff');
			font-weight: normal;
			font-style: normal;
		}

		@font-face {
			font-family: 'Univers';
			src: url() format('woff');
			font-weight: bold;
			font-style: normal;
		}*/

		*,
		*:before,
		*:after {
			box-sizing: border-box;
		}

		html {
			-ms-overflow-style: -ms-autohiding-scrollbar;
		}
		
		html,
		body, 
		#root {
			width: 100%;
			height: 100%;
		}

		body {
			overflow: hidden;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
				Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			font-size: 12px;
			font-weight: normal;
			line-height: 1.5;
			-webkit-font-smoothing: antialiased;
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
