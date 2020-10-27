import React, { useCallback, useGlobal } from "reactn";
import { useFeathers } from "figbird";
import { FiCheckCircle, FiX } from "react-icons/fi";

import { Done, Show, NotOwner } from "./Item.module.css";

const StatusIcon = ({ itemId, done, icon, dispatch, setIcon, setStatus }) => {
	const itemsService = useFeathers().service("items");

	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");

	const onClickHandler = useCallback(() => {
		dispatch({
			type: "SET_DONE",
			payload: !done,
		});
		done ? setIcon(<FiCheckCircle />) : setIcon(<FiX />);
		itemsService.patch(itemId, { done: !done }, { user });
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

	const classes = [Done, done ? Show : "", !isUserOwner ? NotOwner : ""].join(
		" "
	);

	return (
		<span
			className={classes}
			onClick={isUserOwner ? onClickHandler : null}
			onMouseEnter={isUserOwner ? onMouseEnterHandler : null}
			onMouseLeave={isUserOwner ? onMouseLeaveHandler : null}
		>
			{icon}
		</span>
	);
};

export default StatusIcon;
