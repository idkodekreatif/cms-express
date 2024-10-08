const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const sessionConfig = require("./src/app/Http/Middlewares/sessionConfig");
const sessionMiddleware = require("./src/app/Http/Middlewares/sessionMiddleware");
const app = express();
const webRoutes = require("./src/routes/web");
const setCurrentRoute = require("./src/app/Http/Middlewares/setCurrentRoute");
const connectToDatabase = require("./src/configs/connectToDatabase");
const greetingMiddleware = require("./src/app/Http/Middlewares/greetingMiddleware");
const methodOverride = require("method-override");

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/resource/views"));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "layouts/app");

// Serve static files
app.use(express.static(path.join(__dirname, "src/public")));
app.use(
  "/public/assets",
  express.static(path.join(__dirname, "src/public/assets"))
);

// Connect to MongoDB
connectToDatabase();

// Use the setCurrentRoute middleware
// Middleware
app.use(setCurrentRoute);
app.use(sessionConfig);
app.use(sessionMiddleware);
app.use(greetingMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(webRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
