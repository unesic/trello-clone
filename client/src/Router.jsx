import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useFeathers } from "figbird";

import PrivateRoute from "./PrivateRoute";

import Navigation from "./Navigation";
import Login from "./pages/Login";
import Boards from "./pages/Boards";
import Board from "./pages/Board";

const Router = () => {
	const feathers = useFeathers();
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<PrivateRoute path="/boards" component={Boards} />
				<PrivateRoute path="/b/:id" component={Board} />
				<Route path="/login" component={Login} />
				<Route path="/" exact render={() => <div>HOMEPAGE</div>} />
				<Route
					path="/logout"
					render={() => {
						feathers.logout();
						return <Redirect to="/" />;
					}}
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
