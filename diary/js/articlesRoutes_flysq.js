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
import { count, timeStamp } from 'console';
import { title } from 'process';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diaryName = 'flysquirrel-diary';

/*--------------------- 1. ПЕРЕВІРКА АВТОРИЗАЦІЇ  -------------- */
const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/diary/public/diaryLogin.html'); // Якщо користувач не авторизований, перенаправляємо на сторінку входу
  }
  next(); // Якщо авторизований, переходимо до маршруту
};

/*------------------------------------------------------------ */
/*------------------ 2. ЛОГІН  ---------------------------------- */
router.get('/login', (req, res) => {
  if(req.session.user){
    const message = "Ви уже увійшли в систему.<br> <a href=\"/diary/public/flysquirrel-diary/logout\">Вийти із системи</a>"
    return res.render("Messages", { message:message});
  } else {
    return res.redirect('/diary/public/diaryLogin.html'); // Якщо користувач не авторизований, перенаправляємо на сторінку входу
  } 
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({ email });
  if (!user) {
    return res.status(400).send('Користувача не знайдено');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Невірний пароль');
  }
  /*-----------глобальні змінні користувача----------------*/
  req.session.user = { // Зберігаємо користувача в сесії
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    language: user.language,
    author: user.author,
    subscribe: user.subscribe,
    permissions: user.permissions
  };
  if(user.author.length > 0){
    req.session.author = user.author;
  } else {req.session.author = ['notAuthor']}
  /*-------------------------------------------------------*/
  if(user.language === 'ua'){
    res.redirect('/diary/public/diaries.html'); // Перенаправляємо на список щоденників
  }
  if(user.language === 'de'){
    res.redirect('/diary/public/diaries-de.html'); // Перенаправляємо на список щоденників
  }
});

router.get('/login-de', (req, res) => {
  if(req.session.user){
    const message = "Sie sind bereits angemeldet.<br> <a href=\"/diary/public/flysquirrel-diary/logout\">Hier drücken, um abzumelden</a>"
    return res.render("Messages", { message:message});
  } else {
    return res.redirect('/diary/public/diaryLogin-de.html'); // Якщо користувач не авторизований, перенаправляємо на сторінку входу
  } 
});
router.post('/login-de', async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({ email });
  if (!user) {
    return res.status(400).send('Benutzer nicht gefunden');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Falsches Passwort');
  }
   /*-----------глобальні змінні користувача----------------*/
   req.session.user = { // Зберігаємо користувача в сесії
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    language: user.language,
    author: user.author,
    subscribe: user.subscribe,
    permissions: user.permissions
  };
  if(user.author.length > 0){
    req.session.author = user.author;
  } else {req.session.author = ['notAuthor']}
   /*-------------------------------------------------------*/
  if(user.language === 'ua'){
    res.redirect('/diary/public/diaries.html'); // Перенаправляємо на список щоденників
  }
  if(user.language === 'de'){
    res.redirect('/diary/public/diaries-de.html'); // Перенаправляємо на список щоденників
  }
});
// Вихід користувача
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/diary/public/diaries.html'); // Перенаправляємо на сторінку входу після виходу
  });
});

/*------------------------------------------------------------ */
/*-------------------- 3. РЕЄСТРАЦІЯ  --------------------------- */
router.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/diaryReg.html')); // Показуємо форму реєстрації
});
router.post('/registration', async (req, res) => {
  const { username, email, password, checkbox } = req.body;
  let user = await UsersModel.findOne({ username });
  if(user){
    return res.status(400).send('Користувач з таким ім\'ям уже зареєстрований');
  }
  let validPattern = /^[\p{L}0-9_\-_]+$/u;
  if(!validPattern.test(user)){
    return res.status(400).send('Ім\'я користувача може містити лише літери, цифри і символи "_", "-');
  }
  user = await UsersModel.findOne({ email });
  if(user){
    return res.status(400).send('Користувач з таким e-mail уже зареєстрований');
  } else 
  if(!email.includes("@")){
    return res.status(400).send('Некорректні дані: необхідно ввести e-mail');
  }
  const hashedPassword = await bcrypt.hash(password, 10);// Хешування пароля
  if(!checkbox){
    return res.status(400).send('Щоб зареєструватися, ви маєте погодитися із умовами користування веб-сайтом');
  }
  // Створення нового користувача
  const newUser = new UsersModel({
    username,
    email,
    password: hashedPassword,
    permissions:'user',
    language:"ua",
    author:[],
    subscribe:[]});
  await newUser.save();
  console.log(`Новий користувач ${newUser.username}, ${newUser.email}`);
  res.redirect('/diary/public/diaryLogin.html'); // Перенаправляємо на сторінку входу
});

router.get('/registration-de', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/diaryReg-de.html')); // Показуємо форму реєстрації
});
router.post('/registration-de', async (req, res) => {
  const { username, email, password, checkbox } = req.body;
  let user = await UsersModel.findOne({ username });
  if(user){
    return res.status(400).send('User mit solchem Benutzername schon existiert');
  }
  let validPattern = /^[\p{L}0-9_\-_]+$/u;
  if(!validPattern.test(user)){
    return res.status(400).send('Der Benutzername darf nur Buchstaben, Zahlen und Symbole "_", "-" enthalten');
  }
  user = await UsersModel.findOne({ email });
  if(user){
    return res.status(400).send('User mit solchem e-mail schon existiert');
  } else 
  if(!email.includes("@")){
    return res.status(400).send('Falsche Daten: Sie müssen eine E-Mail-Adresse eingeben.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);// Хешування пароля
  if(!checkbox){
    return res.status(400).send('Um sich zu registrieren, müssen Sie den Nutzungsbedingungen der Website zustimmen');
  }
  // Створення нового користувача
  const newUser = new UsersModel({
    username,
    email,
    password: hashedPassword,
    permissions:'user',
    language:"de",
    author:[],
    subscribe:[]});
  await newUser.save();
  console.log(`Neuer Benutzer ${newUser.username}, ${newUser.email}`);
  res.redirect('/diary/public/diaryLogin-de.html'); // Перенаправляємо на сторінку входу
});
router.get('/TermsOfUse', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/TermsOfUse.html'));
});
router.get('/TermsOfUse-de', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/TermsOfUse-de.html'));
});
router.get('/diaries.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/diaries.html'));
});

/*------------------------------------------------------------ */
/*--------------- 4. ВИБІР МОВИ НА ГОЛОВНІЙ СТОРІНЦІ------------- */
router.get('/ua', async (req, res) => {
  if(req.session.user && req.session.user.username){
    const username = req.session.user.username;
    const user = await UsersModel.findOne({ username });
    req.session.user.language = 'ua';
    if(!(user.language === 'ua')){
      const updatedUser = await UsersModel.findOneAndUpdate(
        { username },
        { $set: {language: 'ua'} },
        { new: true }
      );
    }
    return res.redirect('/diary/public/diaries.html');
  } else {
    const message = "Щоб мати змогу змінювати мову сайту, ви маєте зареєструватися (за винятком логіну і реєстрації).<br><br>"+
    "При зміні мови сайту мова самих записів у щоденниках не буде змінюватися.<br><br>"+
    "<a href=\"/diary/public/diaries.html\">Повернутися на головну сторінку</a>";
    return res.render("Messages", { message:message});
  }
});

// Вибір нім. версії сторінки
router.get('/de', async (req, res) => {
  if(req.session.user?.username){
    const username = req.session.user.username;
    const user = await UsersModel.findOne({ username });
    req.session.user.language = 'de';
    if(!(user.language === 'de')){
      const updatedUser = await UsersModel.findOneAndUpdate(
        { username },
        { $set: {language: 'de'} },
        { new: true }
      );
    }
    return res.redirect('/diary/public/diaries-de.html');
  } else {
    const message = "Um die Sprache der Site ändern zu können, müssen Sie sich registrieren (außer für Login- und Registrierung-Seiten).<br><br>"+
    "Wenn Sie die Site-Sprache ändern, ändert sich die Sprache der Tagebucheinträge selbst nicht.<br><br>"+
    "<a href=\"/diary/public/diaries-de.html\">Zurück zur Hauptseite</a>";
    return res.status(500).render("Messages", { message:message});
  }
});

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
    if(!galerieDoc.flysqGalerie){
      const group = "Es ist noch keine Bilder in Galerie";
      const pic = {imgLink:""}
      groupPictures[group] = [pic];
    } else {
      let pictures = [];
      for(let dbPic of galerieDoc.flysqGalerie){
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
          if(req.session.user && req.session.user.language === 'de'){
            group = "Ohne Kategorie";
          } else {
            group = "Без теми";
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
        res.render("diaryGalerie",
          { groupPictures,
            user: req.session.user,
            permissions: req.session.permissions,
            author: req.session.author,
            authorLink:diaryName});
      } else {
        if(req.session.user.language === 'ua'){
          res.render("diaryGalerie",
            { groupPictures,
              user: req.session.user,
              permissions: req.session.permissions,
              author: req.session.author,
              authorLink:diaryName});
        }
        if(req.session.user.language === 'de'){
          res.render("diaryGalerie-de",
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
    let articlesList = await articlesModel.find();
    const articles = [];
    let lastComments = [];
    const consoleDate = new Date().toISOString();
    const usersDb = await UsersModel.find();
    const TagsDoc = await TagsModel.findOne();
    const tagsDB = TagsDoc.tagsFlysquirr;
    let tags = [];
    if(req.session.user){
      if(req.session.user.author.includes(diaryName)){console.log(`${consoleDate} | ${diaryName} |  ${req.session.user.username} /: author`);}
      else if(req.session.user.subscribe.includes(diaryName)){console.log(`${consoleDate} | ${diaryName} |  ${req.session.user.username} /: ${diaryName}`);}
      else if(!req.session.user.subscribe.includes(diaryName)){console.log(`${consoleDate} | ${diaryName} |  ${req.session.user.username} /: user`);}
    }
    if(!req.session.user){console.log(`${consoleDate} | ${diaryName} /: not logined`);}
    articlesList.forEach(articleDoc =>{
      articleDoc.articlesFlysq.forEach((article, key) => {
        const articleObj = schowedArticle(article, key, req.session.user, usersDb);
        if(articleObj.id){
          let tagsArray = article.tags ? article.tags.split(",").map(tag => tag.trim()) : [];
          tagsArray.forEach(articleTag => {
            const current = tags.find(item => item.name === articleTag);
            if(!current){
              const currentTag = tagsDB.find(item => item.name === articleTag);
              tags.push(currentTag);
            }
          });
          articles.push(articleObj);
        } 
      });
      articleDoc.flysqLastComment.forEach(comment => {
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
              } else lastComments.push(comment);
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
          res.render("diaryListe", articleObj);
        }
        if(req.session.user.language === 'de'){
          res.render("diaryListe-de", articleObj);
        }
  }
    if(!req.session.user){
      res.render("diaryListe", articleObj);
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
    const { tagname, inputString } = req.query;
    const offset = parseInt(req.query.offset) || 0;
    const limit = 20;
    let articlesList = await articlesModel.find();
    const articles = [];
    let lastComments = [];
    let existingFlag = false;
    const usersDb = await UsersModel.find();
    articlesList.forEach(articleDoc =>{
      articleDoc.articlesFlysq.forEach((article, key) => {
        if(inputString){
          const matched = article.content.includes(inputString);
          if(matched){
            if (tagname){
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
          }
        } else if(tagname){
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
      articleDoc.flysqLastComment.forEach(comment => {
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
  } catch (err) {
    console.error("/api/articles помилка прокручування списку статей", err);
    const message = "Server Failure GET /api/articles";
    return res.status(500).render("Messages", { message:message});
  }
});
    

/*--------------------------------------------------------- */
/*-------------------- 6. СТАТТЯ------------------------------ */
router.get("/:id", async (req, res) => {
  try {
      const articlesList = await articlesModel.find();
      const usersDb = await UsersModel.find();
      const TagsDoc = await TagsModel.findOne();
      const tagsDB = TagsDoc.tagsFlysquirr;
      let tags = [];
      let viewerslist = [];
      let article = null;
      const articleId = req.params.id;
      for (const articleDoc of articlesList){
          if(articleDoc.articlesFlysq.has(articleId)){
              article = articleDoc.articlesFlysq.get(articleId);
              break;
          }
      }
      articlesList.forEach(articlesDoc => {
        articlesDoc.articlesFlysq.forEach(article => {
          let tagsArray = article.tags ? article.tags.split(",").map(tag => tag.trim()) : [];
          tagsArray.forEach(articleTag => {
            const current = tags.find(item => item.name === articleTag);
            if(!current){
              const currentTag = tagsDB.find(item => item.name === articleTag);
              tags.push(currentTag);
            }
          });
        });
      });
      if (!article) {
        if(req.session.user && req.session.user.language === 'ua'){
          const message = "Стаття не знайдена GET /:id";
          res.status(404).render("Messages", { message:message});
        }
        else if(req.session.user && req.session.user.language === 'de'){
          const message = "Artikel ist nicht gefunden GET /:id";
          res.status(404).render("Messages", { message:message});
        }
        else {
          const message = "Стаття не знайдена GET /:id";
          res.status(404).render("Messages", { message:message});
        }
      }
      if(article !== null){
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
          if(article.viewers && article.viewers.length > 0){
            article.viewers.forEach(viewer => {
              const user = usersDb.find(u => u._id.toString() === viewer.toString()); // Порівнюємо як рядки для уникнення проблем з типами
              if (user) {
                viewerslist.push(user.username);
              }
            });
          }
          if(req.session.user.language === 'ua'){
            res.render("diaryArticle", articleObj);
            }
            if(req.session.user.language === 'de'){
              res.render("diaryArticle-de", articleObj);
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
                res.render("diaryArticle", articleObj);
                }
                if(req.session.user.language === 'de'){
                  res.render("diaryArticle-de", articleObj);
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
          if (article.show === "userlist") {
            if (Array.isArray(article.viewers) && article.viewers.length > 0) {
              const viewerIds = article.viewers.map(v => v.toString());
              let isRendered = false;
              for (const viewerId of viewerIds) {
                const user = usersDb.find(u => u._id.toString() === viewerId);
                if (user) {
                  viewerslist.push(user.username);
                }
                if (req.session.user && req.session.user._id === viewerId) {
                  const lang = req.session.user.language;
                  if (lang === 'ua') {
                    res.render("diaryArticle", articleObj);
                  } else {
                    res.render("diaryArticle-de", articleObj);
                  }
                  isRendered = true;
                  break;
                }
              }
              if (!isRendered) {
                const message =
                  !req.session.user
                    ? "Дана стаття має обмежений доступ для перегляду"
                    : req.session.user.language === 'de'
                      ? "Der zugang ist begrenzt für Sie"
                      : "Дана стаття має обмежений доступ для перегляду";

                return res.render("Messages", { message });
              }
            }
          }
          
          //стаття для зареєстрованих користувачів
          if(article.show === "user") {
          if(req.session.user) {
            if(req.session.user.language === 'ua'){
              res.render("diaryArticle", articleObj);
              }
              if(req.session.user.language === 'de'){
                res.render("diaryArticle-de", articleObj);
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
              res.render("diaryArticle", articleObj);
              }
              if(req.session.user.language === 'de'){
                res.render("diaryArticle-de", articleObj);
              }
          } else {
            res.render("diaryArticle", articleObj);
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
      [`articlesFlysq.${articleId}`]: { $exists: true }
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
        const message = "Стаття не знайдена GET /:id/remove";
        return res.status(404).render("Messages", { message:message});
      }
    } else {
      tags = articleDoc.articlesFlysq.get(articleId).tags;
    }
    console.log("/:id/remove: теги видаленої статті: " + tags);  
    articleDoc.articlesFlysq.delete(articleId);
    await articleDoc.save();
    //2) підрахунок і видалення тегів
    const TagsDoc = await TagsModel.findOne();
    let articleTags = tags.split(',').map(part => part.trim());
    let containFlag = false;
    for(let delTag of articleTags){
      for(let dbTag of TagsDoc.tagsFlysquirr){
        if(dbTag.name === delTag){
          dbTag.count--;
          console.log(`/:id/remove: ${delTag}.count-- ${dbTag.count}`);
          if(dbTag.count === 0){
            TagsDoc.tagsFlysquirr = TagsDoc.tagsFlysquirr.filter(item => item.name !== delTag);
            console.log(`/:id/remove: тег ${delTag} видалено зі списку тегів`);
          }
          containFlag = false;
        }
      }
    }
    await TagsDoc.save();
    //3) видаляємо картинки із галереї
    let galerieDoc = await galerieModel.findOne();
    galerieDoc.flysqGalerie = galerieDoc.flysqGalerie.filter(item => item.articleId !== articleId);
    console.log(`/:id/remove: Картинок в галереї після видалення: ${galerieDoc.flysqGalerie.length}`);
    await galerieDoc.save();
    console.log(`/:id/remove: Стаття із id ${articleId} видалена`);
		res.redirect("/diary/public/flysquirrel-diary");
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
      const articlesList = await articlesModel.find();
      let article = null;
      for (const articleDoc of articlesList) {
          if (articleDoc.articlesFlysq.has(req.params.id)) {
              article = articleDoc.articlesFlysq.get(req.params.id);
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
          const message = "Стаття не знайдена GET /getArticle/:id";
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
    const articlesList = await articlesModel.find();
    let updatedArticle = null;
    for (const articleDoc of articlesList) {
      if (articleDoc.articlesFlysq.has(articleId)) {
        updatedArticle = articleDoc.articlesFlysq.get(articleId);
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
    galerieDoc.flysqGalerie.forEach(dbPic =>{
      if(dbPic.articleId === articleId) pictures.push(dbPic);
    });
    if(pictures.length > 0){
      for(let newPic of newPictures){
        pictures = pictures.filter(item => item.imgLink !== newPic.link);
      }
      console.log(`/editArticle/:id: Кількість картинок, які були видалені зі статті: ${pictures.length}`);
      if(pictures.length > 0){
        for (let pic of pictures){
          galerieDoc.flysqGalerie = galerieDoc.flysqGalerie.filter(item => (item.imgLink !== pic.imgLink) && (item.articleId !== articleId));
        }
        console.log(`/editArticle/:id: Картинок в галереї після видалення картинки зі статті: ${galerieDoc.flysqGalerie.length}`);
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
              for(let item of galerieDoc.flysqGalerie){
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
                  title:newPic.title,
                  articleId: articleId,
                  imgLink:newPic.link,
                  show:updatedArticle.show,
                  viewers:updatedArticle.viewers
                }
                galerieDoc.flysqGalerie.push(pictureObj);
                console.log("/editArticle/:id: нова картинка в галереї після зміни доступу: ");
                console.log(pictureObj);
              }
              galerieDoc.flysqGalerie[itemIndex].thema = newPic.thema;
            }
             /*------------перевіряємо, чи не була змінена title----------------*/
            if(oldPic.title !== newPic.title){
              let itemIndex = 0;
                for(let item of galerieDoc.flysqGalerie){
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
                  galerieDoc.flysqGalerie.push(pictureObj);
                  console.log("/editArticle/:id: нова картинка в галереї після зміни title: ");
                  console.log(pictureObj);
                }
                galerieDoc.flysqGalerie[itemIndex].title = newPic.title;
                console.log("/editArticle/:id: оновлений title: "+ newPic.title);
             }
            /*------------перевіряємо, чи не був змінений доступ----------------*/
            if(oldPic.show !== newArticlePermissions){
              for(let item of galerieDoc.flysqGalerie){
                if((item.imgLink === newPic.link)&&(item.articleId === articleId)){
                  console.log(`/editArticle/:id: оновлення доступу картинки ${item.show} -> ${updatedArticle.show};`);
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
          console.log(`Нова картинка: ${newPic.link}`);
        }
        newFlag = true;
      });
      /*-----------------------код для додавання до галереї існуючих картинок-----------------------------*/
      newPictures.forEach(newPic =>{
        if(!galerieDoc.flysqGalerie.some(item => (item.imgLink === newPic.link)&&(item.articleId === articleId))){
          if(!pictures.some(item => item.link === newPic.link)){
            const pictureObj = {
              thema: newPic.thema,
              title:newPic.title,
              link:newPic.link
            }
            pictures.push(pictureObj);
            console.log("/editArticle/:id: код для додавання до галереї існуючих картинок");
            console.log(pictureObj);
          }
        }
      });

      /*---------------------------------------------------------------------*/
      console.log("/editArticle/:id: нові картинки: ", pictures);
      if(pictures.length>0){
        
        pictures.forEach(picture =>{
          const pictureObj = {
            thema: picture.thema,
            title:picture.title,
            articleId: articleId,
            imgLink:picture.link,
            show:updatedArticle.show,
            viewers:updatedArticle.viewers
          }
          galerieDoc.flysqGalerie.push(pictureObj);
        });
        
      }
      console.log(`/editArticle/:id: Картинок в галереї після редагування: ${galerieDoc.flysqGalerie.length}`);
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
              console.log(`/editArticle/:id: Тег ${newTag} уже є у списку тегів`);
            }
          }
          if(!containFlag){
            console.log(`/editArticle/:id: Новий тег ${newTag}...`);
            for(let dbTag of TagsDoc.tagsFlysquirr){
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
              TagsDoc.tagsFlysquirr.push(newdbTag);
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
            console.log(`/editArticle/:id: видалення тегу: ${oldTag}`);
            for(let dbTag of TagsDoc.tagsFlysquirr){
              if(dbTag.name === oldTag){
                dbTag.count--;
                console.log(`/editArticle/:id: Тег видалено зі статті статті: ${dbTag.name} = ${dbTag.count}`);
                containFlag = false;
                if(dbTag.count === 0){
                  TagsDoc.tagsFlysquirr = TagsDoc.tagsFlysquirr.filter(item => item.name !== oldTag);
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
        articleDoc.articlesFlysq.set(articleId, updatedArticle);
        await articleDoc.save();
        console.log(`/editArticle/:id: Стаття ${articleId} оновлена!`);
        if(req.session.user.language === 'ua'){
          const message = "<p>Стаття оновлена!</p><p><a href='/diary/public/flysquirrel-diary'>Повернутися до списку статей</a></p>";
          return res.render("Messages", { message:message});
        }
        if(req.session.user.language === 'de'){
          const message = "<p>Artikel würde aktualisiert!</p><p><a href='/diary/public/flysquirrel-diary'>Zurück zur Artikel Übersicht</a></p>";
          return res.render("Messages", { message:message});
        }
      }
    }
    if(!req.session.user){
      const message = "Стаття не знайдена POST /editArticle/:id";
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
    console.error("/newArticle: Помилка отримання нового запису до щоденнику від fly-squirrel" + error);
    const message = "Помилка сервера GET /newArticle";
    return res.status(500).render("Messages", { message:message});
  }
});

// Запис нової статті із форми в diary/public/newArticle.html в БД
router.post('/newArticle', checkAuth, async (req,res) =>{
  try {
    let {newArticleThema, newArticleTags, newArticleContent, datetime, newArticlePermissions, selectedUsers} = req.body;
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
      return res.send("Не вдалося завантажити файл articlesDoc.articlesFlysq у /newArticle");
    }
    let articlesList = articlesDoc.articlesFlysq;
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
      return res.send("Не вдалося завантажитит файл TagsDoc.tagsFlysquirr у /newArticle");
    }
    let articleTags = newArticleTags.split(',').map(part => part.trim());
    let containFlag = false;
    for(let i=0; i<articleTags.length;i++){
      for(let j=0; j<TagsDoc.tagsFlysquirr.length;j++) {
        if(TagsDoc.tagsFlysquirr[j].name === articleTags[i]){
          if(TagsDoc.tagsFlysquirr[j].count < 50){
            TagsDoc.tagsFlysquirr[j].count++;
          }
          containFlag = true;
        }
      }
      if(!containFlag){
        const newTag = {
          name: articleTags[i],
          count:1
        }
        TagsDoc.tagsFlysquirr.push(newTag);
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
        galerieDoc.flysqGalerie.push(pictureObj);
      });
      console.log(`/newArticle: Картинок в галереї після додавання нової статті: ${galerieDoc.flysqGalerie.length}`);
      await galerieDoc.save();
    }
    console.log(`/newArticle: newArticle von fly-squirrel is created!`);
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
    console.error("/newArticleDe: Помилка отримання нового запису до щоденнику від flysquirrel" + error);
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
      return res.send("articlesDoc.articlesFlysq nicht gefunden in /newArticleDe");
    }
    let articlesList = articlesDoc.articlesFlysq;
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
      return res.send("TagsDoc.tagsFlysquirr nicht gefunden in /newArticleDe");
    }
    let articleTags = newArticleTags.split(',').map(part => part.trim());
    let containFlag = false;
    for(let i=0; i<articleTags.length;i++){
      for(let j=0; j<TagsDoc.tagsFlysquirr.length;j++) {
        if(TagsDoc.tagsFlysquirr[j].name === articleTags[i]){
          if(TagsDoc.tagsFlysquirr[j].count < 50){
            TagsDoc.tagsFlysquirr[j].count++;
          }
          containFlag = true;
          console.log(`/newArticleDe: Новий тег у статті: ${TagsDoc.tagsFlysquirr[j].name} = ${TagsDoc.tagsFlysquirr[j].count}`);
        }
      }
      if(!containFlag){
        const newTag = {
          name: articleTags[i],
          count:1
        }
        TagsDoc.tagsFlysquirr.push(newTag);
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
        res.send("Fehler beim erhalten GalerieDoc.flysqGalerie in /newArticleDe");
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
        galerieDoc.flysqGalerie.push(pictureObj);
        console.log("/newArticleDe: нова картинка в галереї: "+ pictureObj);
      });
      console.log(`/newArticleDe: Картинок в галереї після додавання статті: ${galerieDoc.flysqGalerie.length}`);
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
        const message = "Необхідна авторизація";
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
    if (!articlesDoc || !articlesDoc.articlesFlysq.has(articleId)) {
      if(req.session.user.language === 'ua'){
        const message = "Стаття не знайдена POST /comment";
        return res.status(404).render("Messages", { message:message});
      }
      if(req.session.user.language === 'de'){
        const message = "Artikel ist nicht gefunden POST /comment";
        return res.status(404).render("Messages", { message:message});
      }
      if(!req.session.user){
        const message = "Стаття не знайдена POST /comment";
        return res.status(404).render("Messages", { message:message});
      }
    }
    articlesDoc.articlesFlysq.get(articleId);
    let article = articlesDoc.articlesFlysq.get(articleId);
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
    newComment = {
      author: userSession.username,
      date: currentDate,
      commentText: commentFormText.slice(0, 40),
      commentLink: `/diary/public/${diaryName}/${articleId}`,
      show:article.show
    };
    let lastCommentsArr = articlesDoc.flysqLastComment;
    //lastCommentsArr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Сортуємо за спаданням дати
    lastCommentsArr.unshift(newComment);
    if (lastCommentsArr.length > 10) {
      lastCommentsArr = lastCommentsArr.slice(0, 10); // обрізаємо масив до 10 елементів
    }
    console.log(lastCommentsArr);
    console.log(articlesDoc.flysqLastComment);
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
      [`articlesFlysq.${articleId}`]: { $exists: true }
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
        const message = "Стаття не знайдена POST /:id/removeComment";
        return res.status(404).render("Messages", { message:message});
      }
    }
    let currentArticle = articleDoc.articlesFlysq.get(articleId);
    currentArticle.comments = currentArticle.comments.filter(
      comment => !(comment.date === commentDate && comment.author === username)
    );
    await articleDoc.save();

    let lastCommentsDoc = await articlesModel.findOne();
    lastCommentsDoc.flysqLastComment = lastCommentsDoc.flysqLastComment.filter(
      comment => !(comment.date === commentDate && comment.author === username)
    );
    await lastCommentsDoc.save();
    
    console.log(`/:id/removeComment: Коментарій ${username} зі статті із id ${articleId} видалений`);
		res.redirect("/diary/public/flysquirrel-diary");
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
    const { date, inputString } = req.params;
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
      doc.articlesFlysq.forEach((article, key) => {
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
    console.error("/searchByDate/:date Помилка сортування статей по даті", err);
    const message = "Server Failure GET /searchByDate/:date";
    return res.status(500).render("Messages", { message:message});
  }
});

router.get("/searchTagByDate/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const { tagname } = req.query;
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
      doc.articlesFlysq.forEach((article, key) => {
        let tagsArray = article.tags ? article.tags.split(",").map(tag => tag.trim()) : [];
          if (tagsArray.includes(tagname)) {
            if (article.timeStamp < startTimeStamp) {
              existingFlag = true;
              const articleObj = schowedArticle(article, key, req.session.user, usersDb);
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
    const TagsDoc = await TagsModel.findOne();
    const tagsDB = TagsDoc.tagsFlysquirr;
    let tags = [];
    const filteredArticles = [];
    let existingFlag = false;
    articlesDocs.forEach(doc => {
      doc.articlesFlysq.forEach((article, key) => {
        let tagsArray = article.tags ? article.tags.split(",").map(tag => tag.trim()) : [];
          if (tagsArray.includes(tagname)) {
            existingFlag = true;
            const articleObj = schowedArticle(article, key, req.session.user, usersDb);
            if(articleObj.id){
              let tagsArray = article.tags ? article.tags.split(",").map(tag => tag.trim()) : [];
              tagsArray.forEach(articleTag => {
                const current = tags.find(item => item.name === articleTag);
                if(!current){
                  const currentTag = tagsDB.find(item => item.name === articleTag);
                  tags.push(currentTag);
                }
              });
              filteredArticles.push(articleObj);
            }
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
            if(userLang === 'de-DE'){
              message = `Der Autor hat den Zugriff auf Artikel nach Tag ${tagname} eingeschränkt`;
            } else {
              message = `Автор обмежив доступ до статей за тегом ${tagname}`;
            }
          }
        } else {
          const userLang = navigator.language || navigator.userLanguage;
            if(userLang === 'de-DE'){
              message = `Artikel mit Tag ${tagname} sind nicht gefunden`;
            } else {
              message = `Статті з тегом ${tagname} не знайдено`;
            }
        }
        return res.status(500).render("Messages", { message:message});
      }
      
      filteredArticles.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp)); // Сортуємо за спаданням ID
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
        res.render("tagSearchResults", articleObj);
      } else {
        if(req.session.user.language === 'ua'){
          res.render("tagSearchResults", articleObj);
        }
        if(req.session.user.language === 'de'){
          res.render("tagSearchResults-de", articleObj);
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
  let titel ="";
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
      title:titel,
      link:link
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
      if(userLang === 'de-DE') title = "Für alle Benutzer sichtbar";
      else title = "Запис видимий усім користувачам";
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
    if(article.viewers && article.viewers.length > 0){
      article.viewers.forEach(viewer => {
        const userViewer = usersDb.find(u => u._id.toString() === viewer.toString());
        if (userViewer) {
          viewerslist.push(userViewer.username);
        }
      });
    }
    //статті, видимі автору
    if(user.author.includes(diaryName)){
      const symbolObj = getArticleSymbol(article.show, user, viewerslist);
      articleSymbol = symbolObj.articleSymbol;
      title = symbolObj.title;
      articleObj = {id:articleId, articleSymbol:articleSymbol, title:title, ...article.toObject()};
    }
    //статті, видимі підписникам
    if(article.show === diaryName){
      if(!user.author.includes(diaryName)){
        if(user.subscribe.includes(diaryName)){
            const symbolObj = getArticleSymbol(article.show, user, viewerslist);
            articleSymbol = symbolObj.articleSymbol;
            title = symbolObj.title;
            articleObj = {id:articleId, articleSymbol:articleSymbol, title:title, ...article.toObject()};
        }
      }
    }
    
    //статті, видимі вибраним користувачам
    if(article.show === 'userlist') {
      if(!user.author.includes(diaryName)){
        article.viewers.forEach(viewer => {
          if(user._id === viewer){
            const consoleDate = new Date().toISOString();
            console.log(`${consoleDate} | ${diaryName} | ${user.username} /: userlist`);
            const symbolObj = getArticleSymbol(article.show, user, viewerslist);
            articleSymbol = symbolObj.articleSymbol;
            title = symbolObj.title;
            articleObj = {id:articleId, articleSymbol:articleSymbol, title:title, ...article.toObject()};
          }
        })
      }
    }
    //статті, видимі зареєстрованим користувачам
    if(!user.author.includes(diaryName)){
        if(article.show!=="author" && article.show!==diaryName){
          if(article.show === 'user' || article.show === '' || !article.show) {
            const symbolObj = getArticleSymbol(article.show, user, viewerslist);
            articleSymbol = symbolObj.articleSymbol;
            title = symbolObj.title;
            articleObj = {id:articleId, articleSymbol:articleSymbol, title:title, ...article.toObject()};
        }
      }
    }
  }
    if(!user){
      //статті, видимі для всіх
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