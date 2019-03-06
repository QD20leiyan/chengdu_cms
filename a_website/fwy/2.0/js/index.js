//鼠标悬浮出来微信二维码
$(".nav_ul li:nth-child(1)").hover(function() {
	$(".wx_ewm").stop().fadeIn();
}, function() {
	$(".wx_ewm").stop().fadeOut();
});
//滚动屏幕出现回到顶部按钮
$(window).scroll(function() {
	var scroll = $(this).scrollTop();
	if(scroll > 400) {
		$(".back_top").stop().fadeIn();
	} else {
		$(".back_top").stop().fadeOut();
	}
	if(scroll > 100) {
		$(".white").css({
			"opacity": .1,
			"z-index": 10
		});
	}
	if(scroll > 200) {
		$(".white").css({
			"opacity": 0.2
		});
	}
	if(scroll > 300) {
		$(".white").css({
			"opacity": 0.3
		});
		$(".news_title").addClass("fadeInUp");
	}
	if(scroll > 400) {
		$(".white").css({
			"opacity": 0.4
		});
		$(".f_content").addClass("fadeInUp");
	}
	if(scroll > 500) {
		$(".white").css({
			"opacity": 0.5
		});
	}
	if(scroll > 600) {
		$(".white").css({
			"opacity": 0.6
		});
	}
	if(scroll > 700) {
		$(".white").css({
			"opacity": 0.7
		});
	}
	if(scroll > 800) {
		$(".white").css({
			"opacity": 0.8
		});
	}
	if(scroll > 900) {
		$(".white").css({
			"opacity": .9
		});
	}
	if(scroll > 1100) {
		$(".label").addClass("fadeInUp");
	}
	if(scroll > 1200) {
		$(".int_ul").addClass("fadeInUp");
		$(".m_tab").addClass("fadeInUp");
	}
	if(scroll > 1700) {
		$(".v_title").addClass("fadeInUp");
	}
	if(scroll > 1800) {
		$(".last_ul").addClass("fadeInUp");
	}
	if(scroll > 1900) {
		$(".last_div").addClass("fadeInUp");
	}
	if(scroll > 2300) {
		$(".c_qudao").addClass("fadeInUp");
	}
});
//点击切换新闻列表
$(".title_ul li").click(function() {
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".news_div ul").eq(index).addClass("active").siblings().removeClass("active");
});
//点击切换视频图片列表
$(".last_ul li").click(function() {
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".last_div>div").eq(index).addClass("active").siblings().removeClass("active");
});
//侠客介绍模块点击切换
$(".int_ul li").click(function() {
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".m_tab>div").eq(index).addClass("active").siblings().removeClass("active");
});
//性别切换
$(".tab_person li").click(function() {
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(this).parent().parent().next().children().children().eq(index).addClass("active");
	$(this).parent().parent().next().children().children().eq(index).siblings().removeClass("active");
});
//点击返回顶部
$(".back_top").click(function() {
	$("html,body").animate({
		scrollTop: 0
	}, 500);
});
var clickTap = true;
//点击浮窗缩进
$(".shensuo").click(function() {
	if(clickTap) {
		$(".float").css("right", "-175px");
		$(".float").addClass("active");
		clickTap = false;
	} else {
		$(".float").css("right", "0");
		$(".float").removeClass("active");
		clickTap = true;
	}
});
//点击小图查看大图
//$(".img_banner ul li").click(function (){
//	var src = $(this).find("img").attr("src");
//	$(".z_img").attr("src" , src);
//	$(".big_img").stop().fadeIn();
//});
$(".close").click(function() {
	$(".z_img").attr("src", "");
	$(".big_img").hide();
});
//点击导航跳转对应模块
$('.nav_list li').click(function() {
	if($(this).attr('data-index') == 1) {
		$("html,body").animate({
			scrollTop: 0
		}, 1000);
	} else if($(this).attr('data-index') == 2) {
		$("html,body").animate({
			scrollTop: 905
		}, 1000);
	} else if($(this).attr('data-index') == 3) {
		$("html,body").animate({
			scrollTop: 1700
		}, 1000);
	} else if($(this).attr('data-index') == 4) {
		$("html,body").animate({
			scrollTop: 2500
		}, 1000);
	}
})
$(function() {
	var mySwiper = new Swiper(".left_banner", {
		loop: true,
		autoplay: 3000,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplayDisableOnInteraction: false,
	});
	var mySwiper01 = new Swiper(".img_banner", {
		effect: "coverflow",
		speed: 1500,
		prevButton: ".wgam_prev",
		nextButton: ".wgam_next",
		centeredSlides: !0,
		slidesPerView: 3,
		loop: !0,
		observer: !0,
		observeParents: !0,
		slideToClickedSlide: !0,
		simulateTouch : false,
		autoplayDisableOnInteraction: false,
		coverflow: {
			rotate: 0,
			stretch: -100,
			depth: 400,
			modifier: 1,
			slideShadows: false
		},
	});
	$(".img_banner ul li").click(function (){
		var src = $(this).find("img").attr("src");
		$(".z_img").attr("src" , src);
		$(".big_img").stop().fadeIn();
	});
	var mySwiper02 = new Swiper(".video_banner", {
		effect: "coverflow",
		speed: 1500,
		prevButton: ".wgam_prev01",
		nextButton: ".wgam_next01",
		centeredSlides: !0,
		slidesPerView: 3,
		loop: !0,
		observer: !0,
		simulateTouch : false,
		observeParents: !0,
		autoplayDisableOnInteraction: false,
		coverflow: {
			rotate: 0,
			stretch: -100,
			depth: 400,
			modifier: 1,
			slideShadows: false
		}
	});
});