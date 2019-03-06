$(function() {
	var srf = $('meta[name="csrf-token"]').attr('content');
	/*报名*/
	$(".sign a").click(function() {
		$(".zhe").show();
	});

	/*获取验证码*/
	$('.get').click(function() {
		var phone = $('.phone').val();
		if(!(/^1[34578]\d{9}$/.test(phone))) {
			$('.tip1').css('visibility', 'visible');
			return false;
		} else {
			$(this).css("pointer-events", "none");
			$.post('/verify/get-verify', {
				'phone': phone,
				"type": 5,
				"cms_csrf": srf
			}, function(data) {
				if(data.status == 0) {
					var $timeNum = 60;
					var $timeInter = setInterval(function() {
						$(".get").css("pointer-events", 'none');
						$(".get").text($timeNum + "s");
						$timeNum--;
						if($timeNum == 0) {
							$(".get").css("pointer-events", 'auto');
							clearInterval($timeInter);
							$(".get").text("获取验证码");
						}
					}, 1000);
				} else {
					alert(data.msg);
				}
			}, "json")
		}
	})

	/*下一步*/
	$(".next").click(function() {
		var phone = $('.phone').val();
		var yzm = $(".yanzheng").val();
		if(!(/^1[34578]\d{9}$/.test(phone))) {
			$('.tip1').css('visibility', 'visible');
			return false;
		} else if(yzm == '') {
			$('.tip2').css('visibility', 'visible');
			return false;
		} else {
			$.post("/verify/vote", {
				'phone': phone,
				"type": 5,
				"yzm": yzm,
				"cms_csrf": srf
			}, function(data) {
				if(data.status == 0) {
					$(this).parents('.zhe').hide();
					$(".zhe2").show();
					$(".tip2").css("visibility", "hidden");
				}else{
					alert(data.msg);
				}
			}, "json")
		}
	});
	$('.phone').keyup(function() {
		var phone = $('.phone').val();
		if((/^1[34578]\d{9}$/.test(phone))) {
			$('.tip1').css('visibility', 'hidden')
		}
	})

	/*删除*/
	$(".delete").click(function() {
		$(this).parents('.zhe').hide();
	});
	$(".delete2").click(function() {
		$(this).parents('.zhe2').hide();
	});

	/*性别选择*/
	$('.sex input').click(function() {
		$(this).siblings('ul').toggleClass('shoe');
	});
	$('.sex li').click(function() {
		var data = $(this).attr('data-role');
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parents('.sex').find('input').val(data);
		$(this).parent().toggleClass('shoe');
		var txt = $(this).parent().siblings('input').val();
		if(txt != '') {
			$(this).parent().siblings('.tip3').css('visibility', 'hidden');
		}
	});
	//返回顶部
	$(".top").click(function() {
		var a;
		function back() {
			a = setInterval(go_top, 5);
		}

		function go_top() {
			if(window.scrollY <= 0) {
				clearInterval(a);
			} else {
				scrollTo(0, window.scrollY - 15);
			}
		}
		back();
	});
	/*提交*/
	$(".submit").click(function() {
		var phone = $('.phone').val();
		var zbmc = $(".zbmc").val();
		var zbpt = $(".zbpt").val();
		var zbxb = $(".zbxb").val();
		var fjhm = $(".fjhm").val();
		var yxqf = $(".yxqf").val();
		var jsmc = $(".jsmc").val();
		var qq = $(".qq").val();
		if(zbpt == "" || zbpt == undefined) {
			$(".zbpt").siblings('.tip3').css('visibility', 'visible');
			return false;
		}
		if(zbmc == "" || zbmc == undefined) {
			$(".zbmc").siblings('.tip3').css('visibility', 'visible');
			return false;
		}
		if(zbxb == "" || zbxb == undefined) {
			$(".zbxb").siblings('.tip3').css('visibility', 'visible');
			return false;
		}
		if(fjhm == "" || fjhm == undefined) {
			$(".fjhm").siblings('.tip3').css('visibility', 'visible');
			return false;
		}
		if(yxqf == "" || yxqf == undefined) {
			$(".yxqf").siblings('.tip3').css('visibility', 'visible');
			return false;
		}
		if(jsmc == "" || jsmc == undefined) {
			$(".jsmc").siblings('.tip3').css('visibility', 'visible');
			return false;
		}
		if(qq == "" || qq == undefined) {
			$(".qq").siblings('.tip3').css('visibility', 'visible');
			return false;
		}
		$.post("/verify/enlist", {
			'phone': phone,
			'zbmc': zbmc,
			'zbpt': zbpt,
			'zbxb': zbxb,
			'fjhm': fjhm,
			'yxqf': yxqf,
			'jsmc': jsmc,
			'qq': qq,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".zhe2").hide();
				$(".zhe").hide();
				alert(data.msg);
			} else {
				alert(data.msg);
			}
		}, "json")

	});
	$('.shuru input').keyup(function() {
		var text = $(this).val();
		if(text = !'') {
			$(this).siblings('.tip3').css('visibility', 'hidden');
		}
	})
})