import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setUrlParams } from 'utils/url';
import { getAutoTextColor } from 'utils/colour';
import { Wrapper, Content, CloseButton } from './SettingsPanel.styles';

export class SettingsPanel extends Component {
	static propTypes = {
		bgColor: PropTypes.string.isRequired,
		textColor: PropTypes.string.isRequired,
		fontSize: PropTypes.number.isRequired,
		onClose: PropTypes.func.isRequired,
		onChangeSettings: PropTypes.func.isRequired,
	};

	render() {
		const { bgColor, textColor, fontSize, onClose, ...props } = this.props;

		return (
			<Wrapper {...props}>
				<CloseButton onClick={onClose} />
				<Content>
					<p>
						{/*
						// TODO: add colour wheel
						*/}
						Background color:
						<input value={bgColor} onChange={this.handleChangeBgColor} />
						Text color:
						<input value={textColor} onChange={this.handleChangeTextColor} />
						Font size:
						<input
							type="range"
							min={10}
							max={30}
							step={0.1}
							value={fontSize}
							onChange={this.handleChangeFontSize}
						/>
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

	handleChangeFontSize = event =>
		this.handleChangeSettings({ fontSize: parseFloat(event.target.value) });

	handleChangeSettings = prop => {
		this.props.onChangeSettings(prop);
		setUrlParams(prop);
	};
}
