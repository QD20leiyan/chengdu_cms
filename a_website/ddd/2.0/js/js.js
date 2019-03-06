$(function(){
	$("#weixin").hover(function(){
        $("#shareIcon").show();
    },function(){
        $("#shareIcon").hide();
    });
    $("#hideBtn").click(function(){
    	$("#share").animate({left:-184},300,function(){
    		$("#showBtn").animate({left:0},300);
    	});
    });
    $("#showBtn").click(function(){
    	$(this).animate({left:-60},300,function(){
    		$("#share").animate({left:0},300);
    	});
    });
    /*轮播*/
   	var len = $("#hbImg > li").length;
    var index = 0;
    var timer = null;
     $("#spans span").mouseover(function() {
        index = $("#spans span").index(this); 
        showImg(index);
    }).eq(0).mouseover();
    
    $('#hbLi').hover(function() {
       clearInterval(timer);
    }, function() {
        timer = setInterval(function() {
            showImg(index);
            index++;
            if (index == len) {    
                index = 0;
            }
        }, 2000);
    }).trigger("mouseleave");
    
   	function showImg(index) {
        $("#hbImg").stop(true,false).animate({
            "left": -610 * index + "px"
        }, 500);
        $("#spans span").removeClass("active").eq(index).addClass("active");
    }
   	
   	$(".str_con_nav div").click(function(){
   		console.log(1);
   	})
   	/*选项卡*/
   	$("#titList li").click(function(){
   		$("#titList li").removeClass("on");
   		$("#conList .i_m31_inf").css("display","none");
   		$(this).addClass("on");
   		$("#conList .i_m31_inf").eq($(this).index()).css("display","block");
   	});
   	
   	$(".str_con_nav div").click(function(){
   		$(".str_con_nav div").css("background","none");
   		$(".str_con_nav div span").css("color","#fff");
   		$(".str_con_con .str_con_con_list").css("display","none");
   		$(this).css({"background":"#159f25"});
   		$(".str_con_nav div span").eq($(this).index()).css("color","#000");
   		$(".str_con_con .str_con_con_list").eq($(this).index()).css("display","block");
   	});
   	
   	/*图片缩放*/
	$w = $(".video_con_l_list img").width();
	$h = $(".video_con_l_list img").height();
	$w2 = $w + 40;
	$h2 = $h + 40;
	
	$(".video_con_l_list img").hover(function(){
		 $(this).stop().animate({height:$h2,width:$w2,left:"-20px",top:"-20px"},500);
	},function(){
		 $(this).stop().animate({height:$h,width:$w,left:"0px",top:"0px"},500);
	});
	
	
	$("#bVideo").click(function(){
		var rel = $(this).attr('rel');
		if(rel){
			$(".mask").show();
			$('.videos').append('<embed src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high" width="640" height="360" align="middle" allowscriptaccess="always" flashvars="'+rel+'&amp;auto_play=1&amp;gpcflag=1&amp;width=640&amp;height=360" type="application/x-shockwave-flash">');
			$(".video_mask").show();	
		}else{
			alert('暂无视频');
		} 
	});

  /*视频*/
  $(".video_con_r .video_con_l_list").click(function(){
	var rel = $(this).attr('rel');
	if(rel){
		$(".mask").show();
		$('.videos').append('<embed src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high" width="640" height="360" align="middle" allowscriptaccess="always" flashvars="'+rel+'&amp;auto_play=1&amp;gpcflag=1&amp;width=640&amp;height=360" type="application/x-shockwave-flash">');
		$(".video_mask").show();	
	}else{
		alert('暂无视频');
	}
  });
  $("#close").click(function(){
	  $('.videos').empty();
	  $(".video_mask").hide();  
  });



  /*二维码弹窗*/
  $("#ewmIcon").click(function(){
    $("#zhezhao").css("display","block");
  });

   $("#zhezhao").click(function(){
      $("#zhezhao").css("display","none");
   });
  
})