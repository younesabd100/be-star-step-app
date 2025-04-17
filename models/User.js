const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true,
  },

  name: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);
