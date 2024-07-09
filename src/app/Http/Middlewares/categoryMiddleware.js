const Category = require("../../Models/Categories"); // Asumsikan path yang benar

async function getCategories(req, res, next) {
  try {
    const categories = await Category.find();
    res.locals.categories = categories;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
};
