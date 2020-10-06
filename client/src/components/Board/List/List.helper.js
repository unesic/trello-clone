import { useContext } from "react";
import { AppContext } from "../../../pages/App";

export const useRemoveList = (id) => {
	const context = useContext(AppContext);
	const newLists = [...context.lists].filter((list) => list.id !== id);

	return () => {
		context.setLists(newLists);
	};
};

export const useAddItem = (id) => {
	const context = useContext(AppContext);
	const newLists = [...context.lists];
	const listIdx = newLists.findIndex((list) => list.id === id);

	if (listIdx < 0) return;

	newLists[listIdx].items.push({
		id: "item-" + Date.now(),
		name: "",
		description: "",
		done: false,
	});

	return () => {
		context.setLists(newLists);
	};
};
