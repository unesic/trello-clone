import React, { useGlobal } from "reactn";
import { RiDropFill } from "react-icons/ri";
import { CgDrop } from "react-icons/cg";

import {
	OptionWrapper,
	Title,
	TransparencyContainer,
	ToggleButton,
	ButtonTransparency,
	Slider,
} from "./ModeAndTransparency.module.css";

const Transparency = () => {
	const [transparency, setTransparency] = useGlobal("transparency");

	const changeTransparency = () => {
		setTransparency(!transparency);
	};

	return (
		<div className={OptionWrapper}>
			<h3 className={Title}>
				Transparency: {transparency ? "On" : "Off"}
			</h3>
			<div className={TransparencyContainer}>
				<button
					className={`${ToggleButton} ${ButtonTransparency} ${
						transparency ? "transparent" : ""
					}`}
					onClick={changeTransparency}
				>
					<span className={Slider}>
						{transparency ? <CgDrop /> : <RiDropFill />}
					</span>
				</button>
			</div>
		</div>
	);
};

export default Transparency;
