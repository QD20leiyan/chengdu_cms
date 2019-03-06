//60s倒计时验证
var countdown = 60;
var countdown01 = 60;
var countdown02 = 60;
var clickNumber2 = 0;
var is_show_captcha = 0;
// 设备类型判断
function change() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	var url = window.location.href;
	var url_id = window.location.href.split('cover')[1];
	console.log(url_id);
	if(isIOS) {
		$(".l_download .gf,.yy_box").removeClass("stat_cover_wap_down");
		$(".l_download .gf,.yy_box").removeClass("js_wap_down");
		$(".l_download .gf,.yy_box").attr("href", "javascript:yx_showTips('抱歉,iOS暂时还未上架，请使用安卓设备下载体验');");
		$(".down_btn22").removeClass("stat_cover_wap_down");
		$(".down_btn22").removeClass("js_wap_down");
		$(".down_btn22").attr("href", "javascript:yx_showTips('抱歉,iOS暂时还未上架，请使用安卓设备下载体验');");
	}
	if(isAndroid) {
		$(".l_download .gf,.yy_box").addClass("stat_cover_wap_down");
		$(".l_download .gf,.yy_box").addClass("js_wap_down");
		$(".l_download .gf,.yy_box").attr("href", "javascript:;");
		$(".down_btn22").addClass("stat_cover_wap_down");
		$(".down_btn22").addClass("js_wap_down");
		$(".down_btn22").attr("href", "hjavascript:;");
	}
}

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
		obj.html("获取验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.html("重新发送(" + countdown + ")");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
};
function settime01(obj) { //发送验证码倒计时
	if(countdown01 == 0) {
		obj.attr('disabled', false);
		obj.html("获取验证码");
		countdown01 = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.html("重新发送(" + countdown01 + ")");
		countdown01--;
	}
	setTimeout(function() {
		settime01(obj)
	}, 1000)
};
function settime02(obj) { //发送验证码倒计时
	if(countdown02 == 0) {
		obj.attr('disabled', false);
		obj.html("获取验证码");
		countdown02 = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.html("重新发送(" + countdown02 + ")");
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
					width: "100%"
				})
			}
			if(data.msg >= 5000) {
				$(".li_one").addClass("active");
				$(".li_one>p a").show();
				$(".li_one>img").attr("src", alt + "image1/gift_icon01_act.png");

			}
			if(data.msg >= 10000) {
				$(".li_two").addClass("active");
				$(".li_two>p a").show();
				$(".li_two>img").attr("src", alt + "image1/gift_icon02_act.png");
			}
			if(data.msg >= 50000) {
				$(".li_three").addClass("active");
				$(".li_three>p a").show();
				$(".li_three>img").attr("src", alt + "image1/gift_icon03_act.png");
			}
			if(data.msg >= 100000) {
				$(".li_four").addClass("active");
				$(".li_four>p a").show();
				$(".li_four>img").attr("src", alt + "image1/gift_icon04_act.png");
			}
			if(data.msg >= 500000) {
				$(".li_five").addClass("active");
				$(".li_five>p a").show();
				$(".li_five>img").attr("src", alt + "image1/gift_icon05_act.png");
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
$(".s_zhezhao").hide();
//鼠标悬浮预约礼包
$(".progress-box .progress-gift").click(function() {
	$(".s_zhezhao").show();
	$(this).find(".gift-details").show();
	if($(this).find(".gift-details").css("display") == "none") {
		$(".gift-btn").css({
			"position": "relative",
			"z-index": "10"
		});
		$(".look_gift").css({
			"position": "relative",
			"z-index": "10"
		});
		$(".zhezhao").hide();
	} else {
		$(".gift-btn").css({
			"position": "relative",
			"z-index": "0"
		});
		$(".look_gift").css({
			"position": "relative",
			"z-index": "0"
		});
		$(".zhezhao").show();
	};
	$(this).siblings().find(".gift-details").hide();
});
$(".s_zhezhao").click(function() {
	$(".gift-details").hide();
	$(this).hide();
	$(".zhezhao").hide();
	$(".gift-btn").css({
		"position": "relative",
		"z-index": "10"
	});
	$(".look_gift").css({
		"position": "relative",
		"z-index": "10"
	});
});
$(".zhezhao").click(function() {
	$(".gift-details").hide();
	$(this).hide();
	$(".gift-btn").css({
		"position": "relative",
		"z-index": "10"
	});
	$(".look_gift").css({
		"position": "relative",
		"z-index": "10"
	});
	$(".s_zhezhao").hide();
});
$(".gift-details").click(function() {
	$(this).hide();
});
var srf = $("meta[name='csrf-token']").attr("content");
//点击登录按钮出来弹窗
$(".denglu").click(function() {
	//	$("body,html").addClass("no_auto");
	//	$(".z_mask").removeClass("hidden");
	//	$(".login").removeClass("hidden").addClass("active");
//	$(".yuyue_bottom>aside:nth-child(1)").show();
//	$(".yuyue_bottom>aside:nth-child(2)").hide();
	$(".title03").attr("src" , alt + "image1/title03.png");
	$("#n_title").attr("src" , alt + "image1/n_title01.png");
	$(".login-btn").attr("src" , alt + "images/login-btn.png");
	$(".login_select").show();
});
//点击选择手机登录
$("#x_phone").click(function() {
	$(".login_select").hide();
	$(".z_mask").removeClass("hidden")
	$(".login").removeClass("hidden").addClass("active")
});
//点击不关联关闭弹窗
$(".no").click(function() {
	$(".account").hide();
});
//点击预约判断弹窗显示
$(".p_yuyue").click(function() {
	if(!base.isLogin) {
//		$("body,html").addClass("no_auto");
		$(".login_select").show();
		$("#n_title").attr("src" , alt + "image1/title03.png");
//		$(".z_mask").removeClass("hidden");
//		$(".yuyue_bottom>aside:nth-child(2)").show();
//		$(".yuyue_bottom>aside:nth-child(1)").hide();
//		$(".login").removeClass("hidden").removeClass("active");
		$(".title03").attr("src" , alt + "image1/title04.png");
		$(".login-btn").attr("src" , alt + "images/yuyue_btn.png");
		return;
	}
	if(!base.is_denglu && base.isLogin == true){
		$(".bind_phone").show();
		return;
	}
	if(base.is_denglu && base.isYueyue == false) {
		$(".account").show();
		return;
	}
	if(base.isLogin && base.isYueyue == false) {
		$(".z_mask").removeClass("hidden");
		$(".select").removeClass("hidden");
		return;
	}
	if(base.isLogin && base.isYueyue == true) {
		$(".z_mask").removeClass("hidden");
		$(".login").addClass("hidden");
		$(".reservations").removeClass("hidden");
		return;
	}
});
var clickTap = true;
$(".order").click(function() {
	if(clickTap) {
		$(".l_download").stop().slideDown();
		clickTap = false;
	} else {
		$(".l_download").stop().slideUp();
		clickTap = true;
	}
})
$('.l_download a').click(function() {
	$('.l_download').slideUp(500);
	clickTap = true;
})
//选择设备类型
$(".select_ul span").click(function() {
	$(this).addClass("curr").siblings().removeClass("curr");
})
//点击预约
$(".sure_btn img").click(function() {
	fgw_yy_wap();
	var type = $(".select_ul span.curr").attr("attr-type");
	$.post("/site/yuyue-new.html", {
		"type": type,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			fgw_yy_wap_success();
			$(".select").addClass("hidden");
			$(".z_mask").removeClass("hidden");
			$(".reservations").removeClass("hidden");
			$(".success .s_code span").html(data.msg);
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
$(".close").click(function() {
	$("body,html").removeClass("no_auto");
	$(".select").addClass("hidden");
	$(".reservations").addClass("hidden");
	$(".login").addClass("hidden");
	$(".z_mask").addClass("hidden");
	$(".my_gift_tips").fadeOut();
	$(".zhezhao").hide();
	$(".gift-details").hide();
	$(".gift-btn").css({
		"position": "relative",
		"z-index": "10"
	});
	$(".look_gift").css({
		"position": "relative",
		"z-index": "10"
	});
	$(".wrong").hide();
	$(".s_zhezhao").hide();
})
$(".close2").click(function() {
	$(".TKMask2").fadeOut();
	$(".gift-details").hide();
	$(".zhezhao").hide();
	$(".gift-btn").css({
		"position": "relative",
		"z-index": "10"
	});
	$(".look_gift").css({
		"position": "relative",
		"z-index": "10"
	});
	$(".s_zhezhao").hide();
	$(".wrong").hide();
})
$(".sure_btn2").click(function() {
	$(".TKMask2").fadeOut();
	$(".zhezhao").hide();
	$(".gift-details").hide();
	$(".gift-btn").css({
		"position": "relative",
		"z-index": "10"
	});
	$(".look_gift").css({
		"position": "relative",
		"z-index": "10"
	});
	$(".s_zhezhao").hide();
	$(".wrong").hide();
});
//点击关闭按钮关闭新增弹窗
$(".o_close").click(function (){
	$(this).parent().parent().hide();
	$(".wrong").hide();
});
//点击发送验证码
$(".g_code").click(function() {
	if(countdown != 60 && countdown > 0) {
		return;
	}
	var phone = $(".phone").val();
	var t_yzm = $(".t_yzm").val();
	if(phone == "" || phone == undefined) {
		$(".phone").parent().siblings(".wrong").show();
		return;
	}
	$(".phone").parent().siblings(".wrong").hide();
	if(is_show_captcha == 1) {
		if(t_yzm == "" || t_yzm == undefined) {
			$(".captcha").parent().siblings(".wrong").show();
			return;
		}
	}
	$(".captcha").parent().siblings(".wrong").hide();
	$.post("/common/get-login-verify.html", {
		"phone": phone,
		"captcha": t_yzm,
		"cms_csrf": srf,
		"smsContent": "您正在登陆《明日决胜！》官方网站账户。欢迎来到超Q萌冒险世界，小伙伴们在这里等你哦"
	}, function(data) {
		if(data.status == 0) {
			$(".wrong").hide();
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
$(".login-btn").click(function() {
	var phone = $(".phone").val();
	var yzm = $(".yzm").val();
	if(phone == "" || phone == undefined) {
		$(".phone").parent().siblings(".wrong").show();
		return;
	}
	$(".phone").parent().siblings(".wrong").hide();
	if(phone.length != 11) {
		$(".phone").parent().siblings(".wrong").show();
		return;
	}
	$(".phone").parent().siblings(".wrong").hide();
	if(yzm == "" || yzm == undefined) {
		$(".g_code").parent().siblings(".wrong").show();
		return;
	}
	$(".g_code").parent().siblings(".wrong").hide();
	$.post("/site/login-new.html", {
		"phone": phone,
		"yzm": yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			$("body,html").removeClass("no_auto");
			$(".wrong").hide();
			if(data.msg.data.is_yuyue == 0) {
				$(".login").addClass("hidden");
				$(".select").removeClass("hidden");
				$(".z_mask").addClass("hidden");
			} else {
				$(".login").removeClass("hidden");
				$(".z_mask").addClass("hidden");
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
	$(".reservations").addClass("hidden");
	$(".z_mask").addClass("hidden");
	$(".TKMask2").fadeOut();
	$(".wrong").hide();
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
			base.isLogin = true;
			base.is_denglu = true;
			var msg = data.msg.data;
			$(".t_phone").html(data.msg.phone);
			$(".user_info span").html(data.msg.phone);
			if(msg.is_yuyue == 0) {
				base.isYueyue = false;
				$(".gift_code p").html("未预约成功");
				$(".my_gift ul li.li .info1").html("未预约成功");
				$(".my_gift ul li.li .info2").hide();
			} else {
				base.isYueyue = true;
				if(msg.gift_code == "" || msg.gift_code == undefined) {
					$(".gift_code p").html("礼包码获取异常~");
					$(".my_gift ul li.li .info1").html("礼包码获取异常~");
					$(".my_gift ul li.li .info2").hide();
					$(".s_code span").html("礼包码获取异常~");
				} else {
					$(".gift_code p").html(msg.gift_code);
					$(".s_code span").html(msg.gift_code);
					$(".my_gift ul li.li .info1").html("礼包码为：");
					$(".my_gift ul li.li .info2").show();
					$(".my_gift ul li.li .info2").html(msg.gift_code);
					$(".float_li .g_second span").html(msg.gift_code);
				}
			};
			$(".before_denglu").removeClass("active");
			$(".after_denglu").addClass("active");
			$(".gift-btn .p_yy").removeClass("active");
			$(".gift-btn .gift_code").addClass("active");
			$(".c_yy").hide();
			if(msg.gift_id_status[5] == 1) {
				$(".li_one .lqq").hide();
				$(".li_one b").show();
				$(".my_gift ul .li1 p").removeClass("active");
				$(".my_gift ul .li1 p.status1").addClass("active");
			}
			if(msg.gift_id_status[5] == 2) {
				$(".li_one b").hide();
				$(".my_gift ul .li1 p").removeClass("active");
				$(".my_gift ul .li1 p.status4").addClass("active");
			}
			if(msg.gift_id_status[5] == 3) {
				$(".li_one .lqq").hide();
				$(".li_one b").show();
				$(".my_gift ul .li1 p").removeClass("active");
				$(".my_gift ul .li1 p.status3").addClass("active");
			}
			if(msg.gift_id_status[6] == 1) {
				$(".li_two .lqq").hide();
				$(".li_two b").show();
				$(".my_gift ul .li2 p").removeClass("active");
				$(".my_gift ul .li2 p.status1").addClass("active");
			}
			if(msg.gift_id_status[6] == 2) {
				$(".li_two b").hide();
				$(".my_gift ul .li2 p").removeClass("active");
				$(".my_gift ul .li2 p.status4").addClass("active");
			}
			if(msg.gift_id_status[6] == 3) {
				$(".li_two .lqq").hide();
				$(".li_two b").show();
				$(".my_gift ul .li2 p").removeClass("active");
				$(".my_gift ul .li2 p.status3").addClass("active");
			}
			if(msg.gift_id_status[7] == 1) {
				$(".li_three .lqq").hide();
				$(".li_three b").show();
				$(".my_gift ul .li3 p").removeClass("active");
				$(".my_gift ul .li3 p.status1").addClass("active");
			}
			if(msg.gift_id_status[7] == 2) {
				$(".li_three b").hide();
				$(".my_gift ul .li3 p").removeClass("active");
				$(".my_gift ul .li3 p.status4").addClass("active");
			}
			if(msg.gift_id_status[7] == 3) {
				$(".li_three .lqq").hide();
				$(".li_three b").show();
				$(".my_gift ul .li3 p").removeClass("active");
				$(".my_gift ul .li3 p.status3").addClass("active");
			}
			if(msg.gift_id_status[8] == 1) {
				$(".li_four .lqq").hide();
				$(".li_four b").show();
				$(".my_gift ul .li4 p").removeClass("active");
				$(".my_gift ul .li4 p.status1").addClass("active");
			}
			if(msg.gift_id_status[8] == 2) {
				$(".li_four b").hide();
				$(".my_gift ul .li4 p").removeClass("active");
				$(".my_gift ul .li4 p.status4").addClass("active");
			}
			if(msg.gift_id_status[8] == 3) {
				$(".li_four .lqq").hide();
				$(".li_four b").show();
				$(".my_gift ul .li4 p").removeClass("active");
				$(".my_gift ul .li4 p.status3").addClass("active");
			}
			if(msg.gift_id_status[9] == 1) {
				$(".li_five .lqq").hide();
				$(".li_five b").show();
				$(".my_gift ul .li5 p").removeClass("active");
				$(".my_gift ul .li5 p.status1").addClass("active");
			}
			if(msg.gift_id_status[9] == 2) {
				$(".li_five b").hide();
				$(".my_gift ul .li5 p").removeClass("active");
				$(".my_gift ul .li5 p.status4").addClass("active");
			}
			if(msg.gift_id_status[9] == 3) {
				$(".li_five .lqq").hide();
				$(".li_five b").show();
				$(".my_gift ul .li5 p").removeClass("active");
				$(".my_gift ul .li5 p.status3").addClass("active");
			}
			if(data.loginMethod == "phone"){
				$(".isLogin_ul li:nth-child(1)").hide();
				$(".isLogin_ul li:nth-child(2)").hide();
				$(".isLogin_ul").css("height" , "2.0625rem");
				$(".zhuxiao").css("margin-top" , ".5rem");
			} else if(data.loginMethod == "qq" || data.loginMethod == "wechat"){
				$(".isLogin_ul li:nth-child(1)").hide();
				$(".isLogin_ul").css("height" , "3.0625rem");
				$(".gaibang").css("margin-top" , ".5rem");
			}
		} else if(data.status == 1){
			base.is_denglu = false;
			base.isLogin = true;
			$(".isLogin_ul li:nth-child(1)").hide();
			$(".isLogin_ul").css("height" , "3.0625rem");
			$(".gaibang").css("margin-top" , ".5rem");
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
			alert("注销成功");
			location.reload();
		} else {
			alert(data.msg);
		}
	}, "json");
});
//点击查看礼包判断弹窗显示
$(".look_gift").click(function() {
	if(!base.isLogin) {
//		$("body,html").addClass("no_auto");
		$("#n_title").attr("src" , alt + "image1/title03.png");
		$(".login_select").show();
		$(".title03").attr("src" , alt + "image1/title04.png");
		$(".login-btn").attr("src" , alt + "images/yuyue_btn.png");
//		$(".z_mask").removeClass("hidden");
//		$(".yuyue_bottom>aside:nth-child(2)").show();
//		$(".yuyue_bottom>aside:nth-child(1)").hide();
//		$(".login").removeClass("hidden").removeClass("active");
		return;
	}
	if(!base.is_denglu && base.isLogin == true){
		$(".bind_phone").show();
		return;
	}
	if(base.isLogin && base.isYueyue == false) {
		$(".z_mask").removeClass("hidden");
		$(".select").removeClass("hidden");
		return;
	}
	if(base.isLogin && base.isYueyue == true) {
		$(".z_mask").addClass("hidden");
		$(".login").addClass("hidden");
		$(".my_gift_tips").fadeIn();
		return;
	}
});

function getGiftYue(id) {
	if(!base.isLogin) {
		$("body,html").addClass("no_auto");
		$(".z_mask").removeClass("hidden");
		$(".login").removeClass("hidden").removeClass("active");
		return;
	}
	if(base.isLogin && base.isYueyue == false) {
		$(".z_mask").removeClass("hidden");
		$(".select").removeClass("hidden");
		return;
	}
	$.post("/site/get-yuyue-num-gift-new.html", {
		"gift_id": id,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			isLogin();
		} else {
			alert(data.msg);
		}
	}, "json")
}
//点击页面立即领取按钮领取对应礼包
$('.lqq').click(function() {
	if(!base.isLogin) {
		//		$("body,html").addClass("no_auto");
		$(".login_select").show();
		$("#n_title").attr("src" , alt + "image1/title03.png");
		$(".title03").attr("src" , alt + "image1/title04.png");
		$(".login-btn").attr("src" , alt + "images/yuyue_btn.png");
//		$(".z_mask").removeClass("hidden");
//		$(".yuyue_bottom>aside:nth-child(1)").show();
//		$(".yuyue_bottom>aside:nth-child(2)").hide();
//		$(".login").removeClass("hidden").removeClass("active");
		return;
	}
	if(!base.is_denglu && base.isLogin == true){
		$(".bind_phone").show();
		return;
	}
	if(base.isLogin && base.isYueyue == false) {
		$(".z_mask").removeClass("hidden");
		$(".select").removeClass("hidden");
		return;
	}
	if(base.isLogin && base.isYueyue == true) {
		$(".my_gift_tips").fadeIn();
		// $(".TKMask2.TKMask2_4").fadeIn();
		$(".zhezhao").hide();
		$(".gift-details").hide();
		$(".gift-btn").css({
			"position": "relative",
			"z-index": "10"
		});
		$(".look_gift").css({
			"position": "relative",
			"z-index": "10"
		});
		$(".s_zhezhao").hide();
	}
});
//一键领取到游戏
$(".to_game").click(function() {
	$.post("/site/get-prop-new.html", {}, function(data) {
		if(data.status == 0) {
			// alert("您的奖励已发送成功，请至游戏内查看。");
			$(".TKMask2.TKMask2_3").fadeIn();
			$(".progress-gift.active p b").show();
			$(".progress-gift.active p a").hide();
			isLogin();
			return;
		} else if(data.status == -2) {
			$(".TKMask2.TKMask2_1").fadeIn();
			return;
		} else {
			$(".TKMask2.TKMask2_2").fadeIn();
			return;
		}
	}, "json");
	// $(".TKMask2.TKMask2_4").fadeIn();
});
//点击微信弹出二维码
$(".server-box a:nth-child(1)").click(function() {
	$(".bigImg").stop().fadeIn();
});
$(".bigImg").click(function() {
	$(this).stop().fadeOut();
});
//下载选择
$('.c_download2').click(function() {
	if(clickNumber2 % 2 == 0) {
		$('.l_download').slideDown(500);
	} else {
		$('.l_download').slideUp(500);
	}
	clickNumber2++;
})
$('.l_download a').click(function() {
	$('.l_download').slideUp(500);
	clickNumber2 = 0;
})
var new_click = true;
//悬浮账户操作
$(".control_count").click(function (){
	if(new_click){
		$(".isLogin_ul").stop().slideDown();
		new_click = false;
	} else {
		$(".isLogin_ul").stop().slideUp();
		new_click = true;
	}
});
//$(".zhezhao2").click(function (){
//	$(".isLogin_ul").hide();
//});
//绑定手机发送验证码
$(".dg_code").click(function (){
	if(countdown02 != 60 && countdown02 > 0) {
		return;
	}
	var phone = $(".d_phone").val();
	var t_yzm = $(".d_t_yzm").val();
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
	$(".change_bind").show();
});
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
			$(".select").removeClass("hidden");
			isLogin();
		} else {
			load_captcha();
			alert(data.msg);
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
$(".bangding").click(function (){
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
			$(".change_bind").hide();
			isLogin();
		} else {
			load_captcha();
			alert(data.msg);
		}
	}, "json");
});
$(function() {
	isLogin();
	yyNumber();
	//初始化复制分享链接
	new Clipboard('#tc13_copyBtnz');
	$(".fuzhi").click(function() {
		alert("已复制~");
	})

	change();
});