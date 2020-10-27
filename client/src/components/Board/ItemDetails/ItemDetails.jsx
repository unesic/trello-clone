import React, { useContext } from "react";
import { FiX } from "react-icons/fi";

import { AppContext } from "../../../App/App";

import Modal from "../../../ui/Modal/Modal";
import DetailsHeader from "./DetailsHeader/DetailsHeader";
import Checklist from "./Checklist/Checklist";
import Comments from "./Comments/Comments";
import Sidebar from "./Sidebar/Sidebar";

import {
	DetailsPopup,
	ButtonClose,
	Main,
	MainInner,
} from "./ItemDetails.module.css";

const ItemDetails = () => {
	const context = useContext(AppContext);

	return (
		<Modal
			visible={context.details}
			close={() => context.toggleDetails(false)}
			classes={DetailsPopup}
		>
			<button
				onClick={() => context.toggleDetails(false)}
				className={ButtonClose}
			>
				<FiX />
			</button>
			<DetailsHeader {...context.clickedItem} />
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
