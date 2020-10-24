import React, { useContext, useCallback, useGlobal } from "reactn";
import { Draggable } from "react-beautiful-dnd";
import { FiPlus } from "react-icons/fi";

import { AppContext } from "../../../App/App";
import Items from "../Items/Items";
import Header from "./ListHeader";

import {
	SingleListWrapper,
	SingleList,
	NotOwner,
	Dragging,
	Button,
	ButtonAdd,
} from "./List.module.css";

const List = ({ list: { id, name, items }, listIdx }) => {
	const [isUserOwner] = useGlobal("isUserOwner");
	const [, setJustCreated] = useGlobal("justCreated");

	const context = useContext(AppContext);

	const saveListHandler = useCallback(
		({ type, text }) => {
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

		setJustCreated(true);
		context.setLists(newLists);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.lists]);

	return (
		<Draggable
			draggableId={id}
			index={listIdx}
			isDragDisabled={!isUserOwner}
		>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={SingleListWrapper}
				>
					<div
						className={`${SingleList} ${
							!isUserOwner ? NotOwner : ""
						} ${snapshot.isDragging && Dragging}`.trim()}
					>
						<Header
							saveList={saveListHandler}
							removeList={removeListHandler}
							name={name}
						/>
						<Items items={items} listId={id} />
						{isUserOwner ? (
							<button
								onClick={addItemHandler}
								className={`${Button} ${ButtonAdd}`}
							>
								<FiPlus /> Add another item
							</button>
						) : null}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default List;
