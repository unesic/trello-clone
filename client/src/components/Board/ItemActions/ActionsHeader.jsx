import React, { useGlobal } from "reactn";
import { useFeathers } from "figbird";
import { FiX } from "react-icons/fi";

import EditableText from "../../../ui/EditableText/EditableText";
import {
	HeaderWrapper,
	Button,
	ButtonClose,
	Name,
	Description,
} from "./ItemActions.module.css";

const ActionsHeader = ({ _id, name, description, dispatch, onClose }) => {
	const itemsService = useFeathers().service("items");
	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");

	const onSave = ({ type, text }) => {
		switch (type) {
			case "name":
				const newName = text.trim();
				dispatch({
					type: "SET_NAME",
					payload: newName,
				});
				itemsService.patch(_id, { name: newName }, { user });
				break;
			case "description":
				const newDesc =
					text.trim().split("\n").join("") !== ""
						? text.trim().replaceAll("\n", "\\n")
						: "";
				dispatch({
					type: "SET_DESCRIPTION",
					payload: newDesc,
				});
				itemsService.patch(_id, { description: newDesc }, { user });
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
