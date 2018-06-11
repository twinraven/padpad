import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { URL_UPDATE_DELAY } from 'config.js';
import { AccessibleLabel } from 'styles/mixins';
import { setUrlParams } from 'utils/url';
import { cleanMarkup } from 'utils/parse';
import { Wrapper, ContentEditable, Label } from './Canvas.styles';
import { tryPasteFromClipboard } from 'utils/paste';

export class Canvas extends Component {
	static propTypes = {
		fontColor: PropTypes.string.isRequired,
		fontSize: PropTypes.string.isRequired,
		fontStyle: PropTypes.string.isRequired,
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
		const {
			text,
			changeText,
			fontSize,
			fontColor,
			fontStyle,
			...props
		} = this.props;

		return (
			<Wrapper
				onClick={this.focusCanvas}
				fontSize={fontSize}
				fontColor={fontColor}
				fontStyle={fontStyle}
			>
				{Boolean(text.length) ? (
					<AccessibleLabel htmlFor="input">Start typing</AccessibleLabel>
				) : (
					<Label htmlFor="input">Type something...</Label>
				)}
				<ContentEditable
					{...props}
					id="input"
					innerRef={this.canvasRef}
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
		);
	}

	handleUpdate = event => this.props.changeText(event.target.value);

	handlePaste = event => {
		// fallback behaviour: ctrl+z undo is broken, and the cursor pos is reset
		// wait a tick for the content to be fully inserted
		const fallback = () => setTimeout(this.fixText, 0);

		tryPasteFromClipboard(event, fallback);
	};

	updateUrl = () => setUrlParams({ text: this.props.text });

	fixText = () => this.props.changeText(cleanMarkup(this.props.text));

	focusCanvas = () => {
		if (this.canvasRef && this.canvasRef.current) {
			const canvasNode = ReactDOM.findDOMNode(this.canvasRef.current);
			canvasNode.focus();
		}
	};
}
