import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { setUrlParams } from 'utils/url';
import { Wrapper, Text } from './Canvas.styles';

const URL_UPDATE_DELAY = 250;

export class Canvas extends Component {
	static propTypes = {
		initialText: PropTypes.string,
	};

	state = {
		text: this.props.initialText || '',
	};

	constructor(props) {
		super(props);

		this.updateUrlDebounced = debounce(this.updateUrl, URL_UPDATE_DELAY);
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
		const { text } = this.state;

		setUrlParams({ text });
	};
}
