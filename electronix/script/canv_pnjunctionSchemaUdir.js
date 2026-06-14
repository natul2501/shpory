window.addEventListener('load', () => {

    const canvas = document.getElementById('pnCanvasUdir');
    const ctx = canvas.getContext('2d');

    // ------------------------------------------------
    // Допоміжна функція стрілки
    // ------------------------------------------------

    function arrow(x1, y1, x2, y2, color, text) {

        const head = 8;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        const a = Math.atan2(y2 - y1, x2 - x1);

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(
            x2 - head * Math.cos(a - Math.PI / 6),
            y2 - head * Math.sin(a - Math.PI / 6)
        );
        ctx.lineTo(
            x2 - head * Math.cos(a + Math.PI / 6),
            y2 - head * Math.sin(a + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();

        if (text) {
            ctx.font = "12px Arial";
            ctx.fillText(
                text,
                (x1 + x2) / 2 - 15,
                (y1 + y2) / 2 - 5
            );
        }
    }

    // ------------------------------------------------
    // Області
    // ------------------------------------------------

    const emitterX = 30;
    const emitterW = 170;

    const barrierX = 200;
    const barrierW = 100;

    const baseX = 300;
    const baseW = 170;

    const top = 70;
    const zoneH = 120;

    // p-область (емітер)

    ctx.fillStyle = "#ffe5e5";
    ctx.fillRect(emitterX, top, emitterW, zoneH);

    // бар'єр

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(barrierX, top, barrierW, zoneH);

    // n-область (база)

    ctx.fillStyle = "#e5f0ff";
    ctx.fillRect(baseX, top, baseW, zoneH);

    // контури

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    ctx.strokeRect(emitterX, top, emitterW, zoneH);
    ctx.strokeRect(barrierX, top, barrierW, zoneH);
    ctx.strokeRect(baseX, top, baseW, zoneH);

    // ------------------------------------------------
    // Назви зон
    // ------------------------------------------------

    ctx.fillStyle = "black";
    ctx.font = "14px Arial";

    ctx.fillText("Емітер p⁺", 80, 50);
    ctx.fillText("Бар'єр", 225, 50);
    ctx.fillText("База n", 360, 50);

    // ------------------------------------------------
    // Емітер (сильно легований p⁺)
    // ------------------------------------------------

    ctx.fillStyle = "#cc0000";
    ctx.font = "15px Arial";

    for (let y = 90; y <= 180; y += 18) {
        for (let x = 45; x <= 180; x += 22) {
            ctx.fillText("+", x, y);
        }
    }

    // ------------------------------------------------
    // База (слабко легована n)
    // ------------------------------------------------

    ctx.fillStyle = "#0044cc";
    ctx.font = "13px Arial";

    for (let y = 100; y <= 175; y += 35) {
        for (let x = 330; x <= 450; x += 55) {
            ctx.fillText("e⁻", x, y);
        }
    }

    // ------------------------------------------------
    // Бар'єр
    // ------------------------------------------------

    ctx.font = "15px Arial";

    // вузька область збіднення з боку p+
    ctx.fillStyle = "#aa0000";
    for (let y = 95; y <= 175; y += 22) {
        ctx.fillText("−", 210, y);
    }

    // широка область збіднення з боку n
    ctx.fillStyle = "#0044cc";
    for (let y = 95; y <= 190; y += 20) {
        ctx.fillText("+", 245, y);
        ctx.fillText("+", 265, y);
        ctx.fillText("+", 285, y);
    }

    ctx.setLineDash([6,6]);

    ctx.beginPath();
    ctx.moveTo(230, 70);
    ctx.lineTo(230, 190);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 70);
    ctx.lineTo(300, 190);
    ctx.stroke();

    ctx.setLineDash([]);
    // ------------------------------------------------
    // Udir
    // ------------------------------------------------

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";

    ctx.fillText("+", 140, 25);
    ctx.fillText("−", 350, 25);

    arrow(160, 30, 340, 30, "#ff5500", "Udir");

    // ------------------------------------------------
    // Idiff
    // ------------------------------------------------

    arrow( 180, 220, 320, 220, "#cc0000", "Idiff");

    // ------------------------------------------------
    // Idrift
    // ------------------------------------------------

    arrow(320, 240, 180, 240, "#008800", "Idrift");

    // ------------------------------------------------
    // Irek
    // ------------------------------------------------

    arrow(320, 260, 180, 260, "#8000cc", "Irek");

    // ------------------------------------------------
    // Iterm
    // ------------------------------------------------

    arrow(180, 280, 320, 280, "#ff8800", "Iterm");

});