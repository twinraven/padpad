import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { ShareButton } from 'components/ShareButton/ShareButton';
import { DEFAULT_CONFIG } from 'config';
import { getQueryParamsWithDefaults, setUrlParams } from 'utils/url';
import { isDefined } from 'utils/type';
import {
	Wrapper,
	Canvas,
	Controls,
	SettingsButton,
	Settings,
} from './App.styles';

class App extends Component {
	state = {
		isSettingsOpen: false,
		isAutoFontColor: true,
	};

	static getDerivedStateFromProps() {
		let { bgColor, fontColor, fontSize, text } = getQueryParamsWithDefaults();

		return { bgColor, fontColor, fontSize, text };
	}

	render() {
		const {
			isSettingsOpen,
			isAutoFontColor,
			bgColor,
			fontColor,
			fontSize,
			text,
		} = this.state;

		const title = this.getTitle(text);

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
					<SettingsButton onClick={this.toggleSettingsOpen}>
						Settings
					</SettingsButton>
				</Controls>
				{isSettingsOpen && (
					<Settings
						isAutoFontColor={isAutoFontColor}
						bgColor={bgColor}
						fontColor={fontColor}
						fontSize={fontSize}
						onClose={this.toggleSettingsOpen}
						onChangeSettings={this.changeSettings}
						onResetSettings={this.resetSettings}
						onSetAutoFontColor={isAutoFontColor =>
							this.setState({ isAutoFontColor })
						}
					/>
				)}
			</Wrapper>
		);
	}

	getTitle = text => {
		if (!isDefined(text) || text.length === 0) return 'Pad';

		const firstLine = text.split('\n')[0];
		let title = firstLine.substring(0, 25);

		if (title.length < firstLine.length) {
			title = `${title}…`;
		}

		return title;
	};

	changeSettings = props => {
		this.setState(props);
		setUrlParams(props);
	};

	resetSettings = () => {
		const { text, ...DefaultsWithoutText } = DEFAULT_CONFIG;

		this.changeSettings(DefaultsWithoutText);
	};

	toggleSettingsOpen = () =>
		this.setState(({ isSettingsOpen }) => ({
			isSettingsOpen: !isSettingsOpen,
		}));
}

export default App;
