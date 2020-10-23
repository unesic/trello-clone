import React, { useCallback, useGlobal } from "reactn";
import { FiCheckCircle, FiX } from "react-icons/fi";

import { Done, Show, NotOwner } from "./Item.module.css";

const StatusIcon = ({ done, icon, dispatch, setIcon, setStatus }) => {
	const [isUserOwner] = useGlobal("isUserOwner");

	const onClickHandler = useCallback(() => {
		dispatch({
			type: "SET_DONE",
			payload: !done,
		});
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
