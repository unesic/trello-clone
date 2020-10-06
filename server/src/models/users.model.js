// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const modelName = "users";
	const mongooseClient = app.get("mongooseClient");
	const schema = new mongooseClient.Schema(
		{
			googleId: { type: String, required: true },
			email: { type: String, required: true },
			name: { type: String, required: true },
			image: { type: String, required: true },
		},
		{
			timestamps: true,
		}
	);

	// This is necessary to avoid model compilation errors in watch mode
	// see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
	if (mongooseClient.modelNames().includes(modelName)) {
		mongooseClient.deleteModel(modelName);
	}
	return mongooseClient.model(modelName, schema);
};
