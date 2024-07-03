const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const webRoutes = require("./src/routes/web");
const setCurrentRoute = require("./src/app/Http/middleware/setCurrentRoute");

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/resource/views")); // Set the views directory

// Use express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "layouts/app");

// Serve static files
app.use(express.static(path.join(__dirname, "src/public")));
app.use(
  "/public/assets",
  express.static(path.join(__dirname, "src/public/assets"))
);

// Use the setCurrentRoute middleware
app.use(setCurrentRoute);

app.use("/", webRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
