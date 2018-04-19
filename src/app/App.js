import React, { Component } from 'react';
import { Canvas } from 'components/Canvas/Canvas';
import { ShareButton } from 'components/ShareButton/ShareButton';
import { DEFAULT_BG_COLOR, DEFAULT_TEXT_COLOR } from 'config';
import { getUrlParams } from 'utils/url';
import { getAutoTextColor } from 'utils/colour';
import { Wrapper, Controls, SettingsButton, SettingsPanel } from './App.styles';

class App extends Component {
	state = {
		isSettingsOpen: false,
	};

	componentDidMount() {
		let {
			bgColor = DEFAULT_BG_COLOR,
			textColor = DEFAULT_TEXT_COLOR,
			text = '',
		} = getUrlParams();

		if (bgColor !== DEFAULT_BG_COLOR) {
			textColor = getAutoTextColor(bgColor);
		}

		this.setState({ bgColor, textColor, text });
	}

	render() {
		const { isSettingsOpen, bgColor, textColor, text } = this.state;

		return (
			<Wrapper textColor={textColor} bgColor={bgColor}>
				<Canvas text={text} changeText={text => this.setState({ text })} />

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

	handleSettingsToggle = () =>
		this.setState(state => ({
			isSettingsOpen: !state.isSettingsOpen,
		}));
}

export default App;
