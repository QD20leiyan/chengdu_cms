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
	var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha").html(data.msg);
	}, 'json');
}
var srf = $("meta[name='csrf-token']").attr("content");
var userJsonStr = sessionStorage.getItem('user');
var userEntity = JSON.parse(userJsonStr);
var is_show = 0;
var base = {
	isLogin: false,
	isYy: false,
};

function isLogin() {
	if(userEntity == "null" || userEntity == null || userEntity == "") {

	} else {
		if(userEntity.status == 0) {
			base.isLogin = true;
			$(".before_denglu").removeClass("active");
			$(".after_denglu span").html(userEntity.data.phone);
			$(".after_denglu").addClass("active");
			$(".baoxiang").hide();
			if(userEntity.data.is_new == 1) { // 未领取新用户
				if(userEntity.data.gift_newyear != "") {
					$(".gift_t_code").html(userEntity.data.gift_newyear);
					$(".gift_tc").show();
				} else {

				}
			} else {
				$(".gift_t_code").html(userEntity.data.gift_newyear);
			}
			if(userEntity.data.gift_sign != "") {
				base.isYy = true;
			}
			//礼包记录
			var html = "";
			var nhtml = "";
			for(var i in userEntity.data.gift_sign) {
				if(userEntity.data.gift_sign[i].gift_id == 498) {
					nhtml = "<em>第一天签到礼包</em><br />黄金*10、<br />钞票*10000、<br />合金材料*5、<br />转向机组件*5";
					$(".huadong ul").addClass("active");
				} else if(userEntity.data.gift_sign[i].gift_id == 499) {
					nhtml = "<em>第二天签到礼包</em><br />载具2阶材料随机包*1、<br />2阶武器材料随机包*1";
				} else if(userEntity.data.gift_sign[i].gift_id == 500) {
					nhtml = "<em>第三天签到礼包</em><br />黄金宝箱*1、<br />基础科研核心*1";
				} else if(userEntity.data.gift_sign[i].gift_id == 501) {
					nhtml = "<em>第四天签到礼包</em><br />限时1天豹1*1、<br />轻型装甲钢*1";
				} else if(userEntity.data.gift_sign[i].gift_id == 502) {
					nhtml = "<em>第五天签到礼包</em><br />载具3阶材料随机包*1、<br />3阶武器材料随机包*1";
				} else if(userEntity.data.gift_sign[i].gift_id == 503) {
					nhtml = "<em>第六天签到礼包</em><br />银质纪念币*1、<br />改良信号发射器*1";
				} else if(userEntity.data.gift_sign[i].gift_id == 504) {
					nhtml = "<em>第七天签到礼包</em><br />高级金币宝箱*1、<br />基础炸药图纸*1";
				} else if(userEntity.data.gift_sign[i].gift_id == 505) {
					nhtml = "<em>第八天签到礼包</em><br />载具4阶材料随机包*1、<br />4阶武器材料随机包*1";
				}
				html += '<li><span>' + nhtml + '</span><span id="tc7_copyText' + i + '">' + userEntity.data.gift_sign[i].code + '</span><i id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '" data-id="' + i + '">[ 复制 ]</i></li>';
			}
			$(".huadong ul").html(null).append(html);
			//初始化复制插件
			$(".huadong ul li i").each(function(i, n) {
				new Clipboard('#tc7_copyBtn' + $(n).attr("data-id"));
			});
		} else {
			base.isLogin = false;
		}
		$(".qd_ul li").each(function(i, n) {
			if($(n).attr("data-time") == userEntity.data.now) {
				$(n).removeClass("active");
			} else if($(n).attr("data-time") < userEntity.data.now) {
				$(n).addClass("active");
			} else if($(n).attr("data-time") > userEntity.data.now) {
				$(n).removeClass("active");
			}
		});
	}
}
$(".t_yzm").focus(function() {
	if(is_show == 0) {
		load_captcha();
		is_show = 1;
	}
});
$(".captcha").click(function() {
	load_captcha();
});
$(".nav_ul li:nth-child(3)").click(function() {
	$('html,body').animate({
		scrollTop: $('.c_second').offset().top + 100
	}, 500);
});
//点击注销
$(".zhuxiao").click(function() {
	$.post('/newyear/logout.html', {}, function(data) {
		if(data.status == 0) {
			alert('注销成功');
			sessionStorage.clear("user");
			location.reload();
		} else {
			alert(data.msg);
		}
	}, "json");
});

//点击查看规则
$(".c_ck img").click(function() {
	$(".rule_tc").show();
});
//点击关闭弹窗
$(".close").click(function() {
	$(this).parent().parent().hide();
	if($(this).siblings('div').hasClass("rule_body")) {
		$('html,body').animate({
			scrollTop: $('.third').offset().top + 150
		}, 500);
	}
});
$("#rule_sure").click(function() {
	$(".rule_tc").hide();
	$('html,body').animate({
		scrollTop: $('.third').offset().top + 150
	}, 500);
});
$(".l_close").click(function() {
	$(".baoxiang").hide();
});
$(".l_cj").click(function() {
	$(".baoxiang").hide();
	$(".login").show();
});
//登录获取验证码
$(".g_code").click(function() {
	var phone = $(".phone").val();
	var t_yzm = $(".t_yzm").val();
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
	$.post("/common/get-login-verify.html", {
		"phone": phone,
		"captcha": t_yzm,
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
$(".login_btn").click(function() {
	var phone = $(".phone").val();
	var yzm = $(".yzm").val();
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
	$.post("/newyear/login.html", {
		"phone": phone,
		"yzm": yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			$(".login").hide();
			sessionStorage.setItem('user', JSON.stringify(data));
			var userJsonStr = sessionStorage.getItem('user');
			userEntity = JSON.parse(userJsonStr);
			isLogin();
		} else {
			load_captcha();
			alert(data.msg);
		}
	}, "json");
});
$(".c_xc img").click(function() {
	if(!base.isLogin) {
		$(".login").show();
	} else {
		$(".gift_tc").show();
	}
});
//点击登录弹窗
$(".before_denglu span").click(function() {
	$(".login").show();
});
$(".qd_ul li").click(function() {
	var data = $(this).attr("data-time");
	if(!base.isLogin) {
		$(".login").show();
	} else {
		$.post("/newyear/get-sign-gift.html", {
			date: data
		}, function(data) {
			if(data.status == 0) {
				$(".gift_c_code").html(data.data.code);
				$(".gift_tc_qd").show();
				userEntity.data = data.data.user_data;
				sessionStorage.setItem('user', JSON.stringify(userEntity));
				console.log(data.data.user_data);
				isLogin();
			} else {
				alert(data.msg);
			}
		}, "json");
	};
});

$(".c_jl").click(function() {
	if(!base.isLogin) {
		$(".login").show();
	} else if(base.isYy) {
		$(".gift_list").show();
	} else {
		alert("暂无签到记录");
	}
})
//点击提示已复制
$(".huadong ul").on("click", "i", function() {
	alert("已复制~");
});
$(".back").click(function() {
	$("html,body").animate({
		scrollTop: 0
	}, 700);
});
$(function() {
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if(scroll < 600) {
			$('.back').fadeOut(800);
		} else {
			$('.back').fadeIn(800);
		}
	})
	//初始化复制分享链接
	new Clipboard('#tc11_copyBtnz');
	new Clipboard('#tc12_copyBtnz');
	$("#tc11_copyBtnz").click(function() {
		alert("已复制");
	});
	$("#tc12_copyBtnz").click(function() {
		alert("已复制");
	});
	isLogin();
});