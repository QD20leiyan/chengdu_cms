/*--------------------------------------------------赤潮页面----------------------------------------------------*/
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
/*--------------------------------------------------赤潮主播页面----------------------------------------------------*/
var verify_url ='/commonMethod/vote-verify';
var check_url ='/commonMethod/vote';
var vote_url ='/site/vote-ajax';
var change_url ='/site/vote';
//登录弹框显示
$(".vote_login").click(function(){
	$(".anchorld_tips").removeClass("hidden");
});
//登录弹框关闭
$(".anchor_close").click(function(){
	$(".anchorld_tips").addClass("hidden");
	$(".anchor_tel").val("");
	$(".anchor_code").val("");
});
//手机号码实时验证
$(".anchor_tel").keyup(function(){
	var my_phone = $(".anchor_tel").val();
	if(my_phone == "" || my_phone == undefined) {
		$(".anchorld_tips .content>div p.error").removeClass("hidden");
		$(".anchorld_tips .content>div p.error").text("手机号码不能为空哦");
		$(".anchorld_tips .content>div .code button").removeClass("is_click");
		return;
	}
	if(!(/^1[34578]\d{9}$/.test(my_phone))) {
		$(".anchorld_tips .content>div p.error").removeClass("hidden");
		$(".anchorld_tips .content>div p.error").text("手机号码错误哦");
		$(".anchorld_tips .content>div .code button").removeClass("is_click");
		return;
	}
	//这个位置让获取验证码可点击
	$(".anchorld_tips .content>div p.error").addClass("hidden");
	$(".anchorld_tips .content>div .code button").addClass("is_click");

	//主播页面--发送验证码
	$(".is_click").click(function(){
		var my_phone = $(".anchor_tel").val();
		var srf = $('meta[name="csrf-token"]').attr('content');
		$.post(verify_url,{ "phone":my_phone,"type":4,"device_type":"","cms_csrf":srf },function(data){
			if(data.status == 0){
				page_djs($(".is_click"),function(){
//						alert('倒计时结束');
				});
			}else{
				alert(data.msg);
			}
		}, 'json');
	});

	//主播页面--登录验证
	$(".anchor_btn").click(function(){
		var my_phone = $(".anchor_tel").val();
		var my_code = $(".anchor_code").val();
		if(my_code == "" || my_code == undefined) {
			alert("验证码不能为空");
			return;
		}
		var srf = $('meta[name="csrf-token"]').attr('content');
		$.post(check_url,{ "phone":my_phone,"yzm":my_code,"type":4,"device_type":"","cms_csrf":srf },function(data){
			if(data.status == 0){
				setTimeout(function(){
				//重新加载页面
					location.reload();
				},100);
				$(".anchorld_tips").addClass("hidden");
				alert(data.msg);
			}else{
				alert(data.msg);
			}
		}, 'json');
	});
});
//投票
$(".vote_click").click(function(){
	var id=$(this).attr("data-id");
	var tel=$(".vote_change").attr("data-user");
	var srf = $('meta[name="csrf-token"]').attr('content');
	var clickdom=$(this);
	var txtdom=$(this).children("i").find("b");
	var numdom=$(this).prev();
	$.post(vote_url,{ "u_id":id,"user":tel,"cms_csrf":srf },function(data){
		if(data.status == 1){
			alert("投票成功");
			numdom.text(data.num);
			txtdom.text("已投票");
		}else if(data.status == -1){
			clickdom.addClass("active");
			alert(data.msg);
		}else{
			alert(data.msg);
		}
	}, 'json');

});
//换一批
$(".change_btn").click(function(){
	var srf = $('meta[name="csrf-token"]').attr('content');
	$.post(change_url,{ "status":true,"cms_csrf":srf },function(data){
		if(data.status == 1){
			var votetpl=$(".vote_box .vote_peo:eq(0)").clone(true);
			votetpl= $.extend({},votetpl);
			$(".vote_box").empty();
			for(var i in data.vote){
				var vote=data.vote[i];
				var votetep= votetpl.clone(true);
				votetep.find("img").attr('src',vote.portrait||'');
				votetep.find('.vote_name').text(vote.userName||'');
				votetep.find('.vote_from').text(vote.userTerrace||'');
				votetep.find('.vote_num').text(vote.popValue||'');
				votetep.find('.vote_act').attr('data-id',vote.id||'');
				$(".vote_box").append(votetep);
			}
		}else{

		}
	}, 'json');

});
//活动时间轴active的显示
function getToday(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	return year+"-"+month+"-"+day;
}
$(function(){
	$("[data-date='"+getToday()+"']").closest('.time_box').addClass("active");
});
