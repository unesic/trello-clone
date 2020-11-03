import React, { useGlobal } from "reactn";

import Header from "../Header/CommentHeader";
import EditableText from "../../../../../ui/EditableText/EditableText";

import {
	CommentContainer,
	CommentTextWrapper,
	CommentText,
} from "./Comment.module.css";

const Comment = ({ dispatch, comments, id, author, text, _createdAt }) => {
	const [user] = useGlobal("user");
	const [isUserOwner] = useGlobal("isUserOwner");
	const [, setConfirmPopupVisible] = useGlobal("confirmPopupVisible");
	const [, setConfirmPopupData] = useGlobal("confirmPopupData");

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
		setConfirmPopupData({
			action: () => {
				dispatch({
					type: "SET_COMMENTS",
					payload: [...comments].filter(
						(comment) => comment.id !== id
					),
				});
			},
			text: "Delete comment?",
		});
		setConfirmPopupVisible(true);
	};

	return (
		<div className={CommentContainer}>
			<Header
				{...author}
				timestamp={_createdAt}
				isOwner={isUserOwner ? true : user._id === author._id}
				onDelete={deleteCommentHandler}
			/>
			<div className={CommentTextWrapper}>
				<EditableText
					type="comment"
					onSave={updateText}
					styles={CommentText}
					isOwner={user._id === author._id}
				>
					{text}
				</EditableText>
			</div>
		</div>
	);
};

export default Comment;
