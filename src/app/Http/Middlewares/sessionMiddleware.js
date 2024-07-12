module.exports = (req, res, next) => {
  res.locals.success = req.session.success;
  res.locals.error = req.session.error;

  // Clear session messages
  delete req.session.success;
  delete req.session.error;

  next();
};
