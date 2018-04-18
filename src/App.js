import React, { Component } from 'react';
import qs from 'qs';
import { Canvas } from './Canvas/Canvas';
import { Wrapper, ShareButton } from './App.styles';

class App extends Component {
	render() {
		const search = document.location.search.replace('?', '');
		const qsData = qs.parse(search);
		const text = qsData.text && decodeURIComponent(qsData.text);

		return (
			<Wrapper>
				<Canvas initialText={text} />
				<ShareButton />
			</Wrapper>
		);
	}
}

export default App;
