window.addEventListener("load", () => {

    const canvas =
        document.getElementById("transientScheme");

    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    // контур

    ctx.beginPath();

    ctx.moveTo(80,126);
    ctx.lineTo(80,70);

    ctx.lineTo(140,70);
    ctx.lineTo(360,70);

    ctx.lineTo(420,70);
    ctx.lineTo(420,150);

    ctx.stroke();

    // генератор

    ctx.beginPath();
    ctx.arc(80,150,25,0,2*Math.PI);
    ctx.stroke();
    ctx.font = "20px Arial";
    ctx.fillText("G",72,157);

    // резистор

    ctx.beginPath();

    ctx.moveTo(270,70);

    ctx.lineTo(280,60);
    ctx.lineTo(290,80);

    ctx.lineTo(300,60);
    ctx.lineTo(310,80);

    ctx.lineTo(320,60);
    ctx.lineTo(330,80);

    ctx.lineTo(340,70);

    ctx.stroke();

    ctx.fillText("R",300,50);

    // діод

    ctx.beginPath();

    ctx.moveTo(160,50);
    ctx.lineTo(160,90);
    ctx.lineTo(190,70);
    ctx.closePath();

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(190,50);
    ctx.lineTo(190,90);

    ctx.stroke();

    ctx.fillText("D",175,40);

    // замикання кола

    ctx.beginPath();

    ctx.moveTo(420,150);
    ctx.lineTo(420,230);

    ctx.lineTo(80,230);
    ctx.lineTo(80,175);

    ctx.stroke();

});