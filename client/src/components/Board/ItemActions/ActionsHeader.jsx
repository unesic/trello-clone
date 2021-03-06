import React, { useGlobal } from "reactn";
import { FiX } from "react-icons/fi";

import EditableText from "../../../ui/EditableText/EditableText";
import {
	HeaderWrapper,
	Button,
	ButtonClose,
	Name,
	Description,
} from "./ItemActions.module.css";

const ActionsHeader = ({ name, description, dispatch, onClose }) => {
	const [isUserOwner] = useGlobal("isUserOwner");

	const onSave = ({ type, text }) => {
		switch (type) {
			case "name":
				dispatch({
					type: "SET_NAME",
					payload: text.trim(),
				});
				break;
			case "description":
				dispatch({
					type: "SET_DESCRIPTION",
					payload:
						text.trim().split("\n").join("") !== ""
							? text.trim().replaceAll("\n", "\\n")
							: "",
				});
				break;
			default:
				break;
		}
	};

	return (
		<header className={HeaderWrapper}>
			<EditableText
				type="name"
				onSave={onSave}
				styles={Name}
				placeholder="Item title"
				isOwner={isUserOwner}
			>
				{name}
			</EditableText>
			<EditableText
				type="description"
				onSave={onSave}
				styles={Description}
				placeholder="Item description"
				isOwner={isUserOwner}
			>
				{description}
			</EditableText>
			<button onClick={onClose} className={`${Button} ${ButtonClose}`}>
				<FiX />
			</button>
		</header>
	);
};

export default ActionsHeader;
