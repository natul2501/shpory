window.addEventListener("load", () => {

    const svg = document.getElementById("lissajous");
    const slider = document.getElementById("phaseSlider");
    const phaseText = document.getElementById("phaseValue");

    const W = 600;
    const H = 600;

    const CX = W / 2;
    const CY = H / 2;

    const A = 220;

    function draw() {

        const phaseDeg = Number(slider.value);

        phaseText.textContent = phaseDeg + "°";

        const phase =
            phaseDeg * Math.PI / 180;

        let path = "";

        const N = 1500;

        for(let i=0;i<=N;i++){

            const t =
                2*Math.PI*i/N;

            const x =
                CX + A*Math.cos(t);

            const y =
                CY - A*Math.cos(t + phase);

            if(i===0){
                path += `M ${x} ${y}`;
            }
            else{
                path += ` L ${x} ${y}`;
            }
        }

        svg.innerHTML = `

        <line
            x1="0"
            y1="${CY}"
            x2="${W}"
            y2="${CY}"
            stroke="#dddddd"
        />

        <line
            x1="${CX}"
            y1="0"
            x2="${CX}"
            y2="${H}"
            stroke="#dddddd"
        />

        <path
            d="${path}"
            fill="none"
            stroke="red"
            stroke-width="3"
        />

        `;
    }

    slider.addEventListener("input", draw);

    draw();

});