import React, { useState } from "react";

import { Fieldset, Input, Label } from "../../ui/styledComponents";
import { InputField } from "./Boards.module.css";

const NewBoard = ({ service }) => {
	const [newBoard, setNewBoard] = useState({ name: "", image: "" });

	const formSubmitHandler = (e) => {
		e.preventDefault();
		if (newBoard.image === "") service.create({ name: newBoard.name });
		else service.create({ ...newBoard });
		setNewBoard({ name: "", image: "" });
	};

	const onChangeHandler = (e) => {
		setNewBoard({
			...newBoard,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form onSubmit={formSubmitHandler}>
			<Fieldset>
				<Input
					className={InputField}
					type="text"
					id="name"
					name="name"
					value={newBoard.name}
					onChange={onChangeHandler}
				/>
				<Label htmlFor="name">Name</Label>
			</Fieldset>
			<Fieldset>
				<Input
					className={InputField}
					type="text"
					id="image"
					name="image"
					value={newBoard.image}
					onChange={onChangeHandler}
				/>
				<Label htmlFor="image">Image</Label>
			</Fieldset>
			<button type="submit">CREATE BOARD</button>
		</form>
	);
};

export default NewBoard;
