(() => {
const svg = document.getElementById("scenem");
const slider = document.getElementById("timeSliderm");
const timeValue = document.getElementById("timeValuem");

// ------------------------------------------------------------
// Параметри коливання
// ------------------------------------------------------------

const A = 1;              // амплітуда
const omega = 1;          // кутова частота
const phi = 0;            // початкова фаза

const tMax = 2 * Math.PI;

// ------------------------------------------------------------
// Розміри
// ------------------------------------------------------------

const width = 600;
const height = 300;

const leftWidth = 350;
const rightWidth = 250;

const centerY = 150;

// ------------------------------------------------------------
// SVG helpers
// ------------------------------------------------------------

function createSVGElement(type, attributes = {}) {
    const element = document.createElementNS(
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
    return createSVGElement("line", {
        x1, y1, x2, y2,
        ...attributes
    });
}

function text(x, y, content, attributes = {}) {
    const element = createSVGElement("text", {
        x, y,
        ...attributes
    });

    element.textContent = content;

    return element;
}

// ------------------------------------------------------------
// Фон двох областей
// ------------------------------------------------------------

createSVGElement("rect", {
    x: 0,
    y: 0,
    width: leftWidth,
    height: height,
    fill: "#fafafa"
});

createSVGElement("rect", {
    x: leftWidth,
    y: 0,
    width: rightWidth,
    height: height,
    fill: "#f4f4f4"
});

// Роздільна лінія

line(
    leftWidth,
    0,
    leftWidth,
    height,
    {
        stroke: "#bbb",
        "stroke-width": 1
    }
);

// ------------------------------------------------------------
// Заголовки
// ------------------------------------------------------------

text(
    175,
    20,
    "Гармонійне коливання",
    {
        "text-anchor": "middle",
        "font-size": 14,
        "font-weight": "bold"
    }
);

text(
    475,
    20,
    "Комплексна площина",
    {
        "text-anchor": "middle",
        "font-size": 14,
        "font-weight": "bold"
    }
);

// ------------------------------------------------------------
// Часовий графік
// ------------------------------------------------------------

const graphLeft = 35;
const graphRight = leftWidth - 15;
const graphTop = 40;
const graphBottom = 260;

const graphWidth = graphRight - graphLeft;
const graphHeight = graphBottom - graphTop;

const graphCenterY = (graphTop + graphBottom) / 2;

// Масштаб по Y

const yScale = 80;

// Осі

line(
    graphLeft,
    graphCenterY,
    graphRight,
    graphCenterY,
    {
        stroke: "#888",
        "stroke-width": 1
    }
);

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

// Підписи осей

text(
    graphRight - 5,
    graphCenterY - 7,
    "t",
    {
        "font-size": 12,
        "text-anchor": "end"
    }
);

text(
    graphLeft + 8,
    graphTop + 12,
    "x",
    {
        "font-size": 12
    }
);

// ------------------------------------------------------------
// Побудова синусоїди
// ------------------------------------------------------------

const wavePoints = [];

const numberOfPoints = 300;

for (let i = 0; i <= numberOfPoints; i++) {

    const t = (i / numberOfPoints) * tMax;

    const x = A * Math.cos(omega * t + phi);

    const px =
        graphLeft +
        (t / tMax) * graphWidth;

    const py =
        graphCenterY -
        x * yScale;

    wavePoints.push(`${px},${py}`);
}

createSVGElement("polyline", {
    points: wavePoints.join(" "),
    fill: "none",
    stroke: "#2563eb",
    "stroke-width": 2
});

// ------------------------------------------------------------
// Точка поточного значення на часовому графіку
// ------------------------------------------------------------

const timePoint = createSVGElement("circle", {
    cx: graphLeft,
    cy: graphCenterY,
    r: 5,
    fill: "#dc2626"
});

// Вертикальна лінія поточного часу

const timeLine = line(
    graphLeft,
    graphTop,
    graphLeft,
    graphBottom,
    {
        stroke: "#dc2626",
        "stroke-width": 1,
        "stroke-dasharray": "4 3"
    }
);

// ------------------------------------------------------------
// Комплексна площина
// ------------------------------------------------------------

const cx = leftWidth + rightWidth / 2;
const cy = centerY + 10;

const radius = 85;

// Одиничне коло

createSVGElement("circle", {
    cx,
    cy,
    r: radius,
    fill: "none",
    stroke: "#aaa",
    "stroke-width": 1
});

// Осі комплексної площини

line(
    leftWidth + 15,
    cy,
    width - 15,
    cy,
    {
        stroke: "#888",
        "stroke-width": 1
    }
);

line(
    cx,
    35,
    cx,
    275,
    {
        stroke: "#888",
        "stroke-width": 1
    }
);

// Підписи осей

text(
    width - 18,
    cy - 7,
    "Re",
    {
        "font-size": 12,
        "text-anchor": "end"
    }
);

text(
    cx + 7,
    45,
    "Im",
    {
        "font-size": 12
    }
);

// Позначки ±A

text(
    cx + radius + 5,
    cy + 4,
    "A",
    {
        "font-size": 11
    }
);

text(
    cx - radius - 5,
    cy + 4,
    "−A",
    {
        "font-size": 11,
        "text-anchor": "end"
    }
);

// ------------------------------------------------------------
// Вектор на комплексній площині
// ------------------------------------------------------------

const vector = line(
    cx,
    cy,
    cx + radius,
    cy,
    {
        stroke: "#dc2626",
        "stroke-width": 3,
        "stroke-linecap": "round"
    }
);

// Кінцева точка вектора

const complexPoint = createSVGElement("circle", {
    cx: cx + radius,
    cy,
    r: 5,
    fill: "#dc2626"
});

// Проєкція на дійсну вісь

const projection = line(
    cx + radius,
    cy,
    cx + radius,
    cy,
    {
        stroke: "#2563eb",
        "stroke-width": 2,
        "stroke-dasharray": "4 3"
    }
);

// ------------------------------------------------------------
// Текст зі значеннями
// ------------------------------------------------------------

const valueText = text(
    15,
    285,
    "",
    {
        "font-size": 12,
        "font-family": "monospace"
    }
);

// ------------------------------------------------------------
// Оновлення сцени
// ------------------------------------------------------------

function update(t) {

    // Поточна фаза

    const angle = omega * t + phi;

    // Гармонійне коливання

    const x = A * Math.cos(angle);

    // Уявна частина

    const y = A * Math.sin(angle);

    // --------------------------------------------------------
    // Часовий графік
    // --------------------------------------------------------

    const px =
        graphLeft +
        (t / tMax) * graphWidth;

    const py =
        graphCenterY -
        x * yScale;

    timePoint.setAttribute("cx", px);
    timePoint.setAttribute("cy", py);

    timeLine.setAttribute("x1", px);
    timeLine.setAttribute("x2", px);

    // --------------------------------------------------------
    // Комплексна площина
    // --------------------------------------------------------

    const vectorX = cx + radius * x;
    const vectorY = cy - radius * y;

    vector.setAttribute("x2", vectorX);
    vector.setAttribute("y2", vectorY);

    complexPoint.setAttribute("cx", vectorX);
    complexPoint.setAttribute("cy", vectorY);

    // Проєкція дійсної частини

    projection.setAttribute("x1", vectorX);
    projection.setAttribute("y1", vectorY);

    projection.setAttribute("x2", vectorX);
    projection.setAttribute("y2", cy);

    // --------------------------------------------------------
    // Числові значення
    // --------------------------------------------------------

    valueText.textContent =
        `t = ${t.toFixed(2)}    ` +
        `x(t) = ${x.toFixed(2)}    ` +
        `Im = ${y.toFixed(2)}`;

    timeValue.textContent = t.toFixed(2);
}

// ------------------------------------------------------------
// Slider
// ------------------------------------------------------------

slider.addEventListener("input", () => {

    const t = parseFloat(slider.value);

    update(t);
});

// Початковий стан

update(0);

})();