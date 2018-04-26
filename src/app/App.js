import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { ShareButton } from 'components/ShareButton/ShareButton';
import {
	DEFAULT_BG_COLOR,
	DEFAULT_FONT_COLOR,
	DEFAULT_FONT_SIZE,
} from 'config';
import { getQueryParams } from 'utils/url';
import { getAutoTextColor } from 'utils/colour';
import { isDefined } from 'utils/type';
import {
	Wrapper,
	Canvas,
	Controls,
	SettingsButton,
	SettingsPanel,
} from './App.styles';

class App extends Component {
	state = {
		isSettingsOpen: false,
	};

	static getDerivedStateFromProps() {
		let {
			bgColor = DEFAULT_BG_COLOR,
			fontColor = DEFAULT_FONT_COLOR,
			fontSize = DEFAULT_FONT_SIZE,
			text = '',
		} = getQueryParams();

		if (bgColor !== DEFAULT_BG_COLOR) {
			// TODO: and 'auto' mode isn't disabled
			fontColor = getAutoTextColor(bgColor);
		}

		return { bgColor, fontColor, fontSize, text };
	}

	render() {
		const { isSettingsOpen, bgColor, fontColor, fontSize, text } = this.state;

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
					<SettingsButton onClick={this.handleSettingsToggle}>
						Settings
					</SettingsButton>
				</Controls>
				{isSettingsOpen && (
					<SettingsPanel
						// TODO: make these 'initial-' props?
						bgColor={bgColor}
						fontColor={fontColor}
						fontSize={fontSize}
						onChangeSettings={prop => this.setState(prop)}
						onClose={this.handleSettingsToggle}
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

	handleSettingsToggle = () =>
		this.setState(state => ({
			isSettingsOpen: !state.isSettingsOpen,
		}));
}

export default App;
