class Calendar{
    constructor(){
	this.now()
    }

    now(){
	this.d = new Date()
	this._set()
    }

    _set(){
	this.year = this.d.getFullYear()
	this.month = this.d.getMonth()+1
	this.date = this.d.getDate()
	this.day = this.d.getDay() // 0:日-6:土
	this.hour = this.d.getHours()
	this.minute = this.d.getMinutes()
    }

    _get_last(month){
	switch(month){
	case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31
	case 2: return 28
	}
	return 30
    }

    day_str(){
	return youbi[this.day]
    }

    get_str(){ // 20220914-0900-水
	return `${this.year}${a0(this.month)}${a0(this.date)}-\
${a0(this.hour)}${a0(this.minute)}-${this.day_str()}`
    }

    set(year, month, date, hour, minute){
	this.d = new Date(year, month-1, date, hour, minute, 0)
	this._set()
    }

    set_a(a){
	this.set(a[0], a[1], a[2], a[3], a[4])
    }

    set_s(s){
	this.set(parseInt(s.substr(0, 4)), parseInt(s.substr(4, 2)), parseInt(s.substr(6, 2)),
		 parseInt(s.substr(9, 2)), parseInt(s.substr(11, 2)))
    }
    
    get(){
	return [this.year, this.month, this.date, this.hour, this.minute, this.day]
    }

    add_date(n){
	this.d.setTime(this.d.getTime()+n*24*60*60*1000)
	this._set()
    }

    add_month(n){
	let ay = n/12
	ay = (ay > 0) ? Math.floor(ay) : Math.ceil(ay)
	let am = n%12
	let m = this.month+am
	if(m > 12){
	    ay++
	    m -= 12
	}
	if(m <= 0){
	    ay--
	    m += 12
	}
	let ld = this._get_last(m)
	if(this.date > ld)
	    this.date = ld  
	this.set(this.year + ay, m, this.date, this.hour, this.minute)
    }

    month_last(){
	this.add_month(1)
	this.set(this.year, this.month, 1, this.hour, this.minute)
	this.add_date(-1)
    }

    month_first(){
	this.set(this.year, this.month, 1, this.hour, this.minute)
    }
}
