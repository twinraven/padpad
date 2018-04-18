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
				/>
				<button onClick={this.copyUrl}>Copy</button>
			</Wrapper>
		);
	}

	handleTextChange = event => this.setState({ text: event.target.value });

	updateUrl = () => {
		const url = this.getUrl();

		if (document.history.pushState) {
			document.history.pushState({ path: url }, '', url);
		}
	};

	copyUrl = () => {
		const url = this.getUrl();

		navigator.clipboard
			.writeText(url)
			.then(() => {
				alert('Text copied to clipboard');
			})
			.catch(err => {
				// This can happen if the user denies clipboard permissions:
				alert('Could not copy text: ');
				console.log('clipboard error', err);
			});
	};

	getUrl() {
		const { protocol, host, pathname } = document.location;
		const text = encodeURIComponent(this.state.text);
		const qs = queryString.stringify({ text });

		return `${protocol}//${host}${pathname}?${qs}`;
	}
}
