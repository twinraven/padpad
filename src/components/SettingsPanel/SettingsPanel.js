import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAutoTextColor } from 'utils/colour';
import { Wrapper, Content, CloseButton } from './SettingsPanel.styles';

export class SettingsPanel extends Component {
	static propTypes = {
		bgColor: PropTypes.string.isRequired,
		fontColor: PropTypes.string.isRequired,
		fontSize: PropTypes.string.isRequired,
		onClose: PropTypes.func.isRequired,
		onChangeSettings: PropTypes.func.isRequired,
		onResetSettings: PropTypes.func.isRequired,
	};

	render() {
		const {
			bgColor,
			fontColor,
			fontSize,
			onClose,
			onChangeSettings,
			onResetSettings,
			...props
		} = this.props;

		return (
			<Wrapper {...props}>
				<CloseButton onClick={onClose} />
				<Content>
					<p>
						Background color:
						<input value={bgColor} onChange={this.handleChangeBgColor} />
						Font color:
						<input
							value={fontColor}
							onChange={event =>
								onChangeSettings({ fontColor: event.target.value })
							}
						/>
						Font size:
						<input
							type="range"
							min={10}
							max={30}
							step={0.1}
							value={fontSize}
							onChange={event =>
								onChangeSettings({ fontSize: event.target.value })
							}
						/>
						<a onClick={onResetSettings}>reset all</a>
					</p>
				</Content>
			</Wrapper>
		);
	}

	handleChangeBgColor = event => {
		const bgColor = event.target.value;

		// if auto set colour
		const fontColor = getAutoTextColor(bgColor);

		this.props.onChangeSettings({ bgColor, fontColor });
	};
}
