import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";

import { ItemsContainer } from "./Items.module.css";
import { AppContext } from "../../App";
import Item from "../Item/Item";

const Items = ({ items, listId }) => {
	const context = useContext(AppContext);

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
					{items.map((item, i) => (
						<Item
							item={item}
							itemIndex={i}
							key={item.id}
							listId={listId}
						/>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default Items;
