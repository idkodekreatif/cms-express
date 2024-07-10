const Post = require("../../../Models/Posts"); // Asumsi Anda menggunakan Mongoose
const Category = require("../../../Models/Categories");

exports.adminPanel = async (req, res) => {
  try {
    const totalArticleCount = await Post.countDocuments({ type: "article" });
    const totalCategoriesCount = await Category.countDocuments();
    const latestArticles = await Post.find({
      type: "article",
      status: "published",
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("category_id")
      .exec();
    const popularArticles = await Post.find({
      type: "article",
      status: "published",
    })
      .sort({ views: -1 })
      .limit(5)
      .populate("category_id")
      .exec();

    const totalPortfoliosCount = await Post.countDocuments({
      type: "portfolio",
    });
    const latestPortfolios = await Post.find({
      type: "portfolio",
      status: "published",
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("category_id")
      .exec();
    const popularPortfolios = await Post.find({
      type: "portfolio",
      status: "published",
    })
      .sort({ views: -1 })
      .limit(5)
      .populate("category_id")
      .exec();

    const highestViewsPost = await Post.findOne({
      status: "published",
    })
      .sort({ views: -1 })
      .populate("user_id", "fullname")
      .populate("category_id")
      .exec();

    res.render("dashboard/index", {
      title: "Dashboard",
      layout: "./layouts/dashboard",
      totalArticleCount,
      totalCategoriesCount,
      latestArticles,
      popularArticles,
      totalPortfoliosCount,
      latestPortfolios,
      popularPortfolios,
      highestViewsPost,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).send("Internal Server Error");
  }
};
