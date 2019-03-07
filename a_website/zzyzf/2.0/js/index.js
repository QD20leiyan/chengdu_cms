
$(function() {

	var base = {
		cms_csrf: $("meta[name='csrf-token']").attr("content"),
		isLogin: false,
		imgMarkIndex: 0,
		yyType: "ios",
	};

	function init() {
		isLogin();
		// getYyNumber();
		// getImgMark();
		// initSwiper();
	}

	function initSwiper() {
		var mySwiper = new Swiper('.swiper-container', {
			loop: true,
            autoplay: 2000,
			// 如果需要前进后退按钮
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		})
	}
	//判断用户是否登录
	function isLogin() {
		$.ajax({
			url: "/site/ajax-get-user.html",
			type: "POST",
			data: {
				cms_csrf: base.cms_csrf
			},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					base.isLogin = true;
				}
				initPageDataByLogin(data.msg);
			}
		})
	}
	//根据是否登录初始化页面数据展示
	function initPageDataByLogin(data) {
		if (base.isLogin) {
			$(".userName").html(data.user_phone);
			$(".userYqm").html(data.me_invite_code);
			if(data.invite_num == undefined || data.invite_num == null){
                data.invite_num = 0;
			}
			$(".userFriend").html(data.invite_num);
			$(".tc3_markBox>img").attr("src", data.invite_img);

			$("#z3_loginend").addClass("active");
			$("#z3_noLogin").removeClass("active");
		} else {
			$("#z3_loginend").removeClass("active");
			$("#z3_noLogin").addClass("active");
		}
	}
	//获取预约人数
	function getYyNumber() {
		$.ajax({
			url: "/commonMethod/ajax-get-new-subscribes.html",
            type: "GET",
            data:{'name','zzyzf_total'},
			success: function(data) {
				// var data = JSON.parse(data);
				var yyNumber = data.msg;
				if (data.msg == null) {
					yyNumber = 0;
				}

                yyNumber = parseInt(yyNumber);
                $(".z1_yy_number").html(yyNumber);
				showYyNumberIcon(yyNumber);
			}
		}, "json")
	}
	//标识预约人数
	function showYyNumberIcon(number) {
		var iconCount = 0,
			z2_list_li = $(".z2_list > li");

		if (500 <= number && number < 1000) {
			iconCount = 1;
		} else if (1000 <= number && number < 2000) {
			iconCount = 2;
		} else if (2000 <= number && number < 3000) {
			iconCount = 3;
		} else if (3000 <= number && number < 4000) {
			iconCount = 4;
		} else if(number >= 4000){
		    iconCount = 5;
		}

		for (var i = 0; i < iconCount; i++) {
			z2_list_li.eq(i).addClass("active");
		}
	}
	//获取图片验证码地址
	function getImgMark() {
		base.imgMarkIndex++;
		var markImg = $("#tc1_img");
		var imgUrl = "site/captcha?refresh=" + base.imgMarkIndex;
		$.ajax({
			url: imgUrl,
			type: "GET",
			success: function(data) {
				//var data = JSON.parse(data);
				//console.log(data);
				markImg.attr("src", data.url);
			}
		})
	}
	//显示弹窗
	function showTC(index) {
		var z_tcBox = $(".z_tcBox"),
			z_tcBox_div = $(".z_tcBox > div");

		z_tcBox_div.removeClass("active").eq(index).addClass("active");
		z_tcBox.addClass("z_tcBox_active");
	}
	//隐藏弹窗
	function hideTC() {
		$(".z_tcBox").removeClass("z_tcBox_active");
	}
	//显示错误信息
	function showErr(index, text) {
		$(".tc1_err").eq(index).html(text).addClass("tc1_err_show");
	}
	//隐藏错误信息
	function hideErr(index) {
		$(".tc1_err").eq(index).removeClass("tc1_err_show");
	}
	//检查手机号码
	function checkPhone() {
		var userPhone = $("#userPhone").val();
		if (userPhone == "" || userPhone == null) {
			showErr(0, "请输入手机号码");
			return;
		}
		if (!/^[0-9]*$/.test(userPhone) || userPhone.length != 11) {
			showErr(0, "请输入正确的手机号码");
			return;
		}
		hideErr(0);
		return true;
	}
	//检查图形验证码
	function checkImgMark() {
		var tc1_imgMark = $(".tc1_imgMark > input").val();
		if (tc1_imgMark == "" || tc1_imgMark == null) {
			showErr(1, "请输入图形验证码");
			return;
		}
		hideErr(1);
		return true;
	}
	//检查手机验证码
	function checkPhoneMark() {
		var tc1_phoneMark = $(".tc1_phoneMark > input").val();
		if (tc1_phoneMark == "" || tc1_phoneMark == null) {
			showErr(2, "请输入手机验证码");
			return;
		}
		if (!/^[0-9]*$/.test(tc1_phoneMark)) {
			showErr(2, "请输入正确的手机验证码");
			return;
		}
		hideErr(2);
		return true;
	}
	//倒计时
	function countdownTime(ele, time, callBack) {
		var time = parseInt(time);
		ele.html(time + "s");
		var timer = setInterval(function() {
			time = time - 1;
			if (time == 0) {
				ele.html("获取验证码");
				clearInterval(timer);
				if (callBack) {
					callBack()
				}
				return;
			}
			ele.html(time + "s");
		}, 1000);
	}
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
	//页面事件
	$(".z1_yyBtn").click(function() {
		if (base.isLogin) {
			var code = getUrlParam("code");
			//console.log(code);
			if (code) {
				$(".tc2_yqm").val(code);
			}
			showTC(1);
		} else {
			showTC(0);
		}
	});
	//选择预约设备类型
	$(".tc2_yyType>p").click(function() {
		base.yyType = $(this).attr("type");
		$(".tc2_yyType>p").removeClass("active");
		$(this).addClass("active");
	});
	$(".tc2_friend>p").click(function() {
		var type = $(this).attr("type");
		if (type == "no") {
			$(".tc2_yqm").val(null);
		}
		$(".tc2_friend>p").removeClass("active");
		$(this).addClass("active");
	});
	//立即预约
	$(".tc2_sendYY").click(function() {
		var self = $(this);
        var type = $(".tc2_friend>p.active").attr("type");
		var isClick = self.attr("isClick");
		if (isClick == "true") {
			return;
		}

		var val = $(".tc2_yqm").val(),
			tc2_err = $(".tc2_err");
		console.error(type);
		if (type == 'yes' && (val == "" || val == null)) {
			tc2_err.html("请输入邀请码").addClass("tc2_err_show");
			return;
		}
		tc2_err.removeClass("tc2_err_show");
		self.attr("isClick", "true");

		$.ajax({
			url: "/site/ajax-yuyue.html",
			type: "POST",
			data: {
				type: base.yyType,
				invite_code: val,
				cms_csrf: base.cms_csrf,
			},
			success: function(data) {
				// var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					alert("预约成功");
					hideTC();
					getYyNumber();
				} else {
					tc2_err.html(data.msg).addClass("tc2_err_show");
				}
				self.attr("isClick", "");
			},
			error: function() {
				alert(data.msg);
				self.attr("isClick", "");
			}
		}, "json")

	});
	$("#z3_noLogin button").click(function() {
		showTC(0);
	});
	//更换图片验证码
	$(".tc1_imgMark > label").click(function() {
		getImgMark();
	});
	//获取验证码
	$(".tc1_phoneMark > label").click(function() {
		var self = $(this);
		var isClick = self.attr("isClick");
		if (isClick == "true") {
			return;
		}
		if (!checkPhone()) {
			return;
		}
		if (!checkImgMark()) {
			return;
		}
		self.attr("isClick", "true");
		$.ajax({
			url: "/site/ajax-login-verify.html",
			type: "POST",
			data: {
				phone: $("#userPhone").val(),
				captcha: $(".tc1_imgMark > input").val(),
				cms_csrf: base.cms_csrf,
			},
			success: function(data) {
				// var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					countdownTime($(".tc1_phoneMark > label"), 60, function() {
						self.attr("isClick", "");
					});
				} else {
					showErr(1, data.msg);
					getImgMark();
					self.attr("isClick", "");
				}
			},
			error: function() {
				alert(data.msg);
				self.attr("isClick", "");
			}
		}, "json")
	});
	//登录
	$(".tc1_login").click(function() {
		var self = $(this);
		var isClick = self.attr("isClick");
		if (isClick == "true") {
			return;
		}
		if (!checkPhone()) {
			return;
		}
		if (!checkImgMark()) {
			return;
		}
		if (!checkPhoneMark()) {
			return;
		}
		self.attr("isClick", "true");

		$.ajax({
			url: "/site/ajax-login.html",
			type: "POST",
			data: {
				phone: $("#userPhone").val(),
				captcha: $(".tc1_imgMark > input").val(),
				yzm: $(".tc1_phoneMark > input").val(),
				cms_csrf: base.cms_csrf,
			},
			success: function(data) {
				// var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					base.isLogin = true;
					initPageDataByLogin(data.msg);
					hideTC();
				} else {
					showErr(2, data.msg);
					getImgMark();
					self.attr("isClick", "");
				}
			},
			error: function() {
				alert(data.msg);
				self.attr("isClick", "");
			}
		}, "json")
	});
	//邀请好友
	$(".z3_tellFriend").click(function() {
		if (base.isLogin) {
			showTC(2);
		} else {
			showTC(0);
		}
	});

	$(".tc_close").click(function() {
		hideTC();
	});
    // nav列表
	$(".news-nav li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".tab-cont ul").eq(index).removeClass("hide").siblings().addClass("hide");
	});
	// 新闻中心列表
	$(".news-menu li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".tab-cont ul").eq(index).removeClass("hide").siblings().addClass("hide");
	});
	init();
	
})