import React, { useContext } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { RiDropFill } from "react-icons/ri";
import { CgDrop } from "react-icons/cg";

import { AppContext } from "../../App/App";
import {
	MATWrapper,
	OptionWrapper,
	Title,
	ModeContainer,
	TransparencyContainer,
	ToggleButton,
	Mode,
	Transparency,
	Slider,
} from "./ModeAndTransparency.module.css";

const ModeAndTransparency = ({ mode, transparency }) => {
	const context = useContext(AppContext);

	const changeMode = () => {
		context.dispatch({
			type: "SET_MODE",
			payload: mode === "light" ? "dark" : "light",
		});
	};

	const changeTransparency = () => {
		context.dispatch({
			type: "SET_TRANSPARENCY",
			payload: !transparency,
		});
	};

	return (
		<div className={MATWrapper}>
			<div className={OptionWrapper}>
				<h3 className={Title}>
					Mode: {mode === "light" ? "Light" : "Dark"}
				</h3>
				<div className={ModeContainer}>
					<button
						className={`${ToggleButton} ${Mode} ${mode}`}
						onClick={changeMode}
					>
						<span className={Slider}>
							{mode === "light" ? <FiSun /> : <FiMoon />}
						</span>
					</button>
				</div>
			</div>
			<div className={OptionWrapper}>
				<h3 className={Title}>
					Transparency: {transparency ? "On" : "Off"}
				</h3>
				<div className={TransparencyContainer}>
					<button
						className={`${ToggleButton} ${Transparency} ${
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
		</div>
	);
};

export default ModeAndTransparency;
