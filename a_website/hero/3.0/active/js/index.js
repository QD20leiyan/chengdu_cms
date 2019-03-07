$(function() {
	var base = {
		isLogin: false,
		sendYy: false,
		sendMark: false,
		sendLogin: false,
		sendLoginOut: false,
		luckyNumber: 0,
		loginType: "",
		share_url: "",
		lp: [
			{ name: "金币*10" },
		],
		cms_csrf: $("meta[name='csrf-token']").attr("content"),
	};
	//函数
	function init() {
		initPageData();
		ajaxInit();
	}
    // 登录初始判断
	function initPageData() {
		$.ajax({
			url:"/site/userinfo",
			type: "get",
			data: {},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				if (data.status == 0) {
					base.isLogin = true;
					$(".user_num").show();
					$(".nologin").hide();
					$(".user_num b").html(data.phone);
					$(".data_active .day").html(data.left_day);
					$(".data_active .hour").html(data.left_hour);
					var msg = data.gift;
					if(msg != ""){
					var html = "";
						html += '<tr>' +
								'<td>' + msg.name + '</td>' +
								'<td id="tc7_copyText">' + msg.code + '</td>' +
								'<td>' +
								'<label id="tc7_copyBtn" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText">复制</label>' +
								'</td>' +
								'</tr>';
					$("#tc7_tbody").html(null).append(html);
					//初始化复制插件
					setTimeout(function() {
						$("#tc7_tbody tr label").each(function(index) {
							new Clipboard('#tc7_copyBtn');
						});
					}, 50);
				}
				} else {
					base.isLogin = false;
					$(".user_num").hide();
					$(".nologin").show();
					$(".data_active .day").html(data.left_day);
					$(".data_active .hour").html(data.left_hour);
				}
			},
			error: function(data) {
				//console.log(data);
			}
		});
	}
	function ajaxInit() {
	$.post(n_url, {
		'name': 'hero_total'
	}, function(data) {
		if(data.msg == 'null' || data.msg == null) {
			data.msg = 0;
		}
		// var newNumber =parseInt(data.msg);
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
					newStr = str.charAt(i) + "." + newStr;
				} else {
					newStr = str.charAt(i) + newStr; //逐个字符相接起来          
				}
				count++;
			}
			str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
		}
		$(".yyue_number").text(str);
	}, "json");
};
	function loginTest(obj) {
		var val = obj.ele.val().trim();
		//判断为空
		if (val == null || val == "") {
			showErr(obj.errIndex, obj.errText[0]);
			return false;
		}
		//判断手机号
		if (obj.type == "phone") {
			if (val.length != 11 || !/^[0-9]*$/.test(val)) {
				// if (val.length != 11) {
				showErr(obj.errIndex, obj.errText[1]);
				return false;
			}
		}
		//判断验证码
		if (obj.type == "mark") {
			if (!/^[0-9]*$/.test(val)) {
				showErr(obj.errIndex, obj.errText[1]);
				return false;
			}
		}
		hideErr(obj.errIndex);
		return true;
	}

	function showErr(index, text) {
		$(".err").removeClass("active").eq(index).addClass("active").html(text);
	}

	function hideErr(index) {
		$(".err").eq(index).removeClass("active");
	}
	//倒计时
	function countdownTime(time, callBack) {
		var markBtn = $("#getMarkBtn");
		var time = parseInt(time);
		markBtn.html(time + "s");
		var timer = setInterval(function() {
			time = time - 1;
			if (time == 0) {
				markBtn.html("获取验证码");
				clearInterval(timer);
				if (callBack) {
					callBack()
				}
				return;
			}
			markBtn.html(time + "s");
		}, 1000);
	}
	//事件
	$("#tc2_copy_btn").click(function() {
	    new Clipboard("#tc2_copy_btn");
    });
	$(".i2_gz").click(function() {
		if (base.isLogin) {
			showTc(1);
		} else {
			showTc(0);
		}
	});
	$(".login").click(function() {
		showTc(0);
	});
	
	//点击分享
	$(".bshare-custom a").on("click" , function () {		
		$.post("/site/gift", {}, function(data) {
			if(data.status == 0) {
				if(data.gift.type == 0) {
					$(".lp p").html(data.gift.name);
					$(".page_gold_code").html(data.gift.code);
					$(".lp img").attr("src", alt + "images/d_lp1.png");
				} else if(data.gift.type == 1) {
					$(".lp p").html(data.gift.name);
					$(".page_gold_code").html(data.gift.code);
					$(".lp img").attr("src", alt + "images/zuanshi.png");
				}
				setTimeout(function() {
					showTc(2);
				}, 4000);
				initPageData();
			}
		}, "json");
	})
	//中奖记录
	$(".look_gift").click(function (){
		if (base.isLogin == false) {
			showTc(0);
			return;
		}
		if($("#tc7_tbody tr").length > 0){
			showTc(3);
			console.log(1);
		} else {
			alert("您暂时没有中奖记录哦~");
			return;
		}
	})
//注销登录
	$(".c_nologin").click(function() {
		if (!base.isLogin) {
			return;
		}
		if (base.sendLoginOut) {
			return;
		}
		base.sendLoginOut = true;
		$.ajax({
			url: "/site/logout.html",
			type: "GET",
			data: {},
			success: function(data) {
				var data = JSON.parse(data);
				if (data.status == 0) {
					location.reload();
				}
				base.sendLoginOut = false;
			},
			error: function(data) {
				base.sendLoginOut = false;
			}
		})
	})
	$("#getMarkBtn").click(function() {
        console.log(base.sendMark);
		if (base.sendMark) {
			return;
		}
		var captcha = $(".captcha").val();
		var srf = $('meta[name="csrf-token"]').attr('content');
		var canLogin = loginTest({
			ele: $(".phone"),
			type: "phone",
			errIndex: 0,
			errText: [
				"请输入手机号",
				"请输入正确的手机号",
			]
		});
		if (canLogin != true) {
			return;
		}
		if(captcha == "" || captcha == undefined) {
			showErr(1,"请输入图形验证码")
			return;
		}
		//获取验证码
		$.post("/site/getcode.html",{ "phone":$(".phone").val(),"captcha": $(".captcha").val(),"cms_csrf":srf },function(data){
			if(data.status == 0){
                hideErr(1);
                base.sendMark = true;
				//$("#getMarkBtn").css("pointer-events","none");
				countdownTime(60, function() {
					base.sendMark = false;
				});
				// page_djs($("#getMarkBtn"),function(){
				// 	$("#getMarkBtn").css("pointer-events","auto");
				// });
			}else{
				alert(data.msg);
				load_captcha();
			}
		}, 'json');
	});
	//图片验证码刷新
	var imgMarkIndex=1;
	function load_captcha(){
		imgMarkIndex++;
		var imgUrl ="/site/captcha.html?refresh=" + imgMarkIndex;
		$.get(imgUrl, {}, function(data) {
			$("#getMarkBtn1 img").attr("src",data.url);
		},'json');
	}
	$("#getMarkBtn1").click(function(){
		load_captcha();
	});
	//登录
	$(".loginBtn").click(function() {
		if (base.sendLogin) {
			return;
		}
		var phoneRight = loginTest({
			ele: $(".phone"),
			type: "phone",
			errIndex: 0,
			errText: [
				"请输入手机号",
				"请输入正确的手机号",
			]
		});
		if (phoneRight != true) {
			return;
		}
		var markRight = loginTest({
			ele: $(".mark"),
			type: "mark",
			errIndex: 2,
			errText: [
				"请输入验证码",
				"请输入正确的验证码",
			]
		});
		if (markRight != true) {
			return;
		}
		base.sendLogin = true;
		//登录ajax
		$.ajax({
			url: "/site/login.html",
			type: "POST",
			data: {
				phone: $(".phone").val().trim(),
				yzm: $(".mark").val().trim(),
				cms_csrf: base.cms_csrf
			},
			success: function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				//登录成功
				if (data.status == 0) {
					initPageData();
					$(".d_tc").hide();
					showTc(1);
				} else {
					showErr(1, data.msg);
				}
				base.sendLogin = false;
			},
			error: function(data) {
				base.sendLogin = false;
			}
		})
	})
	//显示弹窗  
	function showTc(index, obj) {
		var self = $(".d_tc > div").eq(index);
		$(".d_tc > div").removeClass("active");
		self.addClass("active");
		$(".d_tc").show();

	}
	//关闭弹窗
	$(".tc_closeBtn").click(function() {
		base.loginType = "";
		$(".d_tc").hide();
	});

	init();
});
