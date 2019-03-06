		    var is_focus=0;//input获取事件焦点
            //预约
            var verify_url='/common/get-login-verify.html';//预约发送验证码
            var yy_url='/site/yuyue.html';//预约
            var srf = $('meta[name="csrf-token"]').attr('content');
            //图片验证码刷新
			var imgMarkIndex=1;
			function load_captcha(){
				imgMarkIndex++;
				var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
				$.get(imgUrl, {}, function(data) {
					 $(".co_captcha").html(data.msg);
					$(".co_captcha img").show();
					$(".co_imgtxt").addClass("hidden");
				}, 'json');
			}
			//图片验证码刷新
			$(".co_captcha").click(function(){
				load_captcha();
				is_focus=2;
			});
			//错误提示显示
function showErr(index, text) {
	$(".co_error").eq(index).addClass("co_err_show").html(text);
	$(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
	$(".co_error").eq(index).removeClass("co_err_show");
}
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
			$(function (){
				var mySwiper = new Swiper(".left_banner", {
			pagination: '.swiper-pagination',
			paginationClickable :true,
			loop:true,
			autoplay : 4000
		});
		var mySwiper01 = new Swiper(".ts_banner", {
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
			pagination: '.pagenation',
			paginationClickable: true,
			paginationBulletRender: function(swiper, index, className) {
				var font = new Array();
				$(".xn_pic").each(function() {
					font.push($(this).attr("data-src"));
				});
				return '<li class="' + className + '"><img src=' + font[index] + ' /></li>';
			}
		});
		$(".news_ul li").hover(function() {
			var index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$(".news_div ul").eq(index).addClass("active").siblings().removeClass("active");
		}, function() {
			$(this).addClass("active");
		});
		//返回顶部
		$(".back").click(function() {
			$("html,body").animate({
				scrollTop: 0
			}, 500);
		});
		$("#page_one").click(function() {
			$("html,body").animate({
				scrollTop: 0
			}, 500);
		});
		$("#page_two").click(function() {
			$("html,body").animate({
				scrollTop: 830
			}, 500);
		});
		$("#page_three").click(function() {
			$("html,body").animate({
				scrollTop: 1600
			}, 500);
		});
		var url = window.location.href;
		if(url.indexOf("id") >= 0) { 
			$("html,body").animate({
				scrollTop: 1600
			}, 500);
		};
				//点击关闭下悬浮框
				$(".ob_close").click(function() {
					$(".downBg").addClass("active");
					$(".rightBg").addClass("active");
				});
				$(".ob_open").click(function() {
					$(".downBg").removeClass("active");
					$(".rightBg").removeClass("active");
				});
				//下浮框悬浮微信
				$(".right_mess ul li:nth-child(1)").hover(function() {
					$(".d_float").stop().fadeIn();
				}, function() {
					$(".d_float").stop().fadeOut();
				});
				$(".d_float").hover(function() {
					$(this).stop().fadeIn();
				}, function() {
					$(this).stop().fadeOut();
				});
				$(".rdo").click(function(){
					$(this).addClass("on").siblings().removeClass("on");
				});
				$(".co_tips_surebtn").click(function(){
					$(".yy_box,.co_tips").addClass("hidden");
				})
			});
			//弹窗关闭
			$(".close").click(function(){
				$(".gg_box").addClass("hidden");
			});
			//登录获取验证码
$(".co_codebtn1").click(function(){
	var my_phone = $(this).closest(".co_tips_yy").find(".co_username").val();
	var captcha =  $(this).closest(".co_tips_yy").find(".captcha").val();
	var type_id=$(".rdo.on").attr("data-id");
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	}else if(my_phone.length != 11){
		showErr(0, "手机号码不正确哦");
		return;
	}
	hideErr(0);
	$.post(verify_url,{ "phone":my_phone,"captcha":captcha,"type":type_id,"scene":"0","cms_csrf":srf },function(data){
		if(data.status == 0){
			$(".co_codebtn1").css("pointer-events","none");
			page_djs($(".co_codebtn1"),function(){
				$(".co_codebtn1").css("pointer-events","auto");
			});
		}else if(data.status ==-2){
			alert(data.msg);
			load_captcha();
			$(".tupian").show();
		} else{
			if(data.msg=="您已经预约过了，请勿重复预约"){
			    $(".co_tips_yy").addClass("hidden");
			    $(".yy_txt span").text(data.data.giftCodeYuyue);
				$(".co_tips_success").removeClass("hidden");
			}else{
				alert(data.msg);
			}
			load_captcha();
		}
	}, 'json');
});
			//登录请求
$(".co_tips_yybtn").click(function(){
	fgw_yy_pc();
	var my_phone = $(".co_username").val();
	var co_codenum1=$('.co_codenum1').val();
	var type_id=$(".rdo.on").attr("data-id");
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
		'url':yy_url,
		'data':{'phone':my_phone,'yzm':co_codenum1,'type':type_id,"cms_csrf":srf },
		'type':'POST',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				fgw_yy_pc_success();
				$(".co_tips_yy").addClass("hidden");
				$(".yy_txt span").text(data.data.giftCodeYuyue);
				$(".co_tips_success").removeClass("hidden");
				$(".yy_btn").addClass("active");
			}else{
				$(".co_tips_yy").addClass("hidden");
				if(data.msg=="您已经预约过了，请勿重复预约"){
					$(".yy_btn").addClass("active");
					$(".co_tips_yy").addClass("hidden");
				    $(".yy_txt span").text(data.data.giftCodeYuyue);
				    $(".co_tips_success").removeClass("hidden");
				}else{
					alert(data.msg);
				}
				load_captcha();
			}
		}
	});
});
// 点击预约出弹窗
$(".yy_btn").click(function(){
	if($(this).hasClass("active")){
	$(".co_tips_yy").addClass("hidden");
	$(".yy_box,.co_tips_success").removeClass("hidden");
	console.log(0);
    }else{
	$(".yy_box,.co_tips_yy").removeClass("hidden");
	$(".co_tips_success").addClass("hidden");
	console.log(1);
    }
})