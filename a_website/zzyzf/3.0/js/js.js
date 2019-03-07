$(function(){
	var swiper01 = new Swiper('.swiper-container1', {
		pagination: '.swiper-pagination1',
		slidesPerView: 1,
		paginationClickable: true,
		autoplayDisableOnInteraction : false,
        autoplay:3000,
		loop:true,
		//onClick:function(swiper){
		//	console.log(swiper);
		//	//显示详情弹框
		//	$(".detail_box").removeClass("hidden");
		//	swiper04.update();
		//	swiper04.slideTo(swiper.realIndex);
		//	$(".tips_peo img").eq(swiper.realIndex%3).removeClass('hidden');
		//}
	});
	var swiper02 = new Swiper('.swiper-container2', {
		pagination: '.swiper-pagination2',
		slidesPerView: 1,
		paginationClickable: true,
		autoplayDisableOnInteraction : false,
        autoplay:3000,
		loop:true,
		onClick:function(swiper){
			console.log(swiper);
			//显示详情弹框
			$(".jb_box").removeClass("hidden");
			swiper05.update();
			swiper05.slideTo(swiper.realIndex);
		}
	});
	var swiper03 = new Swiper('.swiper-container3', {
		pagination: '.swiper-pagination3',
		slidesPerView: 1,
		paginationClickable: true,
		autoplayDisableOnInteraction : false,
        autoplay:3000,
		loop:true,
		onSlideChangeEnd: function(swiper){
			$(".i_main .ts_box .banner .ts_tit span").text("0"+(swiper.realIndex+1));
		},
		onClick:function(swiper){
			////特色大图显示
			//var img = $(e.target).attr("src");
			//$(".z_img").attr("src",img);
			//$(".b_img").stop().fadeIn();
			//特色大图显示
			$(".b_img").stop().fadeIn();
			swiper07.update();
			swiper07.slideTo(swiper.realIndex);
		}
	});
	var swiper04 = new Swiper('.swiper-container4', {
		slidesPerView:1,
		effect : 'fade',
		fade: {
			crossFade: true,
		},
		prevButton:'.swiper-button-prev4',
		nextButton:'.swiper-button-next4',
		onSlideChangeEnd: function(swiper){
			$(".tips_peo img").addClass('hidden');
			$(".tips_peo img").eq(swiper.realIndex%3).removeClass('hidden');
		}
	});
	var swiper05 = new Swiper('.swiper-container5', {
		slidesPerView:1,
		effect : 'fade',
		fade: {
			crossFade: true,
		},
		prevButton:'.swiper-button-prev5',
		nextButton:'.swiper-button-next5',
	});
	var swiper06 = new Swiper('.swiper-container6', {
		slidesPerView:1,
		effect : 'fade',
		fade: {
			crossFade: true,
		},
		prevButton:'.swiper-button-prev6',
		nextButton:'.swiper-button-next6',
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
	//微信显示框显示
	$(".ico_wx").hover(function() {
		$(".ewm_wx").stop().fadeIn();
	}, function() {
		$(".ewm_wx").stop().fadeOut();
	});

	//军官显示切换
	var e = 0, t = $(".wj_img li");
	t.last().show(), $(".tese_ul").find("li").hover(function () {
		$(this).addClass("on").siblings().removeClass("on"),
			e = $(this).index(), $(this).stop().animate({width: 320}, 500).siblings("li").stop().animate({width: 78}, 500), t.eq(e).show().siblings().hide()
	});

	$(".wj_img li").click(function(){
		var index_img = $(this).index();
		$(".jgpeo_box").removeClass("hidden");
		swiper06.update();
		swiper06.slideTo(index_img);
	});
	$(".tese_ul li").click(function(){
		var index_img = $(this).index();
		$(".jgpeo_box").removeClass("hidden");
		swiper06.update();
		swiper06.slideTo(index_img);
	});

	//浮窗
	var clickNumber = 0;
	$(".float .f_nav").click(function() {
		if(clickNumber % 2 == 0) {
			$("body").addClass("op");
			$(".float").addClass("active");
		} else {
			$(".float").removeClass("active");
			$("body").removeClass("op");
		}
		clickNumber++;
	});

	//浮窗自动滚动
	//jQuery.fn.floatadv = function(loaded) {
	//	var obj = this;
	//	body_height = parseInt($(window).height());
	//	block_height = parseInt(obj.height());
	//	top_position = parseInt((body_height/2.5) - (block_height/2.5) + $(window).scrollTop());
	//	if (body_height<block_height) { top_position = 0 + $(window).scrollTop(); };
	//	if(!loaded) {
	//		obj.css({'position': 'absolute'});
	//		obj.css({ 'top': top_position });
	//		$(window).bind('resize', function() {
	//			obj.floatadv(!loaded);
	//		});
	//		$(window).bind('scroll', function() {
	//			obj.floatadv(!loaded);
	//		});
	//	} else {
	//		obj.stop();
	//		obj.css({'position': 'absolute'});
	//		obj.animate({ 'top': top_position }, 400, 'linear');
	//	}
	//}
	//$(".float_box").floatadv();

	//弹窗关闭
	$(".close").click(function(){
		$(".gg_box").addClass("hidden");
		$(".tips_peo img").addClass('hidden');
	});

	$(window).scroll(function(){
		var $t = $(this).scrollTop();
		if($t > 350){
			$(".float_box").stop().fadeIn();
		}else{
			$(".float_box").stop().fadeOut();
		}
	});

	//返回顶部
	$(".go_top").click(function(){
		var a;
		function back(){
			a=setInterval(go_top,5);
		}
		function go_top(){
			if(window.scrollY<=0){
				clearInterval(a);
			}else{
				scrollTo(0,window.scrollY-50);
			}
		}
		back();
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

	//导航滚动
	$(".menu .menu-con .links li").click(function(){
		if($(this).hasClass("top")){
			$('html,body').animate({scrollTop: $('#top').offset().top}, 500);
		}else if($(this).hasClass("banner_news")){
			$('html,body').animate({scrollTop: $('#banner_news').offset().top}, 500);
		}else if($(this).hasClass("zj_box")){
			$('html,body').animate({scrollTop: $('#zj_box').offset().top}, 500);
		}else if($(this).hasClass("jg_box")){
			$('html,body').animate({scrollTop: $('#wq_box').offset().top}, 500);
		}else if($(this).hasClass("ts_box")){
			$('html,body').animate({scrollTop: $('#ts_box').offset().top}, 500);
		}
	});

	//特色大图弹框关闭
	$(".b_img .close").click(function() {
		$(".b_img").stop().fadeOut();
	});
});



var is_focus=0;//input获取事件焦点
//预约
var verify_url='/commonMethod/ajax-yuyue-verify';//登录发送验证码
var yy_url='/commonMethod/ajax-yuyue.html';//预约
var srf = $('meta[name="csrf-token"]').attr('content');
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
	imgMarkIndex++;
	var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		//$(".co_captcha").html(data.msg);
		$(".co_captcha img").attr("src",data.url);
		$(".co_captcha img").show();
		$(".co_imgtxt").addClass("hidden");
	}, 'json');
}
//图片验证码刷新
$(".co_captcha").click(function(){
	load_captcha();
	is_focus=2;
});
$(".co_imgtxt").click(function(){
	var my_phone = $(".co_username").val();
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	}else if(my_phone.length != 11){
		showErr(0, "手机号码不正确哦");
		return;
	}hideErr(0);
	load_captcha();
});
//图片验证码焦点获取显示验证码
//$(".co_input input").focus(function(){
//	is_focus++;
//	console.log(is_focus);
//	if(is_focus==1){
//		load_captcha();
//	}
//});
//倒计时
function page_djs(ele, callback) {
	var time = 60;
	if(ele) {
		ele.html("60s");
	}
	djs_timer = setInterval(function() {
		time--;
		ele.html((time<=0?0:time) + "s");
		if(time == 0) {
			clearInterval(djs_timer);
			ele.html("获取验证码");
			if(callback) {
				callback();
			}
		}
	}, 1000);
}
//错误提示显示
function showErr(index, text) {
	$(".co_error").eq(index).addClass("co_err_show").html(text);
	$(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
	$(".co_error").eq(index).removeClass("co_err_show");
}

//预约
$(".yy_btn").click(function(){
	$(".yy_box,.co_tips_yy").removeClass("hidden");
	$(".co_tips_success").addClass("hidden");
});
$(".rdo").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
});
$(".co_tips_surebtn").click(function(){
	$(".yy_box,.co_tips").addClass("hidden");
})
//登录获取验证码
$(".co_codebtn1").click(function(){
	var my_phone = $(this).closest(".co_tips_yy").find(".co_username").val();
	var captcha =  $(this).closest(".co_tips_yy").find(".captcha").val();
	var type_id=$(".rdo.on").attr("data-id");
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	}else if(my_phone.length != 11){
		showErr(0, "手机号码不正确哦");
		return;
	}
	hideErr(0);
//	if(captcha == "" || captcha == undefined) {
//		showErr(1, "验证码不能为空哦");
//		return;
//	}
//	hideErr(1);
	$.post(verify_url,{ "phone":my_phone,"captcha":captcha,"type":type_id,"unique_phone":"1","scene":"2","cms_csrf":srf },function(data){
		if(data.status == 0){
			$(".co_codebtn1").css("pointer-events","none");
			page_djs($(".co_codebtn1"),function(){
				$(".co_codebtn1").css("pointer-events","auto");
			});
		} else if(data.status == -2){
			alert(data.msg);
			load_captcha();
			$(".tupian").show();
		} else{
			$(".co_tips_yy").addClass("hidden");
			$(".co_tips_success").removeClass("hidden");
			if(data.msg=="您已经预约过了，请勿重复预约"){
				$(".co_tips_success .co_tips_title").text("您已预约");
				$(".yy_txt").text("您已预约《战争与征服》");
				$(".co_tips_success .co_form .yy_new").removeClass("hidden");
				$(".co_tips_success .co_form .ts").addClass("hidden");
				$(".co_tips_success .co_tips_btn1").removeClass("hidden");
				$(".co_tips_success .co_tips_btn").addClass("hidden");
				$(".co_tips.co_tips_success .co_con").css("height","350px");
			}else{
				$(".co_tips_success .co_tips_title").text("游戏预约");
				$(".co_tips_success .co_form .yy_new").addClass("hidden");
				$(".co_tips_success .co_form .ts").removeClass("hidden");
				$(".co_tips_success .co_form .ts").text(data.msg);
				$(".co_tips_success .co_tips_btn").removeClass("hidden");
				$(".co_tips_success .co_tips_btn1").addClass("hidden");
				$(".co_tips.co_tips_success .co_con").css("height","280px");
			}
			load_captcha();
		}
	}, 'json');
});
//登录请求
$(".co_tips_yybtn").click(function(){
	fgw_yy_pc();
	var my_phone = $(".co_username").val();
	var co_codenum1=$('.co_codenum1').val();
	var type_id=$(".rdo.on").attr("data-id");
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	}else if(my_phone.length != 11){
		showErr(0, "手机号码不正确哦");
		return;
	}
	hideErr(0);
	if(co_codenum1 == "" || co_codenum1 == undefined) {
		showErr(2, "验证码不能为空哦");
		return;
	}
	hideErr(2);
	$.ajax({
		'url':yy_url,
		'data':{'phone':my_phone,'yzm':co_codenum1,'type':type_id,"email":"","unique_phone":"1","scene":"2","cms_csrf":srf },
		'type':'POST',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				fgw_yy_pc_success();
				$(".co_tips_yy").addClass("hidden");
				$(".co_tips_success").removeClass("hidden");
				$(".co_tips_success .co_tips_title").text("预约成功！");
				$(".yy_txt").text("恭喜您，成功预约《战争与征服》");
				$(".co_tips_success .co_form .yy_new").removeClass("hidden");
				$(".co_tips_success .co_form .ts").addClass("hidden");
				$(".co_tips_success .co_tips_btn1").removeClass("hidden");
				$(".co_tips_success .co_tips_btn").addClass("hidden");
				$(".co_tips.co_tips_success .co_con").css("height","350px");
			}else{
				$(".co_tips_yy").addClass("hidden");
				$(".co_tips_success").removeClass("hidden");
				if(data.msg=="您已经预约过了，请勿重复预约"){
					$(".co_tips_success .co_tips_title").text("您已预约");
					$(".yy_txt").text("您已预约《战争与征服》11月28日先锋测试");
					$(".co_tips_success .co_form .yy_new").removeClass("hidden");
					$(".co_tips_success .co_form .ts").addClass("hidden");
					$(".co_tips_success .co_tips_btn1").removeClass("hidden");
					$(".co_tips_success .co_tips_btn").addClass("hidden");
					$(".co_tips.co_tips_success .co_con").css("height","350px");
				}else{
					$(".co_tips_success .co_tips_title").text("游戏预约");
					$(".co_tips_success .co_form .yy_new").addClass("hidden");
					$(".co_tips_success .co_form .ts").removeClass("hidden");
					$(".co_tips_success .co_form .ts").text(data.msg);
					$(".co_tips_success .co_tips_btn").removeClass("hidden");
					$(".co_tips_success .co_tips_btn1").addClass("hidden");
					$(".co_tips.co_tips_success .co_con").css("height","280px");
				}
				load_captcha();
			}
		}
	});
});