const { Service } = require("feathers-mongoose");

exports.Boards = class Boards extends Service {
	create(data, params) {
		const newData = {
			...data,
			ownerId: params.user._id,
		};

		return super.create(newData, params);
	}
};
