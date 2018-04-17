import React, { Component } from 'react';
import { Canvas } from './Canvas/Canvas';
import { retrieveText } from './utils/localstorage';
import { Wrapper } from './App.styles';

class App extends Component {
	render() {
		const text = retrieveText();

		return (
			<Wrapper>
				<Canvas initialText={text} />
			</Wrapper>
		);
	}
}

export default App;
