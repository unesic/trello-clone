import React, { useGlobal, useState, useEffect } from "reactn";

import Spinner from "../../ui/Spinner";
import Board from "./Board";
import { BoardsContainer } from "./Boards.module.css";

const AllBoards = ({ service }) => {
	const [loading, setLoading] = useState(true);
	const [user] = useGlobal("user");
	const [boards, setBoards] = useState([]);

	service.on("created", (board) => setBoards([...boards, board]));

	const getUserBoards = async () => {
		setLoading(true);
		const { data } = await service.find({ query: { ownerId: user._id } });
		setBoards(data);
		setLoading(false);
	};

	useEffect(() => {
		getUserBoards();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={BoardsContainer}>
			<Spinner loading={loading} />
			{boards.length
				? boards.map((board) => <Board key={board._id} {...board} />)
				: null}
		</div>
	);
};

export default AllBoards;
