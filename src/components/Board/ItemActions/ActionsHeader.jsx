import React from "react";
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
	const onSave = ({ type, text }) => {
		dispatch({
			type: `SET_${type.toUpperCase()}`,
			payload: text,
		});
	};

	return (
		<header className={HeaderWrapper}>
			<EditableText
				type="name"
				onSave={onSave}
				styles={Name}
				placeholder="Item title"
			>
				{name}
			</EditableText>
			<EditableText
				type="description"
				onSave={onSave}
				styles={Description}
				placeholder="Item description"
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
