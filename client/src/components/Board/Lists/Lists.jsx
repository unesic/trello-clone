import React, { useGlobal, useState, useEffect } from "reactn";
import { useFeathers } from "figbird";
import { Droppable } from "react-beautiful-dnd";
import { FiPlus } from "react-icons/fi";

import {
	ListsContainer,
	ButtonNewList,
	NewListContainer,
} from "./Lists.module.css";
import List from "../List/List";

const Lists = ({ boardLists, boardId }) => {
	const boardsService = useFeathers().service("boards");
	const listsService = useFeathers().service("lists");

	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");
	const [, setJustCreated] = useGlobal("justCreated");

	const [lists, setLists] = useState(boardLists);

	useEffect(() => {
		setLists(boardLists);
	}, [boardLists]);

	const addListHandler = async () => {
		const newList = await listsService.create({});
		const newLists = lists.length ? [...lists, newList._id] : [newList._id];

		setLists(newLists);
		setJustCreated(true);
		await boardsService.patch(boardId, { lists: newLists }, { user });
	};

	const removeList = (id) => {
		const newLists = lists.filter((listId) => listId !== id);
		setLists(newLists);

		boardsService.patch(boardId, { lists: newLists }, { user });
		listsService.remove(id);
	};

	return (
		<Droppable
			droppableId="lists-container"
			type="lists"
			direction="horizontal"
		>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className={ListsContainer}
				>
					{lists.map((listId, idx) => (
						<List
							key={listId}
							listId={listId}
							listIdx={idx}
							remove={removeList}
						/>
					))}
					{provided.placeholder}
					{isUserOwner ? (
						<div className={NewListContainer}>
							<button
								onClick={addListHandler}
								className={ButtonNewList}
							>
								<FiPlus /> Add another list
							</button>
						</div>
					) : null}
				</div>
			)}
		</Droppable>
	);
};

export default Lists;
