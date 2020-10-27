import React, { useGlobal } from "reactn";
import { useFeathers } from "figbird";

import EditableText from "../../../../ui/EditableText/EditableText";

import { HeaderContainer, Name, Description } from "./DetailsHeader.module.css";

const Header = ({ _id, name, description, done, dispatch }) => {
	const itemsService = useFeathers().service("items");

	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");

	const onSave = ({ type, text }) => {
		dispatch({
			type: `SET_${type.toUpperCase()}`,
			payload: text,
		});
		itemsService.patch(_id, { [type]: text }, { user });
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
