// models/AuthUser.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authUserSchema = new Schema({
	googleId: { type: String, required: true, unique: true },
	displayName: { type: String, required: true },
	emails: { type: Array },
	apiKey: {
		key: { type: String, required: true, unique: true },
		limit: { type: Number, default: 100 },
		usage: { type: Number, default: 0 },
	},
});

const AuthUser = mongoose.model("AuthUser", authUserSchema);
module.exports = AuthUser;
