//jiathis分享配置
var jiathis_config = {
	url: "",
	title: "代号英雄",
	summary: "",
	pic: "",
}
var base = {
	isLogin: false,
	luckyNumber: 0,
	priceNumber:0,
};
var countdown = 60;
var srf = $("meta[name='csrf-token']").attr("content");

function autoScroll(obj) {
	var length = $(obj).find("li").length;
	if(length > 3) {
		$(obj).find("ul").animate({
			marginTop: "-2.5rem"
		}, 1000, function() {
			$(this).css({
				marginTop: "0px"
			}).find("li:first").appendTo(this);
		})
	}
};
//倒计时
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
function tupian() {
	$.get("/site/captcha.html?refresh=1", {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
};
$(function() {
	var mySwiper = new Swiper(".banner_price", {
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		observer: true,
		observeParents: true,
	});
	var mySwiper01 = new Swiper(".d_banner", {
		prevButton: '.swiper-button-prev1',
		nextButton: '.swiper-button-next1',
		spaceBetween: 10,
		observer: true,
		observeParents: true,
	});
	var scroll = setInterval('autoScroll(".price_ul")', 2000);
	$(".c_close").click(function() {
		$(this).parent().parent().hide();
	});
	$(".p_sure").click(function() {
		$(this).parent().parent().hide();
	});
	$(".pingtai>div").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	init();
	allPrice();
	//判断用户是否登录
	function init() {
		$.get("/activity/ajax-get-user", {}, function(data) {
			if(data.status == 0) {
				base.isLogin = true;
				var n_number = parseInt(data.msg.lottery_num);
				base.priceNumber = data.msg.is_activity;
				$(".d_phone").html(data.msg.phone);
				jiathis_config.url = data.msg.share_url;
				$(".d_cishu").html(data.msg.activity_count);
				$(".yaoqing_p span").html(data.msg.invite_url);
				$(".yqm span").html(data.msg.me_invite_code);
				$('.before_denglu').addClass("active");
				$(".after_denglu").removeClass("active");
				$('.login').hide();
				if(data.msg.is_save != "") {
					var index = parseInt(data.msg.is_save) - 1;
					$(".card ul li").eq(index).addClass("active");
					$(".card ul li").eq(index).addClass("on");
				}
				if(data.msg.is_address == 1) {
					$(".name").val(data.msg.name);
					$(".postcode").val(data.msg.code);
					$(".s_phone").val(data.msg.tel);
					$(".s_address").html(data.msg.address);
				} else if(data.msg.is_address == 0) {
					$(".sure_add").addClass("active");
					$(".name").val(data.msg.name);
					$(".postcode").val(data.msg.code);
					$(".s_phone").val(data.msg.tel);
					$(".s_address").html(data.msg.address);
				}
				if(data.msg.is_activity == 1) {
					$(".s_cishu").addClass("active");
					$(".a_btn").addClass("active");
					$(".a_btn").removeClass("on");
					$(".s_cishu em").html(data.msg.lottery_num);
				} else if(data.msg.is_activity == 0){
					$(".s_cishu").removeClass("active");
					$(".a_btn").removeClass("active");
					$(".a_btn").removeClass("on");
					$(".s_cishu em").html(data.msg.lottery_num);
				} 
				if(n_number == 0 && data.msg.is_activity == 1){
					$(".s_cishu").addClass("active");
					$(".a_btn").removeClass("active");
					$(".a_btn").addClass("on");
					$(".s_cishu em").html(data.msg.lottery_num);
				} else if(n_number != 0 && data.msg.is_activity == 1){
					$(".s_cishu").addClass("active");
					$(".a_btn").addClass("active");
					$(".a_btn").removeClass("on");
					$(".s_cishu em").html(data.msg.lottery_num);
				}
				$.each(data.msg.activity_str, function(i, n) {
					$(".card ul li").each(function(o, p) {
						if(o + 1 == n) {
							$(this).addClass("active");
						}
					});
				});
			} else {
				base.isLogin = false;
			}
		}, "json");
	}
	//获取所有用户中奖信息
	function allPrice() {
		$.get("/activity/ajax-get-gift", {}, function(data) {
			if(data.status == 0) {
				var html = "";
				for(var i = 0; i < data.msg.length; i++) {
					html = html + '<li>' +
						'<span>' + data.msg[i].phone + '</span>获得' +
						'<span>' + data.msg[i].name + '</span>' +
						'</li>'
				}
				$(".price_ul ul").append(html);
			}
		}, "json");
	};
	//点击我要召唤判断
	$(".zh img").click(function() {
		if(base.isLogin == false) {
			$(".login").show();
			return;
		}
		$.get("/activity/ajax-get-call", {}, function(data) {
			if(data.status == 0) {
				$(".wenan span").html(data.gift_name);
				$(".c_erweima").html(data.msg);
				//初始化复制插件
				setTimeout(function() {
					new Clipboard('#tc9_copyBtnz');
				}, 50);
				$(".f_price").show();
			} else if(data.status == 102) {
				$(".c_message").html(data.msg);
				$(".message").show();
			} else if(data.status == 101) {
				$(".c_message").html(data.msg);
				$(".message").show();
			} else if(data.status == 103) {
				$(".c_message").html(data.msg);
				$(".message").show();
			}
		}, "json");
	});
	//点击第一个查看我的奖励弹窗
	$(".zh p").click(function() {
		if(base.isLogin == false) {
			$(".login").show();
			return;
		}
		$.post("/activity/ajax-get-my-gift", {
			"type": 1,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				var msg = data.msg.data;
				var listLength = msg.length;
				if(listLength == 0) {
					alert("您还没有中奖记录哦~");
				} else {
					var str = "";
					for(var i = 0; i < listLength; i++) {
						str = str + '<li>' +
							'<span>' + msg[i].name + '</span>' +
							'<span id="tc7_copyText' + i + '">' + msg[i].code + '</span>' +
							'<i class="s_fuzhi" id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '"></i>'
						'</li>';
					}
					$(".box ul").html(null).append(str);
					$(".my_price .t_address").hide();
					$(".price").show();
					//初始化复制插件
					setTimeout(function() {
						$(".box ul li").each(function(index) {
							new Clipboard('#tc7_copyBtn' + index);
						});
					}, 50);
				}
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	//点击登录弹出登录弹框
	$(".d_btn").click(function() {
		$(".login").show();
	});
	//点击邀请好友判断弹框
	$(".more_p").click(function() {
		if(base.isLogin == false) {
			$(".login").show();
			return;
		} else {
			$(".invite").show();
		}
	});
	//点击刷新图片验证码
	$(".captcha").click(function() {
		tupian();
	});
	//获取验证码
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
		$.post("/site/ajax-activity-login-verify", {
			"phone": phone,
			"captcha": t_yzm,
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
	$(".dl").click(function() {
		var phone = $('.phone').val();
		var yzm = $(".yzm").val();
		var c_type = $(".login").attr("data-type");
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
		$.post("/activity/ajax-activity-login", {
			"phone": phone,
			"yzm": yzm,
			"code": c_type,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0 && data.msg.length == 0) {
				init();
			} else if(data.status == 0 && data.msg.length != 0) {
				init();
				$(".wenan span").html(data.msg.gift_name);
				$(".c_erweima").html(data.msg.gift_code);
				$(".f_price").show();
			} else {
				tupian();
				alert(data.msg);
			}
		}, "json");
	});
	//点击翻牌
	$(".card ul li").on("click", function() {
		var self = $(this);
		var isClick = self.attr("isClick");
		if(base.isLogin == false) {
			$(".login").show();
			return;
		}
		if($(".d_cishu").text() <= 0) {
			$(".c_message").html("您还没有抽奖机会，邀请好友获得参与机会吧~");
			$(".message").show();
			return;
		}
		//判断是否点击
		if(isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		self.addClass("on");
		self.addClass("active");
		var index = parseInt($(".card ul li").index(self)) + 1;
		if($(".card ul li.on").length == 1) {
			$.post("/activity/ajax-activity-draw", {
				"num": index,
				"cms_csrf": srf
			}, function(data) {
				if(data.status == 0) {
					$(".d_cishu").html(data.msg.activity_count);
					self.attr("isclick", "");
				} else {
					alert(data.msg);
				}
			}, "json");
		}
		if($(".card ul li.on").length == 2) {
			var str = "";
			$(".card ul").addClass("active");
			$(".card ul li.on").each(function(i, n) {
				str += $(this).attr("data-number") + ",";
			});
			if(str.length > 0) {
				str = str.substr(0, str.length - 1);
			}
			$.post("/activity/ajax-activity-draw", {
				"num": str,
				"cms_csrf": srf
			}, function(data) {
				if(data.status == 0) {
					$(".card ul").removeClass("active");
					if(data.msg.is_pair == true) {
						$(".card ul li.on").each(function(i, n) {
							$(n).removeClass("on");
							self.attr("isclick", "");
						})
					} else if(data.msg.is_pair == false) {
//						function csh() {
							$(".card ul li.on").each(function(i, n) {
								$(n).removeClass("active");
								$(n).removeClass("on");
								self.attr("isclick", "");
							})
//						};
//						setTimeout(csh, 1500);
					}
					if(data.msg.is_lottery == true) {
						$('.a_btn').addClass("active");
						$(".s_cishu em").html("3");
						base.priceNumber = 0;
					}
					$(".d_cishu").html(data.msg.activity_count);
				} else {
					$(".card ul").removeClass("active");
					alert(data.msg);
					$(".card ul li").each(function(i, n) {
						$(n).removeClass("active");
						$(n).removeClass("on");
						self.attr("isclick", "true");
					})
				}
			}, "json").error(function (){
				$(".card ul").removeClass("active");
			});
		}
	});
	//发送地址
	$(".sure_add").click(function() {
		var name = $(".name").val();
		var postcard = $(".postcode").val();
		var s_phone = $(".s_phone").val();
		var s_address = $(".s_address").val();
		if(name == "" || name == undefined) {
			alert("请输入收件人姓名");
			return;
		}
		if(s_phone == "" || s_phone == undefined) {
			alert("请输入收件人电话");
			return;
		}
		if(s_address == "" || s_address == undefined) {
			alert("请输入收件人地址");
			return;
		}
		$.post("/activity/ajax-address", {
			"name": name,
			"tel": s_phone,
			"address": s_address,
			"code": postcard,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".c_message").html("保存地址成功~");
				$('.dizhi').hide();
				$(".message").show();
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	//跳转填写地址弹框
	$(".t_address").click(function() {
		$(this).parent().parent().hide();
		$(".dizhi").show();
	});
	//点击抽奖
	$(".a_btn").click(function() {
		var self = $(this);
		if(base.isLogin == false) {
			$(".login").show();
			return;
		}
		if(base.isLogin == true && base.priceNumber == 0){
			$(".c_message").html("您的卡牌还没有全部翻开哦~");
			$(".message").show();
			return;
		}
		if($(this).hasClass("active")) {
			$.post("/activity/ajax-activity", {
				"cms_csrf": srf
			}, function(data) {
				if(data.status == 0) {
					if(data.gift_id == 1) {
						$(".pic").attr("src", imgSrc + "bb.png");
						$('.dhm').html(data.msg);
						$(".congra").show();
						$(".s_cishu em").html(data.lottery_num);
					} else if(data.gift_id == 2) {
						$(".pic").attr("src", imgSrc + "aa.png");
						$('.dhm').html(data.msg);
						$(".congra").show();
						$(".s_cishu em").html(data.lottery_num);
					} else if(data.gift_id == 3) {
						$(".pic").attr("src", imgSrc + "cc.png");
						$('.dhm').html(data.msg);
						$(".congra").show();
						$(".s_cishu em").html(data.lottery_num);
					} else if(data.gift_id == 4) {
						$(".pic").attr("src", imgSrc + "dd.png");
						$('.dhm').html(data.msg);
						$(".congra").show();
						$(".s_cishu em").html(data.lottery_num);
					} else if(data.gift_id == 5) {
						$(".pic").attr("src", imgSrc + "c_damond.png");
						$('.dhm').html(data.msg);
						$(".congra").show();
						$(".s_cishu em").html(data.lottery_num);
					} else if(data.gift_id == 6) {
						$(".pic").attr("src", imgSrc + "ff.png");
						$('.dhm').html(data.msg);
						$(".congra").show();
						$(".s_cishu em").html(data.lottery_num);
					} else if(data.gift_id == 7) {
						$(".pic").attr("src", imgSrc + "ee.png");
						//						$('.dhm').html(data.msg);
						$(".congra").show();
						$(".s_cishu em").html(data.lottery_num);
					} 
					if(data.lottery_num == 0){
						$(".c_message").html("您还没有抽奖机会，请稍后再来~");
						$(".a_btn").removeClass("active");
						$(".a_btn").addClass("on");
					}
				} else {
					alert(data.msg);
				}
			}, "json");
		}
		if($(this).hasClass("on")) {
			$.post("/activity/ajax-get-my-gift", {
				"type": 2,
				"cms_csrf": srf
			}, function(data) {
				var msg = data.msg.data;
				var listLength = msg.length;
				if(listLength == 0) {
					alert("您还没有中奖记录哦~");
				} else {
					var str = "";
					for(var i = 0; i < listLength; i++) {
						str = str + '<li>' +
							'<span>' + msg[i].name + '</span>' +
							'<span id="tc7_copyText' + i + '">' + msg[i].code + '</span>' +
							'<i class="s_fuzhi" id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '"></i>'
						'</li>';
					}
					$(".box ul").html(null).append(str);
					$(".my_price .t_address").show();
					$(".price").show();
					//初始化复制插件
					setTimeout(function() {
						$(".box ul li").each(function(index) {
							new Clipboard('#tc7_copyBtn' + index);
						});
					}, 50);
				}
			}, "json");
		}
	});
	//点击分享
	$(".jiathis_style_32x32 > a").on("click", function() {
		var self = $(this);
		var isClick = self.attr("isClick");
		if(isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		$.get("/activity/ajax-share-add", {}, function(data) {
			if(data.status == 0) {
				base.luckyNumber = data.msg;
				$(".d_cishu").html(base.luckyNumber);
			} else {
				alert(data.msg);
			}
			self.attr("isClick", "");
		}, "json");
	});
	$(".box ul li i").click(function (){
		alert("已复制~");
	})
	//初始化复制插件
	new Clipboard('#tc10_copyBtnz');
	$(".fuzhi_lj").click(function() {
		alert("已复制~");
	});
	new Clipboard('#tc11_copyBtnz');
	$("#tc11_copyBtnz").click(function (){
		alert("已复制~");
	});
});