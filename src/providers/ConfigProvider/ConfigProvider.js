import React, { Component } from 'react';
import { DEFAULT_SETTINGS } from 'config';

const { Provider, Consumer } = React.createContext('config');

export class ConfigProvider extends Component {
	state = {
		...DEFAULT_SETTINGS,
		setConfig: (key, value) => this.setState({ [key]: value }),
	};

	render() {
		return <Provider value={this.state}>{this.props.children}</Provider>;
	}
}

export const ConfigConsumer = Consumer;
