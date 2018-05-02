import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MIN_FONT_SIZE, MAX_FONT_SIZE } from 'config.js';
import { getAutoTextColor } from 'utils/colour';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import {
	Wrapper,
	Content,
	Link,
	Swatch,
	Row,
	CloseColorButton,
} from './Settings.styles';

export class Settings extends Component {
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
		isBgColorOpen: false,
		isFontColorOpen: false,
	};

	render() {
		const {
			isAutoFontColor,
			bgColor,
			fontColor,
			fontSize,
			onChangeSettings,
			...props
		} = this.props;
		const { isBgColorOpen, isFontColorOpen } = this.state;

		return (
			<Wrapper {...props}>
				<Content>
					<Row>
						Background color:
						<Swatch
							color={bgColor}
							onClick={() =>
								this.setState(({ isBgColorOpen }) => ({
									isBgColorOpen: !isBgColorOpen,
								}))
							}
						/>
						{isBgColorOpen && (
							<React.Fragment>
								<ColorPicker
									color={bgColor}
									onChange={this.handleChangeBgColor}
								/>
								<div>
									<CloseColorButton
										onClick={() => this.setState({ isBgColorOpen: false })}
									>
										X
									</CloseColorButton>
								</div>
							</React.Fragment>
						)}
					</Row>
					<Row>
						Font color:
						{isAutoFontColor ? (
							<p>
								auto (<Link onClick={this.handleActivateFontControl}>edit</Link>)
							</p>
						) : (
							<React.Fragment>
								<Swatch
									color={fontColor}
									onClick={() =>
										this.setState(({ isFontColorOpen }) => ({
											isFontColorOpen: !isFontColorOpen,
										}))
									}
								/>
								{isFontColorOpen && (
									<React.Fragment>
										<ColorPicker
											color={fontColor}
											onChange={this.handleChangeFontColor}
										/>
										<div>
											<Link onClick={this.handleResetFontControl}>
												set automatically
											</Link>
											<CloseColorButton
												onClick={() =>
													this.setState({ isFontColorOpen: false })
												}
											>
												X
											</CloseColorButton>
										</div>
									</React.Fragment>
								)}
							</React.Fragment>
						)}
					</Row>
					<Row>
						Font size:
						<input
							type="range"
							min={MIN_FONT_SIZE}
							max={MAX_FONT_SIZE}
							step={0.1}
							value={fontSize}
							onChange={event =>
								onChangeSettings({ fontSize: event.target.value })
							}
						/>
						<Link onClick={this.handleReset}>reset all</Link>
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
		this.setState({ isFontColorOpen: true });
	};

	handleResetFontControl = () => {
		const { bgColor, onSetAutoFontColor, onChangeSettings } = this.props;

		onSetAutoFontColor(true);
		onChangeSettings({ fontColor: getAutoTextColor(bgColor) });

		this.setState({ isFontColorOpen: false });
	};

	handleChangeFontColor = ({ hex }) => {
		const { onSetAutoFontColor, onChangeSettings } = this.props;

		onSetAutoFontColor(false);
		onChangeSettings({ fontColor: hex });
	};

	handleReset = () => {
		this.props.onReset();

		this.setState({
			isBgColorOpen: false,
			isFontColorOpen: false,
		});
	};
}
