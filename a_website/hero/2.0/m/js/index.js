$(function(){
	//云的移动
	function cloudMove(){
		$(".cloud img").each(function(i,n){
			var speed=$(this).attr("speed");
			var fast=speed>50;
			$(this).css({
				'transform': 'translate3d(' + 2*speed*(getRandom(fast)) + 'px,' + speed*(getRandom(fast)) + 'px, 0)'
			});
		});
	}
	cloudMove();
	setInterval(cloudMove,5000);
	function getRandom(a){
		var n=Math.random()-0.5;
		return a^Math.abs(n)>0.25?getRandom(a):n;
	}
});

var order_url = '/commonMethod/yuyue';
var send_url ='/commonMethod/get-verify';
var device_type="ios";

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
//下载弹框
$(".loadbtn").click(function(){
	$(".load_tips").removeClass("hidden");
});
$(".loadtips_close").click(function(){
	$(".load_tips").addClass("hidden");
	$(".load_tel").val("");
	$(".codenum").val("");
});
$(".ios").click(function(){
	$(this).parent().removeClass("btn-1");
	$(".load_tel").val("");
	$(".codenum").val("");
	device_type="ios";
	$(".load_div").removeClass("hidden");
	$(".order_div").addClass("hidden");
});
$(".ad").click(function(){
	$(this).parent().addClass("btn-1");
	$(".load_tel").val("");
	$(".codenum").val("");
	device_type="android";
	$(".load_div").addClass("hidden");
	$(".order_div").removeClass("hidden");
});
//发送验证码
$(".sendcode").click(function(){
	var my_phone = $(".load_tel").val();
	if(my_phone == "" || my_phone == undefined) {
		alert("手机号不能为空");
		return;
	}
	if(!(/^1[34578]\d{9}$/.test(my_phone))) {
		alert("请输入正确的手机号码");
		return;
	}
	var srf = $('meta[name="csrf-token"]').attr('content');
	$.post(send_url,{ "phone":my_phone,"type":7,"device_type":device_type,"cms_csrf":srf },function(data){
		if(data.status == 0){
			$(".sendcode").css("pointer-events","none");
			$(".sendcode").addClass("normal");
			page_djs($(".sendcode"),function(){
//						alert('倒计时结束');
				$(".sendcode").css("pointer-events","auto");
				$(".sendcode").removeClass("normal");
			});
		}else{
			alert(data.msg);
		}
	}, 'json');
});
//确认提交
$(".orderbtn").click(function(){
	var my_phone = $(".load_tel").val();
	var my_code = $(".codenum").val();
	if(my_code == "" || my_code == undefined) {
		alert("验证码不能为空");
		return;
	}
	var srf = $('meta[name="csrf-token"]').attr('content');
	$.post(order_url,{ "phone":my_phone,"yzm":my_code,"type":device_type,"device_type":7,"cms_csrf":srf },function(data){
		if(data.status == 0){
			$(".load_tips").addClass("hidden");
			$(".load_tel").val("");
			$(".codenum").val("");
			alert(data.msg);
		}else{
			alert(data.msg);
		}
	}, 'json');
});

//input删除
$(".del").click(function(){
	$(".load_tel").val("");
});