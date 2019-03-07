$(function(){
	//	官方微信弹层
	$(".w_main05 a").click(function(){		
		$(this).find("li").addClass("on").end().siblings("a").find("li").removeClass("on");
	    if($(this).find(".wx_tc").css("display")=='none'){
	    	$(this).find(".wx_tc").show();
	    }else{
	    	$(this).find(".wx_tc").hide();
	    }
       
	})
	//	游戏下载弹层
	$(".load_game").click(function(){
		$(this).parent(".w_top").find(".load_con").slideToggle();
	})
	//	最新资讯特效
	$(".main03_info li").click(function(){
		$(this).addClass("on").siblings('li').removeClass("on");
	})
	//	轮播图特效
	$(".main02_info").img_lb();
	$(".main02_infos").img_lb();
	
	//	视频播放弹层	
	$(".play_btn img").click(function(){
 		$("#video_mask").show();
 		$('.vid_sp').trigger('play');
 	})
 	$("#close").click(function(){
 		$("#video_mask").hide();
 		$('.vid_sp').trigger('pause');
 	})
 	//	返回顶部特效
 	$(".return_top img").click(function(){		
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0,
		}, 300);
 	})
 	//	礼包领取弹层
 	$(".lq_gift").click(function(){
 		$(".gift_iframe").show();
 		$(".mask").show();
 	})
 	$(".close_gift").click(function(){
 		$(".gift_iframe").hide();
 		$(".mask").hide();
 	})
 	$(".lq_btn").click(function(){
 		var mobile=$(".mobile").val();
    	var myreg = /^(1[3|4|5|8][0-9]+\d{8})$/;
    	if(mobile.length==0)
        {
           alert('请输入手机号码！');
           document.form1.mobile.focus();
           return false;
        }
        else if(mobile.length!=11)
        {
            alert('请输入有效的手机号码！');
            document.form1.mobile.focus();
            return false;
        }else if(!myreg.test(mobile))
        {  
            alert('请输入有效的手机号码！');
            document.form1.mobile.focus();
            return false;
        }else{ 
        	$(".gift_iframe").hide();
 		    $(".mask").hide();
        }      		 		
 	})
 	$(".sign").click(function(){
 		var mobile=$(".mobile").val();
    	var myreg = /^(1[3|4|5|8][0-9]+\d{8})$/;
    	if(mobile.length==0)
        {
           alert('请输入手机号码！');
           document.form1.mobile.focus();
           return false;
        }
        else if(mobile.length!=11)
        {
            alert('请输入有效的手机号码！');
            document.form1.mobile.focus();
            return false;
        }else if(!myreg.test(mobile))
        {  
            alert('请输入有效的手机号码！');
            document.form1.mobile.focus();
            return false;
        }else{ 
        	$(".gift_tc").show();
 		    $(".mask").show();
        }      		 		
 	})
 	$(".close_giframe").click(function(){
 		$(".gift_tc").hide();
 		$(".mask").hide();
 	})
 	$(".main03_title ul li").click(function(){
 		var index=$(this).index();
 		$(this).addClass("on").siblings().removeClass("on");
 		$(".mn03_info1").eq(index).show().siblings(".mn03_info1").hide();
		$(".new_more").eq(index).show().siblings(".new_more").hide();
 	})
})
