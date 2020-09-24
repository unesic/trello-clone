import { useCallback } from "react";
import axios from "axios";

export const useOnFocus = (dispatch, state) => {
	return useCallback(() => {
		if (!state.isFocusing) {
			dispatch({
				type: "SET_MULTIPLE",
				payload: {
					...state,
					snapshotImages: [...state.images],
					isFocusing: true,
				},
			});
		}
	}, [state.images, state.prevImages]);
};

export const useOnBlur = (dispatch, state) => {
	return useCallback(() => {
		if (!state.searchTerm) {
			dispatch({
				type: "SET_MULTIPLE",
				payload: {
					...state,
					isSearching: false,
					images: state.snapshotImages.length
						? [...state.snapshotImages]
						: [...state.images],
					snapshotImages: [],
					searchTerm: "",
					searchResults: false,
					isFocusing: false,
				},
			});
		}
	}, [state.searchTerm, state.snapshotImages]);
};

export const useOnChange = (dispatch, state) => {
	return useCallback(
		(e) => {
			dispatch({
				type: "SET_MULTIPLE",
				payload: {
					...state,
					isSearching: true,
					searchTerm: e.target.value,
				},
			});
		},
		[state]
	);
};

export const useOnKeyUp = (dispatch, state, search, onBlurHandler) => {
	return useCallback(
		(e) => {
			switch (e.keyCode) {
				case 13: // RETURN
					dispatch({
						type: "SET_IMAGES",
						payload: [],
					});
					search(state.searchTerm);
					break;
				case 27: // ESCAPE
					onBlurHandler();
					break;
				default:
					return;
			}
		},
		[state.searchTerm, onBlurHandler]
	);
};

export const useGetRandom = (dispatch) => {
	return async () => {
		const options = {
			featured: true,
			orientation: "landscape",
			count: 11,
			client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
		};

		const ROUTE = "/photos/random?";
		const QUERY = Object.keys(options)
			.map((key) => `${key}=${options[key]}`)
			.join("&");

		const REQUEST = process.env.REACT_APP_UNSPLASH_URL + ROUTE + QUERY;

		try {
			const res = await axios.get(REQUEST);
			const images = res.data.map((image) => ({
				id: image.id,
				color: image.color,
				urls: image.urls,
				alt: image.alt_description,
			}));

			dispatch({
				type: "SET_IMAGES",
				payload: images,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const useSearch = (dispatch, state, term) => {
	return async (term) => {
		const options = {
			query: term,
			page: 1,
			per_page: 11,
			orientation: "landscape",
			client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
		};

		const ROUTE = "/search/photos?";
		const QUERY = Object.keys(options)
			.map((key) => `${key}=${options[key]}`)
			.join("&");

		const REQUEST = process.env.REACT_APP_UNSPLASH_URL + ROUTE + QUERY;

		try {
			const res = await axios.get(REQUEST);
			const images = res.data.results;

			const parsed = images.map((image) => ({
				color: image.color,
				urls: image.urls,
			}));

			dispatch({
				type: "SET_MULTIPLE",
				payload: {
					...state,
					isSearching: false,
					images: parsed,
					searchResults: true,
					loading: false,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const usePickImage = (onImagePick, dispatch, state) => {
	return (e, img) => {
		e.preventDefault();

		if (typeof img === "string") {
			onImagePick(img);
		} else {
			onImagePick(img.urls.regular);

			const newPrevImages = state.prevImages.length
				? [...state.prevImages]
				: [];
			const isDuplicate =
				newPrevImages.findIndex((image) => image.id === img.id) >= 0;

			if (!isDuplicate) {
				newPrevImages.unshift({ ...img });
				newPrevImages.length > 6 && newPrevImages.pop();
				dispatch({
					type: "SET_PREV_IMAGES",
					payload: [...newPrevImages],
				});
			}
		}
	};
};
