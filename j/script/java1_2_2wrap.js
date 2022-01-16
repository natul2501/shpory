	function autobox(){
		var s1 = "<pre>Integer x = 7; <u>// Integer x = Integer.valueOf(7);</u></pre>";
		var s2 = "<pre>Boolean b = true;  <u>// Boolean b = Boolean.valueOf(true);</u></pre><br>";
		var s3 = "<pre>Integer x = <i>new</i> Integer(7);</pre>";
		var s4 = "<pre><i>int</i> y = x + 2; <u>// int y = x.intValue() + 2;</u></pre><br>";
		var s5 = "<pre>Boolean bool = <i>new</i>  Boolean(true);</pre>";
		var s6 = "<pre><i>boolean</i> bb = !bool ^ false; <u> // boolean bb = !bool.booleanValue() ^ false;</u></pre><br>";
		var s7 = "<pre>Boolean f1 = true;</pre>";
		var s8 = "<pre>Boolean f2 = false;</pre>";
		var s9 = "<pre><i>int</i> fc = f1.compareTo(f2)); <u>// fc =  1</u></pre><br>";
		document.getElementById("cl1").innerHTML = s1;
		document.getElementById("cl2").innerHTML = s2;
		document.getElementById("cl3").innerHTML = s3;
		document.getElementById("cl4").innerHTML = s4;
		document.getElementById("cl5").innerHTML = s5;
		document.getElementById("cl6").innerHTML = s6;
		document.getElementById("cl7").innerHTML = s7;
		document.getElementById("cl8").innerHTML = s8;
		document.getElementById("cl9").innerHTML = s9;
	}

	function parse(){
		var s1 = "<pre><i>public static byte</i> parseByte(<i>String</i> s);</pre>";
		var s2 = "<pre><i>public static double</i> parseDouble(<i>String</i> s);</pre><br>";
		var s3 = "<pre><i>public static long</i> parseLong(<i>String</i> s, <i>int</i> radix);</pre><br>";
		document.getElementById("cl1").innerHTML = s1;
		document.getElementById("cl2").innerHTML = s2;
		document.getElementById("cl3").innerHTML = s3;
		document.getElementById("cl4").innerHTML = "";
		document.getElementById("cl5").innerHTML = "";
		document.getElementById("cl6").innerHTML = "";
		document.getElementById("cl7").innerHTML = "";
		document.getElementById("cl8").innerHTML = "";
		document.getElementById("cl9").innerHTML = "";
	}
	
	function clearr(){
		document.getElementById("cl1").innerHTML = "";
		document.getElementById("cl2").innerHTML = "";
		document.getElementById("cl3").innerHTML = "";
		document.getElementById("cl4").innerHTML = "";
		document.getElementById("cl5").innerHTML = "";
		document.getElementById("cl6").innerHTML = "";
		document.getElementById("cl7").innerHTML = "";
		document.getElementById("cl8").innerHTML = "";
		document.getElementById("cl9").innerHTML = "";
		document.getElementById("cl10").innerHTML = "";
		document.getElementById("cl11").innerHTML = "";
		document.getElementById("cl12").innerHTML = "";
		document.getElementById("cl13").innerHTML = "";
		document.getElementById("cl14").innerHTML = "";
		document.getElementById("cl15").innerHTML = "";
		document.getElementById("cl16").innerHTML = "";
		document.getElementById("cl17").innerHTML = "";
		document.getElementById("cl18").innerHTML = "";
		document.getElementById("cl19").innerHTML = "";
		document.getElementById("cl20").innerHTML = "";
		document.getElementById("cl21").innerHTML = "";
		document.getElementById("cl22").innerHTML = "";
		document.getElementById("co1").innerHTML = "";
		document.getElementById("co2").innerHTML = "";
		document.getElementById("co3").innerHTML = "";
		document.getElementById("co4").innerHTML = "";
		document.getElementById("co5").innerHTML = "";
		document.getElementById("co6").innerHTML = "";
		document.getElementById("co7").innerHTML = "";
		document.getElementById("co8").innerHTML = "";
		document.getElementById("co9").innerHTML = "";
		document.getElementById("co10").innerHTML = "";
	}