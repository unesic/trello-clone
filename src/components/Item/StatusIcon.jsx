import React, { useCallback } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";

import { Done, Show } from "./Item.module.css";

const StatusIcon = ({ done, icon, saveItem, setIcon, setStatus }) => {
	const onClickHandler = useCallback(() => {
		saveItem(null, null, 1);
		done ? setIcon(<FiCheckCircle />) : setIcon(<FiX />);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [icon]);

	const onMouseEnterHandler = useCallback(() => {
		setStatus(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [done]);

	const onMouseLeaveHandler = useCallback(() => {
		setStatus(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [done]);

	const classes = [Done, done ? Show : ""].join(" ");

	return (
		<span
			className={classes}
			onClick={onClickHandler}
			onMouseEnter={onMouseEnterHandler}
			onMouseLeave={onMouseLeaveHandler}
		>
			{icon}
		</span>
	);
};

export default StatusIcon;
