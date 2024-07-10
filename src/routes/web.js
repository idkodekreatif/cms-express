const express = require("express");
const router = express.Router();

const ensureAuthenticated = require("../app/Http/Middlewares/authMiddleware");

// Controllers
const Auth = require("../app/Http/Controllers/Auth/AuthController");
const HomePageControlller = require("../app/Http/Controllers/HomePage/HomePageController");
const Dash = require("../app/Http/Controllers/Dashboard/DashboardController");
const Categories = require("../app/Http/Controllers/Dashboard/Categories/categoryController");
const Posts = require("../app/Http/Controllers/Dashboard/Posts/PostsController");
const Articles = require("../app/Http/Controllers/Dashboard/Articles/ArticlesController");
const Portofolio = require("../app/Http/Controllers/Dashboard/Portofolios/PortofolioController");

const upload = require("../app/Http/Middlewares/uploadMiddleware");
const getCategories =
  require("../app/Http/Middlewares/categoryMiddleware").getCategories;

router.get("/", HomePageControlller.index);
router.get("/about", HomePageControlller.about);

router.get("/login", Auth.login);
router.post("/login", Auth.login);
router.get("/register", Auth.register);
router.post("/register", Auth.register);
router.get("/logout", Auth.logout);

router.get("/dashboard", Dash.adminPanel, ensureAuthenticated);

router.get("/categories", Categories.index, ensureAuthenticated);
router.post("/categories", Categories.store, ensureAuthenticated);
router.post("/categories", Categories.update, ensureAuthenticated);
router.get("/categories/delete/:id", Categories.delete, ensureAuthenticated);

router.get("/post", ensureAuthenticated, getCategories, Posts.create);
router.post("/post", ensureAuthenticated, upload.single("img"), Posts.store);
router.get("/post/edit/:id", Posts.edit);
router.post("/post/edit/:id", upload.single("img"), Posts.update);
router.post("/post/delete/:id", Posts.delete);

// Rute untuk artikel
router.get("/articles", Articles.index, ensureAuthenticated);

// Rute untuk portofolio
router.get("/portofolio", Portofolio.index, ensureAuthenticated);

module.exports = router;
