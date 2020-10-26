import React, { useState, useGlobal, useEffect } from "reactn";
import { useFeathers } from "figbird";
import { useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import * as dataParser from "../../../../lib/dataParser";
import { Fieldset, Input, Label } from "../../../../ui/styledComponents";
import {
	NewTagContainer,
	Title,
	NewTagForm,
	FormFieldset,
	FormInput,
	FormLabel,
	SubmitButton,
	Enabled,
} from "./NewTag.module.css";

const NewTag = ({ tags }) => {
	const { id: boardId } = useParams();
	const service = useFeathers().service("boards");
	const [user] = useGlobal("user");
	const [boardTags, setBoardTags] = useGlobal("boardTags");

	const [tag, setTag] = useState({ id: null, name: "", color: "" });
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		if (tag.name.trim() !== "" && tag.color.trim() !== "") {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [tag]);

	const formSubmitHandler = (e) => {
		e.preventDefault();

		const newTag = {
			id: "tag-id-" + Date.now(),
			name: tag.name.trim(),
			color: tag.color.trim(),
		};

		setTag(newTag);
		setBoardTags([...boardTags, newTag]);

		const parsed = dataParser.toString([...tags, newTag]);
		service.patch(boardId, { tags: parsed }, { user });

		setTag({ id: null, name: "", color: "" });
	};

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setTag({ ...tag, [name]: value });
	};

	return (
		<div className={NewTagContainer}>
			<h4 className={Title}>Add new tag</h4>
			<form onSubmit={formSubmitHandler} className={NewTagForm}>
				<Fieldset className={FormFieldset}>
					<Input
						className={`${FormInput} ${
							tag.name.trim() !== "" && "hasValue"
						}`}
						type="text"
						id="name"
						name="name"
						value={tag.name}
						onChange={onChangeHandler}
					/>
					<Label className={FormLabel}>Name</Label>
				</Fieldset>
				<Fieldset className={FormFieldset}>
					<Input
						className={`${FormInput} ${
							tag.color.trim() !== "" && "hasValue"
						}`}
						type="text"
						id="color"
						name="color"
						value={tag.color}
						onChange={onChangeHandler}
					/>
					<Label className={FormLabel}>Color</Label>
				</Fieldset>

				<button
					type="submit"
					className={`${SubmitButton} ${!disabled ? Enabled : ""}`}
					disabled={disabled}
				>
					<FiPlus />
				</button>
			</form>
		</div>
	);
};

export default NewTag;
