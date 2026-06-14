window.addEventListener('load', () => {

    const canvas = document.getElementById('reverseVahCanvas');
    const ctx = canvas.getContext('2d');

    const W = canvas.width;   // 500
    const H = canvas.height;  // 500

    // ==================================================
    // Геометрія
    // ==================================================

    const originX = 460;
    const originY = 40;

    const left = 40;
    const bottom = 460;

    const graphW = originX - left;
    const graphH = bottom - originY;

    // ==================================================
    // Осі
    // ==================================================

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    // вісь U
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(left, originY);
    ctx.stroke();

    // вісь I
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, bottom - 180);
    ctx.stroke();

    // стрілка U
    ctx.beginPath();
    ctx.moveTo(left, originY);
    ctx.lineTo(left + 10, originY - 5);
    ctx.lineTo(left + 10, originY + 5);
    ctx.closePath();
    ctx.fill();

    // стрілка I
    ctx.beginPath();
    ctx.moveTo(originX, bottom - 180);
    ctx.lineTo(originX - 5, bottom - 200);
    ctx.lineTo(originX + 5, bottom - 200);
    ctx.closePath();
    ctx.fill();

    // ==================================================
    // Підписи осей
    // ==================================================

    ctx.font = "16px Arial";
    ctx.fillText("-Ur", left - 25, originY + 5);
    ctx.fillText("-I", originX - 25, bottom - 175);

    // ==================================================
    // Сітка
    // ==================================================

    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;

    for (let i = 1; i <= 8; i++) {

        const x = originX - graphW * i / 8;

        ctx.beginPath();
        ctx.moveTo(x, originY);
        ctx.lineTo(x, bottom);
        ctx.stroke();
    }

    for (let i = 1; i <= 8; i++) {

        const y = originY + graphH * i / 8;

        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(originX, y);
        ctx.stroke();
    }

    // ==================================================
    // Масштабування
    // ==================================================

    function X(u) {
        return originX - 0.85 * u * graphW;
    }

    function Y(i) {
        return originY + (i / 2.2) * graphH;
    }

    // ==================================================
    // Модель зворотної ВАХ
    // ==================================================
    //
    // u = 0...1
    // i = 0...1
    //
    // три складові:
    // 1. тепловий струм
    // 2. термогенерація
    // 3. витоки
    //

    function reverseCurrent(u, tempFactor) {

    // тепловий струм
    let ith = 0.18 * tempFactor;

    // дуже слабка термогенерація
    let igen =
        0.015 * tempFactor *
        Math.pow(u, 3.0);

    // дуже слабкий поверхневий витік
    let ileak =
        0.008 * tempFactor *
        Math.pow(u, 4.5);

    let ibreak = 0;

    if (u > 0.86) {

    ibreak =
        0.05 *
        (
            Math.exp(
                35 * (u - 0.86)
            ) - 1
        );
}

    return ith + igen + ileak + ibreak;
}

    // ==================================================
    // Малювання кривої
    // ==================================================

    function drawCurve(tempFactor, color, dashed) {

        ctx.beginPath();

        if (dashed)
            ctx.setLineDash([8, 6]);
        else
            ctx.setLineDash([]);

        let first = true;

        // -------------------------------
        // Зміщення пробою по осі U
        // -------------------------------

        let uShift = 0;

        if (tempFactor < 1.0) {
            // T1 < T
            uShift = -0.05;
        }
        else if (tempFactor > 1.0) {
            // T2 > T
            uShift = +0.05;
        }

        for (let u = 0; u <= 1.0; u += 0.002) {

            let uEffective = u;

            // зміщуємо тільки область пробою
            if (u > 0.80) {
                uEffective += uShift;
            }

            let i =
                reverseCurrent(
                    uEffective,
                    tempFactor
                );

            if (i > 2.2)
                i = 2.2;

            const x = X(u);
            const y = Y(i);

            if (first) {

                ctx.moveTo(x, y);
                first = false;

            } else {

                ctx.lineTo(x, y);
            }
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.setLineDash([]);
    }

    // ==================================================
    // T1 < T
    // ==================================================

    drawCurve(
        0.55,
        "#3431fd",
        true
    );
    ctx.fillStyle = "#3431fd";
    ctx.font = "18px Arial";
    ctx.fillText("T1 < T", 70, 70);

    // ==================================================
    // T
    // ==================================================

    drawCurve(
        1.00,
        "#000000",
        false
    );

    // ==================================================
    // T2 > T
    // ==================================================

    drawCurve(
        1.70,
        "#c42d2d",
        true
    );
    ctx.fillStyle = "#c42d2d";
    ctx.fillText("T2 > T", 180, 125);

});