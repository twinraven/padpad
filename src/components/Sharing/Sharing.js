import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
	Wrapper,
	Title,
	Row,
	Input,
	CopyButton,
	Message,
} from './Sharing.styles';
import { CopyIcon } from 'shared/icons';

export class SharingPanel extends Component {
	state = {
		hasCopied: false,
	};

	render() {
		const { url, ...props } = this.props;
		const { hasCopied } = this.state;

		return (
			<Wrapper {...props}>
				<Title>Ready to share</Title>
				<Row>
					<Input defaultValue={url} />
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
