const Post = require("../../../Models/Posts"); // Pastikan path ke model sesuai dengan struktur proyek Anda
const Category = require("../../../Models/Categories"); // Pastikan path ke model sesuai dengan struktur proyek Anda

exports.index = async (req, res) => {
  try {
    // Mengambil data kategori
    const categories = await Category.find().exec();

    // Mengambil data post terbaru, diurutkan berdasarkan tanggal pembuatan terbaru, dan dibatasi jumlahnya menjadi 9
    const latestPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(9)
      .populate("category_id", "name")
      .exec();

    // Mengambil data post populer, diurutkan berdasarkan views tertinggi, dan dibatasi jumlahnya menjadi 4
    const popularPosts = await Post.find()
      .sort({ views: -1 })
      .limit(4)
      .populate("category_id", "name")
      .exec();

    // Render data ke template view
    res.render("homepage/blog/blog", {
      title: "Blog",
      categories: categories, // Kirimkan data kategori ke view
      latestPosts: latestPosts, // Kirimkan data post terbaru ke view
      popularPosts: popularPosts, // Kirimkan data post populer ke view
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostsByCategory = async (req, res, next) => {
  const categoryId = req.query.category_id;

  try {
    let posts;
    if (categoryId === "all") {
      posts = await Post.find()
        .populate("category_id")
        .populate("user_id")
        .sort({ createdAt: -1 });
    } else {
      posts = await Post.find({ category_id: categoryId })
        .populate("category_id")
        .populate("user_id")
        .sort({ createdAt: -1 });
    }
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
