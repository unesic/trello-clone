// items-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const modelName = "items";
	const mongooseClient = app.get("mongooseClient");
	const { Schema } = mongooseClient;
	const schema = new Schema(
		{
			name: {
				type: String,
				required: false,
				default: "",
			},
			description: {
				type: String,
				required: false,
				default: "",
			},
			done: {
				type: Boolean,
				required: false,
				default: false,
			},
			comments: {
				type: [String],
				required: false,
				default: [],
			},
			checklist: {
				type: String,
				required: false,
				default: "[]",
			},
			tags: {
				type: [String],
				required: false,
				default: [],
			},
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
