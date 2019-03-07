$(window).load(function(){
	$('html').fitText(2);
	var mySwiper = new Swiper ('.index1_page2 .swiper-container ', {  
	    loop: true,
	    autoplay: 5000,
	    // // 如果需要分页器
	     pagination: '.swiper-pagination',    
		speed:500,
		paginationClickable :true
	    // // 如果需要前进后退按钮
	    // nextButton: '.swiper-button-next',
	    // prevButton: '.swiper-button-prev', 
	    // // 如果需要滚动条
	    // scrollbar: '.swiper-scrollbar',
 	 });
	var mySwiper5 = new Swiper ('.index1_page5 .swiper-container ', {  
	    loop: true,
	    autoplay: 5000,
		speed:500,
	    // // 如果需要前进后退按钮
	     nextButton: '.index1_page5 .next',
	     prevButton: '.index1_page5 .prev', 
	    // // 如果需要滚动条
	    // scrollbar: '.swiper-scrollbar',
 	 });
	var mySwiper6 = new Swiper ('.index1_page6 .swiper-container ', {  
	    loop: true,
	    autoplay: 5000,
	    // // 如果需要分页器
	    // pagination: '.swiper-pagination',    
		speed:500,
	    // // 如果需要前进后退按钮
	     nextButton: '.index1_page6 .next',
	     prevButton: '.index1_page6 .prev',  
	    // // 如果需要滚动条
	    // scrollbar: '.swiper-scrollbar',
 	 });
	$(".list .ul_title li").mouseover(function(){
		var index=$(this).index();
		$(".list ul li").eq(index).addClass("on").siblings().removeClass("on");
		$('.list_detail ul').eq(index).show().siblings().hide();
	})
//	$(".video_i").click(function(){
//		var rel = $(this).attr('rel');
//		if(rel){
//			$("#iframe_btn").attr("src","/video/videosource?"+rel);
//			$("#index1_video_mask").show();
//			//兼容安卓延时获取iframe子元素高度来
//          //setTimeout(function(){$("#iframe_btn").css("height",window.frames['iframe_btn'].dHeight)},100);
//		}else{
//			alert('暂无视频，敬请期待');
//			return false;
//		}	
//	});
	$("#index1_close,#index1_video_mask").click(function(){
		$("#iframe_btn").attr("src","");
	    $("#index1_video_mask").hide();
		//setTimeout(function(){$(window.frames['iframe_btn'].document).find("video")[0].pause()},100);
	});
	$("#index1player5").click(function(e){
		e.stopPropagation();
	});
	// 公众号
    $(".i_share_weixin").click(function(){
        $(".weixin_ewm").show();
    })
    $(".weixin_ewm").click(function(){
        $(".weixin_ewm").hide();
    });
    $(".weixin_ewm img").click(function(e){
        e.stopPropagation()
    });


	$(".index1_h_loadGame").click(function(){
		$(".h_select").toggle();
	})

	$(".index1_h_order1").click(function(){
		$(".h_select").toggle();
	})

	$(".gift_btn").click(function(){
        $(".gift_mask").show();
    });
    $(".gift_mask").click(function(){
        $(".gift_mask").hide();
    });
})