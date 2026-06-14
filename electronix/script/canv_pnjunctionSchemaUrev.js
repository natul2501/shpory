window.addEventListener('load', () => {

    const canvas = document.getElementById('pnCanvasReverse');
    const ctx = canvas.getContext('2d');

    // ============================================
    // Функція малювання стрілки
    // ============================================

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

    // ============================================
    // Геометрія
    // ============================================

    const emitterX = 30;
    const emitterW = 170;

    const barrierX = 200;
    const barrierW = 100;

    const baseX = 300;
    const baseW = 170;

    const top = 70;
    const zoneH = 120;

    // ============================================
    // Області
    // ============================================

    ctx.fillStyle = "#ffe5e5";
    ctx.fillRect(emitterX, top, emitterW, zoneH);

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(barrierX, top, barrierW, zoneH);

    ctx.fillStyle = "#e5f0ff";
    ctx.fillRect(baseX, top, baseW, zoneH);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    ctx.strokeRect(emitterX, top, emitterW, zoneH);
    ctx.strokeRect(barrierX, top, barrierW, zoneH);
    ctx.strokeRect(baseX, top, baseW, zoneH);

    // ============================================
    // Назви областей
    // ============================================

    ctx.fillStyle = "black";
    ctx.font = "14px Arial";

    ctx.fillText("Емітер", 90, 50);
    ctx.fillText("Бар'єр", 225, 50);
    ctx.fillText("База", 370, 50);

    // ============================================
    // Носії в емітері (багато)
    // ============================================

    ctx.fillStyle = "#cc0000";
    ctx.font = "15px Arial";

    for (let y = 90; y <= 180; y += 18) {
        for (let x = 45; x <= 180; x += 22) {
            ctx.fillText("+", x, y);
        }
    }

    // ============================================
    // Носії в базі (менше)
    // ============================================

    ctx.fillStyle = "#0044cc";
    ctx.font = "13px Arial";

    for (let y = 100; y <= 175; y += 35) {
        for (let x = 330; x <= 450; x += 55) {
            ctx.fillText("e⁻", x, y);
        }
    }

    // ============================================
    // Збіднена область
    // ============================================

    ctx.font = "14px Arial";

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

    // ============================================
    // Ur (зворотна напруга)
    // ============================================

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";

    ctx.fillText("−", 140, 25);
    ctx.fillText("+", 350, 25);

    arrow(
        160,
        30,
        340,
        30,
        "#ff5500",
        "Ur"
    );

    // ============================================
    // Iwarm (тепловий струм)
    // ============================================

    arrow(
        320,
        230,
        180,
        230,
        "#cc0000",
        "Iwarm"
    );

    // ============================================
    // Idrift
    // ============================================

    arrow(
        320,
        210,
        180,
        210,
        "#008800",
        "Idrift"
    );

    // ============================================
    // Iterm
    // ============================================

    arrow(
        320,
        250,
        180,
        250,
        "#8000cc",
        "Iterm"
    );

    // ============================================
    // Isurf
    // ============================================

    arrow(
        320,
        270,
        180,
        270,
        "#0003cc",
        "Isurf"
    );

});