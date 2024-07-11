const Post = require("../../Models/Posts"); // Adjust the path according to your project structure
const Category = require("../../Models/Categories"); // Adjust the path according to your project structure

const breadcrumbs = (req, res, next) => {
  const breadcrumbs = [];
  const parts = req.path.split("/").filter((part) => part.length > 0);

  parts.forEach((part, index) => {
    breadcrumbs.push({
      name: part.charAt(0).toUpperCase() + part.slice(1),
      url: "/" + parts.slice(0, index + 1).join("/"),
    });
  });

  res.locals.breadcrumbs = breadcrumbs;
  next();
};

module.exports = breadcrumbs;
