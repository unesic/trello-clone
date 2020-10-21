import React, { useState, useGlobal, useEffect } from "reactn";
import { useFeathers } from "figbird";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import * as dataParser from "../../../../hooks/dataParser";
import { Instruction, SidebarTitle } from "../../../../ui/styledComponents";
import Tag from "./Tag";
import NewTag from "./NewTag";

const Container = styled.div`
	margin-bottom: 16px;
	border-bottom: var(--border-bot);
	padding-bottom: 8px;
`;

const Tags = ({ itemTags, dispatch }) => {
	const { id: boardId } = useParams();
	const service = useFeathers().service("boards");
	const [user] = useGlobal("user");
	const [boardTags, setBoardTags] = useGlobal("boardTags");

	const [tags, setTags] = useState(
		itemTags && itemTags.length ? [...itemTags] : []
	);
	const [availableTags, setAvailableTags] = useState([...boardTags]);

	useEffect(() => {
		if (itemTags && itemTags.length) {
			setTags([...itemTags]);
		} else {
			setTags([]);
		}
	}, [itemTags]);

	useEffect(() => {
		if (tags && tags.length) {
			const newAvailableTags = [];
			boardTags.forEach((tag) => {
				const idx = tags.findIndex((t) => t.id === tag.id);
				if (idx < 0) newAvailableTags.push(tag);
			});

			setAvailableTags(newAvailableTags);
		} else {
			setAvailableTags([...boardTags]);
		}
	}, [tags]);

	useEffect(() => {
		const newAvailableTags = [];
		boardTags.forEach((tag) => {
			const idx = tags.findIndex((t) => t.id === tag.id);
			if (idx < 0) newAvailableTags.push(tag);
		});
		setAvailableTags([...newAvailableTags]);
	}, [boardTags]);

	const addTag = (tag) => {
		dispatch({
			type: "SET_TAGS",
			payload: [...tags, tag],
		});
	};

	const removeTag = (tag) => {
		dispatch({
			type: "SET_TAGS",
			payload: [...tags.filter((t) => t.id !== tag.id)],
		});
	};

	const deleteTag = (id) => {
		const newTags = tags.filter((t) => t.id !== id);
		dispatch({
			type: "SET_TAGS",
			payload: [...newTags],
		});

		const newBoardTags = boardTags.filter((tag) => tag.id !== id);
		setBoardTags(newBoardTags);

		const parsed = dataParser.toString(newTags);
		service.patch(boardId, { tags: parsed }, { user });
	};

	return (
		<>
			<Container>
				<SidebarTitle>Current</SidebarTitle>
				{tags.length ? (
					tags.map((tag) => (
						<Tag
							key={tag.id}
							clicked={removeTag}
							deleted={deleteTag}
							{...tag}
						/>
					))
				) : (
					<Instruction>This item has no tags.</Instruction>
				)}
			</Container>

			<Container>
				<SidebarTitle>Available</SidebarTitle>
				{availableTags.map((tag) => (
					<Tag
						key={tag.id}
						clicked={addTag}
						deleted={deleteTag}
						{...tag}
					/>
				))}
			</Container>

			<NewTag tags={availableTags} />
		</>
	);
};

export default Tags;
