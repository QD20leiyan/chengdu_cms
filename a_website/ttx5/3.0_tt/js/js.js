$(function(){
//滚动
    var speed = 20; //数字越大速度越慢
	var tab_image_s = document.getElementById("demo_s");
	var tab1_s = document.getElementById("demo1_s");
	var tab2_s = document.getElementById("demo2_s");
	tab2_s.innerHTML = tab1_s.innerHTML;
	function Marquee() {
		if (tab2_s.offsetWidth - tab_image_s.scrollLeft <= 0)
			tab_image_s.scrollLeft -= tab1_s.offsetWidth
		else {
			tab_image_s.scrollLeft++;
		}
	}
	var MyMar = setInterval(Marquee, speed);
	tab_image_s.onmouseover = function() {
		clearInterval(MyMar)
	};
	tab_image_s.onmouseout = function() {
		MyMar = setInterval(Marquee, speed)
	};
})