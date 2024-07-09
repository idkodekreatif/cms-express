const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  img: { type: String },
  views: { type: Number, default: 0 },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  published: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },

  // Field untuk menandai jenis post
  type: { type: String, enum: ["article", "portfolio"], required: true },
});

module.exports = mongoose.model("Posts", postsSchema);
