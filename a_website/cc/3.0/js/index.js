//$(document).ready(function() {
	//var djs_timer = "";
	//var i_erro = $(".i_erro");
	//var myLogin = $("#myLogin");
	//var v_embed = '<embed id="myEmbed" src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high" width="640" height="360" align="middle" allowscriptaccess="always" flashvars="uu=58546ec681&vu=d36a4ff707&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash">';
    //
	//function init() {
	//	page_input_init();
	//	init_banner_video();
	//	list.init($(".list-item"));
	//}
	////初始化banner播放器
	//function init_banner_video() {
	//	var i_head = $(".i_head");
	//	var i_video = $(".i_video");
	//	var video_height = i_video.width() * 0.5;
	//	i_head.height(video_height + "px");
	//	i_video.height(video_height + "px");
	//}
    //
	////弹出登录框
	//function show_login_page() {
	//	myLogin.css({
	//		display: "block"
	//	})
	//	setTimeout(function() {
	//		myLogin.removeClass("i_lg_zc_hide");
	//	}, 10);
	//}
	////退出登录框
	//function out_login_page() {
	//	myLogin.addClass("i_lg_zc_hide");
	//	setTimeout(function() {
	//		myLogin.css({
	//			display: "none"
	//		})
	//	}, 210);
	//}
	////初始化登录输入框显示
	//function page_input_init() {
	//	$(".i_login_form input").val(null).blur();
	//}
	////英雄用户帐号登录和手机短信登录切换
	//function change_login(left) {
	//	$(".i_login_form").animate({
	//		"margin-left": left + "px"
	//	}, 200);
	//}
	////前端验证手机登录的手机号码是否正确
	//function is_ok_phone() {
	//	var my_input = $(".i_dx_login").find("input");
	//	var my_phone = my_input.eq(0).val();
	//	if(my_phone == "" || my_phone == undefined) {
	//		login_err(2, "手机号不能为空");
	//		return;
	//	}
    //
	//	if(!(/^1[34578]\d{9}$/.test(my_phone))) {
	//		login_err(2, "请输入正确的手机号码");
	//		return false;
	//	}
	//	return true;
	//}
	////倒计时
	//function page_djs(ele, callback) {
	//	var time = 60;
	//	if(ele) {
	//		ele.html("60s");
	//	}
	//	djs_timer = setInterval(function() {
	//		time--;
	//		ele.html(time + "s");
	//		if(time == 0) {
	//			clearInterval(djs_timer);
	//			ele.html("获取验证码");
	//			if(callback) {
	//				callback();
	//			}
	//		}
	//	}, 1000);
	//}
	////登录错误提示
	////index : 错误显示的标签下标
	////text ： 错误提示内容
	//function login_err(index, text) {
	//	i_erro.eq(index).html(text);
	//}
	////登录成功，显示欢迎用户
	//function login_success(user) {
	//	$("#myUserName").html(user);
	//	$(".i_login_ing").css({
	//		display: "none"
	//	});
	//	$(".i_login_end").css({
	//		display: "block"
	//	})
	//}
	////退出登录，显示登录界面
	//function login_quit() {
	//	$(".i_login_ing").css({
	//		display: "block"
	//	});
	//	$(".i_login_end").css({
	//		display: "none"
	//	})
	//}
	////页面事件
	////点击中英文切换
	//$(".language").click(function(){
	//	$.ajax({
	//		type:"get",
	//		url:"",
	//		data: function(){
	//
	//		},
	//		success: function(data){
	//
	//		}
	//	});
	//});
	////点击向下箭头滚动
	//$("#i_h_jt>img").click(function() {
	//	var scroll_offset = $("#c_content").offset();
	//	$("body,html").animate({
	//		scrollTop: scroll_offset.top
	//	}, 400);
	//});
	////弹出登录框
	//$("#i_login_btn").click(function() {
	//	change_login(0);
	//	setTimeout(function() {
	//		show_login_page();
	//	}, 210);
	//});
	////登录输入框
	//$(".i_login_form p").click(function() {
	//	$(this).css({
	//		display: "none"
	//	}).parent().children("input").focus();
	//});
	//$(".i_login_form input").focus(function() {
	//	$(this).parent().children("p").css({
	//		display: "none"
	//	});
	//});
	//$(".i_login_form input").keyup(function() {
	//	$(this).val($(this).val().replace(/(^\s+)|(\s+$)/g, ""));
	//});
	//$(".i_login_form input").blur(function() {
	//	var val = $(this).val();
	//	if(val == "") {
	//		$(this).parent().children("p").css({
	//			display: "block"
	//		});
	//	}
	//});
    //
	////点击登录提交按钮
	//$("#yx_login_btn").click(function() {
	//	//根据name值判断用户是否可以点击登录
	//	var name = $(this).attr("name");
	//	if(name){
	//		return;
	//	}
	//	var my_btn = $(this);
	//	var my_input = $(".i_yx_login").find("input");
	//	var my_user = my_input.eq(0).val();
	//
	//	if(my_user == "" || my_user == undefined) {
	//		login_err(0, "用户名不能为空");
	//		return;
	//	}
	//	login_err(0, "");
	//
	//	var my_pwd = my_input.eq(1).val();
	//	if(my_pwd == "" || my_pwd == undefined) {
	//		login_err(1, "密码不能为空");
	//		return;
	//	}
	//	login_err(1, "");
	//
	//	my_btn.attr("name","logining").html("登录中...");
	//	//这是发起登录验证
	//	var my_url = my_btn.attr("url");
	//	var my_takon = $("meta[name='csrf-token']").attr("content");
	//	$.ajax({
	//		url: my_url,
	//		type: "POST",
	//		data: {
	//			"username": my_user,
	//			"password": my_pwd,
	//			"cms_csrf": my_takon
	//		},
	//		success: function(data) {
	//			var data = JSON.parse(data);
	//			var status = data.status;
	//			switch(status) {
	//				case 0: {
     //                   out_login_page();
     //                   login_success(data.msg.username);
	//				}
	//					break;
     //               case -1: {
     //               	login_err(0,data.msg);
     //               	my_btn.attr("name","").html("登录");
     //               }
     //                   break;
     //               case false: {
     //               	login_err(1,data.msg);
     //               	my_btn.attr("name","").html("登录");
     //               }
     //               break;
     //               default: {
     //               	login_err(0,data.msg);
     //               	my_btn.attr("name","").html("登录");
     //               }
	//			}
	//		}
	//	});
	//});
	////关闭登录框
	//$(".i_lg_close").click(function() {
	//	out_login_page();
	//});
	////退出登录
	//$("#i_login_out").click(function(){
	//	var url = $(this).attr("url");
	//	$.ajax({
	//		type:"GET",
	//		url:url,
	//		success: function(data){
	//			var data = JSON.parse(data);
	//			var status = data.status;
	//			if(status == 0){
	//				login_quit();
	//			}else{
	//				alert(data.msg);
	//			}
	//		},
	//		error: function(err){
	//
	//		}
	//	});
	//});
	////点击出现弹窗播放器
	//$(".i-v-list li").on("click", function() {
	//	var v_src = $(this).attr("video-src");
	//	v_src = v_src + "&amp;auto_play=1&amp;gpcflag=1&amp;width=640&amp;height=360";
	//	$("#my_video").append(v_embed);
	//	$(".page_video_box").css({
	//		"display": "block",
	//		"opacity": "1",
	//		"transform": "scale(1,1)"
	//	});
	//	$("#myEmbed").attr("flashvars", v_src);
	//});
	////点击取消弹窗视频
	//$(".v_close").click(function() {
	//	var page_video_box = $(".page_video_box");
	//	page_video_box.css({
	//		"opacity": "0",
	//		"transform": "scale(0,0)"
	//	});
	//	setTimeout(function() {
	//		page_video_box.css({
	//			"display": "none"
	//		});
	//		$("#myEmbed").remove();
	//	}, 210);
	//});
    //
	//init();
//});
	//倒计时
	function page_djs(ele, callback) {
		var time = 60;
		if(ele) {
			ele.html("60s");
		}
		djs_timer = setInterval(function() {
			time--;
			ele.html((time<=0?0:time) + "s");
			if(time == 0) {
				clearInterval(djs_timer);
				ele.html("获取验证码");
				if(callback) {
					callback();
				}
			}
		}, 1000);
	}
	//下载弹框
	$(".i_h_xz").click(function(){
		$(".load_tips").removeClass("hidden");
	});

	$(".loadtips_close").click(function(){
		$(".load_tips").addClass("hidden");
		$(".load_tel").val("");
		$(".codenum").val("");
	});

	$(".ios").click(function(){
		$(this).parent().removeClass("btn-1");
		$(".load_tel").val("");
		$(".codenum").val("");
		device_type="ios";
		$(".load_div").removeClass("hidden");
		$(".order_div").addClass("hidden");
	});
	$(".ad").click(function(){
		$(this).parent().addClass("btn-1");
		$(".load_tel").val("");
		$(".codenum").val("");
		device_type="android";
		$(".load_div").addClass("hidden");
		$(".order_div").removeClass("hidden");
	});

	//发送验证码
	$(".sendcode").click(function(){
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
		$.post(send_url,{ "phone":my_phone,"type":1,"device_type":device_type,"cms_csrf":srf },function(data){
			if(data.status == 0){
				page_djs($(".sendcode"),function(){
//						alert('倒计时结束');
				});
			}else{
				alert(data.msg);
			}
		}, 'json');
	});

	//确认提交
	$(".orderbtn").click(function(){
		var my_phone = $(".load_tel").val();
		var my_code = $(".codenum").val();
		if(my_code == "" || my_code == undefined) {
			alert("验证码不能为空");
			return;
		}
		var srf = $('meta[name="csrf-token"]').attr('content');
		$.post(order_url,{ "phone":my_phone,"yzm":my_code,"type":device_type,"cms_csrf":srf },function(data){
			if(data.status == 0){
				$(".load_tips").addClass("hidden");
				$(".load_tel").val("");
				$(".codenum").val("");
				alert(data.msg);
			}else{
				alert(data.msg);
			}
		}, 'json');
	});


	//下载浮窗
	$('.down_bg .float_btn').click(function() {
		$('body').toggleClass('op');
		var img = $(this).attr("src");
		if (this.src.search("boult_in.png")!= -1) {
			this.src = "http://static.dev.yingxiong.com/cc/2.0/images/boult_out.png";
		} else {
			this.src = "http://static.dev.yingxiong.com/cc/2.0/images/boult_in.png";
		}
	});
	$(".and_dl").click(function(){
		$(".i_h_xz").click();
		$(".ad").click();
	});
	//$(".ios_dl").click(function(){
	//	$(".i_h_xz").click();
	//	$(".ios").click();
	//});

	//邮件发送弹窗
	$(".hero_user").click(function(){
		$(".email_tips").removeClass("hidden");
		$(".service,.emailbtn2").addClass("hidden");
		$(".contact,.emailbtn1").removeClass("hidden");
	});
	$(".hero_help").click(function(){
		$(".email_tips").removeClass("hidden");
		$(".contact,.emailbtn1").addClass("hidden");
		$(".service,.emailbtn2").removeClass("hidden");
	});
	$(".emailtips_close").click(function(){
		$(".email_tips").addClass("hidden");
		$(".email_name").val("");
		$(".email").val("");
		$(".email_msg").val("");
	});
	//确认提交
	$(".emailbtn").click(function(){
	var email_name = $(".email_name").val();
	var email = $(".email").val();
	var email_msg = $(".email_msg").val();
	if(email_name == "") {
		alert("Dear,Information cannot be empty!");
		return;
	}
	if(email=="") {
		alert("Dear,Information cannot be empty!");
		return;
	}
	if(email_msg=="") {
		alert("Dear,Information cannot be empty!");
		return;
	}
	var body="My Name is: "+email_name+"%0a%0d"
		+"My Email Address is: "+email+"%0a%0d"
		+"Message:"+"%0a%0d"+email_msg;
	$(".emailbtn1").attr("href","mailto:herogame@yingxiong.com?body="+body);
	$(".emailbtn2").attr("href","mailto:support@redtides.vip?body="+body);
	$(".email_tips").addClass("hidden");
	$(".email_name").val("");
	$(".email").val("");
	$(".email_msg").val("");
});


/*--------------------------------------------------赤潮主播页面----------------------------------------------------*/
var verify_url ='/commonMethod/vote-verify';
var check_url ='/commonMethod/vote';
var vote_url ='/site/vote-ajax';
var change_url ='/site/vote';
//登录弹框显示
$(".vote_login").click(function(){
	$(".anchorld_tips").removeClass("hidden");
});
//登录弹框关闭
$(".anchor_close").click(function(){
	$(".anchorld_tips").addClass("hidden");
	$(".anchor_tel").val("");
	$(".anchor_code").val("");
});
//手机号码实时验证
$(".anchor_tel").keyup(function(){
	var my_phone = $(".anchor_tel").val();
	if(my_phone == "" || my_phone == undefined) {
		$(".anchorld_tips .content>div p.error").removeClass("hidden");
		$(".anchorld_tips .content>div p.error").text("手机号码不能为空哦");
		$(".anchorld_tips .content>div .code button").removeClass("is_click");
		return;
	}
	if(!(/^1[34578]\d{9}$/.test(my_phone))) {
		$(".anchorld_tips .content>div p.error").removeClass("hidden");
		$(".anchorld_tips .content>div p.error").text("手机号码错误哦");
		$(".anchorld_tips .content>div .code button").removeClass("is_click");
		return;
	}
	//这个位置让获取验证码可点击
	$(".anchorld_tips .content>div p.error").addClass("hidden");
	$(".anchorld_tips .content>div .code button").addClass("is_click");

	//主播页面--发送验证码
	$(".is_click").click(function(){
		var my_phone = $(".anchor_tel").val();
		var srf = $('meta[name="csrf-token"]').attr('content');
		$.post(verify_url,{ "phone":my_phone,"type":4,"device_type":"","cms_csrf":srf },function(data){
			if(data.status == 0){
				page_djs($(".is_click"),function(){
//						alert('倒计时结束');
				});
			}else{
				alert(data.msg);
			}
		}, 'json');
	});

	//主播页面--登录验证
	$(".anchor_btn").click(function(){
		var my_phone = $(".anchor_tel").val();
		var my_code = $(".anchor_code").val();
		if(my_code == "" || my_code == undefined) {
			alert("验证码不能为空");
			return;
		}
		var srf = $('meta[name="csrf-token"]').attr('content');
		$.post(check_url,{ "phone":my_phone,"yzm":my_code,"type":4,"device_type":"","cms_csrf":srf },function(data){
			if(data.status == 0){
				setTimeout(function(){
				//重新加载页面
					location.reload();
				},20000);
				$(".anchorld_tips").addClass("hidden");
				alert(data.msg);
			}else{
				alert(data.msg);
			}
		}, 'json');
	});
});
//投票
$(".vote_click").click(function(){
	var id=$(this).attr("data-id");
	var tel=$(".vote_change").attr("data-user");
	var srf = $('meta[name="csrf-token"]').attr('content');
	$.post(vote_url,{ "u_id":id,"user":tel,"cms_csrf":srf },function(data){
		if(data.status == 1){
			alert("投票成功")
		}else{
			alert(data.msg);
		}
	}, 'json');

});
//换一批
$(".change_btn").click(function(){
	var srf = $('meta[name="csrf-token"]').attr('content');
	$.post(change_url,{ "status":true,"cms_csrf":srf },function(data){
		if(data.status == 1){
			var votetpl=$(".vote_box .vote_peo:eq(0)").clone(true);
			votetpl= $.extend({},votetpl);
			$(".vote_box").empty();
			for(var i in data.vote){
				var vote=data.vote[i];
				var votetep= votetpl.clone(true);
				votetep.find("img").attr('src',vote.portrait||'');
				votetep.find('.vote_name').text(vote.userName||'');
				votetep.find('.vote_from').text(vote.userTerrace||'');
				votetep.find('.vote_num').text(vote.popValue||'');
				votetep.find('.vote_act').attr('data-id',vote.id||'');
				$(".vote_box").append(votetep);
			}
		}else{

		}
	}, 'json');

});


