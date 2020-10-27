import React, { useGlobal, useContext } from "reactn";
import { useFeathers } from "figbird";
import { Draggable } from "react-beautiful-dnd";
import { FiCheckSquare, FiTrash } from "react-icons/fi";

import { AppContext } from "../../../../App/App";

import * as dataParser from "../../../../lib/dataParser";
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

const Item = ({
	idx,
	dispatch,
	checklist,
	itemId,
	id,
	title,
	done,
	initial,
}) => {
	const itemsService = useFeathers().service("items");

	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");

	const context = useContext(AppContext);

	const [, setConfirmPopupVisible] = useGlobal("confirmPopupVisible");
	const [, setConfirmPopupData] = useGlobal("confirmPopupData");

	const toggleDone = () => {
		const newChecklist = [...checklist].map((item, i) => {
			if (i === idx) item.done = !item.done;
			return item;
		});
		dispatch({
			type: "SET_CHECKLIST",
			payload: dataParser.toString(newChecklist),
		});
		context.setClickedItem({
			...context.clickedItem,
			checklist: newChecklist,
		});
		itemsService.patch(
			itemId,
			{ checklist: dataParser.toString(newChecklist) },
			{ user }
		);
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
		setConfirmPopupData({
			action: () => {
				dispatch({
					type: "SET_CHECKLIST",
					payload: [...checklist].filter((_, i) => i !== idx),
				});
			},
			text: "Delete checklist item?",
		});
		setConfirmPopupVisible(true);
	};

	return (
		<Draggable draggableId={id} index={idx} isDragDisabled={!isUserOwner}>
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
						{isUserOwner ? (
							<button
								className={`${ItemIcon} ${IconDone}`}
								onClick={toggleDone}
							>
								<FiCheckSquare />
							</button>
						) : null}
						<EditableText
							type="checklist"
							onSave={updateTitle}
							styles={ItemText}
							idx={idx}
							initial={initial}
							placeholder="Checklist item"
							isOwner={isUserOwner}
						>
							{title}
						</EditableText>
						{isUserOwner ? (
							<button
								className={`${ItemIcon} ${IconDelete}`}
								onClick={removeItem}
							>
								<FiTrash />
							</button>
						) : null}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Item;
