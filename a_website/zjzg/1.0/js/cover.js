var num_url = '/commonMethod/ajax-get-new-subscribes.html';//预约人数
var newNumber = '';
var verify_url='/site/ajax-login-verify.html';//登录发送验证码
var login_url1='/site/ajax-login.html';//登录
var login_url='/site/ajax-get-user.html';//判断用户是否登录
var out_url='/site/ajax-login-out.html';//注销登录
var guess_url='/site/ajax-guess';//抽奖
var yy_url='/site/ajax-yyue.html';//预约
var srf = $('meta[name="csrf-token"]').attr('content');
var is_yuyue=0;
var phone_type=0; //0--ios  1--and
var is_yybtn=0;
var invite_code="";
var guess_name="";
var is_href=0;
var  yy_num_peo="";
//手机类型判断
var u = navigator.userAgent,
	app = navigator.appVersion;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isIOS) {
	phone_type=0;
}else{
	phone_type=1;
}
//图片验证码刷新
function load_captcha(){
	var imgUrl = "/site/ajax-get-captcha.html";
	$.post(imgUrl, {}, function(data) {
		$(".co_captcha").append(data.msg);
	}, 'json');
}
//图片验证码刷新
$(".co_captcha").click(function(){
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
//错误提示显示
function showErr(index, text) {
	$(".co_error").eq(index).addClass("co_err_show").html(text);
	$(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
	$(".co_error").eq(index).removeClass("co_err_show");
}
//登录请求
function get_login(){
	var my_phone = $(".co_username").val();
	var co_codenum1 =  $(".co_codenum1").val();
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	}else if(my_phone.length != 11){
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
		'url':login_url1,
		'data':{'phone':my_phone,'yzm':co_codenum1,'invite_code':invite_code,"cms_csrf":srf },
		'type':'POST',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				$(".co_tips_login").addClass("hidden");
				$(".co_before").addClass("hidden");
				$(".co_after").removeClass("hidden");
				$('.co_username').val("");
				$('.co_codenum1').val("");
				$('.user_phone').text(data.msg.phone);
				$('.friend').text(data.msg.invite_num||"0");
				$('.my_url').text(data.msg.share_url);
				$(".copy_link").attr("data-clipboard-text","《巅峰坦克：装甲战歌》发红包啦！戳链接预约游戏100%得现金红包，最高188元！"+data.msg.share_url);
				is_yuyue=data.msg.is_yuyue;
				if(is_yybtn==1){
					if(is_yuyue==1){
						$(".co_tips_login").addClass("hidden");
						$(".co_tips_success").removeClass("hidden");
						$(".co_tips_success .tips_txt").addClass("hidden");
						$(".co_tips_success .success").text("您已经预约过了，请勿重复预约");
					}else{
						$(".co_tips_login").addClass("hidden");
						$(".co_tips_type").removeClass("hidden");
					}
				}else{
					if(is_yuyue==1){
						$(".co_tips_login").addClass("hidden");
						alert("登陆成功");
					}else{
						$(".co_tips_login").addClass("hidden");
						$(".co_tips_type").removeClass("hidden");
					}
				}
				guess_name=data.msg.guess_name;
				if(guess_name==null||guess_name==""){
					$(".c3>span").text("请选择预测");
					$(".word_cup .choose .c_choose .c3").removeClass("c_left");
					$(".word_cup .choose .c_choose .c3").removeClass("c_right");
				}else{
					$(".c3>span").text(guess_name);
					if(guess_name=="法国"){
						$(".word_cup .choose .c_choose .c3").addClass("c_left");
					}else if(guess_name=="克罗地亚"){
						$(".word_cup .choose .c_choose .c3").addClass("c_right");
					}
				}
			}else{
				showErr(2, data.msg);
				load_captcha();
				//alert(data.msg);
			}
		}
	});
}
//获取预约百分比
function getPercent(number) {
	var percent = parseFloat((parseInt(number) / 17000).toFixed(2));
	console.log(number);

	if(number >= 100000) {
		$(".first").removeClass("active");
	}
	if(number >= 300000) {
		$(".second").removeClass("active");
	}
	if(number >= 600000) {
		$(".third").removeClass("active")
	}
	if(number >= 1000000) {
		$(".four").removeClass("active");
	}
	if(number >= 1500000) {
		$(".five").removeClass("active");
	}
	return percent;
};
function  num_tot(){
		newNumber = parseInt(yy_num_peo);
		// 预约人数进度条
		$(".jdt").css({
			width: getPercent(newNumber) + "%"
		});
}
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
//预约人数
function ajaxInit() {
	$.post(num_url, {
		'name': 'zjzg_total'
	}, function(data) {
		if(data.msg == 'null' || data.msg == null) {
			data.msg = 0;
		}
		// var newNumber =parseInt(data.msg);
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
		$(".y_number").text(str);
		$(".text_number").text(str);
		num_tot();
	}, "json");
};

//初始化
$(function(){
	//获取分享链接中的邀请码
	invite_code=getUrlParam('invite_code');
	console.log(invite_code);
	//判断用户是否登录
	$.ajax({
		'url':login_url,
		'data':{},
		'type':'GET',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				$(".co_tips_login").addClass("hidden");
				$(".co_before").addClass("hidden");
				$(".co_after").removeClass("hidden");
				$('.co_username').val("");
				$('.co_codenum1').val("");
				$('.user_phone').text(data.msg.phone);
				$('.friend').text(data.msg.invite_num||"0");
				$('.my_url').text(data.msg.share_url);
				$(".copy_link").attr("data-clipboard-text","《巅峰坦克：装甲战歌》发红包啦！戳链接预约游戏100%得现金红包，最高188元！"+data.msg.share_url);
				is_yuyue=data.msg.is_yuyue;
				guess_name=data.msg.guess_name;
				if(guess_name==null||guess_name==""){
					$(".c3>span").text("请选择预测");
					$(".word_cup .choose .c_choose .c3").removeClass("c_left");
					$(".word_cup .choose .c_choose .c3").removeClass("c_right");
				}else{
					$(".c3>span").text(guess_name);
					if(guess_name=="法国"){
						$(".word_cup .choose .c_choose .c3").addClass("c_left");
					}else if(guess_name=="克罗地亚"){
						$(".word_cup .choose .c_choose .c3").addClass("c_right");
					}
				}
			}else{}
		}
	});
	ajaxInit();
	load_captcha();
	
	setInterval(function() {
		ajaxInit();
	}, 60000);
});
//弹框关闭
$(".co_tips_close").click(function(){
	$(".co_tips").addClass("hidden");
	$('.co_tips_login .co_input input').val("");
	$(".co_error").removeClass("co_err_show");
	if(is_href==1){
		$('html,body').animate({scrollTop: $('#yuyue').offset().top}, 500);
		is_href=0;
	}
});
$(".co_tips_surebtn").click(function(){
	$(".co_tips").addClass("hidden");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
	$(".co_tips_login").removeClass("hidden");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
	var my_phone = $(this).closest(".co_tips_login").find(".co_username").val();
	var captcha =  $(this).closest(".co_tips_login").find(".captcha").val();
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	}else if(my_phone.length != 11){
		showErr(0, "手机号码不正确哦");
		return;
	}
	hideErr(0);
	if(captcha == "" || captcha == undefined) {
		showErr(1, "验证码不能为空哦");
		return;
	}
	hideErr(1);
	$.post(verify_url,{ "phone":my_phone,"captcha":captcha,"cms_csrf":srf },function(data){
		if(data.status == 0){
			$(".co_codebtn1").css("pointer-events","none");
			page_djs($(".co_codebtn1"),function(){
				$(".co_codebtn1").css("pointer-events","auto");
			});
		}else{
			alert(data.msg);
			load_captcha();
		}
	}, 'json');
});
//点击登陆或者点击预约
$(".co_tips_login .co_tips_btn").click(function(){
	if($(this).hasClass("co_tips_yybtn")){
		is_yybtn=1;
		get_login();
	}else{
		is_yybtn=0;
		get_login();
	}
});
//邀请好友弹框显示
$(".co_share").click(function(){
	if($(".co_after.hidden").length>0){
		//登录之前
		$(".co_tips_login").removeClass("hidden");
	}else{
		$(".co_tips_yq").removeClass("hidden");
	}
});
//注销登录
$(".logout").click(function(){
	$.ajax({
		'url':out_url,
		'data':{},
		'type':'GET',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				alert(data.msg);
				$(".co_before").removeClass("hidden");
				$(".co_after").addClass("hidden");
				$('.user_phone').text("");
				$('.friend').text("0");
				$('.my_url').text("");
				$(".copy_link").attr("data-clipboard-text","");
				is_yuyue=0;
				clearInterval(djs_timer);
				$(".co_codebtn1").html("获取验证码");
				$(".co_codebtn1").css("pointer-events","auto");
				$(".c3>span").text("请选择预测");
			}else{
				alert(data.msg);
			}
		}
	});
});
//立即预约弹框显示
$(".yue_btn,.yuyue_btn,.hongbao,.q_ios,.q_az").click(function(){
	if($(this).hasClass("yue_btn") || $(this).hasClass("hongbao")){
		is_href=1;
	}else{
		is_href=0;
	}
	if($(".co_after.hidden").length>0){
		//登录之前
		$(".co_tips_login .co_tips_title").removeClass("co_tips_logintitle").addClass("co_tips_yytitle");
		$(".co_tips_login .co_tips_btn").removeClass("co_tips_loginbtn").addClass("co_tips_yybtn");
		$(".co_tips_login").removeClass("hidden");
	}else{
		//登录之后
		if(is_yuyue==1){
			$(".co_tips_success").removeClass("hidden");
			$(".co_tips_success .tips_txt").addClass("hidden");
			$(".co_tips_success .success").text("您已经预约过了，请勿重复预约");
		}else{
			$(".co_tips_login").addClass("hidden");
			$(".co_tips_type").removeClass("hidden");
		}
	}
});
//复制
new Clipboard('.copy');
$(".copy").click(function() {
	alert("已复制");
});
//手机类型选择
$(".rdo").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
});
//立即预约请求
$(".co_tips_type .co_tips_yybtn").click(function(){
	fgw_yy_pc();
	var type_id=$(".rdo.on").attr("data-id");
	if(type_id==1){
		var type="ios";
	}else if(type_id==2){
		var type="android";
	}
	$.post(yy_url,{ "type":type,"cms_csrf":srf ,'invite':invite_code},function(data){
		if(data.status == 0){
			fgw_yy_pc_success();
			is_yuyue==1;
			if(type="ios"){
				$(".co_tips_type").addClass("hidden");
				$(".co_tips_ios").removeClass("hidden");
			}
			else if(type="android"){
                $(".co_tips_type").addClass("hidden");
                $(".co_tips_success").removeClass("hidden");
				$(".co_tips_success .tips_txt").removeClass("hidden");
				$(".co_tips_success .tips_txt").text("恭喜您");
				$(".co_tips_success .success").text("预约成功");
			}
		}else{
			$(".co_tips_type").addClass("hidden");
			$(".co_tips_success").removeClass("hidden");
			$(".co_tips_success .tips_txt").addClass("hidden");
			$(".co_tips_success .success").text(data.msg);
		}
	}, 'json');
});
//预测跳转
$(".to_yc").click(function(){
	$('html,body').animate({scrollTop: $('#word_cup').offset().top}, 500)
});
//国家选择
$(".word_cup .choose .c_choose .c_country").click(function(){
	guess_name=$(this).find("span").text();
	if(guess_name=="法国"){
		$(".word_cup .choose .c_choose .c3").addClass("c_left");
		$(".word_cup .choose .c_choose .c3").removeClass("c_right");
	}else if(guess_name=="克罗地亚"){
		$(".word_cup .choose .c_choose .c3").removeClass("c_left");
		$(".word_cup .choose .c_choose .c3").addClass("c_right");
	}
	$(".c3>span").text(guess_name);
});
//确定预测
$(".yc_btn").click(function(){
	if($(".co_after.hidden").length>0){
		//登录之前
		$(".co_tips_login").removeClass("hidden");
	}else{
		if($(".word_cup .choose .c_choose .c3.c_left").length>0||$(".word_cup .choose .c_choose .c3.c_right").length>0){
			$.post(guess_url,{ "guess":guess_name,"cms_csrf":srf },function(data){
				if(data.status == 0){
					$(".co_tips_success").removeClass("hidden");
					$(".co_tips_success .tips_txt").removeClass("hidden");
					$(".co_tips_success .tips_txt").text("恭喜您");
					$(".co_tips_success .success").text("预测成功");
				}else{
					$(".co_tips_success").removeClass("hidden");
					$(".co_tips_success .tips_txt").addClass("hidden");
					$(".co_tips_success .success").text("预测已结束");
				}
			}, 'json');
		}else{
			$(".co_tips_success").removeClass("hidden");
			$(".co_tips_success .tips_txt").addClass("hidden");
			$(".co_tips_success .success").text("请选择球队哦");
		}
	}
});





