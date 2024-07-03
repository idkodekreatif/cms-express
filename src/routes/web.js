const express = require("express");
const router = express.Router();

// Controllers
const HomePageControlller = require("../app/Http/Controllers/HomePage/HomePageController");

router.get("/", HomePageControlller.index);
router.get("/about", HomePageControlller.about);

module.exports = router;
