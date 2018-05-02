import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Title, Input, CopyButton, Message } from './Sharing.styles';
import { CopyIcon } from 'shared/icons';

export class Sharing extends Component {
	state = {
		hasCopied: false,
	};

	render() {
		const { url, ...props } = this.props;
		const { hasCopied } = this.state;

		return (
			<div {...props}>
				<Title>Ready to share</Title>
				<div style={{ display: 'flex' }}>
					<Input defaultValue={url} />
					<CopyToClipboard onCopy={this.onCopy} text={url}>
						<CopyButton>
							<CopyIcon /> copy
						</CopyButton>
					</CopyToClipboard>
				</div>
				{hasCopied && <Message>Copied!</Message>}
			</div>
		);
	}

	onCopy = () => this.setState({ hasCopied: true });
}
