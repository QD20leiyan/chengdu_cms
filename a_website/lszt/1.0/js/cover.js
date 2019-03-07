//60s倒计时验证
var countdown = 60;
var is_focus = 0;

function sendemail() {
	var obj = $(".g_code");
	settime(obj);
};

function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		obj.attr('disabled', false);
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
//图片验证码
var imgMarkIndex = 1;

function load_captcha() {
	var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha").html(data.msg);
	}, 'json');
}

function textNum(num) {
	var textnum = num.toString();
	for(var i = 0; i < textnum.length; i++) {
		$('.yy_number ul').find('li').eq(6 - i).text(textnum.charAt(textnum.length - (i + 1)));
	}
}
var base = {
	isLogin: false,
	isYueyue: false,
	is_choose: 0,
	is_type: 0,
};
var srf = $("meta[name='csrf-token']").attr("content");
//获取预约人数
function yyNumber() {
	var url = '/common/get-yuyue-count.html';
	$.post(url, {
		"name": "lszt_total",
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			textNum(data.msg);
			$(".yy_renshu").text(data.msg);
		}
	}, "json");
};
//判断用户登录
function isLogin() {
	$.post("/site/get-user-info.html", {
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			var msg = data.msg.data;
			base.isLogin = true;
			if(msg.is_yuyue == 0) {
				base.isYueyue = false;
			} else if(msg.is_yuyue == 1) {
				base.isYueyue = true;
				$(".m_code").html(data.msg.data.gift_code);
				$(".success").show();
				$(".my_gift p").html(msg.gift_code);
				$(".m_code").html(msg.gift_code);
				$(".yuyue_number").html(msg.yuyue_num);
				$(".yuyue_p").removeClass("active");
				$(".yuyue_q").addClass("active");
			};
			base.is_choose = msg.is_choose;
			if(base.is_choose == 1) {
				$(".tt_code span").html(msg.new_player_gift_code);
			} else if(base.is_choose == 2){
				$(".tt_code span").html(msg.old_player_gift_code);
			}
			$(".before_denglu").removeClass("active");
			$(".after_denglu").addClass("active");
			$(".x_phone").html(data.msg.phone);
		} else {
			base.isLogin = false;
		}
	}, "json");
}
function isLogin2() {
	$.post("/site/get-user-info.html", {
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			var msg = data.msg.data;
			base.isLogin = true;
			if(msg.is_yuyue == 0) {
				base.isYueyue = false;
			} else if(msg.is_yuyue == 1) {
				base.isYueyue = true;
				$(".my_gift p").html(msg.gift_code);
				$(".m_code").html(msg.gift_code);
				$(".yuyue_number").html(msg.yuyue_num);
				$(".yuyue_p").removeClass("active");
				$(".yuyue_q").addClass("active");
			};
			base.is_choose = msg.is_choose;
			if(base.is_choose == 1) {
				$(".tt_code span").html(msg.new_player_gift_code);
			} else if(base.is_choose == 2){
				$(".tt_code span").html(msg.old_player_gift_code);
			}
			$(".before_denglu").removeClass("active");
			$(".after_denglu").addClass("active");
			$(".x_phone").html(data.msg.phone);
		} else {
			base.isLogin = false;
		}
	}, "json");
}
//点击筛选手机类型
$(".chenghao_ul li").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
});
//关闭弹窗
$(".close").click(function() {
	$(this).parent().parent().hide();
});
//点击登录弹出弹窗
$(".p_dl").click(function() {
	if(!base.isLogin) {
		if($(this).hasClass("btn")) {
			$(".c_login").addClass("active");
			$(".login").show();
		} else {
			$(".c_login").removeClass("active");
			$(".login").show();
		}
	} else if(base.isYueyue == false) {
		$(".select").show();
	} else if(base.isYueyue == true) {
		$(".success").show();
	}
});
//鼠标悬浮微信二维码
$(".nav_tab ul li:nth-child(1)").hover(function() {
	if($(".isLogin p:nth-child(1)").hasClass("active")) {
		$(".fl_wx").css("left", "243px");
		$(".fl_wx.wx2").css("left", "90px");
	} else {
		$(".fl_wx").css("left", "350px");
		$(".fl_wx.wx2").css("left", "201px");
	}
	$(".fl_wx").stop().fadeIn();
}, function() {
	$(".fl_wx").stop().fadeOut();
});
$(".fl_wx").hover(function() {
	$(this).stop().fadeIn();
}, function() {
	$(this).stop().fadeOut();
});
var clickTap = true;
//浮窗点击缩进
$(".op_close").click(function() {
	if(clickTap) {
		$(".float").addClass("active");
		clickTap = false;
	} else {
		$(".float").removeClass("active");
		clickTap = true;
	}
});
//左导航标记
$(window).scroll(function() {
	var scroll = $(this).scrollTop();
	if(scroll < 950) {
		//		$(".swiper-pagination").addClass("active");
		//		$(".swiper-pagination1").removeClass("active");
		$('.z_float').find('li').removeClass('swiper-pagination-bullet-active');
		$('.z_float').find("li[data-index='1']").addClass('swiper-pagination-bullet-active');
	} else if(scroll >= 700 && scroll < 1700) {
		//		$(".swiper-pagination").addClass("active");
		//		$(".swiper-pagination1").removeClass("active");
		$('.z_float').find('li').removeClass('swiper-pagination-bullet-active');
		$('.z_float').find("li[data-index='2']").addClass('swiper-pagination-bullet-active');
	} else if(scroll >= 1700 && scroll < 2400) {
		//		$(".swiper-pagination").addClass("active");
		//		$(".swiper-pagination1").removeClass("active");
		$('.z_float').find('li').removeClass('swiper-pagination-bullet-active');
		$('.z_float').find("li[data-index='3']").addClass('swiper-pagination-bullet-active');
	} else if(scroll >= 2400 && scroll < 3175) {
		//		$(".swiper-pagination").addClass("active");
		//		$(".swiper-pagination1").removeClass("active");
		$('.z_float').find('li').removeClass('swiper-pagination-bullet-active');
		$('.z_float').find("li[data-index='4']").addClass('swiper-pagination-bullet-active');
	}
});
//点击左侧导航跳转对应版块
$('.z_float').find('li').click(function() {
	var parent = $(this).parent();
	if($(this).attr('data-index') == 1) {
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	} else if($(this).attr('data-index') == 2) {
		$("html,body").animate({
			scrollTop: 950
		}, 500);
	} else if($(this).attr('data-index') == 3) {
		$("html,body").animate({
			scrollTop: 1900
		}, 500);
	} else if($(this).attr('data-index') == 4) {
		$("html,body").animate({
			scrollTop: 2847
		}, 500);
	} else {
		$("html,body").animate({
			scrollTop: 3796
		}, 500);
	}
})
$(".z_tab i").hover(function() {
	$(this).siblings().addClass("active");
}, function() {
	$(this).siblings().removeClass("active");
});
//点击头像小图弹出大图弹窗
$(".z_tab li").on("click", function() {
	$(".tc_img .tc_main .c_close").removeClass("c_close1");
	$(".tc_img .tc_main .c_close").css("right", "150px");
	var index = $(this).index() + 1;
	$(".big_img").attr("src", "");
	$(".big_img").attr("src", alt + "images/big" + index + ".jpg");
	$(".tc_img").stop().fadeIn();
});
//点击每日福利出弹窗
$(".btn1").on("click", function() {
	$(".tc_img .tc_main .c_close").addClass("c_close1");
	$(".tc_img .tc_main .c_close").css("right", "100px");
	var mr_img = $(".mr_gift").attr("src");
	$(".big_img").attr("src", "");
	$(".big_img").attr("src", mr_img);
	$(".tc_img").stop().fadeIn();
});
//点击关闭头像弹窗
$(".c_close").click(function() {
	$(this).parent().parent().fadeOut();
});
//最后版块切换
$(".tab_ul li").on("mouseover", function() {
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".tab_right li").eq(index).addClass("active").siblings().removeClass("active");
	$(".page li").eq(index).addClass("active").siblings().removeClass("active");
});
//$(".page li").on("click", function() {
//	var index = $(this).index();
//	$(this).addClass("active").siblings().removeClass("active");
//	$(".tab_right li").eq(index).addClass("active").siblings().removeClass("active");
//	$(".tab_ul li").eq(index).addClass("active").siblings().removeClass("active");
//});
//返回顶部
$(".back").click(function() {
	$("html,body").animate({
		scrollTop: 0
	}, 500);
});
//点击刷新图片验证码
$(".captcha").click(function() {
	load_captcha();
	is_focus = 2;
});
$(".s_put input").focus(function() {
	is_focus++;
	console.log(is_focus);
	if(is_focus == 1) {
		load_captcha();
	}
});
//点击我的礼包判断弹窗
$(".my_gift").click(function() {
	if(base.isYueyue == true && base.isLogin == true) {
		$(this).unbind();
		return;
	} else if(base.isLogin == false) {
		$(".login").show();
		return;
	} else if(base.isLogin == true && base.isYueyue == false) {
		$(".select").show();
		return;
	}
});
//点击预约弹出弹窗
$(".yuyue").click(function() {
	if(base.isYueyue == true && base.isLogin == true) {
		$(this).unbind();
		return;
	} else if(base.isLogin == false) {
		$(".c_login").addClass("active");
		$(".login").show();
		return;
	} else if(base.isLogin == true && base.isYueyue == false) {
		$(".select").show();
		return;
	}
});
//点击领取称号
//$(".active_img").click(function() {
//	var type = $(this).attr("data-type");
//	if(type == 1) { //大哥带你飞
//		$(".sure_title span").html("大哥带你飞");
//		$(".right_txt").html('<p>扫码马上领取</p><p>“大哥带你飞”福利</p>');
//		$(".link").attr("src", alt + "images/h_code.png");
//		$(".sure_lingqu").show();
//		$(".tt_code").css("visibility", "hidden");
//	} else { //萌新求照顾
//		if(!base.isLogin) {
//			$(".login").show();
//			return;
//		}
//		if(base.is_choose == 0) {
//			$(".chenghao").show();
//			if(type == 1) {
//				base.is_type = 2;
//				$(".chenghao_name").html("大哥带你飞");
//				$(".right_txt").html('<p>扫码马上领取</p><p>“大哥带你飞”福利</p>');
//			} else {
//				base.is_type = 1;
//				$(".chenghao_name").html("萌新求照顾");
//				$(".right_txt").html('<p>记得扫码关注公众号</p><p>获得更多礼包、资讯！</p>');
//			}
//		} else if(base.is_choose == 2) {
//			$(".sure_title span").html("大哥带你飞");
//			$(".right_txt").html('<p>扫码马上领取</p><p>“大哥带你飞”福利</p>');
//			$(".link").attr("src", alt + "images/h_code.png");
//			$(".sure_lingqu").show();
//			$(".tt_code").css("visibility", "hidden");
//		} else if(base.is_choose == 1) {
//			$(".sure_title span").html("萌新求照顾");
//			$(".right_txt").html('<p>记得扫码关注公众号</p><p>获得更多礼包、资讯！</p>');
//			$(".link").attr("src", alt + "images/wechat.png");
//			$(".sure_lingqu").show();
//			$(".tt_code").css("visibility", "visible");
//		};
//	}
//});
//点击领取称号
$(".c_lq").click(function() {
	if(!base.isLogin) {
		$(".c_login").removeClass("active");
		$(".login").show();
		return;
	}
	if(base.is_choose == 1 || base.is_choose == 2){
		$(".sure_lingqu").show();
		return;
	}
	console.log(base.is_choose);
	$(".chenghao").show();
});
//点击确定领取称号
$(".get_name").click(function (){
	var type = $(".chenghao_ul li.active").attr("data-number");
	$.post("/site/choose.html" , {
		"type" : type,
		"cms_csrf": srf
	} ,function (data){
		if(data.status == 0){
			if(type == 1){
				$(".tt_code span").text(data.new_player_gift_code);
				base.is_choose = 1;
				console.log(base.is_choose);
			} else if(type == 2){
				$(".tt_code span").text(data.old_player_gift_code);
				base.is_choose = 2;
				console.log(base.is_choose);
			}
			$(".chenghao").hide();
			$(".sure_lingqu").show();
		} else {
			alert(data.msg);
		}
	},"json");
});
//点击确定关闭弹窗
$(".queding").click(function() {
	$(".sure_lingqu").hide();
});
$(".s_queding").click(function() {
	$(".l_success").hide();
});
//点击我再想想按钮
$(".think").click(function() {
	$(".chenghao").hide();
});
//点击确认领取称号
//$(".make_sure").click(function() {
//	$.post("/site/choose.html", {
//		"type": base.is_type,
//		"cms_csrf": srf
//	}, function(data) {
//		if(data.status == 0) {
//			base.is_choose = 1;
//			$(".chenghao").hide();
//			if(base.is_type == 2) {
//				$(".sure_title span").html("大哥带你飞");
//				$(".link").attr("src", alt + "images/h_code.png");
//				$(".tt_code").css("visibility", "hidden");
//				$(".sure_lingqu").show();
//			} else if(base.is_type == 1) {
//				$(".sure_title span").html("萌新求照顾");
//				$(".link").attr("src", alt + "images/wechat.png");
//				$(".tt_code span").html(data.new_player_gift_code);
//				$(".tt_code").css("visibility", "visible");
//				$(".sure_lingqu").show();
//			}
//			isLogin();
//		} else {
//			alert(data.msg);
//		}
//	}, "json");
//});
//获取验证码
$(".g_code").click(function() {
	var phone = $(".phone").val();
	var t_yzm = $(".t_yzm").val();
	if(phone == "" || phone == undefined) {
		$(".phone").siblings("i").show();
		return;
	}
	if(phone.length != 11) {
		$(".phone").siblings("i").show();
		return;
	}
	if(t_yzm == "" || t_yzm == undefined) {
		(".t_yzm").siblings("i").show();
		return;
	}
	$(".wrong").hide();
	$.post("/common/get-login-verify.html", {
		"phone": phone,
		"captcha": t_yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			sendemail();
		} else {
			load_captcha();
			alert(data.msg);
		}
	}, "json");
});
//点击登录
$(".submit").click(function() {
	var phone = $(".phone").val();
	var yzm = $(".yzm").val();
	if(phone == "" || phone == undefined) {
		$(".phone").siblings("i").show();
		return;
	}
	if(phone.length != 11) {
		$(".phone").siblings("i").show();
		return;
	}
	if(yzm == "" || yzm == undefined) {
		$(".yzm").siblings("i").show();
		return;
	}
	$(".wrong").hide();
	$.post("/site/login.html", {
		"phone": phone,
		"yzm": yzm,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			if(data.msg.data.is_yuyue == 0) {
				$(".login").hide();
				$(".select").show();
			} else {
				$(".login").hide();
			}
			isLogin();
		} else {
			load_captcha();
			alert(data.msg);
		}
	}, "json");
});
//点击预约
$(".l_yy").click(function() {
	fgw_yy_pc();
	var type = "android";
	$.post("/site/yuyue.html", {
		"type": type,
		"cms_csrf": srf
	}, function(data) {
		if(data.status == 0) {
			$(".m_code").html(data.msg);
			$(".success").show();
			$(".select").hide();
			isLogin();
			fgw_yy_pc_success();
		} else {
			alert(data.msg);
		}
	}, "json");
});
//点击注销
$(".zhuxiao").click(function() {
	$.get("/site/logout.html", {}, function(data) {
		if(data.status == 0) {
			alert("注销成功");
			location.reload();
		} else {
			alert(data.msg);
		}
	}, "json");
});
//新闻对应内容显示
$(".news_box .hd ul li").click(function() {
	var index = $(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});
//点击关闭下悬浮框
$(".ob_close").click(function() {
	$(".downBg").addClass("active");
	$(".rightBg").addClass("active");
});
$(".ob_open").click(function() {
	$(".downBg").removeClass("active");
	$(".rightBg").removeClass("active");
});
//下浮框悬浮微信
$(".right_mess ul li:nth-child(1)").hover(function() {
	$(".d_float").stop().fadeIn();
}, function() {
	$(".d_float").stop().fadeOut();
});
$(".d_float").hover(function() {
	$(this).stop().fadeIn();
}, function() {
	$(this).stop().fadeOut();
});
//点击浮窗预约
$(".hh_yuyue").click(function (){
	if(base.isYueyue == true && base.isLogin == true) {
		$(".success").show();
		return;
	} else if(base.isLogin == false) {
		$(".c_login").addClass("active");
		$(".login").show();
		return;
	} else if(base.isLogin == true && base.isYueyue == false) {
		$(".select").show();
		return;
	}
});
$(function() {
	var swiper02 = new Swiper('.swiper-container2', {
		pagination: '.swiper-pagination2',
		slidesPerView: 1,
		paginationClickable: true,
		autoplayDisableOnInteraction: false,
		autoplay: 3000,
		loop: true
	});
	isLogin2();
	yyNumber();
	setInterval(function() {
		yyNumber();
	}, 60000);
	//初始化复制分享链接
	new Clipboard('#tc13_copyBtnz');
	new Clipboard('#tc14_copyBtnz');
	$(".fuzhi").click(function() {
		alert("已复制~");
	})
	$("#tc14_copyBtnz").click(function(){
		alert("已复制~");
		// $(".sure_lingqu").hide();
//		$(".l_success").show();
	})
});