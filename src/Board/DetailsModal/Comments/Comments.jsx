import React from "react";

import Comment from "./Comment/Comment";
import {
	CommentsContainer,
	Title,
	CommentsWrapper,
} from "./Comments.module.css";

const Comments = ({ comments, dispatch }) => {
	return (
		<div className={CommentsContainer}>
			<h3 className={Title}>Comments</h3>

			<div className={CommentsWrapper}>
				{comments && comments.length
					? comments.map((comment, idx) => (
							<Comment
								key={comment.id}
								idx={idx}
								dispatch={dispatch}
								comments={comments}
								{...comment}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};

export default Comments;
