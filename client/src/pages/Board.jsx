import React, { useGlobal, useState, useEffect } from "reactn";
import { useFeathers } from "figbird";

import Spinner from "../ui/Spinner";
import App from "../App/App";

const Board = ({ match }) => {
	const boardService = useFeathers().service("boards");
	const [user] = useGlobal("user");
	const [loading, setLoading] = useState(true);
	const [board, setBoard] = useState(null);

	const getBoardData = async () => {
		setLoading(true);
		const board = await boardService.get(match.params.id);
		setBoard(board);
		setLoading(false);
	};

	useEffect(() => {
		getBoardData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Spinner loading={loading} />
			{board && <App isOwner={user._id === board.ownerId} service={boardService} board={board} />}
		</div>
	);
};

export default Board;
