//60s倒计时验证
var countdown = 60;

function sendemail() {
	var obj = $(".k_code");
	settime(obj);
};

function sendCode() {
	var obj = $(".g_yzm");
	settime(obj);
};

function sendPode() {
	var obj = $(".o_code");
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
	imgMarkIndex++;
	var imgUrl = "/site/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
}
//获取url邀请码
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
	var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
	if(result != null) {
		return decodeURIComponent(result[2]);
	} else {
		return null;
	}
}
var base = {
	f_isLogin: false,
	s_isLogin: false,
	t_isLogin: false,
	sendYy: false,
	sendMark: false,
	sendLogin: false,
	sendLoginOut: false,
	luckyNumber: 0,
	phone: 0,
	id: 0,
};
var srf = $("meta[name='csrf-token']").attr("content");
var init_url = '/commonMethod/ajax-website.html?id=26';//ԤԼ����
$(function() {
	wap_cover();
	yx_getcaptcha(".login_first .captcha",".login_first");
	yx_getcaptcha(".phone_login .captcha",".phone_login");
	yx_getcaptcha(".login_second .captcha",".login_second");
	$.get(init_url, {}, function(data) {
		if(data.status == 0) {
			if(data.flag==1){
				$('.channel_name').css('display','block');
				$('.channel_tap_name').css('display','none');
				$('.no_channel').css('display','none');
			}else if(data.flag==2){
				$('.channel_tap_name').css('display','block');
				$('.channel_name').css('display','none');
				$('.no_channel').css('display','none');
			}
			if(data.msg.logo_img != '') $('#logo_img').attr('src',data.msg.logo_img);
			if(data.msg.icon_img != '') $('head').append('<link href="'+data.msg.icon_img+'" rel="SHORTCUT ICON">');
			if(data.msg.site_name != '')    $('#site_name').text(data.msg.site_name);
			if(data.msg.title != '')    $('#title').text(data.msg.title);
			if(data.msg.sub_title != '')    $('#sub_title').text(data.msg.sub_title);
			if(data.msg.wx_img != '')   $('#wx_img').attr('src',data.msg.wx_img);
			if(data.msg.wb_img != '')   $('#wb_img').attr('src',data.msg.wb_img);
			if(data.msg.tb_img != '')   $('#tb_img').attr('src',data.msg.tb_img);
			if(data.msg.wb_url != '')   $('#wb_url').text(data.msg.wb_url);
			if(data.msg.tb_url != '')   $('#tb_url').text(data.msg.tb_url);

			$('head').append(data.msg.web_count);
			$('meta[name="csrf-token"]').attr('content',data.csrf);

			if(data.msg.top_banner_status == 1 && data.msg.top_banner_img) {
				$('#top_middle_img').show();
				$('#top_middle_img').attr('src', data.msg.top_banner_img);
				$('.middle_big_img').attr('href', data.msg.top_banner_url);
				$('.middle_big_img img').attr('src', data.msg.top_banner_big_img);
				$("#top_banner_a").mouseover(function() {
					$(this).hide();
					$(".middle_big_img").show();
				});
				$(".middle_big_img").mouseout(function() {
					$(this).hide();
					$("#top_banner_a").show();
				})

				// $.get('//cc.yingxiong.com/commonMethod/ajax-banner-pv.html', {
				//     id: website
				// }, function() {});
			} else {
				$('#top_middle_img').hide();
			}
		} else {
			$('#top_middle_img').hide();
		}
	}, 'json');
	getUrl();
	$(".nav-list li").click(function() {
		var index = $(this).index();
		$(".bgp").eq(index).css({
			"display": "block"
		}).siblings(".bgp").css({
			"display": "none"
		});
		$(".bg").css("display" , "none");
	});
	isLogin();
	//初始化登录
	function isLogin() {
		$.post("/site/ajax-get-cj-user.html", {}, function(data) {
			if(data.msg[2] != null) {
				base.f_isLogin = true;
				$(".user_name").html(data.msg[2].phone);
				$(".f_user_info p:nth-child(1)").removeClass("active");
				$(".f_user_info p:nth-child(2)").addClass("active");
			} else {
				$(".user_name").html("");
				$(".f_user_info p:nth-child(1)").addClass("active");
				$(".f_user_info p:nth-child(2)").removeClass("active");
				base.f_isLogin = false;
			}
			if(data.msg[3] != null) {
				base.s_isLogin = true;
				$(".s_user_name").html(data.msg[3].phone);
				$(".s_user_info p:nth-child(1)").removeClass("active");
				$(".s_user_info p:nth-child(2)").addClass("active");
				$(".s_user_info").css("margin-right", "-85px");
				$(".share_url").html(data.msg[3].share_url + "#page3");
				var li_pic = data.msg[3].patch;
				for(var o in li_pic) {
					$(".spelling ul li").each(function(i, n) {
						var p = i + 1;
						if(li_pic[o] == p) {
							$(n).addClass("active");
						}
					});
				}
				if(li_pic.length < 6) {
					$(".second_lingqu").addClass("active");
				} else {
					$(".second_lingqu").removeClass("active");
				}
			} else {
				$(".s_user_name").html("");
				$(".s_user_info p:nth-child(1)").addClass("active");
				$(".s_user_info p:nth-child(2)").removeClass("active");
				$(".s_user_info").css("margin-right", "25px");
				$(".share_url").html("");
				$(".second_lingqu").addClass("active");
				$(".spelling ul li").removeClass("active");
				base.s_isLogin = false;
			}
			if(data.msg[1] != null) {
				base.t_isLogin = true;
				$(".t_user_name").html(data.msg[1].phone);
				$(".t_user_info p:nth-child(1)").removeClass("active");
				$(".t_user_info p:nth-child(2)").addClass("active");
			} else {
				$(".t_user_name").html("");
				$(".t_user_info p:nth-child(1)").addClass("active");
				$(".t_user_info p:nth-child(2)").removeClass("active");
				base.t_isLogin = false;
			}
		}, "json");
	};

	function getUrl() {
		var url = window.location.toString(); //进这个页面的url
		var id = url.split("#")[1];
		if(id) {
			var t = $("#" + id);
			t.removeClass("hide");
			t.siblings(".l_inf").hide();
		}
	}
	getList();
	//初始化获取服务器列表
	function getList(){
		$.post("/site/service-list.html", {}, function(data) {
			if(data.status == 0) {
				var html = "";
				for(var i = 0; i < data.msg.length; i++) {
					html += '<option data-type=' + data.msg[i].ServerId + '>' + data.msg[i].ServerName + '</option>';
				}
				$(".qufu").append(html);
				$(".qufu01").append(html);
			}
		}, "json");
	}
	//老玩家点击礼包判断弹窗
	$(".f_gift").click(function (){
		if(!base.f_isLogin) {
			$(".login_first").show();
			return;
		}
		$.post("/site/ajax-get-gift.html", {
			"type": "2",
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".copy-box .linqu_p").html("恭喜您获得回归礼包");
				$(".giftCode input").val(data.msg);
				$(".get_gift").show();
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	//回归活动点击登录
	$(".denglu").click(function() {
		$(".login_first").show();
	});
	//关闭弹窗
	$(".close").click(function() {
		$(this).parent().parent().hide();
	});
	//点击确定关闭弹窗
	$(".sure").click(function() {
		$(this).parent().parent().parent().hide();
	});
	//关闭弹窗
	$(".sure_close").click(function (){
		$(".out_time").hide();
	});
	//刷新验证码
	$(".captcha").click(function() {
		load_captcha();
	});
	//点击发送验证码（区服ID登录）
	$(".g_yzm").click(function() {
		var role_name = $(".role_name").val();
		var service_id = $('.qufu option:selected').attr("data-type");
		var phone = $(".f_phone").val();
		var t_yzm = $(".f_t_yzm").val();
		if(role_name == "" || role_name == undefined) {
			alert("请输入用户昵称");
			return;
		}
		if(service_id == "请选择区服" || service_id == undefined) {
			alert("请选择区服");
			return;
		}
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(t_yzm == "" || t_yzm == undefined) {
			alert("图形验证码不能为空");
			return;
		}
		$.post("/site/ajax-login-cj-verify.html", {
			"type": "2",
			"phone": phone,
			"service_id": service_id,
			"role_name": role_name,
			"captcha": t_yzm,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				sendCode();
			} else {
				load_captcha();
				$(".sorry-wrapper .sorry-box p").html(data.msg);
				$(".fail_pic").show();
				console.log(1);
			}
		}, "json");
	});
	//老玩家用户登录（区服昵称）
	$(".c_login_btn").click(function() {
		HLog.event("sm_cover_old_wap");
		var role_name = $(".role_name").val();
		var service_id = $('.qufu option:selected').attr("data-type");
		var phone = $(".f_phone").val();
		var t_yzm = $(".f_yzm").val();
		if(role_name == "" || role_name == undefined) {
			alert("请输入用户昵称");
			return;
		}
		if(service_id == "请选择区服" || service_id == undefined) {
			alert("请选择区服");
			return;
		}
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(t_yzm == "" || t_yzm == undefined) {
			alert("验证码不能为空");
			return;
		}
		$.post("/site/ajax-login-cj.html", {
			"type": "2",
			"phone": phone,
			"service_id": service_id,
			"role_name": role_name,
			"yzm": t_yzm,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".login_first").hide();
				isLogin();
			} else if(data.msg == "验证码不正确"){
				alert(data.msg);
			} else {
				load_captcha();
				$(".out_time").show();
			}
		}, "json");
	});
	//找朋友领福利活动点击领取福利判断状态
	$(".second_lingqu").click(function() {
		if(!base.s_isLogin) {
			$(".phone_login").show();
			return;
		}
		$.post("/site/ajax-get-gift.html", {
			"type": "3",
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".copy-box .linqu_p").html("恭喜您获得福利礼包");
				$(".giftCode input").val(data.msg);
				$(".get_gift").show();
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	//点击向好友求助
	$(".qiuzhu").click(function() {
		if(!base.s_isLogin) {
			$(".phone_login").show();
			return;
		}
		$(".share_friend").show();
	});
	//初始化复制分享链接
	new Clipboard('#tc11_copyBtnz');
	new Clipboard('#tc12_copyBtnz');
	$("#tc11_copyBtnz").click(function() {
		alert("已复制");
	});
	$("#tc12_copyBtnz").click(function() {
		alert("已复制");
	});
	//找朋友领福利登录
	$(".d_login").click(function() {
		$(".phone_login").show();
	});
	//找好友登录获取验证码
	$(".o_code").click(function() {
		var phone = $(".k_phone").val();
		var captcha = $(".p_t_yzm").val();
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(captcha == "" || captcha == undefined) {
			alert("图形验证码不能为空");
			return;
		}
		$.post("/site/ajax-login-cj-verify.html", {
			"type": "3",
			"phone": phone,
			"captcha": captcha,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				sendPode();
			} else {
				load_captcha();
				$(".sorry-wrapper .sorry-box p").html(data.msg);
				$(".fail_pic").show();
			}
		}, "json");
	});
	//找好友登录
	$(".tel_login").click(function() {
		HLog.event("sm_cover_find_wap");
		var phone = $(".k_phone").val();
		var yzm = $(".p_yzm").val();
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(yzm == "" || yzm == undefined) {
			alert("验证码不能为空");
			return;
		}
		$.post("/site/ajax-login-cj.html", {
			"type": "3",
			"phone": phone,
			"yzm": yzm,
			"invite_code" : getQueryString("invite_code"),
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".phone_login").hide();
				isLogin();
			} else {
				load_captcha();
				$(".sorry-wrapper .sorry-box p").html(data.msg);
				$(".fail_pic").show();
			}
		}, "json");
	});
	//新玩家点击领取礼包判断
	$(".t_gift").click(function() {
		if(!base.t_isLogin) {
			$(".login_second").show();
			return;
		}
		$.post("/site/ajax-get-gift.html", {
			"type": "1",
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".copy-box .linqu_p").html("恭喜您获得新玩家礼包");
				$(".giftCode input").val(data.msg);
				$(".get_gift").show();
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	//新玩家点击弹出登录框
	$(".n_login").click(function() {
		$(".login_second").show();
	});
	//新玩家登录点击获取验证码
	$(".k_code").click(function() {
		var role_name = $(".n_role_name").val();
		var service_id = $('.qufu01 option:selected').attr("data-type");
		var phone = $(".s_phone").val();
		var t_yzm = $(".s_t_yzm").val();
		if(role_name == "" || role_name == undefined) {
			alert("请输入用户昵称");
			return;
		}
		if(service_id == "请选择区服" || service_id == undefined) {
			alert("请选择区服");
			return;
		}
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(t_yzm == "" || t_yzm == undefined) {
			alert("图形验证码不能为空");
			return;
		}
		$.post("/site/ajax-login-cj-verify.html", {
			"type": "1",
			"phone": phone,
			"service_id": service_id,
			"role_name": role_name,
			"captcha": t_yzm,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				sendemail();
			} else {
				load_captcha();
				$(".sorry-wrapper .sorry-box p").html(data.msg);
				$(".fail_pic").show();
			}
		}, "json");
	});
	//新用户登录
	$(".b_login_btn").click(function (){
		var role_name = $(".n_role_name").val();
		var service_id = $('.qufu01 option:selected').attr("data-type");
		var phone = $(".s_phone").val();
		var t_yzm = $(".s_yzm").val();
		if(role_name == "" || role_name == undefined) {
			alert("请输入用户昵称");
			return;
		}
		if(service_id == "请选择区服" || service_id == undefined) {
			alert("请选择区服");
			return;
		}
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return;
		}
		if(t_yzm == "" || t_yzm == undefined) {
			alert("验证码不能为空");
			return;
		}
		$.post("/site/ajax-login-cj.html", {
			"type": "1",
			"phone": phone,
			"service_id": service_id,
			"role_name": role_name,
			"yzm": t_yzm,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".login_second").hide();
				isLogin();
			} else {
				load_captcha();
				$(".out_time").show();
			}
		}, "json");
	});
	//注销登录
	$(".f_zhuxiao").click(function (){
		$.post("/site/ajax-cj-logout.html", {
			"type" : "2",
			"cms_csrf": srf
		} , function (data){
			if(data.status == 0){
				alert("注销成功");
				isLogin();
			} else {
				$(".sorry-wrapper .sorry-box p").html(data.msg);
				$(".fail_pic").show();
			}
		},"json");
	});
	$(".s_zhuxiao").click(function (){
		$.post("/site/ajax-cj-logout.html", {
			"type" : "3",
			"cms_csrf": srf
		} , function (data){
			if(data.status == 0){
				alert("注销成功");
				isLogin();
			} else {
				$(".sorry-wrapper .sorry-box p").html(data.msg);
				$(".fail_pic").show();
			}
		},"json");
	});
	$(".t_zhuxiao").click(function (){
		$.post("/site/ajax-cj-logout.html", {
			"type" : "1",
			"cms_csrf": srf
		} , function (data){
			if(data.status == 0){
				alert("注销成功");
				isLogin();
			} else {
				$(".sorry-wrapper .sorry-box p").html(data.msg);
				$(".fail_pic").show();
			}
		},"json");
	});
	//点击返回主页
	$(".go-home").click(function (){
		$(".bgp").css("display" , "none");
		$(".bg").show();
	});
	$(".back_prev").click(function (){
		$(".bgp").css("display" , "none");
		$(".bg").show();
	});
	$(".form-box p input").focus(function (){
		load_captcha();
	});
});