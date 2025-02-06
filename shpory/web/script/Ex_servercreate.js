function pr(){
  document.getElementById('displayInner').innerHTML = 
  "корінний каталог";
}
function nm(){
  document.getElementById('displayInner').innerHTML = 
  "містить бібліотеки, встановлені для даного проекту (express, mongoose, т.п.)";
}

function sh(){
  document.getElementById('displayInner').innerHTML = 
  "дочірні каталоги проекту, що по суті являють собою веб-контент сайту";
}

function shcss(){
  document.getElementById('displayInner').innerHTML = 
  "містить стилі, що застосовуються до дочірніх html-файлів";
}

function css(){
  document.getElementById('displayInner').innerHTML = 
  "стилі, що застосовуються до index.html";
}

function ser(){
  document.getElementById('displayInner').innerHTML = 
"<xmp>const express = require('express');\n"+"const mongoose = require('mongoose');\n\n"+
"const port = process.env.PORT || 3000;\n"+"const path = require('path');\n"+
"const db_url = process.env.DB_URL;\n\n"+"const app = express();\n"+"app.use(express.static(__dirname));\n"+
"app.use(express.static(path.join(__dirname, \"shpory/web\")));\n"+"app.use(express.urlencoded({extended:true}));\n\n"+
"mongoose.connect(db_url);\n"+"const db = mongoose.connection;\n"+"db.once('open', () =>{\n"+"  console.log('MongoDB connection successful');\n"+
"});\n\n"+"const userSchema = new mongoose.Schema({\n"+"  username:String\n"+"});\n\n"+
"const Users = mongoose.model(\"users\",userSchema);\n\n"+"app.get('/', (req, res) => {\n"+
"  res.sendFile(path.join(__dirname, 'index.html'));\n"+"});\n\n"+"app.get('/post', (req,res) => {\n"+
"  try {\n"+"    console.log(req);\n"+"    res.send('Дані форми отримані')\n"+"  } catch (error) {\n"+
"    console.log(error);\n"+"  }\n"+"});\n\n"+"app.post('/post', async (req,res) =>{\n"+
"  try {\n"+"    const {username} = req.body;\n"+"    const user = new Users({\n"+"      username\n"+
"    });\n"+"    await user.save();\n"+"    console.log(`${user} is created`);\n"+"    res.send(`New ${user} is created`);\n"+
"    console.log(req.body);\n"+"  } catch (error) {\n"+"    console.log(error);\n"+"  }\n"+"});\n\n"+
"app.listen(port, () => {\n"+"  console.log(`Server is running on port ${port}`);\n"+"});</xmp>";
}

function ind(){
  document.getElementById('displayInner').innerHTML = 
"<xmp><!DOCTYPE html>\n"+"<html>\n"+"<head>\n"+
"    <link rel=\"stylesheet\" type=\"text/css\" href=\"css/style.css\">\n"+
"</head>\n"+"<body>\n"+"    Hello, world!<br>\n"+
"    <a href =\"shpory/web/form.html\"> Перейти до заповнення форми</a>\n"+"</body>\n"+"</html></xmp>"
}

function shf(){
  document.getElementById('displayInner').innerHTML = 
"<xmp><!DOCTYPE html>\n"+"<html>\n"+"<head>\n"+
"    <link rel=\"stylesheet\" type=\"text/css\" href=\"css/formstyle.css\">\n"+
"</head>\n"+"<body>\n"+
"   <form action=\"/post\" method=\"post\">\n"+
"       <p>\n"+
"           <label>Ім'я користувача:</label><br>\n"+
"           <input type=\"text\" name=\"username\" id=\"usernameId\"/>\n"+
"       </p>\n"+
"       <button type=\"submit\">Відправити</button>\n"+
"   </form>\n"+"</body>\n"+"</html></xmp>\n"+
"<u>Результат:</u><br><form><p><label>Ім'я користувача:</label><br>"+
"<input type=\"text\"/></p><button type=\"submit\">Відправити</button></form>"
}

function pac(){
  document.getElementById('displayInner').innerHTML = 
"<xmp>{\n"+
"   \"name\": \"project\",\n   \"version\": \"1.0.0\",\n   \"main\": \"server.js\",\n"+
"   \"dependencies\": {\n     \"express\": \"^4.21.2\",\n     \"mongoose\": \"^8.9.6\",\n"+
"     ...\n},\n   \"scripts\": {\n"+
"     \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\",\n"+
"     \"start\": \"nodemon server.js\"\n},\n   \"keywords\": [],\n"+
"   \"author\": \"\",\n   \"license\": \"ISC\",\n   \"description\": \"\"\n"+
" }</xmp>\n\n"
}

function env(){
  document.getElementById('displayInner').innerHTML = 
"<xmp>DB_URL = mongodb+srv://username:password@cluster0.hr7cv.mongodb.net/collectionname\n"+
"PORT = 3000</xmp>"
}

	

