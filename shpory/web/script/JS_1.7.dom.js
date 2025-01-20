	let form = document.forms.my;
	var txt1 = "";

	function b_createElement(){
		document.getElementById('b_createElement').innerHTML = document.createElement("h1");
	}
	function b_createTextNode(){
		document.getElementById('b_createTextNode').innerHTML = document.createTextNode("text");
	}
	
	function b_appendChild(){
		const header = document.createElement("h4");
		const headerText = document.createTextNode("text");
		header.appendChild( headerText);
		document.getElementById('b_appendChild').appendChild(header);
	}

	function b_textcontent(){
		const header = document.createElement("h4");
		header.textContent = "text";
		document.getElementById('b_textcontent').appendChild(header);
	}

	function b_insertBefore(){
		const header = document.createElement("h4");
		header.textContent = "text";
		const firstP = document.getElementById('b_beforeSpan');
		document.getElementById('b_insertBefore').insertBefore(header, firstP);
	}
	
	
	
	function b_cloneNode(){
		const article = document.getElementById("article");
		const lastP = article.lastElementChild;
		const newLastP = lastP.cloneNode(true);
		newLastP.textContent += " Копія";
		document.getElementById('b_cloneNode').appendChild(newLastP);
	}
	
	function b_replaceChild(){
		const Parent = document.getElementById("b_replaceChild");
		const oldNode = Parent.firstElementChild;
		const newNode = document.createElement("h4");
		newNode.textContent = "Текст результату";
		Parent.replaceChild(newNode, oldNode);
	}

	function b_removeChild(){
		const Parent = document.getElementById("b_removeChild");
		const oldNode = Parent.firstElementChild;
		Parent.removeChild(oldNode);
	}

	function b_createAttribute(){
		const element = document.getElementById("b_createAttribute");
		const attr = element.createAttribute("style");
		attr.value = "color:FireBrick;";
		element.setAttributeNode(attr);

	}

	function b_setAttribute(){
		const element = document.getElementById("b_setAttribute");
		element.setAttribute("style", "color:FireBrick;");
	}

	function b_removeAttribute(){
		const element = document.getElementById("b_removeAttribute");
		element.removeAttribute("style");
	}

	function b_changeAttribute(){
		const element = document.getElementById("b_changeAttribute");
		element.style.color = "navy";
	}
	
	