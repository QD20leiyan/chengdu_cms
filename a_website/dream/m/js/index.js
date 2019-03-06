//jiathis分享配置
var jiathis_config = {
	url: "",
	title: "风之岛",
	summary: "",
	pic: "",
}
var base = {
	isLogin: false,
	sendYy: false,
	sendMark: false,
	sendLogin: false,
	sendLoginOut: false,
	luckyNumber: 0,
};
var clickNumber1 = 0;
var clickNumber2 = 0;
var clickNumber3 = 0;
var clickNumber4 = 0;
var clickNumber5 = 0;
var countdown = 60;
var srf = $("meta[name='csrf-token']").attr("content");
//倒计时
function sendemail() {
	var obj = $(".g_code");
	settime(obj);
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
$(function() {
	$("#Hero-bar .f_link").next().text("北京卓越晨星科技有限公司");
	yuyue();
	init();
	//判断用户是否登录
	var num = '';

	function init() {
		$.get("/site/ajax-get-user.html", {}, function(data) {
			if(data.status == 0) {
				num = data.msg.me_invite_code;
				if(data.msg.is_yuyue == -1) {
					$(".login_yy").hide();
					var new_url = $(".c_yuyue").attr("data-url");
					$(".c_yuyue").attr("src", new_url);
					$(".c_yuyue").click(function() {
						$(".login_yy").hide();
						$(".dialog").show();
						$(".dialog-success").find(".yq_num").text(num);
					});
					$(".yxyy").click(function() {
						$(".login_yy").hide();
						$(".dialog").show();
						$(".dialog-success").find(".yq_num").text(num);
					});
				}
				var newNum = parseInt(data.msg.walk_num);
				base.isLogin = true;
				jiathis_config.url = data.msg.share_url;
				$(".command").hide();
				move();
				$(".b_denglu").removeClass("active");
				$(".p_phone span").html(data.msg.user_phone);
				$(".y_code span").html(data.msg.me_invite_code);
				$(".a_denglu").addClass("active");
				$(".h_code").attr("src", data.msg.invite_img);
				$(".cishu span").html(data.msg.chance_num);
				$(".game ul li").removeClass("active");
				$(".h_yqm").html(data.msg.me_invite_code);
				$(".y_num span").html(data.msg.invite_num);
				$(".game ul li").eq(newNum - 1).addClass("active");
				if(newNum >= 22) {
					$(".game ul li").removeClass("active");
					$(".game ul li").eq(21).addClass("active");
					$(".game ul li:nth-child(2)").addClass("on");
					$(".game ul li:nth-child(7)").addClass("on");
					$(".game ul li:nth-child(12)").addClass("on");
					$(".game ul li:nth-child(17)").addClass("on");
					$(".game ul li:nth-child(22)").addClass("on");
				}
				if(newNum < 7 && newNum >= 2) {
					$(".game ul li:nth-child(2)").addClass("on");
				}
				if(newNum < 12 && newNum >= 7) {
					$(".game ul li:nth-child(2)").addClass("on");
					$(".game ul li:nth-child(7)").addClass("on");
				}
				if(newNum < 17 && newNum >= 12) {
					$(".game ul li:nth-child(2)").addClass("on");
					$(".game ul li:nth-child(7)").addClass("on");
					$(".game ul li:nth-child(12)").addClass("on");
				}
				if(newNum < 22 && newNum >= 17) {
					$(".game ul li:nth-child(2)").addClass("on");
					$(".game ul li:nth-child(7)").addClass("on");
					$(".game ul li:nth-child(12)").addClass("on");
					$(".game ul li:nth-child(17)").addClass("on");
				}
			} else {
				base.isLogin = false;
			}
		}, "json");
	};
	//获取预约人数
	function yuyue() {
		$.get("/site/ajax-get-num.html", {}, function(data) {
			if(data.status == 0) {
				$(".person span").html(data.msg);
			} else {
				alert(data.msg);
			}
		}, "json");
	};
	//点击游戏预约判断弹框
	$(".yxyy").click(function() {
		if(!base.isLogin) {
			$(".command").show();
			stop();
		} else {
			$(".login_yy").show();
			stop();
		}
	});
	//滚动出现游戏预约浮窗
	$(window).scroll(function() {
		var scrollP = $(window).scrollTop();
		// var bottom = $("#Hero-bar").scrollTop();
		if(scrollP > 400) {
			$(".f_bottom").fadeIn();
		} else{
			$(".f_bottom").fadeOut();
		}
	});
	//获取验证码
	$(".g_code").click(function() {
		var phone = $(".phone").val();
		var imgCode = $(".pic_code").val();
		if(phone == "" || phone == undefined) {
			$(".phone").siblings("i").css("visibility", "visible");
			return;
		}
		if(phone.length != 11) {
			$(".phone").siblings("i").html("请输入11位手机号");
			$(".phone").siblings("i").css("visibility", "visible");
			return;
		}
		if(imgCode == "" || imgCode == undefined) {
			$(".pic_code").parent().siblings("i").css("visibility", "visible");
			return;
		}
		$.post("/site/ajax-login-verify.html", {
			"phone": phone,
			"captcha": imgCode,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				sendemail();
				$(".wrong").css("visibility", "hidden");
			} else {
				tupian();
				alert(data.msg);
			}
		}, "json");
	});
	//登录
	$(".j_sure").click(function() {
		var phone = $(".phone").val();
		var yzm = $(".i_code").val();
		if(phone == "" || phone == undefined) {
			$(".phone").siblings("i").css("visibility", "visible");
			return;
		}
		if(phone.length != 11) {
			$(".phone").siblings("i").html("请输入11位手机号");
			$(".phone").siblings("i").css("visibility", "visible");
			return;
		}
		if(yzm == "" || yzm == undefined) {
			$(".i_code").parent().siblings("i").css("visibility", "visible");
			return;
		}
		$.post("/site/ajax-login.html", {
			"phone": phone,
			"yzm": yzm,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				init();
				$(".login_yy").show();
			} else {
				tupian();
				alert(data.msg);
			}
		}, "json");
	});
	//点击礼包跳到对应游戏区域
	$('.gift').on('click', function(e) {
		var id = $(this).attr("data-to");
		$('html,body').animate({
			scrollTop: $('#' + id).offset().top
		}, 500);
	});
	//点击更新图片验证码
	$(".capture").click(function() {
		tupian();
	});
	//图片验证码
	function tupian() {
		$.get("/site/captcha.html?refresh=1", {}, function(data) {
			$(".capture img").attr("src", data.url);
		}, 'json');
	};
	//点击弹出登录弹框
	$(".b_denglu").click(function() {
		$(".command").show();
		stop();
	});
	//点击分享弹出弹框
	$(".share").click(function() {
		if(!base.isLogin) {
			$(".command").show();
			stop();
		} else {
			$(".f_invite").show();
			stop();
		}
	});
	//点击选择设备类型
	$(".yy_ul li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	//点击选择是否有邀请码
	$(".con_ul li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	//点击返回顶部
	$(".back").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	});
	//关闭弹窗
	$(".close").click(function() {
		$(this).parent().parent().hide();
		move();
	});
	//立即分享
	$(".lj_order").click(function() {
		$(".f_invite").show();
		$(".login_yy").hide();
		$(".dialog").hide();
	})
	//预约游戏
	$(".l_sure").click(function() {
		var type = $(".yy_ul li.active").attr("data-type");
		var yqm = $(".put_yqm").val();
		var cishu = parseInt($(".cishu span").text());
		// if($(".con_ul li:nth-child(1)").hasClass("active")) {
		// if(yqm == "" || undefined) {
		// 	alert("请输入邀请码")
		// } else {
		$.post("/site/ajax-yuyue.html", {
			"type": type,
			"invite_code": yqm,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				// alert("恭喜您预约成功!");
				var new_url = $(".c_yuyue").attr("data-url");
				$(".dialog").show();
				$(".dialog-success").find(".yq_num").text(num);
				$(".c_yuyue").attr("src", new_url);
				$(".put_yqm").val("");
				$(".login_yy").hide();
				$(".cishu span").text(cishu + 1);
				$(".c_yuyue").click(function() {
					$(".login_yy").hide();
					$(".dialog").show();
				})
				$(".yxyy").click(function() {
					$(".login_yy").hide();
					$(".dialog").show();
				});
			} else {
				if(data.msg == "您已经预约过了，请勿重复预约") {
					var new_url = $(".c_yuyue").attr("data-url");
					$(".c_yuyue").attr("src", new_url);
					$(".dialog").show();
					$(".dialog-success").find(".yq_num").text(num);
					$(".c_yuyue").click(function() {
						$(".login_yy").hide();
						$(".dialog").show();
						$(".dialog-success").find(".yq_num").text(num);
					})
				} else {
					alert(data.msg);
				}
				// $(".c_yuyue").addClass('hide');
				// $(".c_yuyue2").removeClass('hide');
			}
		}, "json")
		// }
		// } else if($(".con_ul li:nth-child(2)").hasClass("active")) {
		// 	$.post("/site/ajax-yuyue.html", {
		// 		"type": type,
		// 		"cms_csrf": srf
		// 	}, function(data) {
		// 		if(data.status == 0) {
		// 			alert("恭喜您预约成功!");
		// 			$(".put_yqm").val("");
		// 			$(".login_yy").hide();
		// 			move();
		// 			$(".cishu span").text(cishu+1);
		// 		} else {
		// 			alert(data.msg);
		// 		}
		// 	}, "json");
		// }
	});
	//点击关闭中奖弹窗
	$(".p_sure").click(function() {
		$(".price").hide();
	});
	//点击弹出奖品提示框
	$(".game ul li:nth-child(2)").click(function() {
		if(clickNumber1 % 2 == 0) {
			$(this).children("div").addClass("active");
		} else {
			$(this).children("div").removeClass("active");
		}
		clickNumber1++;
	});
	$(".game ul li:nth-child(7)").click(function() {
		if(clickNumber2 % 2 == 0) {
			$(this).children("div").addClass("active");
		} else {
			$(this).children("div").removeClass("active");
		}
		clickNumber2++;
	});
	$(".game ul li:nth-child(12)").click(function() {
		if(clickNumber3 % 2 == 0) {
			$(this).children("div").addClass("active");
		} else {
			$(this).children("div").removeClass("active");
		}
		clickNumber3++;
	});
	$(".game ul li:nth-child(17)").click(function() {
		if(clickNumber4 % 2 == 0) {
			$(this).children("div").addClass("active");
		} else {
			$(this).children("div").removeClass("active");
		}
		clickNumber4++;
	});
	$(".game ul li:nth-child(22)").click(function() {
		if(clickNumber5 % 2 == 0) {
			$(this).children("div").addClass("active");
		} else {
			$(this).children("div").removeClass("active");
		}
		clickNumber5++;
	});
	//点击筛子开始游戏
	var dice = $("#shaizi");
	dice.click(function() {
		var cishu = parseInt($(".cishu span").text());
		if(!base.isLogin) {
			$(".command").show();
			return;
		}
		if($(".game ul li").eq(21).hasClass("active")) {
			alert("您已到达终点！");
			return;
		}
		if($(".cishu span").text() > 0) {
			dice.attr("class", "dice"); //清除上次动画后的点数 
			dice.css("cursor", "default");
			$("#shaizi").append("<div id='dice_mask'></div>"); //加遮罩 
			var num = Math.floor(Math.random() * 6 + 1); //产生随机数1-6 
			dice.animate({}, 100, function() {
				dice.addClass("dice_t");
			}).delay(2000).animate({}, 100, function() {
				dice.removeClass("dice_t").addClass("dice_s");
			}).delay(200).animate({
				opacity: 'show'
			}, 600, function() {
				dice.removeClass("dice_s").addClass("dice_e");
			}).delay(1000).animate({}, 100, function() {
				dice.removeClass("dice_e").addClass("dice_" + num);
				dice.css('cursor', 'pointer');
				$("#dice_mask").remove(); //移除遮罩 
			});
			$.post("/site/walk.html", {
				"num": num,
				"cms_csrf": srf
			}, function(data) {
				if(data.status == 0) {
					var index = parseInt(data.msg);
					$(".game ul li").removeClass("active");
					$(".game ul li").eq(index - 1).addClass("active");
					$(".cishu span").text(cishu - 1);
					if(data.msg >= 22) {
						$(".price").show();
						$(".game ul li").removeClass("active");
						$(".game ul li").eq(21).addClass("active");
						$(".game ul li:nth-child(2)").addClass("on");
						$(".game ul li:nth-child(7)").addClass("on");
						$(".game ul li:nth-child(12)").addClass("on");
						$(".game ul li:nth-child(17)").addClass("on");
						$(".game ul li:nth-child(22)").addClass("on");
						return false;
					}
					if(index < 7 && index >= 2) {
						$(".game ul li:nth-child(2)").addClass("on");
					}
					if(index < 12 && index >= 7) {
						$(".game ul li:nth-child(2)").addClass("on");
						$(".game ul li:nth-child(7)").addClass("on");
					}
					if(index < 17 && index >= 12) {
						$(".game ul li:nth-child(2)").addClass("on");
						$(".game ul li:nth-child(7)").addClass("on");
						$(".game ul li:nth-child(12)").addClass("on");
					}
					if(index < 22 && index >= 17) {
						$(".game ul li:nth-child(2)").addClass("on");
						$(".game ul li:nth-child(7)").addClass("on");
						$(".game ul li:nth-child(12)").addClass("on");
						$(".game ul li:nth-child(17)").addClass("on");
					}
				} else {
					alert(data.msg);
				}
			}, "json");
		} else {
			alert("剩余次数不足!");
		}
	});

	//下载区别
	$(".js_wap_down").click(function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isIOS) {
			$(this).attr("href", "javascript:;")
			alert("敬请期待！");
		}
	});
});