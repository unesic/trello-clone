import React from "react";
import { Provider as FigbirdProvider } from "figbird";

import feathersClient from "./feathersClient";
import Router from "./Router";

const Main = () => {
	return (
		<FigbirdProvider feathers={feathersClient}>
			<main id="main">
				<Router />
			</main>
		</FigbirdProvider>
	);
};

export default Main;
