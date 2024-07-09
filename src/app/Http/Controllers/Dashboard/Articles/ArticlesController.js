const Post = require("../../../../Models/Posts");
const Category = require("../../../../Models/Categories");
const User = require("../../../../Models/Users");
const generateSlug = require("../../../../../Utils/slugify");

exports.index = async (req, res) => {
  try {
    const articles = await Post.find({ type: "article" })
      .populate("category_id")
      .populate("user_id", "fullname");

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

exports.delete = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).render("404", { layout: "./layouts/dashboard" });
    }
    res.redirect("/articles"); // Adjust the path as needed
  } catch (error) {
    console.error("Error deleting article:", error);
    res.render("dashboard/article/index", {
      error: "Error deleting article.",
      posts: await Post.find({ type: "article" })
        .populate("category_id")
        .populate("user_id", "fullname"),
      layout: "./layouts/dashboard",
    });
  }
};
