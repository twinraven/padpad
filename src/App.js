import React, { Component } from 'react';
import qs from 'qs';
import { Canvas } from './Canvas/Canvas';
import { ShareButton } from './ShareButton/ShareButton';
import { Wrapper, Controls, SettingsButton, SettingsPanel } from './App.styles';

class App extends Component {
	state = {
		isSettingsOpen: false,
	};

	render() {
		const { isSettingsOpen } = this.state;

		const search = document.location.search.replace('?', '');
		const qsData = qs.parse(search);
		const text = qsData.text && decodeURIComponent(qsData.text);

		return (
			<Wrapper>
				<Canvas initialText={text} />
				<Controls>
					<ShareButton />
					<SettingsButton onClick={this.handleSettingsToggle}>
						Settings
					</SettingsButton>
				</Controls>
				{isSettingsOpen && <SettingsPanel onClose={this.handleSettingsToggle} />}
			</Wrapper>
		);
	}

	handleSettingsToggle = () =>
		this.setState(state => ({
			isSettingsOpen: !state.isSettingsOpen,
		}));
}

export default App;
