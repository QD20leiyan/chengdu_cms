//新闻对应内容显示
$(".news_box .hd ul li").hover(function(){
	var index=$(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});
