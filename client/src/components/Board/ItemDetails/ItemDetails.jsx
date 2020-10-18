import React, { useContext } from "react";
import { FiX } from "react-icons/fi";

import { AppContext } from "../../../App/App";

import Modal from "../../../ui/Modal/Modal";
import Header from "./DetailsHeader/DetailsHeader";
import Checklist from "./Checklist/Checklist";
import Comments from "./Comments/Comments";
import Sidebar from "./Sidebar/Sidebar";

import { DetailsPopup, ButtonClose, Main, MainInner } from "./ItemDetails.module.css";

const ItemDetails = () => {
	const context = useContext(AppContext);

	return (
		<Modal
			visible={context.details}
			close={context.toggleDetails}
			classes={DetailsPopup}
		>
			<button onClick={context.toggleDetails} className={ButtonClose}>
				<FiX />
			</button>
			<Header {...context.clickedItem} />
			<div className={Main}>
				<div className={MainInner}>
					<Checklist {...context.clickedItem} />
					<Comments {...context.clickedItem} />
				</div>
				<Sidebar {...context.clickedItem} />
			</div>
		</Modal>
	);
};

export default ItemDetails;
