const reducer = (state, action) => {
	switch (action.type) {
		case "SET_ALL":
			return {
				backgroundImage: action.payload.backgroundImage,
				backgroundColor: action.payload.backgroundColor,
			};
		case "SET_BACKGROUND_IMAGE":
			return {
				...state,
				backgroundImage: { ...action.payload },
			};
		case "SET_BACKGROUND_COLOR":
			return {
				...state,
				backgroundColor: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
