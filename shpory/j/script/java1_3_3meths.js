	function classmeth(){
		var s = "<pre><i>package</i> com.mypackage;</pre><br>";
		var s1 = "<pre>        <i>class</i> A {</pre>";
		var s2 = "<pre>        }</pre>";
		var s3 = "<pre>           <i>void</i> m();</pre>";
		document.getElementById("cl1").innerHTML = s;
		document.getElementById("cl2").innerHTML = s1;
		document.getElementById("cl3").innerHTML = s3;
		document.getElementById("cl4").innerHTML = s2;
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
		document.getElementById("co1").innerHTML = "";
		document.getElementById("co2").innerHTML = "";
	}
	function classmethdo(){
		var s1 = "<pre><i>package</i> com.mypackage;</pre><br>";
		var s2 = "<pre>        <i>class</i> A {</pre>";
		var s3 = "<pre>           <i>void</i> m(){</pre>";
		var s4 = "<pre>              System.out.println(\"1\");</pre>";
		var s5 = "<pre>           }</pre>";
		var s6 = "<pre>        }</pre><br>";
		var s7 = "<pre>    <i>public class</i> My {</pre>";
		var s8 = "<pre>        <i>public static void</i> main(String[] args) {</pre>";
		var s9 = "<pre>            A a1 = <i>new</i> A();</pre>";
		var s10 = "<pre>            System.out.println(a.m());</pre>";
		var s11 = "<pre>        }</pre>";
		var s12 = "<pre>    }</pre>";
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
		document.getElementById("cl13").innerHTML = "";
		document.getElementById("cl14").innerHTML = "";
		document.getElementById("cl15").innerHTML = "";
		document.getElementById("cl16").innerHTML = "";
		document.getElementById("cl17").innerHTML = "";
		document.getElementById("cl18").innerHTML = "";
		document.getElementById("co1").innerHTML = "1";
		document.getElementById("co2").innerHTML = "";
	}
	function singl(){
		var s1 = "<pre><i>package</i> com.mypackage;</pre><br>";
		var s2 = "<pre>    <i>class</i> Z {</pre>";
		var s3 = "<pre>       <i>private static</i> Z inst = <i>null</i>; <u>// статическое поле – закрытый экземпляр класса</u></pre>";
		var s5 = "<pre>       <i>private</i> Z() { } <u>// private конструктор:</u></pre>";
		var s6 = "<pre>       <i>synchronized public static</i> Z getZ() { <u>// возвращает единственный экземпляр класса Z</u></pre>";
		var s7 = "<pre>            System.out.println(inst); <u>// создается instance если он еще не создан</u></pre>";
		var s8 = "<pre>           <i>if</i> (inst == <i>null</i>) inst = <i>new</i> Z();</pre>";
		var s9 = "<pre>           <i>return</i> inst;</pre>";
		var s10 = "<pre>        }</pre>";
		var s11 = "<pre>    }</pre><br>";
		var s12 = "<pre>    <i>class</i> Test{</pre>";
		var s13 = "<pre>        <i>public static void</i> main(String[] args) {</pre>";
		var s14 = "<pre>            Z z1 = Z.getZ();<u>// z1 – экземпляр класса Z</u></pre>";
		var s15 = "<pre>            Z z2 = Z.getZ();<u>// z2 – экземпляр класса Z</u></pre>";
		var s16 = "<pre>                            <u>// z1 и z2 ссылаются на один и тот же объект</u></pre>";
		var s17 = "<pre>        }</pre>";
		var s18 = "<pre>    }</pre>";
		document.getElementById("cl1").innerHTML = s1;	
		document.getElementById("cl2").innerHTML = s2;
		document.getElementById("cl3").innerHTML = s3;
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
		document.getElementById("cl17").innerHTML = s17;
		document.getElementById("cl18").innerHTML = s18;
		document.getElementById("co1").innerHTML = "null";
		document.getElementById("co2").innerHTML = "Z@15db9742";
	}
	function classconstr(){
		var s1 = "<pre><i>package</i> com.mypackage;</pre><br>";
		var s2 = "<pre>    <i>class</i> Z {</pre>";
		var s3 = "<pre>       Z(<i>int</i> x){</pre>";
		var s4 = "<pre>            System.out.println(x);</pre>";
		var s5 = "<pre>        }</pre>";
		var s6 = "<pre>       Z(){</pre>";
		var s7 = "<pre>           <i>this</i>(7);</pre>";
		var s8 = "<pre>        }</pre>";
		var s9 = "<pre>    }</pre><br>";
		var s10 = "<pre>    <i>class</i> Test{</pre>";
		var s11 = "<pre>        <i>public static void</i> main(String[] args) {</pre>";
		var s12 = "<pre>            <i>new</i> Z();</pre>";
		var s13 = "<pre>            <i>new</i> Z(1);</pre>";
		var s14 = "<pre>        }</pre>";
		var s15 = "<pre>    }</pre>";
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
		document.getElementById("cl16").innerHTML = "";
		document.getElementById("cl17").innerHTML = "";
		document.getElementById("cl18").innerHTML = "";
		document.getElementById("co1").innerHTML = "7";
		document.getElementById("co2").innerHTML = "1";
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

	}
	