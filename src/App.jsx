import React, {
	createContext,
	useState,
	useEffect,
	useRef,
	useReducer,
	useCallback,
} from "react";
import { DragDropContext } from "react-beautiful-dnd";

import reducer from "./App/reducer";
import reorder from "./App/App.helper";

import Lists from "./components/Lists/Lists";
import OptionsPopUp from "./components/OptionsPopup/OptionsPopup";
import BackgroundPicker from "./components/BackgroundPicker/BackgroundPicker";
import { AppContainer } from "./App/App.module.css";

export const AppContext = createContext();

const App = () => {
	const [lists, setLists] = useState([]);
	const [dragging, setDragging] = useState();
	const [clickedItem, setClickedItem] = useState();
	const [appStyle, dispatch] = useReducer(reducer, {
		backgroundImage: undefined,
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
		<div
			style={{
				height: "100%",
				backgroundImage: appStyle.backgroundImage,
				backgroundColor:
					appStyle.backgroundColor !== "unset"
						? appStyle.backgroundColor
						: null,
			}}
			className={`${AppContainer} ${appStyle.mode} ${
				appStyle.transparency ? "transparent" : ""
			}`}
		>
			<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
				<AppContext.Provider
					value={{
						lists,
						setLists,
						dragging,
						clickedItem,
						setClickedItem,
						appStyle,
						dispatch,
					}}
				>
					{lists ? <Lists /> : "Loading..."}
					<OptionsPopUp />
					<BackgroundPicker />
				</AppContext.Provider>
			</DragDropContext>
		</div>
	);
};

export default App;
