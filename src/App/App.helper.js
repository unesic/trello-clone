const reorderLists = (lists, source, destination) => {
	const newLists = [...lists];
	const [moved] = newLists.splice(source.index, 1);
	newLists.splice(destination.index, 0, moved);

	return newLists;
};

const reorderItems = (lists, source, destination) => {
	const newLists = [...lists];

	const srcList = newLists.find((list) => list.id === source.droppableId);
	const desList = newLists.find(
		(list) => list.id === destination.droppableId
	);
	const srcListIndex = newLists.findIndex((list) => list.id === srcList.id);
	const desListIndex = newLists.findIndex((list) => list.id === desList.id);

	const [moved] = srcList.items.splice(source.index, 1);
	desList.items.splice(destination.index, 0, moved);

	newLists[srcListIndex] = { ...srcList };
	newLists[desListIndex] = { ...desList };

	return newLists;
};

const reorder = (lists, type, source, destination) => {
	if (type === "lists") return reorderLists(lists, source, destination);
	else if (type === "items") return reorderItems(lists, source, destination);
};

export default reorder;
