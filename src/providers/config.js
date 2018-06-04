import React, { Component } from 'react';
import { DEFAULT_PARAMS, DEFAULT_CONFIG } from 'config.js';
import { getParsedQueryParams } from 'utils/parse';

const { Provider, Consumer } = React.createContext('config');

export class ConfigProvider extends Component {
	state = {
		changeConfig: config => this.setState(config),
		resetConfig: () => this.setState({ ...DEFAULT_CONFIG }),
	};

	static getDerivedStateFromProps(prevProps, prevState) {
		return {
			...DEFAULT_PARAMS,
			...getParsedQueryParams(),
		};
	}

	componentDidMount() {
		window.addEventListener('popstate', this.alignStateWithQueryParams, false);
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this.alignStateWithQueryParams);
	}

	render() {
		return <Provider value={this.state}>{this.props.children}</Provider>;
	}

	alignStateWithQueryParams = () => this.setState(getParsedQueryParams());
}

export const ConfigConsumer = Consumer;

/* export const ConfigContainer = props => (
	<Container
		initialState={{ ...DEFAULT_PARAMS }}
		actions={{
			changeConfig: config => () => ({ ...config }),
			resetConfig: () => this.setState({ ...DEFAULT_CONFIG }),
		}}
		context="config"
		{...props}
	/>
);
 */
