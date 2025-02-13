let dafaultBD = "<xmp>_id: ObjectId(...XXX...)</xmp><xmp> ▼ list: Object</xmp><xmp>	▼ id0001: Object</xmp><xmp>		username: \"user1\"</xmp><xmp>		permissions: \"Admin\"</xmp><xmp>		coins: 300</xmp><xmp>		▼ games: Array (2)</xmp><xmp>			0: \"Starcraft\"</xmp><xmp>			1: \"Frostpunk\"</xmp><xmp>	▼ id0002: Object</xmp><xmp>		username: \"user2\"</xmp><xmp>		permissions: \"User\"</xmp><xmp>		coins: 200</xmp><xmp>		▼ games: Array (1)</xmp><xmp>			0: \"Mass Effekt\"</xmp>"

function f_default(){
	document.getElementById('strucBlock').innerHTML = dafaultBD;
	document.getElementById('displayInner').innerHTML = "";
}

function f_newUserDb(){
	document.getElementById('strucBlock').innerHTML = dafaultBD +
	"<xmp>	▼ id0003: Object</xmp><xmp>		username: \"user3\"</xmp><xmp>		permissions: \"Banned\"</xmp><xmp>		coins: 0</xmp><xmp>		▼ games: Array (empty)</xmp>";
}

function f_newUserCon(){
	document.getElementById('displayInner').innerHTML =
	"<xmp>{</xmp>\n"+"<xmp>_id: new ObjectId('67aa89ef6e9935f6f46d007e'),</xmp>\n"+"<xmp>list: Map(3) {</xmp>\n"+"<xmp>'id0001' => {</xmp>\n"+"<xmp>  username: 'name1',</xmp>\n"+"<xmp>  permissions: 'Admin',</xmp>\n"+
  "<xmp>  coins: 300,</xmp>\n"+"<xmp>  games: [Array],</xmp>\n"+"<xmp>  _id: new ObjectId('67aa8b09c4e77ba5d4c671e6')</xmp>\n"+"<xmp>},</xmp>\n"+
	"<xmp>'id0002' => {</xmp>\n"+"<xmp>  username: 'name2',</xmp>\n"+"<xmp>  permissions: 'User',</xmp>\n"+"<xmp>  coins: 200,</xmp>\n"+"<xmp>  games: [Array],</xmp>\n"+
  "<xmp>  _id: new ObjectId('67aa8ad270b049dddd3adc14')</xmp>\n"+"<xmp>},</xmp>\n"+"<xmp>'id0003' => {</xmp>\n"+
  "<xmp>  username: 'name3',</xmp>\n"+"<xmp>  permissions: 'Banned',</xmp>\n"+"<xmp>  coins: 0,</xmp>\n"+"<xmp>  games: [],</xmp>\n"+
  "<xmp>  _id: new ObjectId('67aa89ef6e9935f6f46d007f')</xmp>\n"+"<xmp>}</xmp>\n"+"<xmp>}</xmp>\n"+"<xmp>__v: 0</xmp>\n"+"<xmp>}</xmp>"
}

function f_find(){
  document.getElementById('displayInner').innerHTML =
  "<xmp>Список користувачів: [</xmp>\n"+"<xmp>{</xmp>\n"+"<xmp>  _id: new ObjectId('67aa89ef6e9935f6f46d007e'),</xmp>\n"+"<xmp>  list: Map(3) {</xmp>\n"+
  "<xmp>    'id0003' => [Object],</xmp>\n"+"<xmp>    'id0002' => [Object],</xmp>\n"+"<xmp>    'id0001' => [Object]</xmp>\n"+"<xmp>  },</xmp>\n"+"<xmp>  __v: 0</xmp>\n"+"<xmp>}</xmp>"+"<xmp>]</xmp>";
}

function f_findOne(){
  document.getElementById('displayInner').innerHTML =
  "<xmp>Знайдено користувача: {</xmp>\n"+"<xmp>  username: 'name1',</xmp>\n"+"<xmp>  permissions: 'Admin',</xmp>\n"+
  "<xmp>  coins: 300,</xmp>\n"+"<xmp>  games: [ 'Starcraft', 'Frostpunk' ],</xmp>\n"+"<xmp>  _id: new ObjectId('67aa8b09c4e77ba5d4c671e6')</xmp>\n"+"<xmp>}</xmp>";
}

function f_delete(){
  document.getElementById('displayInner').innerHTML =
  "<xmp>Користувач id0003 видалений</xmp>\n"+"<xmp>{</xmp>\n"+"<xmp>  _id: new ObjectId('67aa89ef6e9935f6f46d007e'),</xmp>\n"+
  "<xmp>  list: Map(2) {</xmp>\n"+"<xmp>    'id0002' => {</xmp>\n"+"<xmp>      username: 'name2',</xmp>\n"+"<xmp>      permissions: 'User',</xmp>\n"+
  "<xmp>      coins: 200,</xmp>\n"+"<xmp>      games: [Array],</xmp>\n"+"<xmp>      _id: new ObjectId('67aa8ad270b049dddd3adc14')</xmp>\n"+"<xmp>    },</xmp>\n"+
"<xmp>    'id0001' => {</xmp>\n"+"<xmp>      username: 'name1',</xmp>\n"+"<xmp>      permissions: 'Admin',</xmp>\n"+"<xmp>      coins: 300,</xmp>\n"+
"<xmp>      games: [Array],</xmp>\n"+"<xmp>      _id: new ObjectId('67aa8b09c4e77ba5d4c671e6')</xmp>\n"+"<xmp>    }</xmp>\n"+"<xmp>  },</xmp>\n"+"<xmp>  __v: 0</xmp>\n"+"<xmp>}</xmp>"
}

function f_coll(){
  document.getElementById('displayInner').innerHTML =
  "<xmp>[</xmp>\n"+"<xmp>  {</xmp>\n"+"<xmp>    _id: new ObjectId('67aa89ef6e9935f6f46d007e'),</xmp>\n"+
"<xmp>    list: { id0002: [Object], id0001: [Object] },</xmp>\n"+"<xmp>    __v: 0</xmp>\n"+"<xmp>  }</xmp>\n"+"<xmp>]";
}
