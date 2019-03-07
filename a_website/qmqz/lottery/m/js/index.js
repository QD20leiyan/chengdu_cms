function autoScroll(obj) {
	var length = $(obj).find("li").length;
	if(length > 3) {
		$(obj).find("ul").animate({
			marginTop: "-1.875rem"
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
	init();
	userPrice();
	//判断用户是否登录
	function init(){
		$.get("/site/ajax-lottery-get-user.html", {}, function (data){
			if(data.status == 0){
				base.luckyNumber = data.lottery_count;
				base.isLogin = true;
				$(".t_login").hide();
				$(".a_denglu i").html(data.phone)
				$(".b_denglu").removeClass("active");
				$(".a_denglu").addClass("active");
				$(".chance span").html(base.luckyNumber);
			} else {
				base.isLogin = false;
			}
		},"json");
	};
	//获取所有用户中奖记录
	function userPrice(){
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
				$(".price_ul ul").append(html);
			}
		}, "json");
	};
	//图片验证码
	function tupian() {
		$.get("/site/captcha.html?refresh=1", {}, function(data) {
			$(".captcha img").attr("src", data.url);
		}, 'json');
	};
	//点击分享弹出弹窗
	$(".share").click(function (){
		var timestamp = Date.parse(new Date());
		var timestart = 1520179200000;
		var timestop = 1520783999000;
		if(timestamp < timestart){
			alert("活动暂未开启，活动时间3月5日0:00至3月11日24:00！");
			return;
		} else if(!base.isLogin){
			$(".t_login").show();
		} else if($(".chance span").text() > 0){
			$(".c_share").show();
		} else if($(".chance span").text() <= 0){
			$(".share_pp").html("糟糕了！");
			$(".share_p").html("您还没有抽奖机会 ，赶快邀请更多好友参与吧！");
			$(".c_share").show();
		}
	});
	//点击分享增加分享次数
	$(".jiathis_style_32x32 a span").on("click", function() {
		var self = $(this);
		var isClick = self.attr("isClick");
		if(isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		$.get("/site/ajax-lottery-share.html", {}, function(data) {
			if(data.status == 0) {
				base.luckyNumber = data.lottery_count;
				$(".chance span").html(base.luckyNumber);
			} else {
				alert(data.msg);
			}
			self.attr("isClick", "");
		}, "json");
	});
	//查看当前用户中奖记录
	$(".c_my").click(function (){
		var timestamp = Date.parse(new Date());
		var timestart = 1520179200000;
		var timestop = 1520783999000;
		if(timestamp < timestart){
			alert("活动暂未开启，活动时间3月5日0:00至3月11日24:00！");
			return;
		} else if(!base.isLogin){
			$(".t_login").show();
			return;
		}
		$.get("/site/ajax-lottery-me-log.html", {}, function (data){
			if(data.status == 0){
				var msg = data.msg;
				var listLen = msg.length;
				if(listLen == 0){
					alert("您还没有中奖记录哦~");
				} else {
					var html = "";
					for(var i = 0; i < listLen; i++){
						html = html + '<li>' +
							'<span>' + msg[i].name + '</span>' +
							'<span id="tc7_copyText' + i + '">' + msg[i].code + '</span>' +
							'<i id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '"></i>'+
							'</li>'
					}
					$(".box ul").html(null).append(html);
					$(".jilu").show();
					//初始化复制插件
					setTimeout(function (){
						$(".box ul li i").each(function (index){
							new Clipboard('#tc7_copyBtn' + index);
						});
					},50);
				}			
			} else {
				alert(data.msg);
			}
		},"json");
	});
	$(".box ul li i").click(function() {
		alert("已复制");
	});
	//图片验证码
	$(".captcha").click(function (){
		tupian();
	});
	//用户点击获取验证码
	$(".g_code").click(function (){
		var phone = $(".phone").val();
		var imgCode = $(".t_yzm").val();
		if(phone == "" || phone == undefined){
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11){
			alert("手机号不正确");
			return;
		}
		if(imgCode == "" || imgCode == undefined){
			alert("图片验证码不能为空");
			return;
		}
		$.post("/site/ajax-lottery-login-verify.html",{
			"phone":phone,
			"captcha":imgCode,
			"cms_csrf": srf
		},function(data){
			if(data.status == 0){
				sendemail();
			} else {
				tupian();
				alert(data.msg);
			}
		},"json");
	});
	//用户点击登录
	$(".sure").click(function (){
		var phone = $('.phone').val();
		var yzm = $(".yzm").val();
		if(phone == "" || phone == undefined){
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11){
			alert("手机号不正确");
			return;
		}
		if(yzm == "" || yzm == undefined){
			alert("验证码不正确");
			return;
		}
		$.post("/site/ajax-lottery-login.html",{
			"phone": phone,
			"yzm": yzm,
			"cms_csrf": srf
		},function(data){
			if(data.status == 0){
				init();
				$(".t_login").hide();
				$(".phone").val("");
				$(".t_yzm").val("");
				$(".yzm").val("");
				tupian();
			} else {
				tupian();
				alert(data.msg);
			}
		},"json");
	});
	var prizes = {
		1: {
			i: 6,
			prize: '开学乐享礼包'
		},
		2: {
			i: 3,
			prize: '小恐龙限时礼包'
		},
		3: {
			i: 4,
			prize: '黑骑士碎片礼包'
		},
		4: {
			i: 1,
			prize: '开学钻石大礼包'
		},
		5: {
			i: 7,
			prize: '温莎代金券'
		},
		6: {
			i: 5,
			prize: '谢谢参与'
		},
		7: {
			i: 0,
			prize: '邪恶骑士碎片礼包'
		},
		8: {
			i: 2,
			prize: '永久混沌恶魔'
		},
	};
	var click = false;
	lottery.init('lottery');
	//点击抽奖
	$(".last_li").click(function (){
		var self = $(this);
		var timestamp = Date.parse(new Date());
		var timestart = 1520179200000;
		var timestop = 1520783999000;
		if(timestamp < timestart){
			alert("活动暂未开启，活动时间3月5日0:00至3月11日24:00！");
			return;
		}
		if(!base.isLogin){
			$(".t_login").show();
			return;
		}
		if(click){ //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
			return;
		}
		if($(".chance span").text() > 0){
			lottery.speed = 150;
			roll();
			click = true;
			var lightInterval=setInterval(function(){
                if(click){
                    $(".gif").toggleClass("light");
                }else{
                    clearInterval(lightInterval);
                }
           },100);
			setTimeout(function (){
				$.ajax({
					'url':"/site/ajax-lottery.html",
					'data':{},
					'type':'GET',
					'dataType':'Json',
					success: function (data){
						if(data.status == 0){
							$(".chance span").text(data.count);
							var id = data.id;
							lottery.stop(prizes[id].i);
							//中奖弹框显示
							var code = data.code;
							if(id == 1){
								$(".g_name").text("开学乐享礼包");
								$(".dragon").attr("src",alt+"lottery/m/images/icon6.png");
							} else if(id == 2){
								$(".g_name").text("小恐龙限时礼包");
								$(".dragon").attr("src",alt+"lottery/m/images/icon5.png");
							} else if(id == 3){
								$(".g_name").text("黑骑士碎片礼包");
								$(".dragon").attr("src",alt+"lottery/m/images/icon8.png");
							} else if(id == 4){
								$(".g_name").text("开学钻石大礼包");
								$(".dragon").attr("src",alt+"lottery/m/images/icon2.png");
							} else if(id == 5){
								$(".g_name").text("温莎代金券");
								$(".dragon").attr("src",alt+"lottery/m/images/icon4.png");
							} else if(id == 7){
								$(".g_name").text("邪恶骑士碎片礼包");
								$(".dragon").attr("src",alt+"lottery/m/images/icon1.png");
							} else if(id == 8){
								$(".g_name").text("永久混沌恶魔");
								$(".dragon").attr("src",alt+"lottery/m/images/icon3.png");
							}
							lottery.end = function (){
								if(id !== 6){
									$(".dhm").html(code);
									$(".tc_price").show();
								} else if (id == 6){
									$(".thank").show();
								}
							}
						} else {
							lottery.stop(prizes[6].i);
							$(".xxcy p").text(data.msg);
							$(".thank").show();
						}
					}
				});
			},3000);
		} else {
			$(".share_pp").html("糟糕了！");
			$(".share_p").html("您还没有抽奖机会 ，赶快邀请更多好友参与吧！");
			$(".c_share").show();
			$(this).removeClass("active");
		}
	});
	//注销登录
	$(".a_denglu span").click(function (){
		$.get("/site/ajax-login-out.html", {}, function(data) {
			if(data.status == 0) {
				location.reload();
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	//点击弹出登录弹框
	$(".b_denglu span").click(function (){
		var timestamp = Date.parse(new Date());
		var timestart = 1520179200000;
		var timestop = 1520783999000;
		if(timestamp < timestart){
			alert("活动暂未开启，活动时间3月5日0:00至3月11日24:00！");
		} else {
			$(".t_login").show()
		};
	});
	//点击查看福利详情
	$(".c_fl").click(function (){
		$(".tc_fl").show();
	});
	
	var scroll = setInterval('autoScroll(".price_ul")', 2000);
	//点击关闭弹窗
	$(".c_close").click(function() {
		$(this).parent().parent().hide();
	});
	//点击复制文案
	new Clipboard('#tc7_copyBtnz');
	$("#tc7_copyBtnz").click(function() {
		alert("已复制");
	});
});