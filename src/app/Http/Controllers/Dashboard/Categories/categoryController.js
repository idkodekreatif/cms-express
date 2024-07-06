const Category = require("../../../../Models/Categories");
const generateSlug = require("../../../../../Utils/slugify");
const Categories = require("../../../../Models/Categories");

exports.index = async (req, res) => {
  try {
    const categiries = await Category.find();
    res.render("dashboard/categories/index", {
      title: "Categories",
      Categories,
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

exports.create = (req, res) => {
  res.render("dashboard/categories/create", {
    title: "Categories Create",
    layout: "./layouts/dashboard",
  });
};
