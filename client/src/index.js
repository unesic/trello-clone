import React, { setGlobal } from "reactn";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";
import * as serviceWorker from "./serviceWorker";

setGlobal({
	user: null,
	boardStyle: {
		theme: "light",
		transparency: false,
		backgroundImage: {
			id: null,
			url: null,
		},
		backgroundColor: null,
	}
});

ReactDOM.render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();