import React from 'react';
import { Button } from './ShareButton.styles';
import { getShortUrl } from 'utils/url';

export function ShareButton(props) {
	const displayShortUrl = url => {
		alert(url); // TODO: popup/toast notification, with 'click-to-copy'
	};

	const shareUrl = () => {
		getShortUrl(encodeURIComponent(document.location.href))
			.then(({ data, status_code }) => {
				if (status_code === 500) {
					throw new Error();
				}

				displayShortUrl(data.url);
			})
			.catch(() => displayShortUrl(document.location.href));
	};

	return (
		<div {...props}>
			<Button onClick={shareUrl}>Share</Button>
		</div>
	);
}
