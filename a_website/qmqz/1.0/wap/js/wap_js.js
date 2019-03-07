$(function(){
	$(".main05_nav a").click(function(){
		var index=$(this).index();
		$(".main05_infors").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	})
	$(".con01").img_lb();
	$(".mn03_top_wrap").img_lb();
	
//	cover视频播放		
	$(".play_btn").click(function(){
 		$("#video_mask").show();
 		$("#player5 video").trigger("play");
 	})
	$(".js_video").click(function(){
 		$("#video_mask").show();
 		$("#player5 video").trigger("play");
 	})
 	//	subject视频播放弹层	
	$(".s_mn05_info ul li").click(function(){
		var url = $(this).find('a').attr('rel');
		var iframeObj = $("#video_iframe");
 		if(iframeObj && url){
			var vid = get_get(url);
			if(vid['vid'])	
	 			iframeObj.attr("src",'http://v.qq.com/iframe/player.html?vid='+vid['vid']+'&width=550&auto=0&encryptVer=6.0&platform=61001&cKey=JzQNsoD7rdul2lvex7icSDeTFzOVJWKl4RdcOTUVBajPRSeu/s2VVxDZrrb2Dkdv');
 		}
 		$("#video_mask").show();
 		$('.vid_sp').trigger('play');
 	})
 	$("#close").click(function(){
 		var iframeObj = $("#video_iframe");
 		if(iframeObj){
 			iframeObj.attr("src",'');
		
 		}
		$("#video_mask").hide();
 		$("#player5 video").trigger("pause");
 		
 	})
 	$("#video_mask").click(function(){
 		$("#video_mask").hide();
 		$("#player5 video").trigger("pause");
 	})
 	$(".link01").click(function(){
	
 		$(".main01_nav").show();
 	})
 	$(".wclose").click(function(){
 		$(this).parent(".main01_nav").hide();
 	})
 	
 	$(".gift_btn").click(function(){
 		$(".button").toggle();
 		//$(".mask").show();
 	})
 	$(".newuser_btn").click(function(){
 		$(".gift_tck").show();
 		$(".mask").show();
 		$(".button").hide();
 	})
 	$(".hd_btn").click(function(){
 		$(".gift_tck01").show();
 		$(".mask").show();
 		$(".button").hide();
 	})
 	$(".iframe a").click(function(){
 		$(".gift_iframe").hide();
 		$(".mask").hide();
 	})
 	$(".close").click(function(){
 		$(".gift_tck").hide();
 		$(".gift_tck01").hide();
 		$(".mask").hide();
 	})
 	
 	//	返回顶部特效
 	$(".return_top img").click(function(){		
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0,
		}, 300);
 	})
 	
 	//	列表特效
	$(".news li").click(function(){
		$(this).addClass("on").siblings('li').removeClass("on");
	})
	
	$(".s_mn03_info li").click(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
	})
	//	下拉列表
	$(".select_btn").click(function(){
		$(".select_info").slideToggle();
	})
	$(".select_info ul li").click(function(){
		var j=$(this).text();
		var i=$(this).index(); //获取到当前点击的index
		$(".select_top input").val(j); //将选中的li值赋给input
		$(".select_info").slideUp(); //点击之后收起下拉框
	})
	
	$(".xs_nav li").click(function(){
		var index=$(this).index();
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".qzdq .qzdq_0").eq(index).show().siblings(".qzdq_0").hide();
	})
	$(".qzdq_01").img_loop_lb();
 	
 	$(".navs_t .wqhg").click(function(){
 		$(".slide_info").slideToggle();
 	})
 	
// 	2015/8/14新加
	/*$(".js_vote").on('click',function(){
		$(".vote_iframe1").show();
		$(".mask").show();
	})
	$(".js_votes").on('touchstart',function(){
		$(".vote_iframe1").hide();
		$(".vote_iframe2").show();
		$(".mask").show();
	})*/
	$(".js_cvote").click(function(){
		$(".vote_iframe1").hide();
		$(".vote_iframe2").hide();
		$(".mask").hide();
	})
	$(".js_slide").click(function(){
		$(".vote_slide").slideToggle();
	})
	$(".vote_slide ul li").click(function(){
		var js=$(this).text();
        var is=$(this).index(); //获取到当前点击的index
        var selected_id=$(this).attr('id');
        $(".server_name").val(js);  $(".server_id").val(selected_id);  //将选中的li值赋给input
        $(".vote_slide").slideUp(); //点击之后收起下拉框
	})
	//返回
	var offset = 300,
		offset_opacity = 1200,
		scroll_top_duration = 700,
		$back_to_top = $('.cd-top');
//	$(window).scroll(function(){
//		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
//		if( $(this).scrollTop() > offset_opacity ) { 
//			$back_to_top.addClass('cd-fade-out');
//		}
//	});
	$back_to_top.click(function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 
		 	}, scroll_top_duration
		);
	});
	//底部分享按钮
  $(".weixin").click(function(){
		$(".jiathis_button_weixin").click();
	});
	$(".sina").click(function(){
		$(".jiathis_button_tsina").click();
	});
	$(".qzone").click(function(){
		$(".jiathis_button_qzone").click();
	});
})
function get_get(url){
querystr = url.split("?");
if(querystr[1]){
GETs = querystr[1].split("&");
GET =new Array();
for(i=0;i<GETs.length;i++){
tmp_arr = GETs[i].split("=");
key=tmp_arr[0];
GET[key] = tmp_arr[1];
}
}
return GET;
}
