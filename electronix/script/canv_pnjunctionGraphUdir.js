window.addEventListener('load', () => {

    const canvas = document.getElementById('pnCanvasUdirGr');
    const ctx = canvas.getContext('2d');

    const W = canvas.width;
    const H = canvas.height;

    // ------------------------------------------------
    // Поля графіка
    // ------------------------------------------------

    const left = 40;
    const bottom = 260;
    const right = 280;
    const top = 20;

    const graphW = right - left;
    const graphH = bottom - top;

    // ------------------------------------------------
    // Осі координат
    // ------------------------------------------------

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(left, bottom);
    ctx.lineTo(left, top);
    ctx.stroke();

    // стрілки

    function arrowHead(x, y, angle) {

        const size = 7;

        ctx.beginPath();
        ctx.moveTo(x, y);

        ctx.lineTo(
            x - size * Math.cos(angle - Math.PI/6),
            y - size * Math.sin(angle - Math.PI/6)
        );

        ctx.lineTo(
            x - size * Math.cos(angle + Math.PI/6),
            y - size * Math.sin(angle + Math.PI/6)
        );

        ctx.closePath();
        ctx.fill();
    }

    ctx.fillStyle = "black";

    arrowHead(right, bottom, 0);
    arrowHead(left, top, -Math.PI/2);

    // ------------------------------------------------
    // Підписи осей
    // ------------------------------------------------

    ctx.font = "14px Arial";

    ctx.fillText("U", right + 5, bottom + 5);
    ctx.fillText("I", left - 10, top - 5);

    // ------------------------------------------------
    // Масштабування
    // ------------------------------------------------

    const Umax = 1.0;
    const Imax = 1.0;

    function X(u) {
        return left + graphW * u / Umax;
    }

    function Y(i) {
        return bottom - graphH * i / Imax;
    }

    // ------------------------------------------------
    // Малювання функції
    // ------------------------------------------------

    function drawCurve(func, color, width = 2, dashed = false) {

        ctx.beginPath();

        if (dashed)
            ctx.setLineDash([5,5]);
        else
            ctx.setLineDash([]);

        let first = true;

        for (let u = 0; u <= 1.0; u += 0.005) {

            let i = func(u);

            if (i > Imax)
                i = Imax;

            const x = X(u);
            const y = Y(i);

            if (first) {
                ctx.moveTo(x, y);
                first = false;
            }
            else {
                ctx.lineTo(x, y);
            }
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();

        ctx.setLineDash([]);
    }

    // ------------------------------------------------
    // Моделі струмів
    // ------------------------------------------------

    function Iideal(u) {

        const k = 4.5;

        return 0.015 * (Math.exp(k * u) - 1);
    }

    function Irek(u) {

        return 0.1 * Math.pow(u, 2.2);
    }

    function Ires(u) {

        return 3.42 * u;
    }

    function Ireal(u) {

        return Iideal(u) - 4*Irek(u) - 0.1*Iideal(u);
    }

    // ------------------------------------------------
    // Сітка
    // ------------------------------------------------

    ctx.strokeStyle = "#dddddd";
    ctx.lineWidth = 1;

    for (let i = 1; i <= 5; i++) {

        const x = left + graphW * i / 5;

        ctx.beginPath();
        ctx.moveTo(x, bottom);
        ctx.lineTo(x, top);
        ctx.stroke();
    }

    for (let i = 1; i <= 5; i++) {

        const y = bottom - graphH * i / 5;

        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(right, y);
        ctx.stroke();
    }

    // ------------------------------------------------
    // Графіки
    // ------------------------------------------------

    drawCurve(Iideal, "#0044ff", 2.5);
    drawCurve(Irek, "#aa00aa", 2);
    drawCurve(Ires, "#888888", 2, true);
    drawCurve(Ireal, "#008800", 3);

    // ------------------------------------------------
    // Підписи кривих
    // ------------------------------------------------

    ctx.font = "12px Arial";

    ctx.fillStyle = "#0044ff";
    ctx.fillText("Idiff", 225, 60);

    ctx.fillStyle = "#aa00aa";
    ctx.fillText("Irek", 240, 236);

    ctx.fillStyle = "#666666";
    ctx.fillText("Ires", 110, 50);

    ctx.fillStyle = "#008800";
    ctx.fillText("Ireal", 245, 195);

});