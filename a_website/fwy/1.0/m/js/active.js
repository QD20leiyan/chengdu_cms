var login_Url = "/site/login-new.html" ;//登录
var logout_Url = "/site/logout-new.html" ;//注销登录
var yy_Url= "/site/yuyue-new.html" ;//预约提交
var user_url='/site/get-user-info-new.html';//用户信息
var person = {
		isLogin: false,
		type: "ios",
		gift_code:"",
		cms_csrf: $("meta[name='csrf-token']").attr("content")
	};
//控制弹窗滚动
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
//发送验证码倒计时
var countdown = 60;
function settime(obj) { 
		if(countdown == 0) {
			obj.css("pointer-events", "auto");
			obj.html("获取验证码");
			// obj.text("获取验证码");
			countdown = 60;
			return;
		} else {
			obj.css("pointer-events", "none");
			obj.html("重新发送(" + countdown + ")");
			// obj.text("重新发送(" + countdown + ")");
			countdown--;
		}
		setTimeout(function() {
			settime(obj)
		}, 1000)
	};
function sendemail() {
		var obj = $(".g_code");
		settime(obj);
}
//图片验证码
	function tupian() {
		$.get("/site/captcha.html?refresh=1", {}, function(data) {
			$("#captcha-img").attr("src", data.url);
		}, 'json');
	};
//点击更新图片验证码
	$("#captcha-img").click(function() {
		tupian();
	});
//初始判断是否登录
function isLogin() {
		var params = {};
		$.get(user_url,
			function(data) {
				if(data.status == 0) {
					person.isLogin = true;
					person.phone = data.msg.phone; //手机号
					person.is_yuyue = data.msg.data.is_yuyue; //是否预约
					person.gift_code= data.msg.data.gift_code;
					$(".login_info .no_login").addClass("hide");
					$(".login_info .suc_login").removeClass("hide");
					$(".login_info .suc_login span").html(person.phone);
					if(person.is_yuyue==0){
                        $(".cont2 .lb_Code").hide();
					    $(".cont2 .yy_lq").show();
					    $(".lb_Code span").html("");
					}else if(person.is_yuyue==1){
						if(person.gift_code =="" || person.gift_code == undefined){
							$(".cont2 .lb_Code").hide();
							$(".cont2 .yy_lq").show();
							$(".lb_Code span").html("");
						}else{
							$(".cont2 .lb_Code").show();
							$(".cont2 .yy_lq").hide();
							$(".lb_Code span").html(person.gift_code);
						}
					}
				} else {
					person.isLogin = false;
					$(".cont2 .lb_Code").hide();
					$(".cont2 .yy_lq").show();
					$(".cont2 .lb_Code span").html("");
					$(".login_info .no_login").removeClass("hide");
					$(".login_info .suc_login").addClass("hide");
					$(".login_info .suc_login span").html("");
				}
			}, 'json');
	}
$(function(){
	    isLogin();//初始化
	    //轮播按钮
	    var mySwiper = new Swiper('.swiper-container', {
		autoplay: 3000,
		autoplayDisableOnInteraction : false,
		effect: 'coverflow',
		slidesPerView: 3,
		centeredSlides: true,
		loop: true,
		coverflow: {
			rotate: 5,
			stretch: -80,
			depth: 200,
			modifier: 1,
		}
	});
	//弹窗关闭按钮
	 $('.close').click(function () {
        $(this).parent().parent().fadeOut(300);
        move();
    })
	 //点击图片验证
	 $(".capture span").click(function(){
	 	$(this).hide();
	 	tupian();
	 	$(".capture img").show();
	 })

     $(".yy_suc").click(function(){
            $(".dialog").hide();
                move();
     })
	 //点击获取验证码
	$('.g_code').click(function() {
		var phone = $('.phone').val();
		var img_code = $('.pic_code').val();
		$('.err').css("visibility", "hidden");
		if(phone == '' || phone == undefined) {
			$('.wrong1').css("visibility", "visible");
			$('.wrong2').css("visibility", "hidden");
			$('.wrong3').css("visibility", "hidden");
			return;
		} else if(phone.length != 11) {
			$('.wrong1').css("visibility", "visible");
			$('.wrong2').css("visibility", "hidden");
			$('.wrong3').css("visibility", "hidden");
			return;
		} else if(img_code == '' || img_code == undefined) {
			$('.wrong2').css("visibility", "visible");
			$('.wrong1').css("visibility", "hidden");
			$('.wrong3').css("visibility", "hidden");
			return;
		}
		$.post("/common/get-login-verify.html", {
			"phone": phone,
			"captcha": img_code,
			"cms_csrf": person.cms_csrf,
			"smsContent":"您正在登陆《明日决胜！》官方网站账户。欢迎来到《明日决胜！》的奇幻世界，小伙伴们在这里等你到来哦"
		}, function(data) {
			if(data.status == 0) {
				sendemail();
				$('.wrong').css("visibility", "hidden");
			} else {
				tupian();
				alert(data.msg);
			}
		}, "json");
	})
	//点击登录提交
	$(".l_sure").click(function(){
		var phone = $('.phone').val();
		var img_code = $('.pic_code').val();
		var code = $('.i_code').val();
		var str = /^1\d{10}$/;
		$('.err').css("visibility", "hidden");
		if(phone == '' || phone == undefined) {
			$('.wrong1').css("visibility", "visible");
			$('.wrong2').css("visibility", "hidden");
			$('.wrong3').css("visibility", "hidden");
			return;
		} else if(phone.length != 11) {
			$('.wrong1').css("visibility", "visible");
			$('.wrong2').css("visibility", "hidden");
			$('.wrong3').css("visibility", "hidden");
			return;
		} else if(img_code == '' || img_code == undefined) {
			$('.wrong2').css("visibility", "visible");
			$('.wrong1').css("visibility", "hidden");
			$('.wrong3').css("visibility", "hidden");
			return;
		}
		if(code == '' || code == undefined) {
			$('.wrong3').css("visibility", "visible");
			$('.wrong1').css("visibility", "hidden");
			$('.wrong2').css("visibility", "hidden");
			return;
		}
		$.post(login_Url, {
			"phone": phone,
			"yzm": code,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				$('.wrong').css("visibility", "hidden");
				$(".no_login").addClass("hide");
				$(".suc_login").removeClass("hide");
				$(".suc_login span").html(data.msg.phone);
				if(data.msg.data.is_yuyue == 1) {
					$('.login_tc').hide();
					$(".login_yy").hide();
					$(".cont2 .lb_Code").show();
					$(".cont2 .yy_lq").hide();
					$(".cont2 .lb_Code span").html(person.gift_code);
					move();
				} else if(data.msg.data.is_yuyue == 0){
					$('.login_tc').hide();
					$(".login_yy").show();
					$(".cont2 .lb_Code").hide();
					$(".cont2 .yy_lq").show();
					$(".cont2 .lb_Code span").html("");
					stop();
				}else{
					alert("网络出现故障");
					$('.login_tc').hide();
					$(".login_yy").hide();
					$(".cont2 .lb_Code").hide();
					$(".cont2 .yy_lq").show();
					$(".cont2 .lb_Code span").html("");
					move();
				}
				isLogin();
			}else{
				tupian();
				alert(data.msg);
			}
		}, "json");
	})
	//点击注销登录
	$(".logout").click(function() {
		$.post(logout_Url,{
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				location.reload();
			} else {
				alert(data.msg);
			}
		}, 'json');
	});
	//点击立即预约出弹窗
	 $(".yy_lq").click(function(){
	 	// isLogin();
	 	if(!person.isLogin){
           $(".login_tc").fadeIn(300);
           stop();
	 	}
        if(person.is_yuyue==0){
            $(".login_yy").show();
            $(".dialog").hide();
            $(".dialog .lb_Code span").html("");
            stop();
		}else if(person.is_yuyue==1){
			if(person.gift_code =="" || person.gift_code == undefined){
				$(".cont2 .lb_Code").hide();
				$(".cont2 .yy_lq").show();
				$(".lb_Code span").html("");
				$(".login_yy").hide();
				$(".dialog").hide();
				$(".dialog .lb_Code span").html("");
				alert("礼包码获取异常~")
				move();
			}else{
				$(".cont2 .lb_Code").show();
				$(".cont2 .yy_lq").hide();
				$(".lb_Code span").html(person.gift_code);
				$(".login_yy").hide();
				$(".dialog").show();
				$(".dialog .lb_Code span").html(person.gift_code);
				stop();
			}
		}
	 })
	 //点击选择设备类型
	$(".yy_ul li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	 //点击登录出弹窗
	 $(".login_btn").click(function(){
        $(".login_tc").fadeIn(300);
        stop();
	 })
	 //点击预约提交信息
	 $(".y_sure").click(function(){
	 	var type = $(".yy_ul li.active").data("type");
        $.post(yy_Url, {
        	"type":"android",
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
	 			$(".login_tc").hide();
        		$(".login_yy").hide();
        		$(".dialog").show();
        		stop();
        		$(".cont2 .lb_Code").show();
				$(".cont2 .yy_lq").hide();
				$(".lb_Code span").html(data.msg);
				isLogin();
			} else {
				alert(data.msg);
				$(".cont2 .lb_Code").hide();
				$(".cont2 .yy_lq").show();
				$(".lb_Code span").html("");
				stop();
				isLogin();
			}
		}, 'json');
	 })
	 //复制
        new Clipboard('#tc9_copyBtnz');
        $("#tc9_copyBtnz").click(function() {
        alert("已复制");
        });
         new Clipboard('#tc9_copyBtnz2');
        $("#tc9_copyBtnz2").click(function() {
        alert("已复制");
        });
})
       