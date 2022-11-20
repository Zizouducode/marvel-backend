//Import
const mongoose = require("mongoose");

//Model declaration
const User = mongoose.model("User", {
  email: String,
  usernam: String,
  token: String,
  hash: String,
  salt: String,
});

//Export
module.exports = User;
