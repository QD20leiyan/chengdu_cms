//60s倒计时验证
var countdown = 60;
var countdown01 = 60;
var countdown02 = 60;
var is_show_captcha = 0;

function sendemail() {
	var obj = $(".g_code");
	settime(obj);
};

function sendmail01() {
	var obj = $(".gg_code");
	settime01(obj);
}

function sendmail02() {
	var obj = $(".dg_code");
	settime02(obj);
}

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
function settime01(obj) { //发送验证码倒计时
	if(countdown01 == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		countdown01 = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("重新发送(" + countdown01 + ")");
		countdown01--;
	}
	setTimeout(function() {
		settime01(obj)
	}, 1000)
};
function settime02(obj) { //发送验证码倒计时
	if(countdown02 == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		countdown02 = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("重新发送(" + countdown02 + ")");
		countdown02--;
	}
	setTimeout(function() {
		settime02(obj)
	}, 1000)
};
//图片验证码
var imgMarkIndex = 1;

function load_captcha() {
	var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha").html(data.msg);
	}, 'json');
}
//获取预约人数
function yyNumber() {
	var url = '/common/get-yuyue-count.html';
	var params = {
		"name": "fwy_total",
	}
	$.post(url, params, function(data) {
		if(data.status == 0) {
			$(".renshu").html(data.msg);
			if(data.msg < 5000) {
				$(".jdt i").css({
					width: "4%"
				})
			}
			if(data.msg == 5000) {
				$(".jdt i").css({
					width: "10%"
				})
			}
			if(data.msg >= 5000 && data.msg < 7000) {
				$(".jdt i").css({
					width: "19%"
				})
			}
			if(data.msg >= 7000 && data.msg < 10000) {
				$(".jdt i").css({
					width: "25%"
				})
			}
			if(data.msg == 10000) {
				$(".jdt i").css({
					width: "30%"
				})
			}
			if(data.msg >= 10000 && data.msg < 30000) {
				$(".jdt i").css({
					width: "39%"
				})
			}
			if(data.msg >= 30000 && data.msg < 50000) {
				$(".jdt i").css({
					width: "45%"
				})
			}
			if(data.msg == 50000) {
				$(".jdt i").css({
					width: "50%"
				})
			}
			if(data.msg >= 50000 && data.msg < 70000) {
				$(".jdt i").css({
					width: "59%"
				})
			}
			if(data.msg >= 70000 && data.msg < 100000) {
				$(".jdt i").css({
					width: "66%"
				})
			}
			if(data.msg == 100000) {
				$(".jdt i").css({
					width: "70%"
				})
			}
			if(data.msg >= 100000 && data.msg < 300000) {
				$(".jdt i").css({
					width: "78%"
				})
			}
			if(data.msg >= 300000 && data.msg < 500000) {
				$(".jdt i").css({
					width: "84%"
				})
			}
			if(data.msg == 500000) {
				$(".jdt i").css({
					width: "90%"
				})
			}
			if(data.msg > 500000) {
				$(".jdt i").css({
					width: "90%"
				})
			}
			if(data.msg >= 5000) {
				$(".gift_ul li:nth-child(1)").addClass("active");
			}
			if(data.msg >= 10000) {
				$(".gift_ul li:nth-child(2)").addClass("active");
			}
			if(data.msg >= 50000) {
				$(".gift_ul li:nth-child(3)").addClass("active");
			}
			if(data.msg >= 100000) {
				$(".gift_ul li:nth-child(4)").addClass("active");
			}
			if(data.msg >= 500000) {
				$(".gift_ul li:nth-child(5)").addClass("active");
			}
		}
	}, "json");
};
var base = {
	isLogin: false,
	isYueyue: false,
	is_choose: 0,
	is_type: 0,
	is_denglu: false,
};
//鼠标悬浮预约礼包
$(".gift_ul li").hover(function() {
	var index = $(this).index();
	$(".show_ul").show();
	$(".show_ul li").eq(index).addClass("active");
}, function() {
	var index = $(this).index();
	$(".show_ul").hide();
	$(".show_ul li").eq(index).removeClass("active");
});
$(".show_ul li").hover(function() {
	$(".show_ul").show();
	$(this).addClass("active");
}, function() {
	var index = $(this).index();
	$(".show_ul").hide();
	$(this).removeClass("active");
});
////隔几秒给星星加效果
function o() {
	var e = Math.floor(Math.random() * i);
	return e
}
var s, i = $(".third .star").length,
	n = 0,
	a = this;
for(var t = 0; t <= (0 == o() ? 2 : o()); t++) $(".star .hover_out").eq(t).addClass("ani");
s = setInterval(function() {
	$(".lryx .cir .hover_out").removeClass("ani"), $(".star .hover_out").addClass("aniOut");
	for(var e = 0; e <= (0 == o() ? 2 : o()); e++) $(".star .hover_out").eq(o()).removeClass("aniOut").addClass("ani")
}, 1000)
var srf = $("meta[name='csrf-token']").attr("content");
//鼠标悬浮出来微信二维码
$(".nav_ul li:nth-child(1)").hover(function() {
	$(".wx_ewm").stop().fadeIn();
}, function() {
	$(".wx_ewm").stop().fadeOut();
});
//点击登录按钮出来弹窗
$(".denglu").click(function() {
	$(".c_login").removeClass("active");
	$(".login_bottom>div:nth-child(2)").show();
	$(".login_type .login_title").attr("src" , alt +"images/l_title01.png");
	$(".login_type").show();
});
//点击选择手机登录
$("#x_phone").click(function() {
	$(".login_type").hide();
	$(".login").show();
});
//点击不关联关闭弹窗
$(".guanlian").click(function (){
	$(".account").hide();
});
//点击预约判断弹窗显示
$(".p_yuyue").click(function() {
	if(!base.isLogin) {
		$(".c_login").addClass("active");
		$(".login_bottom>div:nth-child(2)").show();
		$(".login_type .login_title").attr("src" , alt +"images/l_title02.png");
		$(".login_type").show();
		return;
	}
	if(!base.is_denglu && base.isLogin == true){
		$(".bind_phone").show();
		return;
	}
	if(base.isLogin && base.isYueyue == false) {
		$(".select").show();
		return;
	}
	if(base.isLogin && base.isYueyue == true) {
		$(".success").show();
		return;
	}
});
//选择设备类型
$(".select_ul li").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
})
//点击预约
$(".new_yy").click(function() {
	fgw_yy_pc();
	var type = $(".select_ul li.active").attr("data-type");
	$.post("/site/yuyue-new.html", {
		"type": type,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			fgw_yy_pc_success();
			$(".select").hide();
			$(".success .s_code span").html(data.msg);
			$(".success").show();
			isLogin();
		} else {
			alert(data.msg);
		}
	}, "json");
});
//点击刷新图片验证码
$(".captcha").click(function() {
	load_captcha();
});
//点击关闭弹窗
$(".c_close").click(function() {
	$(this).parent().parent().hide();
	$(".wrong").hide();
});
$(".n_close").click(function() {
	$(this).parent().parent().parent().hide();
	$(".wrong").hide();
})
//滚动屏幕出现回到顶部按钮
$(window).scroll(function() {
	var scroll = $(this).scrollTop();
	if(scroll > 400) {
		$(".back_top").stop().fadeIn();
	} else {
		$(".back_top").stop().fadeOut();
	}
	if(scroll < 100) {
		$(".white").css({
			"opacity": 0,
		});
	}
	if(scroll > 100) {
		$(".white").css({
			"opacity": .1,
			"z-index": 10
		});
	}
	if(scroll > 200) {
		$(".white").css({
			"opacity": 0.2
		});
	}
	if(scroll > 300) {
		$(".white").css({
			"opacity": 0.3
		});
	}
	if(scroll > 400) {
		$(".white").css({
			"opacity": 0.4
		});
	}
	if(scroll > 500) {
		$(".white").css({
			"opacity": 0.5
		});
	}
	if(scroll > 600) {
		$(".white").css({
			"opacity": 0.6
		});
	}
	if(scroll > 700) {
		$(".white").css({
			"opacity": 0.7
		});
	}
	if(scroll > 800) {
		$(".white").css({
			"opacity": 0.8
		});
	}
	if(scroll > 900) {
		$(".white").css({
			"opacity": .9
		});
		$(".c_white").css({
			"opacity": .1
		});
	}
	if(scroll > 1000) {
		$(".c_white").css({
			"opacity": .2
		});
	}
	if(scroll > 1100) {
		$(".c_white").css({
			"opacity": .3
		});
	}
	if(scroll > 1200) {
		$(".c_white").css({
			"opacity": .4
		});
	}
	if(scroll > 1300) {
		$(".c_white").css({
			"opacity": .5
		});
	}
	if(scroll > 1400) {
		$(".c_white").css({
			"opacity": .5
		});
	}
	if(scroll > 1500) {
		$(".c_white").css({
			"opacity": .6
		});
	}
	if(scroll > 1600) {
		$(".c_white").css({
			"opacity": .7
		});
	}
	if(scroll > 1700) {
		$(".c_white").css({
			"opacity": .8
		});
	}
})
//点击返回顶部
$(".back_top").click(function() {
	$("html,body").animate({
		scrollTop: 0
	}, 500);
});
var clickTap = true;
//点击浮窗缩进
$(".shensuo").click(function() {
	if(clickTap) {
		$(".float").css("right", "-175px");
		$(".float").addClass("active");
		clickTap = false;
	} else {
		$(".float").css("right", "0");
		$(".float").removeClass("active");
		clickTap = true;
	}
});
//点击发送验证码
$(".g_code").click(function() {
	if(countdown != 60 && countdown > 0) {
		return;
	}
	var phone = $(".phone").val();
	var t_yzm = $(".t_yzm").val();
	if(phone == "" || phone == undefined) {
		$(".phone").siblings("i").show();
		return;
	}
	$(".phone").siblings("i").hide();
	if(is_show_captcha == 1) {
		if(t_yzm == "" || t_yzm == undefined) {
			$(".captcha").siblings("i").show();
			return;
		}
	}

	$(".captcha").siblings("i").hide();
	$.post("/common/get-login-verify.html", {
		"phone": phone,
		"captcha": t_yzm,
		"cms_csrf": srf,
		"smsContent": "您正在登陆《明日决胜！》官方网站账户。欢迎来到超Q萌冒险世界，小伙伴们在这里等你哦"
	}, function(data) {
		if(data.status == 0) {
			$(".s_put .wrong").hide();
			sendemail();
		} else {
			if(data.status == -2) {
				$('.yuyue_captcha').show();
			}
			load_captcha();
			alert(data.msg);
		}
	}, "json");
});
//点击登录
$(".login_btn").click(function() {
	var phone = $(".phone").val();
	var yzm = $(".yzm").val();
	if(phone == "" || phone == undefined) {
		$(".phone").siblings("i").show();
		return;
	}
	$(".phone").siblings("i").hide();
	if(phone.length != 11) {
		$(".phone").siblings("i").show();
		return;
	}
	$(".phone").siblings("i").hide();
	if(yzm == "" || yzm == undefined) {
		$(".g_code").siblings("i").show();
		return;
	}
	$(".g_code").siblings("i").hide();
	$.post("/site/login-new.html", {
		"phone": phone,
		"yzm": yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			$(".wrong").hide();
			if(data.msg.data.is_yuyue == 0) {
				$(".login").hide();
				$(".select").show();
			} else {
				$(".login").hide();
			}
			isLogin();
		} else {
			load_captcha();
			alert(data.msg);
		}
	}, "json");
});
//点击确定关闭弹窗
$(".p_sure").click(function() {
	$(this).parent().parent().parent().parent().hide();
	$(".wrong").hide();
});
$(".l_sure").click(function() {
	if($(this).hasClass("active")) {
		location.reload();
	} else {
		$(this).parent().parent().hide();
	}
});
//判断用户是否登录
function isLogin() {
	$.get("/site/get-user-info-new.html", {}, function(data) {
		$(".qq_denglu").attr("href", data.qqLoginUrl);
		$(".weixin_denglu").attr("href", data.wechatLoginUrl);
		if(data.is_show_captcha != "undefined" && data.is_show_captcha == 1) {
			$('.yuyue_captcha').show();
			is_show_captcha = 1;
		} else {
			$('.yuyue_captcha').hide();
			is_show_captcha = 0;
		}
		if(data.status == 0) {
			base.is_denglu = true;
			base.isLogin = true;
			var msg = data.msg.data;
			$(".t_phone").html(data.msg.phone);
			if(msg.is_yuyue == 0) {
				base.isYueyue = false;
				$(".gift_code p").html("未预约成功");
				$(".float_li .g_second span").html("未预约成功");
			} else {
				base.isYueyue = true;
				if(msg.gift_code == "" || msg.gift_code == undefined) {
					$(".gift_code p").html("礼包码获取异常~");
					$(".float_li .g_second span").html("礼包码获取异常~");
					$(".s_code span").html("礼包码获取异常~");
				} else {
					$(".gift_code p").html(msg.gift_code);
					$(".s_code span").html(msg.gift_code);
					$(".float_li .g_second span").html(msg.gift_code);
				}
			};
			$(".before_denglu").removeClass("active");
			$(".after_denglu").addClass("active");
			$(".yuyue .c_yy").removeClass("active");
			$(".yuyue .gift_code").addClass("active");
			if(msg.gift_id_status[5] == 1) {
				$(".giftDialog1 .li_bottom .get").hide();
				$(".float_one .g_second").text('已领取').css("color", "#34baff");
			}
			if(msg.gift_id_status[5] == 2) {
				$(".float_one .g_second").text('待领取').css("color", "#34baff");
			}
			if(msg.gift_id_status[5] == 3) {
				$(".float_one .g_second").text('未达成').css("color", "#a5dbfe");
			}
			if(msg.gift_id_status[6] == 1) {
				$(".giftDialog2 .li_bottom .get").hide();
				$(".float_two .g_second").text('已领取').css("color", "#34baff");
			}
			if(msg.gift_id_status[6] == 2) {
				$(".float_two .g_second").text('待领取').css("color", "#34baff");
			}
			if(msg.gift_id_status[6] == 3) {
				$(".float_two .g_second").text('未达成').css("color", "#a5dbfe");
			}
			if(msg.gift_id_status[7] == 1) {
				$(".giftDialog3 .li_bottom .get").hide();
				$(".float_three .g_second").text('已领取').css("color", "#34baff");
			}
			if(msg.gift_id_status[7] == 2) {
				$(".float_three .g_second").text('待领取').css("color", "#34baff");
			}
			if(msg.gift_id_status[7] == 3) {
				$(".float_three .g_second").text('未达成').css("color", "#a5dbfe");
			}
			if(msg.gift_id_status[8] == 1) {
				$(".giftDialog4 .li_bottom .get").hide();
				$(".float_four .g_second").text('已领取').css("color", "#34baff");
			}
			if(msg.gift_id_status[8] == 2) {
				$(".float_four .g_second").text('待领取').css("color", "#34baff");
			}
			if(msg.gift_id_status[8] == 3) {
				$(".float_four .g_second").text('未达成').css("color", "#a5dbfe");
			}
			if(msg.gift_id_status[9] == 1) {
				$(".giftDialog5 .li_bottom .get").hide();
				$(".float_five .g_second").text('已领取').css("color", "#34baff");
			}
			if(msg.gift_id_status[9] == 2) {
				$(".float_five .g_second").text('待领取').css("color", "#34baff");
			}
			if(msg.gift_id_status[9] == 3) {
				$(".float_five .g_second").text('未达成').css("color", "#a5dbfe");
			}
			if(data.loginMethod == "phone"){
				$(".isLogin_ul li:nth-child(1)").hide();
				$(".isLogin_ul li:nth-child(2)").hide();
				$(".isLogin_ul li:nth-child(3)").hide();
				$(".isLogin_ul").css({"height" : "65px","top" : "39px"});
				$(".isLogin_ul li.zhuxiao").css("margin-top" , "16px");
			} else if(data.loginMethod == "qq" || data.loginMethod == "wechat"){
				$(".isLogin_ul li:nth-child(1)").hide();
				$(".isLogin_ul li:nth-child(2)").hide();
				$(".isLogin_ul").css("height" , "100px");
				$(".gaibang").css("margin-top" , "17px");
			}
		} else if(data.status == 1) {
			base.is_denglu = false;
			base.isLogin = true;
			$(".isLogin_ul li:nth-child(1)").hide();
			$(".isLogin_ul li:nth-child(2)").hide();
			$(".isLogin_ul").css("height" , "100px");
			$(".gaibang").css("margin-top" , "17px");
			$(".bind_phone").show();
			$(".t_phone").html(data.name);
			$(".before_denglu").removeClass("active");
			$(".after_denglu").addClass("active");
		} else {
			base.isLogin = false;
		}
	}, "json");
}
//点击注销
$(".zhuxiao").click(function() {
	$.get("/site/logout-new.html", {

	}, function(data) {
		if(data.status == 0) {
			$(".c_message p").html("注销成功");
			$(".message").show();
			$(".l_sure").addClass("active");
		} else {
			alert(data.msg);
		}
	}, "json");
});
//点击查看礼包功能
$("#check_gift").click(function() {
	if(!base.isLogin) {
		$(".login_type").show();
		$(".c_login").addClass("active");
		$(".login_bottom>div:nth-child(2)").show();
		$(".login_type .login_title").attr("src" , alt +"images/l_title02.png");
		return;
	}
	if(!base.is_denglu && base.isLogin == true){
		$(".bind_phone").show();
		return;
	}
	if(base.isLogin && base.isYueyue == false) {
		$(".select").show();
		return;
	}
	if(base.isLogin && base.isYueyue == true) {
		$(".my_gift").show();
		return;
	}
});

//点击立即领取弹出弹窗
$(".gift_ul li").click(function() {
	if(!base.isLogin) {
		$(".login_type").show();
		$(".c_login").addClass("active");
		$(".login_bottom>div:nth-child(2)").show();
		$(".login_type .login_title").attr("src" , alt +"images/l_title02.png");
		return;
	}
	if(!base.is_denglu && base.isLogin == true){
		$(".bind_phone").show();
		return;
	}
	if(base.isLogin && base.isYueyue == false) {
		$(".select").show();
		return;
	}
	$(".my_gift").show();
	//	$(".fail").show();
});
//一键领取到游戏
$(".yjlq_p").click(function() {
	$.post("/site/get-prop-new.html", {}, function(data) {
		if(data.status == 0) {
			$(".my_gift").hide();
			$(".c_message p").html("奖励已发送成功，<br />请至游戏内，查看邮箱领取奖励");
			$(".message").show();
			isLogin();
			return;
		} else if(data.status == -2) {
			$(".repeat_fail").show();
			return;
		} else {
			$(".fail").show();
			return;
		}
	}, "json");
});
//悬浮账户操作
$(".control_count").hover(function() {
	$(".isLogin_ul").show();
}, function() {
	$(".isLogin_ul").hide();
});
$(".isLogin_ul").hover(function() {
	$(this).show();
}, function() {
	$(this).hide();
});
//绑定手机发送验证码
$(".dg_code").click(function (){
	if(countdown02 != 60 && countdown02 > 0) {
		return;
	}
	var phone = $(".d_phone").val();
	var t_yzm = $(".dt_yzm").val();
	if(phone == "" || phone == undefined) {
		$(".d_phone").siblings("i").show();
		return;
	}
	$(".d_phone").siblings("i").hide();
	if(is_show_captcha == 1) {
		if(t_yzm == "" || t_yzm == undefined) {
			$(".captcha").siblings("i").show();
			return;
		}
	}
	$(".captcha").siblings("i").hide();
	$.post("/common/get-login-verify.html", {
		"phone": phone,
		"captcha": t_yzm,
		"cms_csrf": srf,
		"smsContent": "您正在登陆《明日决胜！》官方网站账户。欢迎来到超Q萌冒险世界，小伙伴们在这里等你哦"
	}, function(data) {
		if(data.status == 0) {
			$(".s_put .wrong").hide();
			sendmail02();
		} else {
			if(data.status == -2) {
				$('.yuyue_captcha').show();
			}
			load_captcha();
			alert(data.msg);
		}
	}, "json");
});
//改绑手机号
$(".gaibang").click(function (){
	if(!base.is_denglu){
		$(".bind_phone").show();
		return;
	}
	$(".binding").show();
})
//首次关联绑定手机
$(".lgbd").click(function() {
	var phone = $(".d_phone").val();
	var yzm = $(".d_yzm").val();
	if(phone == "" || phone == undefined) {
		$(".d_phone").siblings("i").show();
		return;
	}
	$(".d_phone").siblings("i").hide();
	if(phone.length != 11) {
		$(".d_phone").siblings("i").show();
		return;
	}
	$(".d_phone").siblings("i").hide();
	if(yzm == "" || yzm == undefined) {
		$(".dg_code").siblings("i").show();
		return;
	}
	$(".dg_code").siblings("i").hide();
	$.post("/site/bind-phone.html", {
		"phone": phone,
		"yzm": yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			$(".wrong").hide();
			$(".bind_phone").hide();
			$(".select").show();
			isLogin();
		} else {
			load_captcha();
			$(".c_message p").html(data.msg);
			$(".message").show();
		}
	}, "json");
});
//更改绑定手机号获取验证码
$(".gg_code").click(function (){
	if(countdown01 != 60 && countdown01 > 0) {
		return;
	}
	var phone = $(".g_phone").val();
	var t_yzm = $(".g_t_yzm").val();
	if(phone == "" || phone == undefined) {
		$(".g_phone").siblings("i").show();
		return;
	}
	$(".g_phone").siblings("i").hide();
	if(is_show_captcha == 1) {
		if(t_yzm == "" || t_yzm == undefined) {
			$(".captcha").siblings("i").show();
			return;
		}
	}
	$(".captcha").siblings("i").hide();
	$.post("/common/get-login-verify.html", {
		"phone": phone,
		"captcha": t_yzm,
		"cms_csrf": srf,
		"smsContent": "您正在登陆《明日决胜！》官方网站账户。欢迎来到超Q萌冒险世界，小伙伴们在这里等你哦"
	}, function(data) {
		if(data.status == 0) {
			$(".s_put .wrong").hide();
			sendmail01();
		} else {
			if(data.status == -2) {
				$('.yuyue_captcha').show();
			}
			load_captcha();
			alert(data.msg);
		}
	}, "json");
});
//确认改绑
$(".binding_btn").click(function (){
	var phone = $(".g_phone").val();
	var yzm = $(".g_yzm").val();
	if(phone == "" || phone == undefined) {
		$(".g_phone").siblings("i").show();
		return;
	}
	$(".g_phone").siblings("i").hide();
	if(phone.length != 11) {
		$(".g_phone").siblings("i").show();
		return;
	}
	$(".g_phone").siblings("i").hide();
	if(yzm == "" || yzm == undefined) {
		$(".gg_code").siblings("i").show();
		return;
	}
	$(".gg_code").siblings("i").hide();
	$.post("/site/change-bind-phone.html", {
		"phone": phone,
		"yzm": yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			$(".wrong").hide();
			alert("改绑成功");
			$(".binding").hide();
			isLogin();
		} else {
			load_captcha();
			alert(data.msg);
		}
	}, "json");
});
//$(".yjlq_p").click(function (){
//	$(".fail").show();
//});
$(function() {
	isLogin();
	yyNumber();
	//初始化复制分享链接
	new Clipboard('#tc13_copyBtnz');
	$(".fuzhi").click(function() {
		alert("已复制~");
	})
});