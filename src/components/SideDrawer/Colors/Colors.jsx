import React, { useGlobal } from "reactn";
import { FiX } from "react-icons/fi";

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

const COLORS = [
	"#264653",
	"#2a9d8f",
	"#e9c46a",
	"#f4a261",
	"#e76f51",
	"#006d77",
	"#4ecdc4",
	"#ffffff",
	"#000000",
];

const Colors = () => {
	const [backgroundColor, setBackgroundColor] = useGlobal("backgroundColor");

	return (
		<div className={ColorsWrapper}>
			<h3 className={Title}>Colors</h3>
			<div className={ColorsContainer}>
				<div className={SingleColorWrapper}>
					<button
						className={`${SingleColor} ${ColorUnset}`}
						onClick={() => setBackgroundColor("unset")}
					>
						<FiX />
					</button>
				</div>
				{COLORS.map((color, i) => (
					<div key={i} className={SingleColorWrapper}>
						<button
							style={{ backgroundColor: color }}
							className={`${SingleColor} ${
								backgroundColor === color ? Current : ""
							}`}
							onClick={() => setBackgroundColor(color)}
						>
							<span
								className={ColorCode}
								style={{ color: color }}
							>
								{color}
							</span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Colors;
