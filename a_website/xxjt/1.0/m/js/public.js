var srf = $('meta[name="csrf-token"]').attr('content');
var is_focus = 0; //input获取事件焦点
var verify_url='/commonMethod/ajax-yuyue-verify';//登录发送验证码
var yy_url='/commonMethod/ajax-yuyue.html';//预约
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
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
	imgMarkIndex++;
	var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		//$(".co_captcha").html(data.msg);
		$(".captcha").html(data.msg);
	}, 'json');
}
//图片验证码刷新
$(".captcha").click(function() {
	load_captcha();
	is_focus = 2;
});
//图片验证码焦点获取显示验证码
//$(".login input").focus(function() {
//	is_focus++;
//	$(".y_put").css("display", "block");
//	console.log(is_focus);
//	if(is_focus == 1) {
//		load_captcha();
//	}
//});
$(".i_back").click(function() {
	var a;

	function back() {
		a = setInterval(go_top, 5);
	}

	function go_top() {
		if(window.scrollY <= 0) {
			clearInterval(a);
		} else {
			scrollTo(0, window.scrollY - 50);
		}
	}
	back();
});
$(".weixin").click(function() {
	$(".big_img").show();
});
$(".big_img").click(function() {
	$(this).hide();
})
//手机类型选择
$(".select_ul li").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
});
$(".pub_yy").click(function() {
	$(".login").show();
});
$(".tc_yy").click(function() {
	var phone = $(".phone").val();
	var yzm = $(".yzm").val();
	var type = $(".select_ul li.active").attr("data-type");
	if(phone == "" || phone == undefined) {
		$(".phone").siblings("i").css("visibility", "visible");
		return;
	}
	if(phone.length != 11) {
		$(".phone").siblings("i").css("visibility", "visible");
		return;
	}
	if(yzm == "" || yzm == undefined) {
		$(".yzm").siblings("i").css("visibility", "visible");
		return;
	}
	$(".wrong").css("visibility", "hidden");
	$.post("/commonMethod/ajax-yuyue.html", {
		"phone": phone,
		"yzm": yzm,
		"cms_csrf": srf,
		"email":"",
		"type": type,
		"unique_phone":"1",
		"scene": 2
	}, function(data) {
		if(data.status == 0) {
			$(".login").hide();
			alert("预约成功");
			$(".login input").val("");
		}else if(data.status == -1){
                    if(data.is_repeat==1){
                        $(".s_put input").val("");
                        $(".t_yzm").val("");
                        $(".yzm").val("");
                        load_captcha();
                        alert(data.msg);
                    }
        }else {
			load_captcha();
			alert(data.msg);
		}
	}, "json");
});
//登录获取验证码
$(".g_code").click(function() {
	var phone = $(".phone").val();
	var yzm = $(".yzm").val();
	var captcha = $(".t_yzm").val();
	var type = $(".select_ul li.active").attr("data-type");
	if(phone == "" || phone == undefined) {
		$(".phone").siblings("i").css("visibility", "visible");
		return;
	}
	if(phone.length != 11) {
		$(".phone").siblings("i").css("visibility", "visible");
		return;
	}
//	if(captcha == "" || captcha == undefined) {
//		$(".t_yzm").siblings("i").css("visibility", "visible");
//		return;
//	}
	$(".wrong").css("visibility", "hidden");
	$.post("/common/get-login-verify.html", {
		"phone": phone,
		"captcha": captcha,
		"cms_csrf":srf
	}, function(data) {
		if(data.status == 0) {
			sendemail();
		} else if(data.status == -2){
			alert(data.msg);
			load_captcha();
			$(".y_put").show();
		} else {
			alert(data.msg);
			load_captcha();
		}
	}, 'json');
});
$(".h_nav").click(function() {
	if($(".h_ul").css("display") == "none") {
		$(this).addClass("active");
		$(".h_ul").stop().slideDown();
	} else {
		$(this).removeClass("active");
		$(".h_ul").stop().slideUp();
	}
});
$('.close').click(function() {
	$(".login").hide();
})