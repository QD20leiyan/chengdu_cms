var yx = {};
//公用弹窗
yx.alert = function() {
	//先判断是否存在css，然后添加css
	var myAlertCss = $("#myAlertCss").length;
	if(myAlertCss <= 0) {
		var html = '<link id="myAlertCss" rel="stylesheet" href="http://dev.static.yingxiong.com/common/css/yx.css">';
		$("head").append(html);
	}
	//添加弹框节点
	var t_html = '<div class="tc_cover">' +
		'<div>' +
		'<a class="t_close" href="javascript:"></a>' +
		'<div class="t_close"></div>' +
		'</div>' +
		'</div>';
	$("html,body").css({
		height: "100%"
	});
	$("body").append(t_html);
	$(".t_close").click(function() {
		$("html,body").css({
			height: "auto"
		});
		$(".tc_cover").remove();
	})
};
//图片验证码
yx.imgcode = function() {
	$.get("/site/captcha.html?refresh=1", {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
};
//60S倒计时
yx.dtime = function() {
	var countdown = 60;
	var obj = $(".g_code");
	var timer = setInterval(function() {
		if(countdown == 0) {
			obj.attr("disabled", false);
			obj.html("获取验证码");
			countdown = 60;
			clearInterval(timer);
			return;
		} else {
			obj.attr("disabled", true);
			obj.html("重新发送(" + countdown + ")");
			countdown--;
		}
	}, 1000);
};
//获取验证码
yx.code = function(url) {
	var phone = $(".phone").val();
	var t_yzm = $(".t_yzm").val();
	if(phone == "" || phone == undefined || phone == null) {
		alert("请输入手机号码");
		return;
	}
	if(t_yzm == "" || t_yzm == undefined || t_yzm == null) {
		alert("请输入图形验证码");
		return;
	}
	$.post(url, {
		"phone": phone,
		"captcha": t_yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			yx.dtime();
		} else {
			alert(data.msg);
		}
	});
};
//允许滑动
yx.move = function() {
	$("html,body").css({
		"overflow": "visible",
		"width": "100%",
		"height": "auto"
	});
};
//禁止滑动
yx.stop = function() {
	$("html,body").css({
		"overflow": "hidden",
		"width": "100%",
		"height": "100%"
	});
};
//鼠标经过特效
yx.mouse = function() {
	var $_window = $(window);
	var $main_visual = $('.b');
	var itemLi = $main_visual.find('.b1');
	var visualWidth = $main_visual.width();
	$main_visual.mousemove(function(e) {
		var cursorX = e.clientX - $main_visual.offset().left;
		var cursorY = e.clientY - $main_visual.offset().top;
		var i = 0.5;
		$(this).find('.b1').each(function() {
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
};
//用户手机号登录
yx.login = function (url){
	var phone = $(".phone").val();
	var yzm = $(".yzm").val();
	if(phone == "" || phone == undefined || phone == null) {
		alert("请输入手机号码");
		return;
	}
	if(yzm == "" || yzm == undefined || yzm == null) {
		alert("请输入验证码");
		return;
	}
	$.post (url,{
		"phone":phone,
		"yzm":yzm,
		"cms_csrf": srf
	},function (data){
		if(data.status == 0){
			$(".login").hide();
		} else {
			alert(data.msg);
		}
	},"json");
};
//领取礼包
yx.gift = function (){
	yx.code();
	
};
//敬请期待公共弹框
var isyx_showTips=false;
function yx_showTips(text){
	if(!isyx_showTips){
		isyx_showTips=true;
		$('body').append('<div class="yx_shade"><div class="yx_tips_txt">'+text+'</div></div>');
		setTimeout(function(){$('.yx_shade .yx_tips_txt').addClass("show");},10);
		setTimeout(function(){
			isyx_showTips=false;
			$('.yx_shade').animate({'opacity':'0'},function(){$('.yx_shade').remove();});
		},2000);
	}
}