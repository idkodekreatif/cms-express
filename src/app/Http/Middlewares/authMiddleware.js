function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    req.user = req.session.user; // Make sure req.user is set
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = ensureAuthenticated;
