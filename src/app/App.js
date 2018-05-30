import React, { Component, Fragment } from 'react';
import Transition from 'react-transition-group/Transition';
import Helmet from 'react-helmet';
import { DEFAULT_SETTINGS, DEFAULT_PARAMS } from 'config.js';
import { getQueryParams, getShareUrl, setUrlParams } from 'utils/url';
import { SettingsPanel } from 'components/SettingsPanel/SettingsPanel';
import { Spinner } from 'components/Spinner/Spinner';
import { SharingPanel } from 'components/SharingPanel/SharingPanel';
import { Providers } from 'providers/AllProviders/AllProviders';
import { ConfigConsumer } from 'providers/ConfigProvider/ConfigProvider';
import { SettingsIcon } from 'shared/icons/SettingsIcon';
import { CloseIcon, ShareIcon } from 'shared/icons';
import { exitTransitionMs } from 'components/Modal/Modal.styles';
import { getTitle } from './App.utils';
import { AccessibleText } from 'styles/mixins';
import { isUndefined } from 'utils/type';
import {
	Wrapper,
	Canvas,
	Controls,
	SharingButton,
	SettingsButton,
	SettingsModal,
	SharingModal,
} from './App.styles';

class App extends Component {
	state = {
		isSettingsOpen: false,
		isSharingOpen: false,
		isAutoFontColor: true,
		isLoadingShareUrl: false,
		shareUrl: '',
	};

	componentDidMount() {
		const { fontColor, text } = getQueryParams();

		this.setState({
			text,
			isAutoFontColor: isUndefined(fontColor),
		});
	}

	render() {
		const {
			isSettingsOpen,
			isSharingOpen,
			isAutoFontColor,
			isLoadingShareUrl,
			shareUrl,
			text,
		} = this.state;

		const title = getTitle(text);

		return (
			<Providers>
				<Wrapper>
					<ConfigConsumer>
						{({ bgColor }) => (
							<Helmet>
								<title>{title}</title>
								<body bgColor={bgColor} />
							</Helmet>
						)}
					</ConfigConsumer>
					<Canvas text={text} changeText={text => this.setState({ text })} />
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

					<ConfigConsumer>
						{({ setConfig, resetConfig, ...config }) => (
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
										<SettingsPanel
											{...config}
											isAutoFontColor={isAutoFontColor}
											onUpdateConfig={setConfig}
											onReset={resetConfig}
											onSetAutoFontColor={isAutoFontColor =>
												this.setState({ isAutoFontColor })
											} /* TODO: move this into config provider */
										/>
									</SettingsModal>
								)}
							</Transition>
						)}
					</ConfigConsumer>
				</Wrapper>
			</Providers>
		);
	}

	toggleSettingsPanel = event => {
		this.handleEvent(event);

		this.setState({ isSettingsOpen: !this.state.isSettingsOpen });
	};

	toggleSharingPanel = event => {
		const { isSharingOpen } = this.state;

		this.handleEvent(event);

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

	handleEvent(event) {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
}

export default App;
