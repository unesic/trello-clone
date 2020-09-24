import React, { useEffect, useRef, useReducer } from "react";

import dummyData from "./images-data.json";
import reducer from "./Images.reducer";
import {
	useOnBlur,
	useOnFocus,
	useOnChange,
	useOnKeyUp,
	useSearch,
	useGetRandom,
	usePickImage,
} from "./Images/MainImages.helper";

import Header from "./Images/Header";
import PreviousImages from "./Images/PreviousImages";
import MainImages from "./Images/MainImages";

import { ImagesWrapper, ImagesContainer } from "./Images.module.css";

const Images = ({ onImagePick }) => {
	const [state, dispatch] = useReducer(reducer, {
		images: dummyData,
		snapshotImages: [],
		prevImages: [],
		searchTerm: "",
		isSearching: false,
		searchResults: false,
		loading: true,
		isFocusing: false,
	});

	const ref = useRef(false);

	const getRandom = useGetRandom(dispatch);
	const search = useSearch(dispatch, state, state.searchTerm);

	const pickImage = usePickImage(onImagePick, dispatch, state);

	const onFocusHandler = useOnFocus(dispatch, state);
	const onBlurHandler = useOnBlur(dispatch, state);
	const onChangeHandler = useOnChange(dispatch, state);
	const onKeyUpHandler = useOnKeyUp(dispatch, state, search, onBlurHandler);

	useEffect(() => {
		// getRandom();
	}, []);

	useEffect(() => {
		const localPrevImages = JSON.parse(localStorage.getItem("prevImages"));
		if (localPrevImages && localPrevImages !== null)
			dispatch({
				type: "SET_PREV_IMAGES",
				payload: [...localPrevImages],
			});
	}, []);

	useEffect(() => {
		if (ref.current)
			localStorage.setItem(
				"prevImages",
				JSON.stringify(state.prevImages)
			);
		else ref.current = true;
	}, [JSON.stringify(state.prevImages)]);

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
						<PreviousImages
							images={state.prevImages}
							click={pickImage}
							search={state.searchResults}
						/>
						<MainImages
							images={state.images}
							click={pickImage}
							search={state.searchResults}
							searchTerm={state.searchTerm}
						/>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
};

export default Images;
