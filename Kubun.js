class Kubun{
    constructor(){
	this.vali = 0
	this.mode_list = ['選択', '履歴']
	this.mode = 0
	this.data = null
    }

    top(retf, val, i){
	this.retf = retf
	this.val = val
	this.vali = i
	let s =
`<button onClick="kubun.modoru()">戻る</button>\
<button class="joutai">${this.mode_list[this.mode]}</button>\
<button onClick="kubun.change_mode(0)">選択</button>\
<button onClick="kubun.change_mode(1)">履歴</button>\
<button onClick="kubun.clear()">Clr</button><br>
<input type="text" size="25" id="kubun" value="${this.val}"><br>
${this.make_button()}`
	index.div.innerHTML = s
	this.obj = document.getElementById('kubun')
    }

    change_mode(mode){
	this.mode = mode
	this.top(this.retf, this.val, this.vali)
    }
    
    
    modoru(){
	this.retf(this.obj.value)
    }

    clear(){
	this.obj.value = ''
    }

    button(v){
	if(this.mode == 1){
	    this.shousai(v)
	    return
	}
	this.obj.value = v
	this.modoru()
    }

    shousai(v){
	let da = get_reversed_data() // 日付で。
	let s =
`${v} 区${this.vali+1}<button class="c1" onClick="kubun.change_mode(1)">戻る</button><br>
<table border="1"><tr><td>日付</td><td>__件1</td><td>___件2</td>
<td style='text-align: left;'>区他</td></tr>`
	// key:key,value:種類(新規 削除 変更),元key,登録日時,状態,日時,件1,件2,区1,区2,区3,区4,区5,区6
	//     0         1                    2     3        4    5    6   7   8   9   10  11  12  13
	// 20220914-0900-水
	let total = 0, t1
	for(let i = 0; i < da.length; i++){
	    let a = da[i].split(kugiri)
	    if(a[8+this.vali].length == 0)
		continue
	    if(a[8+this.vali] != v)
		continue
	    let s1 = ''
	    for(let j = 8; j < a.length; j++){
		if(j == 8+this.vali)
		    continue
		if(a[j] == '')
		    continue
		s1 += `${a[j]} `
	    }
	    t1 = parseInt(a[6])
	    if(!isNaN(t1))
		total += t1
	    s +=
`<tr><td>${a[5].substr(4, 2)}/${a[5].substr(6, 2)} ${a[5].substr(-1, 1)}</td>
<td>${a[6]}</td><td>${a[7]}</td><td style='text-align: left;'>${s1}</td></tr>`
	}
	s += '</table>'
	index.div.innerHTML = s
    }
    
    make_button(){
	let a = this.make_str().split(kugiri), r = '', n = 0, n1 = 0
	for(let j = 0; j < a.length-1; j++){
	    if(a[j] == '')
		continue                 
	    r += `<button onClick=kubun.button("${a[j]}")>${a[j]}</button>`
	    n += a[j].length
	    if(j < a.length-2)
		n1 = a[j+1].length
	    else
		n1 = 0
	    if(n+n1 > 11){ // 25/2
		/* スマホの
		   <meta name="viewport" content="width=320,height=700,initial-scale=1,user-scalable=no">
		   の指定の改行に任せるためコメントアウト。*/
		// r += '<br>'
		n = 0
	    }
	}
	return r                 
    }

    make_str(){
	let da = data.get_all()
	da.reverse() // keyで。
	let r = ''
	for(let i = 0; i < da.length; i++){
	    let a = da[i].split(kugiri)
	    let k1 = a[8+this.vali]
	    if(k1.length == 0)
		continue
	    k1 = `${kugiri}${k1}${kugiri}`
	    if(r.indexOf(k1) >= 0)
		continue
	    r += k1
	}
	return r.substr(1).replace(/,,/g, ",") // 最後に,が残る。
    }
}
