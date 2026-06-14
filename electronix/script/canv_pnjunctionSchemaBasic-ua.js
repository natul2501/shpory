window.addEventListener('load', () => {

    const canvas = document.getElementById("pnCanvas");
    const ctx = canvas.getContext("2d");

    // Новий розмір полотна
    const canvasWidth = 500;
    const canvasHeight = 250;

    // Старий розмір, під який малювалася схема
    const originalWidth = 1000;
    const originalHeight = 500;

    const scaleX = canvasWidth / originalWidth;   // 0.5
    const scaleY = canvasHeight / originalHeight; // 0.6

    ctx.scale(scaleX, scaleY);

    // =====================================================
    // Області
    // =====================================================

    const pX = 100;
    const barrierX = 420;
    const barrierW = 160;
    const nX = barrierX + barrierW;

    const top = 100;
    const h = 220;

    // p-область
    ctx.fillStyle = "#ffe0e0";
    ctx.fillRect(pX, top, barrierX - pX, h);

    // бар'єр
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(barrierX, top, barrierW, h);

    // n-область
    ctx.fillStyle = "#e0f0ff";
    ctx.fillRect(nX, top, 300, h);

    // контури
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.strokeRect(pX, top, barrierX - pX, h);
    ctx.strokeRect(barrierX, top, barrierW, h);
    ctx.strokeRect(nX, top, 300, h);

    // =====================================================
    // Заголовки
    // =====================================================

    ctx.font = "24px Arial";
    ctx.fillStyle = "black";

    ctx.fillText("p-область", 220, 70);
    ctx.fillText("Бар'єр", 455, 70);
    ctx.fillText("n-область", 690, 70);

    ctx.font = "18px Arial";
    ctx.fillText("(дірки +)", 230, 95);
    ctx.fillText("(збіднена зона)", 425, 95);
    ctx.fillText("(електрони e⁻)", 655, 95);

    // =====================================================
    // Дірки
    // =====================================================

    ctx.fillStyle = "#cc0000";
    ctx.font = "28px Arial";

    for (let y = 140; y <= 280; y += 45) {
        for (let x = 130; x <= 350; x += 45) {
            ctx.fillText("+", x, y);
        }
    }

    // =====================================================
    // Електрони
    // =====================================================

    ctx.fillStyle = "#0044cc";
    ctx.font = "22px Arial";

    for (let y = 140; y <= 280; y += 45) {
        for (let x = 620; x <= 840; x += 55) {
            ctx.fillText("e⁻", x, y);
        }
    }

    // =====================================================
    // Іони в бар'єрі
    // =====================================================

    ctx.font = "24px Arial";

    ctx.fillStyle = "#aa0000";

    for (let y = 145; y <= 280; y += 45) {
        ctx.fillText("−", 445, y);
        ctx.fillText("−", 475, y);
    }

    ctx.fillStyle = "#0000aa";

    for (let y = 145; y <= 280; y += 45) {
        ctx.fillText("+", 525, y);
        ctx.fillText("+", 555, y);
    }

    // =====================================================
    // Малювання стрілки
    // =====================================================

    function drawArrow(x1, y1, x2, y2, color) {

        const head = 10;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        const angle = Math.atan2(y2 - y1, x2 - x1);

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(
            x2 - head * Math.cos(angle - Math.PI / 6),
            y2 - head * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            x2 - head * Math.cos(angle + Math.PI / 6),
            y2 - head * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
    }

});