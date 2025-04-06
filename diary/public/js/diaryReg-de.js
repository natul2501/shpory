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