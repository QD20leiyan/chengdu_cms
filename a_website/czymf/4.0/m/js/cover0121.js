//中奖名单滚动效果
function autoScroll(obj) {
	var length = $(obj).find("li").length;
	if(length > 2) {
		$(obj).find("ul").animate({
			marginTop: "-1.5625rem"
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
//图片验证码
var imgMarkIndex = 1;

function load_captcha() {
	imgMarkIndex++;
	var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha").html(data.msg);
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
var srf = $("meta[name='csrf-token']").attr("content");
var is_show = 0;
var new_str = "";
//判断用户是否登录
var userJsonStr = sessionStorage.getItem('user');
var userEntity = JSON.parse(userJsonStr);
var user_zan = sessionStorage.getItem('zan');
var base = {
	isLogin: false,
	new_user: false,
	old_user: false,
	friends: false,
	userId: 0,
	sendMark: false,
	sendLogin: false,
	sendLoginOut: false,
	luckyNumber: 0,
	phone: 0,
	id: 0,
};
var totalHtml = "";
isLogin();

function isLogin() {
	if(userEntity == "null" || userEntity == null || userEntity == "") {

	} else {
		if(userEntity.status == 0) {
			base.isLogin = true;
			$(".before_denglu").removeClass("active");
			$(".after_denglu").addClass("active");
			$(".g_phone span").html(userEntity.data.user.phone);
			$("#tc11_copyTextz").html(userEntity.data.user.me_invite_code);
			$("#tc14_copyTextz").html(userEntity.data.user.me_invite_code);
			$(".price_number span").html(userEntity.data.user_data.residue_lottery_num);
			$(".invite_con span").html('http://sm.yingxiong.com' + '?invite_code=' + userEntity.data.user.me_invite_code);
			$("#invite_num").html(userEntity.data.user_data.invite_user.length);
			if(userEntity.data.user_data.register_type == 1) {
				base.id == 1
			} else if(userEntity.data.user_data.register_type == 2) {
				base.id == 2
			} else if(userEntity.data.user_data.register_type == 3) {
				base.id == 3
			}
			if(userEntity.data.user_data.gift_pass_invite != "") {
				new_str = '<li><span>被邀请礼包</span><span id="tc5_copyText">' + userEntity.data.user_data.gift_pass_invite + '</span><i id="tc5_copyBtn" data-clipboard-action="copy" data-clipboard-target="#tc5_copyText">复制</i></li>';
				new Clipboard('#tc5_copyBtn');
			} else {
				new_str = '';
			}
		} else {
			base.isLogin = false;
		}
	}
	if(user_zan == "null" || user_zan == null || user_zan == "") {
		$("#z_number").html("1");
	} else {
		$("#z_number").html("0");
	}
}
//预约人数分段
function numFormat(n) {
	n = n + "";
	if(n.length > 3) {

		return numFormat(n.substring(0, n.length - 3)) + "," + n.substr(n.length - 3, 3);
	} else {
		return n;
	}
}
//进度条显示
function initActive(num) {
	var percent = parseFloat((parseInt(num) / 30000 + 5).toFixed(2));
	num = parseInt(num) > 0 ? parseInt(num) : 0; //防止小于0
	if(num >= 300000) {
		$(".jd_ul li:nth-child(1)").addClass("active");
	}
	if(num >= 1000000) {
		$(".jd_ul li:nth-child(2)").addClass("active");

	}
	if(num >= 3000000) {
		$(".jd_ul li:nth-child(3)").addClass("active");
	}
	if(num == 300000) {
		percent = 15;
	}
	if(num == 1000000) {
		percent = 50;
	}
	if(num == 3000000) {
		percent = 83
	}
	if(num > 50000 && num < 100000){
		percent = 3.33
	}
	if(num > 100000 && num < 200000){
		percent = 7.33
	}
	if(num > 200000 && num < 300000){
		percent = 9.33
	}
	if(num > 300000 && num < 400000){
		percent = 20.33
	}
	if(num > 400000 && num < 500000){
		percent = 23.33
	}
	if(num > 500000 && num < 600000){
		percent = 26.33
	}
	if(num > 600000 && num < 700000){
		percent = 30.33
	}
	if(num >700000 && num < 800000){
		percent = 35.33
	}
	if(num >800000 && num < 900000){
		percent = 39.33
	}
	if(num >900000 && num < 1000000){
		percent = 43.33
	}
	return percent;
}
//第二屏点击点亮祝福
$("#f_btn").click(function() {
	if($("#z_number").text() > 0) {
		$.post("/act/praise.html", {

		}, function(data) {
			if(data.status == 0) {
				$("#z_number").text(parseInt($("#z_number").text() - 1));
				$(".c_tip p").html("点亮成功，记得明日再来点亮祝福哟");
				$(".tip").show();
				user_zan = 1;
				sessionStorage.setItem('zan', user_zan);
			} else if(data.status == 2) {
				sessionStorage.clear("user");
				location.reload();
			} else {
				user_zan = 1;
				$("#z_number").text(parseInt($("#z_number").text() - 1));
				sessionStorage.setItem('zan', user_zan);
				$(".c_tip p").html(data.msg);
				$(".tip").show();
			}
		}, "json");
		isLogin();
	} else {
		$(".c_tip p").html("您已经点亮过了哦~");
		$(".tip").show();
	}
});
//用户点击获取手机验证码
$(".g_code").click(function() {
	var phone = $(".c_phone").val();
	var captcha = $(".c_tyzm").val();
	var service_id = $('#qufu option:selected').attr("data-type");
	if($(".c_id").val() == "" || $(".c_id").val() == undefined) {
		alert("请输入角色名");
		return;
	}
	if(service_id == "请选择区服" || service_id == undefined) {
		alert("请选择区服");
		return;
	}
	if(phone == "" || phone == undefined) {
		alert("请输入手机号");
		return;
	}
	if(phone.length != 11) {
		alert("手机号有误");
		return;
	}
	if(captcha == "" || captcha == undefined) {
		alert("请输入图形验证码");
		return;
	}
	$.post("/common/get-login-verify.html", {
		phone: phone,
		captcha: captcha,
		smsContent: ""
	}, function(data) {
		if(data.status == 0) {
			sendemail();
		} else {
			$(".c_tip p").html(data.msg);
			$(".tip").show();
			load_captcha();
		}
	}, "json")
});
//用户点击登录
$("#login_sure").click(function() {
	var role_name = $(".c_id").val();
	var service_id = $('#qufu option:selected').attr("data-type");
	var phone = $(".c_phone").val();
	var yzm = $(".c_yzm").val();
	if(role_name == "" || role_name == undefined) {
		alert("请输入角色名");
		return;
	}
	if(service_id == "请选择区服" || service_id == undefined) {
		alert("请选择区服");
		return;
	}
	if(phone == "" || phone == undefined) {
		alert("请输入手机号");
		return;
	}
	if(phone.length != 11) {
		alert("手机号有误");
		return;
	}
	if(yzm == "" || yzm == undefined) {
		alert("请输入图形验证码");
		return;
	}
	$.post("/act/login.html", {
		role_name: role_name,
		server_id: service_id,
		phone: phone,
		yzm: yzm,
		invite_code: $(".c_code").val(),
	}, function(data) {
		if(data.status == 0) {
			$(".login").hide();
			move();
			if($(".c_login .close").attr("data-id") == 1) {
				$('html,body').animate({
					scrollTop: $('.second').offset().top - 100
				}, 500);
			} else if($(".c_login .close").attr("data-id") == 2) {
				$('html,body').animate({
					scrollTop: $('.third').offset().top - 100
				}, 500);
			} else if($(".c_login .close").attr("data-id") == 3) {
				$('html,body').animate({
					scrollTop: $('.four').offset().top - 100
				}, 500);
			} else if($(".c_login .close").attr("data-id") == 4) {
				$('html,body').animate({
					scrollTop: $('.five').offset().top - 100
				}, 500);
			}
			sessionStorage.setItem('user', JSON.stringify(data));
			var userJsonStr = sessionStorage.getItem('user');
			userEntity = JSON.parse(userJsonStr);
			isLogin();
		} else {
			$(".c_tip p").html(data.msg);
			$(".tip").show();
			load_captcha();
		}
	}, "json")
});
//点击注销
$(".zhuxiao").click(function() {
	$.post("/act/logout.html", {

	}, function(data) {
		if(data.status == 0) {
			sessionStorage.clear("user");
			location.reload();
		} else {
			$(".c_tip p").html(data.msg);
			$(".tip").show();
			load_captcha();
		}
	}, "json")
});
//点击用户登录弹出登录弹窗
$(".before_denglu").click(function() {
	if($(this).parent().siblings("div").attr("id") == "f_shuoming") {
		$(".c_login .close").attr("data-id", "1");
	} else if($(this).parent().siblings("div").attr("id") == "er_gift") {
		$(".c_login .close").attr("data-id", "2");
	} else if($(this).parent().siblings("div").attr("id") == "th_gift") {
		$(".c_login .close").attr("data-id", "3");
	} else if($(this).parent().siblings("div").attr("id") == "five_check") {
		$(".c_login .close").attr("data-id", "4");
	}
	$(".login").show();
	stop();
});
//点击关闭弹窗
$(".close").click(function() {
	$(this).parent().parent().hide();
	move();
	if($(this).attr("data-id") == 1) {
		$('html,body').animate({
			scrollTop: $('.second').offset().top - 100
		}, 500);
	} else if($(this).attr("data-id") == 2) {
		$('html,body').animate({
			scrollTop: $('.third').offset().top - 100
		}, 500);
	} else if($(this).attr("data-id") == 3) {
		$('html,body').animate({
			scrollTop: $('.four').offset().top - 100
		}, 500);
	} else if($(this).attr("data-id") == 4) {
		$('html,body').animate({
			scrollTop: $('.five').offset().top - 100
		}, 500);
	}
});
//第二屏点击活动说明
$("#f_shuoming").click(function() {
	$(".explain_one").show();
});
//第三屏点击活动说明
$("#t_shuoming").click(function() {
	$(".explain_two").show();
});
//第四屏点击活动说明
$("#s_shuoming").click(function() {
	$(".explain_three").show();
});
//第五屏点击活动说明
$("#i_shuoming").click(function() {
	$(".explain_four").show();
});
$("#s_shuoming").click(function() {
	$(".explain_three").show();
});
$(".shuo_sure").click(function() {
	$(this).parent().parent().hide();
});
$(".tip_sure").click(function() {
	$(this).parent().parent().hide();
});
var is_focus = 0;
//图片验证么获取焦点刷新验证码
$(".c_tyzm").focus(function() {
	if(is_focus == 0) {
		load_captcha();
		is_focus = 1;
	}
});
//第三屏点击查看我的奖励
$("#er_gift").click(function() {
	if(base.isLogin) {
		if(userEntity.status == 0) {
			if(userEntity.data.user_data.gift_register != "") {
				var tc_txt = "";
				if(userEntity.data.user_data.register_type == 3) {
					tc_txt = "欢乐相伴礼包"
				} else if(userEntity.data.user_data.register_type == 2) {
					tc_txt = "忠实玩家礼包"
				} else if(userEntity.data.user_data.register_type == 1) {
					tc_txt = "骨灰级重聚礼包"
				}
				var html = "";
				html = '<li><span>' + tc_txt + '</span><span id="tc20_copyText">' + userEntity.data.user_data.gift_register + '</span><i id="tc20_copyBtn" data-clipboard-action="copy" data-clipboard-target="#tc20_copyText">复制</i></li>';
				$(".huadong ul").html(null).append(html);
				new Clipboard('#tc20_copyBtn');
				$(".check").show();
			} else {
				$(".c_tip p").html("您还没有领取礼包哦~");
				$(".tip").show();
			}
		} else {
			$(".c_tip p").html(data.msg);
			$(".tip").show();
		}
	} else {
		$(".login").show();
		stop();
	}
});
//第三屏点击领取福利按钮
$(".t_btn").click(function() {
	if(base.isLogin) {
		$.post("/act/get-register-gift.html", {

		}, function(data) {
			if(data.status == 0) {
				if(data.data.register_type == 3) {
					$(".gift_con p span").html("欢乐相伴礼包");
					base.id = 1;
				} else if(data.data.register_type == 2) {
					$(".gift_con p span").html("忠实玩家礼包");
					base.id = 2;
				} else if(data.data.register_type == 1) {
					$(".gift_con p span").html("骨灰级重聚礼包");
					base.id = 3;
				};
				userEntity.data.user_data.register_type = data.data.register_type;
				userEntity.data.user_data.gift_register = data.data.code;
				sessionStorage.setItem('user', JSON.stringify(userEntity));
				$(".gift_code").html(data.data.code);
				$(".gift_tc").show();
			} else if(data.status == 2) {
				sessionStorage.clear("user");
				location.reload();
			} else {
				$(".c_tip p").html(data.msg);
				$(".tip").show();
			}
		}, "json");
	} else {
		$(".login").show();
		stop();
	}
});
//点击确定关闭中奖弹窗
$("#g_sure").click(function() {
	$(this).parent().parent().hide();
});
$("#check_gift").click(function() {
	$(this).parent().parent().hide();
});
$("#phone_sure").click(function() {
	$(this).parent().parent().hide();
});
$("#tx_address").click(function() {
	$(".real_gift").hide();
	$(".address").show();
	stop();
});
//填写地址
$("#sure_address").click(function() {
	var delivery_name = $(".a_name").val();
	var delivery_postcode = $(".a_youbian").val();
	var delivery_phone = $(".a_phone").val();
	var delivery_address = $(".tail_address").val();
	if(delivery_name == "" || delivery_name == undefined) {
		alert("姓名不能为空");
		return;
	}
	if(delivery_postcode == "" || delivery_postcode == undefined) {
		alert("邮编不能为空");
		return;
	}
	if(delivery_phone == "" || delivery_phone == undefined) {
		alert("手机号不能为空");
		return;
	}
	if(delivery_phone.length != 11) {
		alert("手机号有误");
		return;
	}
	if(delivery_address == "" || delivery_address == undefined) {
		alert("地址不能为空");
		return;
	}
	$.post("/act/save-address.html", {
		delivery_name: delivery_name,
		delivery_postcode: delivery_postcode,
		delivery_phone: delivery_phone,
		delivery_address: delivery_address
	}, function(data) {
		if(data.status == 0) {
			alert("填写地址成功！");
			$(".address").hide();
			move();
		} else {
			$(".c_tip p").html(data.msg);
			$(".tip").show();
		}
	}, "json");
});
//第四屏点击邀请好友
$("#invite_fir").click(function() {
	if(base.isLogin) {
		$(".invite").show();
	} else {
		$(".login").show();
		stop();
	}
});
//第四屏点击我的奖励按钮
$("#th_gift").click(function() {
	if(base.isLogin) {
		$.post("/act/get-invite-code.html", {

		}, function(data) {
			if(data.status == 0) {
				var nhtml = "";
				if(data.data != "" && new_str == "") {
					var html = "";
					for(var i in data.data) {
						if(data.data[i].gift_id == 474){
							nhtml = "邀请2人获取礼包";
						} else if(data.data[i].gift_id == 475){
							nhtml = "邀请4人获取礼包";
						} else if(data.data[i].gift_id == 476){
							nhtml = "邀请6人获取礼包";
						}
						html += '<li><span>'+ nhtml +'</span><span id="tc7_copyText' + i + '">' + data.data[i].code + '</span><i id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '" data-id="' + i + '">复制</i></li>';
					}
					$(".huadong ul").html(null).append(html);
					//初始化复制插件
					$(".huadong ul li i").each(function(i,n) {
						new Clipboard('#tc7_copyBtn' + $(n).attr("data-id"));
					});
					$(".check").show();
				} else if(data.data == "" && new_str != "") {
					$(".huadong ul").html(null).append(new_str);
					$(".check").show();
				} else if(data.data != "" && new_str != ""){
					var html = "";
					for(var i in data.data) {
						if(data.data[i].gift_id == 474){
							nhtml = "邀请2人获取礼包";
						} else if(data.data[i].gift_id == 475){
							nhtml = "邀请4人获取礼包";
						} else if(data.data[i].gift_id == 476){
							nhtml = "邀请6人获取礼包";
						}
						html += '<li><span>'+ nhtml +'</span><span id="tc7_copyText' + i + '">' + data.data[i].code + '</span><i id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '" data-id="' + i + '">复制</i></li>';
					}
					$(".huadong ul").html(null).append(html + new_str);
					//初始化复制插件
					$(".huadong ul li i").each(function(i,n) {
						new Clipboard('#tc7_copyBtn' + $(n).attr("data-id"));
					});
					$(".check").show();
				} else {
					$(".c_tip p").html("暂无礼包记录~");
					$(".tip").show();
				}
			} else if(data.status == 2) {
				sessionStorage.clear("user");
				location.reload();
			} else {
				$(".c_tip p").html(data.msg);
				$(".tip").show();
			}
		}, "json");
	} else {
		$(".login").show();
		stop();
	}
});
//第五屏点击我的奖励按钮
$("#five_check").click(function() {
	if(base.isLogin) {
		var html = ""
		if(userEntity.data.user_data.gift_lottery_prize != ''){
			for(var i in userEntity.data.user_data.gift_lottery_prize){
				html += '<li><span>' + userEntity.data.user_data.gift_lottery_prize[i].prize + '</span><span id="tc3_copyText' + i + '">' + userEntity.data.user_data.gift_lottery_prize[i].code + '</span><i id="tc3_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc3_copyText' + i + '">复制</i></li>';
			}
			$(".huadong ul").html(null).append(html);
			//初始化复制插件
			$(".huadong ul li i").each(function(index) {
				new Clipboard('#tc3_copyBtn' + i);
			});
			$(".check").show();
		} else {
			$(".c_tip p").html("您还没有中奖记录哦");
			$(".tip").show();
		}
	} else {
		$(".login").show();
		stop();
	}
});
//获取第五屏礼包剩余数量
// function getFiveNumber() {
// 	$.post("/act/get-residue-num.html", {

// 	}, function(data) {
// 		if(data.status == 0) {
// 			$(".all_ul li").each(function(i, n) {
// 				for(var b in data.data) {
// 					if($(n).attr("data-id") == b) {
// 						$(n).find("i").html(data.data[b])
// 					}
// 				}
// 			});
// 		} else {
// 			$(".c_tip p").html(data.msg);
// 			$(".tip").show();
// 		}
// 	}, "json");
// }
//第五屏点击分享增加抽奖次数
$(".c_share1").click(function() {
	if(base.isLogin) {
		$(".share").show();
		$.post("/act/share.html", {

		}, function(data) {
			if(data.status == 0) {
				$(".price_number span").html(data.data.residule_lottery_num);
			} else if(data.status == 2){
				sessionStorage.clear("user");
				location.reload();
			}
		}, "json");
	} else {
		$(".login").show();
		stop();
	}
});
//弹幕
function danmu() {
	var strArr = ['黑蚀龙', '鎏金龙', '周年灯笼龟', '限量蛋糕烟花', '限量蛋糕烟花', '周年限量法杖', '我中奖啦！', '好感动5555', '创魔不倒，陪你到老',
		'耶( •̀ ω •́ )y感动到爆', '50元话费', '10元花费', '全服礼包', '两只手接不过来', '哇，还有全服奖励', '报名！', '生日快乐！', '创魔生日快乐！', '萌新求带', '我是骨灰玩家', '59级大佬路过', '回归啦！', '大佬我回来啦', '首测玩家，叫哥', '首发就玩啦', '公测时下载的，现在还没卸载~', '和老公一起玩，开森', '游戏里奔现，有创魔真好', '同学都在玩，我第一个入坑的嘿嘿嘿', '和前桌一起建家园', '同桌加了敌对部落==', '为了部落！'
	];
	var colorArr = ['#ffba00', '#00f0ff', '#fff'];
	var toparr = [1, 2, 4, 3, 5, 2.5, 4.1, 3.4, 5, 6, 7.5, 8, 9, 10, 11, 12, 13, 14, 15, 15.5, 14.7, 12.8];
	var sizearr = [0.625, 0.6875, 0.75, 0.875, 0.8125];

	function danmufun() {
		var topindex = Math.floor(toparr.length * Math.random());
		var sizeindex = Math.floor(sizearr.length * Math.random());
		var span = $('<span style="top:' + toparr[topindex] + 'rem;font-size:' + sizearr[sizeindex] + 'rem;color:' + colorArr[Math.floor(colorArr.length * Math.random())] + ';">' + strArr[Math.floor(strArr.length * Math.random())] + '</span>');
		toparr.splice(topindex, 1);
		span.appendTo(".danmu").animate({
			left: -span.width() + "px"
		}, 10000, 'linear', function() {
			toparr.push(parseFloat($(this).css('top')) / parseFloat($('html').css('fontSize')));
			$(this).remove();
		});

		setTimeout(function() {
			danmufun();
		}, 1000 + Math.random() * 1000);
	}
	danmufun();
}

//第五屏点击转盘抽奖
//抽奖
(function() {
	var flag = false;
	var TextNum1;
	var TextNum2;
	var TextNum3;

	function letGo() {
		reset();
		if(!TextNum3 && TextNum3 != 0) {
			$(".lottery1,.lottery2").animate({
				"top": "-38rem"
			}, 500, "linear");
			$(".lottery3").animate({
				"top": "-38rem"
			}, 500, "linear", function() {
				letGo();
			});
		} else {
			var toparr = ['-2.65rem', '-5.4rem', '-8.2rem', '-10.8rem', '-13.6rem', '-16.3rem', '-19rem', '-21.7rem', '-24.5rem', '-27.2rem', '-29.9rem', '-32.6rem', '-35.3rem', '-38rem'];
			var num1 = toparr[TextNum1]; //在这里随机
			var num2 = toparr[TextNum2];
			var num3 = toparr[TextNum3];
			$(".lottery1").animate({
				"top": num1
			}, 500, "linear");
			$(".lottery2").animate({
				"top": num2
			}, 900, "linear", function() {
				//抽奖结束
				TextNum1 = undefined, TextNum2 = undefined, TextNum3 = undefined;
				//				if(is_show == 1) {
				//					$(".gift_tc").show();
				//				} else {
				//					$(".c_tip p").html("网络有误，请刷新页面");
				//					$(".tip").show();
				//				}
			});
			$(".lottery3").animate({
				"top": num3
			}, 650, "linear");
		}
	}

	function reset() {
		$(".lottery1,.lottery2,.lottery3").css({
			"top": '-2.6rem'
		});
	}
	$(".c_start").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		if(!flag && $(".price_number span").text() > 0) {
			flag = true;
			reset();
			letGo();
			$.ajax({
				'url': "/act/lottery.html",
				'data': {},
				'type': 'POST',
				'dataType': 'Json',
				success: function(data) {
					if(data.status == 0) {
						flag = false;
						setTimeout(function() {
							is_show = 1;
							$(".price_number span").text(data.data.residue_lottery_num);
							var new_html = "";
							userEntity.data.user_data.residue_lottery_num = data.data.residue_lottery_num;
							sessionStorage.setItem('user', JSON.stringify(userEntity));
							if(data.data.gift_id == 0) {
								is_show = 0;
								$(".c_tip p").html("和大奖擦肩而过>-< <br />努力努力，明天欧气，下次就会中大奖了！ ");
								$(".tip").show();
								//谢谢参与--保证三个不同
								var num1 = parseInt(Math.random() * 10);
								var num2 = parseInt(Math.random() * 10);
								var num3 = parseInt(Math.random() * 10);
								TextNum1 = num1; //随机数
								TextNum2 = num2;
								if(num1 == num2 && num2 == num3) {
									num3 = num3 > 5 ? parseInt(Math.random() * 5) : 6 + parseInt(Math.random() * 4)
								}
								TextNum3 = num3;
							} else {
								if(data.data.gift_id == 477) {
									TextNum1 = 12;
									TextNum2 = 12;
									TextNum3 = 12; //星星法杖
									$(".gift_con span").html("兽皮，珍珠奶茶");
									new_html = "兽皮，珍珠奶茶";
									$(".gift_code").html(data.data.code);
									$(".gift_tc").show();
								}
								if(data.data.gift_id == 478) {
									TextNum1 = 0;
									TextNum2 = 0;
									TextNum3 = 0; //星星法杖
									$(".gift_con span").html("星星法杖");
									$(".gift_code").html(data.data.code);
									new_html = "星星法杖";
									$(".gift_tc").show();
								} else if(data.data.gift_id == 479) {
									TextNum1 = 1;
									TextNum2 = 1;
									TextNum3 = 1; //金鱼昊昊
									$(".gift_con span").html("金鱼昊昊");
									$(".gift_code").html(data.data.code);
									new_html = "金鱼昊昊";
									$(".gift_tc").show();
								} else if(data.data.gift_id == 480) {
									TextNum1 = 2;
									TextNum2 = 2;
									TextNum3 = 2; //雪狼王
									$(".gift_con span").html("雪狼王");
									$(".gift_code").html(data.data.code);
									new_html = "雪狼王";
									$(".gift_tc").show();
								} else if(data.data.gift_id == 481) {
									TextNum1 = 3;
									TextNum2 = 3;
									TextNum3 = 3; //周年限量法杖
									$(".gift_con span").html("周年限量法杖");
									$(".gift_code").html(data.data.code);
									new_html = "周年限量法杖";
									$(".gift_tc").show();
								} else if(data.data.gift_id == 482) {
									TextNum1 = 11;
									TextNum2 = 11;
									TextNum3 = 11; //50元话费	
									$(".c_real_phone span").html("50元话费");
									new_html = "50元话费";
									$(".real_gift_phone").show();
								} else if(data.data.gift_id == 483) {
									TextNum1 = 4;
									TextNum2 = 4;
									TextNum3 = 4; //10元话费
									$(".c_real_phone span").html("10元话费");
									$(".real_gift_phone").show();
									new_html = "10元话费";
								} else if(data.data.gift_id == 484) {
									TextNum1 = 5;
									TextNum2 = 5;
									TextNum3 = 5; //灯笼龟
									$(".gift_con span").html("灯笼龟");
									$(".gift_code").html(data.data.code);
									$(".gift_tc").show();
									new_html = "灯笼龟";
								} else if(data.data.gift_id == 485) {
									TextNum1 = 6;
									TextNum2 = 6;
									TextNum3 = 6; //鎏金龙
									$(".gift_con span").html("鎏金龙");
									$(".gift_code").html(data.data.code);
									$(".gift_tc").show();
									new_html = "鎏金龙";
								} else if(data.data.gift_id == 486) {
									TextNum1 = 7;
									TextNum2 = 7;
									TextNum3 = 7; //限量蛋糕烟花
									$(".gift_con span").html("限量蛋糕烟花");
									$(".gift_code").html(data.data.code);
									$(".gift_tc").show();
									new_html = "限量蛋糕烟花";
								} else if(data.data.gift_id == 487) {
									TextNum1 = 8;
									TextNum2 = 8;
									TextNum3 = 8; //限量蛋糕炸弹
									$(".gift_con span").html("限量蛋糕炸弹");
									$(".gift_code").html(data.data.code);
									$(".gift_tc").show();
									new_html = "限量蛋糕炸弹";
								} else if(data.data.gift_id == 488) {
									TextNum1 = 9;
									TextNum2 = 9;
									TextNum3 = 9; //IPad
									$(".c_address_real span").html("IPad");
									$(".real_gift").show();
									new_html = "IPad";
								} else if(data.data.gift_id == 489) {
									TextNum1 = 10;
									TextNum2 = 10;
									TextNum3 = 10; //SWITCH
									$(".c_address_real span").html("SWITCH");
									$(".real_gift").show();
									new_html = "SWITCH";
								}
								userEntity.data.user_data.gift_lottery_prize = data.data.gift_lottery_prize;
								sessionStorage.setItem('user', JSON.stringify(userEntity));
								isLogin();
							}
						}, 1000);
					} else if(data.status == 2){
						sessionStorage.clear("user");
						location.reload();
					} else {
						flag = false;
						setTimeout(function() {
							is_show = 0;
							var num1 = parseInt(Math.random() * 6);
							var num2 = parseInt(Math.random() * 6);
							var num3 = parseInt(Math.random() * 6);
							TextNum1 = num1; //随机数
							TextNum2 = num2;
							if(num1 == num2 && num2 == num3) {
								num3 = num3 > 3 ? parseInt(Math.random() * 3) : 4 + parseInt(Math.random() * 2)
							}
							TextNum3 = num3;
							$(".c_tip p").html(data.msg);
							$(".tip").show();
						}, 1000);
					}
				},
				error: function() {
					alert("网络请求失败，请重新刷新页面");
				}
			});
		} else {
			$(".c_tip p").html("您已经没有次数了");
			$(".tip").show();
		}
	});
})();
//点击提示已复制
$(".huadong ul").on("click", "i", function() {
	alert("已复制~");
});
//点击刷新图形验证码
$(".captcha").click(function() {
	load_captcha();
});

//初始化复制链接
//初始化复制分享链接
new Clipboard('#tc11_copyBtnz');
new Clipboard('#tc12_copyBtnz');
new Clipboard('#tc13_copyBtnz');
new Clipboard('#tc14_copyBtnz');
$("#tc11_copyBtnz").click(function() {
	alert("已复制");
});
$("#tc12_copyBtnz").click(function() {
	alert("已复制");
});
$("#tc13_copyBtnz").click(function() {
	alert("已复制");
});
$("#tc14_copyBtnz").click(function() {
	alert("已复制");
});
var jdt_num = parseInt($(".jd_number span").text());
$(function() {
	$(".jd_xs").css("width" , initActive(jdt_num) + "%");
	$(".jd_number span").text(numFormat(jdt_num));
	var scroll = setInterval('autoScroll(".price_con")', 1500);
	$(".c_code").val(getQueryString("invite_code"));
	// getTotal();
	// getFiveNumber();
	// getList();
	//	danmu();
	// getPrice();
});