const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  slug: { type: String, require: true, unique: true },
});

module.exports = mongoose.model("Categories", categorySchema);
