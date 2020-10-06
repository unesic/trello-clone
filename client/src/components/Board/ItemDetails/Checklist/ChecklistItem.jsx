import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiCheckSquare, FiTrash } from "react-icons/fi";

import EditableText from "../../../../ui/EditableText/EditableText";

import {
	ChecklistItem,
	Done,
	ChecklistTitle,
	Dragging,
	ItemIcon,
	IconDone,
	IconDelete,
	ItemText,
} from "./Checklist.module.css";

const Item = ({ idx, dispatch, checklist, id, title, done, initial }) => {
	const toggleDone = () => {
		dispatch({
			type: "SET_CHECKLIST",
			payload: [...checklist].map((item, i) => {
				if (i === idx) item.done = !item.done;
				return item;
			}),
		});
	};

	const updateTitle = ({ text }) => {
		dispatch({
			type: "SET_CHECKLIST",
			payload: [...checklist].map((item, i) => {
				if (i === idx) item.title = text.trim();
				return item;
			}),
		});
	};

	const removeItem = () => {
		dispatch({
			type: "SET_CHECKLIST",
			payload: [...checklist].filter((_, i) => i !== idx),
		});
	};

	return (
		<Draggable draggableId={id} index={idx}>
			{(provided, snapshot) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className={`${ChecklistItem} ${done ? Done : ""}`}
				>
					<div
						className={`${ChecklistTitle} ${
							snapshot.isDragging ? Dragging : ""
						}`}
					>
						<button
							className={`${ItemIcon} ${IconDone}`}
							onClick={toggleDone}
						>
							<FiCheckSquare />
						</button>
						<EditableText
							type="checklist"
							onSave={updateTitle}
							styles={ItemText}
							idx={idx}
							initial={initial}
							placeholder="Checklist item"
						>
							{title}
						</EditableText>
						<button
							className={`${ItemIcon} ${IconDelete}`}
							onClick={removeItem}
						>
							<FiTrash />
						</button>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Item;
