import express from 'express';
const router = express.Router();
import { getAllArticles, getArticleById } from "./articlesController.js";

router.get("/", getAllArticles);
router.get("/:id", getArticleById);
console.log("routes/articles");

export default router;