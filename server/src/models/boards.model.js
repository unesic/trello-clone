// boards-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const modelName = "boards";
	const mongooseClient = app.get("mongooseClient");
	const { Schema } = mongooseClient;
	const schema = new Schema(
		{
			ownerId: {
				type: Schema.Types.ObjectId,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			pinned: {
				type: Boolean,
				required: false,
				default: false,
			},
			data: {
				type: String,
				required: false,
				default: "",
			},
			style: {
				type: String,
				required: false,
				default:
					"{'theme':'dark','transparency':'','backgroundImage':'','backgroundColor':''}",
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
