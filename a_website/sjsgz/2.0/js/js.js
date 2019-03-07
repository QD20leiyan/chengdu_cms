$(function() {
	var index = 0;
	var $_picn = $(".pic-show ul li").length;
	if($_picn > 1) {
		for(var i = 1; i <= $_picn; i++) {
			var $_span = "<span>" + i + "</span>";
			$(".pic-num").append($_span);
		}
		$(".pic-num span").eq(0).addClass("on");
		$(".pic-show ul li").eq(0).show().siblings(".pic-show ul li").hide();
	}

	function show(index) {
		$(".pic-num span").removeClass("on").eq(index).addClass("on");
		$(".pic-show ul li").eq(index).fadeIn(500).siblings(".pic-show ul li").fadeOut(500);
	}
	var myshow = setInterval(function() {
		show(index);
		index++;
		if(index == $_picn) {
			index = 0;
		}
	}, 3000);
	$(".pic-num span").hover(
		function() {
			if(myshow) {
				clearInterval(myshow);
			}
			index = $(".pic-num span").index(this);
			show(index);
		},
		function() {
			myshow = setInterval(
				function() {
					show(index);
					index++;
					if(index == $_picn) {
						index = 0;
					}
				}, 3000
			);
		}
	);
	$(".pic-show").hover(
		function() {
			if(myshow) {
				clearInterval(myshow);
			}
		},
		function() {
			myshow = setInterval(function() {
				show(index);
				index++;
				if(index == $_picn) {
					index = 0;
				}
			}, 3000);
		}
	);
	$.fn.tab_switch = function() {
		return this.each(function() { //tab导航元素
			$(this).find("ul li").click(function() {
				var index = $(this).index(); //获取当前划过元素的index值
				$(this).find("a").addClass("on").end().siblings().find("a").removeClass("on"); //改变当前状态
				$(".infor").eq(index).css({
					"display": "block"
				}).siblings().css({
					"display": "none"
				}); //切换内容
			})
		})
	}
	$(".js_til").tab_switch();
	$(".gift .close").click(function() {
		$(".gift").hide();
	})
	$(".video a").click(function() {
		$("#video_mask").show();
		$("#video_mask").addClass("ani_mask");
	});
	$("#close").click(function() {
		$("#video_mask").hide();
	});
	setTimeout(function() {
		$(".wrap").addClass("animate");
	}, 100);
	// 浮动
	var $_window = $(window);
	var $main_visual = $('.con');
	var $item_chocobo_01 = $('.peo_box');
	var visualWidth = $main_visual.width();
	$main_visual.mousemove(function(e) {
		var cursorX = e.clientX - $main_visual.offset().left;
		var cursorY = e.clientY - $main_visual.offset().top;
		var i = 0.5;
		$(this).find('.peo').each(function() {
			var item_width = $(this).width();
			var wrapperWidth = $_window.width();
			var wrapperHeight = (wrapperWidth - 0) / 1.26;
			var centerX = wrapperWidth / 2;
			var centerY = wrapperHeight / 2;
			var newLeft = ((cursorX - centerX) * 0.8 / 100);
			var newTop = (cursorY - centerY) * 0.3 / 100;
			$(this).css({
				'transform': 'translate3d(' + newLeft + 'px,' + newTop + 'px, 0)'
			});
		});
		$(this).find('.peo_arrow').each(function() {
			var item_width = $(this).width();
			var wrapperWidth = $_window.width();
			var wrapperHeight = (wrapperWidth - 0) / 1.26;
			var centerX = wrapperWidth / 2;
			var centerY = wrapperHeight / 2;
			var newLeft = ((cursorX - centerX) * (i) / 100) * (-1);
			var newTop = (cursorY - centerY) * (i) / 100 * (-1);
			$(this).css({
				'transform': 'translate3d(' + newLeft + 'px,' + newTop + 'px, 0)'
			});
			i = i * 2;
		});
	});
	
	$(".infor .page li").on("click" , function (){
		$(this).addClass("active").siblings().removeClass("active");
	})
});