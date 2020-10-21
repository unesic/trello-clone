const reducer = (state, action) => {
	switch (action.type) {
		case "SET_NAME":
			return {
				...state,
				name: action.payload,
			};
		case "SET_DESCRIPTION":
			return {
				...state,
				description: action.payload,
			};
		case "SET_DONE":
			return {
				...state,
				done: action.payload,
			};
		case "SET_CHECKLIST":
			return {
				...state,
				checklist: action.payload,
			};
		case "SET_COMMENTS":
			return {
				...state,
				comments: action.payload,
			};
		case "SET_TAGS":
			return {
				...state,
				tags: action.payload,
			};
		case "UPDATE_ITEM":
			return {
				...action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
