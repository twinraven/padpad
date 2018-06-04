import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import { URL_UPDATE_DELAY } from 'config.js';
import { AccessibleLabel } from 'styles/mixins';
import { setUrlParams } from 'utils/url';
import { cleanMarkup } from 'utils/parse';
import { Wrapper, ContentEditable, Label } from './Canvas.styles';
import { tryPasteFromClipboard } from 'utils/paste';
import { ConfigConsumer } from 'providers/config';

export class Canvas extends Component {
	state = {
		text: '',
	};

	constructor(props) {
		super(props);

		this.canvasRef = React.createRef();
		this.updateUrlDebounced = debounce(
			params => setUrlParams(params),
			URL_UPDATE_DELAY
		);
	}

	componentDidMount() {
		this.focusCanvas();
	}

	render() {
		return (
			<ConfigConsumer>
				{({ text, fontSize, fontColor, fontStyle, changeConfig }) => (
					<Wrapper
						onClick={this.focusCanvas}
						fontSize={fontSize}
						fontColor={fontColor}
						fontStyle={fontStyle}
					>
						{text || this.state.text.length ? (
							<AccessibleLabel htmlFor="input">Start typing</AccessibleLabel>
						) : (
							<Label htmlFor="input">Type something...</Label>
						)}
						<ContentEditable
							{...this.props}
							id="input"
							innerRef={this.canvasRef}
							onChange={event => this.handleChange(event, changeConfig)}
							onBlur={this.handleBlur}
							onPaste={this.handlePaste}
							tabIndex={0}
							html={text}
							role="textbox"
							spellCheck={true}
							dir="ltr"
							aria-multiline={true}
							aria-label="Note"
						/>
					</Wrapper>
				)}
			</ConfigConsumer>
		);
	}

	handleChange = (event, changeConfig) => {
		const text = { text: event.target.value };

		this.setState(text);
		changeConfig(text);
		this.updateUrlDebounced(text);
	};

	handleBlur = () => setUrlParams({ text: cleanMarkup(this.state.text) });

	handlePaste = event => {
		// fallback behaviour: ctrl+z undo is broken, and the cursor pos is reset
		// wait a tick for the content to be fully inserted
		const fallback = () => setTimeout(this.handleBlur, 0);

		tryPasteFromClipboard(event, fallback);
	};

	focusCanvas = () => {
		if (this.canvasRef && this.canvasRef.current) {
			const canvasNode = ReactDOM.findDOMNode(this.canvasRef.current);
			canvasNode.focus();
		}
	};
}
