import React, { useMemo, useEffect } from "react";

import {
	Container,
	Header,
	Content,
	Head,
	Copy,
	Buttons,
	Button,
	Subhead,
	List,
	ListItem,
	Icon,
	Label,
	Graphic,
	Image,
	Footer,
	FooterLinks,
	FooterLinkItem,
	FooterLink,
	FooterLabel,
} from "./Home.lib/Components";

import img_dark from "./Home.lib/images/trello-clone-dark.png";
import img_light from "./Home.lib/images/trello-clone-light.png";

import {
	feathers,
	socketio,
	render,
	mongodb,
	react,
	router,
	Github,
	Globe,
	LinkedIn,
	Mail,
} from "./Home.lib/icons";

import "./Home.lib/styles.css";

const Home = ({ location }) => {
	const stack = useMemo(
		() => [
			{ icon: react, label: "React" },
			{ icon: router, label: "Router" },
			{ icon: socketio, label: "Socket.io" },
			{ icon: feathers, label: "Feathers" },
			{ icon: mongodb, label: "Mongodb" },
			{ icon: render, label: "Render" },
		],
		[]
	);

	const links = useMemo(
		() => [
			{ icon: <Globe />, label: "unesic.dev", url: "https://unesic.dev" },
			{
				icon: <Github />,
				label: "Github",
				url: "https://github.com/unesic/",
			},
			{
				icon: <LinkedIn />,
				label: "LinkedIn",
				url: "https://www.linkedin.com/in/unesic/",
			},
			{ icon: <Mail />, label: "Email", url: "mailto:info@unesic.dev" },
		],
		[]
	);

	const darkMode = useMemo(
		() => window.matchMedia("(prefers-color-scheme: dark)").matches,
		[]
	);

	useEffect(() => {
		if (darkMode) document.body.classList.add("dark");
		else document.body.classList.add("light");
	}, [darkMode]);

	useEffect(() => {
		document.body.classList.add("homepage");
		return () => document.body.classList.remove("homepage");
	}, []);

	return (
		<Container>
			<Header>
				<Content>
					<Head>Trello Clone</Head>
					<Copy>
						User has the ability to create, preview, update, add to
						favorites and delete boards. Each board has rearrangable
						lists and items along with tags, checklists, comments
						and much more.
					</Copy>
					<Copy>
						Personalize boards by changing the background and
						transparency settings, or simply toggle between light
						and dark mode.
					</Copy>

					<Buttons>
						<Button href="/boards" bg="var(--green)">
							Visit the app
						</Button>
						<Button
							target="_blank"
							href="https://github.com/unesic/trello-clone"
							rel="noreferrer nofollow"
							bg="#24292E"
						>
							<Github /> View source
						</Button>
					</Buttons>

					<Subhead>Tech stack</Subhead>
					<List>
						{stack.map(({ icon, label }, idx) => (
							<ListItem key={idx}>
								<Icon src={icon} alt={label} />{" "}
								<Label>{label}</Label>
							</ListItem>
						))}
					</List>
				</Content>

				<Graphic>
					<Image
						src={darkMode ? img_dark : img_light}
						alt="Trello Clone hero graphic"
					/>
				</Graphic>
			</Header>

			<Footer className="Homepage__Footer">
				<FooterLinks className="footer-links">
					{links.map(({ icon, url, label }, idx) => (
						<FooterLinkItem key={idx}>
							<FooterLink
								href={url}
								color={`var(--blue${darkMode ? "12" : "9"})`}
							>
								{icon}
								<FooterLabel aria-hidden="true">
									{label}
								</FooterLabel>
							</FooterLink>
						</FooterLinkItem>
					))}
				</FooterLinks>
			</Footer>
		</Container>
	);
};

export default Home;
