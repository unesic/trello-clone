import React, {
	useState,
	useReducer,
	useContext,
	useEffect,
	useGlobal,
} from "reactn";
import { Draggable } from "react-beautiful-dnd";
import {
	FiMoreHorizontal,
	FiCheckCircle,
	FiCheckSquare,
	FiX,
} from "react-icons/fi";

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

const Item = ({ item, itemIndex, listId }) => {
	const context = useContext(AppContext);
	const [isUserOwner] = useGlobal("isUserOwner");
	const [, setJustCreated] = useGlobal("justCreated");

	const [state, dispatch] = useReducer(reducer, item);
	const [statusIcon, setStatusIcon] = useState(<FiCheckCircle />);
	const [checklist, setChecklist] = useState({
		done: null,
		total: null,
		completed: false,
	});

	useEffect(() => {
		const total = item.checklist.length;
		if (total) {
			const { done } = item.checklist.reduce((a, b) => ({
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
	}, [item.checklist]);

	useEffect(() => {
		dispatch({
			type: "UPDATE_ITEM",
			payload: item,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(item)]);

	useEffect(() => {
		const newLists = [...context.lists];

		const listIdx = newLists.findIndex((list) => list.id === listId);
		if (listIdx < 0) return;

		newLists[listIdx].items[itemIndex] = { ...state };

		context.setLists(newLists);

		if (context.clickedItem) {
			context.setClickedItem({
				...state,
				listId,
				dispatch,
				pos: { ...context.clickedItem.pos },
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(state)]);

	const toggleOptions = (e) => {
		const { top, left } = e.target.getBoundingClientRect();
		const data = {
			...item,
			listId,
			pos: {
				top,
				left,
			},
			dispatch,
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
		<Draggable
			draggableId={state.id}
			index={itemIndex}
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
										style={{ backgroundColor: tag.color }}
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
	);
};

export default Item;
