import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { FiPlus } from "react-icons/fi";

import Item from "./Item";
import {
	ChecklistContainer,
	NewItemButton,
	Title,
	ChecklistWrapper,
	IsDraggedInside,
} from "./Checklist.module.css";

const Checklist = ({ id: itemId, checklist, dispatch }) => {
	const newItemHandler = () => {
		dispatch({
			type: "SET_CHECKLIST",
			payload: [
				...checklist,
				{
					id: "checklist-item-" + Date.now(),
					title: "Checklist item",
					done: false,
				},
			],
		});
	};

	return (
		<div className={ChecklistContainer}>
			<h3 className={Title}>Checklist</h3>

			<Droppable droppableId={itemId} type="checklist">
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={`${ChecklistWrapper} ${
							snapshot.draggingOverWith ? IsDraggedInside : ""
						}`}
					>
						{checklist && checklist.length
							? checklist.map((item, idx) => (
									<Item
										key={item.id}
										idx={idx}
										dispatch={dispatch}
										checklist={checklist}
										{...item}
									/>
							  ))
							: null}
						{provided.placeholder}
					</div>
				)}
			</Droppable>

			<button onClick={newItemHandler} className={NewItemButton}>
				<FiPlus /> Add new item
			</button>
		</div>
	);
};

export default Checklist;
