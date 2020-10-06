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
			image: {
				type: String,
				required: false,
				default:
					"https://via.placeholder.com/300x150/323a49/02c39a?text=Board+Placeholder+Image",
			},
			data: {
				type: String,
				required: false,
				default: "",
			},
			style: {
				type: String,
				required: false,
				default: "{'theme':'','transparency':'','backgroundImage':'','backgroundColor':''}",
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
