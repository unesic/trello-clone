import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "./Navigation";
import App from "./App";
import Login from "./Login";

const Router = () => {
	return (
		<BrowserRouter>
			<Navigation />

			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/login" component={Login} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
