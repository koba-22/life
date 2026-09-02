/*
globalに使うものは全てここに。
*/

const youbi = '日月火水木金土'
const kugiri = ','

let calendar = null
let data = null
let index = null
let number = null
let kubun = null
let nichiji = null
let etsuran = null

function common_onload(){
    calendar = new Calendar()
    data = new Data() // localStorageの全データの読み込み。
    index = new Index()
    number = new Number()
    kubun = new Kubun()
    nichiji = new Nichiji()
    etsuran = new Etsuran()
    index.top()
}

function get_sorted_data(){
    let da = data.get_all()
    da.sort(function(a, b){
	let at = a.split(kugiri)[5], bt = b.split(kugiri)[5]
	if(at > bt){
	    return 1
	}else if(at < bt){
	    return -1
	}else{
	    return 0
	}
    })
    return da
}

function get_reversed_data(){
    let da = data.get_all()
    da.sort(function(a, b){
	let at = a.split(kugiri)[5], bt = b.split(kugiri)[5]
	if(at > bt){
	    return -1
	}else if(at < bt){
	    return 1
	}else{
	    return 0
	}
    })
    return da
}

function a0(n){ // add 0
    return `0${n}`.slice(-2)
}

function a00(n){ // add 00
    return `00${n}`.slice(-3)
}
