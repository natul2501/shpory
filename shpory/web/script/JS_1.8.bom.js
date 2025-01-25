
	function b_alert(){
		alert("Текст повідомлення");
	}
	
	function b_confirm(){
		const result = confirm("Текст повідомлення");
		const td1 = document.getElementById('b_confirm');
		const child1 = td1.firstElementChild;
		td1.removeChild(child1);
		const span1 = document.createElement("span");
		if(result===true)
	        span1.textContent = "Ви вибрали ОК";
	    else
	        span1.textContent = "Ви вибрали відмінити";
	    document.getElementById('b_confirm').appendChild(span1);
	}

	function b_prompt(){
		const result = prompt("Введіть номер карточки");
		const td2 = document.getElementById('b_prompt');
		const child2 = td2.firstElementChild;
		td2.removeChild(child2);
		const span2 = document.createElement("span");
		span2.textContent = result;
		document.getElementById('b_prompt').appendChild(span2);
	}

	function b_find(){
		const btn = document.getElementById("btn_find");
		const keyField = document.getElementById("in_find");
		const result = find(keyField.value);
	    const span3 = document.getElementById('s_find');
	    if(result===true)
	        span3.textContent = "Таке слово є";
	    else
	        span3.textContent = "Такого слова немає";
	    document.getElementById('td_find').appendChild(span2);
	}
