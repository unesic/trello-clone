import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import dummyData from "./images-data.json";

import Header from "./Images/Header";
import PreviousImages from "./Images/PreviousImages";
import MainImages from "./Images/MainImages";

import { ImagesWrapper, ImagesContainer } from "./Images.module.css";

const Images = ({ onImagePick }) => {
	const [images, setImages] = useState(dummyData);
	// const [images, setImages] = useState([]);
	const [snapshotImages, setSnapshotImages] = useState([]);
	const [prevImages, setPrevImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [searchResults, setSearchResults] = useState(false);
	const ref = useRef(false);

	useEffect(() => {
		// getRandom();
	}, []);

	useEffect(() => {
		const localPrevImages = JSON.parse(localStorage.getItem("prevImages"));
		if (localPrevImages && localPrevImages !== null)
			setPrevImages([...localPrevImages]);
	}, []);

	useEffect(() => {
		if (ref.current)
			localStorage.setItem("prevImages", JSON.stringify(prevImages));
		else ref.current = true;
	}, [prevImages]);

	const pickImage = (e, img) => {
		e.preventDefault();

		if (typeof img === "string") {
			onImagePick(img);
		} else {
			onImagePick(img.urls.regular);

			const newPrevImages = prevImages.length ? [...prevImages] : [];
			const isDuplicate =
				newPrevImages.findIndex((image) => image.id === img.id) >= 0;

			if (!isDuplicate) {
				newPrevImages.unshift({ ...img });
				newPrevImages.length > 6 && newPrevImages.pop();
				setPrevImages([...newPrevImages]);
			}
		}
	};

	const onFocusHandler = useCallback(() => {
		setSnapshotImages([...images]);
	}, [images]);

	const onBlurHandler = useCallback(() => {
		if (!searchTerm) {
			setIsSearching(false);
			snapshotImages.length && setImages([...snapshotImages]);
			setSnapshotImages([]);
			setSearchTerm("");
			setSearchResults(false);
		}
	}, [searchTerm, snapshotImages]);

	const onChangeHandler = useCallback((e) => {
		setIsSearching(true);
		setSearchTerm(e.target.value);
	}, []);

	const onKeyUpHandler = useCallback(
		(e) => {
			switch (e.keyCode) {
				case 13: // RETURN
					setImages([]);
					search(searchTerm);
					break;
				case 27: // ESCAPE
					onBlurHandler();
					break;
				default:
					return;
			}
		},
		[searchTerm, onBlurHandler]
	);

	const getRandom = async () => {
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

			setImages(images);
		} catch (err) {
			// console.log(err);
		}
	};

	const search = async (term) => {
		const options = {
			query: term,
			page: 1,
			per_page: 10,
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

			setIsSearching(false);
			setImages(parsed);
			setSearchResults(true);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={ImagesWrapper}>
			<Header
				searchTerm={searchTerm}
				onChange={onChangeHandler}
				onKeyUp={onKeyUpHandler}
				onFocus={onFocusHandler}
				onBlur={onBlurHandler}
			/>
			<div className={ImagesContainer}>
				{!isSearching ? (
					<>
						{prevImages.length && (
							<PreviousImages
								images={prevImages}
								click={pickImage}
								search={searchResults}
							/>
						)}
						{images.length && (
							<MainImages
								images={images}
								click={pickImage}
								search={searchResults}
								searchTerm={searchTerm}
							/>
						)}
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
};

export default Images;
