import React, { useGlobal } from "reactn";
import { NavLink } from "react-router-dom";
import { SiTrello } from "react-icons/si";

import {
	NavWrapper,
	NavContainer,
	Navbar,
	Navitem,
	Navlink,
	Active,
} from "./Navigation.module.css";
import AppLogo from "./AppLogo/AppLogo";
import UserOptions from "./UserOptions/UserOptions";

const Navigation = () => {
	const [user] = useGlobal("user");

	return (
		<div className={NavWrapper}>
			<nav className={NavContainer}>
				<ul className={Navbar}>
					{user && (
						<li className={Navitem}>
							<NavLink
								to="/boards"
								className={Navlink}
								activeClassName={Active}
							>
								<SiTrello />
								Boards
							</NavLink>
						</li>
					)}
				</ul>
			</nav>
			<AppLogo />
			<UserOptions />
		</div>
	);
};

export default Navigation;
