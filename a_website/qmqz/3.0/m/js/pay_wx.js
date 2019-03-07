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
		if (lottery.times > lottery.cycle+5 && lottery.prize==lottery.index) {
			clearTimeout(lottery.timer);
			// ajax返回
			setTimeout(function(){
				// var prizeName = $(".q-prizecon .item").eq(lottery.mask-1).attr("name");
				// $(".q-getjp img").attr("src","images/q_prize_"+lottery.mask+".png");
				// $(".q-tackcon-getcon h3 span").text(prizeName);
				// $(".q-tack-get").show();
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
					'/wxpay/getrand.html',{},
					function(data){
						//alert(data);
						var data = eval("("+data+")");
						if(data.status == 0){
							var n = data.data;
							lottery.prize = n;
							lottery.mask = n;
							$('.where_gift').text($('.main3 .item'+n).attr('name'));
						}else if(data.status == 1){
							//$('.tack_pay').show();
							window.location.reload();
							return false;
						}else{
						     alert(data.msg);
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
				if(checkTime()){
					alert('【活动已结束】');
					return false;
				}
				
				if (click) {
					return false;
				}else{
					var prizeTime = $(".prize_time").text();
					if(prizeTime <= 0){
						//判断是否已达上限
						alert('您当前没有抽奖次数');
						$.ajax({
							url:'/wxpay/getLimit',
							method:'POST',
							data:{},
							success:function(data){
							    var data =eval('('+data+')');
                                                            if(data.status==1){
							   	alert(data.msg);return false;
                                                            }else{
							        $('.tack_pay').show();
								return false;
							    }
							}
						})
					}else{
						lottery.speed=100;
						roll();
						click=true;
						if(prizeTime <= 0){
							$(".prize_time").text("0")
						}else{
							$(".prize_time").text(prizeTime-1)
						}
						return false;
					}
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
			'/wxpay/getBuyRecord.html',
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
							tmp +='<li><span>荣誉礼包</span><span>'+ dataObj[i].code +'</span><span>'+dataObj[i].add_time+'</span></li>';
					}
					$(".tack_bccon ul").html(tmp);
					$(".mask").show();
					$(".tack_bc").show();
				}
			}
		);
	})

	
	
	$(".tack_recordbg .tack_record_text").on("click",".tack_record_fz",function(data){
	    //$(".tack_record").hide();
	    //$(".tack_add").show();
	});
	$(".tack_add_btn").click(function(){
		var s_name = $('#s_name').val();
		var s_address = $('#s_address').val();
		var s_phone = $('#s_phone').val();
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
			'/wxpay/saveAddress.html',
			{
				s_name:s_name,
				s_address:s_address,
				s_phone:s_phone,
				prize_id:$('.tack_add .tack_prize_id').val()			
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
		//Get_record();
		Get_record();
		//$(".tack_record").show();
		$(".tack_result").hide();
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

function getRecord(obj){
	var prize_id = $(obj).attr('data-prize-id');
	$('.tack_prize_id').val(prize_id);
	$.post('/wxpay/getAddress.html',{prize_id:prize_id},function(data){
	    var data = eval("("+data+")");
	    if(data == -1){
             $('#s_name').val("");
            $('#s_address').val("");
            $('#s_phone').val("");
	    }else{
	    $('#s_name').val(data.s_name); 
	    $('#s_address').val(data.s_address); 
	    $('#s_phone').val(data.s_phone); 
	    }
	})
	$(".tack_record").hide();
	$(".tack_add").show();

}	
//得到获奖记录数据方法
function Get_record(){
	
	$.post(
		'/wxpay/getRecord.html',
		{},
		function(data){
			var data = eval("("+data+")");
			if(data.status != 0){
				$(".mask").show()
				$(".tack_sign").show();
				return false;
			}else{
				
				var dataObj=data.data.prizeData;
				var dataExt=data.data.extinfo;
				var tmp ='';
				for(var i=0;i<dataObj.length;i++)
				{
					if(dataExt[dataObj[i].prize_id].is_shop == 2){
						tmp += '<li><div class="tack_record_inf"><img src="'+ dataExt[dataObj[i].prize_id].image_url +'" alt=""></div><div class="tack_record_text"><h3>'+ dataExt[dataObj[i].prize_id].title +'</h3><p class="tack_record_p1">'+ dataExt[dataObj[i].prize_id].desc +'</p><p class="tack_record_p2"></p><span class="tack_record_fz" data-prize-id="'+dataObj[i].id+'" onclick="getRecord(this)">请输入收货地址</span></div></li>';
					}else{
						tmp += '<li><div class="tack_record_inf"><img src="'+ dataExt[dataObj[i].prize_id].image_url +'" alt=""></div><div class="tack_record_text"><h3>'+ dataExt[dataObj[i].prize_id].title +'</h3><p class="tack_record_p1">'+ dataExt[dataObj[i].prize_id].desc +'</p><p class="tack_record_p2">礼包码：<span>'+ dataObj[i].code +'</span></p></div></li>';
					}
					
				}
				$(".tack_recordbg ul").html(tmp);
				$(".mask").show();
				$(".tack_record").show();
			}
		}
	)
}


function checkTime(){
	//var beginTime = new Date().toLocaleString('chinese',{hour12:false});
	var beginTime = curTime;
	var endTime = '2016-09-25 18:30:00';
	var b=beginTime.replace(/-/g, "/");//2010-04-29  2010/04/29
	var e=endTime.replace(/-/g, "/");
	var dt1=new Date(Date.parse(b));
	var dt2=new Date(Date.parse(e));
	if(dt1>dt2){//比较日期
		return true;
	}
	return false;
}
