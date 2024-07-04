const bcrypt = require("bcryptjs");
const User = require("../../../Models/Users");

exports.register = async (req, res) => {
  if (req.method === "GET") {
    const message = req.session.message || null;
    req.session.message = null;
    return res.render("auth/register", { title: "Register", message });
  }

  const { fullname, email, password } = req.body;
  // console.log("Form data:", { fullname, email, password });

  const userExists = await User.findOne({ email });
  if (userExists) {
    req.session.message = "User with this email already exists";
    return res.redirect("/register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ fullname, email, password: hashedPassword });

  try {
    await user.save();
    res.redirect("/login");
  } catch (error) {
    req.session.message = "Error registering user";
    res.redirect("/register");
  }
};

exports.login = async (req, res) => {
  if (req.method === "GET") {
    const message = req.session.message || null;
    req.session.message = null;
    return res.render("auth/login", { title: "Login", message });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.render("dashboard/index", {
      title: "Dashboard",
    });
  } else {
    req.session.message = "Invalid email or password";
    res.redirect("/login");
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error logging out");
    }
    res.redirect("/");
  });
};
