var is_type=0;
//左导航标记
$(window).scroll(function() {
	var scroll = $(this).scrollTop();
	if(scroll < 550) {
		$(".z_float").addClass("active");
		$('.z_float').find('li').removeClass('swiper-pagination-bullet-active');
		$('.z_float').find("li[data-index='1']").addClass('swiper-pagination-bullet-active');
	} else if(scroll >= 550 && scroll < 1300) {
		$(".z_float").addClass("active");
		$('.z_float').find('li').removeClass('swiper-pagination-bullet-active');
		$('.z_float').find("li[data-index='2']").addClass('swiper-pagination-bullet-active');
	}else if(scroll >= 1300 && scroll < 2000) {
		$(".z_float").addClass("active");
		$('.z_float').find('li').removeClass('swiper-pagination-bullet-active');
		$('.z_float').find("li[data-index='3']").addClass('swiper-pagination-bullet-active');
		if(is_type==0){
			is_type=1;
			$(".zy_box .left .sm_img span.sm1").addClass("active");
			$(".zy_box .left .big_img span:eq(0)").removeClass("hidden");
		}
	} else if(scroll >= 2000 && scroll < 2900) {
		$(".z_float").addClass("active");
		$('.z_float').find('li').removeClass('swiper-pagination-bullet-active');
		$('.z_float').find("li[data-index='4']").addClass('swiper-pagination-bullet-active');
	} else if(scroll >= 2900 && scroll < 4763) {
		$(".z_float").addClass("active");
		$('.z_float').find('li').removeClass('swiper-pagination-bullet-active');
		$('.z_float').find("li[data-index='5']").addClass('swiper-pagination-bullet-active');
	}
});
$(function() {
	var swiper02 = new Swiper('.swiper-container2', {
		pagination: '.swiper-pagination2',
		slidesPerView: 1,
		paginationClickable: true,
		autoplayDisableOnInteraction : false,
		autoplay:3000,
		loop:true
	});
	var swiper03 = new Swiper('.swiper-container3', {
		prevButton:'.swiper-button-prev3',
		nextButton:'.swiper-button-next3',
		slidesPerView: 1,
		paginationClickable: true,
		autoplayDisableOnInteraction : false,
		//autoplay:3000,
		loop:true
	});
	var swiper07 = new Swiper('.swiper-container7', {
		slidesPerView:1,
		effect : 'fade',
		fade: {
			crossFade: true,
		},
		prevButton:'.swiper-button-prev7',
		nextButton:'.swiper-button-next7',
	});
	//点击左侧导航跳转对应版块
	$('.z_float').find('li').click(function() {
		var parent = $(this).parent();
		if($(this).attr('data-index') == 1) {
			$("html,body").animate({
				scrollTop: 0
			}, 500);
		} else if($(this).attr('data-index') == 2) {
			$("html,body").animate({
				scrollTop: 905
			}, 500);
		} else if($(this).attr('data-index') == 3) {
			$("html,body").animate({
				scrollTop: 1667
			}, 500);
		} else if($(this).attr('data-index') == 4) {
			$("html,body").animate({
				scrollTop: 2612
			}, 500);
		} else {
			$("html,body").animate({
				scrollTop: 3459
			}, 500);
		}
	});
	//鼠标悬浮微信二维码
	$(".nav_tab ul li:nth-child(1)").hover(function() {
		$(".fl_wx").stop().fadeIn();
	}, function() {
		$(".fl_wx").stop().fadeOut();
	});
	$(".fl_wx").hover(function() {
		$(this).stop().fadeIn();
	}, function() {
		$(this).stop().fadeOut();
	});
	//浮窗点击缩进
	var clickTap = true;
	$(".op_close").click(function() {
		if(clickTap) {
			$(".float").addClass("active");
			clickTap = false;
		} else {
			$(".float").removeClass("active");
			clickTap = true;
		}
	});
	//新闻对应内容显示
	$(".news_box .hd ul li").hover(function(){
		var index=$(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
	});
	//职业角色显示
	var e = 0, t = $(".zy_box .left .big_img span"),i=$(".zy_box .right .right_info"),dataUrl = "",dataName = "";
	$(".zy_box .left .sm_img").find("span").hover(function () {
		$(this).addClass("active").siblings().removeClass("active"),
			e = $(this).index(),
			t.eq(e).removeClass("hidden").siblings().addClass("hidden");
		i.eq(e).removeClass("hidden").siblings().addClass("hidden");
			dataUrl=t.eq(e).attr("src");
			dataName="#" + t.eq(e).attr("id");
			console.log(dataUrl);
			console.log(dataName);
			videoPlay(dataUrl, " ", "714px", true, dataName, "700px");
		i.eq(e).removeClass("hidden").siblings().addClass("hidden");
	});
	//职业系列内容显示
	$(".zy_box .right .x_info .type span").hover(function(){
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(this).closest(".x_info").find(".type_txt p").addClass("hidden");
		$(this).closest(".x_info").find(".type_txt p").eq(index).removeClass("hidden")
	});
	//职业技能内容显示
	$(".zy_box .right .jn_info .jn_img").hover(function(){
		var index=$(this).index();
		//$(this).addClass("active").siblings().removeClass("active");
		$(this).find(".sub").stop().fadeIn();
	}, function() {
		$(this).find(".sub").stop().fadeOut();
	});
	//视频中心内容切换
	$(".video_box .video_type span").click(function(){
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".video_box .video_info ").eq(index).removeClass("hidden").siblings(".video_box .video_info").addClass("hidden");
	});
	//玩家互动内容切换
	$(".player_box .play_type span").click(function(){
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".player_box .pl_info  ").eq(index).removeClass("hidden").siblings(".player_box .pl_info ").addClass("hidden");
		swiper03.update();
	});
	//视频中心大图弹窗
	$(".video_box .video_info.img1 .img_box").on("click", function() {
		var index=$(this).index();
		$(".b_img").stop().fadeIn();
		swiper07.update();
		swiper07.slideTo(index);
	});
	//点击关闭头像弹窗
	$(".i_close").click(function() {
		$(".b_img").stop().fadeOut();
	});
	//返回顶部
	$(".back").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	});
	//音乐播放
	$(".video_box .video_info.img3 .img_box").click(function(){
		var _this=$(this);
		var audio=document.getElementById('music1');
		var audio_src=_this.attr("data-url");
		if($("#music1").attr("src")!=audio_src){
			$("#music1").attr("src",audio_src);
			audio.pause();
			$(".video_box .video_info .img_box .play").removeClass("pause");
		}
		if(_this.find(".play").hasClass("pause")){
			audio.pause();
			_this.find(".play").removeClass("pause");
		}else{
			audio.play();
			_this.find(".play").addClass("pause");
		}
	});
	//滚动位置判断
	function showani(){
		$(".ani:not(.show-ani)").each(function(i,n){
			var offset=$(n).offset();
			var scrollY=window.pageYOffset || document.documentElement.scrollTop;
			if(scrollY > offset.top - document.documentElement.clientHeight + $(n).height()/2){
				$(n).addClass("show-ani");
			}
		})
	}
	$(window).scroll(function(e){
		showani();
	});
	showani();
});




