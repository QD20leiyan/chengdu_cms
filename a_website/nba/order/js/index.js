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

var loginurl='/site/ajaxlogin';
var verify_url ='/site/inviteVerify';
var order_url ='/site/orderreserve';
var getgift_url ='/site/draw';
var csrfToken =$('input[name="csrf-token"]').val();
 var clickNumber2 = 0;
  $(".h_loadGame").click(function(e){
    e.stopPropagation();
    if(clickNumber2 % 2 == 0) {
    $(".down_list").slideDown(400);
    } else {
      $(".down_list").slideUp(400);
    }
    clickNumber2++;
    clickNumber=0;
  })
  $(".down_list li,.fade").click(function() {
    $(".down_list").slideUp(400);
    clickNumber2=0;
  })
//登录弹框显示
$("#login").click(function(){
	$(".tips3").removeClass("hidden");
});
//登录弹框关闭
$(".tips_close").click(function(){
	$(".tips3").addClass("hidden");
	$(".tips2").addClass("hidden");
	$(".tips1").addClass("hidden");
	$('.login .username').val("");
	$('.login .password').val("");
	$(".tips2 .tel").val("");
	$(".tips2 .codenum").val("");
	$(".tips2 .incode").val("");
	$(".error").css({"opacity":"0"});
});
//登录请求
$(".login .btnbox").click(function(){
	var name=$('.login .username').val();
	var password=$('.login .password').val();
	$.ajax({
		'url':loginurl,
		'data':{'username':name,'password':password,'FLOAT_TOKEN':csrfToken},
		'type':'POST',
		'dataType':'Json',
		success:function(data){
			if(data.status==-1){
				$(".tips3 .error").css({"opacity":"1"});
				$(".tips3 .error").text(data.msg);
				//alert(data.msg);
			}else{
				alert(data.msg);
				$(".tips3").addClass("hidden");
				$('.login .username').val();
				$('.login .password').val();
				$('.invite_code').text(data.data.invite_code);
				//重新加载页面
				location.reload();
			}
		}
	});
});
//立即预约的登录情况判断
$(".now_order").click(function(){
	if($(".content .after").length>0){
		$.get(order_url,{"order":true},function(data){
			if(data.status==-1){
				alert("您已进行过预约")
			}else{
				$(".tips2").removeClass("hidden");
			}
		}, 'json');
	}else{
		//登录之前
		$(".tips3").removeClass("hidden");
	}
	// alert("预约活动已结束");
});
//预约获取验证码
$(".getcode").click(function(){
	var my_phone = $(".tips2 .tel").val();
	//var srf = $('meta[name="csrf-token"]').attr('content');
	if(my_phone == "" || my_phone == undefined) {
		$(".tips2 .error").css({"opacity":"1"});
		$(".tips2 .error").text("手机号码不能为空哦");
		return;
	}
	$.post(verify_url,{ "phone":my_phone,'FLOAT_TOKEN':csrfToken},function(data){
		if(data.status == 0){
			$(".tips2 .error").css({"opacity":"0"});
			$(".getcode").css("pointer-events","none");
			page_djs($(".getcode"),function(){
				$(".getcode").css("pointer-events","auto");
			});
		}else{
			alert(data.msg);
		}
	}, 'json');
});
//预约提交
$(".yuyue").click(function(){
	var my_phone = $(".tips2 .tel").val();
	var code_num = $(".tips2 .codenum").val();
	var in_code = $(".tips2 .incode").val();
	//var srf = $('meta[name="csrf-token"]').attr('content');
	if(my_phone == "" || my_phone == undefined) {
		$(".tips2 .error").css({"opacity":"1"});
		$(".tips2 .error").text("手机号码不能为空哦");
		return;
	}
	if(code_num == "" || code_num == undefined) {
		$(".tips2 .error").css({"opacity":"1"});
		$(".tips2 .error").text("验证码不能为空哦");
		return;
	}
	$.post(order_url,{ "phone":my_phone,"yzm":code_num,"in_code":in_code,'FLOAT_TOKEN':csrfToken},function(data){
		if(data.status == 0){
			alert('预约成功');
			$(".tips2").addClass("hidden");
			$(".tips2 .tel").val("");
			$(".tips2 .codenum").val("");
			$(".tips2 .incode").val("");
			$(".error").css({"opacity":"0"});
		}else{
			alert(data.msg);
		}
	}, 'json');
});
//邀请好友弹框显示
$(".now_friend").click(function(){
	if($(".content .after").length>0){
		$(".tips1").removeClass("hidden");

	}else{
		//登录之前
		$(".tips3").removeClass("hidden");
	}
	// alert("预约活动已结束");
});
//礼包领取
$(".get_gift").click(function(){
	var id=$(this).attr("data-id");
	var that=$(this);
	$.post(getgift_url,{ "id":id,'FLOAT_TOKEN':csrfToken},function(data){
		if(data.status == 1){
			alert('礼包领取成功,奖励将于开测后通过短信形式发放至绑定手机号中');
			that.parent().removeClass("active-1").addClass("active");
		}else{
			alert(data.msg);
		}
	}, 'json');
});
//礼包解锁
$(function(){
	var peo_num=$(".content>div .order_peo span").text();
	if(peo_num>=5000){
		$(".ring1").removeClass("lock");
	}if(peo_num>=10000){
		$(".ring1").removeClass("lock");
		$(".ring2").removeClass("lock");
	}if(peo_num>=50000){
		$(".ring1").removeClass("lock");
		$(".ring2").removeClass("lock");
		$(".ring3").removeClass("lock");
	}if(peo_num>=100000){
		$(".ring1").removeClass("lock");
		$(".ring2").removeClass("lock");
		$(".ring3").removeClass("lock");
		$(".ring4").removeClass("lock");
	}if(peo_num>=500000){
		$(".ring1").removeClass("lock");
		$(".ring2").removeClass("lock");
		$(".ring3").removeClass("lock");
		$(".ring4").removeClass("lock");
		$(".ring5").removeClass("lock");
	}

	initActive($(".progress").data("num"),$(".progress").data("id"));
});
//进度条显示
function initActive(num,dataid){
	var arr=(dataid||"").split(",");
	num=parseInt(num)>0?parseInt(num):0;//防止小于0
	$(".step").each(function(i,n){
		var id=$(n).find(".get_gift").attr("data-id");
		var datanum=parseInt($(n).attr("data-num"));
		if(num>=datanum){
			$(n).prev().addClass("probar2");
			$(n).addClass("active-1");
			if(arr.indexOf(id)>-1){
				//在数组中，已领取礼包
				$(n).removeClass("active-1").addClass("active");
			}
		}
		if(num>datanum){
			$(n).prev(".half").removeClass("half");
			$(n).addClass("probar1").addClass("half");
		}else if(num==datanum){
			$(n).prev(".half").removeClass("half");
		}
	})
	if(num>5&&num<10){
		$(".step:eq(2) .now_peo").text(num);
	}
}
//回车键触发事件
$(".tips2").keyup(function(event){
	if(event.keyCode ==13){
		$(".yuyue").trigger("click");

	}
});
$(".tips3").keyup(function(event){
	if(event.keyCode ==13){
		$(".login .btnbox").trigger("click");
	}
});