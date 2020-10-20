import React, { useContext, useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiPlus } from "react-icons/fi";

import { AppContext } from "../../../App/App";
import Items from "../Items/Items";
import Header from "./ListHeader";

import {
	SingleListWrapper,
	SingleList,
	Dragging,
	Button,
	ButtonAdd,
} from "./List.module.css";

const List = ({ list: { id, name, items }, listIdx }) => {
	const context = useContext(AppContext);

	const saveListHandler = useCallback(
		({ type, text }) => {
			console.log("updated list", id, text);
			const newLists = [...context.lists];
			newLists[listIdx][type] = text;

			context.setLists(newLists);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[context.lists]
	);

	const removeListHandler = useCallback(() => {
		const newLists = [...context.lists].filter((list) => list.id !== id);
		context.setLists(newLists);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.lists]);

	const addItemHandler = useCallback(() => {
		const newLists = [...context.lists];
		const listIdx = newLists.findIndex((list) => list.id === id);

		if (listIdx < 0) return;

		newLists[listIdx].items.push({
			id: "item-" + Date.now(),
			name: "",
			description: "",
			done: false,
			comments: [],
			checklist: [],
			tags: [],
		});

		context.setLists(newLists);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.lists]);

	return (
		<Draggable draggableId={id} index={listIdx}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={SingleListWrapper}
				>
					<div
						className={`${SingleList} ${
							snapshot.isDragging && Dragging
						}`}
					>
						<Header
							saveList={saveListHandler}
							removeList={removeListHandler}
							name={name}
						/>
						<Items items={items} listId={id} />
						<button
							onClick={addItemHandler}
							className={`${Button} ${ButtonAdd}`}
						>
							<FiPlus /> Add another item
						</button>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default List;
