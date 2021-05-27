var pg = 4; 	//стартовый слайд (первый считается с нуля)
	var step = 30; 	//скорость перелистывания
	var k_rw = 0.7;  	//ускорение перемотки
	var v_rw;
	var count= 0;
	var slides_qt;
	var rw_fl = true;
	var stp;
	var mooving;

function switch_on (pg){
		var o = 0;
		document.getElementById("slide" + pg).style.opacity = 0;
		document.getElementById("slide" + pg).style.left = 0;
		var op = setInterval( function(){
						document.getElementById("slide" + pg).style.opacity = o;
						if (o >= 1) {			
						clearInterval(op); 						
						}
						o = o + 0.01;
					}, 10)
}


function init() {
	if (typeof slide0 === "undefined"){
		var slideList = [
			'1.jpg'
			,'3.jpg'
			,'4.jpg'
			,'5.jpg'
			,'6.jpg'
			,'7.jpg'
			,'8.jpg'
			,'9.jpg'
			,'10.jpg'
			,'12.jpg'
			,'15.jpg'
			,'16.jpg'
			,'17.jpg'
			,'18.jpg'
			,'19.jpg'
			,'20.jpg'
			,'13.jpg'
			,'14.jpg'			
			,'2.jpg'
			,'21.jpg'
			,'22.jpg'
			,'23.jpg'
			,'24.jpg'
			,'25.jpg']; 				//перечень слайдов. Можно хоть 100 и более. Одноимённое нажатие на св.диод листает на +10шт

		pg = pg % slideList.length;  			//корректировка в случае выхода стартового pg из диапазона
		var k = 0;
		var div;
		for (i of slideList){				//установка слайдов на страницу
	
			div = document.createElement('div');
			div.id = "slide" + k;
			div.className = "slide";
			div.innerHTML = div.id;
			scr.prepend(div);
			document.getElementById(div.id).style.left = "100%"
			document.getElementById(div.id).style.backgroundImage = 'url("' + i + '")';
			
			if (k < 10) 
			{	div = document.createElement('div');				//зажигание светодиодов
				div.className = (k === pg ? "point point_r" : "point");
				div.id = "led" + k;
				div.setAttribute("onclick", "re_w_on("+k+")");
				leds.append(div);				
			}
			
			k++;
		 }
		
		slides_qt = document.querySelectorAll('.slide').length; 	 //установилось столько слайдов
		if (slides_qt < 10 && slides_qt%2 != 0)
		{	div = document.createElement('div');			
			div.className = "point";
			div.id = "point_off";			
			leds.append(div);
		}
		switch_on(pg);
		
	}

}





function re_w_on(tg_pg){
	if (mooving != undefined){return;}
	v_rw=1;
	if (tg_pg === (pg%10) && pg + 10 < slides_qt){tg_pg = pg + 10}
	re_wind(tg_pg);
}

function re_wind (tg_pg){
	if (mooving != undefined || count != 0 || !document.getElementById("slide1")||tg_pg === pg) {return;}	
	if (v_rv = 1 && Math.abs(tg_pg - pg) < 2) {
		null;
	}else{
		tg_pg = (tg_pg % slides_qt + slides_qt) % slides_qt; 	 	//установка номера слайда в диапазон
		if (tg_pg === pg) {return;}
		v_rw = Math.abs(tg_pg - pg)*k_rw;				 //начальная скорость перемотки		
	}
	drc = (tg_pg - pg)/Math.abs(tg_pg - pg); 				//направление перемотки
	var shift;                                                		// шаг смещения слайда
	new_pg = (pg % slides_qt + drc + slides_qt) % slides_qt;  		// номер нового слайда
	var start = Date.now();	
	var slide_cur = document.getElementById("slide" + pg); 
	var slide_new = document.getElementById("slide" + new_pg);
	mooving = setInterval( function(){		

		count = (Date.now() - start)/100;
		shift = -count*step*drc*v_rw;	
		slide_new.style.left = drc*100 + shift + "%";
		slide_cur.style.left = 0 + shift + "%";
		if (Math.abs(shift) >= 100) {
			count = 0;		
			clearInterval(mooving); mooving = undefined; 
			document.getElementById("slide" + new_pg).style.left = "0%"; //выравнивание слайда при некратности шагов
			document.getElementById("led" + pg%10).className = "point";
			pg = new_pg;
			if ((pg - pg%10) > 0) {document.getElementById("led" + pg%10).className = "point point_o";}
			else{document.getElementById("led" + pg%10).className = "point point_r";}
			if (tg_pg != pg){re_wind (tg_pg)}				
		}		
						}, 1);
}



function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = function(){
			document.getElementById("main").style.visibility = 'visible';
			sleep(2000).then(() => {
			init();
		});
}