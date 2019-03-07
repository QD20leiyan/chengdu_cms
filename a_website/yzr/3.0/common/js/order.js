$(window).load(function(){

		$(".order").click(function(){
			$(".shadow_order").show();
		})
		$(".orderClose").click(function(){
			$(".shadow_order").hide();
		})
		$("#sure").click(function(){
			$(".shadow_phone").hide();
			$(".shadow_order").show();
		})
		$("#sure1").click(function(){
			$(".shadow_phone").hide();
			$(".shadow_order").hide();
		})
		$("#phoneClose").click(function(){
			$(".shadow_phone").hide();
			$(".shadow_order").show();
		})
		$("#phoneClose1").click(function(){
			$(".shadow_phone").hide();
			$(".shadow_order").hide();
		})
		$(".phone li").eq(0).on("click",function(){
			$(".phone li").eq(0).addClass("Android");
			$(".phone li").eq(0).siblings().removeClass("ios");
			
		}); 
		$(".phone li").eq(1).on("click",function(){
			$(".phone li").eq(1).addClass("ios");
			$(".phone li").eq(1).siblings().removeClass("Android");			
		});
		$(".submit").on("click",function(){			
			var oUserTel=$('.telInp');
			var userTel=/^1[34578]\d{9}$/;
			if(userTel.test(oUserTel.val())){
				var mobile=oUserTel.val();

				if($(".phone li").hasClass("Android")){
					var platform=1;
				}else if($(".phone li").hasClass("ios")){
					var platform=2;
				}else{
					$(".shadow_order").hide();
					$("#shadow_false2").show();
					$(".falseTxt").html("请选择手机平台");
					return ;
				}
				$.ajax({
				    url: '',
				    type: 'POST',
				    data:{"mobile":mobile,"platform":platform},
				    dataType: 'json',
				    success : function(data){
				        if(data['code']==0){
				        	//预约下载失败
				        	$(".shadow_order").hide();
							$("#shadow_false2").show();
							$(".falseTxt").html("系统繁忙，请稍后再试！");
				        }else if(data['code']==2){
				        	//已经预约
				        	$(".shadow_order").hide();
							$("#shadow_false2").show();
							$(".falseTxt").html("该手机号码已经预约！");
				        }else{
				        	if(data['platform']==1){
				        		$(".shadow_order").hide();
								$("#shadow_false1").show();
								$('.phoneTxt').html("亲爱的入局者，恭喜您获得《影之刃2》江湖好礼一份。请保持手机畅通，游戏上线后，我们将以礼包码的形式发放至您的手机，让您驰聘武林，鏖战江湖。");
				        	}else if(data['platform']==2){
				        		$(".shadow_order").hide();
								$("#shadow_false1").show();
								$('.phoneTxt').html("亲爱的入局者，当游戏预约人数到达10万以上的时候，我们运营团队将会为大家带来江湖好礼数份。发至各位手机，11月17日，App  Store，让我们江湖再见吧！");
				        	}
				        }
				    },
				    error: function(){
				        $(".shadow_order").hide();
						$("#shadow_false2").show();
						$(".falseTxt").html("系统繁忙，请稍后再试！");
				    }
				});
			}else{
				$(".shadow_order").hide();
				$("#shadow_false2").show();
				$(".falseTxt").html("请输入正确的手机号码");
			}
		});

});