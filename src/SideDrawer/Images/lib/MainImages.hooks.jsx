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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
				isFavorite: false,
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

export const useSearch = (dispatch, state) => {
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
				id: image.id,
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

export const usePickImage = (dispatch, state, onImagePick) => {
	return (e, img) => {
		e.preventDefault();

		if (typeof img === "string") {
			onImagePick({ id: -1, url: "undefined" });
		} else {
			const {
				id,
				urls: { regular: url },
			} = img;
			onImagePick({ id, url });

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

export const useToggleFavorite = (dispatch, state) => {
	return useCallback(
		(img) => {
			const newFavImages = state.favImages.length
				? [...state.favImages]
				: [];
			const newPrevImages = [...state.prevImages];
			const newImages = [...state.images];

			const idx = newFavImages.findIndex((image) => image.id === img.id);

			if (idx < 0) {
				newFavImages.push(img);
			} else {
				newFavImages.splice(idx, 1);
			}

			newPrevImages.forEach((image) => {
				if (image.id === img.id) image.isFavorite = !image.isFavorite;
			});

			newImages.forEach((image) => {
				if (image.id === img.id) image.isFavorite = !image.isFavorite;
			});

			dispatch({
				type: "SET_FAV_IMAGES",
				payload: [...newFavImages],
			});

			dispatch({
				type: "SET_MULTIPLE",
				payload: {
					...state,
					images: newImages,
					favImages: newFavImages,
					prevImages: newPrevImages,
				},
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state.images, state.favImages, state.prevImages]
	);
};
