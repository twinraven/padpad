import React, { Component } from 'react';
import { Canvas } from 'components/Canvas/Canvas';
import { ShareButton } from 'components/ShareButton/ShareButton';
import { getUrlParams } from 'utils/url';
import { Wrapper, Controls, SettingsButton, SettingsPanel } from './App.styles';

class App extends Component {
	state = {
		isSettingsOpen: false,
	};

	render() {
		const { isSettingsOpen } = this.state;
		const { text, bgColor } = getUrlParams();

		return (
			<Wrapper bgColor={bgColor}>
				<Canvas
					bgColor={bgColor}
					initialText={text && decodeURIComponent(text)}
				/>
				<Controls>
					<ShareButton />
					<SettingsButton onClick={this.handleSettingsToggle}>
						Settings
					</SettingsButton>
				</Controls>
				{isSettingsOpen && (
					<SettingsPanel
						initialBgColor={bgColor}
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
