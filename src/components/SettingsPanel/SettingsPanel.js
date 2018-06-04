import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import debounce from 'lodash.debounce';
import { MIN_FONT_SIZE, MAX_FONT_SIZE, COLOR_UPDATE_DELAY } from 'config.js';
import { getAutoTextColor } from 'utils/colour';
import { getQueryParams, hasDefaultParams } from 'utils/url';
import { isUndefined, isDefined } from 'utils/type';
import { DownArrowIcon, CloseIcon } from 'shared/icons';
import { Range } from 'components/Range/Range.styles';
import { ColorPicker } from 'components/ColorPicker/ColorPicker';
import { Select } from 'components/Select/Select';
import { ConfigConsumer } from 'providers/config';
import {
	Wrapper,
	Content,
	Link,
	ResetButton,
	Swatch,
	Row,
	Label,
	Footer,
	ColorWrapper,
	exitTransitionMs,
} from './SettingsPanel.styles';

export class SettingsPanel extends Component {
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
		const { isEditingBgColor, isEditingFontColor } = this.state;

		const params = getQueryParams();
		const isResetDisabled = hasDefaultParams(params);

		return (
			<ConfigConsumer>
				{({
					bgColor,
					fontColor,
					fontSize,
					fontStyle,
					changeConfig,
					resetConfig,
				}) => (
					<Wrapper {...this.props}>
						<Content>
							<Row>
								<Label id="bg-color">Background color</Label>
								<Swatch
									aria-labelledby="bg-color"
									color={bgColor}
									onClick={() =>
										this.setState(({ isEditingBgColor }) => ({
											isEditingBgColor: !isEditingBgColor,
										}))
									}
								>
									{isEditingBgColor ? <CloseIcon /> : <DownArrowIcon />}
								</Swatch>
								<Transition
									in={isEditingBgColor}
									timeout={{ enter: 0, exit: exitTransitionMs }}
									unmountOnExit
								>
									{state => (
										<ColorWrapper transitionState={state} key="bg-color">
											<ColorPicker
												color={bgColor}
												onChange={this.changeBgColorDebounced}
											/>
										</ColorWrapper>
									)}
								</Transition>
							</Row>
							<Row>
								<Label id="font-color">Font color</Label>
								{isUndefined(fontColor) ? (
									<p>
										auto (<Link onClick={this.handleActivateFontControl}>
											edit
										</Link>)
									</p>
								) : (
									<Swatch
										aria-labelledby="font-color"
										color={fontColor}
										onClick={() =>
											this.setState(({ isEditingFontColor }) => ({
												isEditingFontColor: !isEditingFontColor,
											}))
										}
									>
										{isEditingFontColor ? <CloseIcon /> : <DownArrowIcon />}
									</Swatch>
								)}
								<Transition
									in={isEditingFontColor && isDefined(fontColor)}
									timeout={{ enter: 0, exit: exitTransitionMs }}
									unmountOnExit
								>
									{state => (
										<ColorWrapper
											transitionState={state}
											key="font-color"
											isEditing={isEditingFontColor}
										>
											<ColorPicker
												color={fontColor}
												onChange={this.changeFontColorDebounced}
											/>
											<Footer>
												<Link onClick={this.handleResetFontControl}>
													set automatically
												</Link>
											</Footer>
										</ColorWrapper>
									)}
								</Transition>
							</Row>
							<Row>
								<Label htmlFor="font-size">Font size</Label>
								<Range
									id="font-size"
									min={MIN_FONT_SIZE}
									max={MAX_FONT_SIZE}
									step={0.1}
									value={fontSize}
									onChange={event =>
										changeConfig({ fontSize: event.target.value })
									}
								/>
							</Row>
							<Row>
								<Label htmlFor="font-style">Font style</Label>
								<Select
									id="font-style"
									value={fontStyle}
									onChange={event =>
										changeConfig({ fontStyle: event.target.value })
									}
								/>
							</Row>
							<Row isFixed>
								<ResetButton
									onClick={this.handleReset}
									disabled={isResetDisabled}
								>
									reset all
								</ResetButton>
							</Row>
						</Content>
					</Wrapper>
				)}
			</ConfigConsumer>
		);
	}

	handleChangeBgColor = ({ hex }) => {
		const { onChangeSettings } = this.props;
		let settings = { bgColor: hex };

		/* if (isAutoFontColor) {
			settings.fontColor = getAutoTextColor(hex);
		} */

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
		this.props.onSetAutoFontColor(true);

		this.setState({
			isEditingBgColor: false,
			isEditingFontColor: false,
		});
	};
}
