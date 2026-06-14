function displaySvg(){
    const div = document.getElementById("svg-container");

    const svgNode = div.firstElementChild;
    if(svgNode.style.display === "none")
        svgNode.style.display = "inline-block";

    const listNode = div.lastElementChild;
    if(listNode.style.display === "block")
        listNode.style.display = "none";
}
function displayUl(){
    const div = document.getElementById("svg-container");
    
    const svgNode = div.firstElementChild;
    if(svgNode.style.display !== "none")
        svgNode.style.display = "none";

    const listNode = div.lastElementChild;
    if(listNode.style.display === "none")
        listNode.style.display = "block";
}
function noDisplay(){
    const div = document.getElementById("svg-container");
    
    const svgNode = div.firstElementChild;
    if(svgNode.style.display !== "none")
        svgNode.style.display = "none";

    const listNode = div.lastElementChild;
    if(listNode.style.display !== "none")
        listNode.style.display = "none";
}
//-----------------------------------------------------------------------
function s_text(){
    displaySvg();
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"100\" y=\"30\">Текст</text>"
}

function s_text_an(){
    displaySvg();
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"100\" y=\"30\" text-anchor=\"end\" >Текст</text>"
	}

function s_line(){
    displaySvg();
    const svg = document.getElementById("svgC");
	svg.innerHTML = "<line x1=\"10\" y1=\"15\" x2=\"220\" y2=\"100\" stroke=\"black\" />"
}

function s_line_st(){
    displaySvg();
    const svg = document.getElementById("svgC");
	svg.innerHTML = "<line x1=\"10\" y1=\"15\" x2=\"220\" y2=\"100\" stroke=\"black\" stroke-width=\"2\" />"
}

function s_rect(){
    displaySvg();
    const svg = document.getElementById("svgC");
	svg.innerHTML = "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" />"
}

function s_rect_f(){
    displaySvg();
    const svg = document.getElementById("svgC");
	svg.innerHTML = "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" fill=\"#2980b9\" />"
}

function s_rect_s(){
    displaySvg();
    const svg = document.getElementById("svgC");
	svg.innerHTML = "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" fill=\"none\" stroke=\"#2980b9\"/>"
}

function s_rect_r(){
    displaySvg();
    const svg = document.getElementById("svgC");
	svg.innerHTML = "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" fill=\"none\" stroke=\"#2980b9\" rx=\"20\" ry=\"20\"/>"
}

function circle(){
    displaySvg();
    const svg = document.getElementById("svgC");
	svg.innerHTML = "<circle cx=\"100\" cy=\"80\" r=\"50\" />"
}

function ellips(){
    displaySvg();
    const svg = document.getElementById("svgC");
	svg.innerHTML = "<ellipse cx=\"100\" cy=\"80\" rx=\"60\" ry=\"30\" fill=\"#55efc4\" stroke=\"#00b894\" />"
}

function s_path(){
    displaySvg();
    const svg = document.getElementById("svgC");
	svg.innerHTML = "<path d=\"M20 80 C 90 150, 105 150, 160 80 S 230 10, 300 80\" fill=\"none\" stroke=\"navy\" stroke-width=\"3\"  />"
}

function s_group(){
    displaySvg();
		const svg = document.getElementById("svgC");
		svg.innerHTML = "<svg><g>"
        +"<text x=\"10\" y=\"15\">Прямокутник</text>"
        +"<rect x=\"10\" y=\"20\" width=\"110\" height=\"80\" fill=\"#16a085\" />"
        +"</g></svg>"
}

function s_tr_tr(){
    displaySvg();
    const svg = document.getElementById("svgC");
	svg.innerHTML = "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" />"+
    "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" transform=\"translate(15)\" fill=\"none\" stroke=\"red\"/>"
}

function s_tr_sc(){
    displaySvg();
    const svg = document.getElementById("svgC");
    svg.innerHTML = "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" />"+
    "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" transform=\"scale(1.5)\" fill=\"none\" stroke=\"red\"/>"
}

function s_tr_r(){
    displaySvg();
    const svg = document.getElementById("svgC");
    svg.innerHTML = "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" />"+
    "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" transform=\"rotate(10)\" fill=\"none\" stroke=\"red\"/>"
}

function s_tr_sx(){
    displaySvg();
    const svg = document.getElementById("svgC");
    svg.innerHTML = "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" />"+
    "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" transform=\"skewX(10)\" fill=\"none\" stroke=\"red\"/>"
}

function s_tr_sy(){
    displaySvg();
    const svg = document.getElementById("svgC");
    svg.innerHTML = "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" />"+
    "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" transform=\"skewY(10)\" fill=\"none\" stroke=\"red\"/>"
}

function s_tr_m(){
    displaySvg();
    const svg = document.getElementById("svgC");
    svg.innerHTML = "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" />"+
    "<rect x=\"15\" y=\"10\" width=\"120\" height=\"60\" transform=\"matrix(.3 0 0 .95 55 25)\" fill=\"none\" stroke=\"red\"/>"
}

function s_poly(){
    displaySvg();
    const svg = document.getElementById("svgC");
    svg.innerHTML = "<polygon "
    +"points=\"70,5 90,41 136,48 103,80 111,126 70,105 29,126 36,80 5,48 48,41\" "
    +"fill=\"turquoise\" stroke=\"lightseagreen\" stroke-width=\"5\" />"
}

function s_polyline(){
    displaySvg();
    const svg = document.getElementById("svgC");
    svg.innerHTML = "<polyline "
    +"points=\"5,85 30,5 55,85 80,5, 105,85\" "
    +"fill=\"none\" stroke=\"orangered\" stroke-width=\"5\" />"
}

function s_attr(){
    noDisplay();
    d3.select("img").attr("draggable", "true");
}

function s_style(){
    noDisplay();
    d3.select("dfn").style("color", "blue");
}

function s_text(){
    noDisplay();
    const text = d3.select("cite").text();
    const svg = document.getElementById("svgC");
    svg.innerHTML = "<text x=\"5\" y=\"30\">"+text+"</text>"
    d3.select("cite").text("ось так");
}

function s_html(){
    displaySvg();
    const text = d3.select("cite").html();
    const svg = document.getElementById("svgC");
    svg.innerHTML = "<text x=\"5\" y=\"30\">"+text+"</text>"
}

function s_append(){
    noDisplay();
    d3.select("body").append("h2").text("Приклад використання оператора append()");
}

function s_insert(){
    noDisplay();
    d3.select("table").insert("h2", "table").text("Приклад використання оператора insert()");
}

function s_remove(){
    noDisplay();
    d3.select("cite").remove();
}

function s_data(){
    displayUl();
    const langs = ["JavaScript", "TypeScript", "Python", "Dart"];
    d3.select("ul").selectAll("li").data(langs).join("li").text(item=>item);
}

function s_dataDia(){
    displaySvg();
    // Данные рейтинга языков программирования TIOBE за март 2025
    const data = [
        {id:1, lang: "Python", rate: 23.85}, 
        {id:2, lang: "C++", rate: 11.08}, 
        {id:3, lang: "Java", rate: 10.36}, 
        {id:4, lang: "JavaScript", rate: 3.46}, 
        {id:5, lang: "Go", rate: 2.78}, 
    ]
 
    const barHeight = 18;
    d3.select("svg")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("y", d => d.id * (barHeight + 10) - (barHeight + 10))
      .attr("width", d => d.rate * 8)
      .attr("height", barHeight)
      .attr("fill", "steelblue");
 
    d3.select("svg")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("y", d => d.id * (barHeight + 10) - (barHeight + 10)/2 )
      .attr("x", d => d.rate * 8 + 10)
      .text(d => `${d.lang} (${d.rate}%)`);
}

function s_d_min(){
    displaySvg();
    const data = [3, 8, 21, 13, 1, 2, 5];
    const result = d3.min(data);
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"50\" y=\"30\">"+data+"</text>"
   + "<text x=\"10\" y=\"50\">Мінімальне значення: "+result+"</text>";
}

function s_d_max(){
    displaySvg();
    const data = [3, 8, 21, 13, 1, 2, 5];
    const result = d3.max(data);
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"50\" y=\"30\">"+data+"</text>"
   + "<text x=\"10\" y=\"50\">Максимальне значення: "+result+"</text>";
}

function s_d_extent(){
    displaySvg();
    const data = [3, 8, 21, 13, 1, 2, 5];
    const result = d3.extent(data);
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"50\" y=\"30\">"+data+"</text>"
   + "<text x=\"10\" y=\"50\">Макс. і мін. значення: "+result+"</text>";
}

function s_d_sum(){
    displaySvg();
    const data = [3, 8, 21, 13, 1, 2, 5];
    const result = d3.sum(data);
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"50\" y=\"30\">"+data+"</text>"
   + "<text x=\"10\" y=\"50\">Сума всіх елементів: "+result+"</text>";
}

function s_d_median(){
    displaySvg();
    const data = [3, 8, 21, 13, 1, 2, 5];
    const result = d3.median(data);
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"50\" y=\"30\">"+data+"</text>"
   + "<text x=\"10\" y=\"50\">Медіана масиву: "+result+"</text>";
}
function s_d_mean(){
    displaySvg();
    const data = [3, 8, 21, 13, 1, 2, 5];
    const result = d3.mean(data);
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"50\" y=\"30\">"+data+"</text>"
   + "<text x=\"10\" y=\"50\">Середнє значення: "+result+"</text>";
}

function s_d_asc(){
    displaySvg();
    const data = [3, 8, 21, 13, 1, 2, 5];
    const result = data.sort(d3.ascending);
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"50\" y=\"30\">"+data+"</text>"
   + "<text x=\"10\" y=\"50\">Сортування за зростанням: "+result+"</text>";
}

function s_d_quant(){
    displaySvg();
    const data = [3, 8, 21, 13, 1, 2, 5];
    const result = d3.quantile(data.sort(d3.ascending), 0.25);
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"50\" y=\"30\">"+data+"</text>"
   + "<text x=\"10\" y=\"50\">Квантиль елементів масиву: "+result+"</text>";
}

function s_d_bis(){
    displaySvg();
    const data = [3, 8, 21, 13, 1, 2, 5];
    const result = d3.bisect(data.sort(d3.ascending), 11);
	const svg = document.getElementById("svgC");
	svg.innerHTML = "<text x=\"50\" y=\"30\">"+data+"</text>"
   + "<text x=\"10\" y=\"50\">d3.bisect: "+result+"</text>";
}

function d_load(){
    displayUl();
    
    d3.csv("script/data.csv")
        .then(function(data) {
            const div = document.getElementById("svg-container");
            const ul = div.lastElementChild;
            ul.innerHTML = "";
            data.forEach(function(item) {
                const li = document.createElement("li");
                li.textContent = item.name + " (" + item.age + " років)";
                ul.appendChild(li);
            });
        })
        .catch(function(error) {
            displaySvg();
            const svg = document.getElementById("svgC");
	        svg.innerHTML = "<text x=\"5\" y=\"30\">Помилка читання CSV:</text><text x=\"5\" y=\"50\">"+error+"</text>";
        });
}
