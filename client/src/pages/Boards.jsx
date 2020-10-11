import React from "react";
import { useFeathers } from "figbird";

import AllBoards from "../components/Boards/AllBoards";
import NewBoard from "../components/Boards/NewBoard/NewBoard";

const Boards = () => {
	const boardService = useFeathers().service("boards");

	return (
		<div
			style={{
				margin: "0 auto",
				width: "85%",
			}}
		>
			<AllBoards service={boardService} />
			<NewBoard service={boardService} />
		</div>
	);
};

export default Boards;
