import React, { useState, useRef } from "react";
import { FiMessageCircle } from "react-icons/fi";

import UserAvatar from "../../../../../ui/UserAvatar";
import { Textarea } from "../../../../../ui/styledComponents";

import {
	NewCommentWrapper,
	NewCommentForm,
	NewCommentTitle,
	FormTextContainer,
	FormInput,
	FormButton,
} from "./NewComment.module.css";

const NewComment = ({ submitForm }) => {
	const [newComment, setNewComment] = useState("");
	const scrollerRef = useRef();

	const scrollDown = (t) => {
		setTimeout(() => {
			scrollerRef.current.scrollIntoView({
				behavior: "smooth",
			});
		}, t);
	};

	const newCommentHandler = (e) => {
		e && e.preventDefault();

		const inputIsValid = newComment.trim().split("\n").join("") !== "";
		if (inputIsValid) {
			submitForm(newComment);
			setNewComment("");
			scrollDown(0);
		}
	};

	const onFocusHandler = () => {
		scrollDown(100);
	};

	const onChangeHandler = (e) => {
		setNewComment(e.target.value);
	};

	const keyPressHandler = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			newCommentHandler();
		}
	};
	return (
		<div className={NewCommentWrapper}>
			<h3 htmlFor="newComment" className={NewCommentTitle}>
				Add new
			</h3>
			<form onSubmit={newCommentHandler} className={NewCommentForm}>
				<UserAvatar />
				<div className={FormTextContainer}>
					<Textarea
						type="text"
						name="newComment"
						id="newComment"
						placeholder="Write a comment..."
						value={newComment}
						onFocus={onFocusHandler}
						onChange={onChangeHandler}
						onKeyPress={keyPressHandler}
						className={FormInput}
					/>
					<button type="submit" className={FormButton}>
						<FiMessageCircle /> Save
					</button>
				</div>
			</form>
			<div id="scroller" ref={(el) => (scrollerRef.current = el)}></div>
		</div>
	);
};

export default NewComment;
