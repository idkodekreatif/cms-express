const express = require("express");
const router = express.Router();

// Controllers
const Auth = require("../app/Http/Controllers/Auth/AuthController");
const HomePageControlller = require("../app/Http/Controllers/HomePage/HomePageController");

router.get("/", HomePageControlller.index);
router.get("/about", HomePageControlller.about);

router.get("/login", Auth.login);
router.post("/login", Auth.login);
router.get("/register", Auth.register);
router.post("/register", Auth.register);
router.get("/logout", Auth.logout);

module.exports = router;
