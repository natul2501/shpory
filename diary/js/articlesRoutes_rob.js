import express from 'express';
const router = express.Router();
import articlesModel from "../models/newArticleModel.js";
import UsersModel from '../models/userModel.js';
import TagsModel from '../models/tagsModel.js';
import galerieModel from '../models/galerieModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import { count } from 'console';
import { title } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diaryName = "robert-diary";

/*--------------------- 1. ПЕРЕВІРКА АВТОРИЗАЦІЇ  -------------- */
const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/diary/public/diaryLogin.html'); // Якщо користувач не авторизований, перенаправляємо на сторінку входу
  }
  next(); // Якщо авторизований, переходимо до маршруту
};

/*--------11. ВІДОБРАЖЕННЯ СПИСКУ КОРИСТУВАЧІВ --------------- */
/*- ПРИ СТВОРЕННІ НОВОЇ СТАТТІ І ВИБОРІ "ДЛЯ ВИБРАНИХ КОРИСТУВАЧІВ"- */
router.get('/apiusers', async (req, res) => {
  try {
      const users = await UsersModel.find({}, '_id username').sort({ username: 1 }); // Сортуємо за username (A-Z)
      res.json(users);
  } catch (error) {
      res.status(500).json({ error: 'Помилка сервера' });
  }
});

/*------------------------------------------------------------ */
/*------------------ 10. ГАЛЕРЕЯ  ---------------------------- */
router.get("/galerie", async (req, res) => {
  try {
    let galerieDoc = await galerieModel.findOne();
    const groupPictures = {};
    if(!galerieDoc.robGalerie){
      const group = "Es ist noch keine Bilder in Galerie";
      const pic = {imgLink:""}
      groupPictures[group] = [pic];
    } else {
      let pictures = [];
      for(let dbPic of galerieDoc.robGalerie){
        if(req.session.user){
          //статті, видимі автору
          if(dbPic.show === "author"){
            if(req.session.user.author.includes(diaryName)){
              if(dbPic.thema !== "notForGalery") pictures.push(dbPic);
            }
          }
          //статті, видимі підписникам
          if(dbPic.show === diaryName){
            if(req.session.user.author.includes(diaryName)){
              if(dbPic.thema !== "notForGalery") pictures.push(dbPic);
            }
            if(!req.session.user.author.includes(diaryName)){
              if(req.session.user.subscribe.includes(diaryName)){
                  if(dbPic.thema !== "notForGalery") pictures.push(dbPic);
              }
            }
          }
          //статті, видимі вибраним користувачам
          if(dbPic.show === "userlist"){
            if(dbPic.viewers && (dbPic.viewers.length > 0)){
              dbPic.viewers.forEach(viewer => {
                if(req.session.user._id === viewer){
                  if(dbPic.thema !== "notForGalery") pictures.push(dbPic);
                }
              })
            }
            if(req.session.user.author.includes(diaryName)){
              if(dbPic.thema !== "notForGalery") pictures.push(dbPic);
            }
          }
          //статті, видимі зареєстрованим користувачам
          if(dbPic.show === "user"){
              if(dbPic.thema !== "notForGalery") pictures.push(dbPic);
          }
          //статті, видимі для всіх
          if(dbPic.show === ""){
            if(dbPic.thema !== "notForGalery") pictures.push(dbPic);
          }
        }
        //статті, видимі для всіх незареєстрованих користувачів
          if(!req.session.user){
            if(!dbPic.show || dbPic.show === ""){
              if(dbPic.thema !== "notForGalery") pictures.push(dbPic);
            }
          }
      }
      if(!pictures || pictures.length < 0){
        const group = "Es ist noch keine Bilder in Galerie";
        const pic = {imgLink:""}
        groupPictures[group] = [pic];
      } else {
        pictures.sort((a, b) => Number(b.articleId) - Number(a.articleId)); // Сортуємо за спаданням ID статті
        pictures.forEach(pic =>{
        let group = pic.thema;
        if(!group){
          if(req.session.user && req.session.user.language === 'ua'){
            group = "Без теми";
          } else {
            group = "Ohne Kategorie"
          }
        }
        if(!groupPictures[group]){
          groupPictures[group] = [];
        }
        groupPictures[group].push(pic);
        });
      }
    }
      if(!req.session.user){
        res.render("diaryGalerieRob-de",
          { groupPictures,
            user: req.session.user,
            permissions: req.session.permissions,
            author: req.session.author,
            authorLink:diaryName});
      } else {
        if(req.session.user.language === 'ua'){
          res.render("diaryGalerieRob",
            { groupPictures,
              user: req.session.user,
              permissions: req.session.permissions,
              author: req.session.author,
              authorLink:diaryName});
        }
        if(req.session.user.language === 'de'){
          res.render("diaryGalerieRob-de",
            { groupPictures,
              user: req.session.user,
              permissions: req.session.permissions,
              author: req.session.author,
              authorLink:diaryName});
        }
      }
    return;
  } catch (error) {
    console.error("/galerie: Помилка доступу до галереї:", error);
    const message = "Server Failure: GET /galerie"
    return res.status(500).render("Messages", { message:message});
  }
});

/*------------------------------------------------------------ */
/*------------------ 5. СПИСОК СТАТЕЙ---------------------------- */
router.get("/", async (req, res) => {
    try {
      const consoleDate = new Date().toISOString();
      let articlesList = await articlesModel.find();
      const articles = [];
      let lastComments = [];
      const usersDb = await UsersModel.find();
      if(req.session.user){
        if(req.session.user.author.includes(diaryName)){console.log(`${consoleDate} | ${diaryName} |  ${req.session.user.username} /: author`);}
        else if(req.session.user.subscribe.includes(diaryName)){console.log(`${consoleDate} | ${diaryName} |  ${req.session.user.username} /: ${diaryName}`);}
        else if(!req.session.user.subscribe.includes(diaryName)){console.log(`${consoleDate} | ${diaryName} |  ${req.session.user.username} /: user`);}
      }
        if(!req.session.user){console.log(`${consoleDate} | ${diaryName} /: not logined`);}
      articlesList.forEach(articleDoc =>{
        articleDoc.articlesRob.forEach((value, key) => {
          const articleObj = schowedArticle(value, key, req.session.user, usersDb);
          if(articleObj.id) articles.push(articleObj);
        });
        articleDoc.robLastComment.forEach(comment => {
          if(req.session.user){
            //коменти, видимі автору
            if(comment.show === "author"){
              if(req.session.user.author.includes(diaryName)){
                lastComments.push(comment);
              }
            }
            //коменти, видимі підписникам
            if(comment.show === diaryName){
              if(req.session.user.subscribe.includes(diaryName) || req.session.user.author.includes(diaryName)){
                lastComments.push(comment);
              }
            }
            //коменти, видимі зареєстрованим користувачам
            if(comment.show === "user"){
              lastComments.push(comment);
            }
            //коменти, видимі вибраним користувачам
            if(comment.show === "userlist"){
              if(comment.viewers && comment.viewers.length > 0){
                if(!req.session.user.author.includes(diaryName)){
                  value.viewers.forEach(viewer => {
                    if(req.session.user._id === viewer){
                      lastComments.push(comment);
                    }
                  });
                }
              }
            }
            if(comment.show === "")lastComments.push(comment);
          } else {
            //коменти, видимі всім читачам
            if(comment.show === "")lastComments.push(comment);
          }
        })
      });
      articles.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp)); // Сортуємо за спаданням ID
      const TagsDoc = await TagsModel.findOne();
      const tags = TagsDoc.tagsRobert;
      tags.sort(function (a, b) {
        return a.name.localeCompare(b.name, ['uk', 'de'], { sensitivity: 'base' });
      });
      const articleObj = {
        articles,
        lastComments,
        tags,
        user: req.session.user,
        permissions: req.session.permissions,
        author: req.session.author,
        authorLink:diaryName
      }
      if(req.session.user){
          if(req.session.user.language === 'ua'){
            res.render("diaryListeRob", articleObj);
          }
          if(req.session.user.language === 'de'){
            res.render("diaryListeRob-de", articleObj);
          }
    }
      if(!req.session.user){
        res.render("diaryListeRob-de", articleObj);
      }
      return;
    } catch (error) {
      console.error("/: Помилка отримання статей:", error);
      const message = "Помилка сервера: GET /"
      return res.status(500).render("Messages", { message:message});
    }
  });

router.get("/api/articles", async (req, res) => {
    try {
      const { tagname } = req.query;
      const offset = parseInt(req.query.offset) || 0;
      const limit = 20;
      let articlesList = await articlesModel.find();
      const articles = [];
      let lastComments = [];
      let existingFlag = false;
      const usersDb = await UsersModel.find();
      articlesList.forEach(articleDoc =>{
        articleDoc.articlesRob.forEach((article, key) => {
          if(tagname){
            let tagsArray = article.tags ? article.tags.split(",").map(tag => tag.trim()) : [];
            if (tagsArray.includes(tagname)) {
              if(article.date) existingFlag = true;
              const articleObj = schowedArticle(article, key, req.session.user, usersDb);
              if(articleObj.id) articles.push(articleObj);
            }
          } else {
            if(article.date) existingFlag = true;
            const articleObj = schowedArticle(article, key, req.session.user, usersDb);
            if(articleObj.id) articles.push(articleObj);
          }
        });
        articleDoc.robLastComment.forEach(comment => {
          if(req.session.user){
            //коменти, видимі автору
            if(comment.show === "author"){
              if(req.session.user.author.includes(diaryName)){
                lastComments.push(comment);
              }
            }
            //коменти, видимі підписникам
            if(comment.show === diaryName){
              if(req.session.user.subscribe.includes(diaryName) || req.session.user.author.includes(diaryName)){
                lastComments.push(comment);
              }
            }
            //коменти, видимі зареєстрованим користувачам
            if(comment.show === "user"){
              lastComments.push(comment);
            }
            //коменти, видимі вибраним користувачам
            if(comment.show === "userlist"){
              if(comment.viewers && comment.viewers.length > 0){
                if(!req.session.user.author.includes(diaryName)){
                  value.viewers.forEach(viewer => {
                    if(req.session.user._id === viewer){
                      lastComments.push(comment);
                    }
                  });
                }
              }
            }
            if(comment.show === "")lastComments.push(comment);
          } else {
            //коменти, видимі всім читачам
            if(comment.show === "")lastComments.push(comment);
          }
          
        })
      });
      if(!articles.length){
        let articleMessage = {
          thema: '',
          id:0,
          tags: '',
          date: false,
          content: '',
          comments: [],
          show:'',
          viewers: [],
          articleSymbol:'',
          title:''
        }
        if(existingFlag){
          if(req.session.user){
            if(req.session.user.language === 'ua'){
              articleMessage.thema = `Автор обмежив доступ до статей`;
              articles.push(articleMessage);
            } 
            if(req.session.user.language === 'de'){
              articleMessage.thema = `Der Autor hat den Zugriff auf Artikel eingeschränkt`;
              articles.push(articleMessage);
            } 
          } else {
            const userLang = navigator.language || navigator.userLanguage;
            if(userLang === 'ua-UA'){
              articleMessage.thema = `Автор обмежив доступ до статей`;
              articles.push(articleMessage);
            } else{
              articleMessage.thema = `Der Autor hat den Zugriff auf Artikel eingeschränkt`;
              articles.push(articleMessage);
            } 
          }
        } else {
          const userLang = navigator.language || navigator.userLanguage;
          if(userLang === 'ua-UA'){
            articleMessage.thema = `Статтей не знайдено`;
            articles.push(articleMessage);
          } else {
            articleMessage.thema = `Artikel sind nicht gefunden`;
            articles.push(articleMessage);
          } 
        }
        const paginated = articles.slice(offset, offset + limit);
        return res.json(paginated);
  
      }
      articles.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp));
      const paginated = articles.slice(offset, offset + limit);
      res.json(paginated);
    } catch (error) {
      console.error("Помилка API /api/articles:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

/*--------------------------------------------------------- */
/*-------------------- 6. СТАТТЯ------------------------------ */
router.get("/:id", async (req, res) => {
    try {
      const articlesList = await articlesModel.find();
      const usersDb = await UsersModel.find();
      let viewerslist = [];
      let article = null;
      const articleId = req.params.id;
      for (const articleDoc of articlesList){
          if(articleDoc.articlesRob.has(articleId)){
              article = articleDoc.articlesRob.get(articleId);
              break;
          }
      }
      if (!article) {
        if(!req.session.user){
          const message = "Стаття не знайдена GET /:id";
          res.status(404).render("Messages", { message:message});
        }
        if(req.session.user.language === 'ua'){
          const message = "Стаття не знайдена GET /:id";
          res.status(404).render("Messages", { message:message});
        }
        if(req.session.user.language === 'de'){
          const message = "Artikel ist nicht gefunden GET /:id";
          res.status(404).render("Messages", { message:message});
        }
      }
      if (article){
      let articleSymbol = "";
      let title = '';
      if(article.viewers && article.viewers.length > 0){
        article.viewers.forEach(viewer => {
          const user = usersDb.find(u => u._id.toString() === viewer.toString()); // Порівнюємо як рядки для уникнення проблем з типами
          if (user) {
            viewerslist.push(user.username);
          }
        });
      }
      const symbolObj = getArticleSymbol(article.show, req.session.user, viewerslist);
      articleSymbol = symbolObj.articleSymbol;
      title = symbolObj.title;
      const TagsDoc = await TagsModel.findOne();
      const tags = TagsDoc.tagsRobert;
      tags.sort(function (a, b) {
        return a.name.localeCompare(b.name, ['uk', 'de'], { sensitivity: 'base' });
      });
      const articleObj = {
        article,
        articleSymbol:articleSymbol,
        title:title,
        viewerslist:viewerslist,
        tags,
        articleId: articleId,
        permissions: req.session.permissions,
        author: req.session.author,
        user: req.session.user,
        authorLink:diaryName
      }
      //показ статті автору
        if(req.session.user && req.session.user.author.includes(diaryName)){
          if(req.session.user.language === 'ua'){
            res.render("diaryArticleRob", articleObj);
            }
            if(req.session.user.language === 'de'){
              res.render("diaryArticleRob-de", articleObj);
            }
          } else {
          //стаття видима лише для автора
            if(article.show === "author") {
            if(!req.session.user){
              const message = "Дана стаття має обмежений доступ для перегляду";
              res.render("Messages", { message:message});
            } else {
              if(req.session.user && !req.session.user.author.includes(diaryName)){
                if(req.session.user.language === 'ua'){
                  const message = "Дана стаття має обмежений доступ для перегляду";
                  res.render("Messages", { message:message});
                }
                if(req.session.user.language === 'de'){
                  const message = "Der zugang ist begrenzt für Sie";
                  res.render("Messages", { message:message});
                }
              }
            }
          }
          //стаття видима лише для підписників
          if(article.show === diaryName) {
            if(req.session.user && req.session.user.subscribe.includes(diaryName)) {
              if(req.session.user.language === 'ua'){
                res.render("diaryArticleRob", articleObj);
                }
                if(req.session.user.language === 'de'){
                  res.render("diaryArticleRob-de", articleObj);
                }
            } else {
              if(!req.session.user){
                const message = "Дана стаття має обмежений доступ для перегляду";
                res.render("Messages", { message:message});
              } else {
                if(req.session.user.language === 'ua'){
                  const message = "Дана стаття має обмежений доступ для перегляду";
                  res.render("Messages", { message:message});
                }
                if(req.session.user.language === 'de'){
                  const message = "Der zugang ist begrenzt für Sie";
                  res.render("Messages", { message:message});
                }
              }
            }
          }
          //стаття видима лише для вибраних користувачів
          if(article.show === "userlist") {
            if(article.viewers && article.viewers.length > 0){
              article.viewers.forEach(viewer => {
                const user = usersDb.find(u => u._id.toString() === viewer.toString()); // Порівнюємо як рядки для уникнення проблем з типами
                if (user) {
                  viewerslist.push(user.username);
                }
              });
              article.viewers.forEach(viewer => {
                if(req.session.user && req.session.user._id === viewer){
                  if(req.session.user.language === 'ua'){
                    res.render("diaryArticleRob", articleObj);
                  }
                  if(req.session.user.language === 'de'){
                    res.render("diaryArticleRob-de", articleObj);
                  }
                } else {
                  if(!req.session.user){
                    const message = "Дана стаття має обмежений доступ для перегляду";
                    res.render("Messages", { message:message});
                  } else {
                    if(req.session.user.language === 'ua'){
                      const message = "Дана стаття має обмежений доступ для перегляду";
                      res.render("Messages", { message:message});
                    }
                    if(req.session.user.language === 'de'){
                      const message = "Der zugang ist begrenzt für Sie";
                      res.render("Messages", { message:message});
                    }
                  }
                }
              });
            }
          }
          //стаття для зареєстрованих користувачів
          if(article.show === "user") {
          if(req.session.user) {
            if(req.session.user.language === 'ua'){
              res.render("diaryArticleRob", articleObj);
              }
              if(req.session.user.language === 'de'){
                res.render("diaryArticleRob-de", articleObj);
              }
          } else {
            if(!req.session.user){
              const message = "Дана стаття має обмежений доступ для перегляду";
              res.render("Messages", { message:message});
            } else {
              if(req.session.user.language === 'ua'){
                const message = "Дана стаття має обмежений доступ для перегляду";
                res.render("Messages", { message:message});
              }
              if(req.session.user.language === 'de'){
                const message = "Der zugang ist begrenzt für Sie";
                res.render("Messages", { message:message});
              }
            }
          }
        }
        //стаття для зареєстрованих користувачів
        if(article.show === "" || !article.show) {
          if(req.session.user) {
            if(req.session.user.language === 'ua'){
              res.render("diaryArticleRob", articleObj);
              }
              if(req.session.user.language === 'de'){
                res.render("diaryArticleRob-de", articleObj);
              }
          } else {
            res.render("diaryArticleRob", articleObj);
          }
        }
      }
    }
  } catch (error) {
      console.error("/:id: Помилка отримання статті:", error);
      const message = "Server Failure GET /:id";
      return res.status(500).render("Messages", { message:message});
  }
});
/*--------------------------------------------------------- */
/*-------------- ВИДАЛЕННЯ СТАТТІ-------------------------- */
router.get("/:id/remove", checkAuth, async (req, res) => {
  try {
    const articleId = req.params.id;
    let tags = "";
    const articleDoc = await articlesModel.findOne({
      [`articlesRob.${articleId}`]: { $exists: true }
    });
    if (!articleDoc) {
      if(req.session.user.language === 'ua'){
        const message = "Стаття не знайдена GET /:id/remove";
        return res.status(404).render("Messages", { message:message});
      }
      if(req.session.user.language === 'de'){
        const message = "Artikel ist nicht gefunden GET /:id/remove";
        return res.status(404).render("Messages", { message:message});
      }
      if(!req.session.user){
        const message = "Artikel ist nicht gefunden GET /:id/remove";
        return res.status(404).render("Messages", { message:message});
      }
    } else {
      tags = articleDoc.articlesRob.get(articleId).tags;
    }
    console.log("/:id/remove: теги видаленої статті: " + tags);  
    articleDoc.articlesRob.delete(articleId);
    await articleDoc.save();
    //2) підрахунок і видалення тегів
    const TagsDoc = await TagsModel.findOne();
    let articleTags = tags.split(',').map(part => part.trim());
    let containFlag = false;
    for(let delTag of articleTags){
      for(let dbTag of TagsDoc.tagsRobert){
        if(dbTag.name === delTag){
          dbTag.count--;
          console.log(`/:id/remove: ${delTag}.count-- ${dbTag.count}`);
          if(dbTag.count === 0){
            TagsDoc.tagsRobert = TagsDoc.tagsRobert.filter(item => item.name !== delTag);
            console.log(`/:id/remove: тег ${delTag} видалено зі списку тегів`);
          }
          containFlag = false;
        }
      }
    }
    await TagsDoc.save();
    //3) видаляємо картинки із галереї
    let galerieDoc = await galerieModel.findOne();
    galerieDoc.robGalerie = galerieDoc.robGalerie.filter(item => item.articleId !== articleId);
    console.log(`/:id/remove: Картинок в галереї після видалення: ${galerieDoc.robGalerie.length}`);
    await galerieDoc.save();
    console.log(`/:id/remove: Стаття із id ${articleId} видалена`);
		res.redirect("/diary/public/robert-diary");
  } catch (error) {
    console.error("/:id/remove: Помилка отримання статті:", error);
    const message = "Server Failure GET /:id/remove";
    return res.status(500).render("Messages", { message:message});
  }
});
/*--------------------------------------------------------- */
/*-------------- РЕДАГУВАННЯ СТАТТІ------------------------ */
/*--1) при натисканні кнопки редагування, перенаправляємо на створення статті і заповнюємо форму існуючими даними */
router.get("/getArticle/:id", async (req, res) => {
  try {
    console.log('router.get("/getArticle/:id"');
      const articlesList = await articlesModel.find();
      let article = null;
      for (const articleDoc of articlesList) {
          if (articleDoc.articlesRob.has(req.params.id)) {
              article = articleDoc.articlesRob.get(req.params.id);
              break;
          }
      }
      if (!article){
        if(req.session.user.language === 'ua'){
          const message = "Стаття не знайдена GET /getArticle/:id";
          return res.status(404).render("Messages", { message:message});
        }
        if(req.session.user.language === 'de'){
          const message = "Artikel ist nicht gefunden GET /getArticle/:id";
          return res.status(404).render("Messages", { message:message});
        }
        if(!req.session.user){
          const message = "Artikel ist nicht gefunden GET /getArticle/:id";
          return res.status(404).render("Messages", { message:message});
        }
      }
      res.json(article);
  } catch (error) {
      console.error("/getArticle/:id: Помилка отримання статті:", error);
      const message = "Помилка сервера GET /getArticle/:id";
      return res.status(500).render("Messages", { message:message});
  }
});
router.post("/editArticle/:id", async(req, res) => {
  try {
    const {newArticleThema, newArticleTags, newArticleContent, newArticlePermissions, selectedUsers, datetime} = req.body; // Отримуємо нові дані
    const articleId = req.params.id; // ID статті
    console.log(`Редагування статті robert/diary ${articleId}`);
    const articlesList = await articlesModel.find();
    let updatedArticle = null;
    for (const articleDoc of articlesList) {
      if (articleDoc.articlesRob.has(articleId)) {
        updatedArticle = articleDoc.articlesRob.get(articleId);
        const inputDate = datetime.shift();
        if(inputDate){
          const newDate = getFormattedDate(inputDate);
          const newTimestamp = Math.floor(new Date(inputDate).getTime() / 1000);
          updatedArticle.date = newDate;
          updatedArticle.timeStamp = newTimestamp;
        }
        updatedArticle.show = newArticlePermissions;
        updatedArticle.viewers = selectedUsers.shift().split(",");
        
//1) додаємо картинки в галерею
    let galerieDoc = await galerieModel.findOne();
    let pictures = [];
    let newPictures = searchPictureArr(newArticleContent);
    let oldPictures = searchPictureArr(updatedArticle.content);
    /*------------якщо картинка була видалена----------------*/
    galerieDoc.robGalerie.forEach(dbPic =>{
      if(dbPic.articleId === articleId) pictures.push(dbPic);
    });
    if(pictures.length > 0){
      for(let newPic of newPictures){
        pictures = pictures.filter(item => item.imgLink !== newPic.link);
      }
      console.log(`/editArticle/:id: Кількість картинок, які були видалені зі статті: ${pictures.length}`);
      if(pictures.length > 0){
        for (let pic of pictures){
          galerieDoc.robGalerie = galerieDoc.robGalerie.filter(item => (item.imgLink !== pic.imgLink) && (item.articleId !== articleId));
        }
        console.log(`/editArticle/:id: Картинок в галереї після видалення картинки зі статті: ${galerieDoc.robGalerie.length}`);
      }
      await galerieDoc.save();
    }
    pictures = [];
    /*------------якщо картинка була додана----------------*/
    const pictureFlag = newArticleContent.includes("<img");
    if(pictureFlag){
      let newFlag = true;//прапорець доданої картинки
      let existingFlag = true;//прапорець картинки, в якої була змінена категорія, але якої немає в галереї
      newPictures.forEach(newPic =>{
        oldPictures.forEach(oldPic =>{
          if(oldPic.link === newPic.link){
            /*------------перевіряємо, чи не була змінена доступ----------------*/
            if(oldPic.thema !== newPic.thema){
              let itemIndex = 0;
              for(let item of galerieDoc.robGalerie){
                if((item.imgLink === newPic.link)&&(item.articleId === articleId)){
                  existingFlag = false;
                  break;
                } else {
                  itemIndex++;
                }
              }
              /*додаємо в галерею картинку, якщо її раніше там не було*/
              if(existingFlag){
                const pictureObj = {
                  thema: newPic.thema,
                  title: newPic.title,
                  articleId: articleId,
                  imgLink:newPic.link,
                  show:updatedArticle.show,
                  viewers:updatedArticle.viewers
                }
                galerieDoc.robGalerie.push(pictureObj);
                console.log("/editArticle/:id: нова картинка в галереї після зміни доступу: ");
                console.log(pictureObj);
              }
              galerieDoc.robGalerie[itemIndex].thema = newPic.thema;
            }
            /*------------перевіряємо, чи не була змінена title----------------*/
            if(oldPic.title !== newPic.title){
              let itemIndex = 0;
              for(let item of galerieDoc.robGalerie){
                if((item.imgLink === newPic.link)&&(item.articleId === articleId)){
                  existingFlag = false;
                  break;
                } else {
                  itemIndex++;
                }
              }
              /*додаємо в галерею картинку, якщо її раніше там не було*/
              if(existingFlag){
                const pictureObj = {
                  thema: newPic.thema,
                  title: newPic.title,
                  articleId: articleId,
                  imgLink:newPic.link,
                  show:updatedArticle.show,
                  viewers:updatedArticle.viewers
                }
                galerieDoc.robGalerie.push(pictureObj);
                console.log("/editArticle/:id: нова картинка в галереї після зміни title: ");
                console.log(pictureObj);
              }
              galerieDoc.robGalerie[itemIndex].title = newPic.title;
              console.log("/editArticle/:id: оновлений title: "+ newPic.title);
            }
            /*------------перевіряємо, чи не був змінений доступ----------------*/
            if(oldPic.show !== newArticlePermissions){
              for(let item of galerieDoc.robGalerie){
                if((item.imgLink === newPic.link)&&(item.articleId === articleId)){
                  console.log(`/editArticle/:id: оновлення доступу картинки ${item.show} -> ${updatedArticle.show}`);
                  item.show = updatedArticle.show;
                  item.viewers = updatedArticle.viewers;
                  if(item.viewers && (item.viewers.length > 0)){
                    console.log("/editArticle/:id: доступ картинки для користувачів: ", item.viewers);
                  }
                  break;
                }
              }
            }
            /*---------------------------------------------------------------------*/
            newFlag = false;
          } 
        });
        if(newFlag){
          pictures.push(newPic);
        }
        newFlag = true;
      });
      /*-----------------------код для додавання до галереї існуючих картинок-----------------------------*/
      newPictures.forEach(newPic =>{
        if(!galerieDoc.robGalerie.some(item => (item.imgLink === newPic.link)&&(item.articleId === articleId))){
          if(!pictures.some(item => item.link === newPic.link)){
            const pictureObj = {
              thema: newPic.thema,
              title: newPic.title,
              link:newPic.link
            }
            pictures.push(pictureObj);
            console.log("/editArticle/:id: код для додавання до галереї існуючих картинок", pictureObj);
          }
        }
      });

      /*---------------------------------------------------------------------*/
      console.log("/editArticle/:id: нових картинок: " + pictures.length);
      if(pictures.length>0){
        pictures.forEach(picture =>{
          const pictureObj = {
            thema: picture.thema,
            title: picture.title,
            articleId: articleId,
            imgLink:picture.link,
            show:updatedArticle.show,
            viewers:updatedArticle.viewers
          }
          galerieDoc.robGalerie.push(pictureObj);
        });
        
      }
      console.log(`/editArticle/:id: Картинок в галереї після редагування: ${galerieDoc.robGalerie.length}`);
      await galerieDoc.save();
    }
//2) редагуємо документ з тегами
        const TagsDoc = await TagsModel.findOne();
        let articleTagsNew = newArticleTags.split(',').map(part => part.trim());
        let articleTagsOld = updatedArticle.tags.split(',').map(part => part.trim());
        /*------------якщо тег був доданий----------------*/
        let containFlag = false;
        for(let newTag of articleTagsNew){
          for(let oldTag of articleTagsOld){
            if(newTag === oldTag){
              containFlag = true;
            }
          }
          if(!containFlag){
            for(let dbTag of TagsDoc.tagsRobert){
              if(dbTag.name === newTag){
                if(dbTag.count < 50)dbTag.count++;
                console.log(`/editArticle/:id: Новий тег у статті: ${dbTag.name} = ${dbTag.count}`);
                containFlag = true;
              }
            }
            if(!containFlag){
              const newdbTag = {
                name: newTag,
                count:1
              }
              TagsDoc.tagsRobert.push(newdbTag);
              console.log(`/editArticle/:id: Новий тег у списку тегів: ${newdbTag.name} = ${newdbTag.count}`);
            }
          }
          containFlag = false;
        }
        /*------------якщо тег був видалений----------------*/
        containFlag = false;
        for(let oldTag of articleTagsOld){
          for(let newTag of articleTagsNew){
            if(oldTag === newTag){
              containFlag = true;
            }
          }
          if(!containFlag){
            for(let dbTag of TagsDoc.tagsRobert){
              if(dbTag.name === oldTag){
                dbTag.count--;
                console.log(`/editArticle/:id: Тег видалено зі статті статті: ${dbTag.name} = ${dbTag.count}`);
                containFlag = false;
                if(dbTag.count === 0){
                  TagsDoc.tagsRobert = TagsDoc.tagsRobert.filter(item => item.name !== oldTag);
                  console.log(`/editArticle/:id: Тег видалено зі списку тегів ${oldTag}`);
                }
              }
            }
          }
          containFlag = false;
        }
        await TagsDoc.save();
//3) перезаписуємо контент статті   
        updatedArticle.thema = newArticleThema || updatedArticle.thema;
        updatedArticle.tags = newArticleTags || updatedArticle.tags;
        updatedArticle.content = newArticleContent || updatedArticle.content;
        articleDoc.articlesRob.set(articleId, updatedArticle);
        await articleDoc.save();
        console.log(`/editArticle/:id: Стаття ${articleId} оновлена!`);
        if(req.session.user.language === 'ua'){
          const message = "<p>Стаття оновлена!</p><p><a href='/diary/public/robert-diary'>Повернутися до списку статей</a></p>";
          return res.render("Messages", { message:message});
        }
        if(req.session.user.language === 'de'){
          const message = "<p>Artikel würde aktualisiert!</p><p><a href='/diary/public/robert-diary'>Zurück zur Artikel Übersicht</a></p>";
          return res.render("Messages", { message:message});
        }
      }
    }
    if(!req.session.user){
      const message = "Artikel ist nicht gefunden POST /editArticle/:id";
      return res.status(404).render("Messages", { message:message});
    } else {
      if(req.session.user.language === 'ua'){
        const message = "Стаття не знайдена POST /editArticle/:id";
        return res.status(404).render("Messages", { message:message});
      }
      if(req.session.user.language === 'de'){
        const message = "Artikel ist nicht gefunden POST /editArticle/:id";
        return res.status(404).render("Messages", { message:message});
      }
    }
    
    
  } catch (error) {
    console.error("/editArticle/:id: Помилка оновлення статті:", error);
    const message = "Server Failure POST /editArticle/:id";
    return res.status(500).render("Messages", { message:message});
  }
});

/*------------------------------------------------------------ */
/*----------------- 7. ДОДАВАННЯ НОВОЇ СТАТТІ ------------------- */
router.get('/newArticle', checkAuth, (req,res) => {
    try {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      res.send(currentDate + currentTime + ": Дані отримано /newArticle");
    } catch (error) {
      console.error("/newArticle: Помилка отримання нового запису до щоденнику від robert" + error);
      const message = "Помилка сервера GET /newArticle";
      return res.status(500).render("Messages", { message:message});
    }
  });

// Запис нової статті із форми в diary/public/newArticle.html в БД
router.post('/newArticle', checkAuth, async (req,res) =>{
    try {
      let {newArticleThema, newArticleTags, newArticleContent, newArticlePermissions, selectedUsers, datetime} = req.body;
//1) додаємо статтю
      const inputDate = datetime.shift();
      let date;
      let timeStamp;
      if(inputDate){
        date = getFormattedDate(inputDate);
        timeStamp = Math.floor(new Date(inputDate).getTime() / 1000);
      } else {
        date = getFormattedDate();
        timeStamp = Math.floor(Date.now() / 1000);
      }
      if(!newArticleThema) newArticleThema = newArticleContent.substring(0, 200);
      let show = newArticlePermissions;
      selectedUsers = selectedUsers.shift().split(",");
      console.log(`/newArticle: права доступу: ${show}; вибрані користувачі: `, selectedUsers);
      let articlesDoc = await articlesModel.findOne();
      if(!articlesDoc){
        return res.send("Не вдалося завантажити файл articlesDoc.articlesRob у /newArticle");
      }
      let articlesList = articlesDoc.articlesRob;
      const existingKeys = Array.from(articlesList.keys());
      let articleId = 0;
      existingKeys.forEach(key => {
        if(Number(key) > articleId){
          articleId = Number(key);
        } 
      });
      let articleIdString = (articleId+1).toString();
      const newArticle = {
        thema: newArticleThema,
        tags: newArticleTags,
        date: date,
        timeStamp:timeStamp,
        content: newArticleContent,
        comments: {},
        reactions: {},
        mood: "",
        show:show,
        viewers:selectedUsers
      }
      articlesList.set(articleIdString, newArticle);
      await articlesDoc.save();
//2) додаємо теги
      let TagsDoc = await TagsModel.findOne();
      if(!TagsDoc){
        return res.send("Не вдалося завантажитит файл TagsDoc.tagsRobert у /newArticle");
      }
      let articleTags = newArticleTags.split(',').map(part => part.trim());
      let containFlag = false;
      for(let i=0; i<articleTags.length;i++){
        for(let j=0; j<TagsDoc.tagsRobert.length;j++) {
          if(TagsDoc.tagsRobert[j].name === articleTags[i]){
            if(TagsDoc.tagsRobert[j].count < 50){
              TagsDoc.tagsRobert[j].count++;
            }
            containFlag = true;
          }
        }
        if(!containFlag){
          const newTag = {
            name: articleTags[i],
            count:1
          }
          TagsDoc.tagsRobert.push(newTag);
        }
        containFlag = false;
      }
      await TagsDoc.save();
//3) додаємо картинки в галерею
      const pictureFlag = newArticleContent.includes("<img");
      if(pictureFlag){
        let pictures = searchPictureArr(newArticleContent);
        let galerieDoc = await galerieModel.findOne();
        if(!galerieDoc){
          res.send("Помилка отримання galerieDoc в /newArticle");
        }
        pictures.forEach(picture =>{
          const pictureObj = {
            thema: picture.thema,
            title: picture.title,
            articleId: articleIdString,
            imgLink:picture.link,
            show:show,
            viewers:selectedUsers
          }
          galerieDoc.robGalerie.push(pictureObj);
        });
        console.log(`/newArticle: Картинок в галереї після додавання нової статті: ${galerieDoc.robGalerie.length}`);
        await galerieDoc.save();
      }
      console.log(`/newArticle: newArticle von robert is created!`);
      const message = `<p>Стаття успішно додана на сервер!</p><p><a href='/diary/public/${diaryName}'>Повернутися до списку статей</a></p>`;
      return res.render("Messages", { message:message});
    } catch (error) {
      console.log("/newArticle: ", error);
      const message = "Server Failure POST /newArticle";
      return res.status(500).render("Messages", { message:message});
    }
  });
  
  router.get('/newArticleDe', checkAuth, (req,res) => {
    try {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      res.send(currentDate + currentTime + ": Datei erhalten /newArticle-de");
    } catch (error) {
      console.error("/newArticleDe: Помилка отримання нового запису до щоденнику від Robert" + error);
      const message = "Server error GET /newArticleDe";
      return res.status(500).render("Messages", { message:message});
    }
  });

// Запис нової статті із форми в diary/public/newArticle.html в БД
router.post('/newArticleDe', checkAuth, async (req,res) =>{
    try {
      let {newArticleThema, newArticleTags, newArticleContent, datetime, newArticlePermissions, selectedUsers} = req.body;
//1) додаємо статтю
      const inputDate = datetime.shift();
      let date;
      let timeStamp;
      if(inputDate){
        date = getFormattedDate(inputDate);
        timeStamp = Math.floor(new Date(inputDate).getTime() / 1000);
      } else {
        date = getFormattedDate();
        timeStamp = Math.floor(Date.now() / 1000);
      } 
      if(!newArticleThema) newArticleThema = newArticleContent.substring(0, 200);
      let show = newArticlePermissions;
      selectedUsers = selectedUsers.shift().split(",");
      console.log(`/newArticleDe: права доступу: ${show}; вибрані користувачі: `, selectedUsers);
      let articlesDoc = await articlesModel.findOne();
      if(!articlesDoc){
        return res.send("articlesDoc.articlesRob nicht gefunden in /newArticleDe");
      }
      let articlesList = articlesDoc.articlesRob;
      const existingKeys = Array.from(articlesList.keys());
      let articleId = 0;
      existingKeys.forEach(key => {
        if(Number(key) > articleId){
          articleId = Number(key);
        } 
      });
      let articleIdString = (articleId+1).toString();
      const newArticle = {
        thema: newArticleThema,
        tags: newArticleTags,
        date: date,
        timeStamp:timeStamp,
        content: newArticleContent,
        comments: {},
        reactions: {},
        mood: "",
        show:show,
        viewers:selectedUsers
      }
      
      articlesList.set(articleIdString, newArticle);
      await articlesDoc.save();
//2) додаємо теги
      let TagsDoc = await TagsModel.findOne();
      if(!TagsDoc){
        return res.send("TagsDoc.tagsRobert nicht gefunden in /newArticleDe");
      }
      let articleTags = newArticleTags.split(',').map(part => part.trim());
      let containFlag = false;
      for(let i=0; i<articleTags.length;i++){
        for(let j=0; j<TagsDoc.tagsRobert.length;j++) {
          if(TagsDoc.tagsRobert[j].name === articleTags[i]){
            if(TagsDoc.tagsRobert[j].count < 50){
              TagsDoc.tagsRobert[j].count++;
            }
            containFlag = true;
            console.log(`/newArticleDe: Новий тег у статті: ${TagsDoc.tagsRobert[j].name} = ${TagsDoc.tagsRobert[j].count}`);
          }
        }
        if(!containFlag){
          const newTag = {
            name: articleTags[i],
            count:1
          }
          TagsDoc.tagsRobert.push(newTag);
          console.log(`/newArticleDe: Новий тег у списку тегів: ${newTag}`);
        }
        containFlag = false;
      }
      await TagsDoc.save();
//3) додаємо картинки в галерею
      const pictureFlag = newArticleContent.includes("<img");
      if(pictureFlag){
        let pictures = searchPictureArr(newArticleContent);
        let galerieDoc = await galerieModel.findOne();
        if(!galerieDoc) {
          res.send("Fehler beim erhalten GalerieDoc in /newArticleDe");
        }
        pictures.forEach(picture =>{
          const pictureObj = {
            thema: picture.thema,
            title: picture.title,
            articleId: articleIdString,
            imgLink:picture.link,
            show:show,
            viewers:selectedUsers
          }
          galerieDoc.robGalerie.push(pictureObj);
          console.log("/newArticleDe: нова картинка в галереї: "+ pictureObj);
        });
        console.log(`/newArticleDe: Картинок в галереї після додавання статті: ${galerieDoc.robGalerie.length}`);
        await galerieDoc.save();
      }
      console.log(`/newArticleDe: newArticle von Robert is created!`);
      const message = `<p>Der Artikel wurde erfolgreich zum Server hinzugefügt!</p><p><a href='/diary/public/${diaryName}'>Zurück zur Artikelliste</a></p>`;
      return res.render("Messages", { message:message});
    } catch (error) {
      console.log("/newArticleDe: ", error);
      const message = "Server Error POST /newArticleDe";
      return res.status(500).render("Messages", { message:message});
    }
  });

/*------------------------------------------------------------ */
/*------------------ 8. ДОДАВАННЯ КОМЕНТАРІЯ -------------------- */
router.get('/comment', checkAuth, (req,res) => {
  try {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    res.send(currentDate + currentTime + ": Дані отримано /comment");
  } catch (error) {
    console.error(`/comment: Помилка отримання коментарія` + error);
    const message = "Помилка сервера GET /comment";
    return res.status(500).render("Messages", { message:message});
  }
});

// Запис нового коментаря із форми в diary/public/`diaryArticle/comment в БД
router.post('/comment', checkAuth, async (req,res) =>{
  try {
    let {commentFormText, articleId} = req.body;
    const userSession = req.session.user;
    if (!userSession || !userSession.username) {
      if(userSession.language==="ua"){
        const message = "Необхідна авторизація";
        return res.status(401).render("Messages", { message:message});
      }
      if(userSession.language==="de"){
        const message = "Sie sollen anmelden";
        return res.status(401).render("Messages", { message:message});
      }
      if(!userSession){
        const message = "Sie sollen anmelden";
        return res.status(401).render("Messages", { message:message});
      }
    }
    if(!commentFormText.trim()){
      if(userSession.language==="ua"){
        const message = "Введіть спочатку текст коментаря";
        return res.status(401).render("Messages", { message:message});
      }
      if(userSession.language==="de"){
        const message = "Sie sollen text von Kommentar eingeben";
        return res.status(500).render("Messages", { message:message});
      }
      
    }
    const scriptFlag = commentFormText.indexOf('<script>');
    if(scriptFlag != -1){
      if(userSession.language==="ua"){
        const message = "Не можна використовувати скріпти в коментарях";
        return res.status(401).render("Messages", { message:message});
      }
      if(userSession.language==="de"){
        const message = "Es geht nicht mit Scripts in Kommentare";
        return res.status(500).render("Messages", { message:message});
      }
    }
    const currentDate = getFormattedDate();
    let articlesDoc = await articlesModel.findOne();
    if (!articlesDoc || !articlesDoc.articlesRob.has(articleId)) {
      if(req.session.user.language === 'ua'){
        const message = "Стаття не знайдена POST /comment";
        return res.status(404).render("Messages", { message:message});
      }
      if(req.session.user.language === 'de'){
        const message = "Artikel ist nicht gefunden POST /comment";
        return res.status(404).render("Messages", { message:message});
      }
      if(!req.session.user){
        const message = "Artikel ist nicht gefunden POST /comment";
        return res.status(404).render("Messages", { message:message});
      }
    }
    articlesDoc.articlesRob.get(articleId);
    let article = articlesDoc.articlesRob.get(articleId);
    let newComment = {
      author: userSession.username,
      date: currentDate,
      commentText: commentFormText,
      show:article.show
    };
    if (!article.comments) {
      article.comments = [];
    }
    article.comments.push(newComment);
    articlesDoc.markModified("articlesRob");   
    newComment = {
      author: userSession.username,
      date: currentDate,
      commentText: commentFormText.slice(0, 60),
      commentLink: `/diary/public/${diaryName}/${articleId}`,
      show:article.show
    };
    let lastCommentsArr = articlesDoc.robLastComment;
    //lastCommentsArr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Сортуємо за спаданням дати
    lastCommentsArr.unshift(newComment);
    if (lastCommentsArr.length > 10) {
      lastCommentsArr = lastCommentsArr.slice(0, 10); // обрізаємо масив до 10 елементів
    }
    articlesDoc.markModified("robLastComment");
    await articlesDoc.save();
    res.redirect(`/diary/public/${diaryName}/${articleId}`); // Оновлюємо сторінку статті
  }catch(error){
    console.error("/comment: Помилка при додаванні коментаря:", error);
    const message = "Помилка сервера POST /comment";
    return res.status(500).render("Messages", { message:message});
  }
});
/*--------------------------------------------------------- */
/*-------------- ВИДАЛЕННЯ КОМЕНТАРІЯ-------------------------- */
router.post("/:id/removeComment", checkAuth, async (req, res) => {
  try {
    const articleId = req.params.id;
    const { commentDate } = req.body; // Отримуємо дату коментаря з форми
    const username = req.session.user.username;
    const articleDoc = await articlesModel.findOne({
      [`articlesRob.${articleId}`]: { $exists: true }
    });
    if (!articleDoc) {
      if(req.session.user.language === 'ua'){
        const message = "Стаття не знайдена POST /:id/removeComment";
        return res.status(404).render("Messages", { message:message});
      }
      if(req.session.user.language === 'de'){
        const message = "Artikel ist nicht gefunden POST /:id/removeComment";
        return res.status(404).render("Messages", { message:message});
      }
      if(!req.session.user){
        const message = "Artikel ist nicht gefunden POST /:id/removeComment";
        return res.status(404).render("Messages", { message:message});
      }
    }
    let currentArticle = articleDoc.articlesRob.get(articleId);
    currentArticle.comments = currentArticle.comments.filter(
      comment => !(comment.date === commentDate && comment.author === username)
    );
    await articleDoc.save();
    let lastCommentsDoc = await articlesModel.findOne();
    lastCommentsDoc.robLastComment = lastCommentsDoc.robLastComment.filter(
      comment => !(comment.date === commentDate && comment.author === username)
    );
    await lastCommentsDoc.save();
    console.log(`/:id/removeComment: Коментарій ${username} зі статті із id ${articleId} видалений`);
		res.redirect("/diary/public/robert-diary");
  } catch (error) {
    console.error("/:id/removeComment: Помилка отримання статті:", error);
    const message = "Помилка сервера POST /:id/removeComment";
    return res.status(500).render("Messages", { message:message});
  }
});

/*------------------------------------------------------------ */
/*-------------------------- 9. ПОШУК --------------------------- */
router.get("/searchByDate/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = date + 'T00:00:00'
    const showDate = getFormattedDate(startDate);
    const startTimeStamp = Math.floor(new Date(startDate).getTime() / 1000)
    const offset = parseInt(req.query.offset) || 0;
    const limit = 20;
    const articlesDocs = await articlesModel.find();
    const usersDb = await UsersModel.find();
    const filteredArticles = [];
    let existingFlag = false;
    articlesDocs.forEach(doc => {
      doc.articlesRob.forEach((article, key) => {
          if (article.timeStamp < startTimeStamp) {
            existingFlag = true;
            const articleObj = schowedArticle(article, key, req.session.user, usersDb);
            if(articleObj.id) filteredArticles.push(articleObj);
          }
        });
      });
      if (!filteredArticles.length) {
        let articleMessage = {
          thema: '',
          timeStamp: startTimeStamp,
          id:0,
          tags: '',
          date: false,
          content: '',
          comments: [],
          show:'',
          viewers: [],
          articleSymbol:'',
          title:''
        }
        if(existingFlag){
          if(req.session.user){
            if(req.session.user.language === 'ua'){
              articleMessage.thema = `Автор обмежив доступ до статей до дати ${showDate}`;
              filteredArticles.push(articleMessage);
            } 
            if(req.session.user.language === 'de'){
              articleMessage.thema = `Der Autor hat den Zugriff auf Artikel vor Datum ${showDate} eingeschränkt`;
              filteredArticles.push(articleMessage);
            } 
          } else {
            const userLang = navigator.language || navigator.userLanguage;
            if(userLang === 'ua-UA'){
              articleMessage.thema = `Автор обмежив доступ до статей до дати ${showDate}`;
              filteredArticles.push(articleMessage);
            } else{
              articleMessage.thema = `Der Autor hat den Zugriff auf Artikel vor Datum ${showDate} eingeschränkt`;
              filteredArticles.push(articleMessage);
            } 
          }
        } else {
          const userLang = navigator.language || navigator.userLanguage;
          if(userLang === 'ua-UA'){
            articleMessage.thema = `Статті до дати ${showDate} не знайдено`;
            filteredArticles.push(articleMessage);
          } else {
            articleMessage.thema = `Artikel am ${showDate} und früher sind nicht gefunden`;
            filteredArticles.push(articleMessage);
          } 
        }
        const paginated = filteredArticles.slice(offset, offset + limit);
        return res.json(paginated);
      }
      filteredArticles.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp)); // Сортуємо за спаданням ID
      const paginated = filteredArticles.slice(offset, offset + limit);
      res.json(paginated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

router.get("/searchTagByDate/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const { tagname } = req.query;
    console.log(`${date} ${tagname}`);
    const startDate = date + 'T00:00:00'
    const showDate = getFormattedDate(startDate);
    const startTimeStamp = Math.floor(new Date(startDate).getTime() / 1000)
    const offset = parseInt(req.query.offset) || 0;
    const limit = 20;
    const articlesDocs = await articlesModel.find();
    const usersDb = await UsersModel.find();
    const filteredArticles = [];
    let existingFlag = false;
    articlesDocs.forEach(doc => {
      doc.articlesRob.forEach((article, key) => {
        let tagsArray = article.tags ? article.tags.split(",").map(tag => tag.trim()) : [];
          if (tagsArray.includes(tagname)) {
            if (article.timeStamp < startTimeStamp) {
              existingFlag = true;
              const articleObj = schowedArticle(article, key, req.session.user, usersDb);
              console.log(`${key}: ${article.timeStamp} - ${startTimeStamp} (${articleObj.id})`)
              if(articleObj.id){
                filteredArticles.push(articleObj);
              } 
            }
          }
        });
      });
      if (!filteredArticles.length) {
        let articleMessage = {
          thema: '',
          timeStamp: startTimeStamp,
          id:0,
          tags: '',
          date: false,
          content: '',
          comments: [],
          show:'',
          viewers: [],
          articleSymbol:'',
          title:''
        }
        if(existingFlag){
          if(req.session.user){
            if(req.session.user.language === 'ua'){
              articleMessage.thema = `Автор обмежив доступ до статей до дати ${showDate}`;
              filteredArticles.push(articleMessage);
            } 
            if(req.session.user.language === 'de'){
              articleMessage.thema = `Der Autor hat den Zugriff auf Artikel vor Datum ${showDate} eingeschränkt`;
              filteredArticles.push(articleMessage);
            } 
          } else {
            const userLang = navigator.language || navigator.userLanguage;
            if(userLang === 'ua-UA'){
              articleMessage.thema = `Автор обмежив доступ до статей до дати ${showDate}`;
              filteredArticles.push(articleMessage);
            } else{
              articleMessage.thema = `Der Autor hat den Zugriff auf Artikel vor Datum ${showDate} eingeschränkt`;
              filteredArticles.push(articleMessage);
            } 
          }
        } else {
          const userLang = navigator.language || navigator.userLanguage;
          if(userLang === 'ua-UA'){
            articleMessage.thema = `Статті до дати ${showDate} не знайдено`;
            filteredArticles.push(articleMessage);
          } else {
            articleMessage.thema = `Artikel am ${showDate} und früher sind nicht gefunden`;
            filteredArticles.push(articleMessage);
          } 
        }
        const paginated = filteredArticles.slice(offset, offset + limit);
        return res.json(paginated);
      }
      filteredArticles.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp)); // Сортуємо за спаданням ID
      const paginated = filteredArticles.slice(offset, offset + limit);
      res.json(paginated);
  } catch (err) {
    console.error("/searchTagByDate/:date Помилка сортування статей за вибраним тегом по даті", err);
    const message = "Server Failure GET /searchTagByDate/:date";
    return res.status(500).render("Messages", { message:message});
  }
});

router.get("/searchResults/:tagname", async (req, res) => {
  try{
    const { tagname } = req.params;
    const articlesDocs = await articlesModel.find();
    const usersDb = await UsersModel.find();
    const filteredArticles = [];
    let articleSymbol = '';
    let existingFlag = false;
    articlesDocs.forEach(doc => {
      doc.articlesRob.forEach((article, key) => {
        let tagsArray = article.tags ? article.tags.split(",").map(tag => tag.trim()) : [];
          if (tagsArray.includes(tagname)) {
            existingFlag = true;
            const articleObj = schowedArticle(article, key, req.session.user, usersDb);
            if(articleObj.id) filteredArticles.push(articleObj);
          }
        });
      });
      if (!filteredArticles.length) {
        let message;
        if(existingFlag){
          if(req.session.user){
            if(req.session.user.language === 'ua') message = `Автор обмежив доступ до статей за тегом ${tagname}`;
            if(req.session.user.language === 'de') message = `Der Autor hat den Zugriff auf Artikel nach Tag ${tagname} eingeschränkt`;
          } else {
            
            const userLang = navigator.language || navigator.userLanguage;
          if(userLang === 'ua-UA') message = `Автор обмежив доступ до статей із тегом ${tagname}`;
          else message = `Der Autor hat den Zugriff auf Artikel nach Tag ${tagname} eingeschränkt`;
          }
        } else {
          const userLang = navigator.language || navigator.userLanguage;
          if(userLang === 'ua-UA') message = `Статті з тегом ${tagname} не знайдено`;
          else message = `Artikel mit dem Tag ${tagname} sind nicht gefunden`;
        }
        return res.status(500).render("Messages", { message:message});
      }
      filteredArticles.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp)); // Сортуємо за спаданням ID
      const TagsDoc = await TagsModel.findOne();
      const tags = TagsDoc.tagsRobert;
      tags.sort(function (a, b) {
        return a.name.localeCompare(b.name, ['uk', 'de'], { sensitivity: 'base' });
      });
      const articleObj = {
        articles: filteredArticles,
        tags,
        tagname,
        user: req.session.user,
        permissions: req.session.permissions,
        author: req.session.author,
        authorLink:diaryName
      }
      if(!req.session.user){
        res.render("tagSearchResultsRob-de", articleObj);
      } else {
        if(req.session.user.language === 'ua'){
          res.render("tagSearchResultsRob", articleObj);
        }
        if(req.session.user.language === 'de'){
          res.render("tagSearchResultsRob-de", articleObj);
        }
      }
      
      
    } catch (error) {
        console.error("/searchResults/:tagname: Помилка отримання статей за тегом:", error);
        const message = "Server Failure GET /searchResults/:tagname";
        return res.status(500).render("Messages", { message:message});
    }
});

/*------------------------------------------------------------ */
/*---------------- ДОПОМІЖНІ ФУНКЦІЇ  ------------------------ */

function searchPictureArr(content){
  let pictures = [];
  let thema = "";
  let link = "";
  let titel = "";
  let startIndex = content.indexOf("<img");
  let endIndex = 0;
  /*let regex = /<img[^>]+src="([^"]+)"[^>]*>\s*<span[^>]*>([^<]*)<\/span>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(`Знайдено картинки: thema ${match[2]} link ${match[1]}`);
    thema = match[2];
    link = match[1];
    const indexObj = {
      thema:thema,
      link:link
    }
    pictures.push(indexObj);
  }*/
  for (let i = 0; i<20; i++) {
    startIndex = startIndex + 10;
    endIndex = content.indexOf("\"", startIndex);
    link = content.substring(startIndex, endIndex).trim();
    startIndex = content.indexOf('title=\"', endIndex );
    startIndex = startIndex + 7;
    endIndex = content.indexOf("\" style", startIndex);
    titel = content.substring(startIndex, endIndex).trim();
    startIndex = content.indexOf("<span", endIndex);
    if(startIndex !== -1){
      startIndex = startIndex + 27;
      endIndex = content.indexOf("<", startIndex);
      thema = content.substring(startIndex, endIndex).trim();
    }
    const indexObj = {
      thema:thema,
      link:link,
      title:titel
    }
    pictures.push(indexObj);
    startIndex = content.indexOf("<img", endIndex + 1);
    if(startIndex == -1) break;
  }
  return pictures;
}

function getFormattedDate(inputdate) {
  let date;
  if(inputdate){
      const timeStamp = Math.floor(new Date(inputdate).getTime());
      date = new Date(timeStamp);
  } else {
      date = new Date();
  }
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = days[date.getDay()];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Місяці від 0 до 11
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${dayName} ${dd}.${mm}.${yyyy} ${hh}:${min}`;
}

function getArticleSymbol(show, reqSessionUser, viewerslist){
  let articleSymbol;
  let title;
  if(reqSessionUser){
    if(show === 'author') {
      articleSymbol = 'fa-solid fa-lock';
      if(reqSessionUser.language === 'de') title = "Nur für Autor sichtbar";
      if(reqSessionUser.language === 'ua') title = "Запис видимий лише автору";
    }
    if(show === diaryName) {
      articleSymbol = 'fa-solid fa-user-plus';
      if(reqSessionUser.language === 'de') title = "Nur für die Benutzer sichtbar, die Tagebuch abonniert haben";
      if(reqSessionUser.language === 'ua') title = "Запис видимий усим, хто має підписку на щоденник";
    }
    if(show === 'userlist') {
      articleSymbol = 'fa-solid fa-users';
      if(reqSessionUser.language === 'de') title = "Nur für ausgewählte Benuttzer sichtbar: " + viewerslist.join(', ');
      if(reqSessionUser.language === 'ua') title = "Запис видимий лише вибраним користувачам: " + viewerslist.join(', ');
    }
    if(show === 'user') {
      articleSymbol = 'fa-solid fa-user';
      if(reqSessionUser.language === 'de') title = "Für alle angemeldete Benutzer sichtbar";
      if(reqSessionUser.language === 'ua') title = "Запис видимий усім зареєстрованим користувачам";
    }
  }
  if(show === '') {
    articleSymbol = '';
    if(reqSessionUser){
      if(reqSessionUser.language === 'de') title = "Für alle Benutzer sichtbar";
      if(reqSessionUser.language === 'ua') title = "Запис видимий усім користувачам";
    } else {
      const userLang = navigator.language || navigator.userLanguage;
      if(userLang === 'ua-UA') title = "Запис видимий усім користувачам";
      else title = "Für alle Benutzer sichtbar";
    } 
  }
  const symbolObj = {
    articleSymbol:articleSymbol,
    title:title
  }
  return symbolObj;
}

function schowedArticle(article, articleId, user, usersDb){
  let articleObj ={};
  let articleSymbol ='';
  let title = "";
  let viewerslist = [];
  if(user){
    //статті, видимі автору
    if(user.author.includes(diaryName)){
      if(article.viewers && article.viewers.length > 0){
        article.viewers.forEach(viewer => {
          const userViewer = usersDb.find(u => u._id.toString() === viewer.toString());
          if (userViewer) {
            viewerslist.push(userViewer.username);
          }
        });
      }
      const symbolObj = getArticleSymbol(article.show, user, viewerslist);
      articleSymbol = symbolObj.articleSymbol;
      title = symbolObj.title;
      articleObj = {id:articleId, articleSymbol:articleSymbol, title:title, ...article.toObject()};
    }
    //статті, видимі підписникам
    if(!user.author.includes(diaryName)){
      if(user.subscribe.includes(diaryName)){
        if(article.show!=="author"){
          const symbolObj = getArticleSymbol(article.show, user, viewerslist);
          articleSymbol = symbolObj.articleSymbol;
          title = symbolObj.title;
          articleObj = {id:articleId, articleSymbol:articleSymbol, title:title, ...article.toObject()};
        }
      }
    }
    //статті, видимі вибраним користувачам
    if(article.viewers && article.viewers.length > 0){
      article.viewers.forEach(viewer => {
        const userViewer = usersDb.find(u => u._id.toString() === viewer.toString());
        if (userViewer) {
          viewerslist.push(userViewer.username);
        }
      });
      if(!user.author.includes(diaryName)){
        article.viewers.forEach(viewer => {
          if(user._id === viewer){
            if(article.show === 'userlist') {
              const consoleDate = new Date().toISOString();
              console.log(`${consoleDate} | ${diaryName} | ${user.username} /: userlist`);
              const symbolObj = getArticleSymbol(article.show, user, viewerslist);
              articleSymbol = symbolObj.articleSymbol;
              title = symbolObj.title;
            }
            articleObj = {id:articleId, articleSymbol:articleSymbol, title:title, ...article.toObject()};
          }
        })
      }
    }
    //статті, видимі зареєстрованим користувачам
    if(!user.author.includes(diaryName)){
      if(!user.subscribe.includes(diaryName)){
        if(article.show!=="author" && article.show!==diaryName){
          const symbolObj = getArticleSymbol(article.show, user, viewerslist);
          articleSymbol = symbolObj.articleSymbol;
          title = symbolObj.title;
          articleObj = {id:articleId, articleSymbol:articleSymbol, title:title, ...article.toObject()};
        }
      }
    }
  }
  //статті, видимі для всіх
    if(!user){
      if(!article.show || article.show === ""){
        const symbolObj = getArticleSymbol(article.show, user, viewerslist);
        articleSymbol = symbolObj.articleSymbol;
        title = symbolObj.title;
        articleObj = {id:articleId, articleSymbol:articleSymbol, title:title, ...article.toObject()};
      }
    }
    return articleObj;
}

export default router;