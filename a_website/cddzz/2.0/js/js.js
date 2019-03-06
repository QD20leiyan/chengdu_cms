$(function() {
	$(".validate_c_close").click(function() {
		$(".tel_test_c_mask").hide();
	})
	$(".order_btn_c").click(function() {
		$(".tel_test_c_mask").show();
		$(".tel_test_success_c_mask").hide();
		$(".tel_test_validate_mask").hide();
	})
	$(".tel_test_validate_close").click(function() {
		$(".tel_test_validate_mask").hide();
	})
	$(".android_c").click(function() {
		$(".android_c").attr('class', 'android_change');
		$(".ios_c").attr('class', 'ios_change');
	})
	$(".ios_c").click(function() {
		$(".android_change").attr('class', 'android_c');
		$(".ios_change").attr('class', 'ios_c');
	})
	$(".plat_c i").on("click", function() {
		$(this).addClass("on").end().siblings().removeClass("on")
	})

	$(".wx").hover(function() {
		$(".ewm").stop().fadeIn();
	}, function() {
		$(".ewm").stop().fadeOut();
	})

	// 浮动
	var $_window = $(window);
	var $main_visual = $('#wrap');
	var itemLi = $main_visual.find('.move_item');
	var visualWidth = $main_visual.width();
	$main_visual.mousemove(function(e) {
		var cursorX = e.clientX - $main_visual.offset().left;
		var cursorY = e.clientY - $main_visual.offset().top;
		var i = 0.5;
		$(this).find('.move_item').each(function() {
			var item_width = $(this).width();
			var wrapperWidth = $_window.width();
			var wrapperHeight = (wrapperWidth - 0) / 1.26;
			var centerX = wrapperWidth / 2;
			var centerY = wrapperHeight / 2;
			var newLeft = ((cursorX - centerX) * (i) / 30) * (-1);
			var newTop = (cursorY - centerY) * (i) / 30 * (-1);
			$(this).css({
				'transform': 'translate3d(' + newLeft + 'px,' + newTop + 'px, 0)'
			});
			i = i * 2;
		});
	});

	$(".app").click(function() {
		alert("敬请期待");
	})

	$(".video").click(function() {
		$(".video_mask").show();
		$(".video_bg").show();
		$(".mask").show();
	});
	
	$("#close").click(function() {
		$(".mask").hide();
		$(".video_mask").hide();
	});
	
	$(".close_bg").click(function (){
		$(".video_bg").hide();
		$(".mask").hide();
	});
	
//	$(".blue").animate({
//		left : "260px"
//	},1500);
//	
//	$(".red").animate({
//		right : "-217px"
//	},3000);
//	
//	$(".moving_item_nv").animate({
//		bottom : "120px"
//	},4000);
	
})