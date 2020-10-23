import React, { useContext, useGlobal } from "reactn";
import { Droppable } from "react-beautiful-dnd";
import { FiPlus } from "react-icons/fi";

import { AppContext } from "../../../App/App";
import { ListsContainer, ButtonNewList } from "./Lists.module.css";
import List from "../List/List";

const Lists = () => {
	const context = useContext(AppContext);
	const [isUserOwner] = useGlobal("isUserOwner");

	const addListHandler = () => {
		const newLists = [...context.lists];
		newLists.push({
			id: "list-" + Date.now(),
			name: "",
			description: "",
			items: [],
		});

		context.setLists(newLists);
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
					{context.lists.map((list, i) => (
						<List list={list} listIdx={i} key={list.id} />
					))}
					{provided.placeholder}
					{isUserOwner ? (
						<button
							onClick={addListHandler}
							className={ButtonNewList}
						>
							<FiPlus /> Add another list
						</button>
					) : null}
				</div>
			)}
		</Droppable>
	);
};

export default Lists;
