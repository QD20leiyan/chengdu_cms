var num_url = '/common/get-yuyue-count.html';//预约人数
var verify_url='/common/get-login-verify.html';//登录发送验证码
var login_url1='/common/yuyue-phone.html';//预约
var srf = $('meta[name="csrf-token"]').attr('content');
var is_focus=0;//input获取事件焦点
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
var myDate = new Date();
	$(".year").text(myDate.getFullYear());
	$(".month").text(myDate.getMonth()+1);
	$(".day").text(myDate.getDate());
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
	imgMarkIndex++;
	var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".co_captcha").html(data.msg);
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
$(".co_input input").focus(function(){
	is_focus++;
	console.log(is_focus);
	if(is_focus==1){
		load_captcha();
	}
});
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

				var new_num=$(".kv .yy_box .yy_num .num").text().replace(/,/g,'')-(-1);
				$(".kv .yy_box .yy_num .num").text(numFormat(new_num));
			}else{
				load_captcha();
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
				if(data.msg == 'null' || data.msg == null||data.msg =="") {
					$(".kv .yy_box .yy_num .num").text("0");
				}else{
					if(data.msg>50000){
						$(".gift_img .dc1").addClass("active");
					}
					if(data.msg>100000){
						$(".gift_img .dc2").addClass("active");
					}
					if(data.msg>250000){
						$(".gift_img .dc3").addClass("active");
					}
					if(data.msg>500000){
						$(".gift_img .dc4").addClass("active");
					}
					console.log(numFormat(data.msg));
					$(".kv .yy_box .yy_num .num").text(numFormat(data.msg));
				}
			}else{

			}
		}
	});
}
//弹框关闭
$(".co_tips_close").click(function(){
	$(".co_tips").addClass("hidden");
	$(".loading").addClass("hidden");
	$('.co_tips_login .co_input input').val("");
	$(".co_error").removeClass("co_err_show");
});
//微信弹框关闭
$(".co_tips_close2").click(function(){
	$(".wx_tc.co_tips").addClass("hidden");
	$(".loading").addClass("hidden");
});
// 微信弹窗出现
$(".wx_btn").click(function(){
	$(".wx_tc.co_tips").removeClass("hidden");
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
			load_captcha();
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
//点击菜单
$('.top_menu').find('li').click(function() {
	$(".kv").addClass("hidden"); 
	$(".header").removeClass("hidden");
    $(".page_yy").removeClass("hidden");
	if($(this).attr('data-index') == 1) {
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	} else if($(this).attr('data-index') == 2) {
		$("html,body").animate({
			scrollTop: 630
		}, 500);
	} else if($(this).attr('data-index') == 3) {
		$("html,body").animate({
			scrollTop: 1280
		}, 500);
	} 
});
//nav点击样式
$(".top_nav li").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
});


$(function() {
	var url1 = window.location.href;
    var  url_id1=window.location.href.split('?id=')[1];
    if(url_id1==1){
    	$(".loading").addClass("hidden");
        $(".page_yy").removeClass("hidden");
        $(".kv").addClass("hidden");
        $(".header").removeClass("hidden");
        $("html,body").animate({
			scrollTop: 0
		}, 500);
    }else if(url_id1==2){
        $(".loading").addClass("hidden");
        $(".page_yy").removeClass("hidden");
        $(".kv").addClass("hidden");
        $(".header").removeClass("hidden");
        $("html,body").animate({
			scrollTop: 630
		}, 500);
    }else if(url_id1==3){
        $(".loading").addClass("hidden");
        $(".page_yy").removeClass("hidden");
        $(".header").removeClass("hidden");
        $(".kv").addClass("hidden");
        $("html,body").animate({
			scrollTop: 1280
		}, 500);
    }else if(url_id1==0){
    	$(".loading").addClass("hidden");
        $(".page_yy").addClass("hidden");
        $(".header").addClass("hidden");
        $(".kv").removeClass("hidden");
    }
	//预约人数
	ordernum();
	var swiper01 = new Swiper('.swiper-container1', {
		prevButton:'.swiper-button-prev1',
		nextButton:'.swiper-button-next1',
		pagination: '.swiper-pagination1',
		paginationClickable: true,
		slidesPerView: 1,
		autoplayDisableOnInteraction : false,
		autoplay:3000,
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
});




