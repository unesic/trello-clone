import React from "react";
import { Link } from "react-router-dom";

import { LogoContainer, Logo } from "./AppLogo.module.css";
import TrelloLogo from "./trello-logo-blue.svg";

const AppLogo = () => {
	return (
		<div className={LogoContainer}>
			<Link to="/">
				<img src={TrelloLogo} alt="Trello Logo" className={Logo} />
			</Link>
		</div>
	);
};

export default AppLogo;
