const articles = require("./articles");

// Головна сторінка зі списком статей
exports.getAllArticles = (req, res) => {
    res.render("diaryListe", { title: "Головна сторінка", articles });
    console.log("js/articlesController/getAllArticles");
    console.log(res.outputData);
};

// Окрема стаття
exports.getArticleById = (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) {
        return res.status(404).send("Статтю не знайдено");
    }
    res.render("diaryArticle", { title: article.about, article });
    console.log("js/articlesController/getarticleById");
    console.log(res.outputData);
};