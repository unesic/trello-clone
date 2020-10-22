import React, { useReducer, useState, useEffect, useGlobal } from "reactn";

import reducer from "./AllBoards.reducer";
import Spinner from "../../ui/Spinner";
import Board from "./SingleBoard/SingleBoard";
import {
	BoardsContainer,
	BoardsWrapper,
	WrapperTitle,
} from "./Boards.module.css";

const AllBoards = ({ service }) => {
	const [loading, setLoading] = useState(true);
	const [user] = useGlobal("user");
	const [boards, dispatch] = useReducer(reducer, {
		pinned: [],
		others: [],
	});

	service.on("created", (board) => {
		if (board.ownerId === user._id)
			dispatch({
				type: "SET_OTHERS",
				payload: [...boards.others, board],
			});
	});

	service.on("removed", (board) => {
		if (board.pinned) {
			dispatch({
				type: "SET_PINNED",
				payload: [...boards.pinned].filter((b) => b._id !== board._id),
			});
		} else {
			dispatch({
				type: "SET_OTHERS",
				payload: [...boards.others].filter((b) => b._id !== board._id),
			});
		}
	});

	const getUserBoards = async () => {
		setLoading(true);

		const { data } = await service.find({
			query: { ownerId: user._id },
		});
		const pinned = data.filter((b) => b.pinned);
		const others = data.filter((b) => !b.pinned);

		dispatch({
			type: "SET_ALL",
			payload: {
				pinned: [...pinned],
				others: [...others],
			},
		});

		setLoading(false);
	};

	useEffect(() => {
		getUserBoards();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className={BoardsContainer}>
			<Spinner loading={loading} />
			{boards.pinned.length ? (
				<div className={BoardsWrapper}>
					<h3 className={WrapperTitle}>Pinned Boards</h3>
					{boards.pinned.map((board) => (
						<Board
							key={board._id}
							boards={boards}
							dispatch={dispatch}
							service={service}
							{...board}
						/>
					))}
				</div>
			) : null}
			<div className={BoardsWrapper}>
				<h3 className={WrapperTitle}>Boards</h3>
				{boards.others.length
					? boards.others.map((board) => (
							<Board
								key={board._id}
								boards={boards}
								dispatch={dispatch}
								service={service}
								{...board}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};

export default AllBoards;
