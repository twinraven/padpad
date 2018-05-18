import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { URL_UPDATE_DELAY } from 'config.js';
import { AccessibleLabel } from 'styles/mixins';
import { setUrlParams } from 'utils/url';
import { cleanMarkup } from 'utils/parse';
import { Wrapper, ContentEditable, Label } from './Canvas.styles';

export class Canvas extends Component {
	static propTypes = {
		text: PropTypes.string,
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
			<Wrapper onClick={this.focusCanvas}>
				{Boolean(text.length) ? (
					<AccessibleLabel htmlFor="input">Start typing</AccessibleLabel>
				) : (
					<Label>Type something...</Label>
				)}
				<ContentEditable
					id="input"
					innerRef={this.canvasRef}
					{...props}
					onChange={event => this.props.changeText(event.target.value)}
					onKeyUp={this.updateUrlDebounced}
					onBlur={this.cleanMarkup}
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

	updateUrl = () => setUrlParams({ text: this.props.text });

	cleanMarkup = () => this.props.changeText(cleanMarkup(this.props.text));

	focusCanvas = () => {
		if (this.canvasRef && this.canvasRef.current) {
			const canvasNode = ReactDOM.findDOMNode(this.canvasRef.current);
			canvasNode.focus();
		}
	};
}
