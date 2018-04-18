import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import debounce from 'lodash.debounce';
import { Wrapper, Text } from './Canvas.styles.js';

export class Canvas extends Component {
	static propTypes = {
		initialText: PropTypes.string,
	};

	state = {
		text: this.props.initialText || '',
	};

	constructor(props) {
		super(props);

		this.updateUrlDebounced = debounce(this.updateUrl, 200);
	}

	render() {
		const { text } = this.state;

		return (
			<Wrapper>
				<Text
					onChange={this.handleTextChange}
					onKeyUp={this.updateUrlDebounced}
					value={text}
					placeholder="Type something..."
				/>
			</Wrapper>
		);
	}

	handleTextChange = event => this.setState({ text: event.target.value });

	updateUrl = () => {
		const url = this.getUrl();

		if (window.history.pushState) {
			window.history.pushState({ path: url }, '', url);
		}
	};

	// TODO: move to utils
	getUrl() {
		const { protocol, host, pathname } = document.location;
		const text = encodeURIComponent(this.state.text);
		const qs = text && `?${queryString.stringify({ text })}`;

		return `${protocol}//${host}${pathname}${qs}`;
	}
}
