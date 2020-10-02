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
	const [theme, setTheme] = useGlobal("theme");

	const changeMode = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<div className={OptionWrapper}>
			<h3 className={Title}>
				Mode: {theme === "light" ? "Light" : "Dark"}
			</h3>
			<div className={ModeContainer}>
				<button
					className={`${ToggleButton} ${ButtonMode} ${theme}`}
					onClick={changeMode}
				>
					<span className={Slider}>
						{theme === "light" ? <FiSun /> : <FiMoon />}
					</span>
				</button>
			</div>
		</div>
	);
};

export default Mode;
