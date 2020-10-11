import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

import Modal from "../../../ui/Modal/Modal";
import useToggle from "../../../hooks/useToggle";
import { Fieldset, Input, Label } from "../../../ui/styledComponents";
import {
	CreateButtonContainer,
	CreateButton,
	NewBoardModal,
	NewBoardTitle,
	NewBoardForm,
	InputField,
	SubmitButton,
} from "./NewBoard.module.css";

const NewBoard = ({ service }) => {
	const [boardName, setBoardName] = useState("");
	const [modalVisible, toggleModalVisible] = useToggle(false);

	const formSubmitHandler = (e) => {
		e.preventDefault();

		setBoardName((boardName) => boardName.trim());

		service.create({ name: boardName });
		toggleModalVisible();
		setBoardName("");
	};

	const onChangeHandler = (e) => {
		setBoardName(e.target.value);
	};

	return (
		<>
			<div className={CreateButtonContainer}>
				<button onClick={toggleModalVisible} className={CreateButton}>
					<FiPlus />
					Add new board
				</button>
			</div>
			<Modal
				visible={modalVisible}
				close={toggleModalVisible}
				classes={NewBoardModal}
			>
				<h3 className={NewBoardTitle}>Create a new board</h3>
				<form onSubmit={formSubmitHandler} className={NewBoardForm}>
					<Fieldset>
						<Input
							className={`${InputField} ${
								boardName.trim() !== "" ? "hasValue" : ""
							}`.trim()}
							type="text"
							id="name"
							name="name"
							value={boardName}
							onChange={onChangeHandler}
						/>
						<Label htmlFor="name">Name</Label>
					</Fieldset>
					<button
						type="submit"
						className={SubmitButton}
						disabled={boardName.trim() === ""}
					>
						CREATE
					</button>
				</form>
			</Modal>
		</>
	);
};

export default NewBoard;
