import React, { useEffect, useRef, useReducer, useGlobal } from "reactn";

import reducer from "./Images.reducer";
import {
	useOnBlur,
	useOnFocus,
	useOnChange,
	useOnKeyUp,
	useSearch,
	useGetRandom,
	usePickImage,
	useToggleFavorite,
} from "./lib/MainImages.hooks";

import Header from "./lib/ImagesHeader";
import FavoriteImages from "./lib/FavoriteImages";
import PreviousImages from "./lib/PreviousImages";
import MainImages from "./lib/MainImages";

import { Instruction } from "../../../ui/styledComponents";
import Spinner from "../../../ui/Spinner";

import {
	ImagesWrapper,
	ImagesContainer,
	LoadingContainer,
} from "./Images.module.css";

const LS_PREV_IMGS = "unesicio-prevImages";
const LS_FAV_IMGS = "unesicio-favImages";

const Images = () => {
	const [boardStyle, setBoardStyle] = useGlobal("boardStyle");

	const setBackgroundImage = (image) => {
		setBoardStyle({ ...boardStyle, backgroundImage: image });
	};

	const [state, dispatch] = useReducer(reducer, {
		images: [],
		snapshotImages: [],
		prevImages: [],
		favImages: [],
		searchTerm: "",
		isSearching: false,
		searchResults: false,
		loading: false,
		isFocusing: false,
	});

	const prevRef = useRef(false);
	const favRef = useRef(false);

	const getRandom = useGetRandom(dispatch);
	const search = useSearch(dispatch, state);

	const pickImage = usePickImage(dispatch, state, setBackgroundImage);
	const toggleFavoriteHandler = useToggleFavorite(dispatch, state);

	const onFocusHandler = useOnFocus(dispatch, state);
	const onBlurHandler = useOnBlur(dispatch, state);
	const onChangeHandler = useOnChange(dispatch, state);
	const onKeyUpHandler = useOnKeyUp(dispatch, state, search, onBlurHandler);

	useEffect(() => {
		getRandom();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const prevImages = localStorage.getItem(LS_PREV_IMGS);
		if (prevImages) {
			dispatch({
				type: "SET_PREV_IMAGES",
				payload: JSON.parse(prevImages),
			});
		}

		const localFavImages = localStorage.getItem(LS_FAV_IMGS);
		if (localFavImages)
			dispatch({
				type: "SET_FAV_IMAGES",
				payload: JSON.parse(localFavImages),
			});
	}, []);

	useEffect(() => {
		if (prevRef.current) {
			const prevImgs = JSON.stringify(state.prevImages);
			localStorage.setItem(LS_PREV_IMGS, prevImgs);
		} else {
			prevRef.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(state.prevImages)]);

	useEffect(() => {
		if (favRef.current) {
			const favImgs = JSON.stringify(state.favImages);
			localStorage.setItem(LS_FAV_IMGS, favImgs);
		} else {
			favRef.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(state.favImages)]);

	return (
		<div className={ImagesWrapper}>
			<Header
				searchTerm={state.searchTerm}
				onChange={onChangeHandler}
				onKeyUp={onKeyUpHandler}
				onFocus={onFocusHandler}
				onBlur={onBlurHandler}
			/>
			<div className={ImagesContainer}>
				{!state.isSearching ? (
					<>
						<FavoriteImages
							images={state.favImages}
							click={pickImage}
							search={state.searchResults}
							currentImage={boardStyle.backgroundImage.id}
							toggleFavorite={toggleFavoriteHandler}
						/>
						<PreviousImages
							images={state.prevImages}
							click={pickImage}
							search={state.searchResults}
							currentImage={boardStyle.backgroundImage.id}
							toggleFavorite={toggleFavoriteHandler}
						/>
						<MainImages
							images={state.images}
							click={pickImage}
							search={state.searchResults}
							searchTerm={state.searchTerm}
							currentImage={boardStyle.backgroundImage.id}
							toggleFavorite={toggleFavoriteHandler}
						/>
					</>
				) : (
					<div className={LoadingContainer}>
						{state.loading ? (
							<Spinner />
						) : (
							<Instruction>
								Type search term and press enter...
							</Instruction>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Images;
