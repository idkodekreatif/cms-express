const Post = require("../../../../Models/Posts");
const generateSlug = require("../../../../../Utils/slugify");
const Category = require("../../../../Models/Categories");

exports.create = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("dashboard/post/create", {
      title: "Create New Post",
      categories, // Passing categories to the view
      layout: "./layouts/dashboard",
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.render("dashboard/post/create", {
      error: "Error fetching categories.",
      categories: [],
      layout: "./layouts/dashboard",
    });
  }
};

exports.store = async (req, res) => {
  try {
    const { category_id, title, content, views, status, published, type } =
      req.body;
    const slug = generateSlug(title);
    const img = req.file ? `/uploads/${req.file.filename}` : null;

    const post = new Post({
      user_id: req.user._id,
      category_id,
      title,
      slug,
      content,
      img,
      views,
      status,
      published,
      type, // Simpan jenis post yang dipilih
    });

    await post.save();
    res.redirect("/post"); // Ganti dengan path yang sesuai
  } catch (error) {
    console.error("Error creating post:", error);
    res.render("dashboard/post/create", {
      error: "Error creating post.",
      categories: res.locals.categories,
      layout: "./layouts/dashboard",
    });
  }
};
