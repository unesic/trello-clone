import React, { useGlobal, useContext } from "reactn";
import { useFeathers } from "figbird";
import { Droppable } from "react-beautiful-dnd";
import { FiPlus } from "react-icons/fi";

import { AppContext } from "../../../../App/App";

import * as dataParser from "../../../../lib/dataParser";
import ProgressBar from "./ProgressBar/ProgressBar";
import ChecklistItem from "./ChecklistItem";
import { Instruction } from "../../../../ui/styledComponents";
import {
	ChecklistContainer,
	NewItemButton,
	Title,
	ChecklistWrapper,
	IsDraggedInside,
} from "./Checklist.module.css";

const Checklist = ({ _id: itemId, checklist, dispatch }) => {
	const itemsService = useFeathers().service("items");

	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");

	const context = useContext(AppContext);

	const newItemHandler = () => {
		const newItem = {
			id: "checklist-item-" + Date.now(),
			title: "",
			done: false,
		};
		const newChecklist = checklist.length
			? [...checklist, newItem]
			: [newItem];
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

	return (
		<div className={ChecklistContainer}>
			<h3 className={Title}>Checklist</h3>

			<ProgressBar checklist={checklist} />

			<Droppable droppableId={itemId} type="checklist">
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={`${ChecklistWrapper} ${
							snapshot.draggingOverWith ? IsDraggedInside : ""
						}`}
					>
						{checklist && checklist.length ? (
							checklist.map((item, idx) => (
								<ChecklistItem
									key={item.id}
									idx={idx}
									dispatch={dispatch}
									checklist={checklist}
									itemId={itemId}
									{...item}
								/>
							))
						) : (
							<Instruction>No items in checklist...</Instruction>
						)}
						{provided.placeholder}
					</div>
				)}
			</Droppable>

			{isUserOwner ? (
				<button onClick={newItemHandler} className={NewItemButton}>
					<FiPlus /> Add new item
				</button>
			) : null}
		</div>
	);
};

export default Checklist;
