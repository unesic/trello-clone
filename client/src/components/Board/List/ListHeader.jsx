import React from "react";
import { FiX } from "react-icons/fi";

import EditableText from "../../../ui/EditableText/EditableText";
import { ListHeader, Name, Button, ButtonDelete } from "./List.module.css";

const Header = ({ saveList, removeList, name }) => {
	return (
		<header className={ListHeader}>
			<EditableText type="name" onSave={saveList} styles={Name} placeholder="Item title">
				{name}
			</EditableText>
			<button
				onClick={removeList}
				className={`${Button} ${ButtonDelete}`}
			>
				<FiX />
			</button>
		</header>
	);
};

export default Header;
