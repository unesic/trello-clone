import React from "react";

import Header from "../lib/Header";
import Text from "../../../Text";

import { CommentContainer, CommentText } from "./Comment.module.css";

const Comment = ({ id, user, text, _createdAt, _updatedAt }) => {
	return (
		<div className={CommentContainer}>
			<Header {...user} timestamp={_createdAt} />
			<Text type="comment" onSave={() => {}} styles={CommentText}>
				{text}
			</Text>
		</div>
	);
};

export default Comment;
