var num_url = '/commonMethod/ajax-get-new-subscribes';
var srf = $('meta[name="csrf-token"]').attr('content');
var clickTap = 0;
var is_yuyue=0;
var  yy_num_peo="";
//拉取预约人数
	//处理预约人数
	function getPercent(number) {
		var percent = parseFloat((parseInt(number) / 16000).toFixed(2));
		percent = percent > 100 ? 97 : percent;
		return percent;

	};
	function num_tot() {
		// $.post(num_url, {
		// 	'name': 'zjzg_total'
		// }, function(data) {
		// 	if(data.msg == 'null' || data.msg == null) {
		// 		data.msg = 0;
		// 	}

			newNumber = parseInt(yy_num_peo);
			$('.line-color').css({
				'height': getPercent(newNumber) + '%'
			});
			$(".light").css({
				'top': getPercent(newNumber) + '%'
			});
	}
function ajaxInit() {
	$.post(num_url, {
		'name': 'zjzg_total'
	}, function(data) {
		if(data.msg == 'null' || data.msg == null) {
			data.msg = 0;
		}
		// newNumber =parseInt(data.msg);
		var str = String(data.msg);
		yy_num_peo=data.msg;
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
		$(".y_person").text(str);
		num_tot();
	}, "json");
};

//60s倒计时验证
var countdown = 60;
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
function Init() {
	$.get("/site/ajax-get-captcha.html?refresh=1", {}, function(data) {
		$("#img-code-box").attr("src", data.url);
	}, 'json');
}
//图片验证码刷新
var imgMarkIndex = 1;
function load_captcha() {
	imgMarkIndex++;
	var imgUrl = "/site/ajax-get-captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$("#getMarkBtn1").html(data.msg);
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
var base = {
	isLogin: false,
	sendYy: false,
	sendMark: false,
	sendLogin: false,
	sendLoginOut: false,
	luckyNumber: 0,
	phone: 0,
	id: 0,
};
//正确提示
function showErr(index, text) {
	$(".err").eq(index).show().html(text);
}
//错误提示
function hideErr(index) {
	$(".err").eq(index).hide();
}
$(function() {
	ajaxInit();
	isLogin();
	load_captcha();
	// setInterval(function() {
	// 	ajaxInit();
	// }, 60000);
	function isLogin() {
		$.post("/site/ajax-get-user", {}, function(data) {
			if(data.status == 0) {
				base.isLogin = true;
				var msg = data.msg;
				$(".p_phone").html(msg.phone);
				$(".invite_num").html(msg.invite_num || "0");
				$(".before_denglu").removeClass("active");
				$(".after_denglu").addClass("active");
				$(".share_url").html(msg.share_url);
				$("#tc13_copyTextz").append(msg.share_url);
				is_yuyue=msg.is_yuyue;
				if(msg.guess_name == "法国"){
					$(".final_guess").find("p").html("法国");
					$(".final_guess").find("p").attr("data-name","法国");
					$(".b_img").attr("src" , alt+"images/faguo.png");
				} else if(msg.guess_name == "克罗地亚"){
					$(".final_guess").find("p").html("克罗地亚");
					$(".final_guess").find("p").attr("data-name","克罗地亚");
					$(".b_img").attr("src" , alt+"images/keluo.png");
				}
			} else {
				base.isLogin = false;
			}
		}, "json");
	};
	// 登录弹窗
	$(".btn .yue_btn,.header .yue_btn,.hongbao,.down_btn,.down_btn2").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
			if($(this).hasClass("yue_btn")||$(this).hasClass("hongbao")){
				clickTap=1;
			}else{
				clickTap=0;
			}
			console.log(clickTap);
		}else{
			if(is_yuyue==1){
				alert("您已经预约过了，请勿重复预约");
			}else{
				$(".yuyue").show();
			}
		}

	});
	$(".yuyue_btn").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		$(".yuyue").show();
	});
	$(".share_tc").click(function() {
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		$(".share").show();
	});
	$(".choose_duiwu>div").click(function() {
		var type_name = $(this).attr("data-name");
		var src = $(this).find("img").attr("src");
		var text = $(this).find("p").text();
		$(".b_img").attr("src", src);
		$(".b_img").attr("data-name", type_name);
		$(".final_guess p").text(text);
	});
	//点击预测
	$(".sure").click(function() {
		var guess = $(".b_img").attr("data-name");
		if(!base.isLogin) {
			$(".login").show();
			stop();
			return;
		}
		if(guess == "请选择预测"){
			alert("请选择队伍~");
			return;
		}
		$.post("/site/ajax-guess", {
			guess: guess,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				alert("预测成功~");
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	//点击跳转预测模块
	$('.yuce').on('click', function(e) {
		$('html,body').animate({
			scrollTop: $(".second_con").offset().top
		}, 500);
	});
	$(".denglu").click(function() {
		$(".c_login").addClass("active");
		$(".login").show();
		stop();
	})
	//弹框关闭
	$(".close").click(function() {
		$(this).parent().parent().hide();
		$(".err").removeClass("active");
		move();
		if(clickTap==1){
			$('html,body').animate({scrollTop: $('.middle').offset().top}, 500);
			clickTap=0;
		}
		console.log(clickTap);
	});


	//图片验证码刷新
	$("#getMarkBtn1").click(function() {
		load_captcha();
	});
	//预约获取验证码
	$(".g_code").click(function() {
		var my_phone = $(".phone").val();
		var captcha = $(".captcha").val();	
		if(my_phone == "" || my_phone == undefined) {
			showErr(0, "手机号码不能为空哦");
			return;
		} else if(my_phone.length != 11) {
			showErr(0, "手机号码不正确哦");
			return;
		}
		hideErr(0);
		if(captcha == "" || captcha == undefined) {
			showErr(1, "验证码不能为空哦");
			return;
		}
		hideErr(1);
		$.post("/site/ajax-login-verify", {
			"phone": my_phone,
			"captcha": captcha,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				sendemail();
			} else {
				alert(data.msg);
				load_captcha();
			}
		}, 'json');
	});
	//预约请求
	$(".yyue").click(function() {
		
		var my_phone = $(".phone").val();
		var co_codenum1 = $('.mark').val();
		var code_url = $(".code_url").attr("data-id");
		if(my_phone == "" || my_phone == undefined) {
			showErr(0, "手机号码不能为空哦");
			return;
		} else if(my_phone.length != 11) {
			showErr(0, "手机号码不正确哦");
			return;
		}
		hideErr(0);
		if(co_codenum1 == "" || co_codenum1 == undefined) {
			showErr(2, "验证码不能为空哦");
			return;
		}
		hideErr(2);
		$.ajax({
			'url': "/site/ajax-login",
			'data': {
				'phone': my_phone,
				'yzm': co_codenum1,
				"cms_csrf": srf
			},
			'type': 'POST',
			'dataType': 'Json',
			success: function(data) {
				if(data.status == 0) {
					
					$(".login").hide();
					$(".err").removeClass("active");
					is_yuyue=data.msg.is_yuyue;
					if(is_yuyue== 0) {
						$(".yuyue").show();
					}else{
						alert("您已经预约过了，请勿重复预约");
					}
					move();
					isLogin();

					if(clickTap==0){
						alert("登录成功");
					}
				} else {
					alert(data.msg);
				}
			}
		});
	});
	//手机类型选择
	$(".r_type>div").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	//点击预约
	$(".l_yuyue").click(function (){
		fgw_yy_wap();
		var type = $(".r_type>div.active").attr("data-id");
		$.post("/site/ajax-yyue" , {
			"type" : type,
			"invite_code":getQueryString("invite_code"),
			"cms_csrf": srf
		} , function (data){
			if(data.status == 0){
				fgw_yy_wap_success();
				if(type=="ios"){
				    window.location.href="https://itunes.apple.com/cn/app/id1404801698";
			    }
				else if(type=="android"){
            	    alert("预约成功");
					$(".yuyue").hide();
				}
				
			} else {
				alert(data.msg);
			}
		},"json");
	});
	//点击注销
	$(".zhuxiao").click(function (){
		$.post("/site/ajax-login-out" ,{} , function (data){
			if(data.status == 0){
				alert("注销成功");
				location.reload();
			} else {
				alert(data.msg);
			}
		},"json");
	});
	new Clipboard('#tc13_copyBtnz');
	$(".fuzhi").click(function() {
		alert("已复制~");
	});
});