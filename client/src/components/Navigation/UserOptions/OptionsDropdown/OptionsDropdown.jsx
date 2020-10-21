import React, { useGlobal } from "reactn";
import { NavLink } from "react-router-dom";
import { FiX } from "react-icons/fi";

import UserAvatar from "../../../../ui/UserAvatar";

import {
	DropdownContainer,
	DropdownActive,
	OptionsHeader,
	HeaderTitle,
	HeaderButton,
	OptionsUserDetails,
	UserDetailsInner,
	NotLoggedIn,
	OptionsList,
	ListItem,
	ListLink,
	ActiveLink,
} from "./OptionsDropdown.module.css";

const OptionsDropdown = ({ visible, setVisible, visibleRef }) => {
	const [user] = useGlobal("user");

	const closeDropdown = () => {
		setVisible(false);
	};

	return (
		<div
			className={`${DropdownContainer} ${
				visible ? DropdownActive : ""
			}`.trim()}
			ref={visibleRef}
		>
			<header className={OptionsHeader}>
				<h4 className={HeaderTitle}>Account</h4>
				<button onClick={closeDropdown} className={HeaderButton}>
					<FiX />
				</button>
			</header>

			<div className={OptionsUserDetails}>
				<div className={UserDetailsInner}>
					{user ? (
						<UserAvatar withDetails />
					) : (
						<>
							<UserAvatar
								src="https://docs.atlassian.com/aui/8.6.0/docs/images/avatar-person.svg"
								alt="blah"
							/>
							<p className={NotLoggedIn}>
								You are not logged in!
							</p>
						</>
					)}
				</div>
			</div>

			<ul className={OptionsList}>
				{user ? (
					<>
						<li className={ListItem}>
							<NavLink
								to="/boards"
								className={ListLink}
								activeClassName={ActiveLink}
								onClick={closeDropdown}
							>
								Boards
							</NavLink>
						</li>
						<li className={ListItem}>
							<a
								href="/logout"
								className={ListLink}
								onClick={closeDropdown}
							>
								Logout
							</a>
						</li>
					</>
				) : (
					<li className={ListItem}>
						<NavLink
							to="/login"
							className={ListLink}
							onClick={closeDropdown}
						>
							Login
						</NavLink>
					</li>
				)}
			</ul>
		</div>
	);
};

export default OptionsDropdown;
