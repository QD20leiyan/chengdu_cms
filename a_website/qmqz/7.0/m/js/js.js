$(function(){
	var clickNumber = 0;
	$(".m_downl").click(function (){
		if(clickNumber%2 == 0){
			$(".header_ul").stop().slideDown();
		} else {
			$(".header_ul").stop().slideUp();
		}
		clickNumber++;
	})
	//分类切换
	$(".news .tab_box .tab_til ul li").click(function(){
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".news_infor").eq(index).show().siblings(".news_infor").hide();

  	});
	$(".video .tab_box .tab_til ul li").click(function(){
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".video_infor").eq(index).show().siblings(".video_infor").hide();
	});
	$(".athletics .tab_box .tab_til ul li").click(function(){
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".player_infor").eq(index).show().siblings(".player_infor").hide();
	});

	///*领取礼包弹框显示*/
	//$(".m_giftbtn").click(function(){
	//	$(".gift_tck").show();
	//	$(".mask").show();
	//});
	//$(".mask").click(function(){
	//	$(".mask").hide();
	//	$(".gift_tck").hide();
	//	$("#phone").val("");
	//	$("#kapkey").val("");
	//});
	//$("#bClose").click(function(){
	//	$(".mask").trigger("click");
	//});
	//$("#popup .close").click(function(){
	//	$(".mask2").hide();
	//});
	
	//发送验证码
	$(".giftSend").click(function(){
		var my_phone = $("#phone").val();
		if(my_phone == "" || my_phone == undefined) {
			$("#mask2").show();
			$("#popup span").text("请输入手机号码！");
			return;
		}
		if(!(/^1[34578]\d{9}$/.test(my_phone))) {
			$("#mask2").show();
			$("#popup span").text("请输入有效的手机号码！");
			return;
		}
		var srf = $('meta[name="csrf-token"]').attr('content');
		$.post('/commonMethod/ajax-gift-verify.html',{ "phone":my_phone,"gift_id":5,"cms_csrf":srf },function(data){
			if(data.status == 0){
				$("#mask2").show();
				$("#popup span").html("验证码已发送到手机<br/>请注意查收短信");
				$(".giftSend").css({"background":"#666"});
				$(".giftSend").attr("disabled","disabled");
				page_djs($(".giftSend"),function(){
					$(".giftSend").css({"background":"#2867da"});
					$(".giftSend").removeAttr("disabled");
				});
			}else{
				alert(data.msg);
			}
		}, 'json');
	});
	//确认提交
	$(".yuyue").click(function(){
		var my_phone = $("#phone").val();
		var my_code = $("#kapkey").val();
		if(my_code == "" || my_code == undefined) {
			$("#mask2").show();
			$("#popup span").text("验证码不能为空！");
			return;
		}
		var srf = $('meta[name="csrf-token"]').attr('content');
		$.post('/commonMethod/ajax-gift-code.html',{ "phone":my_phone,"verify":my_code,"gift_id":5,"cms_csrf":srf },function(data){
			if(data.status == 0){
				$(".mask").hide();
				$(".gift_tck").hide();
				$("#phone").val("");
				$("#kapkey").val("");
				$("#mask2").show();
				$("#popup span").html("您的礼包码是：<br/>"+data.msg);
			}else{
				alert(data.msg);
			}
		}, 'json');
	});

	//往期冠军滚动--只有一个时复制一个
	if($(".wrapperinner .table").length==1){
		$(".wrapperinner").append($(".wrapperinner .table").clone(true));
	}
	setInterval('autoScroll(".wrapperout")', 2000);

	var id="";
	//玩家弹框
	$(".athletics table tbody .row span").click(function(){
		$(".user_tips").removeClass("hidden");
		var qf=$(this).attr("data-qf");
		var role=$(this).attr("data-role");
		var rqz=$(this).attr("data-rqz");
		var src=$(this).attr("data-src");
		id=$(this).attr("data-id");
		$(".qf").text(qf);
		$(".role").text(role);
		$(".rqz").text(rqz);
		$(".src").attr('src',src);
	});
	$(".user_close").click(function(){
		$(".user_tips").addClass("hidden");
	});
	//玩家点赞
	$(".pbgood").click(function(){
		var that=$(this);
		var callBack=function(o){
			if(o.status==1){
				that.prev(".info").find(".rqz").text(o.msg.praise);
				$("[data-id="+id+"]").parent().nextAll(".num").text(o.msg.praise);
				alert("点赞成功");
			}else if(o.status==-1){
				alert(o.msg.msg);
			}
		}
		getChangeData(id,'praise',callBack);
	});

	//视频详情点赞
	$(".video_good").click(function(){
		var that=$(this);
		var id=$(this).attr("data-id");
		var callBack=function(o){
			if(o.status==1){
				that.prev(".num").html(o.msg.praise+'人已赞');
				alert("点赞成功");
			}else if(o.status==-1){
				alert(o.msg.msg);
			}
		}
		getChangeData(id,'praise',callBack);
	});

	//视频点击量
	$(".js_video_play").click(function(){
		var id = $(this).attr("data-id");
		$.get('/commonMethod/ajax-stat-click-content.html',{ "id":id},function(data){
			if(data.status == 0){

			}else{

			}
		}, 'json');
	});
});
//	往期冠军滚动
function autoScroll(obj) {
	$(obj).find(".wrapperinner").animate({
		marginTop: "-2.8125rem"
	}, 1000, function() {
		$(this).css({marginTop: "0px"}).find(".table:first").appendTo(this);
	});
}
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
//大图显示关闭
$(".big_close").click(function(){
	$(".big_img").attr('src',"");
	$(".bigimg").addClass("hidden");
});