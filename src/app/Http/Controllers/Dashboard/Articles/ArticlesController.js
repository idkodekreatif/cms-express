const Post = require("../../../../Models/Posts");
const Category = require("../../../../Models/Categories");
const User = require("../../../../Models/Users"); // Pastikan path dan nama ini benar
const generateSlug = require("../../../../../Utils/slugify");

exports.index = async (req, res) => {
  try {
    const articles = await Post.find({ type: "article" })
      .populate("category_id")
      .populate("user_id", "fullname"); // Populate fullname

    res.render("dashboard/article/index", {
      title: "Articles",
      posts: articles,
      layout: "./layouts/dashboard",
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.render("dashboard/article/index", {
      error: "Error fetching articles.",
      posts: [],
      layout: "./layouts/dashboard",
    });
  }
};
