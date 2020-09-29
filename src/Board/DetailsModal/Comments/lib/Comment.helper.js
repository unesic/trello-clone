const getTimestamp = (timestamp) => {
	const TIME_CONSTANTS = {
		seconds: 1000,
		minutes: 1000 * 60,
		hours: 1000 * 60 * 60,
		days: 1000 * 60 * 60 * 24,
		months: 1000 * 60 * 60 * 24 * 12,
		years: 1000 * 60 * 60 * 24 * 365,
	};
	const date1 = new Date();
	const date2 = new Date(timestamp);

	const dateDiff = date1 - date2;
	const diff = {
		seconds: Math.floor(dateDiff / TIME_CONSTANTS.seconds),
		minutes: Math.floor(dateDiff / TIME_CONSTANTS.minutes),
		hours: Math.floor(dateDiff / TIME_CONSTANTS.hours),
		days: Math.floor(dateDiff / TIME_CONSTANTS.days),
		months: Math.floor(dateDiff / TIME_CONSTANTS.months),
		years: Math.floor(dateDiff / TIME_CONSTANTS.years),
	};

	const res = {};
	Object.keys(diff).forEach((key) => {
		if (diff[key]) {
			res.timestamp = `${diff[key]} ${key} ago`;
		}
	});

	res.exact = `${date2.toLocaleDateString()}, ${date2.toLocaleTimeString()}`;

	return res;
};

export default getTimestamp;
