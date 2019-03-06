var yx = {};
/*****************statics start*************************/
var fgw_url = window.location.href;
var url_id=fgw_url.indexOf("/part");
var index = fgw_url .lastIndexOf("\/"); 
var str3  = fgw_url .substring(index + 1, fgw_url .length);
var str2=str3.split('.')[0];
var fgw_yy_btn_pc="";
//pc端分官网
var fgw_yy="." +"fgw_" + str2+"_yy";
var fgw_yy_success="." +"fgw_" + str2+"_yy_success";
var fgw_yy_class_name="fgw_" + str2+"_yy";
var fgw_yy_success_class_name="fgw_" + str2+"_yy_success";
function yyMaidian(){
	console.log(fgw_yy);
	console.log(fgw_yy_success);
	console.log(fgw_yy_class_name);
	console.log(fgw_yy_success_class_name);
	if(url_id >= 0){
	    $(".stat_yy").addClass(fgw_yy_class_name);
        $(".stat_yy_success").addClass(fgw_yy_success_class_name);
        $(".stat_cover_yy").addClass(fgw_yy_class_name);
        $(".stat_cover_yy_success").addClass(fgw_yy_success_class_name);
        $(fgw_yy).removeClass('stat_yy');
        $(fgw_yy_success).removeClass('stat_yy_success');
        $(fgw_yy).removeClass('stat_cover_yy');
        $(fgw_yy_success).removeClass('stat_cover_yy_success');
	}
}
if ((/iphone|ipad/i.test(navigator.userAgent.toLowerCase()))) {
	        var class1=document.getElementsByClassName("stat_down");
	        var class2=document.getElementsByClassName("stat_cover_down");
	        for(var i=0;i<class1.length;i++){
	        	class1[i].className += " " + 'stat_ios';
	        }
	        for(var j=0;j<class2.length;j++){
	        	class2[j].className += " " + 'stat_cover_ios';
	        }
}else{
	        var class1=document.getElementsByClassName("stat_down");
	        var class2=document.getElementsByClassName("stat_cover_down");
	       for(var i=0;i<class1.length;i++){
	        	class1[i].className += " " + 'stat_android';
	        }
	        for(var j=0;j<class2.length;j++){
	        	class2[j].className += " " + 'stat_cover_android';
	        }
}

yyMaidian();
//pc端cover页页面埋点
function pc_cover(){
	var num = 0;
	if(url_id < 0){
        var timer = setInterval(function () {
            if (!window.HLog) {
                num++;
                if (num >= 10) {
                    clearInterval(timer);
                }
            } else {
                HLog.push('cover');
                clearInterval(timer);
            }
        }, 500);
	}  
}
//wap端cover页页面埋点
function wap_cover(){
	pc_cover();
}
// 官网点击预约按钮埋点
function fgw_yy_pc(){
	if (window.HLog) {
   if($(".stat_yy").length>0){
   	  HLog.event("stat_yy");
   }else if($(".stat_cover_yy").length>0){
   	  HLog.event("stat_cover_yy");
   }else if(fgw_yy.length>0){
   	  HLog.event(fgw_yy_class_name);
   }else{
   	  console("预约埋点出错~");
   }
 }
}
// 官网预约成功埋点
function fgw_yy_pc_success(){
	if (window.HLog) {
   if($(".stat_yy").length>0){
   	  HLog.event("stat_yy_success");
   }else if($(".stat_cover_yy").length>0){
   	  HLog.event("stat_cover_yy_success");
   }else if(fgw_yy.length>0){
   	  HLog.event(fgw_yy_success_class_name);
   }else{
   	  console("预约成功埋点出错~");
   }
   }
}
// WAP点击预约按钮埋点
function fgw_yy_wap(){
	fgw_yy_pc();
}
// WAP官网预约成功埋点
function fgw_yy_wap_success(){
	fgw_yy_pc_success();
}
(function(){
 var timer = setInterval(function () {
        var num = 0;
    if (!window.websiteInfo) {
        num++;
        if (num >= 10) {
            clearInterval(timer);
        }
    } else {
	var channel = websiteInfo.channel;
    var flag = websiteInfo.flag;
    var and_xz = $(".stat_android").length;
	var ios_xz = $(".stat_ios").length;
	var tap_xz = $(".stat_tap").length;
	var hy_xz = $(".stat_hy").length;
	var and_cover_xz = $(".stat_cover_android").length;
	var ios_cover_xz = $(".stat_cover_ios").length;
	var tap_cover_xz = $(".stat_cover_tap").length;
	var hy_cover_xz = $(".stat_cover_hy").length;console.log(ios_cover_xz);console.log($(".stat_cover_ios"));
if(and_xz > 0) {
    $('body').on("click",".stat_android",function(){HLog.event('stat_android')});
}
if(ios_xz>0){
    $('body').on("click",'.stat_ios',function(){HLog.event('stat_ios')});
}
if(tap_xz>0){
    $('body').on("click",'.stat_tap',function(){HLog.event('stat_tap')});
}
if(hy_xz>0){
    $('body').on("click",'.stat_hy',function(){HLog.event('stat_hy')});
}
if(and_cover_xz > 0) {
    $('body').on("click",'.stat_cover_android',function(){HLog.event('stat_cover_android')});
}
if(ios_cover_xz>0){
   $('body').on("click",'.stat_cover_ios',function(){HLog.event('stat_cover_ios')});
}
if(tap_cover_xz>0){
    $('body').on("click",'.stat_cover_tap',function(){HLog.event('stat_cover_tap')});
}
if(hy_cover_xz>0){
    $('body').on("click",'.stat_cover_hy',function(){HLog.event('stat_cover_hy')});
} 
        clearInterval(timer);
    }
}, 500);
})();
/******************************statics end***************************************/
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
		},1000);
	}
}
//图片验证码获取
function yx_getcaptcha(capname,tipsname){
	var is_focus=0;//input获取事件焦点
	var imgMarkIndex=1;
	function load_captcha(){
		imgMarkIndex++;
		var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
		$.get(imgUrl, {}, function(data) {
			$(capname).html(data.msg);
		}, 'json');
	}
	//图片验证码刷新
	$(capname).click(function(){
		load_captcha();
		is_focus=2;
	});
	//图片验证码焦点获取显示验证码
	$(tipsname).find("input").focus(function(){
		is_focus++;
		if(is_focus==1){
			load_captcha();
		}
	});
}


