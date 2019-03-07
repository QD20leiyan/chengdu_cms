
		window.onload=function(){
			$(".loading").hide()
		}

    	var personalSwiper = new Swiper("#zjlm-main",{
	    		direction : 'vertical',
				speed:500,
				setWrapperSize:!0,
				observer:!0,
				initialSlide:0,
				followFinger:!1,
	    		onSlideChangeStart : function(swiper){
				console.log(personalSwiper.activeIndex)
				    //personalSwiper.activeIndex==0 ? personalSwiper.lockSwipeToPrev() : "";
				   // personalSwiper.activeIndex==1 ? personalSwiper.unlockSwipeToPrev() : "";
					personalSwiper.activeIndex==6 ?  $(".arrowUp").hide() : ($(".arrowUp").show(),$(".footer-cy").hide());
				   // personalSwiper.activeIndex==6 ? (personalSwiper.lockSwipeToNext(),$(".arrowUp").hide(),personalSwiper.unlockSwipeToPrev()) : personalSwiper.unlockSwipeToNext();
				    
				}
			});

		//personalSwiper.activeIndex==0 ? personalSwiper.lockSwipeToPrev() : personalSwiper.unlockSwipeToPrev();
		$("#zjlm-school-box").on("touchmove",false);
		$(".page7").on("touchmove",function(){$(".footer-cy").show()})
		new Swiper("#zjlm-lb-box",{
	    		autoplay : 2000,
	    		pagination : '.swiper-pagination'
    	});
    	new Swiper("#zjlm-sclb-box",{
	    		prevButton:'.swiper-button-prev',
	    		nextButton:'.swiper-button-next',
	    		onSlideChangeStart : function(swiper){
				    $("#zjlm-sclb-box .swiper-button-txt").html($("#zjlm-sclb-box .swiper-slide").eq(swiper.activeIndex).find("img").attr("alt"));
				}
			});
    	//视频
    	// $(".btn-video").click(function(){
			// var rel = $(this).attr('rel');
			// if(rel){
			// 		$("#iframe_btn").attr("src","/video/videoSource.html?"+rel);
			//
			// 		$("#video_mask").show();
			// 		//兼容安卓延时获取iframe子元素高度来
         //            setTimeout(function(){$("#iframe_btn").css("height",window.frames['iframe_btn'].dHeight)},100);
			// }else{
			// 	alert('暂无视频，敬请期待');
			// 	return false;
			// }
        // });
		$("#close,#video_mask").click(function(){
		    $("#video_mask").hide();
			setTimeout(function(){$(window.frames['iframe_btn'].document).find("video")[0].pause()},100);
		});
		$("#player5").click(function(e){
			e.stopPropagation();
		});
		//关注
        $("#mod-follow").click(function(){$(".gz-tck").show();});
        $(".gz-tck,.gz-tck i").on('touchstart',function(e){$(".gz-tck").hide()});
        $(".gz-con").on('touchstart',function(e){e.stopPropagation();});
        //tab
        $("#zjlm-tb-box .hd a").click(function(){
			 var index = $(this).index();
			 $(this).addClass("on").siblings().removeClass("on");
			 $("#zjlm-tb-box .bd ul").eq(index).show().siblings().hide()
			
		});
		var ee = new Swiper("#news_scroll_2",{
			scrollbar:"#news_scroll_2 .swiper-scrollbar-2",
			direction: 'vertical',
			slidesPerView: 'auto',
			mousewheelControl: true,
			freeMode: true
		});
		$("#news_scroll_2").get(0).addEventListener("touchmove",function(){ee.onResize()});
		//进入文章页
		//$("#zjlm-tb-box a").click(function(){
		//	var aid = $(this).attr('data-artid');
		//	if(aid){
		//		//ajax
        //        $("#zjlm-art-box").addClass("extend");
        //        $(".footer-nav").hide();
		//		$(".footer-cy").show();
         //       $(".arrowUp").hide();
		//	}
		//});
		////返回列表页
		$("#zjlm-art-box .m-home").click(function(){
			$("#zjlm-art-box").removeClass("extend");
			//$("#news_scroll_2 .swiper-wrapper").removeAttr('style');
            $(".footer-nav").show();
			$(".footer-cy").hide();
            $(".arrowUp").show();
		});
		//进入学院
		$("a.camp-btn").click(function(){
			$("#zjlm-school-box").addClass("extend");
            $(".footer-nav").hide();
            $(".arrowUp").hide();
		});
        $("#zjlm-sclb-box .swiper-button-txt").html($("#zjlm-sclb-box .swiper-slide").eq(0).find("img").attr("alt"));
        //返回学院
        $("#zjlm-school-box .m-home").click(function(){
			$("#zjlm-school-box").removeClass("extend");
            $(".footer-nav").show();
            $(".arrowUp").show();
		});
		//获取url参数
				function getUrlParam(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r!=null){
				return unescape(r[2]);
			}else{
				return null;
			}
		}
		var id = getUrlParam('swiperId');
		if(id==1){personalSwiper.slideTo(1, 0, false)}
		