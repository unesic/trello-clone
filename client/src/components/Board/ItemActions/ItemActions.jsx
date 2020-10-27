import React, { useContext, useEffect, useGlobal } from "reactn";
import { useFeathers } from "figbird";

import { AppContext } from "../../../App/App";
import useVisible from "../../../lib/useVisible";

import ActionsHeader from "./ActionsHeader";
import Actions from "./Actions";

import { OptionsWrapper, Active, OptionsInner } from "./ItemActions.module.css";

const ItemActions = () => {
	const itemsService = useFeathers().service("items");

	const [user] = useGlobal("user");
	const [, setConfirmPopupVisible] = useGlobal("confirmPopupVisible");
	const [, setConfirmPopupData] = useGlobal("confirmPopupData");
	const context = useContext(AppContext);

	const { ref, isVisible, setIsVisible } = useVisible(false);

	useEffect(() => {
		if (context.clickedItem && !context.details) setIsVisible(true);
		else setIsVisible(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(context.clickedItem)]);

	useEffect(() => {
		if (!isVisible && !context.details) context.setClickedItem(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	const closeOptionsHandler = () => {
		setIsVisible(false);

		if (!context.details) {
			context.setClickedItem(null);
		}
	};

	const toggleDetailsHandler = () => {
		setIsVisible(false);
		context.toggleDetails(true);
	};

	const markItemHandler = () => {
		const { _id, done, dispatch } = context.clickedItem;
		dispatch({
			type: "SET_DONE",
			payload: !done,
		});
		itemsService.patch(_id, { done: !done }, { user });
		setIsVisible(false);

		if (!context.details) context.setClickedItem(null);
	};

	const deleteItemHandler = () => {
		setConfirmPopupData({
			action: () => {
				const { _id, remove } = context.clickedItem;
				remove(_id);
				context.setClickedItem(null);
			},
			text: `Delete item${
				context.clickedItem.name !== ""
					? ` "${context.clickedItem.name}"`
					: ""
			}?`,
		});
		setConfirmPopupVisible(true);
	};

	const classes = [OptionsWrapper, isVisible ? Active : ""].join(" ");
	const styles = context.clickedItem && {
		...context.clickedItem.pos,
	};

	return (
		<div className={classes} style={styles}>
			<div className={OptionsInner} ref={ref}>
				<ActionsHeader
					{...context.clickedItem}
					onClose={closeOptionsHandler}
				/>
				<Actions
					onToggle={toggleDetailsHandler}
					onMark={markItemHandler}
					onDelete={deleteItemHandler}
					{...context.clickedItem}
				/>
			</div>
		</div>
	);
};

export default ItemActions;
