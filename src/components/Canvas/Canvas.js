import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { URL_UPDATE_DELAY } from 'config.js';
import { AccessibleLabel } from 'styles/mixins';
import { setUrlParams } from 'utils/url';
import { cleanMarkup } from 'utils/parse';
import { Wrapper, ContentEditable, Label } from './Canvas.styles';
import { ConfigConsumer } from 'providers/ConfigProvider/ConfigProvider';

export class Canvas extends Component {
	static propTypes = {
		text: PropTypes.string.isRequired,
		changeText: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.canvasRef = React.createRef();
		this.updateUrlDebounced = debounce(this.updateUrl, URL_UPDATE_DELAY);
	}

	componentDidMount() {
		this.focusCanvas();
	}

	render() {
		const { text, changeText, ...props } = this.props;

		return (
			<ConfigConsumer>
				{config => (
					<Wrapper onClick={this.focusCanvas} {...config}>
						{Boolean(text.length) ? (
							<AccessibleLabel htmlFor="input">Start typing</AccessibleLabel>
						) : (
							<Label htmlFor="input">Type something...</Label>
						)}
						<ContentEditable
							{...props}
							id="input"
							innerRef={this.canvasRef}
							onInput={this.handleUpdate}
							onChange={this.handleUpdate}
							onKeyUp={this.updateUrlDebounced}
							onBlur={this.fixText}
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

	handleUpdate = event => this.props.changeText(event.target.value);

	// on next tick, reformat all the text
	handlePaste = () => setTimeout(this.fixText, 0);

	updateUrl = () => setUrlParams({ text: this.props.text });

	fixText = () => this.props.changeText(cleanMarkup(this.props.text));

	focusCanvas = () => {
		if (this.canvasRef && this.canvasRef.current) {
			const canvasNode = ReactDOM.findDOMNode(this.canvasRef.current);
			canvasNode.focus();
		}
	};
}
