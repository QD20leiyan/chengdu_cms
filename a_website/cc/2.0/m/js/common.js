function tankuang(movieSrc){
	var smarty = '{$smarty.const.STATIC_DOMAIN}2.0/m/';
	var tankuangHtml = '<div class="cover1"></div><div class="moviePlay"><div class="movieClose"><img src="http://static.dev.yingxiong.com/cc/2.0/m/images/c.png"></div><div class="videos"><iframe border="0" marginwidth="0" framespacing="0" marginheight="0" src='+movieSrc+' frameborder="0" noresize="" scrolling="no" width="100%" height="100%" vspale="0" id="iframe_btn" name="iframe_btn"></iframe></div></div>';
	$("body").append(tankuangHtml);

	$(".con_play").on("click",function(e){
		e.stopPropagation();

		$(".cover1").show();
		$(".moviePlay").show();
		
	});
	$(".movieClose,.cover1").on("click",function(e){
		$(".cover1").remove();
		$(".moviePlay").remove();
		
	})
}

//判断移动设备类型
// function ismobile(test){
// 	var u = navigator.userAgent, app = navigator.appVersion;
// 	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
// 	 	if(window.location.href.indexOf("?mobile")<0){
// 		  	try{
// 			   	if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
// 			   		return '0';
// 			   	}else{
// 			   		return '1';
// 			   	}
// 		  	}catch(e){}
// 		}
// 	}else if( u.indexOf('iPad') > -1){
// 		return '0';
// 	}else{
// 		return '1';
// 	}
// };
// //console.log(ismobile(1));//0:iPhone 1:Android
// var themobile = ismobile(1);
// if(themobile=="0"){  //ios
// 	$(".h_load").addClass("js_down_ios").removeClass("js_down_andriod");
// }else{               //android
// 	$(".h_load").addClass("js_down_andriod").removeClass("js_down_ios");
// }

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
//下载弹框
$(".order_down").click(function(){
	var u = navigator.userAgent;
	//var ua = navigator.userAgent.toLowerCase();
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	//if(ua.match(/MicroMessenger/i)=="micromessenger") { //微信内置浏览器
	//	$(".download a").click(function(){
	//		window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=应用名 '
	//	});
	//}else{
		if(isiOS){
			window.location.href='https://itunes.apple.com/us/app/art-of-war-red-tides/id1216114260?ls=1&mt=8'
		}else if(isAndroid){
			$(".load_tips").removeClass("hidden");
			$(".ad").click();
		}else{
			$(".load_tips").removeClass("hidden");
			$(".ad").click();
		}
	//}
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
	var my_code = $(".codenum").val();
	if(my_phone == "" || my_phone == undefined) {
		alert("手机号不能为空");
		return;
	}
	if(!(/^1[34578]\d{9}$/.test(my_phone))) {
		alert("请输入正确的手机号码");
		return;
	}
	var srf = $('meta[name="csrf-token"]').attr('content');
	$.post(send_url,{ "phone":my_phone,"type":1,"device_type":device_type,"cms_csrf":srf },function(data){
		if(data.status == 0){
			page_djs($(".sendcode"),function(){
//						alert('倒计时结束');
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
	$.post(order_url,{ "phone":my_phone,"yzm":my_code,"type":device_type,"cms_csrf":srf },function(data){
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
//邮件发送弹窗
$(".shuju_en").click(function(){
	$(".email_tips").removeClass("hidden");
});
$(".emailtips_close").click(function(){
	$(".email_tips").addClass("hidden");
	$(".email_name").val("");
	$(".email").val("");
	$(".email_msg").val("");
});
$(".top_nav>div").click(function(){
	$(".top_nav>div").removeClass("active");
	$(this).addClass("active");
});


/*--------------------------------------------------赤潮主播页面----------------------------------------------------*/
var verify_url ='/commonMethod/vote-verify';
var check_url ='/commonMethod/vote';
var vote_url ='/wap/site/vote-ajax';
var change_url ='/wap/site/vote';
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
	var todayDom=$("[data-date='"+getToday()+"']").closest('.time_box');
	todayDom.addClass("active");
	todayDom.prevAll(".time_box").addClass("active-1");
});