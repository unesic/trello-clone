import React, { useState, useEffect } from "react";

import { Input, Textarea, Placeholder } from "../../ui/styledComponents";
import useHandlers from "./EditableText.helper";

const EditableText = ({
	type,
	onSave,
	styles,
	idx,
	isOwner = true,
	placeholder,
	children,
}) => {
	const [text, setText] = useState(children);
	const [snapshot, setSnapshot] = useState(children);
	const [editing, setEditing] = useState(false);

	const props = useHandlers(
		text,
		setText,
		snapshot,
		setEditing,
		onSave,
		type,
		idx
	);

	useEffect(() => {
		setText(children);
	}, [children]);

	const clickHandler = () => {
		if (isOwner) {
			text.trim() === "" && setText("");
			setSnapshot(placeholder || text);
			setEditing(true);
		}
	};

	const getOutput = () => {
		if (editing) {
			return type === "comment" ? (
				<Textarea {...props} />
			) : (
				<Input {...props} />
			);
		} else {
			if (type === "comment") {
				return text
					.trim()
					.split("\n")
					.map((line, i) => (
						<span key={i}>
							{line}
							<br />
						</span>
					));
			} else {
				return text && text.trim() ? (
					text
				) : (
					<Placeholder>{placeholder}</Placeholder>
				);
			}
		}
	};

	return (
		<div onClick={clickHandler} className={styles}>
			{getOutput()}
		</div>
	);
};

export default EditableText;
