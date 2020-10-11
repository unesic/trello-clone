const reducer = (state, action) => {
	switch (action.type) {
		case "SET_PINNED":
			return {
				...state,
				pinned: [...action.payload],
			};
		case "SET_OTHERS":
			return {
				...state,
				others: [...action.payload],
			};
		case "SET_ALL":
			return {
				...action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
