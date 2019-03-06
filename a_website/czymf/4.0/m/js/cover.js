var srf = $('meta[name="csrf-token"]').attr('content');
var click_id = 0;

//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
    imgMarkIndex++;
    var imgUrl = "/site/captcha?refresh=" + imgMarkIndex;
    $.get(imgUrl, {}, function(data) {
        $(".code_img img").attr("src", data.url);
    }, 'json');
}
//图片验证码刷新
$(".code_img").click(function(){
    load_captcha();
});

// 验证码倒计时
function timer(ele, callback) {
	var timeNum = 60;
	if(ele) {
		ele.html("60s");
	}
	timer_fun = setInterval(function() {
		timeNum--;
		ele.html((timeNum <= 0 ? 0 : timeNum) + "s");
		if(timeNum == 0) {
			clearInterval(timer_fun);
			ele.html("获取验证码");
			if(callback) {
				callback();
			}
		}
	}, 1000);
}
$(function() {
	$('html').fitText(2);
	// 初始判断
	$.ajax({
		'url': '/site/ajax-get-user.html',
		'data': {},
		'type': 'GET',
		'dataType': 'Json',
		success: function(data) {
			if(data.status == 0) {
				var invite_num = data.msg.invite_num;
				if(!invite_num) {
					invite_num = 0;
				}
				$(".log_pre").addClass("hide");
				$(".log_aft").removeClass("hide");
				$('.log_peo').text(data.msg.user_phone);
				$('.log_succ span').text(data.msg.user_phone);
				$('.sec_num span').text(invite_num);
				$('.code span').text(data.msg.me_invite_code);
				$('.inv_code li.fl img').attr("src", data.msg.invite_img);
				$('.log_aft').attr("data-url", data.msg.share_url);
				$('.inv_num').text(data.msg.me_invite_code);
			} else {}
		}
	});
	$.ajax({
		'url': '/site/ajax-get-num.html',
		'data': {},
		'type': 'GET',
		'dataType': 'Json',
		success: function(data) {
			if(data.status == 0) {
				$(".co_progress").attr("data-num", data.msg);
				initActive($(".co_progress").data("num"));
			} else {

			}
		}
	});
	//获取分享链接中的邀请码
	var url = url || location.search; //获取url中"?"符后的字串
	var params = {};
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		var datas = str.split("&");
		for(var i = 0; i < datas.length; i++) {
			var tempData = datas[i].split("=");
			params[tempData[0]] = tempData[1];
		}
	}
	$("#invite_code").val(params.code);
});
$(".ent_cov").click(function() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isIOS) {
		var href = $('.js_wap_down').attr('href');
		location.href = href;
	}
	if(isAndroid) {
		$(".mask").show();
	}
})
$(".js_wap_down").click(function() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		$(this).attr("href", "javascript:;")
		$(".mask").show();
	}
});

$('.js-yuyue').click(function() {
	var phone = $('.js-phone').val();
	var cms_csrf = $('meta[name="csrf-token"]').attr('content');
	var type = "android";
	if(!checkPhone(phone)) {
		alert('该手机号码不正确');
		return;
	}
	$.post('/site/subscribe.html', {
			phone: phone,
			cms_csrf: cms_csrf,
			type: type,
			is_no_yzm: 1
		},
		function(data) {
			if(data.status == 0) {
				$(".login").hide();
				$(".mask").hide();
				$('.js-phone').val("");
				alert('预约已成功');
			} else {
				alert(data.msg);
			}
		}, 'JSON');
});

function checkPhone(phone) {
	if(/^1[3|4|5|7|8|9]\d{9}$/.test(phone)) {
		return true;
	}
	return false;
}

function checkMail(mail) {
	var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
	if(reg.test(mail)) {
		return true;
	}
	return false;
}
//时间轴
$(".yyjl .jiangli").click(function() {
	$(this).parent().parent().find(".gift_page").toggle();
	$(this).parent().parent().siblings("li").find(".gift_page").hide();
	$(this).find("i").toggleClass("on");
	$(this).parent().parent().siblings("li").find("i").removeClass("on");
});
// 进度条
function initActive(num) {
	num = parseInt(num) > 0 ? parseInt(num) : 0;
	if(num >= 100000) {
		$(".co_step1").addClass("active");
		$(".co_step1").addClass("active-1");
	}
	if(num >= 300000) {
		$(".co_step2").addClass("active");
		$(".co_step1").removeClass("active-1");
		$(".co_step2").addClass("active-1");
	}
	if(num >= 500000) {
		$(".co_step3").addClass("active");
		$(".co_step1").removeClass("active-1");
		$(".co_step2").removeClass("active-1");
		$(".co_step3").addClass("active-1");
	}
	if(num >= 1000000) {
		$(".co_step4").addClass("active");
		$(".co_step1").removeClass("active-1");
		$(".co_step2").removeClass("active-1");
		$(".co_step3").removeClass("active-1");
		$(".co_step4").addClass("active-1");
	}
}
//弹窗关闭按钮
$(".close").click(function() {
	$(this).parent().parent().parent().hide();
});
//登录弹框关闭
$(".login_board .close").click(function() {
	$(".login_board").hide();
	$(".yuyue_board").hide();
	$(".invite_board").hide();
	$(".active_board").hide();
	$('#login_code1').val("");
	$('#check_code1').val("");
	$('#check_code2').val("");
	// $('#invite_code').val("");
	$(".co_error").hide();
});
//点击查看详情
$(".main2 .look").click(function() {
	$(".active_board").show();
});
//点击分享
$(".share_oth").click(function() {
	if($(".log_aft.hide").length > 0) {
		//还未登录
		$(".login_board").show();
	} else {
		$(".invite_board").show();
	}
});
//点击预约
$(".main .yuyue").click(function() {
	if(new Date("2018/02/03 23:59:59")<new Date()){
		//当前时间大于活动结束时间
		alert("活动已结束");
	}else{
		if($(".log_aft.hide").length > 0) {
			//还未登录
			click_id = 1;
			$(".login_board").show();
		} else {
			$(".yuyue_board").show();
		}
	}
});
//点击登录
$(".main3 .login").click(function() {
	$(".login_board").show();
});
// 重置按钮
$(".resect").click(function() {
	$(this).parent().find(".tel").val("");
});
//登录获取验证码
$(".gain1").click(function() {
	var my_tel1 = $("#login_code1").val();
	var my_code1 = $("#check_code2").val();
	if(my_tel1 == "" || my_tel1 == undefined) {
		$(".login_tel .err1").show().text("手机号码不能为空");
		return;
	} else if(my_tel1.length!=11) {
		$(".login_tel .err1").show().text("请输入正确的手机号码");
		return;
	} else if(my_code1 == "" || my_code1 == undefined) {
		$(".login_tel .err3").show().text("请输入正确的验证码");
		return;
	} else {
		$(".login_tel .err1").hide();
		$(".login_tel .err3").hide();
		$.post('/site/ajax-login-verify.html', {
			"phone": my_tel1,
			"captcha": my_code1,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".gain1").css("pointer-events", "none");
                load_captcha();
				timer($(".gain1"), function() {
					$(".gain1").css("pointer-events", "auto");
				});
			} else {
				alert(data.msg);
                load_captcha();
			}
		}, 'json');
	}
});
// 登录
$(".login_next").click(function() {
	var my_tel1 = $("#login_code1").val();
	var my_code1 = $('#check_code1').val();
	if(my_tel1 == "" || my_tel1 == undefined) {
		$(".login_tel .err1").show().text("手机号码不能为空");
		return;
	} else if(my_tel1.length!=11) {
		$(".login_tel .err1").show().text("请输入正确的手机号码");
		return;
	} else {
		$(".login_tel .err1").hide();
		if(my_code1 == "" || my_code1 == undefined) {
			$(".login_tel .err2").show().text("验证码不能为空");
			return;
		} else {
			$(".login_tel .err2").hide();
		}
	}
	$.ajax({
		'url': '/site/ajax-login.html',
		'data': {
			'phone': my_tel1,
			'yzm': my_code1,
			"cms_csrf": srf
		},
		'type': 'POST',
		'dataType': 'Json',
		success: function(data) {
			if(data.status == 0) {
				var invite_num = data.msg.invite_num;
				if(!invite_num) {
					invite_num = 0;
				}
				$(".login_board").hide();
				$(".log_pre").addClass("hide");
				$(".log_aft").removeClass("hide");
				$('#login_code1').val("");
				$('#check_code1').val("");
				$('.log_peo').text(data.msg.user_phone);
				$('.log_succ span').text(data.msg.user_phone);
				$('.sec_num span').text(invite_num);
				$('.code span').text(data.msg.me_invite_code);
				$('.inv_code li.fl img').attr("src", data.msg.invite_img);
				$('.log_aft').attr("data-url", data.msg.share_url);
				$('.inv_num').text(data.msg.me_invite_code);
				if(click_id == 1) {
					$(".yuyue_board").show();
				}

			} else {
				alert(data.msg);
			}
		}
	});
});
//预约获取验证码
// $(".yuyue_board .gain2").click(function(){
//   var my_tel2 = $("#login_code2").val();
//   var xt_id=$('.xitong input[type="radio"]:checked').val();
//     if(xt_id==1){
//       var type="ios";
//     }else if(xt_id==2){
//       var type="andriod";
//     }
//   var srf = $('meta[name="csrf-token"]').attr('content');
//   if(my_tel2 == "" || my_tel2 == undefined) {
//     $(".yuyue_tel .err01").show().text("手机号码不能为空");
//       return;
//   }else if(my_tel2.length!=11){
//       $(".yuyue_tel .err01").show().text("请输入正确的手机号码");
//       return;
//   }else{
//     $(".yuyue_tel .err01").hide();
//     $.post('/site/ajax-yy-verify.html',{ "phone":my_tel2,"type":type,"cms_csrf":srf },function(data){
//       if(data.status == 0){
//         $(".gain2").css("pointer-events","none");
//         timer($(".gain2"),function(){
//           $(".gain2").css("pointer-events","auto");
//         });
//       }else{
//           alert(data.msg);
//       }
//     }, 'json');
//   }
// });
// 预约
$(".yuyue_next").click(function() {
	var invite_code = $('#invite_code').val();
	var type_id = $(".yuyue_tel .yuyue_form .xitong>span.on").attr("data-id");
	if(type_id == 1) {
		var type = "ios";
	} else if(type_id == 2) {
		var type = "android";
	}
	var yq_xz = $(".yuyue_tel .yuyue_form .inv_hav>span.active").text();
	if(invite_code == "" && yq_xz == "是") {
		alert('邀请码不能为空哦');
		return;
	}
	$.post('/site/ajax-yuyue.html', {
		"type": type,
		"invite_code": invite_code,
		'cms_csrf': srf
	}, function(data) {
		if(data.status == 0) {
			alert('预约成功');
			$(".yuyue_board").hide();
			$('#invite_code').val("");
		} else {
			alert(data.msg);
		}
	}, 'json');
	//   }
	// }
});
//手机类型选择
$(".yuyue_tel .yuyue_form .xitong>span").click(function() {
	$(this).addClass("on").siblings().removeClass("on");
});
//是否被邀请
$(".yuyue_tel .yuyue_form .inv_hav>span.rdo3").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
	if($(this).text() == "否") {
		$('#invite_code').val("");
	}
});