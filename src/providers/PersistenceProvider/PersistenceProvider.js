import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext('persistence');

export class PersistenceProvider extends Component {
	state = {
		persistSettings: false,
		setPersistence: persistSettings => this.setState({ persistSettings }),
	};

	render() {
		return <Provider value={this.state}>{this.props.children}</Provider>;
	}
}

export const PersistenceConsumer = Consumer;
