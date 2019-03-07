$(function() {
	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		autoplay: 2000,
		simulateTouch: false,
		// 如果需要分页器
		pagination: '.swiper-pagination',
		paginationClickable: true,
		// 如果需要前进后退按钮
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
	});
	//tab切换
	$(".main_pic a li").hover(function() {
		$(this).addClass("active").siblings().removeClass("active");
		$(this).children(".firstp").css("color", "#d9b47d");
		$(this).stop().animate({
			top: "50px"
		}, 500);
	}, function() {
		$(this).removeClass("active");
		$(this).children("a .firstp").css("color", "#fff");
		$(this).stop().animate({
			top: "0px"
		}, 500);
	});
	//tab切换
	$(".right_sl div").on("click", function() {
		var index = $(this).index();
		$(".tab img").eq(index).addClass("down").siblings().removeClass("down");
	});
	
	$(".right_sl div").hover(function (){
		$(this).addClass("active").siblings().removeClass("active");
	},function (){
		
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
	$(".xuanzhong").click(function (){
		$(this).attr("src","jjzd_zh/xuanzhong01.png");
		$('.weixuanzhong').attr("src","jjzd_zh/weixuanzhong01.png");
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
	
	$(".weixuanzhong").click(function (){
		$(this).attr("src","jjzd_zh/xuanzhong02.png");
		$(".xuanzhong").attr("src","jjzd_zh/weixuanzhong02.png");
	})
	//当导航条的固定
	var navcount = 0; //顶部变小动画只执行一次
	$(window).scroll(function() {
		var scrTop = $(document).scrollTop();
		if(scrTop > 50) {
			$(".topLogo").hide();
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
})