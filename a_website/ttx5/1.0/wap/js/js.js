$(function(){
   var sWidth = $(".con").width()/2; //获取焦点图的宽度（显示面积）
   var cov_length = $(".content li").length;//获取焦点图个数
   $(".content").css("width", sWidth * (cov_length));
   var index = 0;
   $(".turn_l").click(function() {    
     if (index ==0 ) {
        $(this).css({"display":"none"});
        return false;
     }else{
    	index -= 1;    	
    	showPics(index);
    	$(".turn_r").css({"display":"block"});
     }   
    });
    $(".turn_r").click(function() {
     if (index == (cov_length-3)) {
   	    $(this).css({"display":"none"});
        return false;
     }else{
    	index += 1;   	
    	showPics(index);
   	    $(".turn_l").css({"display":"block"});
     }    
   });
   function showPics(index) { 
     var nowLeft = -index * sWidth; 
     $(".content").stop(true, false).animate({
       "left": nowLeft
     }, 300); 
   }
       //hcc——2015/4/27修改 
       //视频播放按钮特效
        var video=$("#video"); 
        $(".play_btn").click(function(){
        	$(this).css({"display":"none"});
        	$(".video video").trigger("play").css({"display":"block"});
        	$(".video img").css({"display":"none"});
        	$(".task").css({"display":"block"});
        })
        $(".task").click(function(){
        	$(this).css({"display":"none"});
        	$(".video video").trigger("pause").css({"display":"none"});
        	$(".video img").css({"display":"block"});
        	$(".play_btn").css({"display":"block"});
        })
 
      //输入手机号之后按钮发生变化
       $(".gift-phone").blur(function(){
        	$(".gift-bg").attr("src","images/gift02.png");
        })
        $(".gift-phone").focus(function(){
        	$(".gift-bg").attr("src","images/gift01.png");
        })
      //列表页特效
       $(".sub_nav li").click(function(){
		var i=$(this).index();
		$(".sub_info").eq(i).css({"display":"block"}).siblings().css({"display":"none"});
	   })
       //返回顶部
			var offset = 300,
				offset_opacity = 1200,
				scroll_top_duration = 700,
				$back_to_top = $('.cd-top');
			$(window).scroll(function() {
				($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
				if ($(this).scrollTop() > offset_opacity) {
					$back_to_top.addClass('cd-fade-out');
				}
			});
			$back_to_top.on('click', function(event) {
				event.preventDefault();
				$('body,html').animate({
					scrollTop: 0,
				}, scroll_top_duration);
			});
})
