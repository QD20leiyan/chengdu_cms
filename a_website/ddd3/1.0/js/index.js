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
var countdown = 60;
//60s倒计时验证
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
var imgMarkIndex=1;
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
				base.luckyNumber = data.msg.invite_count;
				base.isLogin = true;
				base.sendYy = data.msg.is_yuyue;
				$(".x_phone").html(data.msg.phone);
				$(".invite i").html(data.msg.invite_num);
				$(".out i").html(base.luckyNumber);
				$(".b_denglu").removeClass("active");
				$(".a_denglu").addClass("active");
				$(".click_btn p span").html(base.luckyNumber);
				$(".yqm span").html(data.msg.me_invite_code);
				$(".share_p a").html(data.msg.share_url);
				$(".share_p a").attr("href", data.msg.share_url);
			} else {
				base.isLogin = false;
			}
		}, "json");
	}
	//获取所有用户中奖记录
	function getPrice() {
		$.get("/site/ajax-code", {}, function(data) {
			if(data.status == 0) {
				var msg = data.data;
				var listLength = msg.length;
				var html = "";
				for(var i = 0; i < listLength; i++) {
					html += '<li>恭喜' +
						'<span>' + msg[i].phone + '</span>获得' +
						'<i>' + msg[i].name + '</i>' +
						'</li>'
				}
				$(".price_con ul").html(null).append(html);
			} else {
				alert(data.msg);
			}
		}, "json");
	}
	load_captcha();
	isLogin();
	getPrice();
	//点击邀请按钮弹出邀请弹窗
	$(".yaoqing").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			return;
		}
		$(".share").show();
	});
	//点击查看当前用户中奖记录
	$(".btn1").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			return;
		}
		$.get("/site/ajax-my-code", {}, function(data) {
			if(data.status == 0) {
				var msg = data.msg;
				var listLen = msg.length;
				if(listLen == 0) {
					$(".c_message p").html("您还没有中奖记录哦~");
					$(".message").show();
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
					$(".price").show();
				}
			}
		}, "json");
	});
	//点击提示已复制
	$(".huadong ul").on("click","i", function (){
		alert("已复制");
	})
	//点击注销清除数据
	$(".logout").click(function (){
		$.get("/site/ajax-login-out",{},function(data){
			if(data.status == 0){
				location.reload();
			} else {
				$(".c_message p").html(data.msg);
				$(".message").show();
			}
		},"json");
	}); 
	//点击预约按钮弹出提示框
	$(".btn").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			return;
		}
		if(base.sendYy == 0){
			$(".yuyue").show();
		} else {
			$(".c_message p").html("您已经预约过了，请勿重复预约哦~");
			$(".message").show();
		}
	});
	//点击登录弹窗登录框
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
				load_captcha();
				alert(data.msg);
			}
		}, "json");
	});
	//用户点击登录
	$(".denglu").click(function() {
		fgw_yy_pc();
		var phone = $('.phone').val();
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
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				fgw_yy_pc_success();
				isLogin();
				$(".login").hide();
				if(data.msg.is_yuyue == 0){
					$(".yuyue").show();
				} else {
					$(".yuyue").hide();
				}
			} else {
				load_captcha();
				alert(data.msg);
			}
		}, "json");
	});
	//点击预约
	$(".y_btn").click(function (){
		var phone = $(".phone").val();
		var type = $(".c_yuyue ul li.active").attr("data-type");
		var email = $(".email").val();
		var y_code = getQueryString('invite_code');
		if($(".c_yuyue ul li:nth-child(1)").hasClass("active")){
			if(email == "" || email == undefined){
				alert("邮箱不能为空哦");
				return;
			}
		}
		$.post("/site/ajax-yuyue",{
			"phone": phone,
			"type": type,
			"email": email,
			"invite_code":y_code,
			"cms_csrf": srf
		},function (data){
			if(data.status == 0){
				$(".yuyue").hide();
				$(".c_message p").html("恭喜您预约成功~");
				$(".message").show();
			} else {
				$(".yuyue").hide();
				$(".c_message p").html(data.msg);
				$(".message").show();
			}
		},"json");
	});
	//注销登录
	$(".logout").click(function (){
		$.get("/site/ajax-login-out.html", {}, function(data) {
			if(data.status == 0) {
				location.reload();
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	var prizes = {
		104: {i: 3,prize: '三级宝石'},
		105: {i: 1,prize: '钻石'},
		106: {i: 0,prize: '宝物魔盒'},
		107: {i: 5,prize: '低级技能芯片'},
		108: {i: 2,prize: '京东卡5元'},
		109: {i: 7,prize: '京东卡20元'},
		110: {i: 4,prize: '低级强化石'},
	};
	var click = false;
	lottery.init('left_lottery');
	//点击抽奖
	$(".click_btn").click(function (){
		var self = $(this);
		if(!base.isLogin){
			$(".login").show();
			return;
		}
		if(click){ //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
			return;
		}
		if($(".click_btn p span").text() > 0){
			lottery.speed = 150;
			roll();
			click = true;
			setTimeout(function (){
				$.ajax({
					'url':"/site/ajax-draw",
					'data':{},
					'type':'GET',
					'dataType':'Json',
					success:function (data){
						if(data.status == 0){
							$(".click_btn p span").text(data.invite_count);
							$(".out i").text(data.invite_count);
							var id = data.gift_id;
							lottery.stop(prizes[id].i);
							//中奖弹框显示
							var code = data.msg;
							if(id == 104){
								$(".c_first_p span").text("三级宝石");
								$(".x_gift").attr("src",alt + "images/gift5.png");
							} else if(id == 105){
								$(".c_first_p span").text("钻石");
								$(".x_gift").attr("src",alt + "images/gift2.png");
							} else if(id == 106){
								$(".c_first_p span").text("宝物魔盒");
								$(".x_gift").attr("src",alt + "images/gift1.png");
							} else if(id == 107){
								$(".c_first_p span").text("低级技能芯片");
								$(".x_gift").attr("src",alt + "images/gift7.png");
							} else if(id == 108){
								$(".c_first_p span").text("京东卡5元");
								$(".x_gift").attr("src",alt + "images/gift3.png");
							} else if(id == 109){
								$(".c_first_p span").text("京东卡20元");
								$(".x_gift").attr("src",alt + "images/gift4.png");
							}else if(id == 110){
								$(".c_first_p span").text("低级强化石");
								$(".x_gift").attr("src",alt + "images/gift8.png");
							}
							lottery.end = function (){
									$(".c_last_p span").html(code);
									$(".congra").show();
							}
						} else {
							lottery.stop(prizes[110].i);
							$(".c_message p").text(data.msg);
							$(".message").show();
						}
					}
				});
			},3000);
		} else {
			$(".c_message p").html("您还没有抽奖机会，邀请更多好友参与吧！");
			$(".message").show();
		}
	});
	//中奖名单规则切换
	$(".right_ul li").click(function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".tab_rule>div").eq(index).addClass("active").siblings().removeClass("active");
	});
	//新闻类别切换
	$(".news_ul li").click(function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".news_list ul").eq(index).addClass("active").siblings().removeClass("active");
	});
	//定时器启动中奖列表
	var scroll = setInterval('autoScroll(".price_con")', 1500);
	//输入框样式切换
	$(".s_put input").focus(function() {
		$(this).addClass("active");
	});
	$(".s_put input").blur(function() {
		$(this).removeClass("active");
	});
	//关闭弹窗
	$(".close").click(function() {
		$(this).parent().parent().hide();
	});
	//预约类型切换
	$(".c_yuyue ul li").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
		if($(".c_yuyue ul li:nth-child(1)").hasClass("active")) {
			$(".email").css("visibility", "visible");
		} else {
			$(".email").css("visibility", "hidden");
		}
	});
	//点击确定关闭弹窗
	$(".sure").click(function (){
		$(this).parent().parent().hide();
	});
	//点击刷新图片验证码
	$(".captcha").click(function() {
		load_captcha();
	});
	//初始化复制分享链接
	new Clipboard('#tc8_copyBtnz');
	$(".s_fuzhi").click(function (){
		alert("已复制");
	})
})