import React from "react";
import styled from "styled-components";

const Button = styled.button`
	border: unset;
	outline: unset;
	background: unset;

	display: inline-flex;
	align-items: center;
	justify-content: flex-start;

	margin: 0 8px 8px 0;
	border-radius: 30px;
	padding: 4px 8px;
	background-color: var(--base-solid-0);

	font-size: 1em;
	color: var(--base-solid-1);
	text-align: left;
	transition: all 0.1s ease-in-out 0s;

	&:hover {
		background-color: var(--bg-solid-0);
	}
`;

const Span = styled.span`
	--size: 0.3em;
	display: block;
	margin-right: 6px;
	border-radius: var(--size);
	width: calc(var(--size) * 4);
	height: var(--size);
`;

const Tag = ({ clicked, id, title, color }) => {
	return (
		<Button onClick={() => clicked({ id, title, color })}>
			<Span style={{ backgroundColor: `${color}` }}></Span>
			{title}
		</Button>
	);
};

export default Tag;
