$(function() {
	var swiper03 = new Swiper(".z_fengmian", {
		observer: true,
		observeParents: true,
		slideToClickedSlide: true,
		simulateTouch: false,
		onTransitionEnd: function(swiper) {

		},
		onSlideChangeEnd: function(swiper) {
			swiper04.slideTo(swiper.activeIndex);
			$(swiper04.slides).removeClass("active");
			var slide = $(swiper04.slides[swiper.activeIndex]);
			slide.addClass("active");
			if(autopaly) {
				//播放过 切换 自动播放
				$(".playbtn").addClass("play");
				var slide = $(swiper.slides[swiper.activeIndex]);
				$(slide).find(".light").css({
					'transform': 'rotate(250deg)'
				}).show();
				audiotimer = setInterval(function() {
					var t = 20; //CD转一圈的时间（秒）
					var cd = $(slide).find(".cdbox");
					var deg = eval('get' + cd.css('transform')) || 0;
					deg += 36 / t;
					if(deg > 360) deg -= 360;
					cd.css({
						'transform': 'rotate(' + deg + 'deg)'
					});
					var light = $(slide).find(".light");
					var deg = eval('get' + light.css('transform')) || 0;
					deg += 36 / t;
					if(deg > 358) deg = 358;
					light.css({
						'transform': 'rotate(' + deg + 'deg)'
					});
				}, 100);
				$(slide).find(".yaogan").addClass("active");
				var audiourl = slide.data('url');
				console.log(audiourl);
				$("#music1").attr("src", audiourl);
				$("#music1")[0].play();
			}
		}
	});

	var swiper04 = new Swiper(".ul_banner", {
		prevButton: '.swiper-button-prev01',
		nextButton: '.swiper-button-next01',
		slidesPerView: 5,
		observer: true,
		observeParents: true,
		slideToClickedSlide: true,
		onClick: function(swiper) {
			autopaly = true;
			$(swiper.slides).removeClass("active");
			var slide = $(swiper.slides[swiper.clickedIndex]);
			slide.addClass("active");
			swiper03.slideTo(swiper.clickedIndex);
		},
		onSlideChangeStart: function() {}
	});

	$('.swiper-button-prev01').click(function() {
		var index = $(".ul_banner .swiper-slide.active").prev(".swiper-slide").index();
		if(index == -1) {
			index = swiper04.slides.length - 1;
		}
		var slide = $(swiper04.slides[index]);
		$(swiper04.slides).removeClass("active");
		slide.addClass("active");
		swiper03.slideTo(index);
		swiper04.slideTo(index);
	});

	$('.swiper-button-next01').click(function() {
		var index = $(".ul_banner .swiper-slide.active").next(".swiper-slide").index();
		var slide = $(swiper04.slides[index] || swiper04.slides[0]);
		$(swiper04.slides).removeClass("active");
		slide.addClass("active");
		swiper03.slideTo(index);
		swiper04.slideTo(index);
	});
	autopaly = false;
	audiotimer = null;
	//获取旋转角度
	function getmatrix(a, b, c, d, e, f) {
		var aa = Math.round(180 * Math.asin(a) / Math.PI);
		var bb = Math.round(180 * Math.acos(b) / Math.PI);
		var cc = Math.round(180 * Math.asin(c) / Math.PI);
		var dd = Math.round(180 * Math.acos(d) / Math.PI);
		var deg = 0;
		if(aa == bb || -aa == bb) {
			deg = dd;
		} else if(-aa + bb == 180) {
			deg = 180 + cc;
		} else if(aa + bb == 180) {
			deg = 360 - cc || 360 - dd;
		}
		return deg >= 360 ? 0 : deg;
		//return (aa+','+bb+','+cc+','+dd);
	}

	//音乐播放
	$(".playbtn").click(function() {
		var slide = $(swiper03.slides[swiper03.activeIndex]);
		var audio = document.getElementById('music1');
		var audio_src = $(slide).attr("data-url");
		if($("#music1").attr("src") != audio_src) {
			$("#music1").attr("src", audio_src);
		}
		if($(this).hasClass("play")) {
			audio.pause();
			$(this).removeClass("play");
			clearInterval(audiotimer);
			$(slide).find(".yaogan").removeClass("active");
			$(slide).find(".light").fadeOut(800);
		} else {
			audio.play();
			autopaly = true;
			$(this).addClass("play");
			$(slide).find(".light").css({
				'transform': 'rotate(250deg)'
			}).show();
			audiotimer = setInterval(function() {
				var t = 20; //CD转一圈的时间（秒）
				var cd = $(slide).find(".cdbox");
				var deg = eval('get' + cd.css('transform')) || 0;
				deg += 36 / t;
				if(deg > 360) deg -= 360;
				cd.css({
					'transform': 'rotate(' + deg + 'deg)'
				});
				var light = $(slide).find(".light");
				var deg = eval('get' + light.css('transform')) || 0;
				deg += 36 / t;
				if(deg > 358) deg = 358;
				light.css({
					'transform': 'rotate(' + deg + 'deg)'
				});
			}, 100);
			$(slide).find(".yaogan").addClass("active");
		}
	});

	//音乐播放完毕
	$("#music1")[0] && $("#music1")[0].addEventListener('ended', function() {
		var slide = $(swiper03.slides[swiper03.activeIndex]);
		$(".playbtn").removeClass("play");
		clearInterval(audiotimer);
		$(slide).find(".yaogan").removeClass("active");
		$(slide).find(".light").fadeOut(800);
	});
});