import React, {
	createContext,
	useState,
	useEffect,
	useRef,
	useReducer,
	useCallback,
} from "react";
import { DragDropContext } from "react-beautiful-dnd";

import dummyUser from "./App/user.json";

import useToggle from "./hooks/useToggle";
import reducer from "./App/reducer";
import reorder from "./App/App.helper";

import Lists from "./components/Board/Lists/Lists";
import ItemActions from "./components/Board/ItemActions/ItemActions";
import ItemDetails from "./components/Board/ItemDetails/ItemDetails";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import { AppContainer } from "./App/App.module.css";

export const AppContext = createContext();

const App = () => {
	const [user, setUser] = useState(dummyUser[0]);

	const [lists, setLists] = useState([]);
	const [dragging, setDragging] = useState();
	const [clickedItem, setClickedItem] = useState();
	const [details, toggleDetails] = useToggle(false);
	const [appStyle, dispatch] = useReducer(reducer, {
		backgroundImage: {
			id: undefined,
			url: undefined,
		},
		backgroundColor: undefined,
		transparency: false,
		mode: "light",
	});
	const listsRef = useRef(false);
	const styleRef = useRef(false);

	useEffect(() => {
		const localLists = JSON.parse(localStorage.getItem("lists"));
		const localStyle = JSON.parse(localStorage.getItem("appStyle"));

		if (localLists && localLists !== null) setLists(localLists);
		if (localStyle && localStyle !== null)
			dispatch({
				type: "SET_ALL",
				payload: { ...localStyle },
			});
	}, []);

	useEffect(() => {
		if (listsRef.current)
			localStorage.setItem("lists", JSON.stringify(lists));
		else listsRef.current = true;
	}, [lists]);

	useEffect(() => {
		if (styleRef.current)
			localStorage.setItem("appStyle", JSON.stringify(appStyle));
		else styleRef.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(appStyle)]);

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

	const styles = {
		height: "100%",
		backgroundImage: `url(${appStyle.backgroundImage.url})`,
		backgroundColor:
			appStyle.backgroundColor !== "unset"
				? appStyle.backgroundColor
				: null,
	};
	const classes = [
		AppContainer,
		appStyle.mode,
		appStyle.transparency ? "transparent" : "",
	].join(" ");

	return (
		<div className={classes} style={styles}>
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
						appStyle,
						dispatch,
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
