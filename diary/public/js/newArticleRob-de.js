/*------------------------------------------------------------ */
/*---------------- 0. ДОПОМІЖНІ ФУНКЦІЇ ---------------------- */
function insertInTextarea(text) {
    let textarea = document.getElementById("newArticleContent");
    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;
    let before = textarea.value.substring(0, startPos);
    let after = textarea.value.substring(endPos);
    textarea.value = before + text + after;
    textarea.setSelectionRange(startPos + text.length, startPos + text.length);
    textarea.focus();
}

function getFormattedDate() {
    const date = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[date.getDay()];
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Місяці від 0 до 11
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${dayName} ${dd}.${mm}.${yyyy} ${hh}:${min}`;
  }
/*------------------------------------------------------------ */
/*----------------------- 1. КНОПКИ -------------------------- */
function prewiew(){
    let thema = document.newArticle.newArticleThema.value;
    let tags = document.newArticle.newArticleTags.value;
    let content = document.newArticle.newArticleContent.value;
    let currentDate = getFormattedDate();
    document.getElementById('newArticlePrewiew').innerHTML = 
    "<div class=\"eventt\">"+
	"<div id=\"articleTime\">" + currentDate + "</div>"+
	"<div class=\"about\">" + content + "</div>"+
    "<div class=\"tags\">" + tags + "</div>"+
	"</div>";
    document.getElementById('newArticlePrewiewMob').innerHTML = document.getElementById('newArticlePrewiew').innerHTML;
}

function placeImgShow(){
    document.getElementById('placeImg-style-before').style.display = "block";
}

function closePlaceImgWindow(){
    document.getElementById('placeImg-style-before').style.display = "none";
}

const placeImg = async () => {
    try {
        let link = document.getElementById('placeImgInput').value;
        let description = document.getElementById('placeImgInputTitel').value;
        let thema = document.getElementById('placeImgInputThema').value;
        let galerieFlag = document.getElementById('placeImgInputPrivat').checked;
        let text = "";
        if(galerieFlag){
            text =
            "<div align=\"center\">\n"+
                "<a href=\"" + link + "\">\n"+
                    "<img src=\"" + link + "\" width=\"60%\" title=\"" + description + "\" style=\"border: solid 1px gray\">\n"+
                    "<span style=\"display:none\">notForGalery</span>\n"+           //не показувати в галереї
                    "</a>\n"+
            "</div>\n";
        } else {
            text =
        "<div align=\"center\">\n"+
            "<a href=\"" + link + "\">\n"+
                "<img src=\"" + link + "\" width=\"60%\" title=\"" + description + "\" style=\"border: solid 1px gray\">\n"+
                "<span style=\"display:none\">" + thema + "</span>\n"+
                "</a>\n"+
        "</div>\n";
        }
        insertInTextarea(text);
        document.getElementById('placeImg-style-before').style.display = "none";
    } catch (error) {document.getElementById('newArticlePrewiew').innerHTML = error;}
}

function showmenu(){
    let menu = document.getElementById('menu');
    if(menu.style.display == 'block'){
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}
function applyStyles() {
    const existing = document.getElementById("dynamic-styles");
    if (existing) existing.remove(); // видалити попередній стиль
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.id = "dynamic-styles";
    if (window.innerHeight > window.innerWidth) {
        link.href = "css/diaryRobstyleMob.css";
    } else {
        link.href = "css/diaryRobstyle.css";
    }
    document.head.appendChild(link);
}
applyStyles();// Запускаємо при завантаженні
window.addEventListener("resize", applyStyles);// Пере-перевірка при зміні розміру вікна
/*------------------------------------------------------------ */
/*------- 1.2. СПИСОК КОРИСТУВАЧІВ, ЯКІ МОЖУТЬ ПЕРЕГЛЯДАТИ СТАТТЮ---------- */

let allUsers = []; // Масив для збереження всіх користувачів
// >>>-- Відображення списку користувачів при натисканні "для вибраних користувачів"
document.getElementById('newArticlePermissions').addEventListener('change', function() {
    const userListContainer = document.getElementById('userListContainer');
    const selectedUsersContainer = document.getElementById("selectedUsersContainer");
    if (this.value === 'userlist') {
        userListContainer.style.display = 'inline-block';
        selectedUsersContainer.style.display = 'block';
        fetchUsers();
    } else {
        userListContainer.style.display = 'none';
        selectedUsersContainer.style.display = 'none';
    }
});
// >>>-- Отримання списку користувачів із бази даних
function fetchUsers() {
    fetch('/diary/public/flysquirrel-diary/apiusers')
        .then(response => response.json())
        .then(users => {
            allUsers = users; // Зберігаємо користувачів у глобальну змінну
            renderUserList(users); // Відображаємо список користувачів
            populateUserList();
        })
        .catch(error => console.error('Помилка при завантаженні користувачів:', error));
}

// >>>-- Функція для рендерингу користувачів у випадаючий список
function renderUserList(users) {
    const select = document.getElementById('selectedUsers');
    select.innerHTML = ''; // Очищаємо список

    users.forEach(user => {
        let option = document.createElement('option');
        option.value = user._id;
        option.textContent = user.username;
        select.appendChild(option);
    });
}
let selectedUsers = new Set();
let selectedUsersId = new Set();
function populateUserList() {
    let userList = document.getElementById("userList");
    userList.innerHTML = "";
    allUsers.forEach(user => {
        let option = document.createElement("option");
        option.value = user._id;
        option.textContent = user.username;
        userList.appendChild(option);
    });
}

// >>>-- Відображення результатів пошуку користувача
function selectUser() {
    let userList = document.getElementById("userList");
    let selectedUsersDisplay = document.getElementById("selectedUsersDisplay");
    let hiddenInput = document.getElementById("selectedUsers");
    for (let option of userList.options) {
        if (option.selected) {
            if (selectedUsers.has(option.textContent)) {
                selectedUsers.delete(option.textContent); // Відміна вибору при повторному натисканні
                selectedUsersId.delete(option.value);
            } else {
                selectedUsers.add(option.textContent);
                selectedUsersId.add(option.value);
            }
            option.selected = false; // Скидання вибору в списку
        }
    }
    // Оновлення відображення вибраних користувачів
    selectedUsersDisplay.textContent = Array.from(selectedUsers).join(", ");
    hiddenInput.value = Array.from(selectedUsersId).join(",");
}

function filterUsers() {
    let searchValue = document.getElementById("userSearch").value.toLowerCase();
    let userList = document.getElementById("userList");
    for (let option of userList.options) {
        option.style.display = option.textContent.toLowerCase().includes(searchValue) ? "block" : "none";
    }
}

const field = document.getElementById("userSearch");
function i_focus(e){
    let list = document.getElementById("userList");
    list.style.display = "block";
}
field.addEventListener("focus", i_focus);

function i_blur(e){
    let list = document.getElementById("userList");
    function l_focus(e){
        list.style.display = "block";
    }
    list.addEventListener("focus", l_focus);
    function l_blur(e){
        list.style.display = "none";
    }
    list.addEventListener("blur", l_blur);
}   
field.addEventListener("blur", i_blur);

/*------------------------------------------------------------ */
/*------- 2. ПРИ ПЕРЕХОДІ ЗА ПОСИЛАННЯМ НА СТОРІНКУ ---------- */
let articleId;
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get("id");
    const form = document.getElementById("newArticle");
    if (articleId) {
        try {
            const response = await fetch(`/diary/public/robert-diary/getArticle/${articleId}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const article = await response.json();
            document.getElementById("newArticleThema").value = article.thema || "";
            document.getElementById("newArticleTags").value = article.tags || "";
            document.getElementById("newArticleContent").value = article.content || "";
            form.action = `/diary/public/robert-diary/editArticle/${articleId}`;
        } catch (error) {
            console.error("Помилка отримання статті:", error);
        }
    } else {
        form.action = "/diary/public/robert-diary/newArticleDe";
    }

    /*------------------------------------------------------------ */
    /*------------- 3. ВІДПРАВКА ДАНИХ НА СЕРВЕР ----------------- */
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки
        let form = document.getElementById("newArticle");
        let thema = form.newArticleThema.value;
        let tagsString = form.newArticleTags.value;
        let content = form.newArticleContent.value;
        const permission = form.newArticlePermissions.value;
        let selectedUsersInput = document.getElementById("selectedUsers");
        if(content.length < 10){
            document.getElementById("newArticleMessage").textContent = `Sie müssen Text mit mindestens 10 Zeichen hinzufügen.`;
            return;
        }
        if(thema.length < 10){
            document.getElementById("newArticleMessage").textContent = `Sie müssen eine Thema mit mindestens 10 Zeichen hinzufügen`;
            return;
        }
        let parts = tagsString.split(',').map(part => part.trim());// Розбиваємо рядок за комами та обрізаємо пробіли
        let validPattern = /^[\p{L}0-9_\-+$€%&'"]+$/u;// Регулярний вираз для перевірки допустимих символів
        for(let part of parts){
            if(part.length>30){
                document.getElementById("newArticleMessage").textContent = `Ein Tag sollte nicht mehr als 30 Zeichen enthalten.`;
                return;
            }
            if(!validPattern.test(part)){
                document.getElementById("newArticleMessage").textContent = `Falsches Tag ${part}: Erlaubte Buchstaben, Zahlen und Sonderzeichen _ - + $ € % & ' "`;
                return;
            }
        }
        
        const formData = new FormData(this);
        formData.append("selectedUsers", selectedUsersInput.value);
            let response;
        try {
            if(articleId){
                response = await fetch(`/diary/public/robert-diary/editArticle/${articleId}`, {
                    method: "POST",
                    body: new URLSearchParams(formData), // Відправляємо як form-urlencoded
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                });
            } else {
                response = await fetch("/diary/public/robert-diary/newArticleDe", {
                    method: "POST",
                    body: new URLSearchParams(formData), // Відправляємо як form-urlencoded
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                });
            }
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const result = await response.text();
            document.getElementById("newArticleMessage").textContent = result; // Вставляємо відповідь у <div>
            // Перенаправлення після успішного збереження
            window.location.href = "/diary/public/robert-diary";
        } catch (error) {
            console.error("Помилка відправки форми:", error);
            document.getElementById("newArticleMessage").textContent = "Fehler beim Speichern des Artikels!";
        }
    });
});

/*------------------------------------------------------------ */
/*----------------------- 4. ЕМОДЗІ -------------------------- */
fetch('emodjilist.json')
    .then(response => response.json())
    .then(data => {
        const groupedEmojis = {};

        data.forEach(emoji => {
            const group = emoji.group;
            if (!groupedEmojis[group]) {
                groupedEmojis[group] = [];
            }
            groupedEmojis[group].push(emoji);
        });

        displayEmojis(groupedEmojis);
    })
    .catch(error => console.error('Помилка завантаження JSON:', error));

function displayEmojis(groupedEmojis) {
    const container = document.getElementById('emoji-container');
    
    for (const [group, emojis] of Object.entries(groupedEmojis)) {
        const groupElement = document.createElement('div');
        groupElement.innerHTML = `<h3>${group}</h3>`;
        const emojiList = document.createElement('div');
        emojiList.classList.add('emoji-list');
        emojis.forEach(emoji => {
            const emojiSpan = document.createElement('span');
            emojiSpan.classList.add('emoji-item');
            emojiSpan.innerHTML = emoji.char; // Додаємо сам символ емодзі
            emojiSpan.title = emoji.name; // Вказуємо назву при наведенні
            emojiSpan.setAttribute("id", emoji.char);
            emojiList.appendChild(emojiSpan);
        });
        groupElement.appendChild(emojiList);
        container.appendChild(groupElement);
    }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains("emoji-item")) {
        insertInTextarea(event.target.innerText);
    }
});

