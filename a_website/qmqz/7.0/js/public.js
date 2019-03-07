$(function() {

	//页面事件
	mouse_over_style1($(".top_nav"), $(".top_hide_nav"));
	mouse_over_style1($(".top_wx"), $(".wx_mark"));
	show_hide_down();
	get_rewards();
});

//===公用方法===
//页面导航选中显示
function page_nav_active(index) {
	$(".top_nav li").removeClass("active").eq(index).addClass("active");
}

//切换显示模块方法
function changeShowContent(ele1, ele2, index) {
	ele1.removeClass("active").eq(index).addClass("active");
	ele2.removeClass("active").eq(index).addClass("active");
}

//添加轮播icon
function add_move_icon(ele) {
	var html = "";
	var iconBox = ele.find(".mo-icon");
	var mo_item_len = ele.find(".mo-item").length;
	//console.log(mo_item_len);
	if(mo_item_len == 1) {
		move_init_fun(ele);
		return;
	}

	for(var i = 0; i < mo_item_len; i++) {
		var icon_class = "";
		if(i == 0) {
			icon_class = "active";
		}
		html = html + "<i class='" + icon_class + "'></i>";
	}
	iconBox.append(html);
	move_init_fun(ele);
}

//初始化轮播
function move_init_fun(ele) {
	var myMove = new move();
	var icon = ele.find(".mo-icon i");
	myMove.init({
		ele: ele,
		loop: true,
		loopTime: 3000,
		auto: true
	});
	icon.click(function() {
		var index = icon.index($(this));
		myMove.itemMoveto(index);
	});
}

//鼠标移入效果1
function mouse_over_style1(ele1, ele2) {
	ele1.hover(function() {
		ele2.css({
			display: "block"
		});
		setTimeout(function() {
			ele2.addClass("show");
		}, 10);
	}, function() {
		ele2.removeClass("show");
		setTimeout(function() {
			ele2.css({
				display: "none"
			});
		}, 200);
	});
}

//点击隐藏和显示下载悬浮框
function show_hide_down() {

	$(".q_f_icon").click(function() {
		var state = $(this).attr("show");
		if(state) {
			$(".q_float").animate({
				"right": "60px"
			}, 200);
			$("#bshare-custom, #q_back").animate({
				"right": "280px"
			}, 200);
			$(this).attr({
				"show": "",
				"class": "show"
			});
		} else {
			$(".q_float").animate({
				"right": "-176px"
			}, 200);
			$("#bshare-custom, #q_back").animate({
				"right": "40px"
			}, 200);
			$(this).attr({
				"show": "true",
				"class": "hide"
			});
		}
	})
}

//领取奖励方法
function get_rewards() {

	var gift = $(".gift");
	var cms_csrf = $("meta[name='csrf-token']").attr("content");

	//$(".q_lq").click(function() {
	//	show_tc();
	//});

	$(".gift_close").click(function() {
		hide_tc();
	});

	$(".getCodeBtn").click(function() {
		var theThis = $(this);
		if(theThis.attr("click")) {
			return;
		}
		theThis.attr("click", "true");
		getCode(theThis);
	});

	$(".signGiftBtn").click(function() {
		var theThis = $(this);
		if(theThis.attr("click")) {
			return;
		}
		theThis.attr("click", "true");
		signGift(theThis);
	});

	function show_tc() {
		gift.css({
			display: "block"
		});
		setTimeout(function() {
			gift.css({
				opacity: "1"
			})
		}, 20);
	}

	function hide_tc() {
		gift.css({
			opacity: "0"
		});
		setTimeout(function() {
			gift.css({
				display: "none"
			})
		}, 200);
	}

	//获取验证码
	function getCode(theThis) {
		if(checkPhone()) {
			var phone = $("#userPhone").val();
			$.ajax({
				type: "post",
				url: "/commonMethod/ajax-gift-verify.html",
				data: {
					"phone": phone,
					"gift_id": "5",
					"cms_csrf": cms_csrf
				},
				success: function(data) {

					var data = JSON.parse(data);
					if(data.status == 0) {
						countdown(theThis, 60, function() {
							theThis.attr("click", "");
							theThis.html("获取验证码");
						});
					}else{
						showErr(0,data.msg);
						theThis.attr("click", "");
					}

				},
				error: function() {
					theThis.attr("click", "");
					alert("网络异常~");
				}
			});
		}else{
			theThis.attr("click", "");
		}
	}
	//预约礼包
	function signGift(theThis) {
		if(checkPhone() && checkCode()) {
			var data = {
				phone: $("#userPhone").val(),
				gift_id: "5",
				verify: $("#userCode").val(),
				"cms_csrf": cms_csrf
			};
			$.ajax({
				type: "post",
				url: "/commonMethod/ajax-gift-code.html",
				data: data,
				success: function(data) {
					var data = JSON.parse(data);
					if(data.status == 0) {
						alert("预约成功~");
						hide_tc();
					}else{
						showErr(1,data.msg);
						theThis.attr("click", "");
					}
				},
				error: function(err) {
					theThis.attr("click", "");
					alert("网络异常~");
				}
			});
		}else{
			theThis.attr("click", "");
		}
	}
	//验证手机号
	function checkPhone() {
		var userPhone = $("#userPhone");
		if(userPhone.val() == "" || userPhone.val() == null) {
			showErr(0, "请输入手机号码");
			return false;
		}
		if(!(/^1(3|4|5|7|8)[0-9]\d{8}$/.test(userPhone.val()))) {
			showErr(0, "请输入正确的手机号码");
			return false;
		}
		hideErr(0);
		return true;
	}
	//验证验证码
	function checkCode() {
		var userCode = $("#userCode");
		if(userCode.val() == "" || userCode.val() == null) {
			showErr(1, "请输入验证码");
			return false;
		}
		if(!(/^[0-9]*$/.test(userCode.val()))) {
			showErr(1, "请输入正确的验证码");
			return false;
		}
		hideErr(1);
		return true;
	}
	//显示错误信息
	function showErr(index, text) {
		$(".gift_err").eq(index).addClass("gift_err_show").html(text);
	}
	//取消错误信息
	function hideErr(index) {
		$(".gift_err").eq(index).removeClass("gift_err_show");
	}
	//倒计时
	function countdown(ele, time, callback) {
		ele.html(time + "s");
		var timer = setInterval(function() {
			time--;
			ele.html(time + "s");
			if(time == 0) {
				clearInterval(timer);
				if(callback) {
					callback();
				}
			}
		}, 1000);
	}
	
}

//添加视频点击统计
function addCountVideoClick(ele){
	ele.click(function(){
		var staId = $(this).attr("staId");
		$.ajax({
			type:"get",
			url:"/commonMethod/ajax-stat-click-content.html",
			data: {
				id: staId
			},
			success: function(data){
				
			}
		});
	})
}
