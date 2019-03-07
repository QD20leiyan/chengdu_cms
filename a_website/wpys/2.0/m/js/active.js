var verify_url='/common/get-login-verify.html';//预约发送验证码
var douyin_url='/act/save.html';//抖音信息提交
var srf = $('meta[name="csrf-token"]').attr('content');
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
	imgMarkIndex++;
	var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".co_captcha").html(data.msg);
	}, 'json');
}
//图片验证码刷新
$(".spam-refresh-pic-btn").click(function(){
	load_captcha();
});
//错误提示显示
function showErr(text){
	$(".popup-wrap .warm-icon").removeClass("success-icon");
	$(".popup-wrap .notice-title").html("提交失败");
	$(".popup-wrap .content").html(text);
	$(".popup-wrap").fadeIn();
}
//倒计时
function page_djs(ele, callback) {
	var time = 60;
	if(ele) {
		ele.html("重新获取(60s)");
	}
	djs_timer = setInterval(function() {
		time--;
		ele.html("重新获取("+(time<=0?0:time) + "s)");
		if(time == 0) {
			clearInterval(djs_timer);
			ele.html("重新获取验证码");
			if(callback) {
				callback();
			}
		}
	}, 1000);
}
$(function (){
	//提交请求1：抖音验证
	$(".submit").click(function(){
		var douyin_name=$(".douyin_name").val();
		var douyin_id=$(".douyin_id").val();
		var user_name=$(".user_name").val();
		var user_phone = $(".user_phone").val();
		var user_address=$('.user_address').val();
		if(douyin_name == "" || douyin_name == undefined) {
			showErr("抖音名称不能为空哦");
			return;
		}
		if(douyin_id == "" || douyin_id == undefined) {
			showErr("抖音ID不能为空哦");
			return;
		}
		if(user_name == "" || user_name == undefined) {
			showErr("姓名不能为空哦");
			return;
		}
		if(user_phone == "" || user_phone == undefined) {
			showErr("手机号码不能为空哦");
			return;
		}else if(user_phone.length != 11){
			showErr("手机号码不正确哦");
			return;
		}
		if(user_address == "" || user_address == undefined) {
			showErr("详细地址不能为空哦");
			return;
		}
		load_captcha();
		$(".popup-wrap").fadeOut();
		$(".form_tel").fadeIn();			
	});
	//登录获取验证码
	$(".spam-send-sms").click(function(){
		var douyin_name=$(".douyin_name").val();
		var douyin_id=$(".douyin_id").val();
		var user_name=$(".user_name").val();
		var user_phone = $(".user_phone").val();
		var user_address=$('.user_address').val();
		var captcha =  $(".spam-pic-captcha").val();
		if(user_phone == "" || user_phone == undefined) {
			showErr("手机号码不能为空哦");
			return;
		}else if(user_phone.length != 11){
			showErr("手机号码不正确哦");
			return;
		}
		if(captcha == "" || captcha == undefined) {
			showErr("图片验证码不能为空哦");
			return;
		}
		$.post(verify_url,{"phone":user_phone,"smsContent":'您正在进行《王牌御史》御史祈福大作战领奖验证',"captcha":captcha,"cms_csrf":srf },function(data){
			if(data.status == 0){
				$(".spam-send-sms").css("pointer-events","none");
				page_djs($(".text"),function(){
					$(".spam-send-sms").css("pointer-events","auto");

				});
			}else{
				showErr(data.msg);
				load_captcha();
			}
		}, 'json');
	});
	//提交请求2：手机验证
	$(".spam-submit").click(function(){
		var douyin_name=$(".douyin_name").val();
		var douyin_id=$(".douyin_id").val();
		var user_name=$(".user_name").val();
		var user_phone = $(".user_phone").val();
		var user_address=$('.user_address').val();
		var co_codenum1=$('.spam-sms-captcha').val();
		if(douyin_name == "" || douyin_name == undefined) {
			showErr("抖音名称不能为空哦");
			return;
		}
		if(douyin_id == "" || douyin_id == undefined) {
			showErr("抖音ID不能为空哦");
			return;
		}
		if(user_name == "" || user_name == undefined) {
			showErr("姓名不能为空哦");
			return;
		}
		if(user_phone == "" || user_phone == undefined) {
			showErr("手机号码不能为空哦");
			return;
		}else if(user_phone.length != 11){
			showErr("手机号码不正确哦");
			return;
		}
		if(user_address == "" || user_address == undefined) {
			showErr("详细地址不能为空哦");
			return;
		}
		if(co_codenum1 == "" || co_codenum1 == undefined) {
			showErr("验证码不能为空哦");
			return;
		}
		$.ajax({
			'url':douyin_url,
			'data':{'phone':user_phone,'douyin_name':douyin_name,'douyin_id':douyin_id,'name':user_name,'address':user_address,'yzm':co_codenum1,"cms_csrf":srf },
			'type':'POST',
			'dataType':'Json',
			success:function(data){
				if(data.status==0){
					$(".popup-wrap .warm-icon").addClass("success-icon");
					$(".popup-wrap .notice-title").html("提交成功");
					$(".popup-wrap .content").html("");
					$(".form_tel").fadeOut();
	                $(".popup-wrap").fadeIn();
	                $(".popup-close").addClass("close_all");
				}else if(data.status==16){
					$(".popup-wrap .warm-icon").addClass("success-icon");
					$(".popup-wrap .notice-title").html("");
					$(".popup-wrap .content").html(data.msg);
					$(".popup-wrap").fadeIn();
					$(".popup-close").addClass("close_all");
				}else{
					showErr(data.msg);
				}
			}
		});
	});
	$("body").on("click",".close_all",function(){
		$(".form_tel").fadeOut();
		$(".popup-wrap").fadeOut();
		$(".popup-close").removeClass("close_all");
	})
});