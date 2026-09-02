/*
localStorage: 書いたものは変更しないという方針。
key: id。0からの整数の通番。
val: shurui,元key,登録日時(分まで曜日),データ
shurui: 新規 削除 変更
元key: 新規の時は空欄
登録日時(分まで曜日): 20220914-0800-水
データ: ユーザ任せ
*/
class Data{
    constructor(){
	this.data = []
	this.key_max = -1
	this.shurui = ['新規', '削除', '変更']
	this.cal = new Calendar()
	this.init()
    }

    init(){
	this.data = []
	this.key_max = -1
	let ka = []
	let ls = window.localStorage
	let i
	for(i = 0; i < ls.length; i++){
	    let k = parseInt(ls.key(i))
	    if(k > this.key_max)
		this.key_max = k
	    ka.push(k)
	}
	ka.sort((a, b) => a - b) // sort。数値でsortしたい場合、比較関数を指定する必要有り。
	for(i = 0; i < ka.length; i++){
	    let k = ka[i], v = ls.getItem(k), a = v.split(kugiri)
	    if(a[0] == this.shurui[0]){ // 0:新規
		this.data.push(`${k}${kugiri}${v}`)
	    }else{ // 1:削除 2:変更
		let id = a[1]
		for(let j = this.data.length-1; j >= 0; j--)
		    if(this.data[j].indexOf(id) == 0)
			this.data.splice(j, 1)
		if(a[0] == this.shurui[2]) // 2:変更
		    this.data.push(`${k}${kugiri}${v}`)
	    }
	}
    }

    sakujo(max_key){
	let ka = []
	let ls = window.localStorage
	let i
	for(i = 0; i < ls.length; i++){
	    ka.push(parseInt(ls.key(i)))
	}
	ka.sort((a, b) => a - b)
	for(i = 0; i < ka.length; i++){
	    if(ka[i] > max_key)
		break
	    ls.removeItem(ka[i])
	}
	this.init()
    }
    
    get_val_raw(key){
	return window.localStorage.getItem(key)
    }
    
    get_all_raw(){
	let ls = window.localStorage
	let ka = []
	let i
	for(i = 0; i < ls.length; i++)
	    ka.push(parseInt(ls.key(i)))
	ka.sort((a, b) => b - a) // reverse sort。
	let ra = []
	for(i = 0; i < ka.length; i++){
	    let k = ka[i]
	    ra.push(`${k}${kugiri}${ls.getItem(k)}`)
	}
	return ra
    }

    get_all(){
	return this.data.slice()
    }
    
    set_all_raw(all_formated_text){
	let ls = window.localStorage
	if(!confirm('全てのデータを削除後に入れ替えます。\nよろしいですか?。')){
	    alert('何もせずに終了します。')
	    return
	}
	ls.clear()
	if(all_formated_text != ''){
	    let a = all_formated_text.split('\n')
	    for(let i = 0; i < a.length; i++){
		let s = a[i]
		let kl = s.indexOf(kugiri)
		if(kl == -1)
		    break
		let k = s.substr(0, kl)
		let v = s.substr(kl+1)
		ls.setItem(k, v)
	    }
	}
	this.init()
    }

    make_key(){
	this.key_max++
	return this.key_max
    }

    set(s){
	let v = this.shurui[0] + kugiri + kugiri + this._now_str() + kugiri + s
	let k = this.make_key();
	window.localStorage.setItem(k, v)
	this.init()
    }

    _now_str(){
	this.cal.now()
	return this.cal.get_str()
    }
    
    delete(k){
	let ls = window.localStorage
	if(ls.getItem(k) == null){
	    alert(`キー ${k} が有りませんでした。何もせずに終了します。`)
	    return
	}
	let v = `${this.shurui[1]}${kugiri}${k}${kugiri}${this._now_str()}`
	ls.setItem(this.make_key(), v)
	this.init()
    }

    change(k, s){
	let ls = window.localStorage
	if(ls.getItem(k) == null){
	    alert(`キー ${k} が有りませんでした。何もせずに終了します。`)
	    return
	}
	let v = `${this.shurui[2]}${kugiri}${k}${kugiri}${this._now_str()}${kugiri}${s}`
	ls.setItem(this.make_key(), v)
	this.init()
    }
}
