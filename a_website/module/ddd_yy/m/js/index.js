var verify_url = '/commonMethod/ajax-yuyue-verify'; //登录发送验证码
var login_url1 = '/commonMethod/ajax-yuyue'; //预约
var num_url = "/common/get-yuyue-count.html" //预约人数
var srf = $('meta[name="csrf-token"]').attr('content');
var is_yuyue = 0;
var phone_type = 0; //0--ios  1--and
//手机类型判断
var u = navigator.userAgent,
	app = navigator.appVersion;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isIOS) {
	phone_type = 0;
} else {
	phone_type = 1;
}
//禁止滚动
function stop() {
	$("html,body").css({
		"overflow": "hidden",
		"width": "100%",
		"height": "100%"
	});
};
//开启滚动
function move() {
	$("html,body").css({
		"overflow": "visible",
		"width": "100%",
		"height": "auto"
	});
};
//预约人数
function ajaxInit() {
	$.post(num_url, {
		'name': 'yuyue_total'
	}, function(data) {
		if(data.msg == 'null' || data.msg == null) {
			data.msg = 0;
		}
		newNumber = parseInt(data.msg);
		$('.line-color').css({
			'height': getPercent(newNumber) + '%'
		});
		$(".light").css({
			'top': getPercent(newNumber) + '%'
		});
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
					newStr = str.charAt(i) + "," + newStr;
				} else {
					newStr = str.charAt(i) + newStr; //逐个字符相接起来          
				}
				count++;
			}
			str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
		}
		$(".text_number").text(str);
	}, "json");
};
//处理预约人数
function getPercent(number) {
	var percent = parseFloat((parseInt(number) / 9500).toFixed(2));
	percent = percent > 100 ? 95.51 : percent;
	return percent;

};

function num_tot() {
	$.post(num_url, {
		'name': 'yuyue_total'
	}, function(data) {
		if(data.msg == 'null' || data.msg == null) {
			data.msg = 0;
		}
	}, "json");
}
//二级菜单下拉框
var clickNumber = 1;
var clickNumber2 = 0;
$(".header_a .type").click(function() {
	if(clickNumber % 2 !== 0) {
		$(this).parent().siblings(".nav-content").slideDown();
		$(this).addClass("type1");
		$('.down_list').slideUp(500);
	} else {
		$(this).parent().siblings(".nav-content").slideUp();
		$(this).removeClass("type1");
		$('.down_list').slideUp(500);
	}
	clickNumber++;
	clickNumber2 = 0;
});
$(".fade").click(function() {
	$('.down_list').slideUp(500);
	clickNumber2 = 0;
})
//新闻对应内容显示
$(".news_box .hd ul li").click(function() {
	var index = $(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});
//图片验证码刷新
var imgMarkIndex = 1;

function load_captcha() {
	imgMarkIndex++;
	var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".co_captcha img").attr("src", data.url);
	}, 'json');
}
//图片验证码刷新
$(".co_captcha i.co_imgtxt").click(function() {
	$(this).addClass("hidden");
	$(".co_captcha img").show();
	load_captcha();
});
$(".co_captcha img").click(function() {
	load_captcha();
})
//倒计时
function page_djs(ele, callback) {
	var time = 60;
	if(ele) {
		ele.html("60s");
	}
	djs_timer = setInterval(function() {
		time--;
		ele.html((time <= 0 ? 0 : time) + "s");
		if(time == 0) {
			clearInterval(djs_timer);
			ele.html("获取验证码");
			if(callback) {
				callback();
			}
		}
	}, 1000);
}
//错误提示显示
function showErr(index, text) {
	$(".co_error").eq(index).addClass("co_err_show").html(text);
	$(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
	$(".co_error").eq(index).removeClass("co_err_show");
}
//初始化
$(function() {
	//预约人数
	ajaxInit();
//	num_tot();
	//setInterval(function() {
	//  ajaxInit();
	//}, 60000);

});
//弹框关闭
$(".co_tips_close").click(function() {
	$(".co_tips").addClass("hidden");
	$('.co_input input').val("");
	$('.co_input textarea').val("");
	$(".co_error").removeClass("co_err_show");
	$("body,html").removeClass("no_auto");
});
//登录获取验证码
$(".co_codebtn1").click(function() {
	var my_phone = $(".co_username").val();
	var captcha = $(".captcha").val();
	var type_id = $(".rdo.on").attr("data-id");
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	} else if(my_phone.length != 11) {
		showErr(0, "手机号码不正确哦");
		return;
	}
	hideErr(0);
	if(captcha == "" || captcha == undefined) {
		showErr(1, "验证码不能为空哦");
		return;
	}
	hideErr(1);
	$.post(verify_url, {
		"phone": my_phone,
		"captcha": captcha,
		"type": type_id,
		"unique_phone": "1",
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			$(".co_codebtn1").css("pointer-events", "none");
			page_djs($(".co_codebtn1"), function() {
				$(".co_codebtn1").css("pointer-events", "auto");
			});
			is_yuyue = 1;
		} else {
			alert(data.msg);
			load_captcha();
			is_yuyue = 0;
		}
	}, 'json');
});
//登录请求
$(".co_tips_loginbtn").click(function() {
	fgw_yy_wap();
	var my_phone = $(".co_username").val();
	var co_codenum1 = $('.co_codenum1').val();
	var type_id = $(".rdo.on").attr("data-id");
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	} else if(my_phone.length != 11) {
		showErr(0, "手机号码不正确哦");
		return;
	}
	hideErr(0);
	if(co_codenum1 == "" || co_codenum1 == undefined) {
		showErr(2, "验证码不能为空哦");
		return;
	}
	hideErr(2);
	$.ajax({
		'url': login_url1,
		'data': {
			'phone': my_phone,
			'yzm': co_codenum1,
			'type': type_id,
			"email": "",
			"unique_phone": "1",
			"cms_csrf": srf
		},
		'type': 'POST',
		'dataType': 'Json',
		success: function(data) {
			if(data.status == 0) {
				fgw_yy_wap_success();
				$(".co_tips_login").addClass("hidden");
				// $("body,html").removeClass("no_auto");
				$(".co_tips_success").removeClass("hidden");
				$(".co_tips_success .co_form .success").html(data.msg);
			} else {
				load_captcha();
				alert(data.msg);
			}
		}
	});
});
//立即预约弹框显示
$(".order,.yy_btn,.down_btn").click(function() {
	$(".co_tips_login").removeClass("hidden");
});
$(".co_tips_surebtn").click(function() {
	$(".co_tips_success").addClass("hidden");
})
//手机类型选择
$(".rdo").click(function() {
	$(this).addClass("on").siblings().removeClass("on");
});