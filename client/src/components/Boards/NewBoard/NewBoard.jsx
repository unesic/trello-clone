import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";

import Modal from "../../../ui/Modal/Modal";
import useToggle from "../../../hooks/useToggle";
import { getRandomImages } from "../../../hooks/asyncImages";
import { Fieldset, Input, Label } from "../../../ui/styledComponents";

import MainImages from "../../SideDrawer/Images/lib/MainImages";

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
	const [boardImage, setBoardImage] = useState({ id: null, url: null });
	const [images, setImages] = useState([]);
	const [modalVisible, toggleModalVisible] = useToggle(false);

	const getRandom = async () => {
		const images = await getRandomImages();
		setImages(images);
	};

	useEffect(() => {
		getRandom();
	}, []);

	const formSubmitHandler = (e) => {
		e.preventDefault();

		setBoardName((boardName) => boardName.trim());

		if (boardImage.id) {
			const style = {
				theme: "dark",
				transparency: "",
				backgroundImage: { ...boardImage },
				backgroundColor: "",
			};

			const parsedStyle = JSON.stringify(style).replace(/"/g, "'");
			service.create({ name: boardName, style: parsedStyle });
		} else {
			service.create({ name: boardName });
		}

		toggleModalVisible();
		setBoardName("");
		setBoardImage({ id: null, url: null });
	};

	const onChangeHandler = (e) => {
		setBoardName(e.target.value);
	};

	const onImageClick = ({ id, urls: { regular: url } }) => {
		setBoardImage({ id, url });
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

					<MainImages
						title="Pick an image"
						images={images}
						click={onImageClick}
						currentImage={boardImage.id}
					/>

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
