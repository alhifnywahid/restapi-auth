// models/AuthUser.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authUserSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  emails: { type: Array },
  apiKey: { type: String, unique: true, sparse: true }, // Add apiKey field
  apiKeyLimit: { type: Number, default: 100 } // Add apiKeyLimit field
});

const AuthUser = mongoose.model('AuthUser', authUserSchema);
module.exports = AuthUser;
