import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setUrlParams } from 'utils/url';
import { Wrapper, Content, CloseButton } from './SettingsPanel.styles';

export class SettingsPanel extends Component {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
		bgColor: PropTypes.string,
	};

	static defaultProps = {
		bgColor: 'fff',
	};

	state = {
		bgColor: this.props.initialBgColor,
	};

	render() {
		const { onClose, ...props } = this.props;
		const { bgColor } = this.state;

		return (
			<Wrapper {...props}>
				<CloseButton onClick={onClose} />
				<Content>
					<p>
						Background color:
						<input value={bgColor} onChange={this.handleBgColorChange} />
					</p>
				</Content>
			</Wrapper>
		);
	}

	handleBgColorChange = event => {
		const bgColor = event.target.value;

		this.setState({ bgColor });
		setUrlParams({ bgColor });
	};
}
