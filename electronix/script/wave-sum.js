(() => {

const svg = document.getElementById("scene");
const slider = document.getElementById("timeSlider");
const timeValue = document.getElementById("timeValue");


// ============================================================
// ПАРАМЕТРИ ДВОХ КОЛИВАНЬ
// ============================================================

const A1 = 0.85;
const A2 = 0.65;
const omega = 1;
const phi1 = 0;
const phi2 = Math.PI / 3;


// ============================================================
// РОЗМІРИ SVG
// ============================================================

const width = 600;
const height = 300;


// Ліва частина — фазори

const phaseWidth = 250;

// Права частина — графіки

const graphLeft = 280;
const graphRight = 585;


// ============================================================
// ДОПОМІЖНІ ФУНКЦІЇ
// ============================================================

function createElement(type, attributes = {}) {

    const element =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            type
        );

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }

    svg.appendChild(element);

    return element;
}


function line(x1, y1, x2, y2, attributes = {}) {

    return createElement("line", {
        x1,
        y1,
        x2,
        y2,
        ...attributes
    });
}


function text(x, y, content, attributes = {}) {

    const element = createElement("text", {
        x,
        y,
        ...attributes
    });

    element.textContent = content;

    return element;
}


// ============================================================
// ФОН
// ============================================================

createElement("rect", {
    x: 0,
    y: 0,
    width: width,
    height: height,
    fill: "#fafafa"
});


// Вертикальний роздільник

line(
    phaseWidth,
    0,
    phaseWidth,
    height,
    {
        stroke: "#bbb",
        "stroke-width": 1
    }
);


// ============================================================
// ЗАГОЛОВКИ
// ============================================================

text(
    phaseWidth / 2,
    20,
    "Фазори",
    {
        "text-anchor": "middle",
        "font-size": 14,
        "font-weight": "bold"
    }
);

text(
    (graphLeft + graphRight) / 2,
    20,
    "Гармонічні коливання",
    {
        "text-anchor": "middle",
        "font-size": 14,
        "font-weight": "bold"
    }
);


// ============================================================
// КОМПЛЕКСНА ПЛОЩИНА
// ============================================================

const cx = 125;
const cy = 150;

const phaseScale = 80;


// Максимальний можливий радіус

const maxRadius =
    (A1 + A2) * phaseScale;


// Одиничне коло

createElement("circle", {
    cx,
    cy,
    r: A1 * phaseScale,
    fill: "none",
    stroke: "#ddd",
    "stroke-width": 1
});


// Осі

line(
    25,
    cy,
    225,
    cy,
    {
        stroke: "#888",
        "stroke-width": 1
    }
);

line(
    cx,
    40,
    cx,
    260,
    {
        stroke: "#888",
        "stroke-width": 1
    }
);


// Назви осей

text(
    220,
    cy - 7,
    "Re",
    {
        "font-size": 11,
        "text-anchor": "end"
    }
);

text(
    cx + 6,
    48,
    "Im",
    {
        "font-size": 11
    }
);


// ============================================================
// ФАЗОРИ
// ============================================================

// A1

const vector1 = line(
    cx,
    cy,
    cx + A1 * phaseScale,
    cy,
    {
        stroke: "#2563eb",
        "stroke-width": 3,
        "stroke-linecap": "round"
    }
);


// A2

const vector2 = line(
    cx,
    cy,
    cx + A2 * phaseScale,
    cy,
    {
        stroke: "#16a34a",
        "stroke-width": 3,
        "stroke-linecap": "round"
    }
);


// Результуючий вектор

const resultVector = line(
    cx,
    cy,
    cx + (A1 + A2) * phaseScale,
    cy,
    {
        stroke: "#dc2626",
        "stroke-width": 4,
        "stroke-linecap": "round"
    }
);


// ============================================================
// ПАРАЛЕЛОГРАМ ДЛЯ СКЛАДАННЯ
// ============================================================

// Кінець A1

const endpoint1 =
    createElement("circle", {
        cx,
        cy,
        r: 0
    });


// Кінець A2

const endpoint2 =
    createElement("circle", {
        cx,
        cy,
        r: 0
    });


// Допоміжні сторони паралелограма

const parallelogram1 = line(
    0, 0, 0, 0,
    {
        stroke: "#aaa",
        "stroke-width": 1,
        "stroke-dasharray": "4 3"
    }
);

const parallelogram2 = line(
    0, 0, 0, 0,
    {
        stroke: "#aaa",
        "stroke-width": 1,
        "stroke-dasharray": "4 3"
    }
);


// ============================================================
// ПОЗНАЧЕННЯ ВЕКТОРІВ
// ============================================================

const label1 = text(
    0,
    0,
    "A₁",
    {
        "font-size": 12,
        "font-weight": "bold"
    }
);

const label2 = text(
    0,
    0,
    "A₂",
    {
        "font-size": 12,
        "font-weight": "bold"
    }
);

const labelResult = text(
    0,
    0,
    "A = A₁ + A₂",
    {
        "font-size": 12,
        "font-weight": "bold"
    }
);


// ============================================================
// ГРАФІКИ
// ============================================================

const graphTop = 40;
const graphBottom = 260;

const graphWidth =
    graphRight - graphLeft;

const graphCenter =
    (graphTop + graphBottom) / 2;

const graphScale = 75;


// Ось X

line(
    graphLeft,
    graphCenter,
    graphRight,
    graphCenter,
    {
        stroke: "#888",
        "stroke-width": 1
    }
);


// Межі по часу

line(
    graphLeft,
    graphTop,
    graphLeft,
    graphBottom,
    {
        stroke: "#888",
        "stroke-width": 1
    }
);


// ============================================================
// ФУНКЦІЇ КОЛИВАНЬ
// ============================================================

function x1(t) {

    return A1 *
        Math.cos(
            omega * t + phi1
        );
}


function x2(t) {

    return A2 *
        Math.cos(
            omega * t + phi2
        );
}


function xResult(t) {

    return x1(t) + x2(t);
}


// ============================================================
// ПОБУДОВА КРИВИХ
// ============================================================

function createWave(func, amplitude, stroke) {

    const points = [];

    const N = 300;

    for (let i = 0; i <= N; i++) {

        const t =
            (i / N) * 2 * Math.PI;

        const value = func(t);

        const px =
            graphLeft +
            (t / (2 * Math.PI)) *
            graphWidth;

        const py =
            graphCenter -
            value * graphScale;

        points.push(
            `${px},${py}`
        );
    }

    return createElement("polyline", {
        points: points.join(" "),
        fill: "none",
        stroke,
        "stroke-width": 2
    });
}


// Перше коливання

createWave(
    x1,
    A1,
    "#2563eb"
);


// Друге коливання

createWave(
    x2,
    A2,
    "#16a34a"
);


// Результат

createWave(
    xResult,
    A1 + A2,
    "#dc2626"
);


// ============================================================
// ПОТОЧНІ ТОЧКИ НА ГРАФІКАХ
// ============================================================

const point1 = createElement("circle", {
    cx: graphLeft,
    cy: graphCenter,
    r: 4,
    fill: "#2563eb"
});

const point2 = createElement("circle", {
    cx: graphLeft,
    cy: graphCenter,
    r: 4,
    fill: "#16a34a"
});

const pointResult = createElement("circle", {
    cx: graphLeft,
    cy: graphCenter,
    r: 5,
    fill: "#dc2626"
});


// Вертикальна лінія часу

const timeLine = line(
    graphLeft,
    graphTop,
    graphLeft,
    graphBottom,
    {
        stroke: "#555",
        "stroke-width": 1,
        "stroke-dasharray": "4 3"
    }
);


// ============================================================
// ЛЕГЕНДА
// ============================================================

text(
    graphLeft + 5,
    45,
    "A₁ cos(ωt + φ₁)",
    {
        "font-size": 10,
        fill: "#2563eb"
    }
);

text(
    graphLeft + 105,
    45,
    "A₂ cos(ωt + φ₂)",
    {
        "font-size": 10,
        fill: "#16a34a"
    }
);

text(
    graphLeft + 205,
    45,
    "сума",
    {
        "font-size": 10,
        fill: "#dc2626"
    }
);


// ============================================================
// ЧИСЛОВІ ЗНАЧЕННЯ
// ============================================================

const valueText = text(
    285,
    285,
    "",
    {
        "font-size": 11,
        "font-family": "monospace"
    }
);


// ============================================================
// ОНОВЛЕННЯ АНІМАЦІЇ
// ============================================================

function update(t) {

    // --------------------------------------------------------
    // Кути двох фазорів
    // --------------------------------------------------------

    const angle1 =
        omega * t + phi1;

    const angle2 =
        omega * t + phi2;


    // --------------------------------------------------------
    // Координати A1
    // --------------------------------------------------------

    const a1x =
        A1 * Math.cos(angle1);

    const a1y =
        A1 * Math.sin(angle1);


    // --------------------------------------------------------
    // Координати A2
    // --------------------------------------------------------

    const a2x =
        A2 * Math.cos(angle2);

    const a2y =
        A2 * Math.sin(angle2);


    // --------------------------------------------------------
    // Результуючий вектор
    // --------------------------------------------------------

    const ax =
        a1x + a2x;

    const ay =
        a1y + a2y;


    // --------------------------------------------------------
    // Перетворення в координати SVG
    // --------------------------------------------------------

    const p1x =
        cx + a1x * phaseScale;

    const p1y =
        cy - a1y * phaseScale;


    const p2x =
        cx + a2x * phaseScale;

    const p2y =
        cy - a2y * phaseScale;


    const resultX =
        cx + ax * phaseScale;

    const resultY =
        cy - ay * phaseScale;


    // --------------------------------------------------------
    // Вектор A1
    // --------------------------------------------------------

    vector1.setAttribute(
        "x2",
        p1x
    );

    vector1.setAttribute(
        "y2",
        p1y
    );


    // --------------------------------------------------------
    // Вектор A2
    // --------------------------------------------------------

    vector2.setAttribute(
        "x2",
        p2x
    );

    vector2.setAttribute(
        "y2",
        p2y
    );


    // --------------------------------------------------------
    // Результуючий вектор
    // --------------------------------------------------------

    resultVector.setAttribute(
        "x2",
        resultX
    );

    resultVector.setAttribute(
        "y2",
        resultY
    );


    // --------------------------------------------------------
    // Паралелограм
    // --------------------------------------------------------

    parallelogram1.setAttribute(
        "x1",
        p1x
    );

    parallelogram1.setAttribute(
        "y1",
        p1y
    );

    parallelogram1.setAttribute(
        "x2",
        resultX
    );

    parallelogram1.setAttribute(
        "y2",
        resultY
    );


    parallelogram2.setAttribute(
        "x1",
        p2x
    );

    parallelogram2.setAttribute(
        "y1",
        p2y
    );

    parallelogram2.setAttribute(
        "x2",
        resultX
    );

    parallelogram2.setAttribute(
        "y2",
        resultY
    );


    // --------------------------------------------------------
    // Підписи
    // --------------------------------------------------------

    label1.setAttribute(
        "x",
        p1x + 6
    );

    label1.setAttribute(
        "y",
        p1y - 6
    );


    label2.setAttribute(
        "x",
        p2x + 6
    );

    label2.setAttribute(
        "y",
        p2y - 6
    );


    labelResult.setAttribute(
        "x",
        resultX + 6
    );

    labelResult.setAttribute(
        "y",
        resultY - 8
    );


    // --------------------------------------------------------
    // Часовий графік
    // --------------------------------------------------------

    const px =
        graphLeft +
        (t / (2 * Math.PI)) *
        graphWidth;


    const y1 =
        graphCenter -
        x1(t) * graphScale;

    const y2 =
        graphCenter -
        x2(t) * graphScale;

    const yr =
        graphCenter -
        xResult(t) * graphScale;


    point1.setAttribute(
        "cx",
        px
    );

    point1.setAttribute(
        "cy",
        y1
    );


    point2.setAttribute(
        "cx",
        px
    );

    point2.setAttribute(
        "cy",
        y2
    );


    pointResult.setAttribute(
        "cx",
        px
    );

    pointResult.setAttribute(
        "cy",
        yr
    );


    timeLine.setAttribute(
        "x1",
        px
    );

    timeLine.setAttribute(
        "x2",
        px
    );


    // --------------------------------------------------------
    // Значення
    // --------------------------------------------------------

    valueText.textContent =
        `x₁ = ${x1(t).toFixed(2)}   ` +
        `x₂ = ${x2(t).toFixed(2)}   ` +
        `x = ${xResult(t).toFixed(2)}   ` +
        `φ₁ = 0,   φ₂ = π/3`;

    timeValue.textContent =
        t.toFixed(2);
}


// ============================================================
// БІГУНОК
// ============================================================

slider.addEventListener(
    "input",
    () => {

        const t =
            parseFloat(slider.value);

        update(t);
    }
);


// Початковий стан

update(0);

})();