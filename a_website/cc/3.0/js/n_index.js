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
};
//图片验证码
function tupian() {
	$.get("/site/captcha.html?refresh=1", {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
};
$(function() {
	var srf = $("meta[name='csrf-token']").attr("content");
	$(".float").floatadv();
	var mySwiper = new Swiper('.c_banner', {
		loop: true,
		// 如果需要分页器
		pagination: '.swiper-pagination',
		paginationClickable: true,
		simulateTouch : false,
	});
	var mySwiper = new Swiper('.s_ans', {
		loop: true,
		effect: 'fade',
		fade: {
			crossFade: true,
		},
		simulateTouch: false,
		nextButton: '.l_right',
		prevButton: '.l_left',
		pagination: '.l_ul',
		paginationClickable: true,
	});
	$(".tit_ul li").hover(function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".tab_news .txt_ul").eq(index).addClass("active").siblings().removeClass("active")
	}, function() {
		$(this).addClass("active")
	});

	$(".t_ul li").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
	});

	$(".new_tab li").hover(function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".n_list ul").eq(index).addClass("active").siblings().removeClass("active");
	}, function() {
		$(this).addClass("active");
	});
	$(".v_tab li").hover(function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".c_tab ul").eq(index).addClass("active").siblings().removeClass("active");
	}, function() {
		$(this).addClass("active");
	});
	$(".c_close").click(function (){
		$(this).parent().parent().hide();
	});
	$(".gift").click(function (){
		$(".c_login").show();
	});
	$(".captcha").click(function (){
		tupian();
	});
	$(".login_put .s_put input:nth-child(1)").on("focus" , function (){
		$(this).parent().addClass("active");
		$(this).parent().siblings().removeClass("active");
	})
	$(".g_code").click(function (){
		var phone = $(".phone").val();
		var t_yzm = $(".t_yzm").val();
		if(phone == "" || phone == undefined){
			alert("请输入正确的手机号");
			return
		}
		if(t_yzm == "" || t_yzm == undefined){
			alert("请输入正确的图形验证码");
			return;
		}
		$.post("/site/ajax-login-verify.html",{
			"phone": phone,
			"captcha":t_yzm,
			"cms_csrf": srf
		},function (data){
			if(data.status == 0){
				sendemail();
			} else if(data.status == 101){
				$(".price_txt").html(data.msg);
				$(".c_login").hide();
				$(".p_login").show();
			} else {
				alert(data.msg);
				tupian();
			}
		},"json");
	});
	$(".lglq").click(function (){
		var phone = $(".phone").val();
		var yzm = $(".yzm").val();
		if(phone == "" || phone == undefined){
			alert("请输入正确的手机号");
			return
		}
		if(yzm == "" || yzm == undefined){
			alert("请输入验证码");
			return;
		}
		$.post("/site/ajax-gold.html",{
			"phone": phone,
			"yzm":yzm,
			"cms_csrf": srf
		},function (data){
			if(data.status == 0){
				$(".price_txt").html(data.msg);
				$(".c_login").hide();
				$(".p_login").show();
			} else {
				alert(data.msg);
				tupian();
			}
		},"json");
	});
	new Clipboard('#tc7_copyBtn0');
		$("#tc7_copyBtn0").click(function() {
		alert("已复制");
	});
})