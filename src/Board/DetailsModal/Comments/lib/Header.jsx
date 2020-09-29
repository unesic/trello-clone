import React, { useState, useEffect } from "react";

import getTimestamp from "./Comment.helper";

import {
	HeaderContainer,
	Avatar,
	HeaderText,
	Username,
	Name,
	Timestamp,
	ExactTime,
} from "./Header.module.css";

const Header = ({ username, name, image, timestamp }) => {
	const [time, setTime] = useState(getTimestamp(timestamp));

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(getTimestamp(timestamp));
		}, 30000);

		return () => clearInterval(interval);
	}, []);

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
		</header>
	);
};

export default Header;
