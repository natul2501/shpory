let articlesjson = require("../db/articles.json");

const articles = [];
let event = new Object();

articlesjson.events.forEach((e,i) =>{
    event = {
        id: e.id,
        date: e.date,
        about: e.about,
        content: e.content,
        tags: e.tags
    };
    articles[i] = e;
    console.log("js/articles.js:");
    console.log(articles[i].id, articles[i].date, articles[i].tags);
});

module.exports = articles;