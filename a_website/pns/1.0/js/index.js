var num_url = '/common/get-yuyue-count.html';//预约人数
var verify_url='/common/get-login-verify.html';//登录发送验证码
var login_url1='/common/yuyue-phone.html';//预约
var srf = $('meta[name="csrf-token"]').attr('content');
//var is_focus=0;//input获取事件焦点
var djs_timer=null;
// 设备类型判断
function change(){
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	var url = window.location.href;
	var  url_id=window.location.href.split('cover')[1];
	console.log(url_id);
   if(isIOS) {
     //$(".header_a .download ").removeClass("js_wap_down");
     //$(".header_a .download").attr("href", "javascript:yx_showTips('抱歉,iOS暂时还未上架，请使用安卓设备下载体验');");
   }

}
////图片验证码刷新
//var imgMarkIndex=1;
//function load_captcha(){
//	imgMarkIndex++;
//	var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
//	$.get(imgUrl, {}, function(data) {
//		$(".co_captcha").html(data.msg);
//		$(".co_imgtxt").addClass("hidden");
//	}, 'json');
//}
////图片验证码刷新
//$(".co_captcha").click(function(){
//	load_captcha();
//	is_focus=2;
//});
//$(".co_imgtxt").click(function(){
//	var my_phone = $(".co_username").val();
//	if(my_phone == "" || my_phone == undefined) {
//		showErr(0, "手机号码不能为空哦");
//		return;
//	}else if(my_phone.length != 11){
//		showErr(0, "手机号码不正确哦");
//		return;
//	}hideErr(0);
//	load_captcha();
//});
////图片验证码焦点获取显示验证码
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
//登录请求
function get_login(){
	var my_phone = $(".co_username").val();
	var co_codenum1 =  $(".co_codenum1").val();
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
		'url':login_url1,
		'data':{'phone':my_phone,'yzm':co_codenum1,"cms_csrf":srf ,'type':type_id},
		'type':'POST',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				$(".co_tips_login").addClass("hidden");
				alert(data.msg);

				var new_num=$(".yy_box .yy_num span.num").text().replace(/,/g,'')-(-1);
				$(".yy_box .yy_num span.num").text(numFormat(new_num));
			}else{
				//load_captcha();
				$(".co_captcha").trigger("click");
				alert(data.msg);

			}
		}
	});
}
//预约人数分段
function numFormat(n){
	n=n+"";
	if(n.length>3){

		return numFormat(n.substring(0, n.length-3))+","+ n.substr(n.length-3,3);
	}else{
		return n;
	}
}
//预约人数
function ordernum() {
	$.ajax({
		'url':num_url,
		'data':{'name': 'yuyue_total',"cms_csrf":srf },
		'type':'POST',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				if(data.msg === 'null' || data.msg === null||data.msg ==="") {
					$(".yy_box .yy_num span.num").text("0");
				}else{
					var num=data.msg;
					$(".yy_box .yy_num span.num").text(numFormat(data.msg));
					console.log(num)
					if(50000<=num&&num<100000){
						$(".yy_gift .gift_img span:eq(0)").addClass("active");
					}
					if(100000<=num&&num<250000){
						$(".yy_gift .gift_img span:eq(0),.yy_gift .gift_img span:eq(1)").addClass("active");
					}
					if(250000<=num&&num<500000){
						$(".yy_gift .gift_img span:eq(0),.yy_gift .gift_img span:eq(1),.yy_gift .gift_img span:eq(2)").addClass("active");
					}
					if(num>=500000){
						$(".yy_gift .gift_img span").addClass("active");
					}
				}
			}else{}
		}
	});
}
//弹框关闭
$(".co_tips_close").click(function(){
	$(".co_tips").addClass("hidden");
	$('.co_tips_login .co_input input').val("");
	$(".co_error").removeClass("co_err_show");
});
//登录弹框显示
$(".yy_btn,.yy_btn1").click(function(){
	$(".co_tips_login").removeClass("hidden");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
	var my_phone = $(this).closest(".co_tips_login").find(".co_username").val();
	var captcha =  $(this).closest(".co_tips_login").find(".captcha").val();
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	}else if(my_phone.length != 11){
		showErr(0, "手机号码不正确哦");
		return;
	}
	hideErr(0);
	if(captcha == "" || captcha == undefined) {
		showErr(1, "验证码不能为空哦");
		return;
	}
	hideErr(1);
	$.post(verify_url,{ "phone":my_phone,"captcha":captcha,"smsContent":"您正在进行官网登录","cms_csrf":srf },function(data){
		if(data.status == 0){
			$(".co_codebtn1").css("pointer-events","none");
			page_djs($(".co_codebtn1"),function(){
				$(".co_codebtn1").css("pointer-events","auto");
			});
		}else{
			alert(data.msg);
			//load_captcha();
			$(".co_captcha").trigger("click");
		}
	}, 'json');
});
//手机类型选择
$(".rdo").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
});
//预约
$(".co_tips_yybtn").click(function(){
	get_login();
});
//新闻对应内容显示
$(".news_box .hd ul li").hover(function(){
	var index=$(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});
//微信img展示
$(".float a.wx").hover(function (){
	$(".wx_qrcode").stop().fadeIn();
},function (){
	$(".wx_qrcode").stop().fadeOut();
});
//nav固定
$(window).scroll(function(){
	var scrollTop=$(this).scrollTop();
	if(scrollTop>1083){
		$(".top_nav").addClass("fixed");
	}else{
		$(".top_nav").removeClass("fixed");
	}

	if(scrollTop < 2000) {
		$(".top_nav li").removeClass("on");
		$(".top_nav li:eq(0)").addClass("on");
	} else if(scrollTop >= 2000 && scrollTop < 3000) {
		$(".top_nav li").removeClass("on");
		$(".top_nav li:eq(1)").addClass("on");
	}else if(scrollTop >= 3000 && scrollTop < 4000) {
		$(".top_nav li").removeClass("on");
		$(".top_nav li:eq(2)").addClass("on");
	} else if(scrollTop >= 4000 && scrollTop < 5000) {
		$(".top_nav li").removeClass("on");
		$(".top_nav li:eq(3)").addClass("on");
	} else if(scrollTop >= 5000 && scrollTop < 6123) {
		$(".top_nav li").removeClass("on");
		$(".top_nav li:eq(4)").addClass("on");
	}

});
//点击nav跳转对应版块
//$('.top_nav').find('li').click(function() {
//	if($(this).attr('data-index') == 1) {
//		$("html,body").animate({
//			scrollTop: 0
//		}, 500);
//	} else if($(this).attr('data-index') == 2) {
//		$("html,body").animate({
//			scrollTop: 2072
//		}, 500);
//	} else if($(this).attr('data-index') == 3) {
//		$("html,body").animate({
//			scrollTop: 3062
//		}, 500);
//	} else if($(this).attr('data-index') == 4) {
//		$("html,body").animate({
//			scrollTop: 4049
//		}, 500);
//	} else {
//		$("html,body").animate({
//			scrollTop:5039
//		}, 500);
//	}
//});
//nav点击样式
//$(".top_nav li").click(function(){
//	$(this).addClass("on").siblings().removeClass("on");
//});
//锚点跳转


$(function() {
	//time
	var myDate = new Date();
	$(".year").text(myDate.getFullYear());
	$(".month").text(myDate.getMonth()+1);
	$(".day").text(myDate.getDate());

	//loading
	if($(".i_main").hasClass("i_main1")){
		$("html,body").addClass("no_auto");
	}
	var timer;
	var percent = 15;
	$(".progress").css({"width": percent +"%"});
	$("#percent").text(percent + "%")
	timer=setInterval(function(){
		percent++;
		$(".progress").css({"width": percent +"%"});
		$("#percent").text(percent + "%")
		if(percent==100){
			clearInterval(timer);
			$(".loadbox .loadcenter").addClass('hidden');
			$(".loadbox .slogan1").removeClass('hidden');
			setTimeout(function(){
				$(".loadbox .loadcenter").fadeOut();
				$("html,body").removeClass('no_auto');
				$(".i_main").fadeIn();
				swiper01.update();
				swiper02.update();

				//scroll跳转
				function navscroll(idstr){
					$(".top_nav li>a").removeClass("on");
					$("[data-id='"+idstr+"']").addClass("on");
					var $a=$(idstr);
					var $c=$a.offset().top; //$("#i_nav").height()
					console.log($c)
					$("html,body").stop().animate({ scrollTop:$c+"px" },300);
				}

				$(".top_nav li>a").click(function(){
					var idstr=$(this).data("id");
					navscroll(idstr);
				});
				location.hash&&navscroll(location.hash);
			},1000);
		}
	},50);

	//预约人数
	ordernum();
	yx_getcaptcha(".co_captcha",".co_tips_login")
	var swiper01 = new Swiper('.swiper-container1', {
		prevButton:'.swiper-button-prev1',
		nextButton:'.swiper-button-next1',
		pagination: '.swiper-pagination1',
		paginationClickable: true,
		slidesPerView: 1,
		autoplayDisableOnInteraction : false,
//			autoplay:3000,
		loop:true,
		observer: true,
		observeParents: true,
		paginationBulletRender: function(swiper, index, className) {
			var img = new Array();
			$(".swiper-pagination1>span").each(function() {
				img.push($(this).html());
			});
			return '<span class="' + className + '">' + img[index] + '</span>';
		},
		slideToClickedSlide: true
	});
	var swiper02 = new Swiper('.swiper-container2', {
		pagination: '.swiper-pagination2',
		paginationClickable: true,
		slidesPerView: 1,
		autoplayDisableOnInteraction : false,
//			autoplay:3000,
		loop:true,
	});
});




