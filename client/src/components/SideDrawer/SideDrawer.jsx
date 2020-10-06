import React, { useState, useCallback } from "react";
import { FiSettings, FiX } from "react-icons/fi";

import Modal from "../../ui/Modal/Modal";
import ModeAndTransparency from "./ModeAndTransparency/ModeAndTransparency";
import Colors from "./Colors/Colors";
import Images from "./Images/Images";
import {
	ButtonToggle,
	ButtonClose,
	SideDrawerModal,
} from "./SideDrawer.module.css";

const SideDrawer = () => {	
	const [modalVisible, setModalVisible] = useState(false);

	const openModal = useCallback(() => {
		setModalVisible(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalVisible]);

	const closeModal = useCallback(() => {
		setModalVisible(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalVisible]);

	return (
		<>
			<button onClick={openModal} className={ButtonToggle}>
				<FiSettings />
			</button>
			<Modal
				visible={modalVisible}
				close={closeModal}
				classes={SideDrawerModal}
			>
				<button onClick={closeModal} className={ButtonClose}>
					<FiX />
				</button>
				<ModeAndTransparency />
				<Colors />
				<Images />
			</Modal>
		</>
	);
};

export default SideDrawer;
