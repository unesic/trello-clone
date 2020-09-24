const reducer = (state, action) => {
	switch (action.type) {
		case "SET_IMAGES":
			return {
				...state,
				images: action.payload,
			};
		case "SET_SNAPSHOT_IMAGES":
			return {
				...state,
				snapshotImages: action.payload,
			};
		case "SET_PREV_IMAGES":
			return {
				...state,
				prevImages: action.payload,
			};
		case "SET_SEARCH_TERM":
			return {
				...state,
				searchTerm: action.payload,
			};
		case "SET_IS_SEARCHING":
			return {
				...state,
				isSearching: action.payload,
			};
		case "SET_SEARCH_RESULTS":
			return {
				...state,
				searchResults: action.payload,
			};
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
			};
		case "SET_IS_FOCUSING":
			return {
				...state,
				isFocusing: action.payload,
			};
		case "SET_MULTIPLE":
			return {
				...action.payload,
			};
		default:
			return {
				...state,
			};
	}
};

export default reducer;
