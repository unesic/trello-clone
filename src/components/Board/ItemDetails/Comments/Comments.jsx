import React, { useContext } from "react";

import { AppContext } from "../../../../App";

import Comment from "./Comment/Comment";
import NewComment from "./NewComment/NewComment";

import { Instruction } from "../../../../ui/styledComponents";

import {
	CommentsContainer,
	Title,
	CommentsWrapper,
} from "./Comments.module.css";

const Comments = ({ comments, dispatch }) => {
	const context = useContext(AppContext);

	const newCommentHandler = (text) => {
		dispatch({
			type: "SET_COMMENTS",
			payload: [
				...comments,
				{
					id: "comment-id-" + Date.now(),
					user: { ...context.user },
					text: text,
					_createdAt: new Date(),
					_updatedAt: new Date(),
				},
			],
		});
	};

	return (
		<div className={CommentsContainer}>
			<h3 className={Title}>Comments</h3>

			<div className={CommentsWrapper}>
				{comments && comments.length ? (
					comments.map((comment, idx) => (
						<Comment
							key={comment.id}
							idx={idx}
							dispatch={dispatch}
							comments={comments}
							isUserOwner={context.user.id === comment.user.id}
							{...comment}
						/>
					))
				) : (
					<Instruction>No comments to show...</Instruction>
				)}
			</div>

			<NewComment submitForm={newCommentHandler} {...context.user} />
		</div>
	);
};

export default Comments;
