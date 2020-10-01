import React, { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";

import getTimestamp from "./CommentHeader.helper";

import {
	HeaderContainer,
	Avatar,
	HeaderText,
	Username,
	Name,
	Timestamp,
	ExactTime,
	ButtonDelete,
} from "./CommentHeader.module.css";

const Header = ({ username, name, image, timestamp, isOwner, onDelete }) => {
	const [time, setTime] = useState(getTimestamp(timestamp));

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(getTimestamp(timestamp));
		}, 30000);

		return () => clearInterval(interval);
	}, [timestamp, setTime]);

	return (
		<header className={HeaderContainer}>
			<img src={image} alt={`${name}'s Avatar`} className={Avatar} />
			<div className={HeaderText}>
				<h4 className={Name}>{name}</h4>
				<a href="/" className={Username}>
					@{username}
				</a>
			</div>

			<small className={Timestamp}>
				{time.timestamp} <span className={ExactTime}>{time.exact}</span>
			</small>

			{isOwner ? (
				<button onClick={onDelete} className={ButtonDelete}>
					<FiTrash />
				</button>
			) : null}
		</header>
	);
};

export default Header;
