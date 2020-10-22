import React, { useGlobal, useState, useEffect } from "reactn";
import { useFeathers } from "figbird";

import Spinner from "../ui/Spinner";
import App from "../App/App";

const Board = ({ match }) => {
	const boardService = useFeathers().service("boards");
	const [user] = useGlobal("user");
	const [, setIsUserOwner] = useGlobal("isUserOwner");
	const [loading, setLoading] = useState(true);
	const [board, setBoard] = useState(null);

	const getBoardData = async () => {
		setLoading(true);
		const board = await boardService.get(match.params.id);
		setBoard(board);
		setIsUserOwner(user._id === board.ownerId);
		setLoading(false);
	};

	const onPatched = async (data) => {
		try {
			const newBoard = await data;
			if (board && newBoard._id === board._id) setBoard(newBoard);
		} catch (err) {
			console.log(err);
		}
	};

	boardService.on("patched", onPatched);

	useEffect(() => {
		getBoardData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Spinner loading={loading} />
			{board && <App service={boardService} board={board} />}
		</div>
	);
};

export default Board;
