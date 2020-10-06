import React, {
	createContext,
	useState,
	useEffect,
	useRef,
	useCallback,
	useGlobal,
} from "reactn";
import { DragDropContext } from "react-beautiful-dnd";

import useToggle from "../hooks/useToggle";
import reorder, { setBackground } from "./App.helper";

import Lists from "../components/Board/Lists/Lists";
import ItemActions from "../components/Board/ItemActions/ItemActions";
import ItemDetails from "../components/Board/ItemDetails/ItemDetails";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import { AppContainer } from "./App.module.css";

export const AppContext = createContext();

const App = ({
	isOwner,
	service,
	board: { _id, image, name, data, style },
}) => {
	const [user] = useGlobal("user");
	const [boardStyle, setBoardStyle] = useGlobal("boardStyle");

	const [lists, setLists] = useState([]);
	const [dragging, setDragging] = useState();
	const [clickedItem, setClickedItem] = useState();
	const [details, toggleDetails] = useToggle(false);

	const listsRef = useRef(false);
	const styleRef = useRef(false);

	useEffect(() => {
		if (data !== "") {
			const parsed = JSON.parse(data.replace(/'/g, '"'));
			parsed && parsed !== null && setLists(parsed);
		}

		if (style !== "") {
			const parsed = JSON.parse(style.replace(/'/g, '"'));
			setBoardStyle(parsed);
		}

		return () => {
			document.body.className = "";
			setBackground({
				backgroundImage: { url: null },
				backgroundColor: null,
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (listsRef.current) {
			const parsed = JSON.stringify(lists).replace(/"/g, "'");
			service.patch(_id, { data: parsed }, { user });
		} else listsRef.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lists]);

	useEffect(() => {
		if (styleRef.current) {
			const parsed = JSON.stringify(boardStyle).replace(/"/g, "'");
			service.patch(_id, { style: parsed }, { user });
		} else styleRef.current = true;

		document.body.classList = [
			boardStyle.theme,
			boardStyle.transparency ? "transparent" : "",
		].join(" ");
		setBackground(boardStyle);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [boardStyle]);

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
