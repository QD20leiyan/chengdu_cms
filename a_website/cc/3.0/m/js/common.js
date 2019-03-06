function tankuang(movieSrc){
	var smarty = '{$smarty.const.STATIC_DOMAIN}2.0/m/';
	var tankuangHtml = '<div class="cover1"></div><div class="moviePlay"><div class="movieClose"><img src="http://static.dev.yingxiong.com/cc/2.0/m/images/c.png"></div><div class="videos"><iframe border="0" marginwidth="0" framespacing="0" marginheight="0" src='+movieSrc+' frameborder="0" noresize="" scrolling="no" width="100%" height="100%" vspale="0" id="iframe_btn" name="iframe_btn"></iframe></div></div>';
	$("body").append(tankuangHtml);

	$(".con_play").on("click",function(e){
		e.stopPropagation();

		$(".cover1").show();
		$(".moviePlay").show();
		
	});
	$(".movieClose,.cover1").on("click",function(e){
		$(".cover1").remove();
		$(".moviePlay").remove();
		
	})
}

//判断移动设备类型
// function ismobile(test){
// 	var u = navigator.userAgent, app = navigator.appVersion;
// 	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
// 	 	if(window.location.href.indexOf("?mobile")<0){
// 		  	try{
// 			   	if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
// 			   		return '0';
// 			   	}else{
// 			   		return '1';
// 			   	}
// 		  	}catch(e){}
// 		}
// 	}else if( u.indexOf('iPad') > -1){
// 		return '0';
// 	}else{
// 		return '1';
// 	}
// };
// //console.log(ismobile(1));//0:iPhone 1:Android
// var themobile = ismobile(1);
// if(themobile=="0"){  //ios
// 	$(".h_load").addClass("js_down_ios").removeClass("js_down_andriod");
// }else{               //android
// 	$(".h_load").addClass("js_down_andriod").removeClass("js_down_ios");
// }

//倒计时
function page_djs(ele, callback) {
	var time = 60;
	if(ele) {
		ele.html("60s");
	}
	djs_timer = setInterval(function() {
		time--;
		ele.html(time + "s");
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
	var send_url ='/commonMethod/get-verify';
	var order_url = '/commonMethod/yuyue';
	var device_type="ios";
$(".order_down").click(function(){
	var u = navigator.userAgent;
	//var ua = navigator.userAgent.toLowerCase();
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	//if(ua.match(/MicroMessenger/i)=="micromessenger") { //微信内置浏览器
	//	$(".download a").click(function(){
	//		window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=应用名 '
	//	});
	//}else{
		if(isiOS){
			window.location.href='https://itunes.apple.com/us/app/art-of-war-red-tides/id1216114260?ls=1&mt=8'
		}else if(isAndroid){
			$(".load_tips").removeClass("hidden");
			$(".ad").click();
		}else{
			$(".load_tips").removeClass("hidden");
			$(".ad").click();
		}
	//}
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
	$.post(send_url,{ "phone":my_phone,"type":1,"device_type":device_type,"cms_csrf":srf},function(data){
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


//邮件发送弹窗
$(".shuju_en").click(function(){
	$(".email_tips").removeClass("hidden");
});
$(".emailtips_close").click(function(){
	$(".email_tips").addClass("hidden");
	$(".email_name").val("");
	$(".email").val("");
	$(".email_msg").val("");
});

$(".top_nav>div").click(function(){
	$(".top_nav>div").removeClass("active");
	$(this).addClass("active");
});
$('.p_put .s_put input:nth-child(1)').on("focus" , function (){
	$(this).parent().addClass("active");
	$(this).parent().siblings().removeClass("active");
});
$(".c_close").click(function (){
	$(this).parent().parent().hide();
});
var countnumber = 60;
var csrf = $("meta[name='csrf-token']").attr("content");
//倒计时
function sendemail() {
	var obj = $(".g_code");
	settime(obj);
}

function settime(obj) { //发送验证码倒计时
	if(countnumber == 0) {
		obj.attr('disabled', false);
		obj.val("免费获取验证码");
		countnumber = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("重新发送(" + countnumber + ")");
		countnumber--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
};
//图片验证码
function tupian() {
	$.get("/site/captcha.html?refresh=1", {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
};
$(".down_yuyue").click(function (){
	$(".c_login").show();
});
$(".captcha").click(function (){
	tupian();
});
$(".g_code").click(function (){
	var phone = $(".phone").val();
	var t_yzm = $(".t_yzm").val();
	if(phone == "" || phone == undefined){
		alert("请输入正确的手机号");
		return
	}
	if(t_yzm == "" || t_yzm == undefined){
		alert("请输入正确的图形验证码");
		return;
	}
	$.post("/site/ajax-login-verify.html",{
		"phone": phone,
		"captcha":t_yzm,
		"cms_csrf": csrf
	},function (data){
		if(data.status == 0){
			sendemail();
		} else if(data.status == 101){
			$(".tit_price").html(data.msg);
			$(".c_login").hide();
			$(".price_c").show();
		} else {
			alert(data.msg);
			tupian();
		}
	},"json");
});
$(".lglq").click(function (){
	var phone = $(".phone").val();
	var yzm = $(".yzm").val();
	if(phone == "" || phone == undefined){
		alert("请输入正确的手机号");
		return
	}
	if(yzm == "" || yzm == undefined){
		alert("请输入验证码");
		return;
	}
	$.post("/site/ajax-gold.html",{
		"phone": phone,
		"yzm":yzm,
		"cms_csrf": csrf
	},function (data){
		if(data.status == 0){
			$(".tit_price").html(data.msg);
			$(".c_login").hide();
			$(".price_c").show();
		} else {
			alert(data.msg);
			tupian();
		}
	},"json");
});
new Clipboard('#tc7_copyBtn0');
	$("#tc7_copyBtn0").click(function() {
	alert("已复制");
});

//tap列表
var clicknum = 1;
$(".donload-box .down-btn").click(function() {
	if(clicknum % 2 !== 0) {
		$(this).siblings(".nav-content1").slideDown();
	} else {
		$(this).siblings(".nav-content1").slideUp();
	}
	clicknum++;
});