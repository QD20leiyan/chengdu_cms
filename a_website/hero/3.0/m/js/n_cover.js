//60s倒计时验证
var countdown = 60;
var srf = $("meta[name='csrf-token']").attr("content");
var info_url = "http://hero.yingxiong.com";

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
var imgMarkIndex = 1;

function load_captcha() {
	imgMarkIndex++;
	var imgUrl = info_url + "/site/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
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
		day: 0,
		hour: 0,
		sendLogin: false,
		sendLoginOut: false,
		luckyNumber: 0,
		phone: 0,
		id: 0,
	};
	//判断用户是否登录
	function isLogin() {
		$.post(info_url + "/site/userinfo", {}, function(data) {
			if(data.status == 0) {
				base.phone = data.phone;
				base.day = data.left_day;
				base.hour = data.left_hour;
				var msg = data.gift;
				if(msg != "") {
					var html = "";
					html += '<li>' +
						'<span>' + msg.name + '</span>' +
						'<span>' + msg.code + '</span>' +
						'</li>'
					$(".huadong ul").html(null).append(html);
				}
				base.isLogin = true;
				$(".number").html(base.phone);
				$(".before_denglu").removeClass("active");
				$(".after_denglu").addClass("active");
				$(".left_day").html(base.day);
				$(".left_hour").html(base.hour);
			} else {
				base.day = data.left_day;
				base.hour = data.left_hour;
				base.isLogin = false;
				$(".left_day").html(base.day);
				$(".left_hour").html(base.hour);
			}
		}, "json");
	}
	isLogin();
	ajaxInit();
	//点击登录弹窗弹窗
	$(".dl").click(function() {
		$(".login").show();
		stop();
	});
	//点击分享判断状态
	$(".c_share").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		$(".share").show();
	});
	//点击查看我的奖品
	$(".check_gift").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		if($(".huadong ul").find("li").length > 0) {
			$(".my_price").show();
		} else {
			alert("您还没有中奖哦~");
			return;
		}

	});
	//点击分享弹窗奖品
	$(".bshare-custom a").on("click", function() {
		$.post(info_url + "/site/gift", {}, function(data) {
			if(data.status == 0) {
				if(data.gift.type == 0) {
					$(".gift_bg p").html(data.gift.name);
					$(".c_dhm").html(data.gift.code);
					$(".icon_bg img").attr("src", alt + "images/c_jinbi.png");
				} else if(data.gift.type == 1) {
					$(".gift_bg p").html(data.gift.name);
					$(".c_dhm").html(data.gift.code);
					$(".icon_bg img").attr("src", alt + "images/c_zuanshi.png");
				}
				setTimeout(function (){
					$(".congra").show();
					isLogin();
				},15000);
				
			}
		}, "json");
	});
	//点击发送验证码
	$(".g_code").click(function() {
		var phone = $(".phone").val();
		var captcha = $(".t_yzm").val();
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(captcha == "" || captcha == undefined) {
			alert("图片验证码不能为空");
			return;
		}
		$.post(info_url + "/site/getcode", {
			"phone": phone,
			"captcha": captcha
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
	$(".lingqu").click(function() {
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
		$.post(info_url + "/site/login", {
			"phone": phone,
			"yzm": yzm,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				isLogin();
				$(".login").hide();
				move();
			} else {
				alert(data.msg);
				load_captcha();
			}
		}, "json");
	});
	//点击关闭
	$(".close").click(function() {
		$(this).parent().parent().hide();
		move();
	});

	function ajaxInit() {
		$.post(n_url, {
			'name': 'hero_total'
		}, function(data) {
			if(data.msg == 'null' || data.msg == null) {
				data.msg = 0;
			}
			// var newNumber =parseInt(data.msg);
			var str = String(data.msg);
			var newStr = "";
			var count = 0;
			if(str.indexOf(".") == -1) {
				for(var i = str.length - 1; i >= 0; i--) {
					if(count % 3 == 0 && count != 0) {
						newStr = str.charAt(i) + "," + newStr;
					} else {
						newStr = str.charAt(i) + newStr;
					}
					count++;
				}
				str = newStr; //自动补小数点后两位      
			} else {
				for(var i = str.indexOf(".") - 1; i >= 0; i--) {
					if(count % 3 == 0 && count != 0) {
						newStr = str.charAt(i) + "." + newStr;
					} else {
						newStr = str.charAt(i) + newStr; //逐个字符相接起来          
					}
					count++;
				}
				str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
			}
			$(".c_number p").text(str);
		}, "json");
	};
	//点击注销
	$(".after_denglu i").click(function (){
		$.post(info_url+"/site/logout",{},function (data){
			if(data.status == 0){
				location.reload()
			} else {
				alert(data.msg);
			}
		},"json");
	})
	//复制
	new Clipboard('#tc11_copyBtnz');
	$(".fuzhi").click(function() {
		alert("已复制~");
	});
	//点击刷新验证码
	$(".captcha").click(function (){
		load_captcha();
	});
});