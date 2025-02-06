//1 - імпортувати бібліотеки
const express = require('express');         //для створення серверу
const mongoose = require('mongoose');       //для роботи з БД
require('dotenv').config();                 //для зони видиості змінних глобального оточення (.env)

//2 - об'явити змінні
const port = process.env.PORT || 3000;
const path = require('path'); // Для роботи зі шляхами
const db_url = process.env.DB_URL;

//3 - ініціалізація серверу
const app = express();                      
//6 - каталоги для статичних файлів:
app.use(express.static(__dirname));
// 1. Робимо папку "shpory/web" доступною для браузера
app.use(express.static(path.join(__dirname, "shpory/web")));
//11 - middleware для обробки form-urlencoded (дані форми)
app.use(express.urlencoded({extended:true}));

//7 - підключити базу даних
mongoose.connect(db_url);
const db = mongoose.connection;
db.once('open', () =>{
  console.log('MongoDB connection successful');
});

//8 - об'явити схему для запису в ДБ
const userSchema = new mongoose.Schema({
  username:String
});

//9 - створюємо клас для ДБ, в якому вказуємо колекцію і дані
const Users = mongoose.model("users",userSchema);

//5 - в корінь виводимо головну сторінку
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//10 - отримуємо дані із форми
app.get('/post', (req,res) => {
  try {
    console.log(req);
    res.send('Дані форми отримані')
  } catch (error) {
    console.log(error);
  }
});

app.post('/post', async (req,res) =>{
  try {
    const {username} = req.body;
    const user = new Users({
      username
    });
    await user.save();
    console.log(`${user} is created`);
    res.send(`New ${user} is created`);
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});

//4 - запуск серверу
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

