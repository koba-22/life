class Etsuran{
    constructor(){
	this.cal_fix = new Calendar()
	this.cal_move = new Calendar()
    }

    top(hiyou=false){
	this.cal_fix.set_a(calendar.get())
	this.cal_move.set_a(this.cal_fix.get())
	this.data = get_sorted_data()
	if(hiyou){
	    let hi1 = calendar.get_str().substr(0, 8)
	    this.hizuke(hi1)
	}else{
	    this.top_add_month(0)
	}
    }

    top_add_month(n){
	switch(n){
	case -1:
	case 1:
	    this.cal_fix.add_month(n)
	    break;
	}
	this.cal_move.set_a(this.cal_fix.get())
	let c = this.cal_move

        /* 未使用に。起因するバグがあるため。2025.01.02
	let dacnt = this.data.length-index.max_hyouji
	if(dacnt < 0)
	    dacnt = 0
        */
	let dacnt = 0
	let s = ''
	for(let i = 0; i < 180; i++){
	    if(i == 0){
		s +=
`<a name="top"></a><span class="c">${c.month}月</span>\
<button class="c1" onClick="index.top()">top</button>\
<button class="c1" onClick="etsuran.top_add_month(-1)">前月</button>\
<button class="c1" onClick="etsuran.top_add_month(1)">翌月</button>\
<button class="c1" onClick="etsuran.all()">全て</button>\
<button class="c1" onClick="etsuran.heikin()">平均</button><br>`
	    }else if(c.date == 1){
		if(!s.endsWith('<br>'))
		    s += '<br>'
		s +=
`<span class="c">${c.month}月</span><button class="c1" onClick="index.top()">top</button><a href="#top">ptop</a><br>`
	    }

	    let hi1 = c.get_str().substr(0, 8)

	    let sda = []
	    let j = dacnt
	    for(; j < this.data.length; j++){
		let d = this.data[j].split(kugiri)
		if(d[4] != index.joutai_list[0])
		    continue
		let flag = false
		let hi2 = d[5].substr(0, 8)
		if(hi2 > hi1){
		    dacnt = j
		    break
		}else if(hi2 == hi1){
		    let sd = ''
		    for(let k = 6; k <= 13; k++){
			if(d[k] != ''){
			    sd += d[k]+' '
			    flag = true
			}
		    }
		    if(flag){
			sd = sd.trimEnd()
			sd = `<button class="c1" onClick="etsuran.rireki('${d[0]}', 0)">\
${d[5].substr(9, 2)}:${d[5].substr(11, 2)}</button>`+sd
			sd += '<br>'
			sda.push(sd)
		    }
		}
	    }
	    if(j == this.data.length)
		dacnt = this.data.length

	    //if(sda.length != 0 && !s.endsWith('<br>'))
		//s += '<br>'
	    let s1 = '<button class="c" style="color: #'
	    switch(c.day){
	    case 0: s1 += 'ff0000'; break
	    case 3: s1 += '00aa00'; break
	    case 6: s1 += '0000ff'; break
	    }
	    s1 += `;" onClick=etsuran.hizuke("${hi1}")>${c.date}${c.day_str()}</button>`
	    if(sda.length != 0){
		s1 += '<br>'
		for(let k = 0; k < sda.length; k++)
		    s1 += sda[k]
	    }
	    //if(c.day == 0 && !s1.endsWith('<br>'))
		//s1 += '<br>'
	    s += s1
	    c.add_date(1)
	}
	index.div.innerHTML = s
    }

    heikin(){
	let s =
`移動平均当日まで <button class="c1"
onClick="index.top()">top</button>\ <button class="c1"
onClick="etsuran.top()">閲覧</button>\ <table border="1"><tr><td>日付
</td><td>__1月</td><td>__1年</td><td>_経費</td><td>_通常</td></tr>`
	// key:key,value:種類(新規 削除 変更),元key,登録日時,状態,日時,件1,件2,区1,区2,区3,区4,区5,区6
        //     0         1                    2     3        4    5    6   7   8   9   10  11  12  13
	let dcount = 0
	let tsuujoua = []
	let c = this.cal_move
	c.now()
	//c.add_date(1)
	let hinow1 = c.get_str().substr(0, 8)
	c.set_s(this.data[0].split(kugiri)[5])
	let sa = []
	let flag = true
	while(flag){
	    let hi1s = c.get_str()
	    let hi1 = hi1s.substr(0, 8)
	    let tsuujou = 0
	    let keihi = 0
	    let j = dcount
	    for(; j < this.data.length; j++){
		let d = this.data[j].split(kugiri)
		let hi2 = d[5].substr(0, 8)
		if(hi2 > hinow1)
		    flag = false
		if(hi2 == hi1){
		    if(d[4] == index.joutai_list[1]){ // 1:通常
			let t1 = parseInt(d[6])
			if(t1 != NaN)
			    tsuujou += t1
		    }
		    if(d[4] == index.joutai_list[2]){ // 2:経費
			let t1 = parseInt(d[6])
			if(t1 != NaN)
			    keihi += t1
		    }
		}else if(hi2 > hi1){
		    dcount = j
		    tsuujoua.push(tsuujou)
		    let tm = 0, nm = 30, tn = 0, n = 365
		    for(let i = 0; i < tsuujoua.length; i++){
			if(i >= tsuujoua.length-nm)
			    tm += tsuujoua[i]
			if(i >= tsuujoua.length-n)
			    tn += tsuujoua[i]
		    }
		    tm /= nm
		    tm = Math.floor(tm)
		    if(n > tsuujoua.length)
			n = tsuujoua.length
		    tn /= n
		    tn = Math.floor(tn)
		    sa.push(
`<tr><td>${hi1s.substr(4, 2)}/${hi1s.substr(6, 2)} ${hi1s.substr(-1, 1)}</td>\
<td>${tm}</td><td>${tn}</td><td>${keihi}</td><td>${tsuujou}</td></tr>`)
		    break
		}else{ // 有り得ないはず
		    alert('論理エラーのため中断')
		    flag = false
		    break
		}
	    }
	    if(j >= this.data.length)
		break
	    c.add_date(1)
	}
	sa.reverse()
	s += sa.join('')
	s += '</table>'
	index.div.innerHTML = s
    }
    
    all(){
	let cs = this.cal_fix.get_str()
	let hi1 = cs.substr(0, 8)
	let flag = true
	let s = `<button class="c1" onClick="etsuran.top()">戻る</button>全て ${cs}から<br>`
	for(let i = 0; i < this.data.length; i++){
	    let d = this.data[i].split(kugiri)
	    if(flag){
		if(d[5].substr(0, 8) < hi1)
		    continue
		flag = false
	    }
	    if(d[4] != index.joutai_list[0])
		continue
	// key:key,value:種類(新規 削除 変更),元key,登録日時,状態,日時,件1,件2,区1,区2,区3,区4,区5,区6
        //     0         1                    2     3        4    5    6   7   8   9   10  11  12  13
	    let t = d[5]
	    s +=
`${t.substr(0, 4)}/${t.substr(4, 2)}/${t.substr(6, 2)} ${t.substr(-1, 1)} \
${t.substr(9, 2)}:${t.substr(11, 2)} \
${d[8]} ${d[9]} ${d[6]} ${d[7]} ${d[10]} ${d[11]} ${d[12]} ${d[13]}<br>`
	}
	index.div.innerHTML = s
    }
    
    hihen(){
	calendar.set_a(this.cal_move.get())
	index.top()
    }
    
    hizuke_zenjitsu(){
	let c = this.cal_move
	c.add_date(-1)
	this.hizuke(c.get_str().substr(0, 8))
    }
    
    hizuke_yokujitsu(){
	let c = this.cal_move
	c.add_date(1)
	this.hizuke(c.get_str().substr(0, 8))
    }
    
    hizuke_current(){
	this.hizuke(calendar.get_str().substr(0, 8))
    }
    
    hizuke(hi1){
	this.param_modoru = hi1
	let c = this.cal_move
	c.set(parseInt(hi1.substr(0, 4)), parseInt(hi1.substr(4, 2)),  parseInt(hi1.substr(6, 2)),
	      c.hour, c.minute)
	let s =
`${c.month}/${c.date} ${youbi[c.day]}\
<button class="c1" onClick="etsuran.hizuke_zenjitsu()">前日</button>\
<button class="c1" onClick="etsuran.hizuke_yokujitsu()">翌日</button>\
<button class="c1" onClick="index.top()">top</button>\
<button class="c1" onClick="etsuran.top()">閲覧</button>\
<button class="c1" onClick="etsuran.hihen()">日変</button>\
<table border="1"><tr><td>_合計</td><td>__件1</td><td>__件2</td>
<td style='text-align: left;'>区1</td>
<td style='text-align: left;'>区他</td><td>時間</td><td>状態</td></tr>`
	let total = 0
	for(let j = 0; j < this.data.length; j++){
	    let d = this.data[j].split(kugiri)
	    if(d[4] == index.joutai_settei)
		    continue
	    let hi2 = d[5].substr(0, 8)
	    if(hi2 > hi1){
		break
	    }else if(hi2 == hi1){
		if(d[4] == index.joutai_list[1]){ // 1:費用
		    let t1 = parseInt(d[6])
		    if(t1 != NaN)
			total += t1
		}
		s += `<tr><td>${total}</td><td>${d[6]}</td><td>${d[7]}</td>`
		let s1 = ''
		for(let i = 8; i < d.length; i++){
		    if(i == 8) // 区1
			continue
		    if(d[i] == '')
			continue
		    s1 += `${d[i]} `
		}
		if(d[8] == ''){
		    s += `<td colspan='2' style='text-align: left;'>${s1}</td>`
		}else{
		    s +=
`<td style='text-align: left;'>
<button class="table" onClick="etsuran.kubun('${d[8]}', 1)">${d[8]}</button></td>
<td style='text-align: left;'>${s1}</td>`
		}
		s +=
`<td><button class="table" onClick="etsuran.rireki('${d[0]}')">
${d[5].substr(9, 2)}:${d[5].substr(11, 2)}</button></td>
<td>${d[4]}</td></tr>`
	    }
	}
	s += '</table>'
	index.div.innerHTML = s
    }

    kubun(ku, no){
	let s =
`<button class="c1" onClick="index.top()">top</button>\
<button class="c1" onClick="etsuran.top()">閲覧</button>\
<button class="c1" onClick="etsuran.modoru()">戻る</button> 区分${no} ${ku}<br>
<table border="1"><tr><td>日付</td><td>__合計</td><td>__件1</td><td>差</td><td>件2</td>
<td style='text-align: left;'>区他</td><td>状態</td></tr>`
	let a = this.data, total = 0, save = 0, sa = 0
	let saa = []
	for(let i = 0; i < a.length; i++){
	    let d = a[i].split(kugiri)
	    // key:key,value:種類(新規 削除 変更),元key,登録日時,状態,日時,件1,件2,区1,区2,区3,区4,区5,区6
	    //     0         1                    2     3        4    5    6   7   8   9   10  11  12  13 
	    //alert(ku3+' '+d)
	    if(d[7+no] != ku)
		continue
	    let hi = `${d[5].substr(4, 2)}/${d[5].substr(6, 2)}${d[5].substr(-1, 1)}`
	    let ken1 = parseInt(d[6])
	    if(isNaN(ken1))
		ken1 = 0
	    total += ken1
	    let ken2 = parseInt(d[7])
	    if(isNaN(ken2))
		ken2 = 0
	    if(save == 0){
		sa = 0
		save = ken2
	    }else if(ken2 == 0){
		sa = 0
	    }else{
		sa = save-ken2
		save = ken2
	    }
	    let s1 = ''
	    for(let j = 8; j < d.length; j++){
		if(j == 8) // 区1
		    continue
		if(d[j] == '')
		    continue
		s1 += `${d[j]} `
	    }
	    saa.push(
`<tr><td>${hi}</td><td>${total}</td><td>${d[6]}</td><td>${sa}</td><td>${d[7]}</td>
<td style='text-align: left;'>${s1}</td><td>${d[4]}</td></tr>`)
	}
	saa.reverse()
	for(let i = 0; i < saa.length; i++)
	    s += saa[i]
	s += '</table>'
	index.div.innerHTML = s
    }

    modoru(){
	this.hizuke(this.param_modoru)
    }
    
    rireki(key, flag=true){
	let s =
`履歴 <button class="c1" onClick="index.henkou_set('-1')">top</button>\
<button class="c1" onClick="etsuran.top()">閲覧</button>`
	if(flag)
	    s += '<button class="c1" onClick="etsuran.modoru()">戻る</button>'
	s +=
`<button class="c1" onClick="etsuran.henkou('${key}')">変更</button>\
<button class="c1" onClick="etsuran.sakujo('${key}')">削除</button><br>`
	while(key != ''){
	    let v = data.get_val_raw(key)
	    s += `${key}${kugiri}${v}<br>`
	    key = v.split(kugiri)[1] // [0]が変更かどうかチェックしていない。
	}
	index.div.innerHTML = s
    }

    henkou(key){
	index.henkou_set(key)
    }
    
    sakujo(key){
	if(!confirm(`${key},${data.get_val_raw(key)}\nを削除します。よろしいですか?。`)){
	    alert('何もせずに終了します。')
	    return
	}
	data.delete(key)
	etsuran.top()
    }
}
