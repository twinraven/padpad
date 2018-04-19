import React from 'react';
import Clipboard from 'clipboard';
import { Button } from './ShareButton.styles';

new Clipboard('.share-button');

export function ShareButton(props) {
	return (
		<div {...props}>
			<Button
				onClick={() => alert('copied')}
				{...props}
				/* these props last so as not to break Clipboard... */
				className="share-button"
				data-clipboard-text={document.location.href}
			>
				Share
			</Button>
		</div>
	);
}
