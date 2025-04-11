document.getElementById("regForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Зупиняємо стандартне відправлення форми

    const formData = new FormData(this);
    const response = await fetch("/diary/public/flysquirrel-diary/registration-de", { 
        method: "POST", 
        body: new URLSearchParams(formData),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const result = await response.text(); 
    if (response.status === 400) {
        document.getElementById("responseMessage").textContent = result; // Виводимо помилку
    } else {
        window.location.href = "/diary/public/diaryLogin-de.html"; // Якщо успіх — переходимо на сторінку
    }
});

function applyStyles() {
    const existing = document.getElementById("dynamic-styles");
    if (existing) existing.remove(); // видалити попередній стиль
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.id = "dynamic-styles";
    if (window.innerHeight > window.innerWidth) {
        link.href = "/diary/public/css/diarystyleMob.css";
    } else {
        link.href = "/diary/public/css/diarystyle.css";
    }
    document.head.appendChild(link);
}
applyStyles();// Запускаємо при завантаженні
window.addEventListener("resize", applyStyles);// Пере-перевірка при зміні розміру вікна