(() => {

    // ============================================================
    // SVG
    // ============================================================

    const svg = document.getElementById("scenez");

    const slider =
        document.getElementById("thetaSliderz");

    const thetaValue =
        document.getElementById("thetaValuez");

    const reactanceValue =
        document.getElementById("reactanceValue");

    const tanValue =
        document.getElementById("tanValue");

    const impedanceValue =
        document.getElementById("impedanceValue");


    // ============================================================
    // ПАРАМЕТРИ КОЛА
    // ============================================================

    // Опір

    const R = 100;


    // Щоб отримати початкову точку,
    // задаємо ω, L і C.

    const omega = 1000;

    const L = 0.001;

    const C = 0.000001;


    // ============================================================
    // РОЗМІРИ
    // ============================================================

    const width = 600;
    const height = 300;

    const cx = 190;
    const cy = 155;

    const scale = 0.8;


    // ============================================================
    // SVG HELPERS
    // ============================================================

    function createElement(type, attributes = {}) {

        const element =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                type
            );

        for (
            const [key, value]
            of Object.entries(attributes)
        ) {
            element.setAttribute(key, value);
        }

        svg.appendChild(element);

        return element;
    }


    function line(
        x1,
        y1,
        x2,
        y2,
        attributes = {}
    ) {

        return createElement(
            "line",
            {
                x1,
                y1,
                x2,
                y2,
                ...attributes
            }
        );
    }


    function text(
        x,
        y,
        content,
        attributes = {}
    ) {

        const element =
            createElement(
                "text",
                {
                    x,
                    y,
                    ...attributes
                }
            );

        element.textContent = content;

        return element;
    }


    // ============================================================
    // ОСІ КОМПЛЕКСНОЇ ПЛОЩИНИ
    // ============================================================

    line(
        30,
        cy,
        350,
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


    // Написи осей

    text(
        345,
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


    // ============================================================
    // ПІДПИС
    // ============================================================

    text(
        cx,
        20,
        "Імпеданс Z = R + iX",
        {
            "font-size": 14,
            "font-weight": "bold",
            "text-anchor": "middle"
        }
    );


    // ============================================================
    // ЕЛЕМЕНТИ ГРАФІКУ
    // ============================================================

    // Вектор Z

    const zVector =
        line(
            cx,
            cy,
            cx + R * scale,
            cy,
            {
                stroke: "#dc2626",
                "stroke-width": 4,
                "stroke-linecap": "round"
            }
        );


    // Кінець вектора

    const zPoint =
        createElement(
            "circle",
            {
                cx: cx + R * scale,
                cy,
                r: 5,
                fill: "#dc2626"
            }
        );


    // Горизонтальна складова R

    const rVector =
        line(
            cx,
            cy,
            cx + R * scale,
            cy,
            {
                stroke: "#2563eb",
                "stroke-width": 3,
                "stroke-linecap": "round"
            }
        );


    // Вертикальна складова X

    const xVector =
        line(
            cx + R * scale,
            cy,
            cx + R * scale,
            cy,
            {
                stroke: "#16a34a",
                "stroke-width": 3,
                "stroke-linecap": "round"
            }
        );


    // Допоміжна пунктирна лінія

    const horizontalProjection =
        line(
            cx,
            cy,
            cx + R * scale,
            cy,
            {
                stroke: "#aaa",
                "stroke-width": 1,
                "stroke-dasharray": "4 3"
            }
        );


    // ============================================================
    // ДУГА КУТА θ
    // ============================================================

    const angleArc =
        createElement(
            "path",
            {
                fill: "none",
                stroke: "#7c3aed",
                "stroke-width": 2,
                d: ""
            }
        );


    // ============================================================
    // ПІДПИСИ
    // ============================================================

    const rLabel =
        text(
            0,
            0,
            "R",
            {
                "font-size": 12,
                "font-weight": "bold"
            }
        );


    const xLabel =
        text(
            0,
            0,
            "X",
            {
                "font-size": 12,
                "font-weight": "bold"
            }
        );


    const zLabel =
        text(
            0,
            0,
            "Z",
            {
                "font-size": 12,
                "font-weight": "bold"
            }
        );


    const thetaLabel =
        text(
            cx + 40,
            cy - 10,
            "θ",
            {
                "font-size": 13,
                "font-weight": "bold"
            }
        );


    // ============================================================
    // ФОРМУЛА ПРАВОРУЧ
    // ============================================================

    text(
        390,
        55,
        "Z = R + iX",
        {
            "font-size": 14,
            "font-weight": "bold"
        }
    );


    text(
        390,
        80,
        "X = ωL − 1/(ωC)",
        {
            "font-size": 13
        }
    );


    text(
        390,
        105,
        "tan θ = X / R",
        {
            "font-size": 13
        }
    );


    // ============================================================
    // ФУНКЦІЯ ДЛЯ ДУГИ
    // ============================================================

    function createArc(
        centerX,
        centerY,
        radius,
        angle
    ) {

        const startX =
            centerX + radius;

        const startY =
            centerY;

        const endX =
            centerX +
            radius * Math.cos(angle);

        const endY =
            centerY -
            radius * Math.sin(angle);

        const largeArc =
            Math.abs(angle) > Math.PI
                ? 1
                : 0;

        const sweep =
            angle >= 0
                ? 0
                : 1;

        return `
            M ${startX} ${startY}
            A ${radius} ${radius}
              0 ${largeArc} ${sweep}
              ${endX} ${endY}
        `;
    }


    // ============================================================
    // ОНОВЛЕННЯ
    // ============================================================

    function update() {

        // --------------------------------------------------------
        // Кут у градусах
        // --------------------------------------------------------

        const thetaDegrees =
            parseFloat(slider.value);


        // Переведення у радіани

        const theta =
            thetaDegrees *
            Math.PI / 180;


        // --------------------------------------------------------
        // Реактивний опір
        // --------------------------------------------------------

        /*
            tan θ = X / R

            X = ωL - 1/(ωC)

            Для демонстрації зв'язку
            між кутом та реактивною складовою
            визначаємо X через θ.
        */

        const X =
            R * Math.tan(theta);


        // --------------------------------------------------------
        // Імпеданс
        // --------------------------------------------------------

        const Z =
            Math.sqrt(
                R * R +
                X * X
            );


        // --------------------------------------------------------
        // Координати кінця Z
        // --------------------------------------------------------

        const endX =
            cx + R * scale;

        const endY =
            cy - X * scale;


        // --------------------------------------------------------
        // Вектор Z
        // --------------------------------------------------------

        zVector.setAttribute(
            "x2",
            endX
        );

        zVector.setAttribute(
            "y2",
            endY
        );


        zPoint.setAttribute(
            "cx",
            endX
        );

        zPoint.setAttribute(
            "cy",
            endY
        );


        // --------------------------------------------------------
        // Вектор R
        // --------------------------------------------------------

        rVector.setAttribute(
            "x2",
            endX
        );

        rVector.setAttribute(
            "y2",
            cy
        );


        // --------------------------------------------------------
        // Вектор X
        // --------------------------------------------------------

        xVector.setAttribute(
            "x1",
            endX
        );

        xVector.setAttribute(
            "y1",
            cy
        );

        xVector.setAttribute(
            "x2",
            endX
        );

        xVector.setAttribute(
            "y2",
            endY
        );


        // --------------------------------------------------------
        // Пунктирна горизонталь
        // --------------------------------------------------------

        horizontalProjection.setAttribute(
            "x2",
            endX
        );

        horizontalProjection.setAttribute(
            "y2",
            cy
        );


        // --------------------------------------------------------
        // Дуга θ
        // --------------------------------------------------------

        angleArc.setAttribute(
            "d",
            createArc(
                cx,
                cy,
                35,
                theta
            )
        );


        // --------------------------------------------------------
        // Підписи
        // --------------------------------------------------------

        rLabel.setAttribute(
            "x",
            cx + 10+R * scale / 2
        );

        rLabel.setAttribute(
            "y",
            cy + 16
        );


        xLabel.setAttribute(
            "x",
            endX + 8
        );

        xLabel.setAttribute(
            "y",
            (cy + endY) / 2
        );


        zLabel.setAttribute(
            "x",
            (cx + 25 + endX) / 2 + 5
        );

        zLabel.setAttribute(
            "y",
            (cy + endY) / 2 - 7
        );


        thetaLabel.setAttribute(
            "x",
            cx + 40
        );

        thetaLabel.setAttribute(
            "y",
            theta >= 0
                ? cy - 15
                : cy + 20
        );


        // --------------------------------------------------------
        // Числові значення
        // --------------------------------------------------------

        thetaValue.textContent =
            `${thetaDegrees.toFixed(1)}°`;


        reactanceValue.textContent =
            `X = ωL − 1/(ωC) = ${X.toFixed(2)} Ω`;


        tanValue.textContent =
            `tan θ = X/R = ${X.toFixed(4)}`;


        impedanceValue.textContent =
            `|Z| = √(R² + X²) = ${Z.toFixed(2)} Ω`;
    }


    // ============================================================
    // БІГУНОК
    // ============================================================

    slider.addEventListener(
        "input",
        update
    );


    // Початкове значення

    update();

})();