import React, { Component } from 'react';
import queryString from 'query-string';
import { Canvas } from './Canvas/Canvas';
import { Wrapper } from './App.styles';

class App extends Component {
	render() {
		const qs = queryString.parse(document.location.search);
		const text = qs.text && decodeURIComponent(qs.text);

		return (
			<Wrapper>
				<Canvas initialText={text} />
			</Wrapper>
		);
	}
}

export default App;
