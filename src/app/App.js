import React, { Component, Fragment } from 'react';
import Transition from 'react-transition-group/Transition';
import Helmet from 'react-helmet';
import { DEFAULT_SETTINGS } from 'config.js';
import { SettingsPanel } from 'components/SettingsPanel/SettingsPanel';
import { Spinner } from 'components/Spinner/Spinner';
import { SharingPanel } from 'components/SharingPanel/SharingPanel';
import { exitTransitionMs } from 'components/Modal/Modal.styles';
import { SettingsIcon } from 'shared/icons/SettingsIcon';
import { CloseIcon, ShareIcon } from 'shared/icons';
import { getShareUrl, setUrlParams } from 'utils/url';
import { getParsedQueryParams } from 'utils/parse';
import { stopEvent } from 'utils/event';
import { AccessibleText } from 'styles/mixins';
import { getTitle } from './App.utils';
import { GlobalStyle } from '../styles';
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
		...getParsedQueryParams(),
	};

	componentDidMount() {
		window.addEventListener('popstate', this.alignStateWithQueryParams, false);
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this.alignStateWithQueryParams);
	}

	render() {
		const {
			// app-based
			isSettingsOpen,
			isSharingOpen,
			isAutoFontColor,
			isLoadingShareUrl,
			shareUrl,
			// content-based
			text,
			bgColor,
			fontColor,
			fontSize,
			fontStyle,
		} = this.state;

		const title = getTitle(text);

		return (
			<Wrapper>
				<GlobalStyle />
				<Helmet>
					<title>{title}</title>
					<body bgColor={bgColor} />
				</Helmet>
				<Canvas
					fontColor={fontColor}
					fontSize={fontSize}
					fontStyle={fontStyle}
					text={text}
					changeText={text => this.setState({ text })}
				/>
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
							<SettingsPanel
								bgColor={bgColor}
								fontColor={fontColor}
								fontSize={fontSize}
								fontStyle={fontStyle}
								isAutoFontColor={isAutoFontColor}
								onChangeSettings={this.changeSettings}
								onReset={() => this.changeSettings(DEFAULT_SETTINGS)}
								onSetAutoFontColor={isAutoFontColor =>
									this.setState({ isAutoFontColor })
								}
							/>
						</SettingsModal>
					)}
				</Transition>
			</Wrapper>
		);
	}

	alignStateWithQueryParams = () => this.setState(getParsedQueryParams());

	changeSettings = settings => {
		setUrlParams(settings);
		this.setState(settings);
	};

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
