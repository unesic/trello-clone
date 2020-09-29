import React from "react";
import { FiX } from "react-icons/fi";

import Text from "../Text";
import {
	HeaderWrapper,
	Button,
	ButtonClose,
	Name,
	Description,
} from "./OptionsPopup.module.css";

const Header = ({ name, description, dispatch, onClose }) => {
	const onSave = ({ type, text }) => {
		dispatch({
			type: `SET_${type.toUpperCase()}`,
			payload: text,
		});
	};

	return (
		<header className={HeaderWrapper}>
			<Text type="name" onSave={onSave} styles={Name}>
				{name}
			</Text>
			<Text
				type="description"
				onSave={onSave}
				styles={Description}
			>
				{description}
			</Text>
			<button onClick={onClose} className={`${Button} ${ButtonClose}`}>
				<FiX />
			</button>
		</header>
	);
};

export default Header;
