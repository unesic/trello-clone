import React from "react";
import { NavLink } from "react-router-dom";

import {
	NavWrapper,
	NavContainer,
	Navbar,
	Navitem,
	Navlink,
	Active,
} from "./Navigation.module.css";

const Navigation = () => {
	return (
		<div className={NavWrapper}>
			<nav className={NavContainer}>
				<ul className={Navbar}>
					<li className={Navitem}>
						<NavLink
							exact
							to="/"
							className={Navlink}
							activeClassName={Active}
						>
							App
						</NavLink>
					</li>
					<li className={Navitem}>
						<NavLink
							to="/login"
							className={Navlink}
							activeClassName={Active}
						>
							Login
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navigation;
