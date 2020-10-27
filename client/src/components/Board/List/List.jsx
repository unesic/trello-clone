import React, { useGlobal, useState, useEffect } from "reactn";
import { useFeathers } from "figbird";
import { Draggable } from "react-beautiful-dnd";

import Items from "../Items/Items";
import Header from "./ListHeader";

import {
	SingleListWrapper,
	SingleList,
	NotOwner,
	Dragging,
} from "./List.module.css";

const List = React.memo(({ listId, listIdx, remove }) => {
	const listsService = useFeathers().service("lists");

	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");
	const [, setConfirmPopupVisible] = useGlobal("confirmPopupVisible");
	const [, setConfirmPopupData] = useGlobal("confirmPopupData");

	const [state, setState] = useState(null);

	useEffect(() => {
		listsService.get(listId).then((list) => {
			setState(list);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const saveListHandler = ({ type, text }) => {
		listsService.patch(state._id, { [type]: text }, { user });
	};

	const removeListHandler = () => {
		setConfirmPopupData({
			action: () => {
				remove(listId);
			},
			text: `Delete list${state.name !== "" ? ` "${state.name}"` : ""}?`,
		});
		setConfirmPopupVisible(true);
	};

	return (
		state && (
			<Draggable
				draggableId={state._id}
				index={listIdx}
				isDragDisabled={!isUserOwner}
			>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={SingleListWrapper}
					>
						<div
							className={`${SingleList} ${
								!isUserOwner ? NotOwner : ""
							} ${snapshot.isDragging && Dragging}`.trim()}
						>
							<Header
								saveList={saveListHandler}
								removeList={removeListHandler}
								name={state.name}
							/>
							<Items listItems={state.items} listId={state._id} />
						</div>
					</div>
				)}
			</Draggable>
		)
	);
});

export default List;
