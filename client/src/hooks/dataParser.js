export const fromString = (data) => {
	return JSON.parse(data.replace(/'/g, '"'));
}

export const toString = (data) => {
	return JSON.stringify(data).replace(/"/g, "'");
}