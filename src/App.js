import React, { Component } from 'react';
import { Canvas } from './Canvas/Canvas';
import './App.css';
import { retrieveText } from './utils/localstorage';

class App extends Component {
	render() {
		const text = retrieveText();

		return (
			<div className="App">
				<Canvas initialText={text} />
			</div>
		);
	}
}

export default App;
