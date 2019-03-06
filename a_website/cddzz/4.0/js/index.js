var srf = $('meta[name="csrf-token"]').attr('content');
var yy_url = "/commonMethod/yuyue";
var code_url = "/commonMethod/get-verify";
var countdown = 60;
//倒计时
function sendemail() {
	var obj = $(".g_code");
	settime(obj);
}

function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("免费获取验证码");
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
$(function() {
	var mySwiper = new Swiper(".banner", {
		loop: true,
		autoplay: 3000,
		simulateTouch: false,
		// 如果需要分页器
		pagination: '.swiper-pagination',
		paginationClickable: true,
	});

	$(".top_title ul li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".m_news ul").eq(index).addClass("active").siblings().removeClass("active");
	});

	//获取预约百分比
	function getPercent(number) {
		var percent = parseFloat((parseInt(number) / 10000).toFixed(2));
		if(number >= 100000) {
			$(".first").addClass("active");
		}
		if(number >= 400000) {
			$(".second").addClass("active");
		}
		if(number >= 700000) {
			$(".third").addClass("active")
		}
		if(number >= 1000000) {
			$(".four").addClass("active");
		}
		return percent;
	};
	var newNumber = $(".jdt").attr("data-type");
	$(".jdt").css({
		width: getPercent(newNumber) + "%"
	});
	// $(".btn").click(function() {
	// 	$(".x_login").show();
	// });
	// $('.app').click(function() {
	// 	$('.login').show();
	// });
	 $(".c_yy1").click(function() {
		$(".x_login").hide();
		$(".login").show();
	});
	$(".close").click(function() {
		$(this).parent().parent().hide();
	});

	function Init() {
		$.get("commonMethod/captcha.html?refresh=1", {}, function(data) {
			$(".i_code img").attr("src", data.url);
		}, 'json');
	}
	$(".i_code").click(function() {
		Init();
	});
	$(".g_code").click(function() {
		var phone = $(".phone").val();
		var g_code = $("#g_code").val();
		var i_code = $("#i_code").val();
		console.log(g_code);
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return
		}
		if(g_code == "" || g_code == undefined) {
			alert("图片验证码不能为空");
			return
		}
		$.post(code_url, {
			"captcha": g_code,
			"phone": phone,
			"type": 1,
			"device_type": "ios",
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				sendemail();
			} else {
				Init();
				alert(data.msg);
			}
		}, "json");
	});
	$(".c_yy").click(function() {
		var phone = $(".phone").val();
		var g_code = $("#g_code").val();
		var i_code = $("#i_code").val();
		$.post(yy_url, {
			"yzm": i_code,
			"phone": phone,
			"type": 1,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				alert("恭喜您预约成功~");
				$(".login").hide();
				$('.phone').val("");
				$("#g_code").val("");
				$("#i_code").val("");
			} else {
				alert(data.msg);
			}
		}, "json");
	});
})