import React, { useState } from "react";

import Tag from "./Tag";

const Tags = () => {
	const [tags, setTags] = useState([]);
	const [availableTags, setAvailableTags] = useState([
		{
			id: "tag-id-1",
			title: "MUST DO ASAP",
			color: "var(--green)",
		},
		{
			id: "tag-id-2",
			title: "Super high priority",
			color: "var(--red)",
		},
		{
			id: "tag-id-3",
			title: "Tag 3",
			color: "var(--white)",
		},
		{
			id: "tag-id-4",
			title: "Tag 4",
			color: "var(--black)",
		},
	]);

	const addTag = (tag) => {
		const newAvailableTags = availableTags.filter((t) => t.id !== tag.id);
		setAvailableTags(newAvailableTags);

		setTags([...tags, tag]);
	};

	const removeTag = (tag) => {
		const newTags = tags.filter((t) => t.id !== tag.id);
		setTags(newTags);

		setAvailableTags([...availableTags, tag]);
	};

	return (
		<>
			<h4>Current</h4>
			{tags.map((tag) => (
				<Tag key={tag.id} clicked={removeTag} {...tag} />
			))}
			<h4>Availble</h4>
			{availableTags.map((tag) => (
				<Tag key={tag.id} clicked={addTag} {...tag} />
			))}
		</>
	);
};

export default Tags;
