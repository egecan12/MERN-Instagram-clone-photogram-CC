const mongoose = require("mongoose");
const { data } = require("jquery");
const post = new mongoose.Schema({
  caption: { type: String },
  filePath: { type: String },
  userId: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", post);
