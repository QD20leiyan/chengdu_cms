
if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
	new WOW().init();
};

window.onload = function(){
	setTimeout(function(){
		$('body,html').animate({scrollTop:0},0);
	},20);
	//事件
	$(".topSlide").hover(function(){
		$(".topSlidebox").css({
			display: "block"
		}) 
	},function(){
		$(".topSlidebox").css({
			display: "none"
		}) 
	}) 
}