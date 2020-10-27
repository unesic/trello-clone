import React, { createContext, useState, useEffect, useGlobal } from "reactn";
import { useFeathers } from "figbird";
import { DragDropContext } from "react-beautiful-dnd";

import { reorderLists, reorderItems } from "./App.helper";

import Lists from "../components/Board/Lists/Lists";
import ItemActions from "../components/Board/ItemActions/ItemActions";
import ItemDetails from "../components/Board/ItemDetails/ItemDetails";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import { AppContainer } from "./App.module.css";

export const AppContext = createContext();

const App = ({ _id, lists }) => {
	const boardsService = useFeathers().service("boards");
	const listsService = useFeathers().service("lists");

	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");

	const [boardLists, setBoardLists] = useState(lists);
	const [dragging, setDragging] = useState(null);
	const [clickedItem, setClickedItem] = useState(null);
	const [details, toggleDetails] = useState(false);

	useEffect(() => {
		setBoardLists(lists);
	}, [lists]);

	useEffect(() => {
		if (!details) setClickedItem(null);
	}, [details]);

	const onDragStart = (res) => {
		setDragging(res.type);
		console.log("onDragStart");
	};

	const onDragEnd = async (res) => {
		if (!res.destination) return;

		const { type, source, destination } = res;
		console.log(type);
		if (type === "lists") {
			const newLists = reorderLists(lists, source, destination);
			setBoardLists(newLists);
			boardsService.patch(_id, { lists: newLists }, { user });
		} else if (type === "items") {
			const srcListId = source.droppableId;
			const desListId = destination.droppableId;

			const srcList = await listsService.get(srcListId);
			const desList = await listsService.get(desListId);

			const [moved] = srcList.items.splice(source.index, 1);
			desList.items.splice(destination.index, 0, moved);

			listsService.patch(srcListId, { items: srcList.items }, { user });
			listsService.patch(desListId, { items: desList.items }, { user });
		}
		setDragging(null);
	};

	return (
		<div className={AppContainer}>
			<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
				<AppContext.Provider
					value={{
						dragging,
						clickedItem,
						setClickedItem,
						details,
						toggleDetails,
					}}
				>
					<Lists boardLists={boardLists} boardId={_id} />
					<ItemActions />
					<ItemDetails />
					{isUserOwner ? <SideDrawer /> : null}
				</AppContext.Provider>
			</DragDropContext>
		</div>
	);
};

export default App;
