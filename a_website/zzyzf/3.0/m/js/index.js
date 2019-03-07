function stop() {
	$("html,body").css({
		"overflow": "hidden",
		"width": "100%",
		"height": "100%"
	});
};

function move() {
	$("html,body").css({
		"overflow": "visible",
		"width": "100%",
		"height": "auto"
	});
};
//60s倒计时验证
var countdown = 60;
var is_focus=0;

// function sendemail() {
// 	var obj = $(".g_code");
// 	page_djs(obj);
// };
// function settime(obj) { //发送验证码倒计时
// 	if(countdown == 0) {
// 		obj.attr('disabled', false);
// 		obj.val("获取验证码");
// 		countdown = 60;
// 		return;
// 	} else {
// 		obj.attr('disabled', true);
// 		obj.val("重新发送(" + countdown + ")");
// 		countdown--;
// 	}
// 	setTimeout(function() {
// 		settime(obj)
// 	}, 1000)
// };
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
//点击弹出预约弹窗
$(".p_yuyue").click(function() {
	$(".tc").show();
	$(".login").show();
	$(".login_success").hide();
	$(".pub_img").show();
	stop();
})
//点击关闭弹窗
$(".k_close").click(function() {
	$(".tc").hide();
	move();
});
//设备类型切换
$(".select_ul li").click(function (){
	$(this).addClass("active").siblings().removeClass("active");
})
//预约
var srf = $('meta[name="csrf-token"]').attr('content');
//点击发送验证码
$(".g_code").click(function (){
	var phone = $(".phone").val();
	var t_yzm = $(".t_yzm").val();
	var type = $(".select_ul li.active").attr("data-type");
	if(phone == "" || phone == undefined) {
		alert("手机号码不能为空哦");
		return;
	}
	if(phone.length != 11){
		alert("手机号码不正确哦");
		return;
	}
//	if(t_yzm == "" || t_yzm == undefined){
//		alert("验证码不能为空哦");
//		return;
//	}
	$.post("/commonMethod/ajax-yuyue-verify" , {
		"phone":phone,
		"captcha":t_yzm,
		"type":type,
		"unique_phone":"1",
		"scene":"2",
		"cms_csrf":srf
	} , function(data){
		if(data.status == 0){
			page_djs($(".g_code"), function() {
					$(".g_code").css("pointer-events", "auto");
			});
		} else if(data.status == -2){
			alert(data.msg);
			load_captcha();
			$(".tupian").show();
		} else {
			if(data.msg == "您已经预约过了，请勿重复预约"){
				$(".login").hide();
                $(".pub_img").hide();
                $(".login_success .login_title p").html("您已预约!");
                $(".login_success .login_tip1").html("您已预约《战争与征服》");
                $(".login_success .login_tip2").html("前往官方Q群(144616927)集结备战,豪华补给将在组织内发放。");
				$(".login_success").addClass("active").show();
			} else {
				alert(data.msg);
			}
			load_captcha();
		}
	},"json");
})
//点击预约
$(".btn_yuyue").click(function (){
	fgw_yy_wap();
	var phone = $(".phone").val();
	var yzm = $(".yzm").val();
	var type = $(".select_ul li.active").attr("data-type");
	if(phone == "" || phone == undefined) {
		alert("手机号码不能为空哦");
		return;
	}
	if(phone.length != 11){
		alert("手机号码不正确哦");
		return;
	}
//	if(yzm == "" || yzm == undefined){
//		alert("验证码不能为空哦");
//		return;
//	}
	$.post("/commonMethod/ajax-yuyue.html" , {
		'phone':phone,
		'yzm':yzm,
		'type':type,
		"email":"",
		"unique_phone":"1",
		"scene":"2",
		"cms_csrf":srf
	} , function (data){
		if(data.status == 0){
			fgw_yy_wap_success();
			$(".login").hide();
			$(".pub_img").hide();
			$(".login_success .login_title p").html("预约成功!");
            $(".login_success .login_tip1").html("恭喜您，成功预约《战争与征服》");
			$(".login_success .login_tip2").html("前往官方Q群(144616927)集结备战,豪华补给将在组织内发放。");
			$(".login_success").addClass("active").show();
		} else {
			if(data.msg == "您已经预约过了，请勿重复预约"){
				$(".login").hide();
                $(".pub_img").hide();
                $(".login_success .login_title p").html("您已预约!");
                $(".login_success .login_tip1").html("您已预约《战争与征服》");
                $(".login_success .login_tip2").html("前往官方Q群(144616927)集结备战,豪华补给将在组织内发放。");
				$(".login_success").addClass("active").show();
			} else {
				alert(data.msg);
			}
		}
	},"json");
});
//点击确定关闭弹窗
$(".sure").click(function (){
	$(".login_success").hide();
	$(".tc").hide();
	move();
})
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
	imgMarkIndex++;
	var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha img").attr("src" , data.url);
		$(".captcha img").show();
		$(".captcha p").hide();
	}, 'json');
}
$(".captcha").click(function (){
	load_captcha();
	is_focus=2;
})
var clickNumber = 0;
$(function() {
	$(".index_slider-ul li:first").addClass("active");
	$(".main2 .banner_juese .banner .slide:first").show();
	
	$(".weixin_btn").click(function() {
		$(".wechat").fadeIn(500);
	})
	$(".wechat").click(function() {
		$(".wechat").fadeOut(500);
	})
	$(".close").click(function() {
		$(".detail_tc").addClass("hidden");
		move();
		$(".peo_box img").addClass('hidden');
	})
	//关闭新增的弹窗
	$(".n_close").click(function() {
		$(this).parent().parent().hide();
	});
	//图片验证码焦点获取显示验证码
//$(".s_put input").focus(function(){
//	is_focus++;
//	console.log(is_focus);
//	if(is_focus==1){
//		load_captcha();
//	}
//});
	//角色切换
	var e = 0,
		t = $(".js_banner .slide");
	t.eq(0).show(), $(".index_slider-ul").find("li").click(function() {
		$(this).addClass("active").siblings().removeClass("active"), e = $(this).index(),
			t.eq(e).show().siblings().hide();
	});
	//点击军官介绍弹出对应弹窗
	$(".js_banner .slide").on("click", function() {
		var index = $(this).index();
		mySwiper6.slideTo(index);
		$(".r_tc").show();
	});
	//点击关闭游戏特色弹窗
	$(".c_close").click(function() {
		$(".show_img").hide();
	})
	//滚动动效
	function showani() {
		$(".ani").each(function(i, n) {
			var offset = $(n).offset();
			if(window.scrollY > offset.top - document.documentElement.clientHeight + $(n).height() / 2) {
				$(n).addClass("show-ani");
			}
		})
	}
	$(window).scroll(function(e) {
		showani();
	});
	showani();
})