class Index{
    // key:key,value:種類(新規 削除 変更),元key,登録日時,状態,日時,件1,件2,区1,区2,区3,区4,区5,区6
    //     0         1                    2     3        4    5    6   7   8   9   10  11  12  13 
    // key:key,value:種類(新規 削除 変更),元key,登録日時,設定,日時,設定値リスト,,,,,,,
    //     0         1                    2     3        4    5    6

    constructor(){
	this.div = document.getElementById('index')
	// this.joutai_list = ['予定', '費用', 'メモ'] // 2023.03.21に廃止。
	this.joutai_list = ['予定', '通常', '経費', 'メモ']
	this.joutai = this.joutai_list[0]
	this.ken = ['', ''] // 要件 内容 金額
	this.keni = 0
	this.ku = ['', '', '', '', '', '']
	this.kui = 0
	this.joutai_settei = '設定'
	this.setteichi_kugiri = '|'
	this._set_setteichi()
	this.prev_touroku = ''
	this.henkou_key = -1
    }

    _set_setteichi(){
	this.max_hyouji = 500
	this.max_shutsuryoku = 500
	let a = data.get_all()
	a.reverse()
	for(let i = 0; i < a.length; i++){
	    let b = a[i].split(kugiri)
	    if(b[4] == this.joutai_settei){
		let c = b[6].split(this.setteichi_kugiri)
		this.max_hyouji = parseInt(c[0])
		this.max_shutsuryoku = parseInt(c[1])
		return
	    }
	}
    }

    _clear_nyuuryokuchi(){
	let i
	this.joutai = this.joutai_list[0]
	for(i = 0; i < this.ken.length; i++)
	    this.ken[i] = ''
	this.keni = 0
	for(i = 0; i < this.ku.length; i++)
	    this.ku[i] = ''
	this.kui = 0
    }

    shochi(){
	this._clear_nyuuryokuchi()
	this.top()
    }
    
    top(){
	let henkou_button = '<button '
	if(this.henkou_key == -1)
	    henkou_button += 'class="joutai"'
	else
	    henkou_button += 'onClick="index.henkou()"'
	henkou_button += '>変更</button>'
	let s =
`<button onClick="index.touroku()">登録</button>\
<button onClick="etsuran.top()">閲覧</button>\
<button onClick="etsuran.hizuke_current()">日覧</button>\
${henkou_button}\
<button onClick="index.shutsusetsu()">出設</button><br>
<button class="joutai">${this.joutai}</button>\
<button onClick="index.yotei()">予定</button>\
<button onClick="index.tsuujou()">通常</button>\
<button onClick="index.keihi()">経費</button>\
<button onClick="index.memo()">メモ</button><br>
<button class="date" onClick="nichiji.top()">${this.date_str_hyouji()}</button>\
<button onClick="index.ima()">今</button>\
<button onClick="index.shochi()">Clr</button><br>
<button onClick="index.kenf(0)">件１</button>\
<span>${this.ken[0]}</span><br>
<button onClick="index.kenf(1)">件２</button>\
<span>${this.ken[1]}</span><br>
<button onClick="index.kuf(0)">区１</button>\
<span>${this.ku[0]}</span><br>
<button onClick="index.kuf(1)">区２</button>\
<span>${this.ku[1]}</span><br>
<button onClick="index.kuf(2)">区３</button>\
<span>${this.ku[2]}</span><br>
<button onClick="index.kuf(3)">区４</button>\
<span>${this.ku[3]}</span><br>
<button onClick="index.kuf(4)">区５</button>\
<span>${this.ku[4]}</span><br>
<button onClick="index.kuf(5)">区６</button>\
<span>${this.ku[5]}</span>`
	this.div.innerHTML = s
    }

    date_str_hyouji(){
	let s = calendar.get_str() // 20220914-0900-水
	let r = `${s.substr(4,2)}/${s.substr(6,2)} ${s.substr(14)} ${s.substr(9, 2)}:${s.substr(11, 2)}`
	return r
    }

    touroku(){
	if(this._touroku_data())
	    this._etsuran()
    }

    _etsuran(){
	if(this.joutai == this.joutai_list[0]) // 0:予定
	    etsuran.top()
	else // 1:通常 2:経費 3:メモ
	    etsuran.top(true)
    }
    
    _touroku_data(henkou=false){
	let flag = true
	let i
	for(i = 0; i < this.ken.length; i++){
	    if(this.ken[i] != ''){
		flag = false
		break
	    }
	}
	if(flag){
	    for(i = 0; i < this.ku.length; i++){
		if(this.ku[i] != ''){
		    flag = false
		    break
		}
	    }
	}
	if(flag){
	    alert('全ての項目が空なので、登録しないで終了します。')
	    return false
	}
	let s = `${this.joutai}${kugiri}${calendar.get_str()}${kugiri}`
	for(i = 0; i < this.ken.length; i++)
	    s += `${this.ken[i]}${kugiri}`
	for(i = 0; i < this.ku.length; i++)
	    s += `${this.ku[i]}${kugiri}`
	if(this.prev_touroku == s){
	    alert('全ての項目が前回登録したものと同じなので、登録しないで終了します。')
	    return false
	}
	this.prev_touroku = s
	if(henkou)
	    data.change(this.henkou_key, s)
	else
	    data.set(s)
	return true
    }

    henkou_set(k){
	// key:key,value:種類(新規 削除 変更),元key,登録日時,状態,日時,件1,件2,区1,区2,区3,区4,区5,区6
	//     0         1                    2     3        4    5    6   7   8   9   10  11  12  13
	this.henkou_key = k
	if(k >= 0){
	    let a = data.get_val_raw(k).split(kugiri)
	    this.joutai = a[3] // -1する。aはvalueなので。
	    for(let i = 0; i < this.ken.length; i++)
		this.ken[i] = a[5+i]
	    for(let i = 0; i < this.ku.length; i++)
		this.ku[i] = a[7+i]
	    calendar.set_s(a[4])
	}
	this.top()
    }
    
    henkou(){
	let s1 = `${this.henkou_key}${kugiri}${data.get_val_raw(this.henkou_key)}`
	let flag = this._touroku_data(true)
	this.henkou_key = -1
	if(flag)
	    this._etsuran()
    }
    
    shutsusetsu(){
	let s =
`<form method="post" action="/top/text/save_life">\
<button type="button" onClick="index.top()">top</button>\
<button type="button" onClick="index.settei()">設定</button>\
<button type="button" onClick="index.nyuuryoku()">入力</button>\
<input type="submit" value="送信"><br>
<textarea name="data" rows="40" cols="120" readonly>
${data.get_all_raw().join('\n')}
</textarea>`
	this.div.innerHTML = s
    }

    settei(){
	let s =
/* 古いものは未使用に。起因するバグがあるため。2025.01.02
`<button onClick="index.top()">top</button>\
<button onClick="index.shutsusetsu()">戻る</button><br>
表示件数 <input type="text" size="5" id="max_hyouji" value="${this.max_hyouji}">件<br>
　未使用。2025.01.02<br>
出力件数 <input type="text" size="5" id="max_shutsuryoku" value="${this.max_shutsuryoku}">件<br>
　未使用。2025.01.02<br>
<button onClick="index.settei_save()">設定値を保存</button><br>
`
*/
`<button onClick="index.top()">top</button>\
<button onClick="index.shutsusetsu()">戻る</button><br>
3000以下のidのデータを削除。<br>
(ハードコーディング。)<br>
<button onClick="index.sakujo()">実行</button><br>
`
	this.div.innerHTML = s
    }

    sakujo(){
	data.sakujo(3000)
	alert('3000以下のidのデータを削除しました。')
    }
    
    /* 未使用にしたため。2025.01.02
    settei_save(){
	this.max_hyouji = parseInt(document.getElementById('max_hyouji').value)
	this.max_shutsuryoku = parseInt(document.getElementById('max_shutsuryoku').value)
	let s = `${this.joutai_settei}${kugiri}${calendar.get_str()}${kugiri}\
${this.max_hyouji}${this.setteichi_kugiri}${this.max_shutsuryoku}${kugiri.repeat(7)}`
	data.set(s)
	alert('設定値を保存しました。')
    }
    */

    nyuuryoku(){
	let s =
`<button onClick="index.top()">top</button>\
<button onClick="index.shutsusetsu()">戻る</button>\
<button onClick="index.nyuuryoku_recv()">受信</button>\
<button onClick="index.nyuuryoku_do()">実行</button><br>
実行すると元に戻せません。<br>
全ての既存のデータを削除した後に、<br>
下記の入力データに入れ替えます。<br>
<textarea id="data" rows="40" cols="120">
</textarea>`
	this.div.innerHTML = s
    }

    nyuuryoku_recv(){
	document.getElementById('data').innerHTML = '受信中'
	fetch('/top/text/load_life')
            .then(response => response.text())
            .then(function(text){
		document.getElementById('data').innerHTML = text
	    })
            .catch(function(error){
		document.getElementById('data').innerHTML = `Error message=|${error}|`
	    })
    }

    nyuuryoku_do(){
	let ds = document.getElementById('data').value
	data.set_all_raw(ds)
	this.top()
    }
    
    yotei(){
	this.joutai = this.joutai_list[0]
	this.top()
    }

    tsuujou(){
	this.joutai = this.joutai_list[1]
	this.top()
    }

    keihi(){
	this.joutai = this.joutai_list[2]
	this.top()
    }

    memo(){
	this.joutai = this.joutai_list[3]
	this.top()
    }

    funzou(){
	let a = calendar.get()
	a[4] += 2
	if(a[4] > 59)
	    a[4] = 0
	calendar.set_a(a)
	this.date_str = calendar.get_str()
	this.top()
    }
    
    ima(){
	calendar.now()
	this.date_str = calendar.get_str()
	this.top()
    }

    kenf(i){
	this.keni = i
	number.top(index.kenf_after, this.ken[this.keni])
    }

    kenf_after(v){
	index.ken[index.keni] = v
	index.top()
    }

    kuf(i){
	this.kui = i
	kubun.top(index.kuf_after, this.ku[this.kui], this.kui)
    }

    kuf_after(v){
	index.ku[index.kui] = v
	index.top()
    }
}
