var num_url = '/common/get-yuyue-count.html';//预约人数
var countdown = 60;
var is_yuyue=0;
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
	var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
}
//预约人数
function ajaxInit() {
	$.post(num_url, {
		'name': 'yuyue_total'
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
//获取预约百分比
function getPercent(number) {
	var percent = parseFloat((parseInt(number) / 10100).toFixed(2));
//	console.log(number);
//	if(number >= 100000) {
//		$(".first").removeClass("active");
//	}
//	if(number >= 300000) {
//		$(".second").removeClass("active");
//	}
//	if(number >= 500000) {
//		$(".third").removeClass("active")
//	}
//	if(number >= 800000) {
//		$(".four").removeClass("active");
//	}
//	if(number >= 1000000) {
//		$(".five").removeClass("active");
//	}
	return percent;
};
function num_tot() {
	$.post(num_url, {
		'name': 'yuyue_total'
	}, function(data) {
		if(data.msg == 'null' || data.msg == null) {
			data.msg = 0;
		}
		newNumber = parseInt(data.msg);
		// 预约人数进度条
		$(".jdt").css({
			width: getPercent(newNumber) + "%"
		});
		$(".text_number").text(data.msg);
	}, "json");
}
$(function() {
	var countdown = 60;
	num_tot();
//	ajaxInit();
//	setInterval(function() {
//		ajaxInit();
//	}, 60000);
	var srf = $("meta[name='csrf-token']").attr("content");
	//点击预约弹窗预约框
	$(".yy_btn,.btn").click(function() {
		$(".login").show();
	});
	//点击发送验证码
	$(".g_code").click(function() {
		var phone = $(".phone").val();
		var t_yzm = $(".t_yzm").val();
		var type = $("ul.c_yuyue li.active").attr("data-id");
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
		$.post("/commonMethod/ajax-yuyue-verify", {
			"phone": phone,
			"captcha": t_yzm,
			"unique_phone":"1",
			"type":type,
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
	//用户点击预约
	$(".denglu").click(function() {
		fgw_yy_pc();
		var phone = $('.phone').val();
		var type = $("ul.c_yuyue li.active").attr("data-id");
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
		$.post("/commonMethod/ajax-yuyue", {
			"phone": phone,
			"yzm": yzm,
			"type":type,
			"email":"",
			"unique_phone":"1",
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				fgw_yy_pc_success();
				$(".login").hide();
				$(".message").show();
				$(".message p").html(data.msg);
			} else {
				load_captcha();
				alert(data.msg);
			}
		}, "json");
	});
	//新闻类别切换
	$(".news_ul li").click(function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".news_list ul").eq(index).addClass("active").siblings().removeClass("active");
	});
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
	$("ul.c_yuyue li").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	//点击确定关闭弹窗
	$(".sure").click(function (){
		$(this).parent().parent().hide();
	});
	//点击刷新图片验证码
	$(".captcha i").click(function() {
		$(this).hide();
		$(".captcha img").show();
		load_captcha();
	});
	$(".captcha img").click(function(){
        load_captcha();
    })
})