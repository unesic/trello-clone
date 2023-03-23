import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_UNSPLASH_URL;
axios.defaults.headers.Authorization = `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;

export const searchImages = async (query) => {
	try {
		const { data } = await axios.get("/search/photos", {
			params: {
				query,
				page: 1,
				per_page: 11,
				orientation: "landscape",
			},
		});
		return data.results.map(({ id, color, urls }) => ({ id, color, urls }));
	} catch (err) {
		console.log(err);
	}
};

export const getRandomImages = async () => {
	try {
		const { data } = await axios.get("/photos/random", {
			params: {
				featured: true,
				orientation: "landscape",
				count: 11,
			},
		});
		return data.map(({ id, color, urls, alt_description: alt }) => ({ id, color, urls, alt, isFavorite: false }));
	} catch (err) {
		console.log(err);
		return null;
	}
};
