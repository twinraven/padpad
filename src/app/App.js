import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { ShareButton } from 'components/ShareButton/ShareButton';
import { DEFAULT_BG_COLOR, DEFAULT_TEXT_COLOR } from 'config';
import { getUrlParams } from 'utils/url';
import { getAutoTextColor } from 'utils/colour';
import { hasValue } from 'utils/type';
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

	componentDidMount() {
		// TODO: move to utils?
		let {
			bgColor = DEFAULT_BG_COLOR,
			textColor = DEFAULT_TEXT_COLOR,
			text = '',
		} = getUrlParams();

		if (bgColor !== DEFAULT_BG_COLOR) {
			// and 'auto' mode isn't disabled
			textColor = getAutoTextColor(bgColor);
		}

		this.setState({ bgColor, textColor, text });
	}

	render() {
		const { isSettingsOpen, bgColor, textColor, text } = this.state;

		const title = this.getTitle({ text, defaultTitle: 'Pad' });

		return (
			<Wrapper bgColor={bgColor}>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<Canvas
					textColor={textColor}
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
						bgColor={bgColor}
						textColor={textColor}
						onChangeSettings={prop => this.setState(prop)}
						onClose={this.handleSettingsToggle}
					/>
				)}
			</Wrapper>
		);
	}

	getTitle = ({ text, defaultTitle }) => {
		if (!hasValue(text)) return defaultTitle;

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
