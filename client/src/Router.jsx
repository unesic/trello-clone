import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useFeathers } from "figbird";

import PrivateRoute from "./PrivateRoute";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Boards from "./pages/Boards";
import Board from "./pages/Board";

import ConfirmationPopup from "./ui/ConfirmationPopup/ConfirmationPopup";

const Router = () => {
	const feathers = useFeathers();
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route path="/" exact component={Home} />
				<PrivateRoute path="/boards" component={Boards} />
				<PrivateRoute path="/b/:id" component={Board} />
				<Route path="/login" component={Login} />
				<Route
					path="/logout"
					render={() => {
						feathers.logout();
						return <Redirect to="/" />;
					}}
				/>
			</Switch>
			<ConfirmationPopup />
		</BrowserRouter>
	);
};

export default Router;
