const Post = require("../../../../Models/Posts");
const Category = require("../../../../Models/Categories");
const User = require("../../../../Models/Users");
const generateSlug = require("../../../../../Utils/slugify");

exports.index = async (req, res) => {
  try {
    const portfolios = await Post.find({ type: "portfolio" })
      .populate("category_id")
      .populate("user_id", "fullname");

    res.render("dashboard/portofolio/index", {
      title: "portfolios",
      posts: portfolios,
      layout: "./layouts/dashboard",
    });
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    res.render("dashboard/portofolio/index", {
      error: "Error fetching portfolios.",
      posts: [],
      layout: "./layouts/dashboard",
    });
  }
};
