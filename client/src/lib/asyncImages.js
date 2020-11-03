import axios from "axios";

export const searchImages = async (term) => {
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

		const parsed = images.map((image) => {
			const { id, color, urls } = image;
			return {
				id: id,
				color: color,
				urls: urls,
			};
		});

		return parsed;
	} catch (err) {
		console.log(err);
	}
};

export const getRandomImages = async () => {
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
		const images = res.data.map((image) => {
			const { id, color, urls, alt_description } = image;

			return {
				id: id,
				color: color,
				urls: urls,
				alt: alt_description,
				isFavorite: false,
			};
		});

		return images;
	} catch (err) {
		console.log(err);
		return null;
	}
};
