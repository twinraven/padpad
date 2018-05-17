import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import {
	MIN_CANVAS_HEIGHT,
	URL_UPDATE_DELAY,
	RESIZE_UPDATE_DELAY,
} from 'config.js';
import { AccessibleLabel } from 'styles/mixins';
import { setUrlParams } from 'utils/url';
import { Wrapper, Text, GhostText } from './Canvas.styles';

export class Canvas extends Component {
	static propTypes = {
		text: PropTypes.string,
		changeText: PropTypes.func.isRequired,
	};

	state = {
		height: MIN_CANVAS_HEIGHT,
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

	componentDidUpdate(prevProps) {
		// needed to ensure that height updates get pushed through.
		// componentDidUpdate has a race condition with scrollHeight being updated
		if (this.props.fontSize !== prevProps.fontSize) {
			setTimeout(() => this.setHeight(), 100);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setHeightDebounced);
	}

	render() {
		const { text, changeText, ...props } = this.props;
		const { height } = this.state;

		return (
			<Wrapper>
				<GhostText
					{...props}
					aria-hidden={true}
					innerRef={this.ghostRef}
					value={text}
					readOnly={true}
				/>
				<AccessibleLabel for="input">Start typing</AccessibleLabel>
				<Text
					id="input"
					{...props}
					style={{ height }}
					onChange={({ target }) => this.props.changeText(target.value)}
					onKeyUp={this.handleKeyUp}
					autoFocus={true}
					value={text}
					placeholder="Type something…"
				/>
			</Wrapper>
		);
	}

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
