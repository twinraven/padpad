import React, { Component } from 'react';
import { DEFAULT_SETTINGS } from 'config';
import { getQueryParams } from 'utils/url';

const { Provider, Consumer } = React.createContext('config');

export class ConfigProvider extends Component {
	state = {
		setConfig: (key, value) => this.setState({ [key]: value }),
		resetConfig: () => this.setState({ ...DEFAULT_SETTINGS }),
	};

	static getDerivedStateFromProps(prevProps, prevState) {
		console.log(prevState);
		return {
			...DEFAULT_SETTINGS,
			...getQueryParams(),
		};
	}

	render() {
		return <Provider value={this.state}>{this.props.children}</Provider>;
	}
}

export const ConfigConsumer = Consumer;
