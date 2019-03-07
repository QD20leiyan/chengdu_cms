//jiathis分享配置
var jiathis_config = {
	url:"",
	title:"代号英雄",
	summary:"",
	pic:"",
}

var countdown = 60;
var srf = $("meta[name='csrf-token']").attr("content");
var base = {
	isLogin: false,
	sendYy: false,
	sendMark: false,
	sendLogin: false,
	sednLoginOut: false,
	luckyNumber: 0,
	share_url:"",
};
//倒计时
function sendemail() {
	var obj = $(".g_code");
	settime(obj);
}

function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("免费获取验证码");
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
}
$(function() {
	//轮播图初始化
	var mySwiper = new Swiper(".t_banner", {
		pagination: '.swiper-pagination',
		paginationType: 'fraction',
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		observer: true,
		observeParents: true,
	});
	init();
	//初次进入页面判断是否登录
	function init() {
		$.get('/site/ajax-get-user.html', {}, function(data) {
			if(data.status == 0) {
				var msg = data.msg;
				base.isLogin = true;
				jiathis_config.url = msg.share_url,
				base.luckyNumber = msg.num;
				$(".before_denglu").removeClass("active");
				$(".after_denglu").addClass("active");
				$(".after_denglu i").html(msg.phone);
				$(".number span").html(base.luckyNumber);
				$(".renshu1").html(msg.phone);
				fanpai(data.msg);
				$(".d_loading").remove();
			} else {
				$(".d_loading").remove();
				base.isLogin = false;
				$(".before_denglu").addClass("active");
				$(".after_denglu").removeClass("active");
			}
		}, 'json');
	}
	//点击预约判断是否登录弹出不同弹框
	$(".yuyue").click(function() {
		if($(".after_denglu").hasClass("active")) {
			$(".c_login").show();
		} else {
			$(".p_login").show();
		}
	});
	//已翻开牌样式
	function fanpai(data) {
		var c_index = $(".m_ul>li");
		if(data.node_1 != 0) {
			c_index.eq(data.node_1 - 1).addClass("active");
		}
		if(data.node_2 != 0) {
			c_index.eq(data.node_2 - 1).addClass("active");
		}
		if(data.empty_node_1 != 0) {
			c_index.eq(data.empty_node_1 - 1).addClass("active");
		}
		if(data.empty_node_2 != 0) {
			c_index.eq(data.empty_node_2 - 1).addClass("active");
		}
	}
	//显示登录弹框
	$(".n_denglu").click(function() {
		$(".p_login").show();
	});
	//弹出规则弹框
	$('.guize').click(function() {
		$(".e_login").show();
	});
	//关闭弹窗
	$(".close").click(function() {
		$(this).parent().parent().hide();
	});
	//图片验证码刷新
	var imgMarkIndex=1;
	function load_captcha(){
		imgMarkIndex++;
		var imgUrl = "/site/captcha?refresh=" + imgMarkIndex;
		$.get(imgUrl, {}, function(data) {
			$(".g_captcha img").attr("src", data.url);
		}, 'json');
	}
	$(".g_captcha").click(function(){
		load_captcha();
	});
	//登录手机获取验证码
	$(".g_code").click(function() {
		var phone = $(".phone").val();
		var captcha = $(".captcha").val();
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return
		}
		if(captcha == "" || captcha == undefined) {
			alert('图片验证码不能为空哦');
			return;
		}
		$.post('/site/ajax-login-verify.html', {
			"phone": phone,
			"captcha":captcha,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				load_captcha();
				sendemail();
			} else {
				alert(data.msg);
				load_captcha();
			}
		}, 'json');
	});
	//用户手机号登录
	$(".o_denglu").click(function() {
		var phone = $(".phone").val();
		var yzm = $(".code").val();
		if(phone == "" || phone == undefined) {
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11) {
			alert("手机号不正确");
			return
		}
		if(yzm == "" || yzm == undefined) {
			alert("验证码不正确")
		}
		$.post('/site/ajax-login.html', {
			"phone": phone,
			"cms_csrf": srf,
			"yzm": yzm
		}, function(data) {
			if(data.status == 0) {
				init();
				$(".p_login").hide();
			} else {
				alert(data.msg);
			}
		}, 'json');
	});
	//点击注销取消登录
	$(".c_denglu").click(function() {
		$.get('/site/ajax-logout.html', {}, function(data) {
			if(data.status == 0) {
				location.reload();
			} else {
				alert(data.msg);
			}
		}, 'json');
	});
	//点击弹出预约弹窗
	$(".m_denglu").click(function() {
		var type = $(".xitong .xt_ra.on .xt_img").attr("attr-type");
		$.post("/site/ajax-yuyue.html", {
			"type": type,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				alert("预约成功");
				$(".c_login").hide();
			} else {
				alert(data.msg);
			}
		}, "json");
	});
	//点击翻牌
	$(".m_ul li").on("click", function() {
		var self = $(this);
		//判断是否登录
		if(!base.isLogin) {
			$(".p_login").show();
			return;
		}
		//判断翻牌剩下次数
		if(base.luckyNumber <= 0) {
			$(".d_login").show();
			return;
		}
		var isClick = self.attr("isClick");
		if(isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		var index = parseInt($(".m_ul li").index(self)) + 1;
		$.post("/site/ajax-draw.html", {
			"node": index,
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0) {
				if(data.draw_zs == 1) {
					$(".v_login").show();
				} else if(data.draw_zs == 2) {
					$(".i_login").show();
				} else if(data.draw_zs == 3) {
					$(".t_login").show();
				} else if(data.draw_zs == 4) {
					$(".h_login").show();
				}
				self.attr("class", "active");
				base.luckyNumber--;
				$(".number span").html(base.luckyNumber);
			} else if(data.status == 1) {
				$(".g_login").show();
				base.luckyNumber--;
				self.attr("isClick", "");
				$(".number span").html(base.luckyNumber);
			} else if(data.status == 2) {
				self.attr("isClick", "");
				$(".i_login").show();
			} else if(data.status == 3) {
				self.attr("isClick", "");
				$(".u_login").show();
			} else {
				self.attr("isClick", "");
				alert(data.msg);
			}
		}, "json");
	});
	//用户选择继续翻牌
	$(".goon").click(function() {
		var self = $(this);
		var isClick = self.attr("isClick");
		if(isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		$.get("/site/ajax-jx-draw.html", {}, function(data) {
			if(data.status == 0) {
				$(".i_login").hide();
			} else {
				alert(data.msg);
			}
			self.attr("isClick", "");
		}, "json");
	});
	//用户选择拒绝翻牌
	$(".refuse").click(function() {
		var self = $(this);
		var isClick = self.attr("isClick");
		if(isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		$.get("/site/ajax-jj-draw.html", {}, function(data) {
			if(data.status == 0) {
				$(".i_login").hide();
			} else {
				alert(data.msg);
			}
			self.attr("isClick", "");
		}, "json");
	});
	//是否登录出现分享弹窗
	$('.share').click(function() {
		if(base.isLogin) {
			$(".d_login").show();
		} else {
			$(".p_login").show();
		}
	});
	//查看当前用户中奖记录弹窗 
	$(".jilu").click(function() {
		if(!base.isLogin) {
			$(".p_login").show();
			return;
		}
		$.ajax({
			url: "/site/ajax-draw-log.html",
			type: "post",
			data: {
				cms_csrf: srf,
			},
			success: function(data) {
				var data = JSON.parse(data);
				if(data.status == 0) {
					var msg = data.msg;
					var listLen = msg.length;
					if(listLen == 0) {
						alert("您还没有中奖记录哦~");
					} else {
						var html = "";
						for(var i = 0; i < listLen; i++) {
							html = html + '<li>' +
								'<span>' + msg[i].name + '</span>' +
								'<span>' + msg[i].code + '</span>' +
								'</li>';
						}
						$(".price_ul").html(null).append(html);
						$(".f_login").show();
					}
				} else {
					alert(data.msg);
				}
			},
			error: function(data) {
				console.log(data);
			}
		})
	});
	//查看奖励物品
	$(".check_price").click(function() {
		$(".j_login").show();
	});
	//点击切换ios,android状态
	$(".xitong .xt_ra").on("click", function() {
		$(this).addClass("on").siblings().removeClass("on");
	});
	//判断预约人数
	function initActive(num) {
		num = parseInt(num) > 0 ? parseInt(num) : 0; //防止小于0
		if(num >= 1000000) {
			$(".co_step1").addClass("active");
		}
		if(num >= 3000000) {
			$(".co_step2").addClass("active");
		}
		if(num >= 5000000) {
			$(".co_step3").addClass("active");
		}
		if(num >= 8000000) {
			$(".co_step4").addClass("active");
		}
		if(num >= 10000000) {
			$(".co_step5").addClass("active");
		}
	};
	//点击分享
	$(".jiathis_style_32x32 li a").click(function() {
		var self = $(this);
		var className = self.attr("class");
		var isClick = self.attr("isClick");
		if(className == "jiathis_button_weixin") {
			return;
		}
		if(isClick == "true") {
			return;
		}
		self.attr("isClick", "true");
		$.ajax({
			url: "/site/ajax-add-draw.html",
			type: "GET",
			data: {},
			success: function(data) {
				var data = JSON.parse(data);
				if(data.status == 0) {
					base.luckyNumber = data.msg;
					$(".number span").html(base.luckyNumber);
				} else {
					alert(data.msg);
				}
				self.attr("isClick", "");
			},
			error: function(data) {
				self.attr("isClick", "");
			}
		})
	});
	//微信接口分享
	$(document).on("click","#jiathis_weixin_close" , function (){
		$.ajax({
			url:"/site/ajax-get-user.html",
			type:"get",
			data:{},
			success:function (data){
				var data = JSON.parse(data);
				if(data.status == 0){
					var msg = data.msg;
					base.luckyNumber = msg.num;
					$(".number span").html(base.luckyNumber);
				}
			},
			error :function (data){
				alert("请查看网络是否连接~");
			}
		});
	});
	//预约人数监控
	ajaxInit();
	//setInterval(ajaxInit, 3000);

	function ajaxInit() {
		$.get("/site/ajax-get-yuyue-num.html", {}, function(data) {
			if(data.status == 0) {
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
				$(".renshu span").text(str);
				$(".renshu2").text(str);
				initActive(data.msg);
			}
		}, 'json');
	};
});