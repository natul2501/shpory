window.addEventListener("load", () => {

    const canvas =
        document.getElementById(
            "schottkyCanvas"
        );

    const ctx =
        canvas.getContext("2d");

    // =====================================
    // Допоміжна функція стрілки
    // =====================================

    function arrowr(
        x1, y1,
        x2, y2,
        color = "#000"

    ) {

        const head = 7;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 5;

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

        ctx.moveTo(x2+5, y2);

        ctx.lineTo(
            x2 - head *
            Math.cos(a - Math.PI / 9),
            y2 - head *
            Math.sin(a - Math.PI / 2)
        );

        ctx.lineTo(
            x2 - head *
            Math.cos(a + Math.PI / 9),
            y2 - head *
            Math.sin(a + Math.PI / 2)
        );

        ctx.closePath();
        ctx.fill();
    }

    function arrowl(
        x1, y1,
        x2, y2,
        color = "#000"

    ) {

        const head = 7;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 5;

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

        ctx.moveTo(x2-5, y2);

        ctx.lineTo(
            x2 - head *
            Math.cos(a - Math.PI / 9),
            y2 - head *
            Math.sin(a - Math.PI / 2)
        );

        ctx.lineTo(
            x2 - head *
            Math.cos(a + Math.PI / 9),
            y2 - head *
            Math.sin(a + Math.PI / 2)
        );

        ctx.closePath();
        ctx.fill();
    }

    // =====================================
    // Малювання одного контакту
    // =====================================

    function drawContact(
        x,
        y,
        title,
        semiType,
        barrier,
        carrierDirection
    ) {

        const w = 140;
        const h = 110;

        // -------------------------
        // Заголовок
        // -------------------------

        ctx.fillStyle = "#000";
        ctx.font = "12px Arial";

        ctx.fillText(
            title,
            x + 5,
            y - 10
        );

        // -------------------------
        // Метал
        // -------------------------

        ctx.fillStyle = "#dddddd";

        ctx.fillRect(
            x,
            y,
            55,
            h
        );

        // -------------------------
        // Напівпровідник
        // -------------------------

        ctx.fillStyle =
            semiType === "n"
                ? "#dfefff"
                : "#ffe6e6";

        ctx.fillRect(
            x + 55,
            y,
            85,
            h
        );

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;

        ctx.strokeRect(
            x,
            y,
            55,
            h
        );

        ctx.strokeRect(
            x + 55,
            y,
            85,
            h
        );

        // -------------------------
        // Підписи
        // -------------------------

        ctx.fillStyle = "#000";

        ctx.fillText(
            "Me",
            x + 18,
            y + h + 15
        );

        ctx.fillText(
            semiType,
            x + 92,
            y + h + 15
        );

        // -------------------------
        // Електрони в металі
        // -------------------------

        ctx.fillStyle = "#0033cc";

        for(let yy=y+18; yy<y+95; yy+=18)
        {
            for(let xx=x+8; xx<x+48; xx+=15)
            {
                ctx.fillText(
                    "e⁻",
                    xx,
                    yy
                );
            }
        }

        // -------------------------
        // Носії в п/п
        // -------------------------

        if(semiType==="n")
        {
            if(barrier){
                ctx.fillStyle="#cc0000";

                for(let yy=y+25; yy<y+95; yy+=28)
                {
                    for(let xx=x+68; xx<x+80; xx+=28)
                    {
                        ctx.fillText(
                            "+",
                            xx,
                            yy
                        );
                    }
                }

                ctx.fillStyle="#0033cc";

                for(let yy=y+25; yy<y+95; yy+=28)
                {
                    for(let xx=x+105; xx<x+130; xx+=28)
                    {
                        ctx.fillText(
                            "e⁻",
                            xx,
                            yy
                        );
                    }
                }
            }
            else {
                ctx.fillStyle="#0033cc";

                for(let yy=y+25; yy<y+95; yy+=28)
                {
                    for(let xx=x+75; xx<x+130; xx+=28)
                    {
                        ctx.fillText(
                            "e⁻",
                            xx,
                            yy
                        );
                    }
                }
            }
        }
        else
        {
            if(barrier){
                ctx.fillStyle="#0033cc";

                for(let yy=y+25; yy<y+95; yy+=28)
                {
                    for(let xx=x+68; xx<x+80; xx+=28)
                    {
                        ctx.fillText(
                            "e⁻",
                            xx,
                            yy
                        );
                    }
                }

                ctx.fillStyle="#cc0000";

                for(let yy=y+25; yy<y+95; yy+=28)
                {
                    for(let xx=x+105; xx<x+130; xx+=28)
                    {
                        ctx.fillText(
                            "+",
                            xx,
                            yy
                        );
                    }
                }
            }
             else {
                ctx.fillStyle="#cc0000";

                for(let yy=y+25; yy<y+95; yy+=28)
                {
                    for(let xx=x+78; xx<x+128; xx+=28)
                    {
                        ctx.fillText(
                            "+",
                            xx,
                            yy
                        );
                    }
                }
            }
        }

        // -------------------------
        // Бар'єр
        // -------------------------

        if(barrier)
        {
            ctx.setLineDash([5,4]);

            ctx.strokeStyle="#000";

            ctx.beginPath();

            ctx.moveTo(
                x+90,
                y+5
            );

            ctx.lineTo(
                x+90,
                y+h-5
            );

            ctx.stroke();

            ctx.setLineDash([]);
        }

        // -------------------------
        // Напрям носіїв
        // -------------------------

        if(carrierDirection==="toSemi")
        {
            arrowr(
                x+40,
                y+h/2+5,
                x+90,
                y+h/2+5,
                "#008800"
            );
        }
        else
        {
            arrowl(
                x+105,
                y+h/2+5,
                x+30,
                y+h/2+5,
                "#008800"
            );
        }
    }

    // =====================================
    // 1
    // n-тип
    // омічний
    // =====================================

    drawContact(
        10,
        60,
        "n-type,               Am < As",
        "n",
        false,
        "toSemi"
    );

    // =====================================
    // 2
    // n-тип
    // Шотткі
    // =====================================

    drawContact(
        170,
        60,
        "n-type,               Am > As",
        "n",
        true,
        "toMetal"
    );

    // =====================================
    // 3
    // p-тип
    // омічний
    // =====================================

    drawContact(
        330,
        60,
        "p-type,               Am > As",
        "p",
        false,
        "toSemi"
    );

    // =====================================
    // 4
    // p-тип
    // Шотткі
    // =====================================

    drawContact(
        490,
        60,
        "p-type,               Am < As",
        "p",
        true,
        "toMetal"
    );

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Омічний", 50, 30);
    ctx.fillText("Шоттки", 220, 30);
    ctx.fillText("Омічний", 370, 30);
    ctx.fillText("Шоттки", 540, 30);

});