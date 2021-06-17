var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  unique_id: Number,
  email: String,
  username: String,
  password: String,
  passwordConf: String,
  createdAt: String,
  loginAt: String,
  logoutAt: String,
  host: String,
  ipAddr: String,
});
module.exports = mongoose.model("User", userSchema);
