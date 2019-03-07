var yyUrl = "/commonMethod/ajax-yuyue-verify.html" //常规预约
var yyUrl2 = "/site/ajax-yuyue.html" //常规预约提交
var srf = $('meta[name="csrf-token"]').attr('content');
//图片验证码刷新
var imgMarkIndex = 1;
//拉取预约人数
//function ajaxInit1(){
//  $.get(num_url,{},function(data) {
//      if(data.ssp.num == 'null' || data.ssp.num == null){
//          data.ssp.num = 0;
//      }
//      if(data.cxp.num == 'null' || data.cxp.num == null){
//          data.cxp.num = 0;
//      }
//      var str = String(data.ssp.num);
//      var str2 = String(data.cxp.num);
//      var newStr = "";
//      var count = 0;
//      var newStr2 = "";
//      var count2 = 0;
//      if(str.indexOf(".") == -1) {
//          for(var i = str.length - 1; i >= 0; i--) {
//              if(count % 3 == 0 && count != 0) {
//                  newStr = str.charAt(i) + "," + newStr;
//              } else {
//                  newStr = str.charAt(i) + newStr;
//              }
//              count++;
//          }
//          str = newStr; //自动补小数点后两位      
//      } else {
//          for(var i = str.indexOf(".") - 1; i >= 0; i--) {
//              if(count % 3 == 0 && count != 0) {
//                  newStr = str.charAt(i) + "," + newStr;
//              } else {
//                  newStr = str.charAt(i) + newStr; //逐个字符相接起来          
//              }
//              count++;
//          }
//          str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
//      }
//       if(str2.indexOf(".") == -1) {
//          for(var i = str2.length - 1; i >= 0; i--) {
//              if(count2 % 3 == 0 && count2 != 0) {
//                  newStr2 = str2.charAt(i) + "," + newStr2;
//              } else {
//                  newStr2 = str2.charAt(i) + newStr2;
//              }
//              count2++;
//          }
//          str2 = newStr2; //自动补小数点后两位      
//      } else {
//          for(var i = str2.indexOf(".") - 1; i >= 0; i--) {
//              if(count2 % 3 == 0 && count2 != 0) {
//                  newStr2 = str2.charAt(i) + "," + newStr2;
//              } else {
//                  newStr2 = str2.charAt(i) + newStr2; //逐个字符相接起来          
//              }
//              count2++;
//          }
//          str2 = newStr2 + (str2 + "00").substr((str2 + "00").indexOf("."), 3);
//      }
//      $(".pk_double .cxp_num dt p").text(data.cxp.scale + "%");;
//      $(".pk_double .ssp_num dt p").text(data.ssp.scale + "%");
//  }, "json");
//};
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
//导航变化
var clickNumber = 0;
$(function() {
	load_captcha();
//	ajaxInit1();
	//登录获取验证码
	$(".co_codebtn1").click(function() {
		var my_phone = $(".co_username").val();
		var captcha = $(".captcha").val();
		var type_id = $(".rdo_type1 .rdo.on").attr("data-id");
		var sort_id = $(".rdo_type2 .rdo.on").attr("data-id");
		if(type_id == 1) {
		    var type = "ios";
		} else if(type_id == 2) {
			var type = "android";
		}
		if(sort_id == 3) {
		    var school = 1;
		} else if(sort_id == 4) {
			var school = 2;
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
			'school': school,
			"captcha": captcha,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				$(".co_codebtn1").css("pointer-events", "none");
				page_djs($(".co_codebtn1"), function() {
					$(".co_codebtn1").css("pointer-events", "auto");
				});
			} else {
				$(".co_tips3").show();
				$(".co_tips3 .text_info p").html(data.msg);
				load_captcha();
			}
		},'json');
	});
	getNum();
	getNumber();
	//获取预约人数
	function getNum() {
		$.post(num_url, {
			"name":"ssp_total",
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0){
				$(".pk_double .ssp_num dt p").html(data.msg);
			}
		}, "json")
	};
	function getNumber() {
		$.post(num_url, {
			"name":"cxp_total",
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0){
				$(".pk_double .cxp_num dt p").html(data.msg);
			}
		}, "json")
	};
	//预约提交请求
	$(".co_tips_yybtn").click(function() {
		fgw_yy_wap();
		var my_phone = $(".co_username").val();
		var co_codenum1 = $('.co_codenum1').val();
		var captcha = $(".captcha").val();
		var type_id = $(".rdo_type1 .rdo.on").attr("data-id");
		var sort_id = $(".rdo_type2 .rdo.on").attr("data-id");
		if(type_id == 1) {
		    var type = "ios";
		} else if(type_id == 2) {
			var type = "android";
		}
		if(sort_id == 3) {
		    var school = 1;
		} else if(sort_id == 4) {
			var school = 2;
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
		if(co_codenum1 == "" || co_codenum1 == undefined) {
			showErr(2, "验证码不能为空哦");
			return;
		}
		hideErr(2);
		$.ajax({
			'url': yyUrl2,
			'data': {
				'phone': my_phone,
				'type': type,
				'school': school,
				'yzm': co_codenum1,
				"cms_csrf": srf
			},
			'type': 'POST',
			'dataType': 'Json',
			success: function(data) {
				if(data.status == 0) {
					fgw_yy_wap_success();
					$(".co_tips").hide();
					$(".co_tips2").show();
					$('.co_username').val("");
					$('.co_codenum1').val("");
					$('.captcha').val("");
					$(".co_error").removeClass("co_err_show");
					ajaxInit1();
				} else {
					$(".co_tips3").show();
					$(".co_tips3 .text_info p").html(data.msg);
					load_captcha();
				}
			}
		});
	});
	$(".h_nav,.h_nav2").on("click", function(e) {
		e.stopPropagation();
		if(clickNumber % 2 == 0) {
			$(".d_t_t").addClass("d_t_t_tran");
			$(".d_t_m").addClass("d_t_m_tran");
			$(".d_t_b").addClass("d_t_b_tran");
			$(".header_nav").stop().slideDown();
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
		clickNumber = 0;
	})
	$(".news-list li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".news-info li.info").eq(index).removeClass("hide").siblings().addClass("hide");
	});
	//登录弹框显示
	$(".top_yyue,.yyue_btn").click(function() {
		$(".co_tips").show();
		windowHidden();
	});
	//登录弹框关闭
	$(".co_tips .co_tips_close,.co_tips2 .co_tips_close").click(function() {
		$(this).parent().parent().hide();
		$('.co_username').val("");
		$('.co_codenum1').val("");
		$('.captcha').val("");
		$(".co_error").removeClass("co_err_show");
		windowScroll();
	});
	$(".co_tips3 .co_tips_close").click(function() {
		$(this).parent().parent().hide();
	});
	//类型单选按钮
	$(".rdo").click(function() {
		$(this).addClass("on").siblings().removeClass("on");
	});
	$(".content3 .cont6-box").click(function() {
		$(".content3 .cont6-con").removeClass("hide");
		var index = $(this).index();
		$(".cont6-con .cont6-dialog").eq(index).removeClass("hide").siblings().addClass("hide");
	})
	//返回顶部
	$(".to_top").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	});
	$(window).scroll(function() {
		var scroHei = $(window).scrollTop(); //滚动的高度
		if(scroHei >300) {
			$(".to_top").show();
		}
	});
})