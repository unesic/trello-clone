import React, { useEffect, useGlobal } from "reactn";
import { useFeathers } from "figbird";
import styled from "styled-components";

import LoginTemplate from "../components/LoginTemplate/LoginTemplate";

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

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
		<Wrapper
		>
			<LoginTemplate />
		</Wrapper>
	);
};

export default Login;
