import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Input = styled.input`
	outline: unset;
	border: unset;
	margin-top: 1px;
	margin-left: -4px;
	border-radius: 3px;
	padding: 0 4px;
	width: 100%;
	height: 100%;
	background-color: var(--input-bg);
	font: inherit;
	color: inherit;
`;

const Text = ({ type, onSave, styles, children }) => {
	const [text, setText] = useState(children);
	const [snapshot, setSnapshot] = useState(children);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		setText(children);
	}, [children]);

	const inputHandler = (e) => {
		setText(e.target.value);
	};

	const keyUpHandler = (e) => {
		switch (e.keyCode) {
			case 13:	// RETURN
				setEditing(false);
				onSave(type, text);
				break;
			case 27:	// ESCAPE
				setEditing(false);
				setText(snapshot);
				break;
			default:
				return;
		}
	};

	const focusOutHandler = () => {
		setEditing(false);
		onSave(type, text);
	};

	const clickHandler = () => {
		setSnapshot(text);
		setEditing(true);
	};

	return (
		<div onClick={clickHandler} className={styles}>
			{editing ? (
				<Input
					type="text"
					value={text}
					onChange={inputHandler}
					onKeyUp={keyUpHandler}
					onBlur={focusOutHandler}
					autoFocus
				/>
			) : (
				text
			)}
		</div>
	);
};

export default Text;
