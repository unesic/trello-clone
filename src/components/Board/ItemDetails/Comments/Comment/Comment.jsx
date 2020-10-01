import React from "react";

import Header from "../Header/CommentHeader";
import EditableText from "../../../../../ui/EditableText/EditableText";

import {
	CommentContainer,
	CommentTextWrapper,
	CommentText,
} from "./Comment.module.css";

const Comment = ({
	idx,
	dispatch,
	comments,
	isUserOwner,
	id,
	user,
	text,
	_createdAt,
	_updatedAt,
}) => {
	const updateText = ({ text }) => {
		dispatch({
			type: "SET_COMMENTS",
			payload: [...comments].map((comment) => {
				if (comment.id === id) {
					comment.text = text;
					comment._updatedAt = new Date();
				}
				return comment;
			}),
		});
	};

	const deleteCommentHandler = () => {
		dispatch({
			type: "SET_COMMENTS",
			payload: [...comments].filter((comment) => comment.id !== id),
		});
	};

	return (
		<div className={CommentContainer}>
			<Header
				{...user}
				timestamp={_createdAt}
				isOwner={isUserOwner}
				onDelete={deleteCommentHandler}
			/>
			<div className={CommentTextWrapper}>
				<EditableText
					type="comment"
					onSave={updateText}
					styles={CommentText}
					isOwner={isUserOwner}
				>
					{text}
				</EditableText>
			</div>
		</div>
	);
};

export default Comment;
