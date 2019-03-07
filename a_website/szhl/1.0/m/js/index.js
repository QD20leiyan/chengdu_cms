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
	imgMarkIndex++;
	var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
}

function stop() {
	$("html,body").css({
		"overflow": "hidden",
		"width": "100%",
		"height": "100%"
	});
};

function move() {
	$("html,body").css({
		"overflow": "visible",
		"width": "100%",
		"height": "auto"
	});
};
//邮箱格式
function isEmail(email) {
      var reg = /^[^@]+@[^@]+\.[^@]+$/;
    var temp = reg.test(email);
    return temp;
  }
var srf = $("meta[name='csrf-token']").attr("content");
var type = "";
$(function() {
	load_captcha();
	var u = navigator.userAgent;
	if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
		type = "android";
	} else if(u.indexOf('iPhone') > -1) {
		type = "ios";
	} else if(u.indexOf('Windows Phone') > -1) {
		//winphone手机
	}
	var mySwiper = new Swiper(".swiper-container", {
		loop: true,
		autoplay:4000,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		pagination: '.swiper-pagination',
		autoplayDisableOnInteraction : false,
		paginationClickable: true
	});
	var mySwiper01 = new Swiper(".m_banner", {
		loop: true,
		autoplay:4000,
		pagination: '.swiper-pagination1',
		autoplayDisableOnInteraction : false,
		paginationClickable: true
	});
	$(".tit_ul li").click(function (){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".news_div>ul").eq(index).addClass("active").siblings().removeClass("active");
	});
	//点击预约
	$(".c_yuyue").click(function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid) {
			$(".login_main").removeClass("active");
			$(".login").show();
		    stop();
		}
		if(isIOS) {
			$(".login_main").addClass("active");
			$(".login").show();
		    stop();
		}
	});
	//关闭弹窗
	$(".close").click(function() {
		$(".login").hide();
		move();
	});
	//发送验证码
	$(".g_code").click(function() {
		var phone = $(".phone").val();
		var t_yzm = $(".t_yzm").val();
		var email= $('.email').val();
		if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
			type = "android";
			email= '';
		}
		if(u.indexOf('iPhone') > -1) {
			type = "ios";
		    if(email == "" || email == undefined || !isEmail(email)) {
			   alert("请输入邮箱~");
			return;
		   }
		}
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(t_yzm == "" || t_yzm == undefined) {
			alert("图片验证码不能为空");
			return;
		}
		$.post(y_url, {
			"phone": phone,
			"email":email,
			"captcha": t_yzm,
			"type":type,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				sendemail();
			} else {
				alert(data.msg);
				load_captcha();
			}
		}, 'json');
	});
	//点击登录
	$(".c_btn").click(function() {
		 fgw_yy_wap();
		var phone = $(".phone").val();
		var yzm = $(".yzm").val();
		var email = $(".email").val();
		if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
			type = "android";
			email= '';
		}
		if(u.indexOf('iPhone') > -1) {
			type = "ios";
		    if(email == "" || email == undefined || !isEmail(email)) {
			   alert("请输入邮箱~");
			return;
		   }
		}
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(yzm == "" || yzm == undefined) {
			alert("验证码不正确");
			return;
		}
		$.post(f_url, {
			"email": email,
			"phone": phone,
			"yzm": yzm,
			"type": type,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				fgw_yy_wap_success();
				alert("预约成功~");
				$(".login").hide();

				move();
			} else {
				load_captcha();
				alert(data.msg);
			}
		}, "json");
	});
	//刷新图片验证码
	$(".captcha").click(function() {
		load_captcha();
	});
})