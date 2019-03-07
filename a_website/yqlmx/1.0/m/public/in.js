var public = {};
//返回顶部
public.goTop = function(obj) {
	if(obj) {
		obj.on("touchend", function() {
			$('html,body').animate({
				scrollTop: 0
			}, 300);
		})
	}
}
var countdown = 60;
$(function() {
	$(".o_btn1").click(function() {
		$(".login").show();
	});
	$(".lo_close").click(function() {
		$(".login").hide();
	});
	$(".t_close").click(function (){
		$(".login_tc").hide();
	});
	$(".e_code").click(function() {
		if($(".h_phone").val() == "") {
			alert("请输入手机号")
		} else if($(".h_phone").val().length != 11) {
			alert("请输入正确的11位手机号")
		} else {
			$.post('/commonMethod/get-verify.html', {
				type: 7,
				cms_csrf: $('meta[name="csrf-token"]').attr('content'),
				phone: $(".h_phone").val(),
				device_type: "android"
			}, function(data) {
				if(data.status == 0) {
					sendCode();
				} else {
					alert(data.msg)
				}
			}, 'json');
		}
	});
	$(".s_tj").click(function() {
		if($(".h_phone").val() == "") {
			alert("请输入手机号")
		} else if($(".h_phone").val().length != 11) {
			alert("请输入正确的11位手机号")
		} else if($(".s_code").val() == "") {
			alert("请输入验证码")
		} else {
			$.post('/commonMethod/yuyue', {
				device_type: 7,
				type: "android",
				yzm: $(".s_code").val(),
				cms_csrf: $('meta[name="csrf-token"]').attr('content'),
				phone: $(".h_phone").val()
			}, function(data) {
				if(data.status == 0) {				
					$('.login').hide();
					$('.login_tc').show();
				} else {
					alert(data.msg);
				}
			}, 'json');
		}
	});
	$(".l_close").click(function() {
		$(".h_phone").val("");
	})

	function sendCode() {
		var obj = $(".e_code");
		settime(obj);
	};

	function settime(obj) { //发送验证码倒计时
		if(countdown == 0) {
			obj.attr('disabled', false);
			//obj.removeattr("disabled"); 
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

	var clicknum = 1;
	$("header .js_a").click(function() {
		if(clicknum % 2 !== 0) {
			$(this).siblings(".nav-content1").slideDown();
		} else {
			$(this).siblings(".nav-content1").slideUp();
		}
		clicknum++;
	});
});