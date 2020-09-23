const reducer = (state, action) => {
	switch (action.type) {
		case "SET_ALL":
			return {
				backgroundImage: action.payload.backgroundImage,
				backgroundColor: action.payload.backgroundColor,
				transparency: action.payload.transparency,
				mode: action.payload.mode,
			};
		case "SET_BACKGROUND_IMAGE":
			return {
				...state,
				backgroundImage: `url(${action.payload})`,
			};
		case "SET_BACKGROUND_COLOR":
			return {
				...state,
				backgroundColor: action.payload,
			};
		case "SET_TRANSPARENCY":
			return {
				...state,
				transparency: action.payload,
			};
		case "SET_MODE":
			return {
				...state,
				mode: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
