//中奖名单滚动效果
function autoScroll(obj) {
	var length = $(obj).find("li").length;
	if(length > 5) {
		$(obj).find("ul").animate({
			marginTop: "-3.0625rem"
		}, 1000, function() {
			$(this).css({
				marginTop: "0px"
			}).find("li:first").appendTo(this);
		})
	}
};
//60s倒计时验证
var countdown = 60;

function sendemail() {
	var obj = $(".l_code");
	settime(obj);
};

function sendCode() {
	var obj = $(".user_yzm");
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
//图片验证码
var imgMarkIndex = 1;

function load_captcha() {
	imgMarkIndex++;
	var imgUrl = "/site/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
}
//获取url邀请码
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
	var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
	if(result != null) {
		return decodeURIComponent(result[2]);
	} else {
		return null;
	}
}
var srf = $("meta[name='csrf-token']").attr("content");
var is_show = 0;
var base = {
	isLogin: false,
	new_user: false,
	old_user: false,
	friends: false,
	userId: 0,
	sendMark: false,
	sendLogin: false,
	sendLoginOut: false,
	luckyNumber: 0,
	phone: 0,
	id: 0,
};
//获取所有用户中奖名单
function getPrice() {
	$.post("/site/ajax-my-code.html", {
		"type": "3",
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			var msg = data.msg;
			var listLength = msg.length;
			var html = "";
			for(var i = 0; i < listLength; i++) {
				html += '<li>恭喜' +
					'<span>' + msg[i].phone + '</span>获得' +
					'<i>' + msg[i].name + '</i>' +
					'</li>'
			}
			$(".price_con ul").html(null).append(html);
			var scroll = setInterval('autoScroll(".price_con")', 1500);
		}
	}, "json");
};
//判断用户是否登录
function isLogin() {
	$.get("/site/ajax-wpzz-user.html", {}, function(data) {
		if(data.status == 0) {
			var msg = data.msg;
			base.isLogin = true;
			base.userId = msg.user_status;
			$(".t_phone").html(msg.phone);
			$(".before_denglu").removeClass("active");
			$(".after_denglu").addClass("active");
			$(".share_url").html(msg.share_url);
			$(".share_url").attr("href" , msg.share_url);
			$(".s_naibi span").html(msg.lb_num || "0");
			$(".s_cishu span").html(msg.draw_num || "0");
			base.userId = msg.user_status;
			if(!data.msg.name && !data.msg.address && !data.msg.tel && !data.code) {
				//                  $(".co_tips_addbtn").removeClass("hidden");
				//                  $(".co_tips_newbtn").addClass("hidden");
			} else {
				$(".s_name").val(data.msg.name);
				$(".youbian").val(data.msg.code);
				$(".m_phone").val(data.msg.tel);
				$(".s_address").val(data.msg.address);
			}
			$(".j_dhm").html((msg.login_code || "").split(",")[0]);
			$(".k_dhm").html((msg.login_code || "").split(",")[1]);
			if(msg.is_login == 1) {
				$(".congra .g_gift .gift_bg:eq(1)").removeClass("hidden");
				$(".congra .congra_body .dhm:eq(1)").removeClass("hidden");
				$(".congra .icon_txt1").text("6888金币");
				$(".congra .icon_txt2").text("绝版恐龙服（半身）");
				if(msg.user_status == 1) {
					$(".congra_title").html("恭喜您获得新兵礼包");
					$(".icon_img1").attr("src", alt + "images/gift2.png");
					$(".icon_img2").attr("src", alt + "images/gift8.png");
					$(".congra").show();
				} else if(msg.user_status == 2) {
					$(".icon_img1").attr("src", alt + "images/gift2.png");
					$(".icon_img2").attr("src", alt + "images/gift8.png");
					$(".congra_title").html("恭喜您获得老兵礼包");
					$(".congra").show();
				}
			}
		} else {
			base.isLogin = false;
		}
	}, "json");
};
$(function() {
	isLogin();
	getPrice();
});
//点击关闭弹窗
$(".close").click(function() {
	$(this).parent().parent().hide();
	move();
});
//点击弹出登录弹框
$(".f_denglu").click(function() {
	$(".denglu").show();
	stop();
});
//点击没有账号弹出手机登录框
$(".with_out").click(function() {
	$(".denglu").hide();
	$(".login").show();
	stop();
});
//点击查看我的礼包（新老兵活动）
$(".check_price").click(function() {
	if(!base.isLogin) {
		$(".denglu").show();
		stop();
		return;
	}
	$.post("/site/ajax-my-code.html", {
		"type": "1",
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			var msg = data.msg;
			var listLen = msg.length;
			if(listLen == 0) {
				alert("您还没有中奖记录哦~");
			} else {
				var html = "";
				for(var i = 0; i < listLen; i++) {
					html += '<li>' +
						'<span>' + msg[i].msg + '</span>' +
						'<span id="tc7_copyText' + i + '">' + msg[i].code + '</span>' +
						'<i id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '">复制</i>' +
						'</li>'
				}
				$(".huadong ul").html(null).append(html);
				//初始化复制插件
				$(".huadong ul li i").each(function(index) {
					new Clipboard('#tc7_copyBtn' + index);
				});
				$(".my_price").show();
			}
		} else {
			alert(data.msg);
		}
	}, "json");
});
//点击查看我的礼包（老虎机活动）
$(".check_part").click(function() {
	if(!base.isLogin) {
		$(".login").show();
		stop();
		return;
	}
	$.post("/site/ajax-my-code.html", {
		"type": "2",
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			var msg = data.msg;
			var listLen = msg.length;
			if(listLen == 0) {
				alert("您还没有中奖记录哦~");
			} else {
				var html = "";
				for(var i = 0; i < listLen; i++) {
					html += '<li>' +
						'<span>' + msg[i].name + '</span>' +
						'<span id="tc8_copyText' + i + '">' + msg[i].code + '</span>' +
						'<i id="tc8_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc8_copyText' + i + '">复制</i>' +
						'</li>'
				}
				$(".huadong ul").html(null).append(html);
				//初始化复制插件
				$(".huadong ul li i").each(function(index) {
					new Clipboard('#tc8_copyBtn' + index);
				});
				$(".my_price").show();
			}
		} else {
			alert(data.msg);
		}
	}, "json");
});
//点击转盘登录弹出手机登录框
$(".s_denglu").click(function() {
	$(".login").show();
	stop();
});
//点击刷新图片验证码
$(".captcha").click(function() {
	load_captcha();
});
//点击弹出分享弹窗
$(".want").click(function() {
	if(!base.isLogin) {
		$(".login").show();
		stop();
		return;
	}
	$(".share").show();
})
//点击注销页面
$(".zhuxiao").click(function() {
	$.post("/site/ajax-login-wpzz-out.html", {}, function(data) {
		if(data.status == 0) {
			location.reload();
		} else {
			alert(data.msg);
		}
	}, "json");
});
//点击发送验证码（新老兵活动）
$(".user_yzm").click(function() {
	var phone = $(".user_phone").val();
	var user_id = $(".user_id").val();
	var user_name = $(".user_name").val();
	var t_yzm = $(".user_t_yzm").val();
	if(user_id == "" || user_id == undefined) {
		alert("用户ID不能为空");
		return;
	}
	if(user_name == "" || user_name == undefined) {
		alert("用户昵称不能为空");
		return;
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
		alert("图形验证码不能为空")
		return;
	}
	$.post("/site/ajax-login-wpzz-verify.html", {
		"type": "1",
		"phone": phone,
		"user_id": user_id,
		"user_name": user_name,
		"captcha": t_yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			sendCode();
		} else {
//			load_captcha();
//			alert(data.msg);
			load_captcha();
			$(".c_message p").html(data.msg);
			$(".message").show();
		}
	}, "json");
});
//点击登录（用户ID昵称登录）
$(".c_lingqu").click(function() {
	var phone = $(".user_phone").val();
	var user_id = $(".user_id").val();
	var user_name = $(".user_name").val();
	var t_yzm = $(".u_t_yzm").val();
	var type = 1;
	if(user_id == "" || user_id == undefined) {
		alert("用户ID不能为空");
		return;
	}
	if(user_name == "" || user_name == undefined) {
		alert("用户昵称不能为空");
		return;
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
		alert("验证码不能为空")
		return;
	}
	$.post("/site/ajax-login-wpzz.html", {
		"type": type,
		"phone": phone,
		"user_id": user_id,
		"user_name": user_name,
		"invite_code": getQueryString("invite_code"),
		"yzm": t_yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			var msg = data.msg;
			$(".denglu").hide();
			move();
			$(".j_dhm").html((msg.login_code || "").split(",")[0]);
			$(".k_dhm").html((msg.login_code || "").split(",")[1]);
			if(msg.is_login == 1) {
				$(".congra .g_gift .gift_bg:eq(1)").removeClass("hidden");
				$(".congra .congra_body .dhm:eq(1)").removeClass("hidden");
				$(".congra .icon_txt1").text("6888金币");
				$(".congra .icon_txt2").text("绝版恐龙服（半身）");
				if(msg.user_status == 1) {
					$(".congra_title").html("恭喜您获得新兵礼包");
					$(".icon_img1").attr("src", alt + "images/gift2.png");
					$(".icon_img2").attr("src", alt + "images/gift8.png");
					$(".congra").show();
				} else if(msg.user_status == 2) {
					$(".congra_title").html("恭喜您获得老兵礼包");
					$(".icon_img1").attr("src", alt + "images/gift2.png");
					$(".icon_img2").attr("src", alt + "images/gift8.png");
					$(".congra").show();
				}
			}
			isLogin();
		} else {
			load_captcha();
			$(".c_message p").html(data.msg);
			$(".message").show();
		}
	}, "json");
});
//获取验证码（普通手机号登录）
$(".l_code").click(function() {
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
	$.post("/site/ajax-login-wpzz-verify.html", {
		"type": "3",
		"phone": phone,
		"captcha": t_yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			sendemail();
		} else {
			load_captcha();
			$(".c_message p").html(data.msg);
			$(".message").show();
		}
	}, "json")
});
//登录（普通手机号登录）
$(".lingqu").click(function() {
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
	$.post("/site/ajax-login-wpzz.html", {
		"type": "3",
		"phone": phone,
		"yzm": yzm,
		"invite_code": getQueryString("invite_code"),
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			var msg = data.msg;
			$(".login").hide();
			move();
			$(".j_dhm").html((msg.login_code || "").split(",")[0]);
			$(".k_dhm").html((msg.login_code || "").split(",")[1]);
			if(msg.is_login == 1) {
				$(".congra .g_gift .gift_bg:eq(1)").removeClass("hidden");
				$(".congra .congra_body .dhm:eq(1)").removeClass("hidden");
				$(".congra .icon_txt1").text("6888金币");
				$(".congra .icon_txt2").text("绝版恐龙服（半身）");
				if(msg.user_status == 1) {
					$(".congra_title").html("恭喜您获得新兵礼包");
					$(".icon_img1").attr("src", alt + "images/gift2.png");
					$(".icon_img2").attr("src", alt + "images/gift8.png");
					$(".congra").show();
				} else if(msg.user_status == 2) {
					$(".congra_title").html("恭喜您获得老兵礼包");
					$(".icon_img1").attr("src", alt + "images/gift2.png");
					$(".icon_img2").attr("src", alt + "images/gift8.png");
					$(".congra").show();
				}
			}
			isLogin();
		} else {
			load_captcha();
			$(".c_message p").html(data.msg);
			$(".message").show();
		}
	}, "json");
});
//点击领取礼包
$(".btn_lingqu").click(function() {
	if(!base.isLogin) {
		$(".denglu").show();
		stop();
		return;
	}
	if(base.userId == 3) {
		alert("您需注销，重新在新老兵活动处登录");
	} else {
		$(".congra .g_gift .gift_bg:eq(1)").removeClass("hidden");
		$(".congra .congra_body .dhm:eq(1)").removeClass("hidden");
		$(".congra .icon_txt1").text("6888金币");
		$(".congra .icon_txt2").text("绝版恐龙服（半身）");
		if(base.userId == 1) {
			$(".congra_title").html("恭喜您获得新兵礼包");
			$(".icon_img1").attr("src", alt + "images/gift2.png");
			$(".icon_img2").attr("src", alt + "images/gift8.png");
		} else if(base.userId == 2) {
			$(".congra_title").html("恭喜您获得老兵礼包");
			$(".icon_img1").attr("src", alt + "images/gift2.png");
			$(".icon_img2").attr("src", alt + "images/gift8.png");
		}
		$(".congra").show();
	}
});
//邀请好友领取
$(".btn_lb").click(function() {
	if(!base.isLogin) {
		$(".denglu").show();
		stop();
		return;
	} else {
		if(base.userId == 3) {
			alert("您需注销，重新在新老兵活动处登录！");
		} else {
			$.post("/site/ajax-invite-gift.html", {
				'type': base.userId,
				"cms_csrf": srf
			}, function(data) {
				if(data.status == 0) {
					$(".congra .g_gift .gift_bg:eq(1)").removeClass("hidden");
					$(".congra .congra_body .dhm:eq(1)").removeClass("hidden");
					if(data.msg != 0) {
						if(data.msg['1'] && !data.msg['2']) {
							$(".j_dhm").text(data.msg['1']); //--第一个
							$(".icon_img1").attr("src", alt + "images/gift4.png");
							$(".congra .icon_txt1").text("688钻石");
							$(".congra .g_gift .gift_bg:eq(1)").addClass("hidden");
							$(".congra .congra_body .dhm:eq(1)").addClass("hidden");
						} else {
							$(".j_dhm").html(data.msg[1]);
							$(".k_dhm").html(data.msg[2]);
							$(".icon_img1").attr("src", alt + "images/gift4.png");
							$(".congra .icon_txt1").text("688钻石");
							$(".congra .icon_txt2").text("时装三选一");
							if(base.userId == 1) {
								//新用户
								$(".icon_img2").attr("src", alt + "images/gift7.png");
							}else if(base.userId == 2) {
								$(".icon_img2").attr("src", alt + "images/gift5.png");
							}
						}
						if(base.userId == 1) {
							//新用户
							$(".congra_title").text("恭喜您获得新兵专属礼包");
						} else if(base.userId == 2) {
							//老用户
							$(".congra_title").text("恭喜您获得老兵专属礼包");
						}
						$(".congra").show();
					} else {
						$(".share").show();
					}
				} else {
					alert(data.msg);
				}
			}, "json");
		}
	}
});
//关闭提示弹框
$(".m_sure").click(function (){
	$(".message").hide();
});
//填写地址
$(".a_sure").click(function() {
	var name = $(".s_name").val();
	var code = $(".youbian").val();
	var tel = $(".m_phone").val();
	var address = $(".s_address").val();
	if(name == "" || name == undefined) {
		alert("请输入收件人姓名");
		return;
	}
	if(code == "" || code == undefined) {
		alert("请输入邮编");
		return;
	}
	if(tel == "" || tel == undefined) {
		alert("请输入收件人电话");
		return;
	}
	if(address == "" || address == undefined) {
		alert("请输入收件人地址")
		return;
	}
	$.post("/site/ajax-address.html", {
		"name": name,
		"code": code,
		"address": address,
		"tel": tel,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			alert("提交地址成功~");
			$(".address").hide();
			move();
		} else {
			alert(data.msg);
		}
	}, "json");
});
//点击提示已复制
$(".huadong ul").on("click", "i", function() {
	alert("已复制~");
});
//点击奶币转换次数
$(".naibi_btn").click(function() {
	if(!base.isLogin) {
		$(".login").show();
		stop();
		return;
	}
	$.post("/site/ajax-lb-to-num.html", {}, function(data) {
		if(data.status == 0) {
			$(".s_naibi span").html(data.lb_num);
			$(".s_cishu span").html(data.draw_num);
		} else {
			alert(data.msg);
		}
	}, "json");
});
//初始化复制分享链接
new Clipboard('#tc9_copyBtnz');
new Clipboard('#tc10_copyBtnz');
new Clipboard('#tc11_copyBtnz');
new Clipboard('#tc12_copyBtnz');
$("#tc9_copyBtnz").click(function() {
	alert("已复制~");
});
$("#tc10_copyBtnz").click(function() {
	alert("已复制~");
});
$("#tc11_copyBtnz").click(function() {
	alert("已复制~");
})
$("#tc12_copyBtnz").click(function() {
	alert("已复制~");
});
$(".t_dizhi").click(function() {
	$(".new_congra").hide();
	$(".address").show();
});
//抽奖
(function() {
	var flag = false;
	var TextNum1;
	var TextNum2;
	var TextNum3;

	function letGo() {
		reset();
		if(!TextNum3 && TextNum3 != 0) {
			$(".lottery1,.lottery2").animate({
				"top": "-36.375rem"
			}, 500, "linear");
			$(".lottery3").animate({
				"top": "-36.375rem"
			}, 500, "linear", function() {
				letGo();
			});
		} else {
			var toparr = ['-2rem', '-5.4375rem', '-8.875rem', '-12.3125rem', '-15.75rem', '-19.1875rem', '-22.625rem', '-26.0625rem', '-29.5rem', '-32.9375rem', '-36.375rem'];
			var num1 = toparr[TextNum1]; //在这里随机
			var num2 = toparr[TextNum2];
			var num3 = toparr[TextNum3];
			$(".lottery1").animate({
				"top": num1
			}, 500, "linear");
			$(".lottery2").animate({
				"top": num2
			}, 900, "linear", function() {
				//抽奖结束
				TextNum1 = undefined, TextNum2 = undefined, TextNum3 = undefined;

				if(is_show == 1) {
					$(".new_congra").removeClass("hidden");
				} else {
					$(".message").removeClass("hidden");
				}
			});
			$(".lottery3").animate({
				"top": num3
			}, 650, "linear");
		}
	}

	function reset() {
		$(".lottery1,.lottery2,.lottery3").css({
			"top": '-2rem'
		});
	}
	$(".start").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		if(!flag && $(".s_cishu span").text() > 0) {
			flag = true;
			reset();
			letGo();
			//数据请求
			//				setTimeout(function() {
			//					TextNum1 = 4; //随机数
			//					TextNum2 = 4;
			//					TextNum3 = 4;
			//				}, 2000)
			$.ajax({
				'url': "/site/ajax-lb-draw.html",
				'data': {},
				'type': 'POST',
				'dataType': 'Json',
				success: function(data) {
					if(data.status == 0) {
						flag = false;
						setTimeout(function() {
							if(data.msg.is_shiwu == 2) {
								is_show = 0;
								$(".s_cishu span").text(data.draw_num);
								$(".c_message p").html("谢谢参与");
								$(".message").show();
								//谢谢参与--保证三个不同
								var num1 = parseInt(Math.random() * 10);
								var num2 = parseInt(Math.random() * 10);
								var num3 = parseInt(Math.random() * 10);
								TextNum1 = num1; //随机数
								TextNum2 = num2;
								if(num1 == num2 && num2 == num3) {
									num3 = num > 5 ? parseInt(Math.random() * 5) : 6 + parseInt(Math.random() * 4)
								}
								TextNum3 = num3;
							} else {
								is_show = 1;
								$(".s_cishu span").text(data.draw_num);
								$(".dd_dhm").text(data.msg.msg);
								if(data.msg.gift_id == 330) {
									TextNum1 = 9;
									TextNum2 = 9;
									TextNum3 = 9; //330 venque定制徽章
									$(".new_icon").attr("src", alt + "images/gift9.png");
									$(".new_gift_bg p").html("venque定制徽章");
									$(".cc_dhm").hide();
								} else if(data.msg.gift_id == 331) {
									TextNum1 = 0;
									TextNum2 = 0;
									TextNum3 = 0; //331 手机支架
									$(".new_icon").attr("src", alt + "images/gift12.png");
									$(".new_gift_bg p").html("手机支架");
									$(".cc_dhm").hide();
								} else if(data.msg.gift_id == 332) {
									TextNum1 = 1;
									TextNum2 = 1;
									TextNum3 = 1; //332 四洲牛奶
									$(".new_icon").attr("src", alt + "images/gift13.png");
									$(".new_gift_bg p").html("四洲牛奶");
									$(".cc_dhm").hide();
								} else if(data.msg.gift_id == 333) {
									TextNum1 = 2;
									TextNum2 = 2;
									TextNum3 = 2; //333 四周抽奖机会
									$(".new_icon").attr("src", alt + "images/gift14.png");
									$(".new_gift_bg p").html("四周抽奖机会");
								} else if(data.msg.gift_id == 334) {
									TextNum1 = 3;
									TextNum2 = 3;
									TextNum3 = 3; //334 绝版恐龙服（裤子）
									$(".new_icon").attr("src", alt + "images/gift8.png");
									$(".new_gift_bg p").html("绝版恐龙服（裤子）");
								} else if(data.msg.gift_id == 335) {
									TextNum1 = 4;
									TextNum2 = 4;
									TextNum3 = 4; //335 绝版恐龙服（一套）
									$(".new_icon").attr("src", alt + "images/gift15.png");
									$(".new_gift_bg p").html("绝版恐龙服（一套）");
								} else if(data.msg.gift_id == 336) {
									TextNum1 = 5;
									TextNum2 = 5;
									TextNum3 = 5; //336 蒙面大侠头饰
									$(".new_icon").attr("src", alt + "images/gift16.png");
									$(".new_gift_bg p").html("蒙面大侠头饰");
								} else if(data.msg.gift_id == 337) {
									TextNum1 = 6;
									TextNum2 = 6;
									TextNum3 = 6; //337 2000金币
									$(".new_icon").attr("src", alt + "images/gift2.png");
									$(".new_gift_bg p").html("2000金币");
								} else if(data.msg.gift_id == 338) {
									TextNum1 = 7;
									TextNum2 = 7;
									TextNum3 = 7; //338 1500金币+200钻石
									$(".new_icon").attr("src", alt + "images/gift17.png");
									$(".new_gift_bg p").html("1500金币+200钻石");
								} else if(data.msg.gift_id == 339) {
									TextNum1 = 6;
									TextNum2 = 6;
									TextNum3 = 6; //339  1000金币
									$(".new_icon").attr("src", alt + "images/gift2.png");
									$(".new_gift_bg p").html("1000金币");
								} else if(data.msg.gift_id == 340) {
									TextNum1 = 8;
									TextNum2 = 8;
									TextNum3 = 8; //340 王牌战争定制体恤
									$(".new_icon").attr("src", alt + "images/gift18.png");
									$(".new_gift_bg p").html("王牌战争体恤");
									$(".cc_dhm").hide();
								}
								$(".new_congra").show();
							}
						}, 1000);
					} else {
						flag = false;
						setTimeout(function() {
							is_show = 0;
							var num1 = parseInt(Math.random() * 6);
							var num2 = parseInt(Math.random() * 6);
							var num3 = parseInt(Math.random() * 6);
							TextNum1 = num1; //随机数
							TextNum2 = num2;
							if(num1 == num2 && num2 == num3) {
								num3 = num > 3 ? parseInt(Math.random() * 3) : 4 + parseInt(Math.random() * 2)
							}
							TextNum3 = num3;
							$(".c_message p").html(data.msg);
							$(".message").show();
						}, 1000);
					}
				},
				error: function() {
					alert("网络请求失败，请重新刷新页面");
				}
			});
		} else {
			$(".share").show();
		}
	});
})();