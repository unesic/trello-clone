import React, { useContext, useEffect } from "react";

import Header from "./Header";
import Options from "./Options";
import { AppContext } from "../../App/App";
import useVisible from "../../lib/useVisible";
import {
	OptionsWrapper,
	Active,
	OptionsInner,
} from "./OptionsPopup.module.css";

const OptionsPopup = () => {
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
		context.toggleDetails();
	};

	const markItemHandler = () => {
		const { id, listId } = context.clickedItem;
		const newLists = [...context.lists];
		const listIdx = newLists.findIndex((list) => list.id === listId);

		if (listIdx < 0) return;

		newLists[listIdx].items.forEach((item) => {
			if (item.id === id) item.done = !item.done;
		});

		setIsVisible(false);
		context.setLists(newLists);

		if (!context.details) {
			context.setClickedItem(null);
		}
	};

	const deleteItemHandler = () => {
		const { id, listId } = context.clickedItem;
		const newLists = [...context.lists];
		const listIdx = newLists.findIndex((list) => list.id === listId);

		if (listIdx < 0) return;

		newLists[listIdx].items = newLists[listIdx].items.filter(
			(item) => item.id !== id
		);

		context.setLists(newLists);
		context.setClickedItem(null);
	};

	const classes = [OptionsWrapper, isVisible ? Active : ""].join(" ");
	const styles = context.clickedItem && {
		...context.clickedItem.pos,
	};

	return (
		<div className={classes} style={styles}>
			<div className={OptionsInner} ref={ref}>
				<Header
					{...context.clickedItem}
					onClose={closeOptionsHandler}
				/>
				<Options
					onToggle={toggleDetailsHandler}
					onMark={markItemHandler}
					onDelete={deleteItemHandler}
					{...context.clickedItem}
				/>
			</div>
		</div>
	);
};

export default OptionsPopup;
