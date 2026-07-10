document.addEventListener("DOMContentLoaded", () => {

    renderMath();

    document.addEventListener("copy", handleCopy);

});

function renderMath() {

    document.querySelectorAll(".math").forEach(element => {

        const latex = element.textContent.trim();

        element.dataset.latex = latex;

        katex.render(
            latex,
            element,
            {
                throwOnError: false
            }
        );

    });

    document.querySelectorAll(".math-display").forEach(element => {

        const latex = element.textContent.trim();

        element.dataset.latex = latex;

        katex.render(
            latex,
            element,
            {
                displayMode: true,
                throwOnError: false
            }
        );

    });

}

function latexToText(latex) {
    return parseLatex(latex);
}

// ------------- Основний парсер -------
function parseLatex(input) {
    let i = 0;

    function parseExpression(stopChar = null) {
    let result = "";

    while (i < input.length) {

        const char = input[i];

        // зупинка тільки якщо явно вказано
        if (stopChar && char === stopChar) {
            break;
        }

        // frac
        if (input.slice(i, i + 5) === "\\frac") {
            i += 5;
            result += parseFrac();
            continue;
        }

        // sqrt
        if (input.slice(i, i + 5) === "\\sqrt") {
            i += 5;
            result += parseSqrt();
            continue;
        }

        // vec
        if (input.slice(i, i + 4) === "\\vec") {
            i += 4;
            const content = parseGroup();
            result += content + "⃗";
            continue;
        }

        // LaTeX command at expression level
        if (input[i] === "\\") {
            let cmd = "\\";

            i++;

            while (
                i < input.length &&
                /[a-zA-Z]/.test(input[i])
            ) {
                cmd += input[i++];
            }

            result += parseGreek(cmd);
            continue;
        }

        // subscript _
        if (input[i] === "_") {
            i++;

            let sub = "";

            if (input[i] === "{") {
                i++;
                while (i < input.length && input[i] !== "}") {
                    sub += input[i++];
                }
                i++; // }
            } else {
                while (i < input.length && /[a-zA-Z0-9]/.test(input[i])) {
                    sub += input[i++];
                }
            }

            result += "_" + sub;
            continue;
        }

        result += char;
        i++;
    }

    return result;
}
// ------------- Обробка дробу -------    
    function parseFrac() {
        skipSpaces();

        const numerator = parseGroup();
        skipSpaces();
        const denominator = parseGroup();

        return `(${numerator})/(${denominator})`;
    }
// ------------- Корені (включно з √[n]{...}) -------  
    function parseSqrt() {
        skipSpaces();

        let index = "";

        // перевірка √[n]
        if (input[i] === "[") {
            i++;
            while (i < input.length && input[i] !== "]") {
                index += input[i++];
            }
            i++; // ]
        }

        const content = parseGroup();

        if (index) {
            return `√${index}(${content})`;
        }

        return `√(${content})`;
    }
// ------------- Групи { ... } ------- 
    function parseGroup() {
        skipSpaces();

        // 1. Група { ... }
        if (input[i] === "{") {
            i++; // skip '{'
            const value = parseExpression("}");
            i++; // skip '}'
            return stripBraces(parseGreek(value));
        }

        // 2. LaTeX команда \lambda, \frac, \sqrt, \psi ...
        if (input[i] === "\\") {
            let cmd = "\\";

            i++; // skip '\'

            while (
                i < input.length &&
                /[a-zA-Z]/.test(input[i])
            ) {
                cmd += input[i++];
            }

            return stripBraces(parseGreek(cmd));
        }

        // 3. Звичайний текст / символи
        let token = "";

        while (
            i < input.length &&
            ![" ", "{", "}", "\\"].includes(input[i])
        ) {
            token += input[i++];
        }

        return stripBraces(parseGreek(token));
    }
// ------------- Грецькі літери -------
function parseGreek(token) {
    return token
        .replace(/\\psi/g, "ψ")
        .replace(/\\omega/g, "ω")
        .replace(/\\lambda/g, "λ")
        .replace(/\\pi/g, "π")
        .replace(/\\hbar/g, "ℏ");
}
// ------------- Допоміжне ------- 
    function skipSpaces() {
        while (input[i] === " ") i++;
    }
    function stripBraces(text) {
        return text.replace(/[{}]/g, "");
    }

    return parseExpression();
}

function buildClipboardText(node) {

    let result = "";

    for (const child of node.childNodes) {

        // Текстовий вузол
        if (child.nodeType === Node.TEXT_NODE) {

            result += child.textContent.replace(/\s+/g, " ");

            continue;

        }

        // Не HTML-елемент
        if (child.nodeType !== Node.ELEMENT_NODE) {
            continue;
        }

        const tag = child.tagName.toLowerCase();

        if (
            tag === "annotation" &&
            child.getAttribute("encoding") === "application/x-tex"
        ) {

            result += latexToText(
                child.textContent.trim()
            );

            continue;
        }

        // Inline-формула
        if (child.classList.contains("math")) {

            result += latexToText(
                child.dataset.latex || ""
            );

            continue;

        }

        // Блокова формула
        if (child.classList.contains("math-display")) {

            result += "\n" +
                latexToText(
                    child.dataset.latex || ""
                ) + "\n";

            continue;

        }

        // <br>
        if (tag === "br") {

            result += "\n";

            continue;

        }

        // <ul>
        if (tag === "ul") {

            result +=
                buildClipboardText(child).trim() +
                "\n";

            continue;

        }

        // <li>
        if (tag === "li") {

            result += "• " +
                buildClipboardText(child).trim() +
                "\n";

            continue;

        }

        // <p>
        if (tag === "p") {

            result += 
                buildClipboardText(child).trim() +
                "\n";

            continue;

        }

        // <h1> ... <h6>
        if (/^h[1-6]$/.test(tag)) {

            result +=
                buildClipboardText(child).trim() +
                "\n";

            continue;

        }

        if (
            child.classList.contains("math-display") ||
            child.classList.contains("katex-display")
        ) {
            result +=
                "\n" +
                buildClipboardText(child).trim() +
                "\n";

            continue;
        }

        // Інші елементи
        result += buildClipboardText(child);

    }

    return result;

}

function normalizeClipboardText(text) {

    return text

        // прибрати пробіли перед переносами
        .replace(/[ \t]+\n/g, "\n")

        // прибрати пробіли після переносів
        .replace(/\n[ \t]+/g, "\n")

        // кілька пробілів → один
        .replace(/[ \t]{2,}/g, " ")

        // більше двох переносів → два
        .replace(/\n{3,}/g, "\n\n")

        // прибрати пробіли на початку рядків
        .replace(/\n +/g, "\n")

        .trim();

}

function handleCopy(event) {
    const selection = window.getSelection();

    if (!selection.rangeCount) {
        return;
    }

    const range = selection.getRangeAt(0);

    const startMath =
        range.startContainer.parentElement?.closest(
            ".math-display, .math"
        );

    const endMath =
        range.endContainer.parentElement?.closest(
            ".math-display, .math"
        );

    // Виділення повністю всередині однієї формули
    if (
        startMath &&
        startMath === endMath &&
        startMath.dataset.latex
    ) {
        event.preventDefault();

        event.clipboardData.setData(
            "text/plain",
            latexToText(startMath.dataset.latex)
        );

        return;
    }

    // Текст + формули
    const container = document.createElement("div");

    for (let i = 0; i < selection.rangeCount; i++) {
        container.appendChild(
            selection.getRangeAt(i).cloneContents()
        );
    }

    const text = normalizeClipboardText(
        buildClipboardText(container)
    );

    event.preventDefault();

    event.clipboardData.setData(
        "text/plain",
        text
    );
}