exports.adminPanel = async (req, res) => {
  res.render("dashboard/index", {
    title: "Dashboard",
    layout: "./layouts/dashboard",
  });
};
