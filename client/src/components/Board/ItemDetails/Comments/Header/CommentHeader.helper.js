const getTimestamp = (timestamp) => {
	const TIME_CONSTANTS = {
		second: 1000,
		minute: 1000 * 60,
		hour: 1000 * 60 * 60,
		day: 1000 * 60 * 60 * 24,
		month: 1000 * 60 * 60 * 24 * 12,
		year: 1000 * 60 * 60 * 24 * 365,
	};
	const date1 = new Date();
	const date2 = new Date(timestamp);

	const dateDiff = date1 - date2;
	const diff = {
		second: Math.floor(dateDiff / TIME_CONSTANTS.second),
		minute: Math.floor(dateDiff / TIME_CONSTANTS.minute),
		hour: Math.floor(dateDiff / TIME_CONSTANTS.hour),
		day: Math.floor(dateDiff / TIME_CONSTANTS.day),
		month: Math.floor(dateDiff / TIME_CONSTANTS.month),
		year: Math.floor(dateDiff / TIME_CONSTANTS.year),
	};

	const res = {};
	Object.keys(diff).forEach((key) => {
		if (diff[key]) {
			res.timestamp = `${diff[key]} ${key}${
				diff[key] > 1 ? "s" : ""
			} ago`;
		}
	});

	res.exact = `${date2.toLocaleDateString()}, ${date2.toLocaleTimeString()}`;

	return res;
};

export default getTimestamp;
