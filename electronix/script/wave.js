document.addEventListener("DOMContentLoaded", () => {
    vektorSumm();

});

function vektorSumm(){

const svg = document.getElementById("scene");

const a1Line = document.getElementById("a1");
const a2Line = document.getElementById("a2");
const sumLine = document.getElementById("sum");
const wave = document.getElementById("wave");

const cx = 250;
const cy = 250;

const A1 = 120;
const A2 = 120;

const delta = Math.PI/3; // 60°

let t = 0;

const history = [];



    t += 0.03;

    const x1 = A1*Math.cos(t);
    const y1 = -A1*Math.sin(t);

    const x2 = A2*Math.cos(t+delta);
    const y2 = -A2*Math.sin(t+delta);

    const xs = x1+x2;
    const ys = y1+y2;

    // A1
    a1Line.setAttribute("x1",cx);
    a1Line.setAttribute("y1",cy);
    a1Line.setAttribute("x2",cx+x1);
    a1Line.setAttribute("y2",cy+y1);

    // A2
    a2Line.setAttribute("x1",cx);
    a2Line.setAttribute("y1",cy);
    a2Line.setAttribute("x2",cx+x2);
    a2Line.setAttribute("y2",cy+y2);

    // сума
    sumLine.setAttribute("x1",cx);
    sumLine.setAttribute("y1",cy);
    sumLine.setAttribute("x2",cx+xs);
    sumLine.setAttribute("y2",cy+ys);

    // записуємо проєкцію
    history.push(xs);

    if(history.length > 450){
        history.shift();
    }

    let d = "";

    for(let i=0;i<history.length;i++){

        const gx = 520 + i;

        const gy = 250 - history[i];

        if(i===0)
            d += `M ${gx} ${gy}`;
        else
            d += ` L ${gx} ${gy}`;
    }

    wave.setAttribute("d",d);

    requestAnimationFrame(update);
}