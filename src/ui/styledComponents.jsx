import styled from "styled-components";

export const Input = styled.input`
	outline: unset;
	border: unset;
	margin-top: 1px;
	margin-left: -4px;
	border-radius: 3px;
	padding: 0 4px;
	width: 100%;
	height: 100%;
	background-color: var(--input-bg);
	font: inherit;
	color: inherit;
`;

export const Textarea = styled.textarea`
	outline: unset;
	border: unset;
	margin-top: 1px;
	margin-left: -4px;
	border-radius: 3px;
	padding: 4px;
	width: 100%;
	height: 100%;
	background-color: var(--input-bg);
	font: inherit;
	color: inherit;
	resize: none;
`;

export const Placeholder = styled.span`
	opacity: 0.8;
	font-style: italic;
`;

export const Instruction = styled.p`
	padding-left: 1rem;
	color: var(--text-solid-3);
	opacity: 0.5;
`;