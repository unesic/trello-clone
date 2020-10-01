const useHandlers = (
	text,
	setText,
	snapshot,
	setEditing,
	onSave,
	type,
	idx
) => {
	return {
		type: "text",
		value: text,
		autoFocus: true,

		onKeyPress: (e) => {
			if (e.key === "Enter" && !e.shiftKey) {
				setEditing(false);
				onSave({ type, text, idx });
			}
		},

		onChange: (e) => {
			setText(e.target.value);
		},

		onBlur: () => {
			setEditing(false);
			onSave({ type, text, idx });
		},
		onKeyUp:
			type === "editing"
				? (e) => {
						if (e.keyCode === 27) {
							setEditing(false);
							setText(snapshot);
						}
				  }
				: null,
	};
};

export default useHandlers;
