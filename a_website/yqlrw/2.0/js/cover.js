var countdown = 0;

function isEmail(email) {
	var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	var temp = reg.test(email);
	return temp;
}
//图片验证码刷新
var imgMarkIndex = 1;

function tupian() {
	imgMarkIndex++;
	var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
}
$(function() {
	var countdown = 60;
	$(".type_select li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".mail").val("");
		$(".phone").val("");
		$(".s_put input:nth-child(1)").val("");
		if(index == 0) {
			$(".chuxian").show();
			$(".yuyue1 .yy_con").css("height", "500px");
		} else {
			$(".chuxian").hide();
			$(".yuyue1 .yy_con").css("height", "430px");
		}
	});
	$(".pub_btn,.pub_btn1").click(function() {
		$(".yuyue1").show();
	});
	$(".c_close").click(function() {
		$(".yuyue1").hide();
	});
	//点击导航跳转对应区域
	//点击礼包跳到对应游戏区域
	$('.nav_ul li').on('click', function(e) {
        $('.nav_ul').find('li').removeClass('active');
        $(this).addClass('active');
		var id = $(this).attr("data-to");
		$('html,body').animate({
			scrollTop: $('#' + id).offset().top
		}, 500);
	});
    $('.header ul li').on('click', function(e) {
        var id = $(this).attr("data-to");
        $('html,body').animate({
            scrollTop: $('#' + id).offset().top
        }, 500);
    });
	//悬浮出现微信二维码
	$(".t_code").hover(function() {
		$(".xf_code").stop().fadeIn(500);
	}, function() {
		$(".xf_code").stop().fadeOut();
	});
	//返回顶部
	$(".back").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	});
	//点击礼包出现对应弹窗内容
	// $(".tab_i li").on("click", function() {
	// 	var index = $(this).index();
	// 	$(".t_con_bg").show();
	// 	$(".t_con_bg .t_con li").eq(index).addClass("active").siblings().removeClass("active");
	// });
	// $(".t_con_bg").click(function() {
	// 	$(this).hide();
	// 	$(".t_con_bg .t_con").children("li").removeClass("active");
	// });
    // $('.yue-list').find('.shop').click(function () {
    //     $('.tip').stop().fadeOut();
    //     if($('.shop-tip').css('display') == 'none'){
    //         $('.shop-tip').stop().fadeIn(500);
    //     }
    // });
    //$('.yue-list').find('.shop').hover(function () {
    //    $('.tip').stop().fadeOut();
    //    if($('.shop-tip').css('display') == 'none'){
    //        $('.shop-tip').stop().fadeIn(500);
    //    }
    //});
    // $('.yue-list').find('.money').click(function () {
    //     $('.tip').stop().fadeOut();
    //     if($('.money-tip').css('display') == 'none'){
    //         $('.money-tip').stop().fadeIn(500);
    //     }
    // });
    //$('.yue-list').find('.money').hover(function () {
    //    $('.tip').stop().fadeOut();
    //    if($('.money-tip').css('display') == 'none'){
    //        $('.money-tip').stop().fadeIn(500);
    //    }
    //});
    // $('.yue-list').find('.join').click(function () {
    //     $('.tip').stop().fadeOut();
    //     if($('.join-tip').css('display') == 'none'){
    //         $('.join-tip').stop().fadeIn(500);
    //     }
    // });
    //$('.yue-list').find('.join').hover(function () {
    //    $('.tip').stop().fadeOut();
    //    if($('.join-tip').css('display') == 'none'){
    //        $('.join-tip').stop().fadeIn(500);
    //    }
    //})
	//倒计时
	function sendemail() {
		var obj = $(".g_code");
		settime(obj);
	}

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
	}
	//获取手机验证码
	$(".g_code").click(function() {
		var email = $(".mail").val();
		var phone = $(".phone").val();
		var t_yzm = $(".t_yzm").val();
		// var type = $(".type_select li.active").attr("type");
		var type = 'ios';
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("请输入正确的手机号");
			return;
		}
		if(t_yzm == "" || t_yzm == undefined) {
			alert("请输入图形验证码");
			return;
		}
		// if($(".type_select li.active").attr("type") == "ios") {
		if(email == "" || email == undefined || !isEmail(email)) {
				alert("请输入邮箱~");
				return;
			}
		// }
		$.post(code_url, {
			"phone": phone,
			"captcha": t_yzm,
			"type": type,
			"cms_csrf": $('meta[name="csrf-token"]').attr('content')
		}, function(data) {
			if(data.status == 0) {
				console.log(1);
				sendemail();
			} else {
				tupian();
				alert(data.msg);
			}
		}, "json");
	});
	//点击预约按钮预约
	$(".submit").click(function() {
		var email = $(".mail").val();
		var phone = $(".phone").val();
		// var type = $(".type_select li.active").attr("type");
		var type = 'ios';
		var yzm = $(".i_code").val();
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("请输入正确的手机号");
			return;
		}
		// if($(".type_select li.active").attr("type") == "ios") {
		if(email == "" || email == undefined || !isEmail(email)) {
				alert("请输入邮箱~");
				return;
			}
		// }
		$.post(yy_url, {
			"email": email,
			"phone": phone,
			"yzm": yzm,
			"type": type,
			"cms_csrf": $('meta[name="csrf-token"]').attr('content')
		}, function(data) {
			if(data.status == 0) {
				alert("预约成功~");
				$(".yuyue1").hide();
			} else {
				tupian();
				alert(data.msg);
			}
		}, "json");
	});
	tupian();
	//点击刷新图片验证码
	$(".captcha").click(function() {
		tupian();
	});
})