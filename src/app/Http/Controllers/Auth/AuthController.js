const bcrypt = require("bcryptjs");
const User = require("../../../Models/Users");

exports.register = async (req, res) => {
  if (req.method === "GET") {
    return res.render("auth/register", { title: "Register" });
  }

  const { fullname, email, password } = req.body;
  // console.log("Form data:", { fullname, email, password });

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.send("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ fullname, email, password: hashedPassword });

  try {
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.error("Error registering user:", error);
    res.send("Error registering user");
  }
};

exports.login = async (req, res) => {
  if (req.method === "GET") {
    return res.render("auth/login", { title: "Login" });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    //   res.redirect("/");
    res.render("dashboard/index", {
      title: "Dashboard",
    });
  } else {
    res.send("Invalid username or password");
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
