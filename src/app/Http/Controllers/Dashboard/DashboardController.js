exports.adminPanel = async (req, res) => {
  res.render("dashboard/index", {
    title: "Dashboard",
    layout: "./layouts/dashboard",
  });
};

exports.input = async (req, res) => {
  res.render("dashboard/create", {
    title: "Dashboard",
    layout: "./layouts/dashboard",
  });
};
