import React, { useGlobal, useState, useEffect } from "reactn";
import { useFeathers } from "figbird";

import Spinner from "../ui/Spinner";
import App from "../App/App";
import { setBackground } from "../App/App.helper";
import * as dataParser from "../lib/dataParser";

const Board = ({ match }) => {
	const boardsService = useFeathers().service("boards");

	const [user] = useGlobal("user");
	const [, setIsUserOwner] = useGlobal("isUserOwner");
	const [boardStyle, setBoardStyle] = useGlobal("boardStyle");
	const [boardTags, setBoardTags] = useGlobal("boardTags");

	const [loading, setLoading] = useState(true);
	const [board, setBoard] = useState(null);

	boardsService.on("patched", (data) => {
		if (board && board._id === data._id) setBoard(data);
	});

	useEffect(() => {
		setLoading(true);

		boardsService
			.get(match.params.id)
			.then((board) => {
				setBoard(board);
				setIsUserOwner(user._id === board.ownerId);
				const parsed = dataParser.fromString(board.style);
				setBoardStyle(parsed);
			})
			.finally(() => {
				setLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!loading && board.tags !== "") {
			const parsed = dataParser.fromString(board.tags);
			if (dataParser.toString(boardTags) !== board.tags)
				setBoardTags(parsed);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [board]);

	useEffect(() => {
		updateBoardStyle(board);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [boardStyle]);

	const updateBoardStyle = (board) => {
		if (board) {
			const parsed = dataParser.toString(boardStyle);
			boardsService.patch(board._id, { style: parsed }, { user });

			document.body.classList = [
				boardStyle.theme,
				boardStyle.transparency ? "transparent" : "",
			].join(" ");
			setBackground(boardStyle);
		}
	};

	return (
		<div>
			{loading ? <Spinner loading={loading} /> : <App {...board} />}
		</div>
	);
};

export default Board;
