import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { URL_UPDATE_DELAY } from 'config';
import { setUrlParams } from 'utils/url';
import { Wrapper, Text, Ghost } from './Canvas.styles';

const DEFAULT_HEIGHT = 100;

export class Canvas extends Component {
	static propTypes = {
		text: PropTypes.string,
		changeText: PropTypes.func.isRequired,
	};

	state = {
		height: DEFAULT_HEIGHT,
	};

	constructor(props) {
		super(props);

		this.ghostRef = React.createRef();

		this.updateUrlDebounced = debounce(this.updateUrl, URL_UPDATE_DELAY);
	}

	componentDidMount() {
		this.mounted = true;

		this.setFilledTextareaHeight();
	}

	setFilledTextareaHeight() {
		if (this.mounted) {
			this.setState({
				height: this.ghostRef.current.scrollHeight,
			});
		}
	}

	render() {
		const { text } = this.props;
		const { height } = this.state;

		const isOneLine = height <= DEFAULT_HEIGHT;

		return (
			<Wrapper>
				<Ghost
					aria-hidden={true}
					innerRef={this.ghostRef}
					value={text}
					readOnly={true}
				/>
				<Text
					style={{ height, resize: isOneLine ? 'none' : null }}
					onChange={this.handleTextChange}
					onKeyUp={this.handleKeyUp}
					autoFocus={true}
					value={text}
					placeholder="Type something…"
				/>
			</Wrapper>
		);
	}

	handleTextChange = event => this.props.changeText(event.target.value);

	handleKeyUp = () => {
		this.updateUrlDebounced();
		this.setFilledTextareaHeight();
	};

	updateUrl = () => {
		const { text } = this.props;

		setUrlParams({ text });
	};
}
