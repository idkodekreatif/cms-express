function index(req, res) {
  res.render("homepage/index", {
    title: "Home",
  });
}

function about(req, res) {
  res.render("homepage/about", {
    title: "About",
  });
}

module.exports = {
  index,
  about,
};
