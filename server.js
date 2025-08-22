//============   1 - імпортувати бібліотеки  ===================
import express from 'express';          //для створення серверу	
import mongoose from 'mongoose';        //для роботи з БД
import 'dotenv/config';                 //для зони видиості змінних глобального оточення (.env)
import session from 'express-session';
import bcrypt from 'bcryptjs';
import cors from 'cors';

//============   2 - об'явити змінні  ===========================
const port = process.env.PORT || 3000;
const db_url = process.env.DB_URL;
// Для роботи зі шляхами:
const path = await import('path'); 
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//============   3 - ініціалізація серверу  =====================
const app = express();              

//============   допоміжні функції бібліотек ====================
app.use(express.urlencoded({extended:true})); //middleware для обробки form-urlencoded (дані форми)
app.use(express.json());// Додає підтримку JSON, дозволяє приймати тіла запитів розміром до 10 мегабайт
app.use(cors());

//============   підключення БД =================================
const options = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose.connect(db_url, options).then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

//============   Налаштування сесій для логіну   ================
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Для HTTP без HTTPS, встанови в true для HTTPS
}));

/*------------------------------------------------------------*/
/*------------------- ГОЛОВНА СТОРІНКА -----------------------*/
/*------------------------------------------------------------*/
app.use("/public", express.static(path.join(__dirname, "public")));  //головна сторінка статична
app.use("/shpory", express.static(path.join(__dirname, "shpory")));  //шпори сторінка статична
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/rhombi', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/rhombi.html'));
});
app.get('/rhombi-ru', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/rhombi_ru.html'));
});
/*------------------------------------------------------------*/


/*------------------------------------------------------------*/
/*------------------------ЩОДЕННИК----------------------------*/
/*------------------------------------------------------------*/
/*  1) робимо статичні файли доступними для динамічної частини сайту*/
app.use("/diary/public", express.static(path.join(__dirname, "diary", "public")));  //публічні файли щоденників
app.use("/diary/public/css", express.static("diary/public/css"));

/*  2) Використання EJS для динамічних шаблонів сторінок*/
app.set("view engine", "ejs");

/*   3) Вказуємо шлях до папок, де знаходяться шаблони EJS*/
app.set("views", [
  path.join(__dirname, "diary/public"),
  path.join(__dirname, "diary/public/searchResults")
]);

/*   4) Використання маршрутів для статей, де описані всі дії зі сторінками щоденника */
import articlesRoutes from "./diary/js/articlesRoutes_flysq.js";
app.use("/diary/public/flysquirrel-diary", articlesRoutes);
import articlesRoutesRob from "./diary/js/articlesRoutes_rob.js";
app.use("/diary/public/robert-diary", articlesRoutesRob);

/*------------------------------------------------------------*/

//=================== 4 - запуск серверу =======================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

