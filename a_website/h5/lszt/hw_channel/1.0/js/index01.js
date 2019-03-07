var phoneWidth =  parseInt(window.screen.width);
var phoneScale = phoneWidth/640;
var ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)){
	var version = parseFloat(RegExp.$1);
	if(version>2.3){
		document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
	}else{
		document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
	}
} else {
	document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
}
if(RegExp("MicroMessenger").test(navigator.userAgent)){
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		WeixinJSBridge.call('hideToolbar');
	});
}

$(function(){
	$('.video').click(function(){
		$('#video-play').addClass('on');
		$('.opa').addClass('on');
		$('.video').css({'background':'none'});
	});
	
	$('.opa').click(function(){
		$('#video-play').removeClass('on');
		$('.opa').removeClass('on');
		$('.video').css({'background':'url(img/videobg.png?jv=1.0.20170710) no-repeat'});
		
	});
	
	$(".img_box li").click(function(e){
		var index = $(this).index();

		$(".swiper,.alert_bg2").show();
		var mySwiper = new Swiper('.swiper-container2', {
		pagination : '.swiper-pagination',
		loop : true,
		autoplayDisableOnInteraction: false,
	    });
        mySwiper.slideTo(index+1);
	});
	
	$(".swiper").click(function(){
		$(this).hide();
	});
	$(".swiper-container").click(function(e){
		e.stopPropagation();
	});
	$('.alert_bg2').click(function(){
		$('.alert_bg2,.swiper').hide();
	});
	(function(){
		var roleswiper = new Swiper('.roles_wrap', {
            autoplay:3000,
            loop : true,
            effect : 'fade',
            onSlideChangeStart:function(swiper){
                var length = $(".game_roles .swiper_dock_list li").length;
				$(".game_roles .swiper_dock_list li img").removeClass('on');
                $(".game_roles .swiper_dock_list li img").eq((swiper.activeIndex-1)%length).addClass('on');
            }
        });
        $(".game_roles .swiper_dock_list li").click(function(){
            var index = $(this).index()+1;
            roleswiper.slideTo(index);
			$(".game_roles .swiper_dock_list li img").removeClass('on');
            $(".game_roles .swiper_dock_list li img").eq(index-1).addClass('on');
        });
	})();
	(function(){
		var animalswiper = new Swiper('.animal_wrap', {
			autoplay:3000,
			loop : true,
			onSlideChangeStart:function(swiper){
				$(".animal_wrap .swiper_dock_list li img").removeClass('on');
				$(".animal_wrap .swiper_dock_list li img").eq((swiper.activeIndex-1)%$(".animal_wrap .swiper_dock_list li").length).addClass('on');
			}
		});
		$(".animal_wrap .swiper_dock_list li").click(function(){
			var index = $(this).index()+1;
			animalswiper.slideTo(index);
			$(".animal_wrap .swiper_dock_list li img").removeClass('on');
			$(".animal_wrap .swiper_dock_list li img").eq(index-1).addClass('on');
		});	
	})();
	(function(){
		var clothesswiper = new Swiper('.clothes_wrap', {
			autoplay:3000,
			loop : true,
			onSlideChangeStart:function(swiper){
				$(".clothes_wrap .swiper_dock_list li img").removeClass('on');
			    $(".clothes_wrap .swiper_dock_list li img").eq((swiper.activeIndex-1)%$(".clothes_wrap .swiper_dock_list li").length).addClass('on');
			}
		});
		$(".clothes_wrap .swiper_dock_list li").click(function(){
			var index = $(this).index()+1;
			clothesswiper.slideTo(index);
			$(".clothes_wrap .swiper_dock_list li img").removeClass('on');
			$(".clothes_wrap .swiper_dock_list li img").eq(index-1).addClass('on');
		});	
	})();
});
