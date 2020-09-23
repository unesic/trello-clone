import React from "react";
import { FiTrash2, FiCheck, FiX } from "react-icons/fi";

import { Button, ButtonDelete } from "./OptionsPopup.module.css";

const Options = ({ onMark, onDelete, done }) => {
	return (
		<>
			<button onClick={onMark} className={`${Button} ${ButtonDelete}`}>
				{done ? (
					<>
						<FiX /> Mark as not done
					</>
				) : (
					<>
						<FiCheck /> Mark as done
					</>
				)}
			</button>
			<button onClick={onDelete} className={`${Button} ${ButtonDelete}`}>
				<FiTrash2 /> Remove item
			</button>
		</>
	);
};

export default Options;
