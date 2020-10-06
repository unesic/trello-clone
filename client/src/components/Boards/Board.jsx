import React from "react";
import { Link } from "react-router-dom";

import {
	SingleBoard,
	BoardLink,
	BoardImage,
	BoardTitle,
} from "./Boards.module.css";

const Board = ({ _id, image, name }) => {
	return (
		<div className={SingleBoard}>
			<Link to={`/b/${_id}`} className={BoardLink}>
				{image && (
					<img
						src={image}
						alt={`${name} board`}
						className={BoardImage}
					/>
				)}
				<h3 className={BoardTitle}>{name}</h3>
			</Link>
		</div>
	);
};

export default Board;
