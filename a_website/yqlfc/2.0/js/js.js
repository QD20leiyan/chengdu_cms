$(function(){
	$(".i-video-box").click(function(){
		var link_url = $(this).attr("rel");
		$('.videos').append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="1280" height="720" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'&auto_play=1&gpcflag=1&width=1280&height=720" type="application/x-shockwave-flash"></embed>');
		$("#video_mask").show();
	})
	$(".bgn").click(function(){
		var link_url = $(this).attr("rel");
		$('.videos').html('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="1280" height="720" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'" type="application/x-shockwave-flash"></embed>');
		$("#video_mask").show();
	})
	$("#close").click(function(){
		$("#video_mask").hide();
	});
	setTimeout(function(){
    $(".wrap,.bg_box").addClass("animate");
  },1000);
	$(".gift a").click(function(){
		$(".gift_tck").show();
		$(".mask").show();
	})
	$(".close").click(function(){
		$(".gift_tck").hide();
		$(".mask").hide();
	})
	$(".list_top ul li").click(function(){
		var index=$(this).index();//获取当前划过元素的index值
		$(this).addClass("on").siblings().removeClass("on");//改变当前状态
		$(".l_inf").eq(index).css({"display":"block"}).siblings(".l_inf").css({"display":"none"});//切换内容
	})
	$('.game_downl').hover(function(){
		$(this).parent().find(".g_name").animate({ right: '0' }, "50");
	}, function(){
		$(this).parent().find(".g_name").animate({ right: '-297px' }, "50");
	});
	$(".link ul li").mouseover(function(){
		var index=$(this).index();
		$(".link ul li").eq(index).addClass("on");
		$(".link ul li").eq(index).siblings().removeClass("on");
	})

	$(".gift_btn").click(function(){
        $(".gift_mask").show();
        console.log(1);
    });
    $(".gift_close").click(function(){
        $(".gift_mask").hide();
    });
	
	
	$(".bg_pic_1").click(function (){
		$(".tc").show();
		$(".include").show();
	})
	
	$(".yy_c").click(function (){
		$(".tc").hide();
		$(".include").hide();
	})
	
	$(".tp").click(function (){
		$(".tp_tc").show();
		$(".include").show();
	})
	
	$(".yy_b").click(function (){
		$(".tp_tc").hide();
		$(".include").hide();
	})
})
