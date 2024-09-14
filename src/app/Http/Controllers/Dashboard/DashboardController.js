const Post = require("../../../Models/Posts"); // Asumsi Anda menggunakan Mongoose
const Category = require("../../../Models/Categories");

exports.adminPanel = async (req, res) => {
  try {
    const totalArticleCount = await Post.countDocuments({ type: "article" });
    const totalCategoriesCount = await Category.countDocuments();

    const latestArticles =
      (await Post.find({
        type: "article",
        status: "published",
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("category_id")
        .exec()) || []; // Berikan nilai default jika tidak ada data

    const popularArticles =
      (await Post.find({
        type: "article",
        status: "published",
      })
        .sort({ views: -1 })
        .limit(5)
        .populate("category_id")
        .exec()) || []; // Berikan nilai default jika tidak ada data

    const totalPortfoliosCount = await Post.countDocuments({
      type: "portfolio",
    });

    const latestPortfolios =
      (await Post.find({
        type: "portfolio",
        status: "published",
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("category_id")
        .exec()) || []; // Berikan nilai default jika tidak ada data

    const popularPortfolios =
      (await Post.find({
        type: "portfolio",
        status: "published",
      })
        .sort({ views: -1 })
        .limit(5)
        .populate("category_id")
        .exec()) || []; // Berikan nilai default jika tidak ada data

    const highestViewsPost =
      (await Post.findOne({
        status: "published",
      })
        .sort({ views: -1 })
        .populate("user_id", "fullname")
        .populate("category_id")
        .exec()) || null; // Berikan nilai default jika tidak ada data

    // Kirim data ke view dengan nilai default jika tidak ada data
    res.render("dashboard/index", {
      title: "Dashboard",
      layout: "./layouts/dashboard",
      totalArticleCount: totalArticleCount || 0,
      totalCategoriesCount: totalCategoriesCount || 0,
      latestArticles: latestArticles.length > 0 ? latestArticles : [],
      popularArticles: popularArticles.length > 0 ? popularArticles : [],
      totalPortfoliosCount: totalPortfoliosCount || 0,
      latestPortfolios: latestPortfolios.length > 0 ? latestPortfolios : [],
      popularPortfolios: popularPortfolios.length > 0 ? popularPortfolios : [],
      highestViewsPost: highestViewsPost || null,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).send("Internal Server Error");
  }
};
