import React, { useGlobal } from "reactn";
import Modal from "../Modal/Modal";
import { FiX, FiCheck } from "react-icons/fi";

import {
	ConfirmationModal,
	ConfirmText,
	ButtonsContainer,
	Button,
	ButtonCancel,
	ButtonContinue,
} from "./ConfirmationPopup.module.css";

const ConfirmationPopup = React.memo(() => {
	const [confirmPopupVisible, setConfirmPopupVisible] = useGlobal(
		"confirmPopupVisible"
	);
	const [confirmPopupData, setConfirmPopupData] = useGlobal(
		"confirmPopupData"
	);

	const confirmAction = () => {
		confirmPopupData.action();

		setConfirmPopupData({
			action: () => {},
			text: "",
		});

		closePopup();
	};

	const closePopup = () => {
		setConfirmPopupVisible(false);
	};

	return (
		<Modal
			visible={confirmPopupVisible}
			close={closePopup}
			classes={ConfirmationModal}
		>
			<h3 className={ConfirmText}>{confirmPopupData.text}</h3>
			<div className={ButtonsContainer}>
				<button
					onClick={closePopup}
					className={`${Button} ${ButtonCancel}`}
				>
					<FiX />
					Cancel
				</button>
				<button
					onClick={confirmAction}
					className={`${Button} ${ButtonContinue}`}
				>
					<FiCheck />
					Continue
				</button>
			</div>
		</Modal>
	);
});

export default ConfirmationPopup;
