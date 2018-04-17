import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Wrapper, Text } from './Canvas.styles.js';
import { storeText } from '../utils/localstorage.js';

export class Canvas extends Component {
	static propTypes = {
		initialText: PropTypes.string,
	};

	state = {
		text: this.props.initialText || '',
	};

	constructor(props) {
		super(props);

		this.storeTextDebounced = debounce(this.storeText, 250);
	}

	render() {
		const { text } = this.state;

		return (
			<Wrapper>
				<Text
					onChange={this.handleTextChange}
					onKeyUp={this.storeTextDebounced}
					value={text}
				/>
			</Wrapper>
		);
	}

	handleTextChange = event => this.setState({ text: event.target.value });

	storeText = () => storeText(this.state.text);
}
