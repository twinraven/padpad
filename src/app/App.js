import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { DEFAULT_SETTINGS, DEFAULT_PARAMS } from 'config.js';
import { getQueryParams, setUrlParams } from 'utils/url';
import { ShareButton } from 'components/ShareButton/ShareButton';
import { Settings } from 'components/Settings/Settings';
import {
	Wrapper,
	Canvas,
	Controls,
	SettingsButton,
	CloseButton,
	SettingsModal,
} from './App.styles';
import { getTitle } from './App.utils';

class App extends Component {
	state = {
		isSettingsOpen: false,
		isAutoFontColor: true,
	};

	static getDerivedStateFromProps() {
		return {
			...DEFAULT_PARAMS,
			...getQueryParams(),
		};
	}

	render() {
		const {
			isSettingsOpen,
			isAutoFontColor,
			text,
			bgColor,
			fontColor,
			fontSize,
		} = this.state;

		const title = getTitle(text);

		return (
			<Wrapper bgColor={bgColor}>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<Canvas
					fontColor={fontColor}
					fontSize={fontSize}
					text={text}
					changeText={text => this.setState({ text })}
				/>
				<Controls>
					<ShareButton />
					{isSettingsOpen ? (
						<CloseButton onClick={this.toggleSettingsOpen} />
					) : (
						<SettingsButton onClick={this.toggleSettingsOpen} />
					)}
				</Controls>
				{isSettingsOpen && (
					<SettingsModal showClose={false} onClose={this.toggleSettingsOpen}>
						<Settings
							bgColor={bgColor}
							fontColor={fontColor}
							fontSize={fontSize}
							isAutoFontColor={isAutoFontColor}
							onClose={this.toggleSettingsOpen}
							onChangeSettings={this.changeSettings}
							onReset={() => this.changeSettings(DEFAULT_SETTINGS)}
							onSetAutoFontColor={isAutoFontColor =>
								this.setState({ isAutoFontColor })
							}
						/>
					</SettingsModal>
				)}
			</Wrapper>
		);
	}

	changeSettings = settings => {
		this.setState(settings);
		setUrlParams(settings);
	};

	toggleSettingsOpen = () =>
		this.setState(({ isSettingsOpen }) => ({
			isSettingsOpen: !isSettingsOpen,
		}));
}

export default App;
