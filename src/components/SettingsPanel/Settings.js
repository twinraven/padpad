import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MIN_FONT_SIZE, MAX_FONT_SIZE } from 'config';
import { getAutoTextColor } from 'utils/colour';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import {
	Wrapper,
	Content,
	CloseButton,
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
		onClose: PropTypes.func.isRequired,
		onChangeSettings: PropTypes.func.isRequired,
		onResetSettings: PropTypes.func.isRequired,
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
			onClose,
			onChangeSettings,
			onResetSettings,
			...props
		} = this.props;
		const { isBgColorOpen, isFontColorOpen } = this.state;

		return (
			<Wrapper {...props}>
				<CloseButton onClick={onClose} />
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
							<Link onClick={this.handleActivateFontControl}>auto</Link>
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
						<Link onClick={onResetSettings}>reset all</Link>
					</Row>
				</Content>
			</Wrapper>
		);
	}

	handleChangeBgColor = ({ hex }) => {
		let settings = { bgColor: hex };

		if (this.props.isAutoFontColor) {
			settings.fontColor = getAutoTextColor(hex);
		}

		this.props.onChangeSettings(settings);
	};

	handleActivateFontControl = () => {
		this.props.onSetAutoFontColor(false);
		this.setState({ isFontColorOpen: true });
	};

	handleResetFontControl = () => {
		this.props.onSetAutoFontColor(true);
		this.setState({ isFontColorOpen: false });
	};

	handleChangeFontColor = ({ hex }) => {
		this.props.onSetAutoFontColor(false);

		this.props.onChangeSettings({ fontColor: hex });
	};
}
