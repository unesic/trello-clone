import React, {
	useState,
	useReducer,
	useContext,
	useEffect,
	useGlobal,
} from "reactn";
import { useFeathers } from "figbird";
import { Draggable } from "react-beautiful-dnd";
import {
	FiMoreHorizontal,
	FiCheckCircle,
	FiCheckSquare,
	FiX,
} from "react-icons/fi";

import * as dataParser from "../../../lib/dataParser";
import reducer from "./Item.reducer";
import { AppContext } from "../../../App/App";
import StatusIcon from "./StatusIcon";
import EditableText from "../../../ui/EditableText/EditableText";
import {
	SingleItemWrapper,
	SingleItem,
	ItemDone,
	ActiveItem,
	Dragging,
	ItemTags,
	ItemTag,
	TagName,
	Name,
	ButtonOptions,
	ItemChecklist,
	Completed,
} from "./Item.module.css";

const Item = React.memo(({ itemId, itemIdx, remove }) => {
	const itemsService = useFeathers().service("items");

	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");
	const [, setJustCreated] = useGlobal("justCreated");

	const context = useContext(AppContext);

	const [state, dispatch] = useReducer(reducer, undefined);
	const [statusIcon, setStatusIcon] = useState(<FiCheckCircle />);
	const [checklist, setChecklist] = useState({
		done: null,
		total: null,
		completed: false,
	});

	useEffect(() => {
		updateItem();
	}, []);

	itemsService.on("patched", (item) => {
		if (JSON.stringify(item) !== JSON.stringify(state)) {
			dispatch({
				type: "UPDATE_ITEM",
				payload: item,
			});
			if (context.clickedItem) {
				context.setClickedItem({
					...context.clickedItem,
					name: item.name,
					description: item.description,
					done: item.done,
					checklist: dataParser.fromString(item.checklist),
				});
			}
		}
	});

	const updateItem = () => {
		itemsService.get(itemId).then((item) => {
			dispatch({
				type: "UPDATE_ITEM",
				payload: item,
			});
		});
	};

	useEffect(() => {
		if (state && state.checklist !== "") {
			const checklist = dataParser.fromString(state.checklist);
			const total = checklist.length;
			if (total) {
				const { done } = checklist.reduce((a, b) => ({
					done: a.done + b.done,
				}));

				setChecklist({
					done: +done,
					total: total,
					completed: done === total,
				});
			} else {
				setChecklist({
					done: null,
					total: null,
					completed: false,
				});
			}
		}
	}, [state]);

	const toggleOptions = (e) => {
		const { top, left } = e.target.getBoundingClientRect();
		const data = {
			...state,
			checklist: dataParser.fromString(state.checklist),
			pos: {
				top,
				left,
			},
			dispatch,
			remove: remove,
		};
		context.setClickedItem(data);
		setJustCreated(false);
	};

	const setStatus = (enter) => {
		if (enter) {
			if (state.done) setStatusIcon(<FiX />);
			else setStatusIcon(<FiCheckCircle />);
		} else {
			setStatusIcon(<FiCheckCircle />);
		}
	};

	const singleItemClasses = (isDragging) => {
		const item = context.clickedItem;
		return [
			SingleItem,
			isDragging ? Dragging : "",
			item && item.id === state.id ? ActiveItem : "",
			state.done ? ItemDone : "",
		].join(" ");
	};

	return (
		state && (
			<Draggable
				draggableId={state._id}
				index={itemIdx}
				isDragDisabled={!isUserOwner}
			>
				{(provided, snapshot) => (
					<div
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						className={SingleItemWrapper}
					>
						<div className={singleItemClasses(snapshot.isDragging)}>
							<StatusIcon
								itemId={state._id}
								done={state.done}
								icon={statusIcon}
								dispatch={dispatch}
								setIcon={setStatusIcon}
								setStatus={setStatus}
							/>
							{state.tags && state.tags.length ? (
								<ul className={ItemTags}>
									{state.tags.map((tag) => (
										<li
											key={tag.id}
											className={ItemTag}
											style={{
												backgroundColor: tag.color,
											}}
										>
											<span className={TagName}>
												{tag.name}
											</span>
										</li>
									))}
								</ul>
							) : null}
							<EditableText
								type="name"
								onSave={({ text }) => {
									dispatch({
										type: "SET_NAME",
										payload: text.trim(),
									});
									itemsService.patch(
										itemId,
										{ name: text },
										{ user }
									);
								}}
								styles={Name}
								placeholder="Item title"
								isOwner={isUserOwner}
							>
								{state.name}
							</EditableText>
							<button
								onClick={toggleOptions}
								className={ButtonOptions}
							>
								<FiMoreHorizontal />
							</button>
							{checklist.total ? (
								<p
									className={`${ItemChecklist} ${
										checklist.completed ? Completed : ""
									}`.trim()}
								>
									<FiCheckSquare />{" "}
									{`${checklist.done}/${checklist.total}`}
								</p>
							) : null}
						</div>
					</div>
				)}
			</Draggable>
		)
	);
});

export default Item;
