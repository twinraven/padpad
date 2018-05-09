import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { MIN_FONT_SIZE, MAX_FONT_SIZE, COLOR_UPDATE_DELAY } from 'config.js';
import { getAutoTextColor } from 'utils/colour';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import {
	Wrapper,
	Content,
	Link,
	ResetLink,
	Swatch,
	Row,
	Range,
	Label,
	Footer,
	CloseColorButton,
} from './Settings.styles';

export class SettingsPanel extends Component {
	static propTypes = {
		isAutoFontColor: PropTypes.bool.isRequired,
		bgColor: PropTypes.string.isRequired,
		fontColor: PropTypes.string.isRequired,
		fontSize: PropTypes.string.isRequired,
		onChangeSettings: PropTypes.func.isRequired,
		onReset: PropTypes.func.isRequired,
		onSetAutoFontColor: PropTypes.func.isRequired,
	};

	state = {
		isEditingBgColor: false,
		isEditingFontColor: false,
	};

	constructor(props) {
		super(props);

		this.changeBgColorDebounced = debounce(
			this.handleChangeBgColor,
			COLOR_UPDATE_DELAY
		);
		this.changeFontColorDebounced = debounce(
			this.handleChangeFontColor,
			COLOR_UPDATE_DELAY
		);
	}

	render() {
		const {
			isAutoFontColor,
			bgColor,
			fontColor,
			fontSize,
			onChangeSettings,
			...props
		} = this.props;
		const { isEditingBgColor, isEditingFontColor } = this.state;

		return (
			<Wrapper {...props}>
				<Content>
					<Row>
						<Label>
							Background color
							<Swatch
								color={bgColor}
								onClick={() =>
									this.setState(({ isEditingBgColor }) => ({
										isEditingBgColor: !isEditingBgColor,
									}))
								}
							/>
						</Label>
						{isEditingBgColor && (
							<React.Fragment>
								<ColorPicker
									color={bgColor}
									onChange={this.changeBgColorDebounced}
								/>
								<Footer>
									<CloseColorButton
										onClick={() => this.setState({ isEditingBgColor: false })}
									/>
								</Footer>
							</React.Fragment>
						)}
					</Row>
					<Row>
						<Label>
							Font color
							{isAutoFontColor ? (
								<p>
									auto (<Link onClick={this.handleActivateFontControl}>
										edit
									</Link>)
								</p>
							) : (
								<Swatch
									color={fontColor}
									onClick={() =>
										this.setState(({ isEditingFontColor }) => ({
											isEditingFontColor: !isEditingFontColor,
										}))
									}
								/>
							)}
						</Label>
						{!isAutoFontColor &&
							isEditingFontColor && (
								<React.Fragment>
									<ColorPicker
										color={fontColor}
										onChange={this.changeFontColorDebounced}
									/>
									<Footer>
										<Link onClick={this.handleResetFontControl}>
											set automatically
										</Link>
										<CloseColorButton
											onClick={() =>
												this.setState({ isEditingFontColor: false })
											}
										/>
									</Footer>
								</React.Fragment>
							)}
					</Row>
					<Row>
						<Label>
							Font size
							<Range
								min={MIN_FONT_SIZE}
								max={MAX_FONT_SIZE}
								step={0.1}
								value={fontSize}
								onChange={event =>
									onChangeSettings({ fontSize: event.target.value })
								}
							/>
						</Label>
					</Row>
					<Row isFixed>
						<Label>
							<ResetLink onClick={this.handleReset}>reset all</ResetLink>
						</Label>
					</Row>
				</Content>
			</Wrapper>
		);
	}

	handleChangeBgColor = ({ hex }) => {
		const { isAutoFontColor, onChangeSettings } = this.props;
		let settings = { bgColor: hex };

		if (isAutoFontColor) {
			settings.fontColor = getAutoTextColor(hex);
		}

		onChangeSettings(settings);
	};

	handleActivateFontControl = () => {
		this.props.onSetAutoFontColor(false);
		this.setState({ isEditingFontColor: true });
	};

	handleResetFontControl = () => {
		const { bgColor, onSetAutoFontColor, onChangeSettings } = this.props;

		onSetAutoFontColor(true);
		onChangeSettings({ fontColor: getAutoTextColor(bgColor) });

		this.setState({ isEditingFontColor: false });
	};

	handleChangeFontColor = ({ hex }) => {
		const { onSetAutoFontColor, onChangeSettings } = this.props;

		onSetAutoFontColor(false);
		onChangeSettings({ fontColor: hex });
	};

	handleReset = () => {
		this.props.onReset();

		this.setState({
			isEditingBgColor: false,
			isEditingFontColor: false,
		});
	};
}
