$(function(){
		$(".qmail a").click(function(){
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parent().find("input[type='hidden']").val($("#mail-hid").val());
		});
		$(".game-city a").click(function(){
			$(this).addClass("on").siblings().removeClass("on");
			//$(this).parent().find("input[type='hidden']").val($(this).data('aid'));
		});
		$(".mmecbtn").click(function(){
			var userReg = /^[a-zA-Z\u4e00-\u9fa5\.\-]{1,20}$/;
			var userInput = $("#user-input").val();
			var iphoneReg = /^1[3,4,5,7,8]\d{9}$/;
			var iphoneInput = $("#iphone-input").val();
			var qqReg = /^[1-9][0-9]{4,}$/;
			var qqInput = $("#qq-input").val();
			var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
			var mailInput = $("#mail-hid").val();	
			var cityInput = $(".game-city a.on").data('aid');	
		
		   if(!userReg.test(userInput)){alert('用户名不准确');return false}
		   if(!iphoneReg.test(iphoneInput)){alert('电话格式不对');return false}
		   if(!qqReg.test(qqInput)){alert('QQ格式不对');return false}else{var qqH =qqInput+"@qq.com";$("#mail-hid").val(qqH)}
		   
		   if($(".qmail a.on").data("mid")==2){if($("#mail-input").val()=='' || !mailReg.test($("#mail-input").val())){alert('邮箱格式不对');return false}else{$("#mail-hid").val($("#mail-input").val());mailInput = $("#mail-hid").val(); }}else{mailInput = $("#mail-hid").val(); }
		
			$.post(
				'/game/save_mmec',
				{
					real_name:userInput,
					phone:iphoneInput,
					qq:qqInput,
					email:mailInput,
					city:cityInput
				},
				function(data){
					if(data == 1){
						$("#mask").show();
						$(".i-suss").show();
					}else if(data == -1){
						alert('电话号码已存在，请重新填写');
						return false;
					}else if(data == -2){
						alert('邮箱已经存在');
						return false;
					}else{
						alert('保存失败，请重新填写');
						return false;
					}
				}
			);
		   
		   
		   //$(".i-suss-box").html('<p>您获得天天酷跑MMEC城市赛专属报名礼包。<br>CDKEY礼包兑换码为：XXXXX。</p><a href="javascript:;">兑换细则</a>');
		   //$(".i-suss-box").html('<p>关注XX游戏公众号，<br>回复MMEC领取赛事报名专属礼包。</p><img src="./common/images/mmecgif1.jpg" alt="">');
		   
		   
		   //$("#mask").show();
		   //$(".i-suss").show()
		});
		$(".i-suss i").on('click',function(){
		   $(".i-suss").hide();
		   $("#mask").hide();
		})

	});