$(function() {
	//tab切换
	$(".right_sl div").on("click", function() {
		var index = $(this).index();
		$(".tab img").eq(index).addClass("down").siblings().removeClass("down");
	});

	$(".right_xz div").hover(function() {
		$(this).addClass("active").siblings().removeClass("active");
	}, function() {

	});

	$(".xuanzhong").hover(function() {
		$(this).stop().animate({
			top: "-86px"
		});
	}, function() {
		$(this).stop().animate({
			top: "-76px"
		});
	});
	$(".xuanzhong").click(function() {
		$(this).attr("src", "jjzd_zh/xuanzhong01.png");
		$('.weixuanzhong').attr("src", "jjzd_zh/weixuanzhong01.png");
	});

	$(".weixuanzhong").hover(function() {
		$(this).stop().animate({
			top: "257px"
		});
	}, function() {
		$(this).stop().animate({
			top: "267px"
		})
	});

	$(".weixuanzhong").click(function() {
		$(this).attr("src", "jjzd_zh/xuanzhong02.png");
		$(".xuanzhong").attr("src", "jjzd_zh/weixuanzhong02.png");
	})
})