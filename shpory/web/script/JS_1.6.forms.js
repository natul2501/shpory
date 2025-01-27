	let form = document.form.my;
	const txt1 = "";

	function f_getform(){
		const txt = document.my;
		document.getElementById('for_A1').innerHTML = "Отримання форми за ім'ям:<br>" + ${{ secrets.[MONGOLINK] }};
	}
	function f_getformDoc(){
		const txt = document.forms["my"];
		document.getElementById('for_A1').innerHTML = "Отримання форми за ім'ям зі списку форм:<br>" + txt;
	}
	function f_getformList(){
		const txt = document.forms[0];
		document.getElementById('for_A1').innerHTML = "Перша форма зі списку форм на сторінці:<br>" + txt;
	}
	function f_getformSearch(){
		const formId = document.getElementById("forma");
		const formName = document.getElementsByName("my")[0];
		const formTag = document.querySelector("form");
		document.getElementById('for_A1').innerHTML =
			"Форма по id: " + formId + 
			"<br> Форма за ім'ям: " + formName + 
			"<br> Форма за тегом: " + formTag;
	}
	function f_action(){
		const form = document.my;
		document.getElementById('for_A1').innerHTML = form.action;
	}
	function f_target(){
		const form = document.my;
		document.getElementById('for_A1').innerHTML = form.target;
	}
	function f_method(){
		const form = document.my;
		document.getElementById('for_A1').innerHTML = form.method;
	}
	function f_name(){
		const form = document.my;
		document.getElementById('for_A1').innerHTML = form.name;
	}
	function f_length(){
		const form = document.my;
		document.getElementById('for_A1').innerHTML = form.length;
	}
	function f_elements(){
		const form = document.my;
		document.getElementById('for_A1').innerHTML = form.elements;
	}
	function f_getElementsIndex(){
		const form = document.my;
		document.getElementById('for_A1').innerHTML = 
			"Елемет по id: " + form.elements[0];
	}
	function f_getElementsName(){
		const form = document.my;
		document.getElementById('for_A1').innerHTML =
			"Елемент по імені " + form.elements["one"];
	}
	function f_getElementsPath(){
		const form = document.my;
		document.getElementById('for_A1').innerHTML =
			"Елемент через об'єкт форми:<br> " + document.my.one;
	}
	function f_elementsType(){
		const elementOne = document.my.one;
		document.getElementById('for_A1').innerHTML =
			"Тип елементу: " + elementOne.type;
	}
	function f_elementsValue(){
		const elementOne = document.my.one;
		const oldValue = elementOne.value;
		elementOne.value = "3";
		document.getElementById('for_A1').innerHTML =
			"Попереднє значення поля: " + oldValue +
			"<br>Нове значення поля: " + elementOne.value;
	}
	function f_elementsFokus(){
		document.my.one.focus();
	}
	function f_elementsBlur(){
		document.my.one.blur();
	}
	function f_elementsReset(){
		document.my.reset();
	}
	function f_onclick(){
		document.getElementById('for_A1').innerHTML = "Натиснули button";
	}
	function ch_checked() {
		var checkBox = document.getElementById("myCheck");
		var text = document.getElementById("ch_text");
		if (checkBox.checked == true)
	 		text.innerHTML = "★";
		else
	    	text.innerHTML = "✩";
	} 




	function f_getfirst(my){
		txt1 = my.elements[0].value;
		document.getElementById('for_A1').innerHTML = "Значение первого элемента формы \"my\": " + txt1;
	}
	function f_firstform(inputform){
		txt1 = inputform.length;
		document.getElementById('for_A1').innerHTML = "Размер массива элементов формы \"my\": " + txt1;
	}
	function f_getelement(inputform){
		inputform.elements[0].value = 3;
		txt1 = inputform.elements.one.value;
		document.getElementById('for_A1').innerHTML = "Значение первого элемента формы \"my\": " + txt1;
	}
	function fcc1(inputform){
		txt1 = one.forma;
		document.getElementById('for_A1').innerHTML = "Обратная ссылка элемента формы \"my\": " + txt1;
	}
	


	function fg1(inputform){
		txt1 = inputform.encoding;
		document.getElementById('for_A1').innerHTML = "значение атрибута enctype формы \"my\": " + txt1;
	}
	function fa2(inputform){
		var txt2 = "";
		txt2 = inputform.elements.three.value;
		let fields = form.elements.userFields;
		// let a = alert(fieldset.elements.login == form.elements.login);
		document.getElementById('for_A2').innerHTML = "fields.elements.three == form.elements.three: " + txt2;
	}
