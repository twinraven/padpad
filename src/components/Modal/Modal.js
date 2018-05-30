import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import { ESCAPE_KEY_CODE } from 'config.js';
import { ModalOverlay, ModalContent } from './Modal.styles';

export class Modal extends Component {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
	};

	modalRoot = null;

	constructor() {
		super();

		this.modalRoot = document.createElement('div');
		this.modalRoot.setAttribute('id', 'modal-root');
		document.body.appendChild(this.modalRoot);

		document.addEventListener('keyup', this.handleKeyUp);
	}

	componentWillUnmount() {
		document.body.removeChild(this.modalRoot);
		document.removeEventListener('keyup', this.handleKeyUp);
	}

	render() {
		const { children, onClose, ...props } = this.props;

		return ReactDOM.createPortal(
			<ModalOverlay>
				<ClickOutside onClickOutside={onClose}>
					<ModalContent {...props}>{children}</ModalContent>
				</ClickOutside>
			</ModalOverlay>,
			this.modalRoot
		);
	}

	handleKeyUp = ({ keyCode }) => {
		if (keyCode === ESCAPE_KEY_CODE) {
			this.props.onClose();
		}
	};
}
