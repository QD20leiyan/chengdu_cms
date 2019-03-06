var imgMarkIndex = 1;
$(function() {
	var $_window = $(window);
	var $main_visual = $('.b');
	var itemLi = $main_visual.find('.b1');
	var visualWidth = $main_visual.width();
	 $(window).scroll(function(){
	 	var $t = $(this).scrollTop();
	 	if($t > 0){
	 		$(".nav").css({"top":"0"});
	 		$(".nav").css({"zIndex":"98"});
	 	}else{
	 		$(".nav").css({"top":"42px"});
	 		$(".nav").css({"zIndex":"9999999"});
	 	}
	 });
	$(".s_ul li:nth-child(1)").hover(function() {
		$(".fl_wx").stop().fadeIn();
	}, function() {
		$(".fl_wx").stop().fadeOut();
	});
	var mySwiper = new Swiper(".left_banner", {
		autoplay: 3000,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplayDisableOnInteraction: false,
		loop: true,
	});
	var mySwiper = new Swiper('.bottom_banner', {
		loop: true,
//		autoplay: 3500,
		slideToClickedSlide: true,
		autoplayDisableOnInteraction: false,
		pagination: '.swiper-pagination1',
		effect: 'coverflow',
		slidesPerView: 3,
		centeredSlides: true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		coverflow: {
			rotate: 50,
			stretch: -250,
			depth: 700,
			modifier: 1,
			slideShadows: false
		},
		observer: true,
		observeParents: true,
	});
	$(".top_ul li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".right_con ul").eq(index).addClass("active").siblings().removeClass("active");
	});
});