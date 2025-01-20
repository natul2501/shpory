	let form = document.forms.my;
	var txt1 = "";

	function f_getfirst(inputform){
		txt1 = inputform.elements[0].value;
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
	function fd1(inputform){
		txt1 = inputform.action;
		document.getElementById('for_A1').innerHTML = "значение атрибута action формы \"my\": " + txt1;
	}
	function fe1(inputform){
		txt1 = inputform.target;
		document.getElementById('for_A1').innerHTML = "значение атрибута target формы \"my\": " + txt1;
	}
	function ff1(inputform){
		txt1 = inputform.method;
		document.getElementById('for_A1').innerHTML = "значение атрибута method формы \"my\": " + txt1;
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