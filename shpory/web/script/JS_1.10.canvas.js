	
	function c_basic(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.restore();
		context.strokeStyle = "black";
		context.fillStyle = "black";
		context.lineWidth = 1.0;
		context.setLineDash([]);
		context.globalAlpha = 1.0;
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 0;
		context.clearRect(0, 0, 500, 300);
		
	}
	
	function c_strokeRect(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.strokeRect (10, 10, 100, 100);
		context.restore();
	}

	function c_fillRect(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.fillRect (10, 10, 100, 100);
		context.restore();
	}

	function c_clearRect(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.fillRect (10, 10, 100, 100);
		context.clearRect(15, 15, 90, 90);
		context.restore();
	}

	function c_strokeStyle(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.strokeStyle = "#ff0000";     // устанавливаем цвет контура фигуры
		context.strokeRect (10, 10, 100, 100);
		context.restore();
	}

	function c_fillStyle(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.fillStyle = "#ee5253";     // устанавливаем цвет заполнения фигуры
		context.fillRect (10, 10, 100, 100);
		context.restore();
	}

	function c_lineWidth(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.fillStyle = "#c7ecee";     // устанавливаем цвет заполнения фигуры
		context.fillRect (10, 10, 100, 100);
		context.strokeStyle = "#22a6b3";     // устанавливаем цвет контура фигуры
		context.lineWidth = 15.5;             // устанавливаем толщину линии
		context.strokeRect (10, 10, 100, 100);
		context.restore();
	}

	function c_setLineDash(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();

		context.strokeStyle = "red";
		context.setLineDash([15,5]);
		context.strokeRect(10, 10, 100, 100);
					
		context.strokeStyle = "blue";
		context.setLineDash([2,5,6]);
		context.strokeRect(130, 10, 100, 100);
					
		context.strokeStyle = "green";
		context.setLineDash([2]);
		context.strokeRect(250, 10, 100, 100);
		context.restore();
	}

	function c_lineJoin(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();

		context.lineWidth = 20;
		context.lineJoin = "miter";
		context.strokeRect(10, 20, 100, 100);
		context.lineJoin = "bevel";
		context.strokeRect(140, 20, 100, 100);
		context.lineJoin = "round";
		context.strokeRect(270, 20, 100, 100);
		context.restore();
	}

	function c_globalAlpha(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();

		context.fillStyle = "blue";
		context.fillRect(50, 50, 100, 100);
					
		context.globalAlpha = 0.5;
		context.fillStyle = "red";
		context.fillRect(100, 100, 100, 100);
		context.restore();
	}

	function c_createPatternRepeat(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();

		const img = new Image();
		img.src = "./img/ap2.png";
		
		img.onload = function() {           
			const pattern = context.createPattern(img, "repeat");
			context.fillStyle = pattern;
			context.fillRect(10, 10, 480, 280);
			context.strokeRect(10, 10, 480, 280);
		};
		context.restore();
	}

	function c_createLinearGradient(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();

		const gradient = context.createLinearGradient(10, 30, 150, 150);
		gradient.addColorStop(0, "blue");       // от синего цвета
		gradient.addColorStop(1, "yellow");      // к белому цвету
		context.fillStyle = gradient;           // в качестве цвета заполнения устанавливаем градиент
		context.fillRect(10, 30, 150, 150);
		context.strokeRect(10, 30, 150, 150);

		const gradient2 = context.createLinearGradient(250, 30, 150, 150);
		gradient2.addColorStop(0, "blue");       // от синего цвета
		gradient2.addColorStop(0.3, "red");
		gradient2.addColorStop(1, "yellow");      // к белому цвету
		context.fillStyle = gradient2;           // в качестве цвета заполнения устанавливаем градиент
		context.fillRect(170, 30, 150, 150);
		context.strokeRect(170, 30, 150, 150);
		context.restore();
	}

	function c_createRadialGradient(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();

		const gradient = context.createRadialGradient(120,100,100,120,100,30);
		gradient.addColorStop(0, "blue");
		gradient.addColorStop(1, "white");
		context.fillStyle = gradient;
		context.fillRect(50, 30, 150, 150);
		context.strokeRect(50, 30, 150, 150);
		context.restore();
	}

	function c_beginPath(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);

		context.beginPath();
		context.moveTo(20, 100);
		context.lineTo(140, 10);
		context.lineTo(260, 100);
		context.stroke();
	}

	function c_closePath(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);

		context.beginPath();
		context.moveTo(20, 100);
		context.lineTo(140, 10);
		context.lineTo(260, 100);
		context.closePath();
		context.stroke();
	}

	function c_path(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.beginPath();

		const path1 = new Path2D();     // первый путь
		path1.moveTo(20, 100);
		path1.lineTo(140, 10);
		path1.lineTo(260, 100);
		path1.closePath();    //  закрываем путь
		context.strokeStyle = "blue";
		context.stroke(path1);
		
		const path2 = new Path2D();     // первый путь
		path2.moveTo(20, 110);
		path2.lineTo(140, 200);
		path2.lineTo(260, 110);
		path2.closePath();    //  закрываем путь
		context.strokeStyle = "red";
		context.stroke(path2);
	}

	function c_fill(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.beginPath();
		context.moveTo(20, 100);
		context.lineTo(140, 10);
		context.lineTo(260, 100);
		context.closePath();
		context.fill();
		context.stroke();
		context.restore();
	}

	function c_clip(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.beginPath();
		context.rect (10, 10, 100, 100);
		context.clip();

		context.moveTo(20, 100);
		context.lineTo(140, 10);
		context.lineTo(260, 100);
		context.closePath();
		context.stroke();
		context.restore();
	}

	function c_rect(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.beginPath();
		context.rect (10, 10, 100, 100);
		context.stroke();
		context.restore();
	}

	function c_arc(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.beginPath();
		context.moveTo(20, 90);
		context.arc(20, 90, 50, 0, Math.PI/2, false);
		context.closePath();
		context.stroke();
		context.restore();
	}

	function c_arcTo(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.beginPath();
		context.moveTo(10, 150);
		context.arcTo(10, 10, 150, 10, 140);
		context.closePath();
		context.stroke();
		context.restore();
	}

	function c_quadraticCurveTo(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.beginPath();
		context.moveTo(10, 150);
		context.quadraticCurveTo(10, 10, 150, 10);
		context.closePath();
		context.stroke();
		context.restore();
	}

	function c_bezierCurveTo(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.beginPath();
		context.moveTo(30, 100);
		context.bezierCurveTo(110, 0, 190, 200, 270, 100);
		context.closePath();
		context.stroke();
		context.restore();
	}

	function c_fillText(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.font = "30px Verdana";
		context.fillStyle = "navy";     // устанавливаем цвет текста
		context.fillText("Hello world!", 20, 50);
		context.restore();
	}

	function c_strokeText(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.font = "30px Verdana";
		context.strokeStyle = "navy";
		context.strokeText("Hello world!", 20, 50);
		context.restore();
	}

	function c_textAlign(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.beginPath();
		context.moveTo(120, 0);
		context.lineTo(120, 160);
		context.strokeStyle = "#ff0000";
		context.stroke();

		context.font = "22px Verdana";
		context.textAlign = "right";
		context.fillText("Right Text", 120, 30);
		context.textAlign = "left";
		context.fillText("Left Text", 120, 60);
		context.textAlign = "center";
		context.fillText("Center Text", 120, 90);
		context.textAlign = "start";
		context.fillText("Start Text", 120, 120);
		context.textAlign = "end";
		context.fillText("End Text", 120, 150);
		context.restore();
	}

	function c_textBaseline(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.beginPath();
		context.moveTo(10, 100);
		context.lineTo(400, 100);
		context.strokeStyle = "#ff0000";
		context.stroke();

		context.font = "22px Verdana";
		context.textAlign = "start";
		context.textBaseline="top";
		context.fillText("Top",10,100);
		context.textBaseline="bottom";
		context.fillText("Bottom",45,100);
		context.textBaseline="middle";
		context.fillText("Middle",130,100);
		context.textBaseline="alphabetic";
		context.fillText("Alphabetic",205,100);
		context.textBaseline="hanging";
		context.fillText("Hanging",320,100);
		context.restore();
	}

	function c_measureText(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.font = "14px Verdana";
		const text = context.measureText("Hello world!");
		let value = "Ширина тексту = " + text.width;
		context.fillText(value, 20, 50);
		context.restore();
	}

	function c_shadow(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.fillStyle = "#3498db";
		context.shadowOffsetX = 10;
		context.shadowOffsetY = 10;
		context.shadowBlur = 10;
		context.shadowColor = "#9999";
		context.fillRect(10, 10, 200, 200);
		context.restore();
	}

	function c_translate(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.fillStyle = "blue";
		context.fillRect(100, 50, 100, 100);
		context.globalAlpha = 0.5;
		context.fillStyle = "red";
		context.translate(50, 25);
		context.fillRect(100, 50, 100, 100);
		context.restore();
	}

	function c_rotate(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.fillStyle = "blue";
		context.fillRect(100, 50, 100, 100);
		context.globalAlpha = 0.5;
		context.fillStyle = "red";
		context.rotate(.52);    // поворот на 0.52 радиан или 30 градусов
		context.fillRect(100, 50, 100, 100);
		context.restore();
	}

	function c_scale(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.fillStyle = "blue";
		context.fillRect(100, 50, 100, 100);
		context.globalAlpha = 0.5;
		context.fillStyle = "red";
		context.scale(1.5, 1.5);
		context.fillRect(100, 50, 100, 100);
		context.restore();
	}

	function c_transform(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.fillStyle = "blue";
		context.fillRect(100, 50, 100, 100);
		context.globalAlpha = 0.5;
		context.fillStyle = "red";
		context.transform(  
			Math.cos(Math.PI/6),
			Math.sin(Math.PI/6), -1 * Math.sin(Math.PI/6), 
			Math.cos(Math.PI/6), 0, 0);
		context.fillRect(100, 50, 100, 100);
		context.restore();
	}

	function c_resetTransform(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.fillStyle = "blue";
		context.fillRect(100, 50, 100, 100);
		context.globalAlpha = 0.5;
		context.fillStyle = "red";
		context.translate(50, 25);
		context.fillRect(100, 50, 100, 100);
		context.fillStyle = "green";
		context.resetTransform();
		context.fillRect(0, 10, 100, 100);
		context.restore();
	}

	function c_saveRestore(){
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, 500, 300);
		context.save();
		context.strokeStyle = "#ff0000";
		context.strokeRect (10, 10, 100, 100);
		context.restore();
		context.strokeRect (20, 20, 110, 110);
		/*context.font = "14px Verdana";
		context.fillStyle = "navy";
		if(window.speechSynthesis) {
			context.fillText("Синтез речи поддерживается", 20, 50);
			const utterance = new SpeechSynthesisUtterance();
			utterance.text = "Синтез речи поддерживается";
			const voices = window.speechSynthesis.getVoices();

			const ruVoice = voices.find(v => v.lang.includes("ru") || v.lang.includes("uk"));

			if (ruVoice) {
				utterance.voice = ruVoice;
				window.speechSynthesis.speak(utterance);
			} else {
				utterance.text = "No Russian voice";
				window.speechSynthesis.speak(utterance);
			}
			
		} 
		else {
			context.fillText("Синтез речи не поддерживается", 20, 50);
		}*/
	}

