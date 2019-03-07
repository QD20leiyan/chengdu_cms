$(".section3-feature-ul li a").hover(function() {
	$(this).parent("li").addClass("active").siblings().removeClass("active");
});

//弹框的显示与关闭
$(".detail_btn").click(function(){
	$(".tips").removeClass("hidden");
	$(".tips>div>div>img").addClass("hidden");
	$(".tips>div>div>img:eq("+mySwiper.realIndex+")").removeClass("hidden");
});
$(".close").click(function(){
	$(".tips").addClass("hidden");
});