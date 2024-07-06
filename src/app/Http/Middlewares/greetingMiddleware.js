const getGreeting = require("../../../Helpers/timeHelper");

const greetingMiddleware = (req, res, next) => {
  const user = req.session.user;
  res.locals.greeting = getGreeting();
  res.locals.currentTime = new Date().toLocaleTimeString();
  res.locals.username = user ? user.fullname : "Guest";
  next();
};

module.exports = greetingMiddleware;
