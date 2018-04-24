import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { URL_UPDATE_DELAY } from 'config';
import { setUrlParams } from 'utils/url';
import { Wrapper, Text } from './Canvas.styles';

export class Canvas extends Component {
	static propTypes = {
		text: PropTypes.string,
		changeText: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.updateUrlDebounced = debounce(this.updateUrl, URL_UPDATE_DELAY);
	}

	render() {
		const { text } = this.props;

		return (
			<Wrapper>
				<Text
					onChange={this.handleTextChange}
					onKeyUp={this.updateUrlDebounced}
					value={text}
					placeholder="Type something…"
				/>
			</Wrapper>
		);
	}

	handleTextChange = event => this.props.changeText(event.target.value);

	updateUrl = () => {
		const { text } = this.props;

		setUrlParams({ text });
	};
}
