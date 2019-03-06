$(function() {
//	$(".kun_plan_btn").click(function() {
//		$(".login_kun").show();
//		$(".mask").show();
//	});

	$(".login_close").click(function() {
		$(".login_kun").hide();
		$(".mask").hide();
	});

	$(".kun_plan_download").hover(function() {
		$(".kun_plan_code").stop().fadeIn();
	}, function() {
		$(".kun_plan_code").stop().fadeOut();
	});

	$(".kun_plan_code").hover(function() {
		$(this).stop().fadeIn();
	}, function() {
		$(this).stop().fadeOut();
	});
	$(".k_tab li").on("click" , function (){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".t_con li").eq(index).addClass("active").siblings().removeClass("active");
	})
//	function check_email($email) {
//		var myemail = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
//		if(!myemail.test($email.val())) {
//			return false;
//		} else {
//			return true;
//		}
//	};
//	$("#submit").click(function() {
//		if($("#check_name").val() != "" && $("#check_phone").val() != "" && $("#check_mod").val() != "" && $("#check_sifu").val() != "") {
//			$.post(url, {
//				cms_csrf: $('meta[name="csrf-token"]').attr('content'),
//				name: $("#check_name").val(),
//				phone: $("#check_phone").val(),
//				qq: $("#check_qq").val(),
//				email: $("#check_mail").val(),
//				address: $("#check_address").val(),
//				mod: $("#check_mod").val(),
//				sifu: $("#check_sifu").val()
//			}, function(data) {
//				if(data.status == 0) {
//					$(".login_tab").show().children("p").html("加入成功");
//					$(".login_tab").fadeOut(1500);
//				} else {
//					alert(data.msg);
//				}
//			}, 'json');
//		} else {
//			$(".login_tab").show().fadeOut(1500);
//		}
//	});

});
