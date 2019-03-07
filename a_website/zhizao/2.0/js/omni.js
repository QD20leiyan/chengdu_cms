$(function() {
	// 轮播图开始 
	var left = $('.omni_tab .btnLeft'); //获取左点击
	var right = $('.omni_tab .btnRight'); //获取右点击
	var aSmall = $('.omni_tab .table span');
	var aLi = $('.omni_tab ul li');
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
	aSmall.mouseover(function() {
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
	timer = setInterval(run2, 2000);

	//当鼠标划入，停止轮播图切换
	$(".omni_tab").hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(run2, 2000);
	});
	//鼠标经过3P视频播放
	$(".unity").mouseover(function() {
		$(this).addClass("animated fadeOutLeft");
		$(".unreal").addClass("animated fadeOutRight");
		$(".video_parent_one").stop().hide();
		$(".video_parent").stop().show();
	});

	$(".video_parent").mouseout(function (){
		$(".unity").removeClass("animated fadeOutLeft").addClass("animated fadeInLeft");
		$(".unreal").removeClass("animated fadeOutRight").addClass("animated fadeInRight");
		$(this).stop().animate({
			"display" : "none"
		},1000);
	});
	$(".unreal").mouseover(function() {
		$(this).addClass("animated fadeOutRight");
		$(".unity").addClass("animated fadeOutLeft");
		$(".video_parent").stop().hide();
		$(".video_parent_one").stop().show();
	})

	$(".video_parent_one").mouseout(function() {
		$(".unity").removeClass("animated fadeOutLeft").addClass("animated fadeInLeft");
		$(".unreal").removeClass("animated fadeOutRight").addClass("animated fadeInRight");
		$(this).stop().animate({
			"display" : "none"
		},1000);
	});
	
	$(".left_tab li").on("click" , function (){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".right_content li").eq(index).css("display" , "block");
		$(".right_content li").eq(index).siblings().css("display" , "none");
	});
})