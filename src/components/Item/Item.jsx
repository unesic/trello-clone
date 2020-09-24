import React, { useState, useContext, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiMoreHorizontal, FiCheckCircle, FiX } from "react-icons/fi";

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
	const [{ id, name, description, done }, setItem] = useState(item);
	const [statusIcon, setStatusIcon] = useState(<FiCheckCircle />);

	useEffect(() => {
		setItem({ ...item });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(item)]);

	const saveItemHandler = (type, text, done) => {
		const newLists = [...context.lists];
		const listIdx = newLists.findIndex((list) => list.id === listId);

		if (listIdx < 0) return;

		newLists[listIdx].items.forEach((item) => {
			if (item.id === id) {
				if (type && text) item[type] = text;
				if (done !== null && done !== undefined) item.done = !item.done;
			}
		});

		context.setLists(newLists);
	};

	const toggleOptions = (e) => {
		const { top, left } = e.target.getBoundingClientRect();
		const data = {
			id,
			name,
			description,
			done,
			listId,
			pos: {
				top,
				left,
			},
			saveItemHandler,
		};
		context.setClickedItem(data);
	};

	const setStatus = (enter) => {
		if (enter) {
			if (done) setStatusIcon(<FiX />);
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
			item && item.id === id ? ActiveItem : "",
			done ? ItemDone : "",
		].join(" ");
	};

	return (
		<Draggable draggableId={id} index={itemIndex}>
			{(provided, snapshot) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className={SingleItemWrapper}
				>
					<div className={singleItemClasses(snapshot.isDragging)}>
						<StatusIcon
							done={done}
							icon={statusIcon}
							saveItem={saveItemHandler}
							setIcon={setStatusIcon}
							setStatus={setStatus}
						/>
						<Text
							type="name"
							onSave={saveItemHandler}
							styles={Name}
						>
							{name}
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
