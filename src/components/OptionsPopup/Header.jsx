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

const Header = ({ name, description, saveItemHandler, onClose }) => {
	return (
		<header className={HeaderWrapper}>
			<Text type="name" onSave={saveItemHandler} styles={Name}>
				{name}
			</Text>
			<Text
				type="description"
				onSave={saveItemHandler}
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
