exports.index = async (req, res) => {
  res.render("homepage/index", {
    title: "Home",
  });
};

exports.about = async (req, res) => {
  res.render("homepage/about", {
    title: "About",
  });
};
