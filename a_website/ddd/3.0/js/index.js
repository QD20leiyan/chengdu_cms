$(".i_share_wx").hover(function(){
    $(".i_share_weixin").css('display', 'block');
},function(){
    $(".i_share_weixin").css('display', 'none');
});
$(".weixin").hover(function(){
    $(".ewm").fadeIn(100);
},function(){
    $(".ewm").fadeOut(100);
});
$(function(){
    var mySwiper1 = new Swiper ('.swiper-container ', {  
		    loop: true,
		    autoplay: 2000,
		    // // 如果需要分页器
		    pagination: '.swiper-pagination',    
			speed:300,
			paginationClickable :true,
		    // // 如果需要前进后退按钮
		     nextButton: '.swiper-button-next',
		     prevButton: '.swiper-button-prev', 
		    // // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar',
	 	 });
    $(".news-nav li").on("click",function(){
		var index=$(this).index();//获取当前划过元素的index值
		$(this).addClass("curr").siblings().removeClass("curr");//改变当前状态
		$(".news-cont").eq(index).css({"display":"block"}).siblings(".news-cont").css({"display":"none"});//切换内容
    });
    $(".menu li").on("click",function(){
		var index=$(this).index();//获取当前划过元素的index值
		$(this).addClass("active").siblings().removeClass("active");//改变当前状态
		$(".content-list").eq(index).css({"display":"block"}).siblings(".content-list").css({"display":"none"});//切换内容
    });
    $(".video-list li i,.i_play").click(function(){
			var link_url = $(this).attr('rel');
			$(".videos").html('');
			$('.videos').append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="'+link_url+'&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>');
	        $(".video_mask").show();
	    })
	    $("#close").click(function(){
	        $(".video_mask").hide();
	    });
    $(".close").click(function(){
        $("body").addClass("op");
        $(".open").show();
    })
    $('.open').click(function() {  
        $('body').toggleClass('op');
        $(this).hide();
    });  
})