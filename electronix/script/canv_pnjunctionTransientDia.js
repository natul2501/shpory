window.addEventListener("load", () => {

const canvas =
document.getElementById("transientGraphs");

const ctx =
canvas.getContext("2d");

ctx.font = "16px Arial";
ctx.lineWidth = 2;

function arrow(x1,y1,x2,y2){

    ctx.beginPath();

    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);

    ctx.stroke();
}

const left = 60;
const right = 760;

const t1 = 180;
const t2 = 420;

ctx.beginPath();
ctx.setLineDash([14,8]);
ctx.strokeStyle = "#b6b5b5";
ctx.lineWidth = 1;

ctx.moveTo(180,100);
ctx.lineTo(180,415);

ctx.moveTo(250,200);
ctx.lineTo(250,360);

ctx.moveTo(420,140);
ctx.lineTo(420,375);

ctx.moveTo(490,260);
ctx.lineTo(490,400);

ctx.moveTo(540,260);
ctx.lineTo(540,460);

ctx.stroke();

//
// 1. Coordinats Uпр/Uзв  ---------------------------
//
ctx.beginPath();
ctx.strokeStyle = "#b6b5b5";
ctx.lineWidth = 2;
ctx.setLineDash([5,5,5]);
ctx.moveTo(left-5,40);
ctx.lineTo(200,40);
ctx.fillText("Udir",25,45);
ctx.moveTo(left-5,140);
ctx.lineTo(420,140);
ctx.fillText("Urev",20,145);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = "black";
ctx.setLineDash([15,0]);

ctx.moveTo(left,100);
ctx.lineTo(590,100);

ctx.moveTo(590,100);
ctx.lineTo(570,100+5);
ctx.lineTo(570,100-5);
ctx.closePath();
ctx.fill();

ctx.moveTo(left,10);
ctx.lineTo(left,150);

ctx.moveTo(left,10);
ctx.lineTo(left-5,30);
ctx.lineTo(left+5,30);
ctx.closePath();
ctx.fill();

ctx.stroke();

ctx.fillText("U",35,25);
ctx.fillText("t",570,90);

//
// Impuls Uпр/Uзв
//
ctx.beginPath();
ctx.lineWidth = 4;

ctx.moveTo(left,100);

ctx.lineTo(t1,100);
ctx.lineTo(t1,40);

ctx.lineTo(t2,40);
ctx.lineTo(t2,140);

ctx.lineTo(570,140);

ctx.stroke();

//
// 2. Coordinats Iд ------------------------------------
//

ctx.beginPath();
ctx.strokeStyle = "#b6b5b5";
ctx.setLineDash([5,5,5]);
ctx.lineWidth = 2;
ctx.moveTo(left-5,200);
ctx.lineTo(280,200);
ctx.fillText("Idir",32,205);
ctx.moveTo(left-5,270);
ctx.lineTo(520,270);
ctx.fillText("Irev",25,270);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = "black";
ctx.setLineDash([15,0]);

ctx.moveTo(left,260);
ctx.lineTo(590,260);

ctx.moveTo(590,260);
ctx.lineTo(570,260+5);
ctx.lineTo(570,260-5);
ctx.closePath();
ctx.fill();

ctx.moveTo(left,170);
ctx.lineTo(left,310);

ctx.moveTo(left,170);
ctx.lineTo(left-5,190);
ctx.lineTo(left+5,190);
ctx.closePath();
ctx.fill();

ctx.stroke();

ctx.fillText("Id",35,180);
ctx.fillText("t",570,250);

//
// Pulse Iд
//

ctx.beginPath();
ctx.lineWidth = 4;

ctx.moveTo(left,260);

ctx.lineTo(180,260);

ctx.quadraticCurveTo(
220,
200,
260,
200
);

ctx.lineTo(t2,200);

ctx.lineTo(t2,300);

ctx.lineTo(490,300);

ctx.bezierCurveTo(
495,
300,
510,
270,
540,
270
);

ctx.lineTo(570,270);

ctx.stroke();

//
// tau_уст
//

ctx.beginPath();
ctx.lineWidth = 2;

ctx.moveTo(180,310);
ctx.lineTo(250,310);

ctx.moveTo(180,310);
ctx.lineTo(190,306);
ctx.moveTo(180,310);
ctx.lineTo(190,314);

ctx.moveTo(250,310);
ctx.lineTo(240,306);
ctx.moveTo(250,310);
ctx.lineTo(240,314);

ctx.stroke();

ctx.fillText(
"τуст",
200,
305
);

//
// tau_розс
//

ctx.beginPath();

ctx.moveTo(400,310);
ctx.lineTo(510,310);

ctx.moveTo(420,310);
ctx.lineTo(410,306);
ctx.moveTo(420,310);
ctx.lineTo(410,314);

ctx.moveTo(490,310);
ctx.lineTo(500,306);
ctx.moveTo(490,310);
ctx.lineTo(500,314);

ctx.stroke();

ctx.fillText(
"τрозс",
435,
324
);

//
// tau_від
//

ctx.beginPath();

ctx.moveTo(420,335);
ctx.lineTo(540,335);

ctx.moveTo(420,335);
ctx.lineTo(430,331);
ctx.moveTo(420,335);
ctx.lineTo(430,339);

ctx.moveTo(540,335);
ctx.lineTo(530,331);
ctx.moveTo(540,335);
ctx.lineTo(530,339);

ctx.stroke();

ctx.fillText(
"τвід",
500,
330
);

//
// 2. Coordinats Uпер
//
ctx.beginPath();
ctx.strokeStyle = "#b6b5b5";
ctx.setLineDash([5,5,5]);
ctx.moveTo(left-5,360);
ctx.lineTo(280,360);
ctx.fillText("Udir",25,360);
ctx.moveTo(left-5,460);
ctx.lineTo(540,460);
ctx.fillText("Urev",20,460);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = "black";
ctx.setLineDash([15,0]);

ctx.moveTo(left,410);
ctx.lineTo(590,410);

ctx.moveTo(590,410);
ctx.lineTo(570,410+5);
ctx.lineTo(570,410-5);
ctx.closePath();
ctx.fill();

ctx.moveTo(left,340);
ctx.lineTo(left,480);

ctx.moveTo(left,325);
ctx.lineTo(left-5,345);
ctx.lineTo(left+5,345);
ctx.closePath();
ctx.fill();

ctx.stroke();

ctx.fillText("Ud",35,330);
ctx.fillText("t",570,400);

//
// 3. Pulse Uпер
//

ctx.beginPath();
ctx.lineWidth = 4;

ctx.moveTo(left,410);

ctx.lineTo(180,410);

ctx.quadraticCurveTo(
210,
360,
260,
360
);

ctx.lineTo(t2,360);

ctx.quadraticCurveTo(
420,
405,
490,
410
);

ctx.lineTo(490,410);

ctx.quadraticCurveTo(
490,
455,
560,
460
);

ctx.lineTo(570,460);

ctx.stroke();


});