var send_url = "/h5/ca/ajax-get-verify.html";
var get_uel = "/h5/ca/qmtzs-wh.html";
var countdown = 60;

$(function() {
	$(".se_put .s_put").on("click", function() {
		$(this).children(".p_con").addClass("active");
		$(this).siblings().children(".p_con").removeClass("active");
	})
	$(".close").click(function() {
		$(".login").hide();
	});

	$(".g_code").click(function() {
		var phone = $(".phone").val();
		var username = $(".username").val();
		if(username == "" || username == undefined) {
			alert("请输入您的姓名");
			return false;
		} else if(phone == "" || phone == undefined) {
			$(".sign").css("visibility", "visible");
			return false;
		} else if(!(/^1[34578]\d{9}$/.test(phone))) {
			$(".sign").css("visibility", "visible");
			return false;
		} else {
			var srf = $('meta[name="csrf-token"]').attr('content');
			$.post(send_url, {
				"phone": phone,
				"cms_csrf": srf,
				"u_name": 'ca_ent_wh',
				"city":"wh"
			}, function(data) {
				if(data.status == 0) {
					$(".sign").css("visibility", "hidden");
					sendemail();
				} else {
					alert(data.msg);
					$(".sign").css("visibility", "hidden");
				}
			}, 'json');
		}

	});
	$(".sure").click(function() {
		var phone = $(".phone").val();
		var username = $(".username").val();
		var code = $(".f_code").val();
		var srf = $('meta[name="csrf-token"]').attr('content');
		if(code == "" || code == undefined) {
			alert("验证码不能为空");
			return false;
		} else {
			$.post(get_uel, {
				"phone": phone,
				"u_name": username,
				"yzm": code,
				"cms_csrf": srf,
				"name":"ca_ent_wh",
				"city":"wh"
			}, function(data) {
				if(data.status == 0) {
					$(".q_code").text(data.code);
					$(".login").show();
					$("#g_code").val("获取验证码");
				} else {
					alert(data.msg);
				}
			}, 'json');
		}

	});

	function sendemail() {
		var obj = $("#g_code");
		settime(obj);
	}

	function settime(obj) { //发送验证码倒计时
		if(countdown == 0) {
			obj.attr('disabled', false);
			//obj.removeattr("disabled"); 
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
})