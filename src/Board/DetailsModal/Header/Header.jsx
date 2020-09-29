import React from "react";

import Text from "../../Text";

import { HeaderContainer, Name, Description } from "./Header.module.css";

const Header = ({ name, description, done, dispatch }) => {
	const onSave = ({ type, text }) => {
		dispatch({
			type: `SET_${type.toUpperCase()}`,
			payload: text,
		});
	};

	return (
		<header className={HeaderContainer}>
			<Text type="name" onSave={onSave} styles={Name}>
				{name}
			</Text>
			<Text type="description" onSave={onSave} styles={Description}>
				{description}
			</Text>
		</header>
	);
};

export default Header;
