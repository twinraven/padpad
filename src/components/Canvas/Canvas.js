import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { URL_UPDATE_DELAY } from 'config.js';
import { AccessibleLabel } from 'styles/mixins';
import { setUrlParams, cleanMarkup } from 'utils/url';
import { Wrapper, ContentEditable } from './Canvas.styles';

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
		const { text, changeText, ...props } = this.props;

		return (
			<Wrapper>
				<AccessibleLabel htmlFor="input">Start typing</AccessibleLabel>
				<ContentEditable
					id="input"
					{...props}
					onChange={event => this.props.changeText(event.target.value)}
					onKeyUp={this.updateUrlDebounced}
					onBlur={this.cleanMarkup}
					autoFocus={true}
					html={text}
					placeholder="Type something…"
				/>
			</Wrapper>
		);
	}

	updateUrl = () => {
		const { text } = this.props;

		setUrlParams({ text });
	};

	cleanMarkup = () => {
		this.props.changeText(cleanMarkup(this.props.text));
	};
}
