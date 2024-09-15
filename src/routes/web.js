const express = require("express");
const router = express.Router();

const breadcrumbs = require("../app/Http/Middlewares/breadcrumbs");
const ensureAuthenticated = require("../app/Http/Middlewares/authMiddleware");

// Controllers
// view front
const Auth = require("../app/Http/Controllers/Auth/AuthController");
const HomePageControlller = require("../app/Http/Controllers/HomePage/HomePageController");
const BlogPageControlller = require("../app/Http/Controllers/HomePage/BlogPageController");

// admin access
const Dash = require("../app/Http/Controllers/Dashboard/DashboardController");
const Categories = require("../app/Http/Controllers/Dashboard/Categories/categoryController");
const Posts = require("../app/Http/Controllers/Dashboard/Posts/PostsController");
const Articles = require("../app/Http/Controllers/Dashboard/Articles/ArticlesController");
const Portofolio = require("../app/Http/Controllers/Dashboard/Portofolios/PortofolioController");

const upload = require("../app/Http/Middlewares/uploadMiddleware");
const getCategories =
  require("../app/Http/Middlewares/categoryMiddleware").getCategories;

router.use(breadcrumbs);

router.get("/", HomePageControlller.index);
router.get("/about", HomePageControlller.about);
router.get("/blog", BlogPageControlller.index);

router.get("/login", Auth.login);
router.post("/login", Auth.login);
router.get("/register", Auth.register);
router.post("/register", Auth.register);
router.get("/logout", Auth.logout);

router.get("/dashboard", ensureAuthenticated, Dash.adminPanel);

router.get("/categories", ensureAuthenticated, Categories.index);
router.post("/categories", ensureAuthenticated, Categories.store);
router.post("/categories", ensureAuthenticated, Categories.update);
router.get("/categories/delete/:id", ensureAuthenticated, Categories.delete);

router.get("/post", ensureAuthenticated, getCategories, Posts.create);
router.get("/posts/:postId", Posts.views);
router.post("/post", ensureAuthenticated, upload.single("img"), Posts.store);
router.get("/post/show/:id", ensureAuthenticated, Posts.show);
router.get("/post/edit/:id", ensureAuthenticated, Posts.edit);
router.post(
  "/post/edit/:id",
  upload.single("img"),
  ensureAuthenticated,
  Posts.update
);
router.post("/post/delete/:id", ensureAuthenticated, Posts.delete);

// Rute untuk artikel
router.get("/articles", ensureAuthenticated, Articles.index);

// Rute untuk portofolio
router.get("/portofolio", ensureAuthenticated, Portofolio.index);

// Endpoint untuk mendapatkan semua kategori
router.get("/api/categories", BlogPageControlller.getAllCategories);

// Endpoint untuk mendapatkan postingan berdasarkan kategori
router.get("/api/posts", BlogPageControlller.getPostsByCategory);

module.exports = router;
