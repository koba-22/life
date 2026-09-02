class Number{
    constructor(){
    }

    top(retf, val){
	this.retf = retf
	let s =
`<input type="text" size="25" id="number" value="${val}"><br>
<button onClick=number.input("1")>1</button>\
<button onClick=number.input("2")>2</button>\
<button onClick=number.input("3")>3</button>\
<button onClick=number.input("BS")>BS</button>\
<button onClick=number.modoru()>戻る</button><br>
<button onClick=number.input("4")>4</button>\
<button onClick=number.input("5")>5</button>\
<button onClick=number.input("6")>6</button>\
<button onClick=number.input("Clr")>Clr</button>\
<button onClick=number.input("?")>?</button><br>
<button onClick=number.input("7")>7</button>\
<button onClick=number.input("8")>8</button>\
<button onClick=number.input("9")>9</button>\
<button onClick=number.input(".")>.</button>\
<button onClick=number.input("-")>-</button><br>
<button onClick=number.input("0")>0</button>\
<button onClick=number.input("00")>00</button>\
<button onClick=number.input("000")>000</button>\
<button onClick=number.input("0000")>0000</button>\
<button onClick=number.input("_")>空白</button><br>
手前で<br>
<button onClick=number.input("ok-",true)>ok-</button>\
<button onClick=number.input("ng-",true)>ng-</button>\
<button onClick=number.input("fBS",true)>Cl3</button>`
	index.div.innerHTML = s
	this.obj = document.getElementById('number')
    }

    input(_s, _before=false){
	let o = this.obj
	let s = o.value
	if(_s == "BS")
	    s = s.substr(0, s.length-1)
	else if(_s == "Clr")
	    s = ""
	else{
	    if(_before){
		if(_s == "fBS"){
		    if(s.length >= 3)
			s = s.substr(3, s.lengh)
		}else{
		    s = _s + s
		}
	    }else{
		s += _s
	    }
	}
	o.value = s
    }

    modoru(){
	this.retf(this.obj.value.replaceAll('_', ' '))
    }
}
