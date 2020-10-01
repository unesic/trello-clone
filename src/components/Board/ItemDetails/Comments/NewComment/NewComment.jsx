import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";

import { Textarea } from "../../../../../ui/styledComponents";

import {
	NewCommentWrapper,
	NewCommentForm,
	NewCommentTitle,
	FormImage,
	FormTextContainer,
	FormInput,
	FormButton,
} from "./NewComment.module.css";

const NewComment = ({ submitForm, name, image }) => {
	const [newComment, setNewComment] = useState("");
	const [rows, setRows] = useState(3);
	const scrollerRef = useRef();

	useEffect(() => {
		const rows = newComment.split("\n").length;
		setRows(rows > 3 ? rows : 3);
	}, [newComment, setRows]);

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
				<img src={image} alt={name} className={FormImage} />
				<div className={FormTextContainer}>
					<Textarea
						type="text"
						name="newComment"
						id="newComment"
						placeholder="Write a comment..."
						rows={rows}
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
