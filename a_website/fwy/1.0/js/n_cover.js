//60s倒计时验证
var countdown = 60;

function sendemail() {
	var obj = $(".g_code");
	settime(obj);
};
function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("重新发送(" + countdown + ")");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
};
//图片验证码
var imgMarkIndex = 1;

function load_captcha() {
	var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha").html(data.msg);
	}, 'json');
};
var srf = $("meta[name='csrf-token']").attr("content");
var base = {
	isLogin: false,
	isYueyue: false,
};
//判断用户是否登录
function isLogin(){
	$.get("/site/get-user-info-new.html" , {} , function (data){
		if(data.status == 0){
			base.isLogin = true;
			var msg = data.msg.data;
			if(msg.is_yuyue == 0) {
				base.isYueyue = false;
				$(".div_img p").html("未预约成功~");
			} else if(msg.is_yuyue == 1) {
				base.isYueyue = true;
				if(msg.gift_code =="" || msg.gift_code == undefined){
				   $(".div_img p").html("礼包码获取异常~");
				}else{
				   $(".div_img p").html(msg.gift_code);
				   $(".success .after_denglu p").html(msg.gift_code);
				}
			};
			$(".before_denglu").removeClass("active");
			$(".after_denglu").addClass("active");
			$(".t_phone").html(data.msg.phone);
		} else {
			base.isLogin = false;
		}
	},"json");
}
//点击预约按钮判断弹窗
$(".lgyy").click(function (){
	if(!base.isLogin){
		$(".login").show();
		return;
	}
	if(!base.isYueyue){
		$(".yuyue").show();
		return;
	}
	if(base.isYueyue == true){
		alert("请勿重复预约~");
		return;
	}
	if(base.gift_code =="" || mbase.gift_code == undefined){
				   $(".div_img p").html("礼包码获取异常~");
				}else{
				   $(".div_img p").html(msg.gift_code);
	}
});
//点击登录按钮
$(".before_denglu").click(function (){
	if(!base.isLogin){
		$(".login").show();
		return;
	}
	if(!base.isYueyue){
		$(".yuyue").show();
		return;
	}
	if(base.isYueyue == true){
		$(this).unbind();
		return;
	}
});
//获取手机验证码
$(".g_code").click(function (){
	var phone = $(".phone").val();
	var t_yzm = $(".t_yzm").val();
	if(phone == "" || phone == undefined){
		$(".phone").siblings("i").addClass("active");
		return;
	}
	if(t_yzm == "" || t_yzm == undefined){
		$(".t_yzm").siblings("i").addClass("active");
		return;
	}
	$.post("/common/get-login-verify.html" , {
		"phone": phone,
		"captcha": t_yzm,
		"cms_csrf": srf,
		"smsContent":"您正在登陆《明日决胜！》官方网站账户。欢迎来到《明日决胜！》的奇幻世界，小伙伴们在这里等你到来哦"
	} , function (data){
		if(data.status == 0){
			$(".s_put i").removeClass("active");
			sendemail();
		} else {
			load_captcha();
			alert(data.msg);
		}
	},"json");
});
//点击登录
$(".n_btn").click(function (){
	var phone = $(".phone").val();
	var yzm = $(".yzm").val();
	if(phone == "" || phone == undefined){
		$(".phone").siblings("i").addClass("active");
		return;
	}
	if(phone.length != 11){
		$(".phone").siblings("i").addClass("active");
		return;
	}
	if(yzm == "" || yzm == undefined){
		$(".yzm").siblings("i").addClass("active");
		return;
	}
	$.post("/site/login-new.html", {
		"phone": phone,
		"yzm": yzm,
		"cms_csrf": srf
	} ,function (data){
		if(data.status == 0){
			if(data.msg.data.is_yuyue == 0) {
				$(".login").hide();
				$(".yuyue").show();
			} else {
				$(".login").hide();
			}
			isLogin();
		} else {
			load_captcha();
			alert(data.msg);
		}
	},"json");
});
//点击预约
$(".n_yuyue").click(function (){
	var type = $(".yuyue_body ul li.active").attr("data-type");
	$.post("/site/yuyue-new.html" , {
		"type":"android",
		"cms_csrf": srf
	} ,function (data){
		if(data.status == 0){
			alert("预约成功");
			$(".yuyue").hide();
			$(".success").show();
			$(".success .after_denglu p").html(data.msg);
			isLogin();
		} else {
			alert(data.msg);
		}
	},"json");
});
//点击关闭弹窗
$(".close").click(function (){
	$(this).parent().parent().hide();

});
//点击刷新图片验证码
$(".captcha").click(function() {
	load_captcha();
});
//点击注销
$(".zhuxiao").click(function (){
	$.get("/site/logout-new.html", {
		
	} , function (data){
		if(data.status == 0){
			alert("注销成功");
			location.reload();
		} else {
			alert(data.msg);
		}
	},"json");
});
//手机类型点击筛选
$(".yuyue_body ul li").click(function (){
	$(this).addClass("active").siblings().removeClass("active");
});
$(function (){
	isLogin();
	//初始化复制分享链接
	new Clipboard('#tc11_copyBtnz');
	$(".fuzhi").click(function (){
		alert("已复制");
	})

});
