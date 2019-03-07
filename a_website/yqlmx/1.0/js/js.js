$(function() {
	$.fn.tab_switch = function() {
		return this.each(function() { //tab导航元素
			$(this).find("ul li").click(function() {
				var index = $(this).index(); //获取当前划过元素的index值
				$(this).find("a").addClass("on").end().siblings().find("a").removeClass("on"); //改变当前状态
				$(".infor").eq(index).css({
					"display": "block"
				}).siblings().css({
					"display": "none"
				}); //切换内容
			})
		})
	}
	$(".right_nav").tab_switch();

	$('.right_nav ul li a').on('click', 'li', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

	$('.left_data .middle_data li').on("click", function() {
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$(".left_data").find(".list_pic").css("display", "none");
		$(".left_data").find(".list_pic").eq(index).css("display", "block");
	});

	$('.right_data .middle_data li').on("click", function() {
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$(".right_data").find(".list_video").css("display", "none");
		$(".right_data").find(".list_video").eq(index).css("display", "block");
	});
	
	$(".t_wx").hover(function (){
		$(".wx_fk").show()
	},function (){
		$(".wx_fk").hide()
	});
	
	$(".btn").click(function (){
		$(".login").show();
	});
	$(".lo_close").click(function (){
		$(".login").hide();
	});
	
	$(".an").click(function (){
		$(".login").show();
		$(".io_h").addClass("active");
	});
	$(".io").click(function (){
		$(".io_h").removeClass("active");
	});
	$(".z_tab a").on("click" , function (){
		var index = $(this).index();
		$(".m_tab .m_tab1").eq(index).addClass("active").siblings().removeClass("active");
	});
	$(".sj_num img").click(function (){
		$(".h_phone").val("");
	});
	$(".t_close").click(function (){
		$(".login_tc").hide();
	});
	$(".r_code").click(function() {
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
	$(".f_code").click(function() {
		if($(".h_phone").val() == "") {
			alert("请输入手机号")
		} else if($(".h_phone").val().length != 11) {
			alert("请输入正确的11位手机号")
		} else if($(".h_code").val() == "") {
			alert("请输入验证码")
		} else {
			$.post('/commonMethod/yuyue', {
				device_type:7,
				type: "android",
				yzm: $(".h_code").val(),
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

	function sendCode() {
		var obj = $(".r_code");
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
})