const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  slug: { type: String, require: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Categories", categorySchema);
