import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import {
	TagContainer,
	Hovering,
	TagButton,
	TagColor,
	RemoveButton,
} from "./Tag.module.css";

const Tag = ({ clicked, deleted, id, name, color }) => {
	const [hovering, setHovering] = useState(false);

	return (
		<div
			className={`${TagContainer} ${hovering ? Hovering : ""}`}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<button
				className={TagButton}
				onClick={() => clicked({ id, name, color })}
			>
				<span
					className={TagColor}
					style={{ backgroundColor: `${color}` }}
				></span>
				{name}
			</button>
			<button className={RemoveButton} onClick={() => deleted(id)}>
				<FiTrash2 />
			</button>
		</div>
	);
};

export default Tag;
