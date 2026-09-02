class Nichiji{
    constructor(){
	this._get_cal()
    }

    _get_cal(){
	let a = calendar.get()
	this.year = a[0]
	this.month = a[1]
	this.date = a[2]
	this.hour = a[3]
	this.minute = a[4]
	this.day = a[5]
    }

    _set_cal(){
	calendar.set(this.year, this.month, this.date, this.hour, this.minute)
    }
    
    top(){
	this._get_cal()
	let s =
`<button onClick="index.top()">戻る</button>\
 ${a0(this.month)}/${a0(this.date)} ${youbi[this.day]}\
 <button class="nichiji" onClick="nichiji.hourf()">${a0(this.hour)}</button>:\
<button class="nichiji" onClick="nichiji.minutef()">${a0(this.minute)}</button>\
 ${this.year}<br>
<button onClick="nichiji.add_minute(-1)">分減</button>\
<button onClick="nichiji.add_minute(1)">分増</button>\
<button onClick="nichiji.change_minute(0)">0分</button>\
<button onClick="nichiji.change_minute(7)">7分</button>\
<button onClick="nichiji.change_minute(14)">14分</button><br>
<button onClick="nichiji.change_minute(21)">21分</button>\
<button onClick="nichiji.change_minute(28)">28分</button>\
<button onClick="nichiji.change_minute(35)">35分</button>\
<button onClick="nichiji.change_minute(43)">43分</button>\
<button onClick="nichiji.change_minute(52)">52分</button><br>
<button onClick="nichiji.add_hour(-1)">時減</button>\
<button onClick="nichiji.add_hour(1)">時増</button>\
<button onClick="nichiji.change_hour(7)">7時</button>\
<button onClick="nichiji.change_hour(9)">9時</button>\
<button onClick="nichiji.change_hour(11)">11時</button><br>
<button onClick="nichiji.change_hour(13)">13時</button>\
<button onClick="nichiji.change_hour(15)">15時</button>\
<button onClick="nichiji.change_hour(17)">17時</button>\
<button onClick="nichiji.change_hour(19)">19時</button>\
<button onClick="nichiji.change_hour(23)">23時</button><br>
<button onClick="nichiji.add_date(-1)">前日</button>\
<button onClick="nichiji.add_date(1)">翌日</button>\
<button onClick="nichiji.add_date(-7)">前週</button>\
<button onClick="nichiji.add_date(7)">翌週</button><br>
<button onClick="nichiji.add_month(-1)">前月</button>\
<button onClick="nichiji.add_month(1)">翌月</button>\
<button onClick="nichiji.gessho()">月初</button>\
<button onClick="nichiji.getsumatsu()">月末</button><br>
<button onClick="nichiji.now()">今</button>\
<button onClick="nichiji.add_month(-12)">前年</button>\
<button onClick="nichiji.add_month(12)">翌年</button><br>`
	index.div.innerHTML = s
    }

    now(){
	calendar.now()
	this.top()
    }

    change_minute(n){
	this.minute = n
	this._set_cal()
	this.top()
    }

    change_hour(n){
	this.hour = n
	this._set_cal()
	this.top()
    }

    add_hour(n){
	this.hour += n
	if(this.hour < 0)
	    this.hour = 23
	if(this.hour > 23)
	    this.hour = 0
	this._set_cal()
	this.top()
    }

    add_minute(n){
	this.minute += n
	if(this.minute < 0)
	    this.minute = 59
	if(this.minute > 59)
	    this.minute = 0
	this._set_cal()
	this.top()
    }

    add_date(n){
	this._set_cal()
	calendar.add_date(n)
	this.top()
    }

    add_month(n){
	this._set_cal()
	calendar.add_month(n)
	this.top()
    }

    gessho(){
	this.date = 1
	this._set_cal()
	this.top()
    }

    getsumatsu(){
	this._set_cal()
	calendar.month_last()
	this.top()
    }

    hourf(){
	number.top(nichiji.hourf_after, nichiji.hour)
    }

    hourf_after(v){
	if(isNaN(v))
	    v = 0
	if(v < 0)
	    v = 0
	if(v > 23)
	    v = 23
	nichiji.hour = v
	nichiji._set_cal()
	nichiji.top()
    }

    minutef(){
	number.top(nichiji.minutef_after, nichiji.minute)
    }

    minutef_after(v){
	if(isNaN(v))
	    v = 0
	if(v < 0)
	    v = 0
	if(v > 59)
	    v = 59
	nichiji.minute = v
	nichiji._set_cal()
	nichiji.top()
    }
}
