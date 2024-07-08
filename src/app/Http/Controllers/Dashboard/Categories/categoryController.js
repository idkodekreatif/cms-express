const Category = require("../../../../Models/Categories");
const generateSlug = require("../../../../../Utils/slugify");
const Categories = require("../../../../Models/Categories");

exports.index = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("dashboard/categories/index", {
      title: "Categories",
      categories,
      layout: "./layouts/dashboard",
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.render("dashboard/categories/index", {
      title: "Categories",
      error: "Error fetching categories.",
      layout: "./layouts/dashboard",
    });
  }
};

exports.store = async (req, res) => {
  const { name } = req.body;
  const slug = generateSlug(name);

  const newCategories = new Categories({ name, slug });

  try {
    await newCategories.save();
    res.redirect("/categories");
  } catch (error) {
    console.error("Error creating categories", error);
    res.render("dashboard/categories/index", {
      title: "Add New Category",
      error: "Error creating category. Please try again.",
      layout: "./layouts/dashboard",
    });
  }
};

exports.update = async (req, res) => {
  const { id, name } = req.body;
  const slug = generateSlug(name);

  try {
    await Category.findByIdAndUpdate(id, { name, slug });
    res.redirect("/categories");
  } catch (error) {
    console.error("Error updating category:", error);
    res.redirect("/categories");
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.redirect("/categories");
  } catch (error) {
    console.error("Error deleting category:", error);
    res.redirect("/categories");
  }
};
