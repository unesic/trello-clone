import React from "react";
import { FiX } from "react-icons/fi";

import Text from "../Text";
import { ListHeader, Name, Button, ButtonDelete } from "./List.module.css";

const Header = ({ saveList, removeList, name }) => {
	return (
		<header className={ListHeader}>
			<Text type="name" onSave={saveList} styles={Name}>
				{name}
			</Text>
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
