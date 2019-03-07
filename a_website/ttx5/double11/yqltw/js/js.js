$(function(){
	$(".receive-sus-btn").click(function(){
		$(".receive-sus-mask").hide();
	})
	$(".tel-mask-close").click(function(){
		$(".tel-mask").hide();
	})
	$(".tel-mask-close").mouseover(function(){
		$(this).addClass("active");
	}).mouseout(function(){
		$(this).removeClass("active");
	})
	function $ajax(url,params,res){
		$.ajax({
			url:url,
			type:"POST",
			data:params,
			dataType:"json",
			success:function(data){
				res(data);
			}
		})
	}
	$ajax("/double11/getUserInfo.html",{},function(data){
		if(data.status == -1){ //没有登录
			$(".no-login").show().next().hide();
			$(".quit-login").hide();
			
			
		}else if(data.status == 0){ //已经登录
			$(".alr-login").show().prev().hide();
			$(".alr-login span").html(data.code);
			$(".quit-login").show();
			$(".quit-phone").html(data.phone);

		}
		$(".get-double11-btn").click(function(){ //领取双十一礼包
			HLog.event("ljlq_btn_pc"); 
			$(".tel-mask").show();
			$("input").val('');
			$(".error-tips").hide();
			$ajax("/double11/getCaptcha.html",{},function(data1){
				if(data1.status == 0){
					$(".code-img").html(data1.msg);
				}
			})
			$(".code-img").click(function(){
				$ajax("/double11/getCaptcha.html",{},function(data2){
					if(data2.status == 0){
						$(".code-img").html(data2.msg);
					}
				})
			})
			var telFlag = 0;
			function telSure(){
				var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
				var phone = $(".phone input").val();
				if(phone == '' || phone == 'undefined' || phone == null){
					$(".error-tips").show();
					$(".phone-tips").html("请输入手机号");
					telFlag = 0;
				}else if(!myreg.test(phone)){
					$(".error-tips").show();
					$(".phone-tips").html("请输入正确的手机号");
					telFlag = 0;
				}else if(phone.length != 11){
					$(".error-tips").show();
					$(".phone-tips").html("请输入有效的手机号");
					telFlag = 0;
				}else{
					telFlag = 1;
				}
			}
			
			$(".tel-mask-btn").click(function(){
				telSure();
				if(telFlag){
					if($(".verify-code").val() == '' || $(".write-code").val() == ''){
						$(".error-tips").show();
						$(".phone-tips").html("验证码不能为空");
						return false;
					}else{
						$ajax("/double11/login.html",{"verify":$(".write-code").val()},function(res1){
							if(res1.status == -1){
								$(".error-tips").show();
								$(".phone-tips").html(res1.msg);
							}else if(res1.status == 0){
								$(".tel-mask").hide();
								$(".receive-sus-mask").show();
								$(".gift-code").html(res1.code);
								$(".alr-login").show().prev().hide();
								$(".alr-login span").html(res1.code);
								$(".quit-login").show();
								$(".quit-phone").html($(".phone input").val());
							}
						})
					}
				}
			})
			var countdown = 60;
			$(".get-code").click(function(){
				telSure();
				if(telFlag){
					if($(".verify-code").val() == ''){
						$(".error-tips").show();
						$(".phone-tips").html("图形验证码不能为空");
					}else{
						$ajax("/double11/getVerify.html",{"phone":$(".phone input").val(),"verify":$(".verify-code").val()},function(res){
							if(res.status == 0){ //发送成功
								$(".error-tips").hide();
								var obj = $(".get-code");
								if(countdown == 60){
									var timer = setInterval(function() {
										if(countdown == 0) {
											obj.removeClass("gray");
											obj.attr("disabled", false);
											obj.html("获取验证码");
											countdown = 60;
											clearInterval(timer);
											return;
										} else {
											obj.addClass("gray");
											obj.attr("disabled", true);
											obj.html("重新发送(" + countdown + ")");
											countdown--;
										}
									}, 1000);
								}
								
							}else{
								$(".error-tips").show();
								$(".phone-tips").html(res.msg);
							}
						})
					}
					
				}
			})
		})
		$(".quit-btn").click(function(){//注销手机号
			$ajax("/double11/logout.html",{},function(quitData){
				if(quitData.status == 0){
					$(".no-login").show().next().hide();
					$(".quit-login").hide();
				}
			})
		})
	})

	//复制
	var clipboard=new Clipboard('#tc7_copyBtn0');
	clipboard.on('success', function(e) {
		alert("已复制");
	});
	clipboard.on('error', function(e) {
		console.log(e);
	});

	bShare.addEntry({
         title: "一起来跳舞",
         url: "",
         summary: "我正在一起来跳舞官网参加双11欢乐购，新品折扣钜惠玩，你也来看看吧",
         pic: ""
    });

})