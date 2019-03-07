$(function (){
		// 轮播图开始 
	var left = $('.fxq_two_banner .btnLeft'); //获取左点击
	var right = $('.fxq_two_banner .btnRight'); //获取右点击
	var aSmall = $('.fxq_two_banner .tab_banner span');
	var aLi = $('.fxq_two_banner ul li');
	var iNow = 0;
	// 左点击  
	left.click(function() {
		iNow--;
		// 判断回流
		if(iNow < 0) {
			iNow = 3;
		}
		aLi.eq(iNow).siblings().stop().animate({
			opacity: 0

		}, 800);
		aLi.eq(iNow).stop().animate({
			opacity: 1

		}, 800);
		aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');
	});
	// 右点击切换
	right.click(function() {
		iNow++;
		if(iNow > 3) {
			iNow = 0;
		}
		aLi.eq(iNow).siblings().stop().animate({
			opacity: 0

		}, 800);
		aLi.eq(iNow).stop().animate({
			opacity: 1
		}, 800);
		aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');

	});

	//手动切换
	aSmall.click(function() {
		var n = $(this).index();
		//        var iNow = $(this).index();
		//        alert(iNow);
		iNow = n;
		aLi.eq(iNow).siblings().stop().animate({
			opacity: 0

		}, 800);
		aLi.eq(iNow).stop().animate({
			opacity: 1

		}, 800);
		aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');

	});
	// 封装函数体
	function move1() {
		aLi.eq(iNow).siblings().stop().animate({
			opacity: 0

		}, 800);
		aLi.eq(iNow).stop().animate({
			opacity: 1
		}, 800);

		aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');
	}

	// 定个定时器的初始值

	function run2() {
		iNow++;
		if(iNow > 3) {
			iNow = 0;
		}
		move1();
	}

	// 定时器
	timer = setInterval(run2, 5000);
	
	var mySwiper = new Swiper('.fxq_four_body', {
		 // 如果需要前进后退按钮
    	nextButton: '.swiper-button-next',
    	prevButton: '.swiper-button-prev',
//		loop: true
		//		autoplay: 2000
	});
	
	var mySwiper = new Swiper('.fxq_five', {
		 // 如果需要前进后退按钮
    	nextButton: '.button-next',
    	prevButton: '.button-prev',
//		loop: true
		//		autoplay: 2000
	})
})
