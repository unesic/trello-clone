import React, { useState, useGlobal } from "reactn";
import { FiTrash2 } from "react-icons/fi";

import {
	TagContainer,
	NotOwner,
	Hovering,
	TagButton,
	TagColor,
	RemoveButton,
} from "./Tag.module.css";

const Tag = ({ clicked, deleted, id, name, color }) => {
	const [isUserOwner] = useGlobal("isUserOwner");
	const [hovering, setHovering] = useState(false);

	return (
		<div
			className={`${TagContainer} ${!isUserOwner ? NotOwner : ""} ${
				hovering ? Hovering : ""
			}`}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<button
				className={TagButton}
				onClick={
					isUserOwner ? () => clicked({ id, name, color }) : null
				}
			>
				<span
					className={TagColor}
					style={{ backgroundColor: `${color}` }}
				></span>
				{name}
			</button>
			{isUserOwner ? (
				<button className={RemoveButton} onClick={() => deleted(id)}>
					<FiTrash2 />
				</button>
			) : null}
		</div>
	);
};

export default Tag;
