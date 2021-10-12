import React, {
	createContext,
	useState,
	useEffect,
	useRef,
	useCallback,
	useGlobal,
} from "reactn";
import { DragDropContext } from "react-beautiful-dnd";

import useToggle from "../lib/useToggle";
import * as dataParser from "../lib/dataParser";
import reorder, { setBackground } from "./App.helper";

import Lists from "../components/Board/Lists/Lists";
import ItemActions from "../components/Board/ItemActions/ItemActions";
import ItemDetails from "../components/Board/ItemDetails/ItemDetails";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import { AppContainer } from "./App.module.css";

export const AppContext = createContext();

const App = ({ service, board: { _id, data, style, tags } }) => {
	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");
	const [boardStyle, setBoardStyle] = useGlobal("boardStyle");
	const [boardTags, setBoardTags] = useGlobal("boardTags");

	const [lists, setLists] = useState([]);
	const [dragging, setDragging] = useState();
	const [clickedItem, setClickedItem] = useState(null);
	const [details, toggleDetails] = useToggle(false);

	const listsRef = useRef(false);
	const styleRef = useRef(false);

	useEffect(() => {
		if (data !== "") {
			const parsed = dataParser.fromString(data);
			setLists(parsed);
		}

		if (style !== "") {
			const parsed = dataParser.fromString(style);
			setBoardStyle(parsed);
		}

		if (tags !== "") {
			const parsed = dataParser.fromString(tags);
			if (dataParser.toString(boardTags) !== tags) setBoardTags(parsed);
		}

		return () => {
			document.body.className = "";
			setBackground({
				backgroundImage: { url: null },
				backgroundColor: null,
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, style, tags]);

	useEffect(() => {
		if (listsRef.current) {
			const parsed = dataParser.toString(lists);
			service.patch(_id, { data: parsed }, { user });
		} else listsRef.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lists]);

	useEffect(() => {
		if (styleRef.current) {
			const parsed = dataParser.toString(boardStyle);
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
					{isUserOwner ? <SideDrawer /> : null}
				</AppContext.Provider>
			</DragDropContext>
		</div>
	);
};

export default App;
