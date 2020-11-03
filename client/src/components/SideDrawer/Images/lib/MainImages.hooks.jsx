import { useCallback } from "react";

import { searchImages, getRandomImages } from "../../../../lib/asyncImages";

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
						type: "SET_MULTIPLE",
						payload: {
							...state,
							images: [],
							loading: true,
							isSearching: true,
						},
					});
					search(state.searchTerm);
					break;
				case 27: // ESCAPE
					e.target.blur();
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
		const images = await getRandomImages();
		dispatch({
			type: "SET_IMAGES",
			payload: images,
		});
	};
};

export const useSearch = (dispatch, state) => {
	return async (term) => {
		try {
			const images = await searchImages(term);
			dispatch({
				type: "SET_MULTIPLE",
				payload: {
					...state,
					isSearching: false,
					images: images,
					searchResults: true,
					loading: false,
				},
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: "SET_MULTIPLE",
				payload: {
					...state,
					isSearching: false,
					loading: false,
				},
			});
		}
	};
};

export const usePickImage = (dispatch, state, onImagePick) => {
	return (img) => {
		if (typeof img === "string") {
			onImagePick({ id: null, url: null });
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
