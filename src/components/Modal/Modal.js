import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import { ModalOverlay, ModalContent, ModalClose } from './Modal.styles';

export class Modal extends Component {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
		showClose: PropTypes.bool,
	};

	static defaultProps = {
		showClose: true,
	};

	modalRoot = null;

	constructor() {
		super();

		this.modalRoot = document.createElement('div');
		this.modalRoot.setAttribute('id', 'modal-root');
		document.body.appendChild(this.modalRoot);
	}

	componentWillUnmount() {
		document.body.removeChild(this.modalRoot);
	}

	render() {
		const { children, showClose, onClose, ...props } = this.props;

		return ReactDOM.createPortal(
			<ModalOverlay>
				<ClickOutside onClickOutside={onClose}>
					<ModalContent {...props}>
						{children}
						{showClose && <ModalClose onClick={onClose} />}
					</ModalContent>
				</ClickOutside>
			</ModalOverlay>,
			this.modalRoot
		);
	}
}
