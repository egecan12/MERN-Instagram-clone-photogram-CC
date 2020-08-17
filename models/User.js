const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  country: String,
  birthday: String,
  email: { type: String, required: true, unique: true },
  bio: String,
  settings: {
    type: mongoose.Schema.Types.Mixed,
    default: { publicProfile: true, pushNotifications: true },
  },
  following: [String],

  followers: [String],
});

module.exports = mongoose.model("User", user);
