		    var is_focus=0;//input获取事件焦点
            //预约
            var verify_url='/common/get-login-verify.html';//预约发送验证码
            var yy_url='/site/yuyue.html';//预约
            var srf = $('meta[name="csrf-token"]').attr('content');
            //图片验证码刷新
			var imgMarkIndex=1;
			var type_id="";
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
				// 设备类型判断
				var u = navigator.userAgent,
	    		 app = navigator.appVersion;
	    		 // HLog.event("nba_txty_down");
	    		 var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	    		 var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	    		 if(isAndroid) {
	    		 	type_id="android";
	    		 }
	    		 if(isIOS) {
	    		 	type_id="ios";
	    		 	$(".stat_down").removeClass("js_wap_down");
	    		 	$(".stat_down").attr("href","javascript:;");
	    		}
				$(".rdo").click(function(){
					$(this).addClass("on").siblings().removeClass("on");
				});
				$(".co_tips_surebtn").click(function(){
					$(".yy_box,.co_tips").addClass("hidden");
				})
			});
			$(".stat_ios").click(function(){
				$(".ios_tc").show();
			})
			//弹窗关闭
			$(".close").click(function(){
				$(".gg_box").addClass("hidden");
				$(".gg_box .wrap").removeClass("active");
			});
			//登录获取验证码
			$(".co_codebtn1").click(function(){
				var my_phone = $(this).closest(".co_tips_yy").find(".co_username").val();
				var captcha =  $(this).closest(".co_tips_yy").find(".captcha").val();
				
				if(my_phone == "" || my_phone == undefined) {
					alert("手机号码不能为空哦");
					return;
				}else if(my_phone.length != 11){
					alert("手机号码不正确哦");
					return;
				}
				$.post(verify_url,{ "phone":my_phone,"captcha":captcha,"type":type_id,"scene":"0","cms_csrf":			srf },function(data){
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
						     $(".yy_box .wrap").addClass("active");
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
				if(my_phone == "" || my_phone == undefined) {
					alert("手机号码不能为空哦");
					return;
				}else if(my_phone.length != 11){
					alert("手机号码不正确哦");
					return;
				}
				
				if(co_codenum1 == "" || co_codenum1 == undefined) {
					alert("验证码不能为空哦");
					return;
				}
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
							 $(".yy_box .wrap").addClass("active");
							$(".co_tips_success").removeClass("hidden");
							$(".yy_btn").addClass("active");
						}else{
							$(".co_tips_yy").addClass("hidden");
							if(data.msg=="您已经预约过了，请勿重复预约"){
								$(".co_tips_yy").addClass("hidden");
							    $(".yy_txt span").text(data.data.giftCodeYuyue);
							    $(".yy_box .wrap").addClass("active");
							    $(".co_tips_success").removeClass("hidden");
							    $(".yy_btn").addClass("active");
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
	$(".gg_box .wrap").removeClass("active");
	if($(this).hasClass("active")){
	$(".gg_box .wrap").addClass("active");
	$(".co_tips_yy").addClass("hidden");
	$(".yy_box,.co_tips_success").removeClass("hidden");
    }else{
    $(".gg_box .wrap").removeClass("active");
	$(".yy_box,.co_tips_yy").removeClass("hidden");
	$(".co_tips_success").addClass("hidden");
    }
})