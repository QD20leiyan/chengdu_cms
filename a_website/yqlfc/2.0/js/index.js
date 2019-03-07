$(window).load(function(){
		// $(".link ul li").mouseover(function(){
		// 	var index=$(this).index();
		// 	$(".link ul li").eq(index).addClass("on");
		// 	$(".link ul li").eq(index).siblings().removeClass("on");
		// })
		var mySwiper1 = new Swiper ('.page2_main01 .swiper-container ', {  
		    loop: true,
		    autoplay: 5000,
		    // // 如果需要分页器
		     pagination: '.swiper-pagination',    
			speed:500,
			paginationClickable :true,
		    // // 如果需要前进后退按钮
		    // nextButton: '.swiper-button-next',
		    // prevButton: '.swiper-button-prev', 
		    // // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar',
	 	 });
		$(".list .ul_title li").mouseover(function(){
			var index=$(this).index();
			$(".list ul li").eq(index).addClass("on").siblings().removeClass("on");
			$('.list_detail ul').eq(index).show().siblings().hide();
		})
		$(".video_i").click(function(){
			var link_url = $(this).attr('rel');
			$(".videos").html('');
			$('.videos').append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="1280" height="720" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'&auto_play=1&gpcflag=1&width=1280&height=720" type="application/x-shockwave-flash"></embed>');
	        $(".video_mask").show();
	    })
	    $("#close").click(function(){
	        $(".video_mask").hide();
	    })
	    $('#videoBtn').mouseover(function(){
			$('#videoBtn').removeClass('on');
		})
		$('#videoBtn').mouseout(function(){
			$('#videoBtn').addClass('on');
		})
		$(window).scroll(function() {
			var $t = $(this).scrollTop(); 
			console.log($t)
			if ($t > 4000) { 
					$('.scroll').fadeOut();
			} else {
					$('.scroll').fadeIn(); 
			}
		});

		$(".gift_btn").click(function(){
	        $(".gift_mask").show();
	    });
	    $(".gift_mask").click(function(){
	        $(".gift_mask").hide();
	    });
})
var mySwiper2 = new Swiper ('.lb_01 .swiper-container', {  
		    loop: true,
		    autoplay: 5000,
		    // // 如果需要分页器
		     pagination: '.swiper-pagination',    
			speed:500,
			paginationClickable :true,
		    // // 如果需要前进后退按钮
		    nextButton: '.lb_01_next',
		    prevButton: '.lb_01_prev', 
		    // // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar',
	 	 });
		var mySwiper3 = new Swiper ('.lb_02 .swiper-container', {  
		    loop: true,
		    autoplay: 5000,
		    // // 如果需要分页器
		    pagination: '.swiper-pagination',    
			speed:500,
			paginationClickable :true,
		    // // 如果需要前进后退按钮
		    nextButton: '.lb_02_next',
		    prevButton: '.lb_02_prev', 
		    // // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar',
	 	 });
		var mySwiper4 = new Swiper ('.lb_03 .swiper-container', {  
		    loop: true,
		    autoplay: 5000,
		    // // 如果需要分页器
		    pagination: '.swiper-pagination',    
			speed:500,
			paginationClickable :true,
		    // // 如果需要前进后退按钮
		    nextButton: '.lb_03_next',
		    prevButton: '.lb_03_prev', 
		    // // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar',
	 	 });
		var mySwiper5 = new Swiper ('.lb_04 .swiper-container', {  
		    loop: true,
		    autoplay: 5000,
		    // // 如果需要分页器
		    pagination: '.swiper-pagination',    
			speed:500,
			paginationClickable :true,
		    // // 如果需要前进后退按钮
		    nextButton: '.lb_04_next',
		    prevButton: '.lb_04_prev', 
		    // // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar',
	 	 });