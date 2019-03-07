$(function() {
	var type_id ='';
	var mySwiper = new Swiper('.banner_vg', {
		autoplay: 2500,
        loop:true,
        preventClicks : true,
        paginationClickable :true,
        prevButton:'.swiper-button-xia',
        nextButton:'.swiper-button-last',
        pagination : '.swiper-pagination',
        autoplayDisableOnInteraction:false,
	});

	$(".radio").on("click", function() {
		$(this).addClass("on").siblings().removeClass("on");
		$(this).children('span').addClass("txt_col");
		$(this).siblings().children('span').removeClass("txt_col");
		var type_id = $(".radio.on input").attr("data-id");
	});
    
	$(".weixin").hover(function() {
		$(".erweima").stop().fadeIn();
	}, function() {
		$(".erweima").stop().fadeOut();
	});
	$(".i_share_wx").hover(function() {
		$(".i_share_weixin").stop().fadeIn();
	}, function() {
		$(".i_share_weixin").stop().fadeOut();
	});
 
	$(".video-w").click(function() {
		// var link_url = $(this).attr("rel");
		// $('.videos').html('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="1280" height="720" align="middle" allowScriptAccess="always" flashvars="' + link_url + '&auto_play=1&gpcflag=1&width=1280&height=720" type="application/x-shockwave-flash"></embed>');
		$("#video_mask").show();
	});

	$("#close").click(function() {
		$("#video_mask").hide();
	});
	// nav列表
	$(".news-nav li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".tab-cont ul").eq(index).removeClass("hide").siblings().addClass("hide");
	});
	// 新闻中心列表
	$(".news-menu li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".lis ul").eq(index).removeClass("hide").siblings().addClass("hide");
	});
})