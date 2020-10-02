import React, {
	createContext,
	useState,
	useEffect,
	useRef,
	useCallback,
	useGlobal,
} from "reactn";
import { DragDropContext } from "react-beautiful-dnd";

import useToggle from "./hooks/useToggle";
import reorder from "./App/App.helper";

import Lists from "./components/Board/Lists/Lists";
import ItemActions from "./components/Board/ItemActions/ItemActions";
import ItemDetails from "./components/Board/ItemDetails/ItemDetails";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import { AppContainer } from "./App/App.module.css";

export const AppContext = createContext();

const App = () => {
	const [user, setUser] = useGlobal("user");

	const [lists, setLists] = useState([]);
	const [dragging, setDragging] = useState();
	const [clickedItem, setClickedItem] = useState();
	const [details, toggleDetails] = useToggle(false);
	const listsRef = useRef(false);

	useEffect(() => {
		const localLists = JSON.parse(localStorage.getItem("lists"));
		if (localLists && localLists !== null) setLists(localLists);
	}, []);

	useEffect(() => {
		if (listsRef.current)
			localStorage.setItem("lists", JSON.stringify(lists));
		else listsRef.current = true;
	}, [lists]);

	useEffect(() => {
		if (!details) setClickedItem(null);
	}, [details]);

	const onDragStart = useCallback((res) => {
		setDragging(res.type);
	}, []);

	const onDragEnd = (res) => {
		if (!res.destination) return;

		const { type, source, destination } = res;
		const newLists = reorder(lists, type, source, destination);

		setLists(newLists);
		setDragging(null);
	};

	return (
		<div className={AppContainer}>
			<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
				<AppContext.Provider
					value={{
						user,
						setUser,
						lists,
						setLists,
						dragging,
						clickedItem,
						setClickedItem,
						details,
						toggleDetails,
					}}
				>
					{lists ? <Lists /> : "Loading..."}

					<ItemActions />
					<ItemDetails />
					<SideDrawer />
				</AppContext.Provider>
			</DragDropContext>
		</div>
	);
};

export default App;
