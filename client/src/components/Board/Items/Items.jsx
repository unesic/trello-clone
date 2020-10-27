import React, { useState, useContext, useGlobal } from "reactn";
import { useFeathers } from "figbird";
import { Droppable } from "react-beautiful-dnd";
import { FiPlus } from "react-icons/fi";

import { ItemsContainer, Button, ButtonAdd } from "./Items.module.css";
import { AppContext } from "../../../App/App";
import Item from "../Item/Item";

const Items = ({ listItems, listId }) => {
	const listsService = useFeathers().service("lists");
	const itemsService = useFeathers().service("items");

	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");
	const [, setJustCreated] = useGlobal("justCreated");

	const context = useContext(AppContext);

	const [items, setItems] = useState(listItems);

	const createItem = async () => {
		const newItem = await itemsService.create({});
		const newItems = items.length ? [...items, newItem] : [newItem];

		setItems(newItems);
		setJustCreated(true);
		await listsService.patch(listId, { items: newItems }, { user });
	};

	const removeItem = (id) => {
		const newItems = items.filter((itemId) => itemId !== id);
		setItems(newItems);

		listsService.patch(listId, { items: newItems }, { user });
		itemsService.remove(id);
	};

	// itemsService.on("created", () => {
	// 	listsService.get(listId).then((list) => {
	// 		console.log(list.items);
	// 		// setItems(list.items);
	// 	});
	// });

	listsService.on("patched", (list) => {
		if (JSON.stringify(list.items) !== JSON.stringify(items))
			setItems(list.items);
	});

	return (
		<Droppable
			droppableId={listId}
			type="items"
			isDropDisabled={context.dragging !== "items"}
		>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className={ItemsContainer}
				>
					{items.map((itemId, idx) => (
						<Item
							key={itemId}
							itemId={itemId}
							itemIdx={idx}
							remove={removeItem}
						/>
					))}
					{provided.placeholder}
					{isUserOwner ? (
						<button
							onClick={createItem}
							className={`${Button} ${ButtonAdd}`}
						>
							<FiPlus /> Add another item [S]
						</button>
					) : null}
				</div>
			)}
		</Droppable>
	);
};

export default Items;
