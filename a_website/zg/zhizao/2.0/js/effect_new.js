$(function() {
	$(".main_container dl span").hover(function() {
		$(this).stop().animate({
			opacity: 0.902,
		}, 1000);
		$(this).children("i").stop().animate({
			"margin-left": "17px"
		}, 800)
	}, function() {
		$(this).stop().animate({
			opacity: 0,
		}, 1000);
		$(this).children("i").stop().animate({
			"margin-left": "200px"
		}, 800)
	});
	var mySwiper = new Swiper('.big_banner', {
		loop: true,
		autoplay: 2000,
		simulateTouch: false,
		// 如果需要前进后退按钮
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		observer: true,
		observeParents: true,
	});

	$(".main_container dl span").on("click", function() {
		$(this).siblings(".tck_small").show();
	});

	$(".close_banner").click(function() {
		$(".tck_small").hide();
	});

	$(".xlk").click(function() {
		console.log(1);
		var ul = $("#dropdown ul");
		if(ul.css("display") == "none") {
			ul.slideDown("fast");
		} else if(ul.css("display") == "block") {
			ul.slideUp("fast");
		}
	});

	$('.xlk').toggle(function() {
		console.log(1);
		$(this).addClass("xuanzhuan");
	}, function() {
		$(this).removeClass("xuanzhuan");
	});

	$("#dropdown ul li").click(function() {
		var id = $(this).attr('value');
		var txt = $(this).text();
		$(".input_select").val(txt);
		$(".input_select").attr('data-id', id);
		$("#dropdown ul").hide();
	});
})