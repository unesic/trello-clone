import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { Backdrop, ModalContainer } from "./Modal.module.css";

const Modal = ({ visible, close, classes, children }) => {
	const backdropRef = useRef(null);
	const modalRef = useRef(null);

	return (
		<>
			<CSSTransition
				nodeRef={backdropRef}
				in={visible}
				timeout={200}
				classNames={`${Backdrop} Backdrop-transition`}
				unmountOnExit
			>
				<div onClick={close} ref={backdropRef}></div>
			</CSSTransition>

			<CSSTransition
				nodeRef={modalRef}
				in={visible}
				timeout={200}
				classNames={`${ModalContainer} ${classes} ModalContainer-transition`}
				unmountOnExit
			>
				<div ref={modalRef}>{children}</div>
			</CSSTransition>
		</>
	);
};

export default Modal;
