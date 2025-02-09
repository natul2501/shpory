const express = require("express");
const router = express.Router();
const articlesController = require("./articlesController");

router.get("/", articlesController.getAllArticles);
router.get("/:id", articlesController.getArticleById);
console.log("routes/articles");

module.exports = router;