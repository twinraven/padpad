import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { URL_UPDATE_DELAY, RESIZE_UPDATE_DELAY } from 'config.js';
import { setUrlParams } from 'utils/url';
import { Wrapper, Text, GhostText } from './Canvas.styles';

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
		this.setHeightDebounced = debounce(this.setHeight, RESIZE_UPDATE_DELAY);

		window.addEventListener('resize', this.setHeightDebounced);
	}

	componentDidMount() {
		this.setHeight();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setHeightDebounced);
	}

	render() {
		const { text, ...props } = this.props;
		const { height } = this.state;

		return (
			<Wrapper>
				<GhostText
					aria-hidden={true}
					innerRef={this.ghostRef}
					value={text}
					readOnly={true}
				/>
				<Text
					{...props}
					style={{ height }}
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
		this.setHeight();
	};

	setHeight = () => {
		if (this.ghostRef.current) {
			this.setState({
				height: this.ghostRef.current.scrollHeight,
			});
		}
	};

	updateUrl = () => {
		const { text } = this.props;

		setUrlParams({ text });
	};
}
