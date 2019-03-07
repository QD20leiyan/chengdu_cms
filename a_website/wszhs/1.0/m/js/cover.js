var yy_url1='/commonMethod/ajax-yuyue.html';//预约
var yy_url2='/commonMethod/ajax-yuyue-verify.html';//预约验证码
//60s倒计时验证
var countdown = 60;

function sendemail() {
	var obj = $(".i_code");
	settime(obj);
};
function page_djs(obj) {
  if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("剩余(" + countdown + ")");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000);
}
function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("剩余(" + countdown + ")");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
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
var imgMarkIndex2=0;
function load_captcha2(){
  imgMarkIndex2++;
  var imgUrl2 = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
  $.get(imgUrl2, {}, function(data) {
    $(".captcha2 img").attr("src",data.url);
  }, 'json');
}
$(".captcha2").click(function(){
  load_captcha2();
});
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

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
	var base = {
		isLogin: false,
		sendYy: false,
		sendMark: false,
		sendLogin: false,
		sendLoginOut: false,
		luckyNumber: 0,
		phone: 0,
		today_num: 0,
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
	//判断用户登录状态
	function isLogin() {
		$.get("/site/ajax-get-user", {}, function(data) {
			if(data.status == 0) {
				base.luckyNumber = data.msg.draw_num; //剩余抽奖次数
				base.phone = data.msg.phone; //手机号
				base.person = data.msg.invite_num; //邀请好友人数
				base.share_url = data.msg.share_url; //分享链接
				base.isLogin = true;
				base.today_num = data.msg.today_draw_count;
				$(".t_phone").html(base.phone);
				$(".p_invite").html(base.person);
				$(".t_number").html(base.luckyNumber);
				$(".before_denglu").removeClass("active");
				$(".after_denglu").addClass("active");
				$(".click_btn p i").html(base.luckyNumber);
				$(".yqm span").html(base.share_url);
				if(!data.msg.name && !data.msg.address && !data.msg.tel && !data.code) {
					$(".co_tips_addbtn").removeClass("hidden");
					$(".co_tips_newbtn").addClass("hidden");
				} else {
					$(".name").val(data.msg.name);
					$(".youbian").val(data.msg.code);
					$(".d_phone").val(data.msg.tel);
					$(".address").val(data.msg.address);
					$(".t_dizhi").addClass("active");
				}
			} else {
				base.isLogin = false;
			}
		}, "json");
	}
	isLogin();
	load_captcha2();
	 //点击筛选类型
    $(".type_ul li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
	//预约获取验证码
  $(".g_code").click(function (){
    var type = $(".type_ul li.active").attr("data-type");
    var phone = $(".phone").val();
    var img_code = $(".t_yzm").val();
    if(phone == "" || phone == undefined){
      alert("手机号不能为空");
      return;
    }
    if(phone.length != 11 ){
      alert("手机号不正确");
      return;
    }
    if(img_code == "" || img_code == undefined){
      alert("请输入图形验证码");
      return;
    }
    $.post(yy_url2,{
      "phone": phone,
      'type': type,
      "captcha": img_code,
      "cms_csrf": srf
    },function (data){
      if(data.status == 0){
        $(".g_code").css("pointer-events","none");
        page_djs($(".g_code"),function(){
        $(".g_code").css("pointer-events","auto");
        });
        console.log(1);
      } else {
        alert(data.msg);
        load_captcha2();
      }
    },"json");
  });
  //预约请求
  $(".l_yuyue").click(function (){
  	fgw_yy_wap();
    var type = $(".type_ul li.active").attr("data-type");
    var phone = $(".phone").val();
    var yzm = $(".yzm").val();
    if(phone == "" || phone == undefined){
      alert("手机号不能为空");
      return;
    }
    if(phone.length != 11 ){
      alert("手机号不正确");
      return;
    }
    if(yzm == "" || yzm == undefined){
      alert("请输入验证码");
      return;
    }
    $.post(yy_url1,{
      'phone': phone,
      'type': type,
      'yzm': yzm,
      "cms_csrf": srf
    },function (data){
      if(data.status == 0){
      	fgw_yy_wap_success();
        alert(data.msg);
        $(".yuyue").hide();
        $(".co_username2").val("");
        $(".co_codenum2").val("");
      } else {
        alert(data.msg);
      }
    },"json")
  });
  $(".down_btn").click(function(){
  $(".yuyue").show();
})
	//点击邀请好友按钮判断弹窗
	$(".invite").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		$(".share").show();
	});
	//查看我的奖励
	$(".check_gift").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
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
					$(".tip .invite_body p").html("您还没有中奖记录哦~");
					$(".tip").show();
				} else {
					var html = "";
					for(var i = 0; i < listLen; i++) {
						html += '<li>' + msg[i].name + '</li>';
					}
					$(".huadong ul").html(null).append(html);
					$(".my_price").show();
				}
			} else {
				$(".tip .invite_body p").html(data.msg);
				$(".tip").show();
			}
		}, "json");
	});
	//点击注销清除数据
	$(".zhuxiao").click(function() {
		$.get("/site/ajax-login-out", {}, function(data) {
			if(data.status == 0) {
				location.reload();
			} else {
				$(".tip .invite_body p").html(data.msg);
				$(".tip").show();
			}
		}, "json");
	});
	//点击弹出登录框
	$(".before_denglu span").click(function() {
		$(".login").show();
		stop();
	});
	//点击发送验证码
	$(".i_code").click(function() {
		var phone = $(".c_phone").val();
		var t_yzm = $(".c_t_yzm").val();
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
		}, "json");
	});
	//点击登录
	$(".l_dl").click(function() {
		var y_phone = $(".c_phone").val();
		var y_yzm = $(".c_yzm").val();
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
			"invite_code": getUrlParam("invite_code"),
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				isLogin();
				$(".login").hide();
				move();
			} else {
				load_captcha();
				alert(data.msg);
			}
		}, "json");
	});
	//点击刷新图片验证码
	$(".captcha").click(function() {
		load_captcha();
	});
	//装盘抽奖
	var prizes = {
		1: {
			i: 3,
			prize: '参与礼包'
		},
		2: {
			i: 1,
			prize: '188元冲刺礼包'
		},
		3: {
			i: 4,
			prize: '328元豪华礼包'
		},
		4: {
			i: 5,
			prize: '谢谢参与'
		},
	};
	var click = false;
	lottery.init('lottery');
	$(".click_btn").click(function() {
		var self = $(this);
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		if(click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
			return;
		}
		if($(this).children("p").find("i").text() > 0) {
			if(base.today_num < 10) {
				lottery.speed = 150;
				roll();
				click = true;
				setTimeout(function() {
					$.ajax({
						'url': '/site/ajax-draw',
						'data': {},
						'type': 'GET',
						'dataType': 'Json',
						success: function(data) {
							if(data.status == 0) {
								var id = data.msg.gift_id;
								var code = data.msg.code;
								var count = data.msg.draw_num;
								$(".t_number").html(count);
								$(".click_btn p i").html(count);
								lottery.stop(prizes[id].i);
								if(id == 1) {
									$(".price_title").html("参与礼包");
									$(".price").attr("src", alt + "images/gift.png");
								} else if(id == 2) {
									$(".price_title").html("188元冲刺礼包");
								} else if(id == 3) {
									$(".price").attr("src", alt + "images/s_zuanshi.png");
									$(".price_title").html("328元冲刺礼包");
								} else if(id == 4) {
									$(".price").attr("src", alt + "images/smile.png");
									$(".price_title").html("谢谢参与");
								}
								lottery.end = function() {
									$(".success").show();
								}
							} else {
								lottery.stop(prizes[2].i);
								lottery.end = function() {
									$(".lottery-unit").removeClass("active");
								}
								$(".tip .invite_body p").html(data.msg);
								$(".tip").show();
							}
						}
					})
				});
			} else {
				$(".tip .invite_body p").html("今日抽奖次数已达到上限");
				$(".tip").show();
			}
		} else {
			$(".tip .invite_body p").html("您还没有抽奖机会 ，赶快邀请更多好友参与吧");
			$(".tip").show();
		}
	});
	//点击分享增加分享次数
	$(".bshare-custom a").on("click", function() {
		$.get("/site/ajax-share", {}, function(data) {
			if(data.status == 0) {
				$(".click_btn p i").html(data.draw_num);
				$(".t_number").html(data.draw_num);
			} else {
				$(".tip .invite_body p").html(data.msg);
				$(".tip").show();
			}
		}, "json");
	});
	//点击关闭弹窗
	$(".close").click(function() {
		$(this).parent().parent().hide();
		move();
	});
	//点击弹出地址弹窗
	$(".t_dizhi").click(function() {
		$(".success").hide();
		$(".dizhi").show();
		stop();
	});
	//点击分享弹出分享弹框
	$(".share_btn").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		$(".share").show();
	});
	$(".invite_btn").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		$(".invite_friend").show();
	});
	//地址信息验证
	$(".t_sure").click(function() {
		var name = $(".name").val();
		var youbian = $(".youbian").val();
		var c_phone = $(".d_phone").val();
		var address = $(".address").val();
		if(name == "" || name == undefined) {
			alert("请输入收件人姓名");
			return;
		}
		if(youbian == "" || youbian == undefined) {
			alert("请输入邮编号码");
			return;
		}
		if(c_phone == "" || c_phone == undefined) {
			alert("请输入收件人手机号码");
			return;
		}
		if(c_phone.length != 11) {
			alert("手机号码不正确");
			return;
		}
		if(address == "" || address == undefined) {
			alert("请输入收件人地址");
			return;
		}
		$.post("/site/ajax-address", {
			"name": name,
			'tel': c_phone,
			'code': youbian,
			'address': address,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".dizhi").hide();
				move();
				$(".tip .invite_body p").html("您的资料已填写完毕，奖品将陆续发货，请耐心等待！");
				$(".tip").show();
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	//点击确定关闭弹窗
	$(".c_sure").click(function() {
		$(".my_price").hide();
	});
	$(".p_sure").click(function() {
		$(".tip").hide();
	});
	var clickNum = true;
	$(".t_weixin").click(function (){
		if(clickNum){
			$('.f_weixin').show();
			clickNum = false;
		} else {
			$('.f_weixin').hide();
			clickNum = true;
		}
	})
	//初始化复制分享链接
	new Clipboard('#tc13_copyBtnz');
	$(".s_fuzhi").click(function() {
		alert("已复制~");
	});
})