	function itei(){
		var s1 = "<br><pre><i>public interface</i> Iterator&lt;E&gt;{</pre>";
		var s2 = "<pre>    E next();</pre>";
		var s3 = "<pre>    <i>boolean</i> hasNext();</pre>";
		var s4 = "<pre>    <i>void</i> remove();</pre>";
		var s5 = "<pre>}</pre>";
		document.getElementById("cl1").innerHTML = s1;
		document.getElementById("cl2").innerHTML = s2;
		document.getElementById("cl3").innerHTML = s3;
		document.getElementById("cl4").innerHTML = s4;
		document.getElementById("cl5").innerHTML = s5;
		document.getElementById("cl6").innerHTML = "";
		document.getElementById("cl7").innerHTML = "";
		document.getElementById("cl8").innerHTML = " ";
		document.getElementById("cl9").innerHTML = " ";
		document.getElementById("cl10").innerHTML = " ";
		document.getElementById("cl11").innerHTML = " ";
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
		document.getElementById("cl23").innerHTML = "";
	}
	function item(){
		var s1 = "<pre><i>package</i> com.mypackage;</pre><br>";
		var s2 = "<pre><i>import</i> java.util.ArrayList;</pre>";
		var s3 = "<pre><i>import</i> java.util.Iterator; <u>// Iterator's package</u></pre><br>";
		var s4 = "<pre><i>public class</i> Test{</pre>";
		var s5 = "<pre>    <i>public static void</i> main(String[] args) {</pre><br>";
		var s6 = "<pre>        ArrayList &lt;String&gt; countries = <i>new</i> ArrayList&lt; &gt;();</pre>";
		var s7 = "<pre>        countries.add(\"Ukraine\");</pre><pre>        countries.add(\"Germany\");</pre>";
		var s8 = "<pre>        countries.add(\"China\");</pre><pre>        countries.add(\"Iseland\");</pre><br>";
		var s9 = "<pre>        Iterator &lt;String&gt; iter = countries.iterator(); <u>// create an Iterator of countries</u></pre>";
		var s10 = "<pre>        String a;</pre><pre>        <i>while</i>(iter.<i>hasNext</i>()){</pre>";
		var s11 = "<pre>            a = iter.<i>next</i>();</pre><pre>            System.out.println( a );</pre>";
		var s12 = "<pre>            <i>if</i>(a == \"China\"){</pre>";
		var s13 = "<pre>                iter.<i>remove</i>();</pre><pre>            }</pre><pre>        }</pre>";
		var s14 = "<pre>        System.out.println(countries);</pre><pre>    }</pre><pre>}</pre>";
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
		document.getElementById("cl15").innerHTML = "";
		document.getElementById("cl16").innerHTML = "";
		document.getElementById("cl17").innerHTML = "";
		document.getElementById("cl18").innerHTML = "";
		document.getElementById("cl19").innerHTML = "";
		document.getElementById("cl20").innerHTML = "";
		document.getElementById("cl21").innerHTML = "";
		document.getElementById("cl22").innerHTML = "";
		document.getElementById("cl23").innerHTML = "";
		document.getElementById("co1").innerHTML = "Ukraine<br>Germany<br>China<br>Iseland";
		document.getElementById("co2").innerHTML = "[Ukraine, Germany, Iceland]";
		document.getElementById("co3").innerHTML = "";
		document.getElementById("co4").innerHTML = "";
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
		document.getElementById("cl23").innerHTML = "";
		document.getElementById("co1").innerHTML = "";
		document.getElementById("co2").innerHTML = "";
		document.getElementById("co3").innerHTML = "";
		document.getElementById("co4").innerHTML = "";
	}