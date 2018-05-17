import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { InvisibleLabel } from 'styles/mixins';
import {
	Wrapper,
	Title,
	Row,
	Input,
	CopyButton,
	Message,
} from './SharingPanel.styles';
import { CopyIcon } from 'shared/icons';

export class SharingPanel extends Component {
	state = {
		hasCopied: false,
	};

	constructor() {
		super();
		this.inputRef = React.createRef();
	}

	componentDidMount() {
		this.inputRef.current.select();
	}

	render() {
		const { url, ...props } = this.props;
		const { hasCopied } = this.state;

		return (
			<Wrapper {...props}>
				<Title>Ready to share</Title>
				<Row>
					<InvisibleLabel for="url">Share url</InvisibleLabel>
					<Input
						id="url"
						defaultValue={url}
						autoFocus
						innerRef={this.inputRef}
					/>
					<CopyToClipboard onCopy={this.onCopy} text={url}>
						<CopyButton>
							<CopyIcon /> copy
						</CopyButton>
					</CopyToClipboard>
				</Row>
				{hasCopied && <Message>Copied!</Message>}
			</Wrapper>
		);
	}

	onCopy = () => this.setState({ hasCopied: true });
}
