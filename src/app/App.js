import React, { Component, Fragment } from 'react';
import Transition from 'react-transition-group/Transition';
import Helmet from 'react-helmet';
import { DEFAULT_SETTINGS, DEFAULT_PARAMS } from 'config.js';
import { getQueryParams, getShareUrl, setUrlParams } from 'utils/url';
import { SettingsPanel } from 'components/SettingsPanel/SettingsPanel';
import { Spinner } from 'components/Spinner/Spinner';
import { SharingPanel } from 'components/SharingPanel/SharingPanel';
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

	static getDerivedStateFromProps() {
		const queryParams = getQueryParams();

		return {
			...DEFAULT_PARAMS,
			...queryParams,
			isAutoFontColor: isUndefined(queryParams.fontColor),
		};
	}

	render() {
		const {
			isSettingsOpen,
			isSharingOpen,
			isAutoFontColor,
			isLoadingShareUrl,
			shareUrl,
			text,
			bgColor,
			fontColor,
			fontSize,
		} = this.state;

		const title = getTitle(text);

		return (
			<Wrapper>
				<Helmet>
					<title>padpad ~ {title}</title>
					<body bgColor={bgColor} />
				</Helmet>
				<Canvas
					fontColor={fontColor}
					fontSize={fontSize}
					text={text}
					changeText={text => this.setState({ text })}
				/>
				<Controls isActive={isSettingsOpen || isSharingOpen}>
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

	changeSettings = settings => {
		setUrlParams(settings);
		this.setState(settings);
	};

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
