import React, { useGlobal } from "reactn";

import EditableText from "../../../../ui/EditableText/EditableText";

import { HeaderContainer, Name, Description } from "./DetailsHeader.module.css";

const Header = ({ name, description, done, dispatch }) => {
	const [isUserOwner] = useGlobal("isUserOwner");

	const onSave = ({ type, text }) => {
		dispatch({
			type: `SET_${type.toUpperCase()}`,
			payload: text,
		});
	};

	return (
		<header className={HeaderContainer}>
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
		</header>
	);
};

export default Header;
