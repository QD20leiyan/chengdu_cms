$(window).load(function(){
	// $(".video_i").click(function(){
	// 	var rel = $(this).attr('rel');
	// 	if(rel){
	// 			$("#iframe_btn").attr("src","/video/videoSource.html?"+rel);
	//
	// 			$("#video_mask").show();
	// 			//兼容安卓延时获取iframe子元素高度来
	//             setTimeout(function(){$("#iframe_btn").css("height",window.frames['iframe_btn'].dHeight)},100);
	// 	}else{
	// 			alert('暂无视频，敬请期待');
	// 			return false;
	// 	}
	// });
  var clickNumber2 = 0;
  $(".h_loadGame").click(function(e){
    e.stopPropagation();
    if(clickNumber2 % 2 == 0) {
    $(".down_list").slideDown(400);
    } else {
      $(".down_list").slideUp(400);
    }
    clickNumber2++;
    clickNumber=0;
  })
  $(".down_list li,.fade").click(function() {
    $(".down_list").slideUp(400);
    clickNumber2=0;
  })
	$("#close,#video_mask").click(function(){
	    $("#video_mask").hide();
		setTimeout(function(){$(window.frames['iframe_btn'].document).find("video")[0].pause()},100);
	});
	$("#player5").click(function(e){
		e.stopPropagation();
	});
	var mySwiper = new Swiper ('.i_page2 .swiper-container', {  
	    loop: true,
	    autoplay: 5000,
	    freeMode : true,
	    centeredSlides : true,
	    slidesPerView : 1.4,
	    spaceBetween : 30,
	    // 如果需要分页器
	     // pagination: '.swiper-pagination',    
		speed:500,
	    // // 如果需要前进后退按钮
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev', 
	    // // 如果需要滚动条
	    // scrollbar: '.swiper-scrollbar',
  	});
  	var mySwiper = new Swiper ('.i_page3 .swiper-container', {  
	    loop: true,
	    // autoplay: 5000,
	    // 如果需要分页器
	    pagination: '.swiper-pagination',    
		speed:500,
	    // // 如果需要前进后退按钮
	    // nextButton: '.swiper-button-next',
	    // prevButton: '.swiper-button-prev', 
	    // // 如果需要滚动条
	    // scrollbar: '.swiper-scrollbar',
  	});
  	$('#news_ul li').click(function(){
  		var index=$(this).index();
  		$('#news_ul li').eq(index).addClass('on').siblings().removeClass("on");
  		$(".news_detail .news").eq(index).show().siblings().hide();
  	})
  	$(".focus").click(function(){
  		$(".focus_ewm").toggle();
  		$(".share_alert").hide();
  		$(".kf_alert").hide();
  	})
  	$(".share").click(function(){
  		$(".focus_ewm").hide();
  		$(".share_alert").toggle();
  		$(".kf_alert").hide();
  	})
  	$(".kf").click(function(){
  		$(".focus_ewm").hide();
  		$(".share_alert").hide();
  		$(".kf_alert").toggle();
  	})
  	

  	// 预约弹窗功能
    //$(".o_close").click(function(){
  	//	$(".o_alert_mask").hide();
  	//})
  	//$(".o_order").click(function(){
  	//	$(".o_alert_mask").show();
  	//})

    $(".o_plat_android").click(function() {
        $(".o_plat_android").attr('class','o_plat_android_change');
        $(".o_plat_ios").attr('class','o_plat_ios_change');
    })
    $(".o_plat_ios").click(function() {
        $(".o_plat_android_change").attr('class','o_plat_android');
        $(".o_plat_ios_change").attr('class','o_plat_ios');
    })
    $('.o_order_btn').click(function(){
                var phone = $('.o_tel').val(); 
                if($(".o_plat i").eq(0).hasClass("o_plat_ios")){
                    var platform=2;
                }else if($(".o_plat i").eq(0).hasClass("o_plat_ios_change")){
                    var platform=1;
                }                              
                //验证手机
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                if(!reg.test(phone))
                {
                    window.alert("请正确输入11位手机号码！");
                    return false;
                }

                var data = {
                "mobile" : phone,
                "platform" :platform
                };
                $.ajax({
                    //url: '',
                    url: '/site/order',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success :function(data){
                        if(data['code']==1){
                            //$(".gift_order_shadow").show();
                            $(".o_order_btn").attr('class','ordered');
                            alert('恭喜您预约成功！');
                        }
                        else if(data['code']==0){
                            window.alert("请正确输入11位手机号码！");
                        }
                        else if(data['code']==2){
                            window.alert("该号码已进行过预约！");
                            $(".o_order_btn").attr('class','ordered');
                        }
                    },
                    error: function(){
                    }
                });
            })



    // 下载按钮
    // $('.h_loadGame').click(function () {
    //     alert('暂未开放，尽情期待');
    // })
})