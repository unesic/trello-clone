import React, { useContext } from "react";
import { FiX } from "react-icons/fi";

import { AppContext } from "../../App/App";
import {
	ColorsWrapper,
	Title,
	ColorsContainer,
	SingleColorWrapper,
	SingleColor,
	ColorUnset,
	Current,
	ColorCode,
} from "./Colors.module.css";

const Colors = ({ colors, onColorPick }) => {
	const context = useContext(AppContext);

	return (
		<div className={ColorsWrapper}>
			<h3 className={Title}>Colors</h3>
			<div className={ColorsContainer}>
				<div className={SingleColorWrapper}>
					<button
						className={`${SingleColor} ${ColorUnset}`}
						onClick={() => onColorPick("unset")}
					>
						<FiX />
					</button>
				</div>
				{colors.map((color, i) => (
					<div key={i} className={SingleColorWrapper}>
						<button
							style={{ backgroundColor: color }}
							className={`${SingleColor} ${
								context.appStyle.backgroundColor === color
									? Current
									: ""
							}`}
							onClick={() => onColorPick(color)}
						>
							<p className={ColorCode} style={{ color: color }}>
								{color}
							</p>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Colors;
