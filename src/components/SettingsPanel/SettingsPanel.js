import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAutoTextColor } from 'utils/colour';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import { Wrapper, Content, CloseButton, Link } from './SettingsPanel.styles';

export class SettingsPanel extends Component {
	static propTypes = {
		isAutoFontColor: PropTypes.bool.isRequired,
		bgColor: PropTypes.string.isRequired,
		fontColor: PropTypes.string.isRequired,
		fontSize: PropTypes.string.isRequired,
		onClose: PropTypes.func.isRequired,
		onChangeSettings: PropTypes.func.isRequired,
		onResetSettings: PropTypes.func.isRequired,
	};

	render() {
		const {
			isAutoFontColor,
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
					<div>
						Background color:
						<ColorPicker color={bgColor} onChange={this.handleChangeBgColor} />
						Font color:
						{isAutoFontColor ? (
							<Link onClick={this.handleToggleAuto}>auto</Link>
						) : (
							<ColorPicker
								color={fontColor}
								onChange={this.handleChangeFontColor}
							/>
						)}
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
					</div>
				</Content>
			</Wrapper>
		);
	}

	handleChangeBgColor = ({ hex }) => {
		let settings = { bgColor: hex };

		if (!this.props.isAutoFontColor) {
			settings.fontColor = getAutoTextColor(hex);
		}

		this.props.onChangeSettings(settings);
	};

	handleChangeFontColor = ({ hex }) => {
		this.handleToggleAuto();

		this.props.onChangeSettings({ fontColor: hex });
	};

	handleToggleAuto = () => {
		console.log('toggle auto font colour');
	};
}
