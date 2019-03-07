//移动端版本兼容
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
//if(RegExp("MicroMessenger").test(navigator.userAgent)){
//	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
//		WeixinJSBridge.call('hideToolbar');
//	});
//}

$(function(){
	//载具
	var mySwiper1 = new Swiper(".equip-container", {
		pagination: '.equip-pagination',
		paginationClickable: true,
		observer: true,
		observeParents: true,
		paginationBulletRender: function(swiper, index, className) {
			var font = new Array();
			$(".equip-pagination>span").each(function() {
				font.push($(this).text());
			});
//				return '<span class="' + className + '" '+(index==3?'style="pointer-events: none;opacity:.5;"':'')+'>' + font[index] + '</span>';
			return '<span class="' + className + '">' + font[index] + '</span>';
		},
		slideToClickedSlide: true
	});

	//视频播放
	$('.video').click(function(){
		$('#video-play').addClass('on');
		//$('.opa').addClass('on');
		$('.video').css({'background':'none'});
		$("#video-play").css("display","block");
	});
	//$('.opa').click(function(){
	//	$('#video-play').removeClass('on');
	//	$('.opa').removeClass('on');
	//	$('.video').css({'background':'url(img/videobg.png?jv=1.0.20180910) no-repeat'});
	//
	//});

	//高清图
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
	$(".swiper-container2").click(function(e){
		e.stopPropagation();
	});
	$('.alert_bg2').click(function(){
		$('.alert_bg2,.swiper').hide();
	});
});
