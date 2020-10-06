import styled from "styled-components";

export const Fieldset = styled.fieldset`
	position: relative;
	border: unset;
	padding: 0 8px;

	&:focus {
		width: 100%;
	}

	& + fieldset {
		margin-top: 24px;
	}
`;

export const Label = styled.label`
	position: absolute;
	z-index: -1;
	top: 50%;
	left: 16px;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	color: var(--base-solid-1);

	visibility: visible;
	opacity: 0.5;
	transition: all 0.2s ease-in-out 0s;
`;

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

	&:hover ~ label {
		opacity: 1;
	}

	&:focus ~ label {
		top: -35%;
		font-size: 0.8em;
		font-weight: 600;
		opacity: 1;
	}
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
