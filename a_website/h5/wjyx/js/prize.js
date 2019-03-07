var srf = $("meta[name='csrf-token']").attr("content");
var isLogin = false;
$(function() {
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
	//点击登录按钮
	$(".login-btn").click(function() {
		$(".login-mask").show();
	});
	//转盘抽奖
	var prizes = {
		16: {
			i: 1,
			prize: '游戏金币*1888'
		},
		17: {
			i: 6,
			prize: '游戏钻石*188'
		},
		18: {
			i: 5,
			prize: '雷震子*7'
		},
		19: {
			i: 4,
			prize: '游戏金币*3888'
		},
		20: {
			i: 0,
			prize: '磁力魔王*3'
		},
		21: {
			i: 2,
			prize: '运筹帷幄*3'
		},
		22: {
			i: 3,
			prize: '游戏钻石*388'
		},
	};
	//点击登录
	$(".login-mask-btn").on("click", function() {
		var type = $(".platform>div.active").attr("data-type");
		var roleId = $(".roleId").val();
		if(roleId == "" || roleId == undefined) {
			alert("请输入角色ID");
			return;
		}
		$.post("/wjyx/lottery/login.html" + h5_jk_url, {
			"type": type,
			"serverId": 1,
			roleId: roleId,
			"cms_csrf": srf
		}, function(data) {
			if(data.code == 0) {
				alert("登陆成功");
				$(".login-btn").removeClass("active");
				$(".w_name").text(data.data.nickname);
				$(".login-alr").addClass("active");
				$(".login-mask").hide();
				if(data.data.giftIds) {
					for(var i = 0; i < data.data.giftIds.length; i++) {
						$(".lottery-unit-" + prizes[data.data.giftIds[i]].i).addClass("on");
					}
				}
				if(data.data.isTodayGet == false) {
					$(".prize-btn").addClass("active");
				} else {
					$(".prize-btn").removeClass("active");
				}
				isLogin = true;
				console.log(isLogin);
			} else {
				alert(data.msg);
				isLogin = false;
			}
		}, "json");
	});
	//点击关闭弹窗
	$(".close").click(function() {
		$(this).parent().parent().hide();
		var type = $(".platform>div.active").attr("data-type");
		var roleId = $(".roleId").val();
		$.post("/wjyx/lottery/login.html" + h5_jk_url, {
			"type": type,
			"serverId": 1,
			roleId: roleId,
			"cms_csrf": srf
		}, function(data) {
			if(data.code == 0) {
				$(".login-btn").removeClass("active");
				$(".w_name").text(data.data.nickname);
				$(".login-alr").addClass("active");
				$(".login-mask").hide();
				if(data.data.giftIds) {
					for(var i = 0; i < data.data.giftIds.length; i++) {
						$(".lottery-unit-" + prizes[data.data.giftIds[i]].i).addClass("on");
					}
				}
				if(data.data.isTodayGet == false) {
					$(".prize-btn").addClass("active");
				} else {
					$(".prize-btn").removeClass("active");
				}
				isLogin = true;
				console.log(data.data.isTodayGet);
			} else {
				alert(data.msg);
				isLogin = false;
			}
		}, "json");
	});
	var click = false;
	window.onload = function() {
		lottery.init('prize-box');
		//点击抽奖
		$(".prize-btn").click(function() {
			var self = $(this);
			if(isLogin == false) {
				$(".login-mask").show();
				return false;
			}
			if(self.hasClass("active")) {
				if(click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
					return false;
				}
				$.ajax({
					'type': "POST",
					'url': "/wjyx/lottery/lottery.html" + h5_jk_url,
					'data': {},
					'dataType': 'Json',
					success: function(data) {
						if(data.code == 0) {
							lottery.speed = 100;
							roll();
							click = true;
							var id = data.data.giftId;
							if(id == 16) {
								$(".name").text("游戏金币*1888");
								$(".price_img").attr("src", alt + "images/prize2.png");
							} else if(id == 17) {
								$(".name").text("游戏钻石*188");
								$(".price_img").attr("src", alt + "images/prize7.png");
							} else if(id == 18) {
								$(".name").text("雷震子*7");
								$(".price_img").attr("src", alt + "images/prize6.png");
							} else if(id == 19) {
								$(".name").text("游戏金币*3888");
								$(".price_img").attr("src", alt + "images/prize5.png");
							} else if(id == 20) {
								$(".name").text("磁力魔王*3");
								$(".price_img").attr("src", alt + "images/prize1.png");
								$(".price_img").css({
									"width": "3.28125rem",
									"height": "2.75rem"
								});
							} else if(id == 21) {
								$(".name").text("运筹帷幄*3");
								$(".price_img").attr("src", alt + "images/prize3.png");
							} else if(id == 22) {
								$(".name").text("游戏钻石*388");
								$(".price_img").attr("src", alt + "images/prize4.png");
							}
							setTimeout(function (){
								lottery.stop(prizes[id].i);
								$(".lottery-unit-" + (prizes[id].i)).addClass("on");
								$(".receive-gift-mask").show();
							},2000);
						} else {
							alert(data.msg);
							click = false;
						}
					}
				})
			} else {
				alert("您今天已经抽过奖了哦");
				return false;
			}
		});
	}
	//点击注销
	$(".login-quit").click(function() {
		$.post("/wjyx/lottery/logout.html" + h5_jk_url, {}, function(data) {
			if(data.code == 0) {
				isLogin = false;
				$(".login-btn").addClass("active");
				$(".login-alr").removeClass("active");
				$(".w_name").text("");
			} else {
				alert(data.msg);
			}
		}, "json");
	})
	//设备类型选择
	$('.platform>div').click(function() {
		$(this).addClass("active").siblings().removeClass("active");
	})
	//点击确定关闭中奖弹窗
	$(".receive-btn").click(function() {
		var type = $(".platform>div.active").attr("data-type");
		var roleId = $(".roleId").val();
		$(".receive-gift-mask").hide();
		$.post("/wjyx/lottery/login.html" + h5_jk_url, {
			"type": type,
			"serverId": 1,
			roleId: roleId,
			"cms_csrf": srf
		}, function(data) {
			if(data.code == 0) {
				$(".login-btn").removeClass("active");
				$(".w_name").text(data.data.nickname);
				$(".login-alr").addClass("active");
				$(".login-mask").hide();
				if(data.data.giftIds) {
					for(var i = 0; i < data.data.giftIds.length; i++) {
						$(".lottery-unit-" + prizes[data.data.giftIds[i]].i).addClass("on");
					}
				}
				if(data.data.isTodayGet == false) {
					$(".prize-btn").addClass("active");
				} else {
					$(".prize-btn").removeClass("active");
				}
				isLogin = true;
				console.log(data.data.isTodayGet);
			} else {
				alert(data.msg);
				isLogin = false;
			}
		}, "json");
	});
});