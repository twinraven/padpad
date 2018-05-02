import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import { ModalOverlay, ModalContent, ModalClose } from './Modal.styles';
import { isEscapeKey } from 'utils/keyboard';

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

		document.addEventListener('keyup', this.handleKeyUp);
	}

	componentWillUnmount() {
		document.body.removeChild(this.modalRoot);
		document.removeEventListener('keyup', this.handleKeyUp);
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

	handleKeyUp = ({ keyCode }) => {
		if (isEscapeKey(keyCode)) {
			this.props.onClose();
		}
	};
}
