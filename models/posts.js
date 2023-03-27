import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Posts", postsSchema);