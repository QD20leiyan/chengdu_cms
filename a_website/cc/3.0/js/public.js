jQuery.fn.floatadv = function(loaded) {
	var obj = this;
	body_height = parseInt($(window).height());
	block_height = parseInt(obj.height());
	top_position = parseInt((body_height / 1.5) - (block_height / 1.5) + $(window).scrollTop());
	if(body_height < block_height) {
		top_position = 0 + $(window).scrollTop();
	};
	if(!loaded) {
		obj.css({
			'position': 'absolute'
		});
		obj.css({
			'top': top_position
		});
		$(window).bind('resize', function() {
			obj.floatadv(!loaded);
		});
		$(window).bind('scroll', function() {
			obj.floatadv(!loaded);
		});
	} else {
		obj.stop();
		obj.css({
			'position': 'absolute'
		});
		obj.animate({
			'top': top_position
		}, 100, 'linear');
	}
}

$(function() {
	var topNav = $("#topNav");
	$("#i_gfqd").hover(function() {
		topNav.css({
			display: 'block'
		});
	}, function() {
		topNav.css({
			display: 'none'
		});
	});

	topNav.hover(function() {
		topNav.css({
			display: 'block'
		});
	}, function() {
		topNav.css({
			display: 'none'
		});
	});
	
//	$(".down_float").click(function() {
//		$(".load_tips").removeClass("hidden");
//	});

	$(".loadtips_close").click(function() {
		$(".load_tips").addClass("hidden");
		$(".load_tel").val("");
		$(".codenum").val("");
	});

	$(".ios").click(function() {
		$(this).parent().removeClass("btn-1");
		$(".load_tel").val("");
		$(".codenum").val("");
		device_type = "ios";
		$(".load_div").removeClass("hidden");
		$(".order_div").addClass("hidden");
	});
	$(".ad").click(function() {
		$(this).parent().addClass("btn-1");
		$(".load_tel").val("");
		$(".codenum").val("");
		device_type = "android";
		$(".load_div").addClass("hidden");
		$(".order_div").removeClass("hidden");
	});

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
	$(".sendcode").click(function() {
		var my_phone = $(".load_tel").val();
		var my_code = $(".codenum").val();
		if(my_phone == "" || my_phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(!(/^1[34578]\d{9}$/.test(my_phone))) {
			alert("请输入正确的手机号码");
			return;
		}
		var srf = $('meta[name="csrf-token"]').attr('content');
		$.post(send_url, {
			"phone": my_phone,
			"type": 1,
			"device_type": device_type,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				page_djs($(".sendcode"), function() {
					//						alert('倒计时结束');
				});
			} else {
				alert(data.msg);
			}
		}, 'json');
	});
	$(".orderbtn").click(function() {
		var my_phone = $(".load_tel").val();
		var my_code = $(".codenum").val();
		if(my_code == "" || my_code == undefined) {
			alert("验证码不能为空");
			return;
		}
		var srf = $('meta[name="csrf-token"]').attr('content');
		$.post(order_url, {
			"phone": my_phone,
			"yzm": my_code,
			"type": device_type,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".load_tips").addClass("hidden");
				$(".load_tel").val("");
				$(".codenum").val("");
				alert(data.msg);
			} else {
				alert(data.msg);
			}
		}, 'json');
	});
})