// 二维码
$(".wp_con .weixin").click(function() {
	$(".wp_con .ewm").fadeIn();
	$(".wx_tc").removeClass("hidden");
})
$(".wx_tc").click(function() {
	$(".wp_con .ewm").fadeOut();
	$(".wx_tc").addClass("hidden");
})
$(".news_title").find('li').click(function() {
	if($(this).hasClass('active')) {
		return;
	}
	var index2 = parseInt($(this).attr('data-index'));
	$('.news_title').find('li').removeClass('active');
	$(this).addClass('active');
	$('.news_info').find('li.news_main').removeClass('active');
	$('.news_info').find('li.news_main').eq(index2).addClass('active');
});
var mySwiper = new Swiper('.wp_swiper_b', {
	loop: true,
	autoplay: 2700,
	speed: 300,
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	autoplayDisableOnInteraction: false,
	pagination: '.swiper-pagination1',
	paginationClickable: true,
});
var mySwiper = new Swiper('.wp_swiper_b2', {
	pagination: '.swiper-pagination2',
	paginationClickable: true,
	loop: true,
	autoplay: 2700,
	speed: 300,
	autoplayDisableOnInteraction: false
});
var mySwiper = new Swiper('.wp_swiper_b3', {
	pagination: '.swiper-pagination3',
	paginationClickable: true,
	loop: true,
	// autoplay: 2700,
	speed: 300,
	autoplayDisableOnInteraction: false
});

function windowHidden() {
	$("html,body").css({
		"overflow": "hidden",
		"width": "100%",
		"height": "100%"
	});
};

function windowScroll() {
	$("html,body").css({
		"overflow": "visible",
		"width": "100%",
		"height": "auto"
	});
};
$(".h_order").on("click", function(e) {
	e.stopPropagation();
	$(".order_phone").val("")
	$(".order_betro").show();
	$(".order_b_bg").show();
	windowHidden();
})
$(".order_b_f_input button").on("click", function(e) {
	e.stopPropagation();
	if($(".order_phone").val().length != 11) {
		alert("请输入正确的电话号码");
		return false;
	} else {
		//alert("电话正确,预约成功");
		$(".mask").show();
		$(".tck_yue").show();

		$(".order_betro").hide();
		$(".order_b_bg").hide();
		$(".close").on("click", function(e) {
			e.stopPropagation();
			$(".mask").hide();
			$(".tck_yue").hide();
			windowScroll();
		})
	}
});
$(".order_b_close").on("click", function(e) {
	e.stopPropagation();
	$(".order_betro").hide();
	$(".order_b_bg").hide();
	windowScroll()
});
$(".wp_play").on("click", function(e) {
	e.stopPropagation();
	$(".order_betro").show();
	$(".video").show();
	windowHidden()
});
$(".video_close img").on("click", function(e) {
	e.stopPropagation();
	$(".order_betro").hide();
	$(".video").hide();
	windowScroll()
})
//二级菜单下拉框
var data = {};
var clickNumber = 0;
$(".h_nav,.h_nav2").on("click", function(e) {
	e.stopPropagation();
	if(clickNumber % 2 == 0) {
		$(".d_t_t").addClass("d_t_t_tran");
		$(".d_t_m").addClass("d_t_m_tran");
		$(".d_t_b").addClass("d_t_b_tran");
		$(".top-list").stop().slideDown();
	} else {
		$(".d_t_t").removeClass("d_t_t_tran");
		$(".d_t_m").removeClass("d_t_m_tran");
		$(".d_t_b").removeClass("d_t_b_tran");
		$(".top-list").stop().slideUp();
	}
	clickNumber++;
});
//导航滚动
$(".top-list li").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
	$(".top-list").stop().slideUp();
	$(".d_t_t").removeClass("d_t_t_tran");
	$(".d_t_m").removeClass("d_t_m_tran");
	$(".d_t_b").removeClass("d_t_b_tran");
	clickNumber = 0;
	if($(this).hasClass("top1")) {
		$('html,body').animate({
			scrollTop: 0
		}, 500);
	} else if($(this).hasClass("top0")) {
		$('html,body').animate({
			scrollTop: $('#part0').offset().top - 80
		}, 500);
	} else if($(this).hasClass("top2")) {
		$('html,body').animate({
			scrollTop: $('#part2').offset().top - 80
		}, 500);
	} else if($(this).hasClass("top3")) {
		$('html,body').animate({
			scrollTop: $('#part3').offset().top - 80
		}, 500);
	} else if($(this).hasClass("top4")) {
		$('html,body').animate({
			scrollTop: $('#part4').offset().top - 80
		}, 500);
	}
});
// 御史小队
var Swiper1 = new Swiper(".wj_content", {
	pagination: '.swiper-pagination5',
	paginationClickable: true,
	observer: true,
	observeParents: true,
	effect: 'fade',
	fade: {
		crossFade: true,
	},
	paginationBulletRender: function(swiper, index, className) {
		var font = new Array();
		$(".xn_pic").each(function() {
			font.push($(this).attr("src"));
		});
		return '<span class="' + className + '"><i></i>' +
			'<img src="' + font[index] + '" />' +
			'</span>';
	},
	slideToClickedSlide: true,
	onTransitionEnd: function(swiper) {

	},
	onSlideChangeStart: function() {
		var e = $(".swiper-pagination5 .swiper-pagination-bullet-active").index() + 1;
		g = e - 4;
		var c = $(".swiper-pagination5 span").width(),
			i = parseFloat($(".swiper-pagination5 span").css("margin-right")),
			r = c + i;
		g > -1 && (
			m = 0 == g ? "0px" : -1 * parseInt(g * r - 1) + "px", $(".swiper-pagination5").css("margin-left", m)

		);
	}
});
// 神兽契约
var Swiper2 = new Swiper(".wj_content2", {
	pagination: '.swiper-pagination6',
	paginationClickable: true,
	observer: true,
	observeParents: true,
	effect: 'fade',
	fade: {
		crossFade: true,
	},
	paginationBulletRender: function(swiper, index, className) {
		var font = new Array();
		$(".xn_pic2").each(function() {
			font.push($(this).attr("src"));
		});
		return '<span class="' + className + '">' +
			'<img src="' + font[index] + '" />' +
			'</span>';
	},
	slideToClickedSlide: true,
	onTransitionEnd: function(swiper) {

	},
	onSlideChangeStart: function() {
		var e = $(".swiper-pagination6 .swiper-pagination-bullet-active").index() + 1;
		g = e - 4;
		var c = $(".swiper-pagination6 span").width(),
			i = parseFloat($(".swiper-pagination5 span").css("margin-right")),
			r = c + i;
		g > -1 && (
			m = 0 == g ? "0px" : -1 * parseInt(g * r - 1) + "px", $(".swiper-pagination6").css("margin-left", m)

		);
	}
});
$(".wj_jn_ul li").on("click", function() {
	var index = $(this).index();
	var slider_w = $(this).parent().parent().parent().parent();
	$(this).addClass("active").siblings().removeClass("active");
	slider_w.find(".wj_txt_ul li").eq(index).addClass("active");
	slider_w.find(".wj_txt_ul li").eq(index).siblings().removeClass("active");
});
$(".wj_jn2 .wj_jn_ul li").on("click", function() {
	var index = $(this).index();
	var slder_p = $(this).parent().parent().parent().parent();
	$(this).addClass("active").siblings().removeClass("active");
	slder_p.find(".wj_txt_ul2 li").eq(index).addClass("active");
	slder_p.find(".wj_txt_ul2 li").eq(index).siblings().removeClass("active");
});
$(".wj_jn3 .wj_jn_ul li").on("click", function() {
	var index = $(this).index();
	var slder_l = $(this).parent().parent().parent().parent();
	$(this).addClass("active").siblings().removeClass("active");
	slder_l.find(".wj_txt_ul3 li").eq(index).addClass("active");
	slder_l.find(".wj_txt_ul3 li").eq(index).siblings().removeClass("active");
});
$(".wj_content .swiper-slide .jx_sel a").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
	var id_index = $(this).data("jx");
	var parent_slider = $(this).parent().parent();
	if(id_index == 1) {
		parent_slider.find(".wj_jn").hide();
		parent_slider.find(".wj_txt_ul").hide();
		parent_slider.find(".wj_jn2").show();
		parent_slider.find(".wj_jn3").show();
		parent_slider.find(".wj_txt_ul2").show();
		parent_slider.find(".wj_txt_ul3").show();
		$(".wj_main").addClass("active");
		$(".wj_big").addClass("active");
		$(".wj_content .wj_page").addClass("active");
		parent_slider.find(".jx_box").show();
		parent_slider.find(".wj_per1").css("display", "block");
		parent_slider.find(".wj_per2").hide();
		parent_slider.find(".cont_img1").css("display", "block");
		parent_slider.find(".cont_img2").hide();
		initF();
	} else {
		parent_slider.find(".wj_jn").show();
		parent_slider.find(".wj_txt_ul").show();
		parent_slider.find(".wj_jn2").hide();
		parent_slider.find(".wj_jn3").hide();
		parent_slider.find(".wj_txt_ul2").hide();
		parent_slider.find(".wj_txt_ul3").hide();
		$(".wj_main").removeClass("active");
		$(".wj_big").removeClass("active");
		$(".wj_content .wj_page").removeClass("active");
		parent_slider.find(".jx_box").hide();
		parent_slider.find(".wj_per2").show();
		parent_slider.find(".wj_per1").css("display", "none");
		parent_slider.find(".cont_img2").show();
		parent_slider.find(".cont_img1").css("display", "none");
		initF2();
	}
})
if($(".con5_2").length > 0) {
	$(".hy_term li:lt(5)").removeClass("hidden");
	$(".hy_term li:eq(3)").css("margin-left", "3.4rem");
}
$(".more_term").click(function() {
	$(".hy_term li").css("margin-left", "0.5rem");
	$(".hy_term li").removeClass("ys");
	var end = $(".hy_term li:not(.hidden):last");
	var next = $(".hy_term li:gt(" + end.index() + "):lt(5)");
	if(next.length == 5) {
		$(".hy_term li").addClass("hidden");
		next.removeClass("hidden");
	} else if(next.length == 0) {
		$(".hy_term li").addClass("hidden");
		next = $(".hy_term li:lt(5)").clone(true);
		$(".hy_term li:lt(5)").remove();
		$(".hy_term").append(next.removeClass("hidden"));
	} else {
		$(".hy_term li").addClass("hidden");
		$(".hy_term li").removeClass("ys");
		next.removeClass("hidden");
		var length = next.length;
		next = $(".hy_term li:lt(" + (5 - length) + ")").clone(true);
		$(".hy_term li:lt(" + (5 - length) + ")").remove();
		$(".hy_term").append(next.removeClass("hidden"));
	}
	$("body").find(".hy_term li.hidden").removeClass("ys");
	$("body").find(".hy_term li:not(.hidden)").addClass("ys");
	$("body").find(".hy_term li.ys:eq(3)").css("margin-left", "3.4rem");
	$("body").find(".hy_term li.ys:eq(0)").css("margin-left", "0rem");
})
//神兽契约音乐
$(".wj_content2 .video_role2").click(function() {
	var _this = $(this);
	var audio = document.getElementById('music1');
	var audio_src = _this.attr("data-url");
	if($("#music1").attr("src") != audio_src) {
		$("#music1").attr("src", audio_src);
		audio.pause();
		$(".wj_content2 .video_role2").removeClass("pause");
	}
	if(_this.hasClass("pause")) {
		audio.pause();
		_this.removeClass("pause");
	} else {
		audio.play();
		_this.addClass("pause");
	}
});