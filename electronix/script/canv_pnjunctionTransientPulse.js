window.addEventListener("load", () => {

    const canvas =
        document.getElementById(
            "smallSignalTransient"
        );

    const ctx =
        canvas.getContext("2d");

    // ==========================================
    // Налаштування
    // ==========================================

    ctx.lineWidth = 2;
    ctx.font = "16px Arial";
    ctx.strokeStyle = "#000";

    const W = canvas.width;
    const H = canvas.height;

    // ==========================================
    // Допоміжна функція стрілки
    // ==========================================

    function arrow(x1, y1, x2, y2) {

        const head = 8;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        const a =
            Math.atan2(
                y2 - y1,
                x2 - x1
            );

        ctx.beginPath();

        ctx.moveTo(x2, y2);

        ctx.lineTo(
            x2 - head *
            Math.cos(a - Math.PI / 6),

            y2 - head *
            Math.sin(a - Math.PI / 6)
        );

        ctx.lineTo(
            x2 - head *
            Math.cos(a + Math.PI / 6),

            y2 - head *
            Math.sin(a + Math.PI / 6)
        );

        ctx.closePath();
        ctx.fill();
    }

    // ==========================================
    // ГРАФІК 1
    // Uпр
    // ==========================================

    const top1 = 40;
    const left = 40;

    // осі

    arrow(left, 180, 280, 180);
    arrow(left, 180, left, 30);

    ctx.fillText("Uпр", 5, 45);
    ctx.fillText("t", 285, 185);

    // ==========================================
    // ГРАФІК 2
    // Iд
    // ==========================================

    const top2 = 280;

    arrow(left, 460, 280, 460);
    arrow(left, 460, left, 250);

    ctx.fillText("Id", 10, 265);
    ctx.fillText("t", 285, 465);

    // ------------------------------------------
    // імпульс
    // ------------------------------------------

    ctx.beginPath();
    ctx.lineWidth = 4;

    ctx.moveTo(60, 180);
    ctx.lineTo(90, 180);

    ctx.lineTo(90, 70);
    ctx.lineTo(200, 70);

    ctx.lineTo(200, 180);
    ctx.lineTo(260, 180);

    ctx.stroke();

    // ------------------------------------------
    // Струм діода
    // ------------------------------------------

    ctx.beginPath();
    ctx.moveTo(90, 460);
    ctx.lineTo(90, 330);

    ctx.quadraticCurveTo(
        100,
        345,
        120,
        350
    );

    ctx.lineTo(200, 350);
    ctx.lineTo(200, 480);

    ctx.quadraticCurveTo(
        210,
        460,
        230,
        460
    );

    ctx.stroke();

    // ==========================================
    // τуст
    // ==========================================

    /*ctx.beginPath();
    ctx.moveTo(105, 375);
    ctx.lineTo(170, 375);
    ctx.stroke();

    ctx.fillText(
        "τуст",
        120,
        370
    );

    // ==========================================
    // τсп
    // ==========================================

    ctx.beginPath();
    ctx.moveTo(200, 420);
    ctx.lineTo(255, 420);
    ctx.stroke();

    ctx.fillText(
        "τсп",
        215,
        415
    );*/

});