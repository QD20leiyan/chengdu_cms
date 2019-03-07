var login_url='/site/get-user-info.html';//判断用户是否登录
var login_url1='/site/login.html';//登录预约
var verify_url='/common/get-login-verify.html';//登录发送验证码
var out_url='/site/logout.html';//注销登录
var vote_url='/site/vote.html';//投票
var gift_url1='/site/get-role-gift.html';//投票礼包领取
var gift_url2='/site/get-inv-gift.html';//邀请礼包领取
var srf = $('meta[name="csrf-token"]').attr('content');
var invite_code="";
var is_yybtn=0;
var is_focus=0;//input获取事件焦点
var vote_name="";
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
	imgMarkIndex++;
	var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".co_captcha").html(data.msg);
		//$(".co_imgtxt").addClass("hidden");
	}, 'json');
}
//图片验证码刷新
$(".co_captcha").click(function(){
	load_captcha();
	is_focus=2;
});
$(".co_imgtxt").click(function(){
	var my_phone = $(".co_username").val();
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	}else if(my_phone.length != 11){
		showErr(0, "手机号码不正确哦");
		return;
	}hideErr(0);
	load_captcha();
});
//图片验证码焦点获取显示验证码
$(".order-tk input").focus(function(){
	is_focus++;
	console.log(is_focus);
	if(is_focus==1){
		load_captcha();
	}
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
//错误提示显示
function showErr(index, text) {
	$(".co_error").eq(index).addClass("co_err_show").html(text);
	$(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
	$(".co_error").eq(index).removeClass("co_err_show");
}
//登录请求
function get_login(){
	var my_phone = $(".co_username").val();
	var co_codenum1 =  $(".co_codenum1").val();
	var type_id=$(".rdo.active").attr("data-id");
	var code=$(".invite_code").val();
	console.log(code)
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	}else if(my_phone.length != 11){
		showErr(0, "手机号码不正确哦");
		return;
	}
	hideErr(0);
	if(co_codenum1 == "" || co_codenum1 == undefined) {
		showErr(2, "验证码不能为空哦");
		return;
	}
	hideErr(2);
	$.ajax({
		'url':login_url1,
		'data':{'phone':my_phone,'yzm':co_codenum1,'type':type_id,'code':code,"cms_csrf":srf },
		'type':'POST',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				fgw_yy_pc_success();
				$(".order-tk").addClass("hidden");
				$(".co_before").addClass("hidden");
				$(".co_after").removeClass("hidden");
				$('.index-wrap .order-tk .order-tk-main input').val("");
				$('.user_phone').text(data.data.phone);
				$('.yq_num').text(data.data.countInv);
				vote_name=data.data.data.role;
				if(data.data.countInv==1){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p").addClass("bar");
				}else if(data.data.countInv==5){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p,.index-wrap .page2 .progress-bar2 .each:eq(1) p").addClass("bar");
				}else if(data.data.countInv==10){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p,.index-wrap .page2 .progress-bar2 .each:eq(1) p,.index-wrap .page2 .progress-bar2 .each:eq(2) p").addClass("bar");
				}else if(data.data.countInv==30){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p,.index-wrap .page2 .progress-bar2 .each:eq(1) p").addClass("bar");
					$(".index-wrap .page2 .progress-bar2 .each:eq(2) p,.index-wrap .page2 .progress-bar2 .each:eq(3) p").addClass("bar");
				}else if(data.data.countInv==50){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p,.index-wrap .page2 .progress-bar2 .each:eq(1) p").addClass("bar");
					$(".index-wrap .page2 .progress-bar2 .each:eq(2) p,.index-wrap .page2 .progress-bar2 .each:eq(3) p,.index-wrap .page2 .progress-bar2 .each:eq(4) p").addClass("bar");

				}else if(data.data.countInv==100){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p,.index-wrap .page2 .progress-bar2 .each:eq(1) p,.index-wrap .page2 .progress-bar2 .each:eq(2) p").addClass("bar");
					$(".index-wrap .page2 .progress-bar2 .each:eq(3) p,.index-wrap .page2 .progress-bar2 .each:eq(4) p,.index-wrap .page2 .progress-bar2 .each:eq(5) p").addClass("bar");
				}
				$('.yq_link').text(data.data.inviteUrl);// 邀请地址
				$('.copy_link').attr("data-clipboard-text",data.data.inviteUrl);//邀请地址
				$('.yq_code').text(data.data.code);// 邀请码
				$('.copy_link1').attr("data-clipboard-text",data.data.code);//邀请码
				//if(data.data.yuyueTotal>=10000){
				//	$('.yy_num span').text((data.data.yuyueTotal)/10000+"万");//当前总共预约人数
				//}else{
					$('.yy_num span').text(data.data.yuyueTotal);//当前总共预约人数
				//}

				if(data.data.yuyueTotal<=300000){
					var wi=(data.data.yuyueTotal/300000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p").addClass("bar");
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p span").css("width",wi+"%")
				}
				if(300000<data.data.yuyueTotal&&data.data.yuyueTotal<=500000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p").addClass("bar");
					var wi=((data.data.yuyueTotal-300000)/200000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(1) p span").css("width",wi+"%");
				}
				if(500000<data.data.yuyueTotal&&data.data.yuyueTotal<=1000000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p,.index-wrap .page1 .progress-bar1 .each:eq(2) p").addClass("bar");
					var wi=((data.data.yuyueTotal-500000)/500000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(2) p span").css("width",wi+"%");
				}
				if(1000000<data.data.yuyueTotal&&data.data.yuyueTotal<=2000000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p,.index-wrap .page1 .progress-bar1 .each:eq(2) p,.index-wrap .page1 .progress-bar1 .each:eq(3) p").addClass("bar");
					var wi=((data.data.yuyueTotal-1000000)/1000000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(3) p span").css("width",wi+"%");
				}
				if(2000000<data.data.yuyueTotal&&data.data.yuyueTotal<=5000000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p,.index-wrap .page1 .progress-bar1 .each:eq(2) p,.index-wrap .page1 .progress-bar1 .each:eq(3) p,.index-wrap .page1 .progress-bar1 .each:eq(4) p").addClass("bar");
					var wi=((data.data.yuyueTotal-2000000)/3000000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(4) p span").css("width",wi+"%");
				}
				if(data.data.yuyueTotal>5000000){
					$(".index-wrap .page1 .progress-bar1 .each p").addClass("bar");
					var wi=((data.data.yuyueTotal-5000000)/2000000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(5) p span").css("width",wi+"%");
				}


				$('.peo_num1').text(data.data.huangxiaoyanTotal);// 黄晓烟 投票数
				$('.peo_num2').text(data.data.yeyanTotal);// 叶言 投票数
				$('.peo_num3').text(data.data.xishaTotal);// 希妙 投票数
				$('.peo_num4').text(data.data.cheyongtaiTotal);// 车永泰 投票数
				$('.peo_num5').text(data.data.ximenguanrenTotal);// 西门官仁投票数
				$('.my-luck-bag-tk .yuyuecode').text(data.data.data.giftCodeYuyue);//预约礼包码
				$('.my-luck-bag-tk .my-luck-tk-copy').attr("data-clipboard-text",data.data.data.giftCodeYuyue);//预约礼包码

				if(is_yybtn==1){//预约按钮
					$(".order-tk").addClass("hidden");
					$(".vote-tk").removeClass("hidden");
					$(".vote-tk .tips_al").text("预约成功");
				}else{//登陆按钮
					$(".order-tk").addClass("hidden");
					alert("登陆成功");
				}
			}else{
				$(".order-tk").addClass("hidden");
				$(".vote-tk").removeClass("hidden");
				$(".vote-tk .tips_al").text(data.msg);
				//showErr(2, data.msg);
				load_captcha();
				//alert(data.msg);
			}
		}
	});
}
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
//判断用户是否登录
function is_login(){
	$.ajax({
		'url':login_url,
		'data':{},
		'type':'GET',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				$(".order-tk").addClass("hidden");
				$(".co_before").addClass("hidden");
				$(".co_after").removeClass("hidden");
				$('.index-wrap .order-tk .order-tk-main input').val("");
				$('.user_phone').text(data.data.phone);
				$('.yq_num').text(data.data.countInv);
				vote_name=data.data.data.role;
				if(data.data.countInv==1){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p").addClass("bar");
				}else if(data.data.countInv==5){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p,.index-wrap .page2 .progress-bar2 .each:eq(1) p").addClass("bar");
				}else if(data.data.countInv==10){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p,.index-wrap .page2 .progress-bar2 .each:eq(1) p,.index-wrap .page2 .progress-bar2 .each:eq(2) p").addClass("bar");
				}else if(data.data.countInv==30){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p,.index-wrap .page2 .progress-bar2 .each:eq(1) p").addClass("bar");
					$(".index-wrap .page2 .progress-bar2 .each:eq(2) p,.index-wrap .page2 .progress-bar2 .each:eq(3) p").addClass("bar");
				}else if(data.data.countInv==50){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p,.index-wrap .page2 .progress-bar2 .each:eq(1) p").addClass("bar");
					$(".index-wrap .page2 .progress-bar2 .each:eq(2) p,.index-wrap .page2 .progress-bar2 .each:eq(3) p,.index-wrap .page2 .progress-bar2 .each:eq(4) p").addClass("bar");

				}else if(data.data.countInv==100){
					$(".index-wrap .page2 .progress-bar2 .each:eq(0) p,.index-wrap .page2 .progress-bar2 .each:eq(1) p,.index-wrap .page2 .progress-bar2 .each:eq(2) p").addClass("bar");
					$(".index-wrap .page2 .progress-bar2 .each:eq(3) p,.index-wrap .page2 .progress-bar2 .each:eq(4) p,.index-wrap .page2 .progress-bar2 .each:eq(5) p").addClass("bar");
				}
				$('.yq_link').text(data.data.inviteUrl);// 邀请地址
				$('.copy_link').attr("data-clipboard-text",data.data.inviteUrl);//邀请地址
				$('.yq_code').text(data.data.code);// 邀请码
				$('.copy_link1').attr("data-clipboard-text",data.data.code);//邀请码
				//if(data.data.yuyueTotal>=10000){
				//	$('.yy_num span').text((data.data.yuyueTotal)/10000+"万");//当前总共预约人数
				//}else{
					$('.yy_num span').text(data.data.yuyueTotal);//当前总共预约人数
				//}
				if(data.data.yuyueTotal<=300000){
					var wi=(data.data.yuyueTotal/300000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p").addClass("bar");
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p span").css("width",wi+"%")
				}
				if(300000<data.data.yuyueTotal&&data.data.yuyueTotal<=500000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p").addClass("bar");
					var wi=((data.data.yuyueTotal-300000)/200000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(1) p span").css("width",wi+"%");
				}
				if(500000<data.data.yuyueTotal&&data.data.yuyueTotal<=1000000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p,.index-wrap .page1 .progress-bar1 .each:eq(2) p").addClass("bar");
					var wi=((data.data.yuyueTotal-500000)/500000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(2) p span").css("width",wi+"%");
				}
				if(1000000<data.data.yuyueTotal&&data.data.yuyueTotal<=2000000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p,.index-wrap .page1 .progress-bar1 .each:eq(2) p,.index-wrap .page1 .progress-bar1 .each:eq(3) p").addClass("bar");
					var wi=((data.data.yuyueTotal-1000000)/1000000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(3) p span").css("width",wi+"%");
				}
				if(2000000<data.data.yuyueTotal&&data.data.yuyueTotal<=5000000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p,.index-wrap .page1 .progress-bar1 .each:eq(2) p,.index-wrap .page1 .progress-bar1 .each:eq(3) p,.index-wrap .page1 .progress-bar1 .each:eq(4) p").addClass("bar");
					var wi=((data.data.yuyueTotal-2000000)/3000000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(4) p span").css("width",wi+"%");
				}
				if(data.data.yuyueTotal>5000000){
					$(".index-wrap .page1 .progress-bar1 .each p").addClass("bar");
					var wi=((data.data.yuyueTotal-5000000)/2000000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(5) p span").css("width",wi+"%");
				}
				$('.peo_num1').text(data.data.huangxiaoyanTotal);// 黄晓烟 投票数
				$('.peo_num2').text(data.data.yeyanTotal);// 叶言 投票数
				$('.peo_num3').text(data.data.xishaTotal);// 希妙 投票数
				$('.peo_num4').text(data.data.cheyongtaiTotal);// 车永泰 投票数
				$('.peo_num5').text(data.data.ximenguanrenTotal);// 西门官仁投票数
				$('.my-luck-bag-tk .yuyuecode').text(data.data.data.giftCodeYuyue);//预约礼包码
				$('.my-luck-bag-tk .my-luck-tk-copy').attr("data-clipboard-text",data.data.data.giftCodeYuyue);//预约礼包码

			}else{
				$('.peo_num1').text(data.data.huangxiaoyanTotal);// 黄晓烟 投票数
				$('.peo_num2').text(data.data.yeyanTotal);// 叶言 投票数
				$('.peo_num3').text(data.data.xishaTotal);// 希妙 投票数
				$('.peo_num4').text(data.data.cheyongtaiTotal);// 车永泰 投票数
				$('.peo_num5').text(data.data.ximenguanrenTotal);// 西门官仁投票数
				//if(data.data.yuyueTotal>=10000){
				//	$('.yy_num span').text((data.data.yuyueTotal)/10000+"万");//当前总共预约人数
				//}else{
					$('.yy_num span').text(data.data.yuyueTotal);//当前总共预约人数
				//}
				if(data.data.yuyueTotal<=300000){
					var wi=(data.data.yuyueTotal/300000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p").addClass("bar");
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p span").css("width",wi+"%")
				}
				if(300000<data.data.yuyueTotal&&data.data.yuyueTotal<=500000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p").addClass("bar");
					var wi=((data.data.yuyueTotal-300000)/200000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(1) p span").css("width",wi+"%");
				}
				if(500000<data.data.yuyueTotal&&data.data.yuyueTotal<=1000000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p,.index-wrap .page1 .progress-bar1 .each:eq(2) p").addClass("bar");
					var wi=((data.data.yuyueTotal-500000)/500000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(2) p span").css("width",wi+"%");
				}
				if(1000000<data.data.yuyueTotal&&data.data.yuyueTotal<=2000000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p,.index-wrap .page1 .progress-bar1 .each:eq(2) p,.index-wrap .page1 .progress-bar1 .each:eq(3) p").addClass("bar");
					var wi=((data.data.yuyueTotal-1000000)/1000000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(3) p span").css("width",wi+"%");
				}
				if(2000000<data.data.yuyueTotal&&data.data.yuyueTotal<=5000000){
					$(".index-wrap .page1 .progress-bar1 .each:eq(0) p,.index-wrap .page1 .progress-bar1 .each:eq(1) p,.index-wrap .page1 .progress-bar1 .each:eq(2) p,.index-wrap .page1 .progress-bar1 .each:eq(3) p,.index-wrap .page1 .progress-bar1 .each:eq(4) p").addClass("bar");
					var wi=((data.data.yuyueTotal-2000000)/3000000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(4) p span").css("width",wi+"%");
				}
				if(data.data.yuyueTotal>5000000){
					$(".index-wrap .page1 .progress-bar1 .each p").addClass("bar");
					var wi=((data.data.yuyueTotal-5000000)/2000000)*100;
					$(".index-wrap .page1 .progress-bar1 .each:eq(5) p span").css("width",wi+"%");
				}
			}
		}
	});
}
//初始化
$(function(){
	pc_cover();
	//获取分享链接中的邀请码
	invite_code=getUrlParam('code');
	console.log(invite_code);
	$(".invite_code").val(invite_code);
	$('.copy_link2').attr("data-clipboard-text",invite_code);
	is_login();
	//进度条效果
	var timer1_lunbo1 = null;
	var timer2_lunbo1 = null;
	var timer1_lunbo2 = null;
	var timer2_lunbo2 = null;
	$(".progress-bar1").find(".each").eq(0).find(".prize-box").show();
	$(".progress-bar2").find(".each").eq(0).find(".prize-box").show();
	function lunbo(state,obj,type){

		if(!state){
			if(type == 1){
				window.clearInterval(timer1_lunbo1);
				window.clearTimeout(timer2_lunbo1);
				return false;
			}else{
				window.clearInterval(timer1_lunbo2);
				window.clearTimeout(timer2_lunbo2);
				return false;
			}
		}
		if(type == 1){
			timer1_lunbo1 = setInterval(function(){
				obj.find(".each").map(function(i,val){
					if($(val).find(".prize-box").is(':visible') == true){ //显示
						timer2_lunbo1 =  setTimeout(function(){
							if(i == 4){
								i = -1;
							}
							var ele = obj.find(".each").eq(i+1);
							ele.find(".prize-box").show();
							ele.siblings().find(".prize-box").hide();
						},500);
					}
				})
			},500);
		}else{
			timer1_lunbo2 = setInterval(function(){
				obj.find(".each").map(function(i,val){
					if($(val).find(".prize-box").is(':visible') == true){ //显示
						timer2_lunbo2 =  setTimeout(function(){
							if(i == 5){
								i = -1;
							}
							var ele = obj.find(".each").eq(i+1);
							ele.find(".prize-box").show();
							ele.siblings().find(".prize-box").hide();
						},500);
					}
				})
			},500);
		}

	}
	lunbo(true,$(".progress-bar1"),1);
	lunbo(true,$(".progress-bar2"),2);
	$(".progress-bar1 .dot").mouseover(function(){
		$(".progress-bar1 .prize-box").hide();
		lunbo(false,$(".progress-bar1"),1);
		$(this).siblings(".prize-box").show();
	}).mouseleave(function(){
		lunbo(true,$(".progress-bar1"),1);
	});
	$(".progress-bar2 .dot").mouseover(function(){
		$(".progress-bar2 .prize-box").hide();
		lunbo(false,$(".progress-bar2"),2);
		$(this).siblings(".prize-box").show();

	}).mouseleave(function(){
		lunbo(true,$(".progress-bar2"),2);
	})
});
//弹框关闭
$(".tips_close").click(function(){
	$(".co_tips").addClass("hidden");
	$('.index-wrap .order-tk .order-tk-main input').val("");
	$(".co_error").removeClass("co_err_show");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
	fgw_yy_pc();
	$(".order-tk").removeClass("hidden");
	$(".order-tk .title").addClass("co_tips_logintitle").removeClass("co_tips_yytitle");
	$(".order-tk .order-tk-btn").addClass("co_tips_loginbtn").removeClass("co_tips_yybtn");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
	var my_phone = $(this).closest(".order-tk").find(".co_username").val();
	var captcha =  $(this).closest(".order-tk").find(".captcha").val();
	if(my_phone == "" || my_phone == undefined) {
		showErr(0, "手机号码不能为空哦");
		return;
	}else if(my_phone.length != 11){
		showErr(0, "手机号码不正确哦");
		return;
	}
	hideErr(0);
	if(captcha == "" || captcha == undefined) {
		showErr(1, "验证码不能为空哦");
		return;
	}
	hideErr(1);
	$.post(verify_url,{ "phone":my_phone,"captcha":captcha,"cms_csrf":srf },function(data){
		if(data.status == 0){
			$(".co_codebtn1").css("pointer-events","none");
			page_djs($(".co_codebtn1"),function(){
				$(".co_codebtn1").css("pointer-events","auto");
			});
		}else{
			alert(data.msg);
			load_captcha();
		}
	}, 'json');
});
//点击登陆或者点击预约
$(".order-tk-btn").click(function(){
	if($(this).hasClass("co_tips_yybtn")){
		is_yybtn=1;
		get_login();
	}else{
		is_yybtn=0;
		get_login();
	}
});
//预约
$(".right-order").click(function(){
	if($(".co_after.hidden").length>0){
		fgw_yy_pc();
		//登录之前
		$(".order-tk .title").removeClass("co_tips_logintitle").addClass("co_tips_yytitle");
		$(".order-tk .order-tk-btn").removeClass("co_tips_loginbtn").addClass("co_tips_yybtn");
		$(".order-tk").removeClass("hidden");
	}else{
		//登录之后
		$(".vote-tk").removeClass("hidden");
		$(".vote-tk .tips_al").text("您已完成预约，请勿重复预约");
	}
});
//手机类型选择
$(".rdo").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
});
//查看我的福袋
$(".look-school-gift").click(function(){
  if($(".co_after.hidden").length>0){
    $(".order-tk").removeClass("hidden");
  }else{
	  $(".my-luck-bag-tk").removeClass("hidden");
  }
});
//查看我的礼包
$(".look-my-gift").click(function(){
	if($(".co_after.hidden").length>0){
		$(".order-tk").removeClass("hidden");
	}else{
		$.ajax({
			'url':gift_url2,
			'data':{},
			'type':'GET',
			'dataType':'Json',
			success:function(data){
				if(data.status==0){
					if(data.data.giftCodeInv1){
						$(".my-gift-box-tk1").removeClass("hidden");
					}else{
						$(".vote-tk").removeClass("hidden");
						$(".vote-tk .tips_al").text("您还没有礼包哦~");
					}
					if(data.data.giftCodeInv1){$(".index-wrap .my-gift-box-tk1 .main .con-list li:eq(0)").removeClass("hidden");}
					$('.yq_code1').text(data.data.giftCodeInv1);//邀请1礼包码
					$('.my-gift-tk-copy1').attr("data-clipboard-text",data.data.giftCodeInv1);//邀请1礼包码
					if(data.data.giftCodeInv5){$(".index-wrap .my-gift-box-tk1 .main .con-list li:eq(1)").removeClass("hidden");}
					$('yq_code2').text(data.data.giftCodeInv5);//邀请5礼包码
					$('.my-gift-tk-copy2').attr("data-clipboard-text",data.data.giftCodeInv5);//邀请5礼包码
					if(data.data.giftCodeInv10){$(".index-wrap .my-gift-box-tk1 .main .con-list li:eq(2)").removeClass("hidden");}
					$('.yq_code3').text(data.data.giftCodeInv10);//邀请10礼包码
					$('.my-gift-tk-copy3').attr("data-clipboard-text",data.data.giftCodeInv10);//邀请10礼包码
					if(data.data.giftCodeInv30){$(".index-wrap .my-gift-box-tk1 .main .con-list li:eq(3)").removeClass("hidden");}
					$('.yq_code4').text(data.data.giftCodeInv30);//邀请30礼包码
					$('.my-gift-tk-copy4').attr("data-clipboard-text",data.data.giftCodeInv30);//邀请30礼包码
					if(data.data.giftCodeInv50){$(".index-wrap .my-gift-box-tk1 .main .con-list li:eq(4)").removeClass("hidden");}
					$('.yq_code5').text(data.data.giftCodeInv50);//邀请50礼包码
					$('.my-gift-tk-copy5').attr("data-clipboard-text",data.data.giftCodeInv50);//邀请50礼包码
					if(data.data.giftCodeInv100){$(".index-wrap .my-gift-box-tk1 .main .con-list li:eq(5)").removeClass("hidden");}
					$('.yq_code6').text(data.data.giftCodeInv100);//邀请100礼包码
					$('.my-gift-tk-copy6').attr("data-clipboard-text",data.data.giftCodeInv100);//邀请100礼包码
				}else{
					$(".vote-tk").removeClass("hidden");
					$(".vote-tk .tips_al").text(data.msg);
				}
			}
		});

	}
});
//邀请好友
$(".invite-btn").click(function(){
	if($(".co_after.hidden").length>0){
		$(".order-tk").removeClass("hidden");
	}else{
		$(".invite-tk").removeClass("hidden");
	}
});
//注销登录
$(".logout").click(function(){
	$.ajax({
		'url':out_url,
		'data':{},
		'type':'GET',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				alert("注销成功");
				$(".co_before").removeClass("hidden");
				$(".co_after").addClass("hidden");
				$('.user_phone,.yq_link,.yq_code').text("");
				$('.yq_num,.peo_num1,.peo_num2,.peo_num3,.peo_num4,.peo_num5').text("0");
				$(".index-wrap .page2 .progress-bar2 .each p").removeClass("bar");
				$(".copy_link1,.copy_link2").attr("data-clipboard-text","");
				$(".co_codebtn1").html("获取验证码");
				$(".co_codebtn1").css("pointer-events","auto");
				if(djs_timer){
					clearInterval(djs_timer);
				}
			}else{
				alert(data.msg);
			}
		}
	});
});
//投票选手点击
$(".person-box .each").click(function(){
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".gift-box .each").eq(index).show().siblings().hide();
});
//投票
$(".person-box .each .btn").click(function(){
	var vote_name1=""
	var _that=$(this);
	var role = _that.attr("data-name");
	var num=_that.closest(".each").find(".num p");
	if($(".co_after.hidden").length>0){
		//登录之前
		$(".order-tk").removeClass("hidden");
	}else{
		vote_name=vote_name||_that.attr("data-name");
		//登录之后
		$.ajax({
			'url':vote_url,
			'data':{"role":role,"cms_csrf":srf},
			'type':'POST',
			'dataType':'Json',
			success:function(data){
				if(data.status==0){
					$(".vote-tk").removeClass("hidden");
					$(".vote-tk .tips_al").text("恭喜您，投票成功！");
					num.text(num.text()-(-1));
				}else{
					if(vote_name=="huangxiaoyan"){
						vote_name1="黄晓烟"
					}else if(vote_name=="yeyan"){
						vote_name1="叶言"
					}else if(vote_name=="ximiao"){
						vote_name1="希纱"
					}else if(vote_name=="cheyongtai"){
						vote_name1="车永泰"
					}else if(vote_name=="ximenguanren"){
						vote_name1="西门官仁"
					}
					$(".vote-tk").removeClass("hidden");
					$(".vote-tk .tips_al").text("您已为角色"+vote_name1+"投票，请勿重复选择");
				}
			}
		});
	}
});
//投票查看福利
$(".tp_btn").click(function(){
	if($(".co_after.hidden").length>0){
		$(".order-tk").removeClass("hidden");
	}else{
		$.ajax({
			'url':gift_url1,
			'data':{"cms_csrf":srf},
			'type':'POST',
			'dataType':'Json',
			success:function(data){
				if(data.status==0){
					$(".my-gift-box-tk2").removeClass("hidden");
					$('.tp_code').text(data.data);//投票礼包码
                    $('.my-gift-tp-copy').attr("data-clipboard-text",data.data);//投票礼包码
				}else{
					$(".vote-tk").removeClass("hidden");
					$(".vote-tk .tips_al").text(data.msg);
				}
			}
		});

	}
});

//复制
new Clipboard('.copy');
$(".copy").click(function() {
	alert("已复制");
});
//鼠标悬浮微信二维码
$(".wechat").hover(function() {
	$(".fl_wx").stop().fadeIn();
}, function() {
	$(".fl_wx").stop().fadeOut();
});
$(".fl_wx").hover(function() {
	$(this).stop().fadeIn();
}, function() {
	$(this).stop().fadeOut();
});


//浮窗点击缩进
var clickTap = true;
$(".op_close").click(function() {
	if(clickTap) {
		$(".float").addClass("active");
		clickTap = false;
	} else {
		$(".float").removeClass("active");
		clickTap = true;
	}
});