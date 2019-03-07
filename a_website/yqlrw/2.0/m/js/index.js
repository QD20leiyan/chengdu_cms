var yyUrl = "/commonMethod/ajax-yuyue-verify.html" //常规预约
var yyUrl2 = "/commonMethod/ajax-yuyue.html" //常规预约提交
var  num_url='/commonMethod/ajax-get-subscribes.html';//预约人数
var srf = $('meta[name="csrf-token"]').attr('content');
//图片验证码刷新
var imgMarkIndex = 1;
//拉取预约人数
function ajaxInit() {
    $.post(num_url,{'name':'zjzg_total'},function(data) {
        if(data.msg == 'null' || data.msg == null){
            data.msg = 0;
        }
        // newNumber =parseInt(data.msg);
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
        $(".yy_num sapn").text(str);
    }, "json");
};
function load_captcha() {
	imgMarkIndex++;
	var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".co_captcha img").attr("src", data.url);
	}, 'json');
}
//图片验证码刷新
$(".co_captcha").click(function() {
	load_captcha();
});
//倒计时
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
//错误提示显示
function showErr(index, text) {
	$(".co_error").eq(index).addClass("co_err_show").html(text);
	$(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
	$(".co_error").eq(index).removeClass("co_err_show");
}

function init_yy() {
	//判断用户是否预约
	$.ajax({
		'url': yyUrl,
		'data': {},
		'type': 'GET',
		'dataType': 'Json',
		success: function(data) {
			if(data.status == -1) {
				$(".co_loginbtn").click(function() {
					alert(data.msg);
				})
			} else {
				$(".co_loginbtn").click(function() {
					$(".co_tips").show();
				})
			}
		}
	});
}

function change() {
	var data_id = $(".rdo.on").attr("data-id");
	if(data_id == 2) {
		$(".input_email").hide();
	} else if(data_id == 1) {
		$(".input_email").show();
	}
}

function isEmail(email) {
	var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	var temp = reg.test(email);
	return temp;
}
 function windowHidden(){
        $("html,body").css({
            "overflow":"hidden",
            "width":"100%",
            "height":"100%"
        });
    };
    function windowScroll(){
        $("html,body").css({
            "overflow":"visible",
            "width":"100%",
            "height":"auto"
        });
    }; 
 //    // 判断手机类型
	// function phont_type(){
	// 	var u = navigator.userAgent,
	// 		app = navigator.appVersion;
	// 	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	// 	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	// 		if(isAndroid) {
	// 			$(".yy_btn,.yy2_btn,.yyue_btn").removeClass("co_loginbtn");
	// 			$(".yy_btn,.yy2_btn,.yyue_btn").addClass("js_wap_down");
	// 			$(".yy_btn img,.yy2_btn img").attr("src","{$smarty.const.STATIC_DOMAIN}2.0/m/images/down.png?{$smarty.const.VERSION}");
	// 			$(".yyue_btn").html("立即下载");
	// 		}
	// 		if(isIOS) {
	// 			$(".yy_btn,.yy2_btn,.yyue_btn").addClass("co_loginbtn");
	// 			$(".yy_btn,.yy2_btn,.yyue_btn").removeClass("js_wap_down");
	// 			$(".yy_btn img").attr("src","{$smarty.const.STATIC_DOMAIN}2.0/m/images/yy11.png?{$smarty.const.VERSION}");
	// 			$(".yyue_btn").html("立即预约");
	// 		}
	// }
//导航变化
var clickNumber = 0;
$(function() {
	// init_yy();
	change();
	load_captcha();
	ajaxInit();
	// phont_type();
	//登录获取验证码
	$(".co_codebtn1").click(function() {
		var my_email = $(".co_useremail").val();
		var my_phone = $(".co_username").val();
		var captcha = $(".captcha").val();
		var type_id = $(".rdo.on").attr("data-id");
		// if(type_id == 1) {
		var type = "ios";
		// } else if(type_id == 2) {
		// 	var type = "android";
		// }
		if(type_id == 1 && !isEmail(my_email)) {
			$(".co_error.focus").html("邮箱不能为空哦");
			return;
		}
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
		$.post(yyUrl, {
			"phone": my_phone,
			'type': type,
			"captcha": captcha,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".co_codebtn1").css("pointer-events", "none");
				page_djs($(".co_codebtn1"), function() {
					$(".co_codebtn1").css("pointer-events", "auto");
				});
			} else {
				alert(data.msg);
				load_captcha();
			}
		}, 'json');
	});
	//预约提交请求
	$(".co_tips_yybtn").click(function() {
		var my_email = $(".co_useremail").val();
		var my_phone = $(".co_username").val();
		var co_codenum1 = $('.co_codenum1').val();
		var captcha = $(".captcha").val();
		// var type_id = $(".rdo.on").attr("data-id");
		var type = "ios";
		console.log(10);
		if(my_phone == "" || my_phone == undefined) {
			showErr(1, "手机号码不能为空哦");
			return;
		} else if(my_phone.length != 11) {
			showErr(1, "手机号码不正确哦");
			return;
		}
		hideErr(1);
		if(co_codenum1 == "" || co_codenum1 == undefined) {
			showErr(2, "验证码不能为空哦");
			return;
		}
		// if(type_id == 1) {
		// 	var type = "ios";
			if(my_email == "" || !isEmail(my_email)){
				$(".co_error.focus").html("邮箱不能为空哦");
				return;
			}else{
			my_email = $(".co_useremail").val();
			$(".co_error.focus").html("<span> 注：</span>为了保证您能成功接收本次封测信息和测试安装包，请如实填写");
			}
		// }
		// if(type_id == 2) {
		// 	var type = "android";
		// }
		hideErr(2);
		$.ajax({
			'url': yyUrl2,
			'data': {
				'phone': my_phone,
				'type': type,
				'yzm': co_codenum1,
				"email": my_email,
				"cms_csrf": srf
			},
			'type': 'POST',
			'dataType': 'Json',
			success: function(data) {
				if(data.status == 0) {
					console.log(type);
					alert("恭喜你，预约成功~");
					$(".co_tips").hide();
					$('.co_username').val("");
					$('.co_codenum1').val("");
					$('.co_codenum2').val("");
					$('.co_username1').val("");
					$('.co_code1').val("");
					$('.captcha').val("");
					$(".co_useremail").val("");
					//$('.co_incode').val("");
					$(".co_error").removeClass("co_err_show");
					$(".co_error.focus").html("<span> 注：</span>为了保证您能成功接收本次封测信息和测试安装包，请如实填写");
				} else {
					alert(data.msg);
					load_captcha();
					// console.log(14);
				}
			}
		});
	});
	var clickNumber2 = 0;
  $(".top_down").click(function(e){
    e.stopPropagation();
    if(clickNumber2 % 2 == 0) {
    $(".down_list").slideDown(400);
    $(".header_nav").stop().slideUp();
    } else {
      $(".down_list").slideUp(400);
    }
    clickNumber2++;
    clickNumber=0;
  })
  $(".down_list li,.fade").click(function() {
    $(".down_list").slideUp(400);
    clickNumber2=0;
  })
	$(".h_nav,.h_nav2").on("click", function(e) {
		e.stopPropagation();
		if(clickNumber % 2 == 0) {
			$(".d_t_t").addClass("d_t_t_tran");
			$(".d_t_m").addClass("d_t_m_tran");
			$(".d_t_b").addClass("d_t_b_tran");
			$(".header_nav").stop().slideDown();
			$(".down_list").slideUp(400);
			clickNumber2=0;
		} else {
			$(".d_t_t").removeClass("d_t_t_tran");
			$(".d_t_m").removeClass("d_t_m_tran");
			$(".d_t_b").removeClass("d_t_b_tran");
			$(".header_nav").stop().slideUp();
		}
		clickNumber++;
	});
	$(".header_nav li,.fade,.header_nav").click(function() {
		$(".d_t_t").removeClass("d_t_t_tran");
		$(".d_t_m").removeClass("d_t_m_tran");
		$(".d_t_b").removeClass("d_t_b_tran");
		$(".header_nav").stop().slideUp();
	})
	$(".header_nav li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	$(".last_li a").click(function() {
		$(".li_mask").stop().fadeIn();
		$(".wx_code").stop().fadeIn();
	});
	$(".li_close").click(function() {
		$(".li_mask").stop().fadeOut();
		$(".wx_code").stop().fadeOut();
	});
	$(".news-list li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".news-info li.info").eq(index).removeClass("hide").siblings().addClass("hide");
	});
	$(".s_game_title li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".s_game_list>li").eq(index).removeClass("hide").siblings().addClass("hide");
	});
	//登录弹框显示
	$(".co_loginbtn").click(function() {
		$(".co_tips").show();
		windowHidden();
		// if($(window).scrollTop() > 0){
		// 	alert(111);
		// 	$('.co_tips').css({"position":"fixed"});
		// }
	});

	// // $(window).scroll(function(){
	// // 	console.log(111);
	// // 	$(window).scrollTop = 0;
	// // });
	// $(window).scroll(function(){
	// 	$('.co_tips').css({"position":"fixed"});
	// })
	
	// $('input').focus(function(){
	// 	if($(window).scrollTop() > 0){
	// 		$('.co_tips').css({"position":"absolute"});
	// 	}
	// 	$('.co_tips').css({"position":"absolute","top":$(window).scrollTop()});
	// })
	//登录弹框关闭
	$(".co_tips_close").click(function() {
		$(".co_tips").hide();
		$('.co_username').val("");
		$('.co_codenum1').val("");
		$('.co_codenum2').val("");
		$('.co_username1').val("");
		$('.co_code1').val("");
		$('.captcha').val("");
		$(".co_useremail").val("");
		//$('.co_incode').val("");
		$(".co_error").removeClass("co_err_show");
		$(".co_error.focus").html("<span> 注：</span>为了保证您能成功接收本次封测信息和测试安装包，请如实填写");
		windowScroll();
	});
	//手机类型选择
	$(".rdo").click(function() {
		$(this).addClass("on").siblings().removeClass("on");
		change();
	});
	$(".content3 .cont6-box").click(function() {
		$(".content3 .cont6-con").removeClass("hide");
		var index = $(this).index();
		$(".cont6-con .cont6-dialog").eq(index).removeClass("hide").siblings().addClass("hide");
	})
	$(".cont6-con").click(function() {
		$(".cont6-con").addClass("hide");
	});
	$(".weixin_btn").click(function() {
		$(".wechat").show();
	});
	$(".wechat").click(function() {
		$(".wechat").hide();
	});
	//出现立即预约浮层
	$(window).scroll(function() {
		var scroHei = $(window).scrollTop(); //滚动的高度
		if(scroHei >800) {
			$('.yyue_bg').fadeIn();
		}else {
			$('.yyue_bg').fadeOut();
		}
	})
	//出现立即预约浮层
	$(window).scroll(function() {
		var scroHei = $(window).scrollTop(); //滚动的高度
		if(scroHei >10) {
			$('.yyue_bg2').fadeIn();
		}else {
			$('.yyue_bg2').fadeOut();
		}
	})
	var minAwayBtm = 60;  // 距离页面底部的最小距离
		$(window).scroll(function() {
		        var awayBtm = $(document).height() - $(window).scrollTop() - $(window).height();
		    if (awayBtm <= minAwayBtm) {
		        $(".yyue_bg").addClass("active");
		    }else{
		    	$(".yyue_bg").removeClass("active");
		    }
	});
		var minAwayBtm = 60;  // 距离页面底部的最小距离
		$(window).scroll(function() {
		        var awayBtm = $(document).height() - $(window).scrollTop() - $(window).height();
		    if (awayBtm <= minAwayBtm) {
		        $(".yyue_bg2").addClass("active");
		    }else{
		    	$(".yyue_bg2").removeClass("active");
		    }
	});
})