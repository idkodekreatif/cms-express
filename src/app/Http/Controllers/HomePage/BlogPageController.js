const Post = require("../../../Models/Posts"); // Pastikan path ke model sesuai dengan struktur proyek Anda
const Category = require("../../../Models/Categories"); // Pastikan path ke model sesuai dengan struktur proyek Anda

exports.index = async (req, res) => {
  try {
    // Mengambil data dari database, mengurutkannya berdasarkan tanggal pembuatan terbaru, dan membatasi jumlah data menjadi 9
    const latestPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(9)
      .populate("category_id", "name")
      .exec();

    // Mengambil data dari database, mengurutkannya berdasarkan views tertinggi, dan membatasi jumlah data menjadi 4
    const popularPosts = await Post.find()
      .sort({ views: -1 })
      .limit(4)
      .populate("category_id", "name")
      .exec();

    // Render data ke template view
    res.render("homepage/blog/blog", {
      title: "Blog",
      latestPosts: latestPosts, // Kirimkan data post terbaru ke view
      popularPosts: popularPosts, // Kirimkan data post populer ke view
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
