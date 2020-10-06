import React, { useGlobal } from "reactn";
import { NavLink } from "react-router-dom";

import UserAvatar from "./ui/UserAvatar";

import {
	NavWrapper,
	NavContainer,
	Navbar,
	Navitem,
	Navlink,
	Active,
	UserContainer,
	UserName,
} from "./Navigation.module.css";

const Navigation = () => {
	const [user] = useGlobal("user");

	return (
		<div className={NavWrapper}>
			<nav className={NavContainer}>
				<ul className={Navbar}>
					{user ? (
						<>
							<li className={Navitem}>
								<a href="/logout" className={Navlink}>
									Logout
								</a>
							</li>
							<li className={Navitem}>
								<NavLink
									to="/boards"
									className={Navlink}
									activeClassName={Active}
								>
									Boards
								</NavLink>
							</li>
						</>
					) : (
						<li className={Navitem}>
							<NavLink
								to="/login"
								className={Navlink}
								activeClassName={Active}
							>
								Login
							</NavLink>
						</li>
					)}
				</ul>
			</nav>

			{user && (
				<div className={UserContainer}>
					<span className={UserName}>{user.name}</span>
					<UserAvatar />
				</div>
			)}
		</div>
	);
};

export default Navigation;
