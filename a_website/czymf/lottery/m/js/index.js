function autoScroll(obj) {
	var length = $(obj).find("li").length;
	if(length > 5) {
		$(obj).find("ul").animate({
			marginTop: "-0.54rem"
		}, 1000, function() {
			$(this).css({
				marginTop: "0px"
			}).find("li:first").appendTo(this);
		})
	}
};
$(function() {
	var base = {
		isLogin: false,
		sendYy: false,
		sendMark: false,
		sendLogin: false,
		sendLoginOut: false,
		luckyNumber: 0,
	};
	var countdown = 60;
	var srf = $("meta[name='csrf-token']").attr("content");
	var lottery = {
		index: -1, //当前转动到哪个位置，起点位置
		count: 0, //总共有多少个位置
		timer: 0, //setTimeout的ID，用clearTimeout清除
		speed: 20, //初始转动速度
		times: 0, //转动次数
		cycle: 40, //转动基本次数：即至少需要转动多少次再进入抽奖环节
		prize: -1, //中奖位置
		init: function(id) {
			if($("#" + id).find(".lottery-unit").length > 0) {
				$lottery = $("#" + id);
				$units = $lottery.find(".lottery-unit");
				this.obj = $lottery;
				this.count = $units.length;
				$lottery.find(".lottery-unit-" + this.index).addClass("active");
			};
		},
		roll: function() {
			var index = this.index;
			var count = this.count;
			var lottery = this.obj;
			$(lottery).find(".lottery-unit-" + index).removeClass("active");
			index += 1;
			if(index > count - 1) {
				index = 0;
			};
			$(lottery).find(".lottery-unit-" + index).addClass("active");
			this.index = index;
			return false;
		},
		stop: function(index) {
			this.prize = index;
			return false;
		},
		end:function(){}
	};

	function roll() {
		lottery.times += 1;
		lottery.roll();
		if(lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
			clearTimeout(lottery.timer);
			lottery.prize = -1;
			lottery.times = 0;
			click = false;
			lottery.end();
		} else {
			if(lottery.times < lottery.cycle) {
				lottery.speed -= 10;
			} else {
				if(lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
					lottery.speed += 110;
				} else {
					lottery.speed += 20;
				}
			}
			if(lottery.speed < 60) {
				lottery.speed = 60;
			};
			lottery.timer = setTimeout(roll, lottery.speed);
		}
		return false;
	}
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
	}
//	init();
	userPrice();
	//判断用户是否登录
//	function init() {
//		$.get("/site/ajax-lottery-get-user.html", {}, function(data) {
//			if(data.status == 0) {
//				base.luckyNumber = data.lottery_count;
//				base.isLogin = true;
//				$(".login").hide();
//				$(".a_login span").html(data.phone);
//				$(".c_p1 span").html(base.luckyNumber);
//			} else {
//				base.isLogin = false;
//			}
//		}, "json");
//	};
	//获取所有用户中奖记录
	function userPrice() {
		$.get("/site/ajax-lottery-log.html", {}, function(data) {
			if(data.status == 0) {
				var msg = data.data;
				var listLength = msg.length;
				var html = "";
				for(var i = 0; i < listLength; i++) {
					html = html + '<li>恭喜' +
						'<span>' + msg[i].phone + '</span>获得' +
						'<i>' + msg[i].name + '</i>' +
						'</li>'
				}
				$(".price_txt ul").append(html);
			}
		}, "json");
	};
	//图片验证码
	function tupian() {
		$.get("/site/captcha.html?refresh=1", {}, function(data) {
			$(".tupian img").attr("src", data.url);
		}, 'json');
	}
	//点击分享弹出弹窗
//	$(".qp").click(function() {
//		if(!base.isLogin) {
//			$(".tc_login").show();
//		} else {
//			$('.share').show();
//		}
//	});
	//点击分享增加分享次数
	$(".jiathis_style_32x32 li").on("click", function() {
		var self = $(this);
		var isClick = self.attr("isClick");
		if(isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		$.get("/site/ajax-lottery-share.html", {}, function(data) {
			if(data.status == 0) {
				base.luckyNumber = data.lottery_count;
				$(".c_p1 span").html(base.luckyNumber);
			} else {
				alert(data.msg);
			}
			self.attr("isClick", "");
		}, "json");
	});
	//查看当前用户中奖记录
//	$(".my_price").click(function() {
//		if(!base.isLogin) {
//			$(".tc_login").show();
//			return;
//		}
//		$.get("/site/ajax-lottery-me-log.html", {}, function(data) {
//			if(data.status == 0) {
//				var msg = data.msg;
//				var listLen = msg.length;
//				if(listLen == 0) {
//					alert("您还没有中奖记录哦~");
//				} else {
//					var html = "";
//					for(var i = 0; i < listLen; i++) {
//						if(msg[i].gift_id == 1) {
//							html = html + '<li>' +
//								'<span>' + msg[i].name + '</span>' +
//								'<span><a href="https://h5.ele.me/baida/#group_sn=d1b70109647bf58abdd8e6113b772f24&b">' + msg[i].code + '</a></span>' +
//								'</li>'
//						} else {
//							html = html + '<li>' +
//								'<span>' + msg[i].name + '</span>' +
//								'<span>' + msg[i].code + '</span>' +
//								'</li>'
//						}
//					}
//					$('.check_ul').html(null).append(html);
//					$(".check").show();
//				}
//			} else {
//				alert(data.msg);
//			}
//		}, "json");
//	});
	//图片验证码
	$(".tupian").click(function() {
		$.get("/site/captcha.html?refresh=1", {}, function(data) {
			$(".tupian img").attr("src", data.url);
		}, 'json');
	});
	//用户点击获取验证码
	$(".g_code").click(function() {
		var phone = $(".phone").val();
		var imgCode = $(".code").val();
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(imgCode == "" || imgCode == undefined) {
			alert("图片验证码不能为空");
			return;
		}
		$.post("/site/ajax-lottery-login-verify.html", {
			"phone": phone,
			"captcha": imgCode,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				sendemail();
			} else {
				tupian();
				alert(data.msg);
			}
		}, "json");
	});
	//用户点击登录
//	$(".c_dl").click(function() {
//		var phone = $(".phone").val();
//		var yzm = $(".i_code").val();
//		if(phone == "" || phone == undefined) {
//			alert("手机号不能为空");
//			return;
//		}
//		if(phone.length != 11) {
//			alert("手机号不正确");
//			return
//		}
//		if(yzm == "" || yzm == undefined) {
//			alert("验证码不正确")
//		}
//		$.post("/site/ajax-lottery-login.html", {
//			"phone": phone,
//			"yzm": yzm,
//			"cms_csrf": srf
//		}, function(data) {
//			if(data.status == 0) {
//				init();
//				$(".tc_login").hide();
//			} else {
//				tupian();
//				alert(data.msg);
//			}
//		}, "json");
//	});
//	var prizes = {
//		1: {
//			i: 0,
//			prize: '饿了么专属红包*1'
//		},
//		2: {
//			i: 1,
//			prize: '《马戏之王》电影票*1'
//		},
//		3: {
//			i: 2,
//			prize: '独角兽*1'
//		},
//		4: {
//			i: 7,
//			prize: '银矿*10'
//		},
//		5: {
//			i: 3,
//			prize: '烤牛排*30'
//		},
//		6: {
//			i: 6,
//			prize: '谢谢参与'
//		},
//		7: {
//			i: 5,
//			prize: '红菇大虾*5'
//		},
//		8: {
//			i: 4,
//			prize: '爱奇艺会员折扣券*1'
//		},
//	};
//	var click = false;
//	lottery.init('lottery');
	//点击抽奖
//	$(".last_li").click(function() {
//		var self = $(this);
//		if(!base.isLogin) {
//			$('.tc_login').show();
//			return;
//		}
//		if(click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
//			return;
//		}
//		if($(".c_p1 span").text() > 0) {
//			$(".last_li").addClass("active");
//			lottery.speed = 150;
//			roll();
//			click = true;
//			setTimeout(function() {
//				$.ajax({
//					'url': "/site/ajax-lottery.html",
//					'data': {},
//					'type': 'GET',
//					'dataType': 'Json',
//					success: function(data) {
//						if(data.status == 0) {
//							$('.c_p1 span').text(data.count);
//							var id = data.id;
//							lottery.stop(prizes[id].i);
//							//中奖弹框显示
//							var code = data.code;
//							if(id == 1) {
//								$(".jiangpin span").text("饿了么专属红包");
//							} else if(id == 2) {
//								$(".jiangpin span").text("《马戏之王》电影票");
//							} else if(id == 3) {
//								$(".jiangpin span").text("独角兽")
//							} else if(id == 4) {
//								$(".jiangpin span").text("银矿")
//							} else if(id == 5) {
//								$(".jiangpin span").text("烤牛排")
//							} else if(id == 7) {
//								$(".jiangpin span").text("红菇大虾")
//							} else if(id == 8) {
//								$(".jiangpin span").text("爱奇艺会员折扣券")
//							}
//							lottery.end = function() {
//								if(id !== 6) {
//									if(id == 1) {
//										$(".m_bg").html("<a href='https://h5.ele.me/baida/#group_sn=d1b70109647bf58abdd8e6113b772f24&b' target='_blank'>https://h5.ele.me/baida/#group_sn=d1b70109647bf58abdd8e6113b772f24&b</a>");
//										$(".congra").show();
//									} else {
//										$(".m_bg").text(code);
//										$(".congra").show();
//									}
//								} else if(id == 6) {
//									$(".congra1").show();
//								}
//							}
//						} else {
//							//alert(data.msg);
//							lottery.stop(prizes[6].i);
//							$(".congra1 p").text(data.msg);
//							$(".congra1").show();
//						}
//					}
//				});
//			}, 3000);
//		} else {
//			//alert("抽奖次数已经用完！");
//			$(".share").show();
//			$(this).removeClass("active");
//		}
//	});
	//点击复制文案
	new Clipboard('#tc7_copyBtn0');
	$("#tc7_copyBtn0").click(function() {
		alert("已复制");
	});
	//注销登录
	$(".zhuxiao").click(function() {
		$.get("/site/ajax-login-out.html", {}, function(data) {
			if(data.status == 0) {
				location.reload();
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	//点击弹出登录弹框
	$(".login").click(function() {
//		$(".tc_login").show();
		alert("活动已结束！");
	});
	$(".last_li").click(function (){
		alert("活动已结束！");
	});
	$(".my_price").click(function (){
		alert("活动已结束！");
	});
	$(".qp").click(function (){
		alert("活动已结束！");
	});
	//电影介绍弹框
	$(".dream").click(function() {
		$(".film").show();
	});
	//关闭按钮
	$(".close").click(function() {
		$(this).parent().parent().hide();
	});
	var scroll = setInterval('autoScroll(".price_txt")', 1000);
})