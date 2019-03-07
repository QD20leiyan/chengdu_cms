//中奖名单滚动效果
function autoScroll(obj) {
	var length = $(obj).find("li").length;
	if(length > 5) {
		$(obj).find("ul").animate({
			marginTop: "-80px"
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
	var obj = $(".g_code");
	settime(obj);
};

function sendCode() {
	var obj = $(".i_code");
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
var imgIndex = 1;

function load_captcha() {
	imgMarkIndex++;
	var imgUrl = "/site/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
}

function load_captcha01() {
	imgIndex++;
	var imgUrl = "/site/captcha.html?refresh=" + imgIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha01 img").attr("src", data.url);
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
$(function() {
	var base = {
		isLogin: false,
		sendYy: false,
		sendMark: false,
		sendLogin: false,
		sendLoginOut: false,
		luckyNumber: 0,
		phone: 0,
		id: 0,
	};
	var srf = $("meta[name='csrf-token']").attr("content");
	//转盘抽奖
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
		end: function() {}
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
	};
	//判断用户是否登录
	function isLogin() {
		$.get('/site/ajax-get-user', {}, function(data) {
			if(data.status == 0) {
				base.luckyNumber = data.msg.draw_count; //剩余抽奖次数
				base.phone = data.msg.phone; //手机号
				base.person = data.msg.invite_num; //邀请人数
				base.isLogin = true;
				base.sendYy = data.msg.is_yuyue;
				base.id = data.msg.gift_code_id;
				base.sendMark = data.msg.is_enlist;
				$(".c_phone").html(base.phone);
				$(".person").html(base.person);
				$(".number").html(base.luckyNumber);
				$(".b_denglu").removeClass("active");
				$(".a_denglu").addClass("active");
				$(".click_btn p span").html(base.luckyNumber);
				$(".share_code a").html(data.msg.share_url);
				$(".c_title").removeClass("active");
				$(".tian").html(base.id);
				$(".c_a_title").addClass("active");
				$(".biaoge_i").css("display","none");
				$(".success_code a").html(data.msg.share_url);
				if(!data.msg.name&&!data.msg.address&&!data.msg.tel&&!data.code){
			       
			   	} else {
			   		$(".name").val(data.msg.name);
			        $(".youbian").val(data.msg.code);
			        $(".s_phone").val(data.msg.tel);
			        $(".s_dizhi").val(data.msg.address);
			   	 	$(".dizhi").addClass("active");
			        $(".d_dizhi").addClass("active");
			    }
				$(".biaoge_ul li").each(function(i, n) {
					if((i + 1) <= base.id) {
						$(n).addClass("active");
					} else if(i == base.id) {
						$(n).addClass("on");
						$(n).find(".qiandao_txt").children("span").html("可签到");
					}
				});
				if(data.msg.is_enlist == 1){
					$(".biaoge_ul li.on").removeClass("on");
					$(".biaoge_ul li.active").find(".qiandao_txt").children("span").html("已签到");
//					$(".biaoge_ul li.add").find(".qiandao_txt").children("span").html("可签到");
				} else {
					
				}
			} else {
				base.isLogin = false;
			}
		}, "json");
	}
	//获取所有用户中奖记录
	function getPrice() {
		$.post("/site/ajax-my-code", {
			"type": 3,
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
			} else {

			}
		}, "json");
	};
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	isLogin();
	getPrice();
	//点击邀请好友按钮判断弹窗
	$(".invite").click(function() {
//		if(!base.isLogin) {
//			$(".login").show();
//			return;
//		}
//		$(".share").show();
		$(".c_tip p").html("活动已结束,<br/>敬请期待更多福利活动");
		$(".tc_tip").show();
	});
	//点击查看当前用户转盘中奖记录
	$(".check").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			return;
		}
		$.post("/site/ajax-my-code", {
			"type": 2,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				var msg = data.msg;
				var listLen = msg.length;
				if(listLen == 0) {
					$(".c_tip p").html("您还没有中奖记录哦~");
					$(".tc_tip").show();
				} else {
					var html = "";
					for(var i = 0; i < listLen; i++) {
						html += '<li>' +
							'<span>' + msg[i].name + '</span>' +
							'<span id="tc7_copyText' + i + '">' + msg[i].code + '</span>' +
							'<span><i id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '">复制</i></span>' +
							'</li>'
					}
					$(".huadong ul").html(null).append(html);
					//初始化复制插件
					$(".huadong ul li span i").each(function(index) {
						new Clipboard('#tc7_copyBtn' + index);
					});
					$(".tc_price").show();
				}
			} else {
				$(".c_tip p").html(data.msg);
				$(".tc_tip").show();
			}
		}, "json");
//		$(".c_tip p").html("活动已结束,<br/>敬请期待更多福利活动");
//		$(".tc_tip").show();
	});
	//点击查看签到奖励
	$(".s_check").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			return;
		}
		$.post("/site/ajax-my-code", {
			"type": 1,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				var msg = data.msg;
				var listLen = msg.length;
				if(listLen == 0) {
					$(".c_tip p").html("您还没有中奖记录哦~");
					$(".tc_tip").show();
				} else {
					var html = "";
					for(var i = 0; i < listLen; i++) {
						html += '<li>' +
							'<span>' + msg[i].name + '</span>' +
							'<span id="tc9_copyText' + i + '">' + msg[i].code + '</span>' +
							'<span><i id="tc9_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc9_copyText' + i + '">复制</i></span>' +
							'</li>'
					}
					$(".huadong01 ul").html(null).append(html);
					//初始化复制插件
					$(".huadong01 ul li span i").each(function(index) {
						new Clipboard('#tc9_copyBtn' + index);
					});
					$(".tc_price01").show();
				}
			} else {
				$(".c_tip p").html(data.msg);
				$(".tc_tip").show();
			}
		}, "json");
	});
	//点击提示已复制
	$(".huadong ul").on("click", "i", function() {
		alert("已复制~");
	});
	//点击注销清除数据
	$(".zhuxiao").click(function() {
		$.get("/site/ajax-login-out.html", {}, function(data) {
			if(data.status == 0) {
				location.reload();
			} else {
				$(".c_tip p").html(data.msg);
				$(".tc_tip").show();
			}
		}, "json");
	});
	//点击预约按钮弹窗提示框
//	$(".btn").click(function() {
////		if(!base.isLogin) {
////			$(".yuyue").show();
////			return;
////		}
////		$.get("/site/ajax-yuyue", {
////
////		}, function(data) {
////			if(data.status == 0) {
//////				$(".success_code a").html(data.msg.share_url);
////				$(".lbm span").html(data.msg.code);
////				$(".success").show();
////			} else {
////				$(".c_tip p").html(data.msg);
////				$(".tc_tip").show();
////			}
////		}, "json");
//		$(".c_tip p").html("活动已结束,<br/>敬请期待更多福利活动");
//		$(".tc_tip").show();
//	});
	//点击弹出登录弹框
	$(".b_denglu span").click(function() {
		$(".login").show();
	});
	//点击发送验证码
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
		$.post("/site/ajax-login-verify", {
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
	//预约弹窗点击发送验证码
	$(".i_code").click(function() {
		var y_phone = $(".y_phone").val();
		var y_t_yzm = $(".y_t_yzm").val();
		if(y_phone == "" || y_phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(y_phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(y_t_yzm == "" || y_t_yzm == undefined) {
			alert("图片验证码不能为空");
			return;
		}
		$.post("/site/ajax-login-verify", {
			"phone": y_phone,
			"captcha": y_t_yzm,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				sendCode();
			} else {
				load_captcha01();
				alert(data.msg);
			}
		}, "json");
	});
	//预约弹窗点击登录
	$(".btn_yuyue").click(function() {
		var y_phone = $(".y_phone").val();
		var y_yzm = $(".y_yzm").val();
		if(y_phone == "" || y_phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(y_phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(y_yzm == "" || y_yzm == undefined) {
			alert("验证码不正确");
			return;
		}
		$.post("/site/ajax-login", {
			"phone": y_phone,
			"yzm": y_yzm,
			"invite_code":getUrlParam("invite_code"),
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				isLogin();
				$(".yuyue").hide();
				if(data.msg.is_yuyue == 0) {
					$(".success_code a").html(data.msg.share_url);
					$(".lbm span").html(data.msg.code);
					$(".success").show();
				} else {
					//					$(".success").hide();
				}
			} else {
				load_captcha();
				alert(data.msg);
				//				$(".c_tip p").html(data.msg);
				//				$(".tc_tip").show();
			}
		}, "json");
	})
	//用户点击登录
	$(".btn_login").click(function() {
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
		$.post("/site/ajax-login", {
			"phone": phone,
			"yzm": yzm,
			"invite_code":getUrlParam("invite_code"),
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				isLogin();
				$(".login").hide();
				if(data.msg.is_yuyue == 0) {
					$(".success_code a").html(data.msg.share_url);
					$(".lbm span").html(data.msg.code);
					$(".success").show();
				} else {
					//					$(".success").hide();
				}
			} else {
				load_captcha();
				alert(data.msg);
				//				$(".c_tip p").html(data.msg);
				//				$(".tc_tip").show();
			}
		}, "json");
	});
	//点击刷新图片验证码
	$(".captcha01").click(function() {
		load_captcha01();
	});
	$(".captcha").click(function() {
		load_captcha();
	});
	//转盘抽奖
	var prizes = {
		2: {
			i: 3,
			prize: '5分钟加速*5'
		},
		6: {
			i: 1,
			prize: '1W粮食*1'
		},
		7: {
			i: 0,
			prize: '6000铁*3'
		},
		1111: {
			i: 5,
			prize: 'iPad'
		},
		8: {
			i: 2,
			prize: '1W木材*1'
		},
		5: {
			i: 7,
			prize: '150银*1'
		},
		1111: {
			i: 6,
			prize: 'Switch'
		},
		1111: {
			i: 4,
			prize: 'JD卡'
		},
	};
	var click = false;
	lottery.init('lottery');
	$(".click_btn").click(function() {
//		var self = $(this);
//		if(!base.isLogin) {
//			$(".login").show();
//			return;
//		}
//		if(click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
//			return;
//		}
//		if($(".click_btn p span").text() > 0) {
//			lottery.speed = 150;
//			roll();
//			click = true;
//			setTimeout(function() {
//				$.ajax({
//					'type': "GET",
//					'url': "/site/ajax-draw",
//					'data': {},
//					'dataType': 'Json',
//					success: function(data) {
//						if(data.status == 0) {
//							$(".click_btn p span").text(data.draw_count);
//							$(".number").text(data.draw_count);
//							var id = data.gift_id;
//							lottery.stop(prizes[id].i);
//							//中奖弹框显示
//							var code = data.msg;
//                          lottery.stop(prizes[id].i);
//                         	if(id == 2){
//                         		$(".jiangpin p").text("5分钟加速*5");
//                         		$(".jiangpin img").attr("src", alt + "images/jiasu.png");
//                         	} else if (id == 5){
//                         		$(".jiangpin p").text("150银*1");
//                         		$(".jiangpin img").attr("src", alt + "images/yin.png");
//                         	} else if(id == 6){
//                         		$(".jiangpin p").text("1w粮食*1");
//                         		$(".jiangpin img").attr("src", alt + "images/ls.png");
//                         	} else if(id == 7){
//                         		$(".jiangpin p").text("6000铁*3");
//                         		$(".jiangpin img").attr("src", alt + "images/tie.png");
//                         	} else if(id == 8){
//                         		$(".jiangpin p").text("1w木材*1");
//                         		$(".jiangpin img").attr("src", alt + "images/mc.png");
//                         	}
//                         	lottery.end = function (){
//								$(".duihuanma i").html(code);
//								$(".congra").show();
//							}
//						}  else {
//							lottery.stop(prizes[7].i);
//							$(".c_tip p").html(data.msg);
//							$(".tc_tip").show();
//						}
//					}
//				});
//			})
//		} else {
//			$(".c_tip p").html("您还没有抽奖机会，邀请更多好友参与吧！");
//			$(".tc_tip").show();
//		}
		$(".c_tip p").html("活动已结束,<br/>敬请期待更多福利活动");
		$(".tc_tip").show();
	});
	//点击签到
	$(".biaoge_ul").on("click", "li.on", function() {
		var src = $(this).find(".gift_li").children("img").attr("src");
		var txt = $(this).find(".gift_li").children("p").text();
		$.get("/site/ajax-enlist", {}, function(data) {
			if(data.status == 0) {
				$(".q_jiangpin").children("img").attr("src", src);
				$(".q_jiangpin").children("p").text(txt);
				$(".duihuanma i").html(data.msg);
				$(".c_qiandao").show();
				$(this).removeClass("on").addClass("active");
				$(this).find(".qiandao_txt").children("span").html("已签到");
				isLogin();
			} else {
				$(".c_tip p").html(data.msg);
				$(".tc_tip").show();
			}
		}, "json");
	});
	$(".biaoge_ul .biaoge_i").click(function (){
		$(".login").show();
	});
	//点击关闭弹窗
	$(".close").click(function() {
		$(this).parent().parent().hide();
	});
	//中奖名单与规则切换
	$(".rule_ul li").click(function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".tab_rule>div").eq(index).addClass("active").siblings().removeClass("active");
	});
	//顶部微信hover
	$(".r_wx a:nth-child(1)").hover(function() {
		$(".fl_wx").stop().fadeIn();
	}, function() {
		$(".fl_wx").stop().fadeOut();
	});
	//点击确定关闭弹窗
	$(".c_sure").click(function() {
		$(this).parent().parent().hide();
	});
	//点击弹出地址弹窗
	$(".dizhi").click(function (){
		$(".tc_price").hide();
		$(".t_dizhi").show();
	});
	//签到部分点击登录
	$(".c_title .c_dl").click(function (){
		if(!base.isLogin) {
			$(".login").show();
			return;
		}
		
	});
	$(".d_dizhi").click(function (){
		$(this).parent().parent().parent().hide();
		$(".t_dizhi").show();
	});
	//地址信息验证
	$(".s_sure").click(function (){
		var name = $(".name").val();
		var youbian = $(".youbian").val();
		var c_phone = $(".s_phone").val();
		var address = $(".s_dizhi").val();
		if(name == "" || name == undefined){
			alert("请输入收件人姓名");
			return;
		}
		if(youbian == "" || youbian == undefined){
			alert("请输入邮编号码");
			return;
		}
		if(c_phone == "" || c_phone == undefined){
			alert("请输入收件人手机号码");
			return;
		}
		if(c_phone.length != 11){
			alert("手机号码不正确");
			return;
		}
		if(address == "" || address == undefined){
			alert("请输入收件人地址");
			return;
		}
		$.post("/site/ajax-address" , {
			"name" : name,
			'tel' : c_phone,
			'code' : youbian,
			'address' : address,
			"cms_csrf":srf
		} , function (data){
			if(data.status == 0){
				$(".t_dizhi").hide();
				$(".c_tip p").html(data.msg);
				$(".tc_tip").show();
			} else {
				alert(data.msg);
			}
		},"json");
	});
	$(".lingqu").click(function (){
		$(".success").hide();
	});
	$(".j_sure").click(function (){
		$(this).parent().parent().parent().hide();
	});
	//初始化复制分享链接
	new Clipboard('#tc11_copyBtnz');
	new Clipboard('#tc12_copyBtnz');
	new Clipboard('#tc13_copyBtnz');
	new Clipboard('#tc14_copyBtnz');
	$(".s_fuzhi").click(function (){
		alert("已复制~");
	});
	$(".lbm i").click(function (){
		alert("已复制~");
	});
	$(".g_fuzhi").click(function (){
		alert("已复制~");
	})
	$(".success_code i").click(function (){
		alert("已复制~");
	});
});