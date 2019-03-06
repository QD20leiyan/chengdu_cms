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
	var srf = $("meta[name='csrf-token']").attr("content");
	var mySwiper = new Swiper('.left_banner', {
		autoplay: 2000,
		loop: true,
		simulateTouch: false,
		// 如果需要分页器
		pagination: '.swiper-pagination',
	});
	var mySwiper1 = new Swiper('.tab_pic', {
		autoplay: 2000,
		loop: true,
		simulateTouch: false,
		effect: 'fade',
		fade: {
			crossFade: true,
		},
		// 如果需要前进后退按钮
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		// 如果需要分页器
		pagination: '.swiper-pagination1',
		paginationType: 'fraction',
		paginationFractionRender: function(swiper, currentClassName, totalClassName) {
			return '<span class="' + currentClassName + '"></span>' +
				' / ' +
				'<span class="' + totalClassName + '"></span>';
		}
	});
	$(".news_ul li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".z_news ul").eq(index).addClass("active").siblings().removeClass("active");
	});
	$(".r_type>div").on("click", function (){
		$(this).addClass("active").siblings().removeClass("active");
	});
	$(".form_put .put_yzm input").on("focus" , function (){
		$(this).siblings(".put_img").addClass("active");
		$(this).parent().parent().siblings().find(".put_img").removeClass("active");
	});
	    // 足球活动弹窗
        $(".m2_close").click(function(){
            $(".mask2").hide();
            $(".m2_fix").show();
        })
        $(".m2_fix").click(function(){
            $(".mask2").show();
        })
	//$(".yuyue").click(function (){
	//	$(".login").show();
	//});
	$(".close").click(function (){
		$(".login").hide();
	});
	$(".last_li").hover(function (){
		$(".kf_phone").stop().fadeIn();
	},function (){
		$(".kf_phone").stop().fadeOut(300);
	});
	$(".captcha").click(function (){
		tupian();
	});
	$(".g_code").click(function (){
		var phone = $(".phone").val();
		var t_yzm = $(".t_yzm").val();
		if(phone == "" || phone == undefined){
			alert("请输入正确的手机号");
			return;
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
			} else {
				alert(data.msg);
				tupian();
			}
		},"json");
	});
	$(".yxyy").click(function (){
		var phone = $(".phone").val();
		var type = $(".r_type>div.active").attr("data-type");
		var yzm = $(".yzm").val();
		if(phone == "" || phone == undefined){
			alert("请输入正确的手机号");
			return;
		}
		if(yzm == "" || yzm == undefined){
			alert("请输入验证码");
			return;
		}
		$.post("/site/ajax-index-yy.html",{
			"phone": phone,
			"type":type,
			"yzm":yzm,
			"cms_csrf": srf
		},function (data){
			if(data.status == 0){
				$(".login").hide();
				$(".phone").val("");
				$(".t_yzm").val("");
				$(".yzm").val("");
				alert("恭喜您预约成功!");
			} else {
				$(".login").hide();
				$(".phone").val("");
				$(".t_yzm").val("");
				$(".yzm").val("");
				alert(data.msg);
				tupian();
			}
		},"json");
	});
	//ajaxInit();
	//setInterval(ajaxInit, 30000);
	function ajaxInit() {
		$.get("/site/ajax-get-num.html", function(data) {
			var str = String(data.msg);
			var newStr = "";
			var count = 0; 
			if(str.indexOf(".") == -1) {   
				for(var i = str.length - 1; i >= 0; i--) { 
					if(count % 3 == 0 && count != 0) {   
						newStr = str.charAt(i) + "," + newStr; 
					} else {   
						newStr = str.charAt(i) + newStr; 
					} 
					count++;   
				}   
				str = newStr; //自动补小数点后两位		   
			} else {   
				for(var i = str.indexOf(".") - 1; i >= 0; i--) { 
					if(count % 3 == 0 && count != 0) {   
						newStr = str.charAt(i) + "," + newStr; 
					} else {   
						newStr = str.charAt(i) + newStr; //逐个字符相接起来					 
					} 
					count++;   
				}   
				str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);   
			}
			$(".text_number").text(str);
		}, "json");
	};
	//图片验证码
	function tupian() {
		$.get("/site/captcha.html?refresh=1", {}, function(data) {
			$(".captcha img").attr("src", data.url);
		}, 'json');
	}
});
