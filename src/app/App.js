import React, { Component, Fragment } from 'react';
import Transition from 'react-transition-group/Transition';
import Helmet from 'react-helmet';
import { SettingsPanel } from 'components/SettingsPanel/SettingsPanel';
import { Spinner } from 'components/Spinner/Spinner';
import { SharingPanel } from 'components/SharingPanel/SharingPanel';
import { exitTransitionMs } from 'components/Modal/Modal.styles';
import { SettingsIcon } from 'shared/icons/SettingsIcon';
import { CloseIcon, ShareIcon } from 'shared/icons';
import { getShareUrl } from 'utils/url';
import { stopEvent } from 'utils/event';
import { isUndefined } from 'utils/type';
import { getText } from 'utils/parse';
import { AccessibleText } from 'styles/mixins';
import { ConfigProvider, ConfigConsumer } from 'providers/config';
import { DEFAULT_TITLE } from 'config.js';
import {
	Wrapper,
	Canvas,
	Controls,
	SharingButton,
	SettingsButton,
	SettingsModal,
	SharingModal,
} from './App.styles';

export function getTitle(markup) {
	if (isUndefined(markup) || markup.length === 0) return DEFAULT_TITLE;

	const firstLine = markup.split(/<(br|div) ?\/?>/i)[0];
	const text = getText(firstLine);
	let title = text.substring(0, 25);

	if (title.length < text.length) {
		title = `${title}…`;
	}

	return `${DEFAULT_TITLE} | ${title}`;
}

class App extends Component {
	state = {
		isSettingsOpen: false,
		isSharingOpen: false,
		isLoadingShareUrl: false,
		shareUrl: '',
	};

	render() {
		const {
			isSettingsOpen,
			isSharingOpen,
			isLoadingShareUrl,
			shareUrl,
		} = this.state;

		return (
			<ConfigProvider>
				<Wrapper>
					<ConfigConsumer>
						{({ text, bgColor }) => (
							<Helmet>
								<title>{getTitle(text)}</title>
								<body bgColor={bgColor} />
							</Helmet>
						)}
					</ConfigConsumer>
					<Canvas />
					<Controls isActive={isSettingsOpen || isSharingOpen}>
						<SettingsButton
							isSelected={isSettingsOpen}
							onClick={this.toggleSettingsPanel}
						>
							{isSettingsOpen ? (
								<Fragment>
									<AccessibleText>Close sharing panel</AccessibleText>
									<CloseIcon width="13" height="13" />
								</Fragment>
							) : (
								<Fragment>
									<AccessibleText>Open settings panel</AccessibleText>
									<SettingsIcon />
								</Fragment>
							)}
						</SettingsButton>
						<SharingButton
							isSelected={isSharingOpen}
							onClick={this.toggleSharingPanel}
						>
							{isSharingOpen ? (
								isLoadingShareUrl ? (
									<Spinner />
								) : (
									<Fragment>
										<AccessibleText>Close sharing panel</AccessibleText>
										<CloseIcon width="13" height="13" />
									</Fragment>
								)
							) : (
								<Fragment>
									<AccessibleText>Open settings panel</AccessibleText>
									<ShareIcon />
								</Fragment>
							)}
						</SharingButton>
					</Controls>

					<Transition
						in={isSharingOpen && !isLoadingShareUrl}
						timeout={{
							enter: 0,
							exit: exitTransitionMs,
						}}
						unmountOnExit
					>
						{state => (
							<SharingModal
								onClose={this.toggleSharingPanel}
								key="sharing-modal"
								transitionState={state}
							>
								<SharingPanel url={shareUrl} />
							</SharingModal>
						)}
					</Transition>

					<Transition
						in={isSettingsOpen}
						timeout={{
							enter: 0,
							exit: exitTransitionMs,
						}}
						unmountOnExit
					>
						{state => (
							<SettingsModal
								onClose={this.toggleSettingsPanel}
								key="settings-modal"
								transitionState={state}
							>
								<SettingsPanel />
							</SettingsModal>
						)}
					</Transition>
				</Wrapper>
			</ConfigProvider>
		);
	}

	toggleSettingsPanel = event => {
		stopEvent(event);

		this.setState({ isSettingsOpen: !this.state.isSettingsOpen });
	};

	toggleSharingPanel = event => {
		const { isSharingOpen } = this.state;

		stopEvent(event);

		this.setState(
			{
				isSharingOpen: !isSharingOpen,
				isLoadingShareUrl: !isSharingOpen,
			},
			() => {
				if (this.state.isSharingOpen) {
					getShareUrl(document.location.href).then(shareUrl =>
						this.setState({ shareUrl, isLoadingShareUrl: false })
					);
				}
			}
		);
	};
}

export default App;
