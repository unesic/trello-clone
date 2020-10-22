import React, { useGlobal } from "reactn";
import { FiX } from "react-icons/fi";

import EditableText from "../../../ui/EditableText/EditableText";
import { ListHeader, Name, Button, ButtonDelete } from "./List.module.css";

const Header = ({ saveList, removeList, name }) => {
	const [isUserOwner] = useGlobal("isUserOwner");

	return (
		<header className={ListHeader}>
			<EditableText
				type="name"
				onSave={saveList}
				styles={Name}
				placeholder="Item title"
				isOwner={isUserOwner}
			>
				{name}
			</EditableText>
			{isUserOwner ? (
				<button
					onClick={removeList}
					className={`${Button} ${ButtonDelete}`}
				>
					<FiX />
				</button>
			) : null}
		</header>
	);
};

export default Header;
