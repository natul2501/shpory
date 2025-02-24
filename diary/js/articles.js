import { readFile } from "fs/promises";
const jsonData = await readFile(new URL("../db/articles.json", import.meta.url), "utf-8");
const articlesjson = JSON.parse(jsonData);

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

export default articles;