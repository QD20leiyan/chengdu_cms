$(function() {
	$(".zzyl").hover(function() {
		$(".mdzs").stop().show();
	}, function() {
		$(".mdzs").stop().hide();
	});

	$(".mdzs").hover(function() {
		$(this).stop().show();
	}, function() {
		$(this).stop().hide();
	});
	//当导航条的固定
	var navcount = 0; //顶部变小动画只执行一次
	$(window).scroll(function() {
		var scrTop = $(document).scrollTop();
		if(scrTop > 50) {
			$(".topLogo").hide();
			$(".toplogo").hide();
			$(".sales-tel,.language").hide();
			$("#topBar").addClass("h-fix");
			navcount++;
			if(navcount == 1) {
				$(".topBoxlist,.topBox,.topBar,.topSlide,.on,.navbar").css({
					"height": "0"
				});
				$("topBoxlist,.topBox,.topBar,.topSlide,.on,.navbar").stop().animate({
					"height": "50"
				});
			}
			$(".topBoxlist").css({
				"float": "left"
			});
			$(".suspend-height").addClass("suspend");

		} else if(scrTop < 50) {
			navcount = 0;
			$(".topLogo").show();
			$(".toplogo").show();
			$(".sales-tel,.language").show();
			$("#topBar").removeClass("h-fix");
			$(".topBox,.topBar,.topSlide,.on,.navbar").css({
				"height": "100"
			});
			$(".topBoxlist").css({
				"height": "100",
				"float": "right"
			});
			$(".suspend-height").removeClass("suspend");
		}
	});
	//二级导航的显示隐藏
	$(".yingjian-zhizao").mouseover(function() {
		$("#hardworkNav-2").show();
	});
	$(".hardworkNav").mouseover(function() {
		$("#hardworkNav-2").show();
	});
	$(".hardworkNav").mouseleave(function() {
		$("#hardworkNav-2").hide();
	});

	$(".yingjian-zhizao").mouseleave(function() {
		$("#hardworkNav-2").hide();
	});
});