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
	const [boardStyle, setBoardStyle] = useGlobal("boardStyle");

	const changeTransparency = () => {
		setBoardStyle({
			...boardStyle,
			transparency: !boardStyle.transparency,
		});
	};

	return (
		<div className={OptionWrapper}>
			<h3 className={Title}>
				Transparency: {boardStyle.transparency ? "On" : "Off"}
			</h3>
			<div className={TransparencyContainer}>
				<button
					className={`${ToggleButton} ${ButtonTransparency} ${
						boardStyle.transparency ? "transparent" : ""
					}`}
					onClick={changeTransparency}
				>
					<span className={Slider}>
						{boardStyle.transparency ? <CgDrop /> : <RiDropFill />}
					</span>
				</button>
			</div>
		</div>
	);
};

export default Transparency;
