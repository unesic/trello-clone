import React, { useEffect, useGlobal } from "reactn";
import { useFeathers } from "figbird";

import LoginTemplate from "../components/LoginTemplate/LoginTemplate";

const Login = ({ history, location }) => {
	const [, setUser] = useGlobal("user");
	const feathers = useFeathers();

	const reAuth = async () => {
		try {
			const { user } = await feathers.reAuthenticate();
			setUser(user);

			if (user) {
				const { state } = location;
				const prevPage = state ? state.from.pathname : "/boards";

				history.push(prevPage);
			}
		} catch (err) {
			console.log("Authentication Error: ", err);
		}
	};

	useEffect(() => {
		reAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				height: "100%",
			}}
		>
			<LoginTemplate />
		</div>
	);
};

export default Login;
