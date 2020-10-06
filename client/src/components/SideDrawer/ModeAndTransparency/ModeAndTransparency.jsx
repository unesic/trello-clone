import React from "react";

import Mode from "./Mode";
import Transparency from "./Transparency";

import { MATWrapper } from "./ModeAndTransparency.module.css";

const ModeAndTransparency = () => {
	return (
		<div className={MATWrapper}>
			<Mode />
			<Transparency />
		</div>
	);
};

export default ModeAndTransparency;
