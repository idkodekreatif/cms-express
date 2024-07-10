const Post = require("../../../../Models/Posts");
const generateSlug = require("../../../../../Utils/slugify");
const Category = require("../../../../Models/Categories");
const upload = require("../../../Middlewares/uploadMiddleware");
const path = require("path");
const fs = require("fs").promises;

exports.create = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("dashboard/post/create", {
      title: "Create New Post",
      categories,
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
      type,
    });

    await post.save();
    res.redirect("back"); // Ganti dengan path yang sesuai
  } catch (error) {
    console.error("Error creating post:", error);
    const categories = await Category.find();
    res.render("dashboard/post/create", {
      error: "Error creating post.",
      categories,
      layout: "./layouts/dashboard",
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const categories = await Category.find();

    if (!post || !categories) {
      return res.status(404).render("404", { layout: "./layouts/dashboard" });
    }
    res.render("dashboard/post/edit", {
      title: "Edit Post",
      post,
      categories,
      layout: "./layouts/dashboard",
    });
  } catch (error) {
    console.error("Error fetching post for edit:", error);
    res.render("dashboard/post/edit", {
      error: "Error fetching post.",
      post: {},
      categories: [],
      layout: "./layouts/dashboard",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { category_id, title, content, views, status, published, type } =
      req.body;

    if (!title || typeof title !== "string") {
      throw new Error("Title is required and must be a string");
    }

    const slug = generateSlug(title);
    const img = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.existingImage;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        category_id,
        title,
        slug,
        content,
        img,
        views,
        status,
        published: new Date(published) || new Date(),
        type,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).render("404", { layout: "./layouts/dashboard" });
    }

    res.redirect("back"); // Adjust the path as needed
  } catch (error) {
    console.error("Error updating post:", error);
    const categories = await Category.find();
    res.render("dashboard/post/edit", {
      error: "Error updating post.",
      post: { ...req.body, _id: req.params.id },
      categories,
      layout: "./layouts/dashboard",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const postId = req.params.id;

    // Delete post from the database
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).send("Post not found");
    }

    // Delete the associated image file if it exists
    if (deletedPost.img) {
      // Debugging: Log the original image value
      console.log("Original Image value:", deletedPost.img);

      // Remove the /uploads/ prefix if it exists
      const imageFileName = deletedPost.img.replace("/uploads/", "");

      // The path should be relative to the root of your project
      const imagePath = path.resolve(
        __dirname,
        "../../../../../public/uploads",
        imageFileName
      );

      // Debugging: Log the image path
      console.log("Image path:", imagePath);

      try {
        await fs.access(imagePath); // Check if the file exists
        await fs.unlink(imagePath);
        console.log("Deleted image:", deletedPost.img);
      } catch (unlinkError) {
        if (unlinkError.code === "ENOENT") {
          console.error("Image file not found:", imagePath);
        } else {
          console.error("Error deleting image file:", unlinkError);
        }
      }
    }

    // Redirect or send success response
    res.redirect("back"); // Adjust the path as needed
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Error deleting post");
  }
};
