import React, { useGlobal } from "reactn";
import { FiSun, FiMoon } from "react-icons/fi";

import {
	OptionWrapper,
	Title,
	ModeContainer,
	ToggleButton,
	ButtonMode,
	Slider,
} from "./ModeAndTransparency.module.css";

const Mode = () => {
	const [boardStyle, setBoardStyle] = useGlobal("boardStyle");

	const changeMode = () => {
		setBoardStyle({
			...boardStyle,
			theme: boardStyle.theme === "light" ? "dark" : "light",
		});
	};

	return (
		<div className={OptionWrapper}>
			<h3 className={Title}>
				Mode: {boardStyle.theme === "light" ? "Light" : "Dark"}
			</h3>
			<div className={ModeContainer}>
				<button
					className={`${ToggleButton} ${ButtonMode} ${boardStyle.theme}`}
					onClick={changeMode}
				>
					<span className={Slider}>
						{boardStyle.theme === "light" ? <FiSun /> : <FiMoon />}
					</span>
				</button>
			</div>
		</div>
	);
};

export default Mode;
