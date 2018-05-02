import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { DEFAULT_SETTINGS, DEFAULT_PARAMS } from 'config.js';
import { getQueryParams, getShareUrl, setUrlParams } from 'utils/url';
import { Settings } from 'components/Settings/Settings';
import { Spinner } from 'components/Spinner/Spinner';
import { SettingsIcon } from 'shared/icons/SettingsIcon';
import { CloseIcon, ShareIcon } from 'shared/icons';
import { RoundButton } from 'shared/buttons';
import { Sharing } from 'components/Sharing/Sharing';
import {
	Wrapper,
	Canvas,
	Controls,
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
		return {
			...DEFAULT_PARAMS,
			...getQueryParams(),
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
				<Controls>
					<RoundButton isSelected={isSharingOpen} onClick={this.toggleSharing}>
						{isSharingOpen ? (
							isLoadingShareUrl ? (
								<Spinner />
							) : (
								<CloseIcon width="13" height="13" />
							)
						) : (
							<ShareIcon />
						)}
					</RoundButton>

					<RoundButton
						isSelected={isSettingsOpen}
						onClick={this.toggleSettings}
					>
						{isSettingsOpen ? (
							<CloseIcon width="13" height="13" />
						) : (
							<SettingsIcon />
						)}
					</RoundButton>
				</Controls>
				{isSharingOpen &&
					!isLoadingShareUrl && (
						<SharingModal onClose={this.toggleSharing}>
							<Sharing url={shareUrl} />
						</SharingModal>
					)}
				{isSettingsOpen && (
					<SettingsModal onClose={this.toggleSettings}>
						<Settings
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
		this.setState(settings);
		setUrlParams(settings);
	};

	toggleSettings = () =>
		this.setState(({ isSettingsOpen }) => ({
			isSettingsOpen: !isSettingsOpen,
		}));

	toggleSharing = () => {
		const { isSharingOpen } = this.state;

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
