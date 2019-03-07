$(function(){
	// 抽奖
	var lottery={
		index:-1,	//当前转动到哪个位置，起点位置
		count:0,	//总共有多少个位置
		timer:0,	//setTimeout的ID，用clearTimeout清除
		speed:20,	//初始转动速度
		times:0,	//转动次数
		cycle:5,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
		prize:-1,	//中奖位置
		mask :-1,
		init:function(id){
			if ($("#"+id).find(".item").length>0) {
				$lottery = $("#"+id);
				$units = $lottery.find(".item");
				this.obj = $lottery;
				this.count = $units.length;
				$lottery.find(".item"+this.index).addClass("active");
			};
		},
		roll:function(){
			var index = this.index;
			var count = this.count;
			var lottery = this.obj;
			$(lottery).find(".item"+index).removeClass("active");
			index += 1;
			if (index>count) {
				index = 0;
			};
			$(lottery).find(".item"+index).addClass("active");
			this.index=index;
			return false;
		},
		stop:function(index){
			this.prize=index;
			return false;
		}
	};

	function roll(){
		lottery.times += 1;
		lottery.roll();
		if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
			clearTimeout(lottery.timer);
			// ajax返回
			setTimeout(function(){
				$(".mask").show();
				$(".tack_result").show();
			},500)
			lottery.prize=-1;
			lottery.times=0;
			click=false;
		}else{
			if (lottery.times<lottery.cycle) {
				lottery.speed -= 10;
			}else if(lottery.times==lottery.cycle) {
				var index = Math.random()*(lottery.count)|0;
				$.post(
					'/activity/getrand',{},
					function(data){
						//alert(data);
						var data = eval("("+data+")");
						if(data.status == 0){
							var n = data.msg;
							lottery.prize = n ;
							lottery.mask = n;
							//$('.where_gift').text($('.main3 .item'+n).attr('name'));
							$('.where_gift').text('该奖品今天已经抽完了，下次早点来');
						}else{
							var n = data.msg;
							lottery.prize = n ;
							lottery.mask = n;
							$('.where_gift').text($('.main3 .item'+n).attr('name'));
						}
					}
				);	
			}else{
				if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
					lottery.speed += 110;
				}else{
					lottery.speed += 20;
				}
			}
			if (lottery.speed<40) {
				lottery.speed=40;
			};
			lottery.timer = setTimeout(roll,lottery.speed);
		}
		return false;
	}

	var click=false;

	window.onload=function(){
		lottery.init('lottery');
		$(".prize_btn").click(function(){
				if (click) {
					return false;
				}else{
					var prizeTime = $(".prize_time").text();
					$.post(
						'/activity/get_lottery_number',{},
						function(data){
							if(data == -1){
								//您尚未登录，请先登录;
								$(".mask").show()
								$(".tack_sign").show();
								return false;
							}else{
								if(data > 0){
									lottery.speed=100;
									roll();
									click=true;
									$(".prize_time").text(prizeTime-1);
								}else{
									//您当前没有抽奖次数;
									$("#prize_time").text(0);
									//$(".mask").show();
									alert('你当前没有抽奖次数');
									return false;
								}
							}
						}
					);
				
				}		
		});
	};

	// 弹层关闭
	$(".tack_close").click(function(){
		$(".tack_prize").hide();
		$(".tack_sign").hide();
		$(".tack_login").hide();
		$(".tack_active").hide();
		$(".tack_record").hide();
		$(".tack_pay").hide();
		$(".tack_result").hide();
		$(".tack_add").hide();
		$(".tack_bc").hide();
	})
	// 购买记录
	$(".nav_buy").click(function(){
		$.post(
			'/activity/get_buy_record',
			{},
			function(data){
				if(data==-1){
					//尚未登录
					$(".mask").show()
					$(".tack_sign").show();
					return false;
				}else{
					var dataObj=eval("("+data+")");
					var tmp ='';
					for(var i=0;i<dataObj.length;i++)
					{	
						tmp +='<li><span>强化点礼包</span><span>'+ dataObj[i].code +'</span><span>'+ dataObj[i].add_time +'</span></li>';
					}
					$(".tack_bccon ul").html(tmp);	
					$(".mask").show();
					$(".tack_bc").show();
					
				}
			}
		);
	})
	// 收货地址
	$(document).on("click",".tack_record_fz",function(){
		$(".tack_record").hide();
		var prize_id = $(this).attr('data-id');
		$.post(
				'/activity/get_address_info',
				{
					prize_id:prize_id
				},
				function(data){
					var data = eval("("+data+")");
					$('#prize_id').val(prize_id);
					if(data.status == 1){
						$('#s_name').val(data.s_name);
						$('#s_address').val(data.s_address);
						$('#s_phone').val(data.s_phone);
					}else{
						$('#s_name').val('');
						$('#s_address').val('');
						$('#s_phone').val('');
					}
				}
			);
		$(".tack_add").show();
	})
	/* $(".tack_record_fz").click(function(){
		alert(111);
		$(".tack_record").hide();
		$(".tack_add").show();
	}) */
	$(".tack_add_btn").click(function(){
		var s_name = $('#s_name').val();
		var s_address = $('#s_address').val();
		var s_phone = $('#s_phone').val();
		var prize_id = $('#prize_id').val();
		if(s_name == '' || s_address == '' || s_phone == ''){
			alert('所有选项均为必填项，请重新填写');
			return false;
		}
		//验证收货人姓名
		var reg1 = /^[\u4e00-\u9fa5]+$/; 
		if(!reg1.test(s_name))
		{
			alert("真实姓名必须为中文，请重新填写");
			return false;  
		}
		//验证收货人电话
		var reg3 = /^0?1[34578]\d{9}$/;  
		if(!reg3.test(s_phone))
		{
			alert("电话号码格式不正确，请重新填写");
			return false;  
		}
		$.post(
			'/activity/save_address',
			{
				s_name:s_name,
				s_address:s_address,
				s_phone:s_phone,
				prize_id:prize_id
			},
			function(data){
				var data = eval("("+data+")");
				if(data.status == 1){
					$(".tack_add").hide();
					$(".mask").hide();
					alert(data.msg);
				}else{
					alert(data.msg);
					return false;
				}
			}
		);
	})
	// 活动规则
	$(".nav_active").click(function(){
		$(".tack_active").show();
	})
	// 奖励展示
	$(".nav_prize").click(function(){
		$(".tack_prize").show();
	})
	// 获奖记录
	$(".nav_record").click(function(){
		Get_record();
		//$(".tack_record").show();
	})
	// 查看奖励
	$(".tack_re_scan").click(function(){
		$(".tack_result").hide();
		Get_record();
	})
	// 继续抽奖
	$(".tack_re_return").click(function(){
		$(".tack_result").hide();
	})
	// 登陆
	$(".nav_sign").click(function(){
		$(".tack_sign").show();
	})
	// 注销
	$(".nav_logout").click(function(){
		
	})
	// 注册
	$(".tack_sign_login").click(function(){
		$(".tack_sign").hide();
		$(".tack_login").show();
	})
	// 购买
	$(".gift_buy").click(function(){
		//判断用户是否登录
		$.post(
				'/activity/is_login',
				{},
				function(data){
					if(data == 0){
						alert('登录后才能购买，请先去登录');
						return false;
					}else{
						$(".tack_pay").show();
					}
				}
			)
	})
	//去登陆
	$(".tack_sign_btn").click(function(){
		//登录方法
			var l_phone = $('#l_phone').val();
			var l_password = $('#l_password').val();
			var l_code = $('#l_code').val();
			$.ajax ({
				url: '/activity/login',
				type: "POST",
				data: {l_phone:l_phone,l_password:l_password,l_code:l_code},
				dataType: "json",
				success: function(data){
					//var ret = eval('(' + data + ')');	
					var ret = data;
					if(ret.error == 0){
						window.location.href="/activity/act20160405_m";						
					}else if(ret.error == -1){
						alert(ret.msg);
						return false;
					}else{
						alert('用户名或密码错误');
						return false;
					}
				}
			});
	})
	
	//去注册
	$(".tack_login_btn").click(function(){
		var phone = $.trim($('#phone').val());
		var code = $.trim($('#code').val());	
		var password = $.trim($('#password').val());
		var reg_pwd = $.trim($('#reg_pwd').val());
		//各个填项的长度
		var len2 = password.length;
		//验证所有填项是否为空
		if(phone==''||code==''||password==''||reg_pwd==''){
			alert('所有选项均为必填项，请重新填写');
			return false;
		}else{
			//密码的验证规则
			reg2=/^[a-z,A-Z]+[0-9]*[a-z,A-Z]*[0-9]*$/;
			if(!reg2.test(password)){
				alert('密码应为大小写英文和数字');
				return false;
			}else{
				if(len2<6||len2>16){
					alert('密码的长度为6-12个字符，请重新填写');
					return false;
				}
			}
			//验证确认密码和密码是否一致
			if(password != reg_pwd){
				alert('两次输入密码不一致');
				return false;
			}
		
		}
		$.post(
			'/activity/add_user',
			{
				phone:phone,
				code:code,
				password:password,
				reg_pwd:reg_pwd
			},
			function(data){
				var ret = eval('(' + jQuery.parseJSON(data) + ')');
				if(ret.error == 0){
					$(".tack_login").hide();
					alert('注册成功');
				}else{
					//alert('注册失败');
					alert(ret.msg);
					return false;
				}
			}
		);
	})

	// pay--num
	var payNum = parseInt($(".tack_pay_num").val()),
		payAdd = $(".tack_pay_add"),
		payCou = $(".tack_pay_cou"),
		payNummm = $(".tack_pay_num");
	payAdd.click(function(){
		payNum+=1;
		$(".tack_pay_num").val(payNum);
		$(".tack_pay_money").text(payNum*2);
	});
	payCou.click(function(){
		if(payNum <= 1){
			payNum = 1;
		} else {
			payNum-=1;
		};
		$(".tack_pay_num").val(payNum);
		$(".tack_pay_money").text(payNum*2);
	});
	payNummm.change(function(){
		payNum = parseInt($(".tack_pay_num").val());
		$(".tack_pay_money").text(payNum*2);
	})

})
//得到获奖记录数据方法
function Get_record(){
	
	$.post(
		'/activity/get_record',
		{},
		function(data){
			if(data == -1){
				$(".mask").show()
				$(".tack_sign").show();
				return false;
			}else{
				var data=eval("("+data+")");
				var dataObj=data.data.prizeData;
				var dataExt=data.data.extinfo;
				var tmp ='';
				for(var i=0;i<dataObj.length;i++)
				{
					if(dataExt[dataObj[i].prize_id].is_shop == 2){
						tmp += '<li><div class="tack_record_inf"><img src="'+ dataExt[dataObj[i].prize_id].image_url +'" alt=""></div><div class="tack_record_text"><h3>'+ dataExt[dataObj[i].prize_id].title +'</h3><p class="tack_record_p1">'+ dataExt[dataObj[i].prize_id].desc +'</p><span class="tack_record_fz" data-id="'+dataObj[i].id+'">请输入收货地址</span></div></li>';
					}else{
						tmp += '<li><div class="tack_record_inf"><img src="'+ dataExt[dataObj[i].prize_id].image_url +'" alt=""></div><div class="tack_record_text"><h3>'+ dataExt[dataObj[i].prize_id].title +'</h3><p class="tack_record_p1">'+ dataExt[dataObj[i].prize_id].desc +'</p><p class="tack_record_p2">礼品码：<span>'+ dataObj[i].code +'</span></p></div></li>';
					}
					
				}
				$(".tack_recordbg ul").html(tmp);
				$(".mask").show();
				$(".tack_record").show();
			}
		}
	)
}
