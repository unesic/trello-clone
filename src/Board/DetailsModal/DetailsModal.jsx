import React, { useContext } from "react";
// import { FiX } from "react-icons/fi";

import { AppContext } from "../../App/App";
import Modal from "../../Modal/Modal";
import Header from "./Header/Header";
import Comments from "./Comments/Comments";
import Checklist from "./Checklist/Checklist";
import { DetailsPopup } from "./DetailsModal.module.css";

const DetailsModal = () => {
	const context = useContext(AppContext);

	return (
		<Modal
			visible={context.details}
			close={context.toggleDetails}
			classes={DetailsPopup}
		>
			<Header {...context.clickedItem} />
			<Checklist {...context.clickedItem} />
			<Comments {...context.clickedItem} />
		</Modal>
	);
};

export default DetailsModal;
