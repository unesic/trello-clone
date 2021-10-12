import React from "react";
import { FcGoogle } from "react-icons/fc";

import {
	TemplateContainer,
	TemplateTitle,
	AppTitle,
	ButtonWrapper,
	LoginButton,
} from "./LoginTemplate.module.css";

const LoginTemplate = () => {
	return (
		<div className={TemplateContainer}>
			<h2 className={TemplateTitle}>
				Sign up to <span className={AppTitle}>Trello Clone</span>
			</h2>
			<div className={ButtonWrapper}>
				<a
					href={process.env.REACT_APP_AUTH_URL}
					className={LoginButton}
				>
					<FcGoogle />
					Login with Google
				</a>
			</div>
		</div>
	);
};

export default LoginTemplate;
