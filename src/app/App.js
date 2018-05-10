import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { DEFAULT_SETTINGS, DEFAULT_PARAMS } from 'config.js';
import { getQueryParams, getShareUrl, setUrlParams } from 'utils/url';
import { SettingsPanel } from 'components/Settings/Settings';
import { Spinner } from 'components/Spinner/Spinner';
import { SharingPanel } from 'components/Sharing/Sharing';
import { SettingsIcon } from 'shared/icons/SettingsIcon';
import { CloseIcon, ShareIcon } from 'shared/icons';
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
import { getTitle } from './App.utils';

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
			<Wrapper bgColor={bgColor}>
				<Helmet>
					<title>{title}</title>
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
								<CloseIcon width="13" height="13" />
							)
						) : (
							<ShareIcon />
						)}
					</SharingButton>

					<SettingsButton
						isSelected={isSettingsOpen}
						onClick={this.toggleSettingsPanel}
					>
						{isSettingsOpen ? (
							<CloseIcon width="13" height="13" />
						) : (
							<SettingsIcon />
						)}
					</SettingsButton>
				</Controls>
				{isSharingOpen &&
					!isLoadingShareUrl && (
						<SharingModal onClose={this.toggleSharingPanel}>
							<SharingPanel url={shareUrl} />
						</SharingModal>
					)}
				{isSettingsOpen && (
					<SettingsModal onClose={this.toggleSettingsPanel}>
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
