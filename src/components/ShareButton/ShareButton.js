import React from 'react';
import { Button } from './ShareButton.styles';
import { getShortUrl } from 'utils/url';

export function ShareButton(props) {
	const displayShortUrl = url => {
		alert(url); // TODO: popup/toast notification, with 'click-to-copy'
	};

	const getUrl = () => {
		getShortUrl(document.location.href)
			.then(response => response.json())
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
			<Button onClick={getUrl}>Share</Button>
		</div>
	);
}
