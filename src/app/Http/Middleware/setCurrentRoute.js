module.exports = (req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
};
