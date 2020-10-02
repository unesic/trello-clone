import React, { useGlobal, useEffect, useRef } from "reactn";
import Router from "./Router";

const Main = () => {
	const [theme, setTheme] = useGlobal("theme");
	const [transparency, setTransparency] = useGlobal("transparency");
	const [backgroundImage, setBackgroundImage] = useGlobal("backgroundImage");
	const [backgroundColor, setBackgroundColor] = useGlobal("backgroundColor");

	const ref = useRef();

	useEffect(() => {
		const localStyle = localStorage.getItem("appStyle");

		if (localStyle) {
			const {
				theme,
				transparency,
				backgroundImage,
				backgroundColor,
			} = JSON.parse(localStyle);
			setTheme(theme);
			setTransparency(transparency);
			setBackgroundImage(backgroundImage);
			setBackgroundColor(backgroundColor);
		}
	}, []);

	useEffect(() => {
		if (ref.current) {
			localStorage.setItem(
				"appStyle",
				JSON.stringify({
					theme: theme,
					transparency: transparency,
					backgroundImage: backgroundImage,
					backgroundColor: backgroundColor,
				})
			);
		} else ref.current = true;
	}, [theme, transparency, backgroundImage, backgroundColor]);

	const styles = {
		backgroundColor: backgroundColor !== "unset" ? backgroundColor : null,
		backgroundImage: backgroundImage.url
			? `url(${backgroundImage.url})`
			: null,
	};

	return (
		<main
			id="main"
			className={`${theme}${transparency ? " transparent" : ""}`}
			style={styles}
		>
			<Router />
		</main>
	);
};

export default Main;
