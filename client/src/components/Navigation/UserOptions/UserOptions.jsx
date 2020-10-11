import React, { useGlobal } from "reactn";

import useVisible from "../../../hooks/useVisible";
import UserAvatar from "../../../ui/UserAvatar";
import OptionsDropdown from "./OptionsDropdown/OptionsDropdown";

import { UserContainer } from "./UserOptions.module.css";

const UserOptions = () => {
	const [user] = useGlobal("user");
	const { ref, isVisible, setIsVisible } = useVisible(false);

	return (
		<div className={UserContainer}>
			{user ? (
				<UserAvatar clicked={() => setIsVisible(!isVisible)} />
			) : (
				<UserAvatar
					src="https://docs.atlassian.com/aui/8.6.0/docs/images/avatar-person.svg"
					alt="blah"
					clicked={() => setIsVisible(!isVisible)}
				/>
			)}

			<OptionsDropdown
				visible={isVisible}
				setVisible={setIsVisible}
				visibleRef={ref}
			/>
		</div>
	);
};

export default UserOptions;
