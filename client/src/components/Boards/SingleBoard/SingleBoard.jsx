import React, { useGlobal } from "reactn";
import { Link } from "react-router-dom";

import EditableText from "../../../ui/EditableText/EditableText";
import BoardOptions from "../BoardOptions/BoardOptions";

import { SingleBoard, BoardLink, BoardTitle } from "./SingleBoard.module.css";

const Board = ({ boards, dispatch, service, _id, name, style, pinned }) => {
	const [user] = useGlobal("user");
	const [, setConfirmPopupVisible] = useGlobal("confirmPopupVisible");
	const [, setConfirmPopupData] = useGlobal("confirmPopupData");

	const { backgroundImage, backgroundColor } = JSON.parse(
		style.replace(/'/g, '"')
	);

	const patch = async () => {
		const newBoards = { ...boards };
		const idxP = newBoards.pinned.findIndex((b) => b._id === _id);
		const idxO = newBoards.others.findIndex((b) => b._id === _id);

		if (idxP < 0 && idxO >= 0) {
			const [moved] = newBoards.others.splice(idxO, 1);
			newBoards.pinned.push({ ...moved, pinned: !pinned });
		} else if (idxP >= 0 && idxO < 0) {
			const [moved] = newBoards.pinned.splice(idxP, 1);
			newBoards.others.push({ ...moved, pinned: !pinned });
		}

		dispatch({
			type: "SET_ALL",
			payload: {
				pinned: [...newBoards.pinned],
				others: [...newBoards.others],
			},
		});

		await service.patch(_id, { pinned: !pinned }, { user });
	};

	const remove = () => {
		setConfirmPopupData({
			action: async () => {
				await service.remove({ _id });
			},
			text: `Delete board "${name}"`,
		});
		setConfirmPopupVisible(true);
	};

	const updateName = async ({ text }) => {
		text.trim() !== "" &&
			(await service.patch(_id, { name: text }, { user }));
	};

	return (
		<div
			className={SingleBoard}
			style={{
				backgroundImage:
					backgroundImage !== ""
						? `url("${backgroundImage.url}")`
						: null,
				backgroundColor:
					backgroundColor !== "" ? backgroundColor : null,
			}}
		>
			<Link to={`/b/${_id}`} className={BoardLink}></Link>

			<EditableText
				type="name"
				onSave={updateName}
				styles={BoardTitle}
				required
			>
				{name}
			</EditableText>
			<BoardOptions onDelete={remove} onPin={patch} pinned={pinned} />
		</div>
	);
};

export default Board;
