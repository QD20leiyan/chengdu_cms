//jiaThis配置
var jiathis_config = {
	url: "",
	title: "代号英雄",
	summary: "",
	pic: "",
}

$(function() {
	var base = {
		isLogin: false,
		sendYy: false,
		sendMark: false,
		sendLogin: false,
		sendLoginOut: false,
		luckyNumber: 0,
		loginType: "",
		yyType: "ios",
		swiperInit: false,
		share_url: "",
		lp: [
			{ name: "珍稀小恐龙长袖" },
			{ name: "珍稀小恐龙长袖" },
			{ name: "珍稀小恐龙长裤" },
			{ name: "珍稀小恐龙长裤" },
		],
		cms_csrf: $("meta[name='csrf-token']").attr("content"),
	};

	//函数
	function init() {
		initPageData();
		getPersonNumber();
	}

	function initPageData() {
		$.ajax({
			url: "/site/ajax-get-user.html",
			type: "get",
			data: {},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					var msg = data.msg;
					base.isLogin = true;
					jiathis_config.url = msg.share_url;
					base.luckyNumber = msg.num;
					$(".i2_login").show();
					$(".i2_noLogin").hide();
					$(".userPhone").html(msg.phone);
					$("#userLuckyNumber").html(base.luckyNumber);
					//初始化翻牌样式
					initCartType(data.msg);
				} else {
					base.isLogin = false;
					$(".i2_login").hide();
					$(".i2_noLogin").show();
					$(".d_loading").remove();
				}
			},
			error: function(data) {
				//console.log(data);
			}
		});
	}
    //初始化翻牌
	function initCartType(data) {
		var i2_cart = $(".i2_cart_list>li");
		if (data.node_1 != 0) {
			i2_cart.eq(data.node_1 - 1).addClass("active");
		}
		if (data.node_2 != 0) {
			i2_cart.eq(data.node_2 - 1).addClass("active");
		}
		if (data.empty_node_1 != 0) {
			i2_cart.eq(data.empty_node_1 - 1).addClass("active");
		}
		if (data.empty_node_2 != 0) {
			i2_cart.eq(data.empty_node_2 - 1).addClass("active");
		}
		//去掉loading
		setTimeout(function() {
			$(".d_loading").remove();
		}, 350);
	}
	//获取预约人数
	function getPersonNumber() {
		if (xhr) {
			xhr.abort();
		}
		var xhr = $.ajax({
			url: "/site/ajax-get-yuyue-num.html",
			type: "get",
			data: {},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					var personNumber = resetPersonNumber(data.msg);
					$(".i1_number .count").html(personNumber);
					$(".i3_number > p").html(personNumber);
					$(".i3_proImg").css({
						width: getPercent(data.msg) + "%"
					})
				} else {
					alert(data.msg);
				}
			},
			error: function(data) {
				//console.log(data);
			}
		})
		//每隔时间获取预约人数
		//setTimeout(function() {
		//	getPersonNumber();
		//}, 3000);
	}
	//获取预约百分比
	function getPercent(number) {
		if (number >= 8000000) {
			number = number - 1000000;
		}
		var percent = parseFloat((parseInt(number) / 100000).toFixed(2));
		return percent;
	}
	//处理预约人数
	function resetPersonNumber(number) {
		var index = 0,
			newUnmber1 = "",
			newUnmber2 = "",
			number = number.toString();
		for (var i = number.length - 1; i >= 0; i--) {
			index++;
			if (index == 3) {
				index = 0;
				newUnmber1 = newUnmber1 + number[i] + ",";
				continue;
			}
			newUnmber1 = newUnmber1 + number[i];
		}

		for (var i = newUnmber1.length - 1; i >= 0; i--) {
			newUnmber2 = newUnmber2 + newUnmber1[i];
		}
		return newUnmber2;
	}

	function swiperInit() {
		$(".lp_name").html(base.lp[0].name);
		var mySwiper = new Swiper('.swiper-container', {
			speed: 300,
			// 如果需要前进后退按钮
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			onSlideChangeEnd: function(swp) {
				//console.log(swp.activeIndex);
				var activeIndex = swp.activeIndex;
				$(".lp_name").html(base.lp[activeIndex].name);
				$(".lp_number label").html(activeIndex + 1);
			},
		});
	}

	function loginTest(obj) {
		var val = obj.ele.val().trim();
		//判断为空
		if (val == null || val == "") {
			showErr(obj.errIndex, obj.errText[0]);
			return false;
		}
		//判断手机号
		if (obj.type == "phone") {
			if (val.length != 11 || !/^[0-9]*$/.test(val)) {
				// if (val.length != 11) {
				showErr(obj.errIndex, obj.errText[1]);
				return false;
			}
		}
		//判断验证码
		if (obj.type == "mark") {
			if (!/^[0-9]*$/.test(val)) {
				showErr(obj.errIndex, obj.errText[1]);
				return false;
			}
		}
		hideErr(obj.errIndex);
		return true;
	}

	function showErr(index, text) {
		$(".err").removeClass("active").eq(index).addClass("active").html(text);
	}

	function hideErr(index) {
		$(".err").eq(index).removeClass("active");
	}
	//倒计时
	function countdownTime(time, callBack) {
		var markBtn = $("#getMarkBtn");
		var time = parseInt(time);
		markBtn.html(time + "s");
		var timer = setInterval(function() {
			time = time - 1;
			if (time == 0) {
				markBtn.html("获取验证码");
				clearInterval(timer);
				if (callBack) {
					callBack()
				}
				return;
			}
			markBtn.html(time + "s");
		}, 1000);
	}
	//事件
	//翻牌
	$(".i2_cart_list li").click(function() {
		var self = $(this);
		//判断是否登录
		if (!base.isLogin) {
			showTc(0);
			return;
		}
		//判断是否剩余点击次数
		if (base.luckyNumber <= 0) {
			showTc(9, {
				text: "您还没有翻牌机会<br>赶紧分享页面，参加活动吧"
			})
			return;
		}
		//判断是否点击
		var isClick = self.attr("isClick");
		if (isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		var index = parseInt($(".i2_cart_list li").index(self)) + 1;
		//翻牌ajax
		$.ajax({
			url: "/site/ajax-draw.html",
			type: "post",
			data: {
				node: index,
				cms_csrf: base.cms_csrf
			},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					if (data.draw_zs == 1) {
						showTc(9, {
							text: "我就说很容易翻开吧，好的开始是成功的一半，继续翻牌，大奖你开!"
						})
					} else if (data.draw_zs == 2) {
						showTc(3);
					} else if (data.draw_zs == 3) {
						showTc(9, {
							text: "就差一张牌了，胜利的曙光就在眼前！"
						})
					} else if (data.draw_zs == 4) {
						showTc(2);
					}
					self.attr("class", "active");
					base.luckyNumber--;
					$("#userLuckyNumber").html(base.luckyNumber);
				} else if (data.status == 1) {
					showTc(4);
					base.luckyNumber--;
					self.attr("isClick", "");
					$("#userLuckyNumber").html(base.luckyNumber);
				} else if (data.status == 2) {
					self.attr("isClick", "");
					showTc(3);
				} else if (data.status == 3) {
					self.attr("isClick", "");
					showTc(9, {
						text: "您已获得专属小恐龙长裤，请关注其他官方活动"
					})
				} else {
					self.attr("isClick", "");
					showTc(9, {
						text: data.msg
					})
				}
			},
			error: function(data) {
				self.attr("isClick", "");
			}
		})
		// $(this).attr("class", "active");
	});
	//继续参加
	$("#keepLucky").click(function() {
		var self = $(this);
		var isClick = self.attr("isClick");
		if (isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		$.ajax({
			url: "/site/ajax-jx-draw.html",
			type: "get",
			data: {},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					$(".d_tc").hide();
				} else {
					alert(data.msg);
				}
				self.attr("isClick", "");
			},
			error: function(data) {
				self.attr("isClick", "");
			}
		})
	});
	//放弃参加
	$("#giveUpLucky").click(function() {
		var self = $(this);
		var isClick = self.attr("isClick");
		if (isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		$.ajax({
			url: "/site/ajax-jj-draw.html",
			type: "get",
			data: {},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					$(".d_tc").hide();
				} else {
					alert(data.msg);
				}
				self.attr("isClick", "");
			},
			error: function(data) {
				self.attr("isClick", "");
			}
		})
	});
	$(".i2_share").click(function() {
		if (base.isLogin) {
			showTc(1);
		} else {
			showTc(0);
		}
	});
	$(".i2_gz").click(function() {
		showTc(7);
	});
	$(".showLoginBtn").click(function() {
		showTc(0);
	});
	//查看奖励
	$(".checkJl").click(function() {
		showTc(8);
		if (base.swiperInit) {
			return;
		}
		base.swiperInit = true;
		swiperInit();
	});
	//选择预约方式
	$(".checkBox p").click(function() {
		$(".checkBox p").removeClass("active");
		$(this).addClass("active");
		base.yyType = $(this).attr("name");
	});
	//点击预约
	$(".yySignBtn").click(function() {
		if (base.sendYy) {
			return;
		}
		base.sendYy = true;
		$.ajax({
			url: "/site/ajax-yuyue.html",
			type: "post",
			data: {
				type: base.yyType,
				cms_csrf: base.cms_csrf
			},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					$(".d_tc").hide();
					alert(data.msg);
				} else {
					alert(data.msg);
				}
				base.sendYy = false;
			},
			error: function(data) {
				base.sendYy = false;
			}
		})
	});
	//点击分享
	$(".jiathis_style_32x32 > a").click(function() {
		var self = $(this);
		var className = self.attr("class");
		var isClick = self.attr("isClick");

		if (className == "jiathis_button_weixin") {
			return;
		}

		if (isClick == "true") {
			return;
		}

		self.attr("isClick", "true");

		$.ajax({
			url: "/site/ajax-add-draw.html",
			type: "GET",
			data: {},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					base.luckyNumber = data.msg;
					$("#userLuckyNumber").html(base.luckyNumber);
				} else {
					alert(data.msg);
				}
				self.attr("isClick", "");
			},
			error: function(data) {
				self.attr("isClick", "");
			}
		})
	})
	//判断微信分享是否成功
	$(document).on("click", "#jiathis_weixin_close", function() {
		$.ajax({
			url: "/site/ajax-get-user.html",
			type: "get",
			data: {},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					var msg = data.msg;
					base.luckyNumber = msg.num;
					$("#userLuckyNumber").html(base.luckyNumber);
				}
			},
			error: function(data) {
                alert("请检查您的网络~");
			}
		});
	});
	//中奖记录
	$(".i2_list").click(function() {
		if (base.isLogin == false) {
			showTc(0);
			return;
		}
		$.ajax({
			url: "/site/ajax-draw-log.html",
			type: "post",
			data: {
				cms_csrf: base.cms_csrf
			},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					var msg = data.msg;
					var listLen = msg.length;
					if (listLen == 0) {
						alert("您还没有中奖记录喔~");
					} else {
						var html = "";
						for (var i = 0; i < listLen; i++) {
							html = html + '<tr>' +
								'<td>' + msg[i].name + '</td>' +
								'<td id="tc7_copyText' + i + '">' + msg[i].code + '</td>' +
								'<td>' +
								'<label id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '">复制</label>' +
								'</td>' +
								'</tr>';
						}
						$("#tc7_tbody").html(null).append(html);
						//初始化复制插件
						setTimeout(function() {
							$("#tc7_tbody tr label").each(function(index) {
								new Clipboard('#tc7_copyBtn' + index);
							});
							showTc(6);
						}, 50);
					}
				} else {
					alert(data.msg);
				}
			},
			error: function(data) {
				//console.log(data);
			}
		})
	});
	//点击游戏预约按钮
	$(".yyBtn").click(function() {
		if (base.isLogin) {
			showTc(5);
		} else {
			base.loginType = "yy";
			showTc(0);
		}
	})
	$("#getMarkBtn").click(function() {
        console.log(base.sendMark);
		if (base.sendMark) {
			return;
		}
		var captcha = $(".captcha").val();
		var srf = $('meta[name="csrf-token"]').attr('content');
		var canLogin = loginTest({
			ele: $(".phone"),
			type: "phone",
			errIndex: 0,
			errText: [
				"请输入手机号",
				"请输入正确的手机号",
			]
		});
		if (canLogin != true) {
			return;
		}
		if(captcha == "" || captcha == undefined) {
			showErr(1,"请输入图形验证码")
			return;
		}
		//获取验证码
		$.post("/site/ajax-login-verify.html",{ "phone":$(".phone").val(),"captcha": $(".captcha").val(),"cms_csrf":srf },function(data){
			if(data.status == 0){
                hideErr(1);
                base.sendMark = true;
				//$("#getMarkBtn").css("pointer-events","none");
				load_captcha();
				countdownTime(60, function() {
					base.sendMark = false;
				});
				//page_djs($("#getMarkBtn"),function(){
				//	$("#getMarkBtn").css("pointer-events","auto");
				//});
			}else{
				alert(data.msg);
				load_captcha();
			}
		}, 'json');
	});
	//图片验证码刷新
	var imgMarkIndex=1;
	function load_captcha(){
		imgMarkIndex++;
		var imgUrl = "/site/captcha?refresh=" + imgMarkIndex;
		$.get(imgUrl, {}, function(data) {
			$("#getMarkBtn1 img").attr("src", data.url);
		}, 'json');
	}
	$("#getMarkBtn1").click(function(){
		load_captcha();
	});
	//登录
	$(".loginBtn").click(function() {
		if (base.sendLogin) {
			return;
		}
		var phoneRight = loginTest({
			ele: $(".phone"),
			type: "phone",
			errIndex: 0,
			errText: [
				"请输入手机号",
				"请输入正确的手机号",
			]
		});
		if (phoneRight != true) {
			return;
		}
		var markRight = loginTest({
			ele: $(".mark"),
			type: "mark",
			errIndex: 2,
			errText: [
				"请输入验证码",
				"请输入正确的验证码",
			]
		});
		if (markRight != true) {
			return;
		}
		base.sendLogin = true;
		//登录ajax
		$.ajax({
			url: "/site/ajax-login.html",
			type: "POST",
			data: {
				phone: $(".phone").val().trim(),
				yzm: $(".mark").val().trim(),
				cms_csrf: base.cms_csrf
			},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				//登录成功
				if (data.status == 0) {
					initPageData();
					if(base.loginType == "yy"){
                        showTc(5);
					}else{
						$(".d_tc").hide();
					}
				} else {
					showErr(1, data.msg);
				}
				base.sendLogin = false;
			},
			error: function(data) {
				base.sendLogin = false;
			}
		})
	})
	//注销登录
	$(".loginOutBtn").click(function() {
		if (!base.isLogin) {
			return;
		}
		if (base.sendLoginOut) {
			return;
		}
		base.sendLoginOut = true;
		$.ajax({
			url: "/site/ajax-logout.html",
			type: "GET",
			data: {},
			success: function(data) {
				var data = JSON.parse(data);
				if (data.status == 0) {
					location.reload();
				}
				base.sendLoginOut = false;
			},
			error: function(data) {
				base.sendLoginOut = false;
			}
		})
	})
	//显示弹窗  
	function showTc(index, obj) {
		var self = $(".d_tc > div").eq(index);
		$(".d_tc > div").removeClass("active");
		self.addClass("active");
		if (index == 9) {
			$(".d_tc10 > p").html(obj.text);
		}
		$(".d_tc").show();

	}
	//关闭弹窗
	$(".tc_closeBtn").click(function() {
		base.loginType = "";
		$(".d_tc").hide();
	});

	init();
});
