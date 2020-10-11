import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import {
	BoardActions,
	ActionButton,
	ButtonDelete,
	ButtonPin,
	Pinned,
} from "./BoardOptions.module.css";

const BoardOptions = ({ onDelete, onPin, pinned }) => {
	return (
		<div className={BoardActions}>
			<button
				onClick={onDelete}
				className={`${ActionButton} ${ButtonDelete}`}
			>
				<FiTrash2 />
			</button>
			<button
				onClick={onPin}
				className={`${ActionButton} ${ButtonPin} ${
					pinned ? Pinned : ""
				}`.trim()}
			>
				{pinned ? <AiFillStar /> : <AiOutlineStar />}
			</button>
		</div>
	);
};

export default BoardOptions;
