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
}

//function textNum(num) {
//	var textnum = num.toString();
//	for(var i = 0; i < textnum.length; i++) {
//		$('.yy_number').find('li').eq(6 - i).text(textnum.charAt(textnum.length - (i + 1)));
//	}
//}
var base = {
	isLogin: false,
	isYueyue: false,
	is_choose: 0,
	is_type: 0,
	isNumber: 0,
};
var nums = 0;
var srf = $("meta[name='csrf-token']").attr("content");
//获取预约人数
function yyNumber() {
	var url = '/common/get-yuyue-count.html';
	$.post(url, {
		"name": "nba_total",
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			nums = data.msg;
			base.isNumber = data.msg;
			if(data.msg < 5000) {
				$(".jdt i").css({
					width: "5%"
				})
			}
			if(data.msg > 5000 && data.msg < 10000) {
				$(".jdt i").css({
					width: "9%"
				})
			}
			if(data.msg == 10000) {
				$(".jdt i").css({
					width: "12%"
				})
			}
			if(data.msg > 10000 && data.msg < 15000) {
				$(".jdt i").css({
					width: "23%"
				})
			}
			if(data.msg >= 15000 && data.msg < 20000) {
				$(".jdt i").css({
					width: "27%"
				})
			}
			if(data.msg == 20000) {
				$(".jdt i").css({
					width: "32%"
				})
			}
			if(data.msg > 20000 && data.msg < 25000) {
				$(".jdt i").css({
					width: "43%"
				})
			}
			if(data.msg >= 25000 && data.msg < 30000) {
				$(".jdt i").css({
					width: "47%"
				})
			}
			if(data.msg == 30000) {
				$(".jdt i").css({
					width: "53%"
				})
			}
			if(data.msg > 30000 && data.msg < 35000) {
				$(".jdt i").css({
					width: "63%"
				})
			}
			if(data.msg >= 35000 && data.msg < 40000) {
				$(".jdt i").css({
					width: "67%"
				})
			}
			if(data.msg == 40000) {
				$(".jdt i").css({
					width: "74%"
				})
			}
			if(data.msg > 40000 && data.msg < 45000) {
				$(".jdt i").css({
					width: "83%"
				})
			}
			if(data.msg > 45000 && data.msg < 50000) {
				$(".jdt i").css({
					width: "86%"
				})
			}
			if(data.msg == 50000) {
				$(".jdt i").css({
					width: "91%"
				})
			}
			if(data.msg > 50000) {
				$(".jdt i").css({
					width: "91%"
				})
			}
			if(data.msg >= 10000) {
				$(".jd_ul li:nth-child(1)").addClass("active");
			}
			if(data.msg >= 20000) {
				$(".jd_ul li:nth-child(2)").addClass("active");
			}
			if(data.msg >= 30000) {
				$(".jd_ul li:nth-child(3)").addClass("active");
			}
			if(data.msg >= 40000) {
				$(".jd_ul li:nth-child(4)").addClass("active");
			}
			if(data.msg >= 50000) {
				$(".jd_ul li:nth-child(5)").addClass("active");
			}
		}
	}, "json");
};
//判断用户是否登录
function isLogin() {
	$.post("/yy/get-user-info.html", {
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			base.isLogin = true;
			$(".share_url").html(data.data.shareUrl);
			if(data.data.inviteUser.length > 0 && data.data.inviteUser.length < 2) {
				base.is_choose = false;
			} else if(data.data.inviteUser.length >= 2) {
				base.is_choose = true;
			}
			for(var i = 0; i < data.data.inviteUser.length; i++) {
				$(".invite_friend ul li").eq(i).addClass("active");
				$(".invite_friend ul li").eq(i).find("p").html(data.data.inviteUser[i]);
			};
			$(".c_phone").text(data.data.phone);
			$(".before_denglu").removeClass("active");
			$(".after_denglu").addClass("active");
			if(data.data.giftCodeLog.yuyue != "") {
				var html = "";
				html += '<li><div class="gift_li">' +
					'<span>官网预约礼包</span>' +
					'<span id="tc13_copyTextz">' + data.data.giftCodeLog.yuyue + '</span>' +
					'<span>2018/10/15—11/30</span></div>' +
					'<i class="t_fuzhi" id="tc13_copyBtnz" data-clipboard-action="copy" data-clipboard-target="#tc13_copyTextz"><img src="'+ alt +'/images/t_fuzhi.png" alt="" /></i>' +
					'</li>';
				$(".huadong ul").append(html);
				//初始化复制分享链接
				new Clipboard('#tc13_copyBtnz');
			}
			if(data.data.giftCodeLog.invite != "") {
				var html = "";
				html += '<li><div class="gift_li">' +
					'<span>玩家助力礼包</span>' +
					'<span id="tc14_copyTextz">' + data.data.giftCodeLog.invite + '</span>' +
					'<span>2018/10/15—11/30</span></div>' +
					'<i class="t_fuzhi" id="tc14_copyBtnz" data-clipboard-action="copy" data-clipboard-target="#tc14_copyTextz"><img src="'+ alt +'/images/t_fuzhi.png" alt="" /></i>' +
					'</li>';
				$(".huadong ul").append(html);
				//初始化复制分享链接
				new Clipboard('#tc14_copyBtnz');
			}
		} else {
			base.isLogin = false;
		}
	}, "json");
};
//点击登录按钮
$(".before_denglu span").click(function() {
	$(".c_login .d_img").attr("src", alt + "images/denglu.png");
	$(".l_btn img").attr("src", alt + "images/sure.png");
	$(".login").show();
});
//点击预约
$(".newseason").click(function() {
	if(!base.isLogin) {
		$(".c_login .d_img").attr("src", alt + "images/yuyue.png");
		$(".l_btn img").attr("src", alt + "images/t_yuyue.png");
		$(".login").show();
	} else {
		alert("已经预约过了哦");
	}
});
//鼠标悬浮微信二维码
$(".kv_nav .s_ul li:nth-child(1)").hover(function() {
	$(".fl_wx").stop().fadeIn();
}, function() {
	$(".fl_wx").stop().fadeOut();
});
//点击我的礼包
$(".mygift").click(function() {
	if(!base.isLogin) {
		$(".c_login .d_img").attr("src", alt + "images/denglu.png");
		$(".l_btn img").attr("src", alt + "images/sure.png");
		$(".login").show();
	} else {
		$(".c_gift").show();
	}
});
//队友邀请点击立即领取
$(".lingqu").click(function() {
	if(!base.isLogin) {
		$(".c_login .d_img").attr("src", alt + "images/denglu.png");
		$(".l_btn img").attr("src", alt + "images/sure.png");
		$(".login").show();
		return;
	}
	if(!base.is_choose) {
		alert("邀请人数未达到要求~");
		return;
	}
	$.post("/yy/get-invite-gift.html", {
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			$(".invite_name").html(data.code);
			var html = "";
			html += '<li><div class="gift_li">' +
				'<span>玩家助力礼包</span>' +
				'<span id="tc14_copyTextz">' + data.code + '</span>' +
				'<span>2018/10/15—11/30</span></div>' +
				'<i class="t_fuzhi" id="tc14_copyBtnz" data-clipboard-action="copy" data-clipboard-target="#tc14_copyTextz"><img src="'+ alt +'/images/t_fuzhi.png" alt="" /></i>' +
				'</li>';
			$(".huadong ul").append(html);
			//初始化复制分享链接
			new Clipboard('#tc14_copyBtnz');
			$(".f_invite").show();
		}
	}, "json");
});
//点击邀请队友按钮
$(".l_invite").click(function() {
	if(!base.isLogin) {
		$(".c_login .d_img").attr("src", alt + "images/denglu.png");
		$(".l_btn img").attr("src", alt + "images/sure.png");
		$(".login").show();
	} else {
		$(".yaoqing").show();
	}
});
//点击关闭弹窗
$(".close").click(function() {
	$(this).parent().parent().hide();
});
//点击返回顶部
$(".back_top").click(function() {
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
$(window).scroll(function() {
	var $t = $(this).scrollTop();
	if($t > 350) {
		$(".float").stop().fadeIn();
	} else {
		$(".float").stop().fadeOut();
	}
});
//点击领取预约人数礼包
$(".click,.c_star").click(function() {
	console.log(base.isNumber);
	if(!base.isLogin) {
		$(".c_login .d_img").attr("src", alt + "images/denglu.png");
		$(".l_btn img").attr("src", alt + "images/sure.png");
		$(".login").show();
		return;
	}
	if(base.isNumber < 50000) {
		alert("预约人数未达成~");
		return;
	}
	$.post("/yy/get-yuyue-gift.html", {
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			$(".price_name").html(data.code);
			var html = "";
			html += '<li><div class="gift_li">' +
				'<span>官网预约礼包</span>' +
				'<span id="tc13_copyTextz">' + data.code + '</span>' +
				'<span>2018/10/15—11/30</span></div>' +
				'<i class="t_fuzhi" id="tc13_copyBtnz" data-clipboard-action="copy" data-clipboard-target="#tc13_copyTextz"><img src="'+ alt +'/images/t_fuzhi.png" alt="" /></i>' +
				'</li>';
			$(".huadong ul").append(html);
			//初始化复制分享链接
			new Clipboard('#tc13_copyBtnz');
			$(".price").show();
		} else {
			alert(data.msg);
		}
	}, "json");
});
//点击获取验证码
$(".g_code").click(function() {
	var phone = $(".phone").val();
	var t_yzm = $(".t_yzm").val();
	if(phone == "" || phone == undefined) {
		alert("手机号不能为空");
		return;
	}
	if(phone.length != 11) {
		alert("请输入正确的手机号");
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
})
//点击预约/登录
$(".l_btn").click(function() {
	fgw_yy_pc();
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
	$.post("/yy/yuyue.html", {
		"phone": phone,
		"yzm": yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			alert("预约成功")
			isLogin();
			$(".login").hide();
			fgw_yy_pc_success();
		} else if(data.status == 1){
			alert("登录成功");
			isLogin();
			$(".login").hide();
			fgw_yy_pc_success();
		} else {
			load_captcha();
			alert(data.msg);
		}
	}, "json");
})
//点击注销
$(".zhuxiao").click(function() {
	$.post("/yy/logout.html", {
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			alert("注销成功");
			location.reload();
		} else {
			alert(data.msg);
		}
	}, "json");
});
$(".fuzhi").click(function() {
	alert("已复制");
});
//点击提示已复制
$(".huadong ul").on("click", "i", function() {
	alert("已复制~");
});
//点击我的礼包
$(".quren").click(function() {
	$(this).parent().parent().parent().hide();
	$(".c_gift").show();
})
//鼠标悬浮预约人数出现奖励
$(".jd_ul li .c_ball").hover(function() {
	$(this).siblings(".gift_tent").stop().fadeIn();
}, function() {
	$(this).siblings(".gift_tent").stop().fadeOut();
});
//点击刷新图片验证码
$(".captcha").click(function() {
	load_captcha();
});
var clickTap = true;
//点击浮窗缩进
$(".op_close").click(function() {
	if(clickTap) {
		$(".float").addClass("active");
		clickTap = false;
	} else {
		$(".float").removeClass("active");
		clickTap = true;
	}
});
$(function() {
	yyNumber();
	isLogin();
	new Clipboard('#tc15_copyBtnz');
	var mySwiper01 = new Swiper(".t_play", {
		effect: "coverflow",
		speed: 1500,
		prevButton: ".wgam_prev",
		nextButton: ".wgam_next",
		pagination: '.swiper-pagination',
		paginationClickable: true,
		loopAdditionalSlides: 2,
		centeredSlides: !0,
		slidesPerView: 3,
		loop: !0,
		observer: !0,
		observeParents: !0,
		slideToClickedSlide: !0,
		simulateTouch: false,
		autoplayDisableOnInteraction: false,
		coverflow: {
			rotate: 30,
			stretch: -10,
			depth: 100,
			modifier: 1,
			slideShadows: false
		},
	});
	setTimeout(function() {
		var numRun = $(".numberRun").numberAnimate({
			num: nums,
			dot: 0,
			speed: 2000,
			symbol: ""
		});
		numRun.resetData(nums);
	}, 1000);
})