$(function() {
	//全局
	var get_code_url = '/commonMethod/get-verify';
	var order_url = '/commonMethod/yuyue';
	var cms_csrf = $("meta[name='csrf-token']").attr("content");

	//事件
	$(".sign_list ul li").click(function() {
		var html = $(this).find("span").html();
		var isInp = $(this).attr("isInp");
		var sign_zb_name = $(".sign_zb_name");
		$(".sign_list ul li").removeClass("active");
		$(this).addClass("active");
		if(isInp == "true"){
			sign_zb_name.removeAttr("disabled").val("").focus().css({
				color: "#000"
			});
		}else{
			sign_zb_name.attr("disabled","disabled").val(html).css({
				color: "#c5a5a5"
			});
		}
		
	});
	//获取报名验证码
	$(".sign_getCode").click(function() {
		var codeBtn = $(this);
		if($(this).attr("click")) {
			return;
		}
		$(this).attr("click", "true");
		//验证手机号
		var phoneCode = checkPhone($(".sign_phone").val());
		if(phoneCode == 1) {
			showErr(4, "请输入手机号码");
			$(this).attr("click", "");
		} else if(phoneCode == 2) {
			showErr(4, "请输入正确的手机号码");
			$(this).attr("click", "");
		} else {
			hideErr(4);
			getSignCode(function(data) {
				if(data.status != 0) {
                    alert(data.msg);
                    codeBtn.attr("click", "");
				} else {
					countdown($(".sign_getCode"), 60, function() {
						$(".sign_getCode").html("获取验证码");
						codeBtn.attr("click", "");
					});
				}

			}, function() {
				alert("网络错误~");
				codeBtn.attr("click", "");
			});
		}
	});
	//提交报名
	$(".sign_btn button").click(function() {
		
		var theThis = $(this);
		if($(this).attr("click")) {
			return;
		}
		$(this).attr("click", "true");
		//验证用户是否输入相关信息
		if(checkUserInptInf() == false) {
			$(this).attr("click", "");
			return;
		}
		//验证手机号
		var phoneCode = checkPhone($(".sign_phone").val());
		if(phoneCode == 1) {
			showErr(4, "请输入手机号码");
			$(this).attr("click", "");
			return;
		} else if(phoneCode == 2) {
			showErr(4, "请输入正确的手机号码");
			$(this).attr("click", "");
			return;
		}
		hideErr(4);
		//验证验证码
		var code = checkCode($(".sign_code").val());
		if(code == 1) {
			showErr(5, "请输入验证码");
			$(this).attr("click", "");
			return;
		} else if(code == 2) {
			showErr(5, "请输入正确的验证码");
			$(this).attr("click", "");
			return;
		} else if(code == 0) {
			hideErr(5);
			signAjax(function(data) {
				console.log(data.status);
				if(data.status == 1) {
					down_show($(".c_gign_success"));
					theThis.attr("click","");
				} else {
					alert(data.msg);
					theThis.attr("click","");
				}
			}, function() {
				alert("网络异常~");
				theThis.attr("click","");
			});
		}
	}); 

    //点击取消成功弹窗
    $(".sc_close").click(function() {
		down_hide($(".c_gign_success"));
		location.reload();
	});

	//点击显示下载弹窗
	$(".c_down").click(function() {
		down_show($(".load_tips"));
	});

	$(".loadtips_close").click(function() {
		down_hide($(".load_tips"));
	});

	$(".ios").click(function() {
		$(".btn").removeClass("btn-1");
		$(".load_div ").removeClass("hidden");
		$(".order_div ").addClass("hidden");
	});

	$(".ad").click(function() {
		$(".btn").addClass("btn-1");
		$(".load_div ").addClass("hidden");
		$(".order_div ").removeClass("hidden");
	});

	$(".sendcode").click(function() {
		theThis = $(this);
		if($(this).attr("click")) {
			return;
		}
		$(this).attr("click", "true");
		
		hideErr(6);
		//验证手机号
		var phoneCode = checkPhone($(".load_tel").val());
		if(phoneCode == 1) {
			showErr(6, "请输入手机号码");
			$(this).attr("click", "");
		} else if(phoneCode == 2) {
			showErr(6, "请输入正确的手机号码");
			$(this).attr("click", "");
		} else {
			getDownCode(function(data) {
				if(data.status == 0) {
					countdown(theThis, 60, function() {
						theThis.attr("click", "");
						theThis.html("获取验证码");
					});
				} else {
					showErr(6, data.msg);
					theThis.attr("click", "");
				}
			}, function() {
				theThis.attr("click", "");
				alert("网络异常~");
			});
		}
	});

	//安卓预约提交
	$(".orderbtn").click(function() {
		theThis = $(this);
		if($(this).attr("click")) {
			return;
		}
		hideErr(6);
		hideErr(7);
		$(this).attr("click", "true");
		//验证手机号
		var phoneCode = checkPhone($(".load_tel").val());
		if(phoneCode == 1) {
			showErr(6, "请输入手机号码");
			$(this).attr("click", "");
			return;
		} else if(phoneCode == 2) {
			showErr(6, "请输入正确的手机号码");
			$(this).attr("click", "");
			return;
		}
		//验证验证码
		var code = checkCode($(".codenum").val());
		if(code == 1) {
			showErr(7, "请输入验证码");
			$(this).attr("click", "");
			return;
		} else if(code == 2) {
			showErr(7, "请输入正确的验证码");
			$(this).attr("click", "");
			return;
		}
		signAzDown(function(data) {
			if(data.status == 0) {
				alert("预约成功~");
				down_hide($(".load_tips"));
				theThis.attr("click", "");
			} else {
				alert(data.msg);
				theThis.attr("click", "");
			}
		}, function() {
			alert("网络异常，请检查~");
			theThis.attr("click", "");
		})
	})

	//函数
	//获取报名验证码
	function getSignCode(successback, errback) {
		$.ajax({
			type: "post",
			url: "/commonMethod/vote-verify",
			data: {
				phone: $(".sign_phone").val(),
				type: "5",
				cms_csrf: cms_csrf
			},
			success: function(data) {
				//console.log(data);
				var data = JSON.parse(data);
				if(successback) {
					successback(data);
				}
			},
			error: function(error) {
				if(errback) {
					errback();
				}
			}
		});
	}
	//提交报名ajax
	function signAjax(callback1, callback2) {

		var data = {
			zbname: $(".sign_name").eq(0).val(),
			zbid: $(".sign_id").eq(0).val(),
			zbphone: $(".sign_phone").val(),
			dyonename: $(".sign_name").eq(1).val(),
			dyoneid: $(".sign_id").eq(1).val(),
			dytwoname: $(".sign_name").eq(2).val(),
			dytwoid: $(".sign_id").eq(2).val(),
			zbptname: $(".sign_zb_name").val(),
			zbptid: $(".sign_room").val(),
			yzm: $(".sign_code").val(),
			cmc_csrf: cms_csrf
		};
		$.ajax({
			type: "post",
			url: "/site/enlist",
			data: data,
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if(callback1) {
					callback1(data);
				}
			},
			error: function() {
				if(callback2) {
					callback2();
				}
			}
		});
	}

	//显示下载弹窗
	function down_show(ele) {
		ele.css({
			display: "block"
		})
		setTimeout(function() {
			ele.css({
				opacity: "1"
			})
		}, 20);
	}
	//隐藏下载弹窗
	function down_hide(ele) {
		ele.css({
			opacity: "0"
		})
		setTimeout(function() {
			ele.css({
				display: "none"
			})
		}, 200);
	}

    

	//获取安卓下载预约验证码
	function getDownCode(callback1, callback2) {
		$.ajax({
			type: "post",
			url: get_code_url,
			data: {
				"phone": $(".load_tel").val(),
				"gift_id": "5",
				"cms_csrf": cms_csrf
			},
			success: function(data) {
				var data = JSON.parse(data);
				if(callback1) {
					callback1(data);
				}
			},
			error: function() {
				if(callback2) {
					callback2();
				}
			}
		});

	}
	//预约礼包
	function signAzDown(callback1, callback2) {
		var data = {
			phone: $(".load_tel").val(),
			yzm: $(".codenum").val(),
			type: "android",
			cms_csrf: cms_csrf
		};
		$.ajax({
			type: "post",
			url: order_url,
			data: data,
			success: function(data) {
				var data = JSON.parse(data);
				if(callback1) {
					callback1(data);
				}
			},
			error: function(err) {
				if(callback2) {
					callback2();
				}
			}
		});
	}
	//验证手机号
	function checkPhone(val) {
		if(val == "" || val == null) {
			return 1;
		}
		if(!(/^1(3|4|5|7|8)[0-9]\d{8}$/.test(val))) {
			return 2;
		}
		return 0;
	}
	//验证验证码
	function checkCode(val) {
		if(val == "" || val == null) {
			return 1;
		}
		if(!(/^[0-9]*$/.test(val))) {
			return 2;
		}
		return 0;
	}
	//验证用户输入信息
	function checkUserInptInf() {
		var sign_inp = $(".sign_inp");
		var len = sign_inp.length;
		var errTetx = [
			"请输入主播昵称",
			"请输入主播ID",
			"请输入队员1昵称",
			"请输入队员1ID",
			"请输入队员2昵称",
			"请输入队员2ID",
			"请输入直播房间号",
			"请选择直播平台",
		];
		for(var i = 0; i < len; i++) {
			var val = sign_inp.eq(i).val();
			var errIndex = sign_inp.eq(i).attr("errIndex");
			if(val == "" || val == null) {
				showErr(errIndex, errTetx[i]);
				return false;
				break;
			} else {
				hideErr(errIndex);
			}
		}
		if($(".sign_zb_name").val() == "选择直播平台") {
			var errIndex = $(".sign_zb_name").attr("errIndex");
			showErr(errIndex, errTetx[7]);
			return false;
		} else {
			var errIndex = $(".sign_zb_name").attr("errIndex");
			hideErr(errIndex);
		}
		return true;
	}
	//显示错误信息
	function showErr(index, text) {
		$(".err").eq(index).addClass("err_show").html(text);
	}
	//取消错误信息
	function hideErr(index) {
		$(".err").eq(index).removeClass("err_show");
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
    
});