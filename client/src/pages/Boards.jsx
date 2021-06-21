import React from "react";
import { useFeathers } from "figbird";
import styled from "styled-components";

import AllBoards from "../components/Boards/AllBoards";
import NewBoard from "../components/Boards/NewBoard/NewBoard";

const Wrapper = styled.div`
	margin: 0 auto;
	width: 85%;
`;

const Boards = () => {
	const boardService = useFeathers().service("boards");

	return (
		<Wrapper>
			<AllBoards service={boardService} />
			<NewBoard service={boardService} />
		</Wrapper>
	);
};

export default Boards;
