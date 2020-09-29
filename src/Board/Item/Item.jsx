import React, { useState, useReducer, useContext, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiMoreHorizontal, FiCheckCircle, FiX } from "react-icons/fi";

import reducer from "./Item.reducer";
import { AppContext } from "../../App/App";
import StatusIcon from "./StatusIcon";
import Text from "../Text";
import {
	SingleItemWrapper,
	SingleItem,
	ItemDone,
	ActiveItem,
	Dragging,
	Name,
	ButtonOptions,
} from "./Item.module.css";

const Item = ({ item, itemIndex, listId }) => {
	const context = useContext(AppContext);
	const [state, dispatch] = useReducer(reducer, item);
	const [statusIcon, setStatusIcon] = useState(<FiCheckCircle />);

	useEffect(() => {
		dispatch({
			type: "UPDATE_ITEM",
			payload: item,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(item)]);

	useEffect(() => {
		const newLists = [...context.lists];

		const listIdx = newLists.findIndex((list) => list.id === listId);
		if (listIdx < 0) return;

		newLists[listIdx].items[itemIndex] = { ...state };

		context.setLists(newLists);

		if (context.clickedItem) {
			context.setClickedItem({
				...state,
				listId,
				dispatch,
				pos: { ...context.clickedItem.pos },
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(state)]);

	const toggleOptions = (e) => {
		const { top, left } = e.target.getBoundingClientRect();
		const data = {
			...item,
			listId,
			pos: {
				top,
				left,
			},
			dispatch,
		};
		context.setClickedItem(data);
	};

	const setStatus = (enter) => {
		if (enter) {
			if (state.done) setStatusIcon(<FiX />);
			else setStatusIcon(<FiCheckCircle />);
		} else {
			setStatusIcon(<FiCheckCircle />);
		}
	};

	const singleItemClasses = (isDragging) => {
		const item = context.clickedItem;
		return [
			SingleItem,
			isDragging ? Dragging : "",
			item && item.id === state.id ? ActiveItem : "",
			state.done ? ItemDone : "",
		].join(" ");
	};

	return (
		<Draggable draggableId={state.id} index={itemIndex}>
			{(provided, snapshot) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className={SingleItemWrapper}
				>
					<div className={singleItemClasses(snapshot.isDragging)}>
						<StatusIcon
							done={state.done}
							icon={statusIcon}
							dispatch={dispatch}
							setIcon={setStatusIcon}
							setStatus={setStatus}
						/>
						<Text
							type="name"
							onSave={({ text }) => {
								dispatch({
									type: "SET_NAME",
									payload: text,
								});
							}}
							styles={Name}
						>
							{state.name}
						</Text>
						<button
							onClick={toggleOptions}
							className={ButtonOptions}
						>
							<FiMoreHorizontal />
						</button>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Item;
