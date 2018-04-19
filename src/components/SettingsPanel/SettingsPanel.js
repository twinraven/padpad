import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setUrlParams } from 'utils/url';
import { getAutoTextColor } from 'utils/colour';
import { Wrapper, Content, CloseButton } from './SettingsPanel.styles';

export class SettingsPanel extends Component {
	static propTypes = {
		bgColor: PropTypes.string.isRequired,
		textColor: PropTypes.string.isRequired,
		onClose: PropTypes.func.isRequired,
		onChangeSettings: PropTypes.func.isRequired,
	};

	render() {
		const { bgColor, textColor, onClose, ...props } = this.props;

		return (
			<Wrapper {...props}>
				<CloseButton onClick={onClose} />
				<Content>
					<p>
						Background color:
						<input value={bgColor} onChange={this.handleChangeBgColor} />
						Text color:
						<input value={textColor} onChange={this.handleChangeTextColor} />
					</p>
				</Content>
			</Wrapper>
		);
	}

	handleChangeBgColor = event => {
		const bgColor = event.target.value;

		// if auto set colour
		const textColor = getAutoTextColor(bgColor);

		this.handleChangeSettings({ bgColor, textColor });
	};

	handleChangeTextColor = event =>
		this.handleChangeSettings({ textColor: event.target.value });

	handleChangeSettings = prop => {
		this.props.onChangeSettings(prop);
		setUrlParams(prop);
	};
}
