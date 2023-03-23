import styled from "styled-components";

export const screen = {
	xxl: "1536px",
	xl: "1280px",
	lg: "1024px",
	md: "768px",
	sm: "640px",
};

export const Container = styled.div`
	position: relative;
	margin: 0 auto;
	padding: 0 1rem !important;
	max-width: 100%;
	width: 100%;
	min-height: 100vh;

	@media (min-width: ${screen.sm}) {
		max-width: ${screen.sm};
	}

	@media (min-width: ${screen.md}) {
		max-width: ${screen.md};
	}

	@media (min-width: ${screen.lg}) {
		max-width: ${screen.lg};
	}

	@media (min-width: ${screen.xl}) {
		max-width: ${screen.xl};
	}

	@media (min-width: ${screen.xxl}) {
		max-width: ${screen.xxl};
	}
`;

export const Header = styled.header`
	display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr));
	grid-column-gap: 2rem;
	place-items: center;
	padding-top: 1rem;
	padding-bottom: 8rem;
	text-align: center;

	@media (min-width: ${screen.lg}) {
		padding-top: 6rem;
		text-align: left;
	}
`;

export const Content = styled.div`
	grid-column: 1/-1;
	grid-row-start: 2;

	@media (min-width: ${screen.lg}) {
		grid-column: span 6 / span 6;
		grid-row-start: 1;
	}

	@media (min-width: ${screen.xl}) {
		grid-column: span 6 / span 6;
	}
`;

export const Head = styled.h1`
	font-size: 3rem;
	line-height: 1;
	color: var(--base-solid-1);
`;

export const Copy = styled.p`
	margin-top: 1rem;
	margin-left: auto;
	margin-right: auto;
	max-width: 25rem;
	font-size: 1.125rem;
	line-height: 1.75rem;
	color: var(--text-solid-1);

	@media (min-width: ${screen.lg}) {
		margin-left: 0;
		margin-right: 0;
	}

	@media (min-width: ${screen.xl}) {
		max-width: 34rem;
	}
`;

export const Buttons = styled.div`
	display: flex;
	margin-top: 2rem;
	justify-content: center;

	& > *:not(:first-child) {
		margin-left: 1rem;
	}

	@media (min-width: ${screen.lg}) {
		justify-content: start;
	}
`;

export const Button = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	background-color: ${({ bg }) => bg};
	font-size: 1rem;
	color: var(--grey);

	& > svg {
		margin-right: 0.25rem;
		max-width: 1.375rem;
	}
`;

export const Subhead = styled.h2`
	margin-top: 4rem;
	font-size: 1.5rem;
	line-height: 2rem;
	color: var(--base-solid-1);
`;

export const List = styled.ul`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin-top: 0.25rem;
	list-style-type: none;
	font-size: 1rem;
	color: var(--text-solid-1);

	& > *:not(:last-child) {
		margin-right: 0.75rem;
	}

	@media (min-width: ${screen.lg}) {
		justify-content: start;
	}
`;

export const ListItem = styled.li`
	display: flex;
	align-items: center;
	margin-top: 0.75rem;

	& > *:first-child {
		margin-right: 0.25rem;
	}
`;

export const Icon = styled.img`
	width: 2rem;
	height: 2rem;
`;

export const Label = styled.span``;

export const Graphic = styled.div`
	grid-column: 1/-1;

	@media (min-width: ${screen.lg}) {
		grid-column: span 6 / span 6;
	}

	@media (min-width: ${screen.xl}) {
		grid-column: span 6 / span 6;
	}
`;

export const Image = styled.img`
	max-width: 100%;
	width: 32rem;

	@media (min-width: ${screen.lg}) {
		width: 100%;
	}
`;

export const Footer = styled.footer`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 2rem;
`;
export const FooterLinks = styled.ul`
	display: flex;
	justify-content: center;
	list-style-type: none;

	& > *:not(:first-child) {
		margin-left: 2rem;
	}
`;

export const FooterLinkItem = styled.li``;

export const FooterLink = styled.a`
	display: flex;
	transition: opacity 0.2s ease-in-out 0s;
	color: ${({ color }) => color};

	&:hover {
		opacity: 1;
	}
`;

export const FooterIcon = styled.img`
	display: block;
`;

export const FooterLabel = styled.span`
	visibility: hidden;
	width: 0;
	height: 0;
`;
