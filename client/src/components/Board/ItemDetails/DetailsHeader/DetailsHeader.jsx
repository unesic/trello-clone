import React from "react";

import EditableText from "../../../../ui/EditableText/EditableText";

import { HeaderContainer, Name, Description } from "./DetailsHeader.module.css";

const Header = ({ name, description, done, dispatch }) => {
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
		</header>
	);
};

export default Header;
