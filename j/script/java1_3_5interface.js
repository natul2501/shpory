	function classexa(){
		var s1 = "<pre><i>package</i> com.mypackage;</pre><br>";
		var s2 = "<pre>    <i>class</i> A {</pre>";
		var s3 = "<pre>        <i>void</i> m(SomeClass p) {…}{</pre>";
		var s4 = "<pre>        <i>class</i> B {} <u>// класс элемент класса</u></pre>";
		var s5 = "<pre>        <i>void</i> m() {</pre>";
		var s6 = "<pre>            <i>class</i> C {} <u>// локальный класс</u></pre>";
		var s7 = "<pre>            m(<i>new</i> SomeClass() { <u>// анонимный класс</u></pre>";
		var s8 = "<pre>            });</pre>";
		var s9 = "<pre>        }</pre>";
		var s10 = "<pre>    }</pre>";
		var s11 = "";
		var s12 = "";
		var s13 = "";
		document.getElementById("cl1").innerHTML = s1;
		document.getElementById("cl2").innerHTML = s2;
		document.getElementById("cl3").innerHTML = s3;
		document.getElementById("cl4").innerHTML = s4;
		document.getElementById("cl5").innerHTML = s5;
		document.getElementById("cl6").innerHTML = s6;
		document.getElementById("cl7").innerHTML = s7;
		document.getElementById("cl8").innerHTML = s8;
		document.getElementById("cl9").innerHTML = s9;
		document.getElementById("cl10").innerHTML = s10;
		document.getElementById("cl11").innerHTML = s11;
		document.getElementById("cl12").innerHTML = s12;
		document.getElementById("cl13").innerHTML = s13;
		document.getElementById("co1").innerHTML = "";
		document.getElementById("co2").innerHTML = "";
	}

	function intdef(){
		var s1 = "<pre><i>package</i> com.mypackage;</pre><br>";
		var s2 = "<pre>    <i>interface</i> IMy {</pre>";
		var s3 = "<pre>    }</pre>";
		document.getElementById("cl1").innerHTML = s1;
		document.getElementById("cl2").innerHTML = s2;
		document.getElementById("cl3").innerHTML = s3;
		document.getElementById("co1").innerHTML = "";
		document.getElementById("co2").innerHTML = "";
	}
	function intmeth(){
		var s1 = "<pre><i>package</i> com.mypackage;</pre><br>";
		var s2 = "<pre>    <i>interface</i> IMy {</pre>";
		var s3 = "<pre>       <i>void</i> doThis();</pre>";
		var s4 = "<pre>    }</pre>";
		document.getElementById("cl1").innerHTML = s1;
		document.getElementById("cl2").innerHTML = s2;
		document.getElementById("cl3").innerHTML = s3;
		document.getElementById("cl4").innerHTML = s4;
		document.getElementById("co1").innerHTML = "";
		document.getElementById("co2").innerHTML = "";
	}
	function intimpl(){
		var s1 = "<pre><i>package</i> com.mypackage;</pre><br>";
		var s2 = "<pre>    <i>interface</i> IMy {</pre>";
		var s3 = "<pre>       <i>void</i> doThis();</pre>";
		var s4 = "<pre>    }</pre><br>";
		var s5 = "<pre>    <i>abstract class</i> A <i>implements</i> IMy{</pre>";
		var s6 = "<pre>    }</pre><br>";
		var s7 = "<pre>    <i>interface</i> B <i>implements</i> IMy{</pre>";
		var s8 = "<pre>    }</pre><br>";
		var s9 = "<pre>    <i>class</i> Test{</pre>";
		var s10 = "<pre>        <i>public static void</i> main(String[] args) {</pre>";
		var s11 = "<pre>            System.out.println((<i>new</i> A() <i>instanceof</i> IMy));</pre>";
		var s13 = "<pre>            <i>int</i> n = d.getModifiers();</pre>";
		var s12 = "<pre>            Class d = IMy.<i>class</i>;</pre>";
		var s14 = "<pre>            System.out.println(Modifier.isInterface(n));</pre>";
		var s15 = "<pre>        }</pre><br>";
		var s16 = "<pre>    }</pre><br>";
		document.getElementById("cl1").innerHTML = s1;
		document.getElementById("cl2").innerHTML = s2;
		document.getElementById("cl3").innerHTML = s3;
		document.getElementById("cl4").innerHTML = s4;
		document.getElementById("cl5").innerHTML = s5;
		document.getElementById("cl6").innerHTML = s6;
		document.getElementById("cl7").innerHTML = s7;
		document.getElementById("cl8").innerHTML = s8;
		document.getElementById("cl9").innerHTML = s9;
		document.getElementById("cl10").innerHTML = s10;
		document.getElementById("cl11").innerHTML = s11;
		document.getElementById("cl12").innerHTML = s12;
		document.getElementById("cl13").innerHTML = s13;
		document.getElementById("cl14").innerHTML = s14;
		document.getElementById("cl15").innerHTML = s15;
		document.getElementById("cl16").innerHTML = s16;
		document.getElementById("co1").innerHTML = "true";
		document.getElementById("co2").innerHTML = "true";
	}
	function intreal(){
		var s1 = "<pre><i>package</i> com.mypackage;</pre><br>";
		var s2 = "<pre>    <i>interface</i> IMy {</pre>";
		var s3 = "<pre>       <i>void</i> doThis();</pre>";
		var s4 = "<pre>    }</pre><br>";
		var s5 = "<pre>    <i>class</i> C <i>implements</i> IMy{</pre>";
		var s6 = "<pre>       <u>@Override</u></pre>";
		var s7 = "<pre>       <i>void</i> doThis(){</pre>";
		var s8 = "<pre>           System.out.println(\"Class C can do this\");</pre>";
		var s9 = "<pre>        }</pre>";
		var s10 = "<pre>    }</pre><br>";
		document.getElementById("cl1").innerHTML = s1;
		document.getElementById("cl2").innerHTML = s2;
		document.getElementById("cl3").innerHTML = s3;
		document.getElementById("cl4").innerHTML = s4;
		document.getElementById("cl5").innerHTML = s5;
		document.getElementById("cl6").innerHTML = s6;
		document.getElementById("cl7").innerHTML = s7;
		document.getElementById("cl8").innerHTML = s8;
		document.getElementById("cl9").innerHTML = s9;
		document.getElementById("cl10").innerHTML = s10;
		document.getElementById("cl11").innerHTML = "";
		document.getElementById("cl12").innerHTML = "";
		document.getElementById("cl13").innerHTML = "";
		document.getElementById("cl14").innerHTML = "";
		document.getElementById("cl15").innerHTML = "";
		document.getElementById("cl16").innerHTML = "";
		document.getElementById("co1").innerHTML = "";
		document.getElementById("co2").innerHTML = "";
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