$(function(){
	var gp = $(".game-info>p");
	var arrow = gp.next();
	if (gp.height() > 48) {
		gp.css({
			"height" : "48px",
			"-webkit-line-clamp" : "2"
		});
		arrow.show();
	}
	var flag = true;
	arrow.click(function(){
		if (flag) {
			gp.attr("style","height: auto;")	
			arrow.addClass("active");
		}else{
			gp.attr("style","height: 48px;-webkit-line-clamp:2");
			arrow.removeClass("active");
		}
		flag = !flag;
	});
	//$(".img-wrap>.img").click(function(){
	//	$(".swiper").show();

    var swiper = new Swiper('.swiper-container-1', {
        slidesPerView:'auto',
        paginationClickable: true,
        spaceBetween: 6
    });
    
	//});
	$(".swiper-box .swiper-slide").click(function(){
		var _index = $(this).index()+1;
		$(".swiper").show();
		var mySwiper = new Swiper('.swiper-container-2', {
			autoplay:3000,//可选选项，自动滑动
			pagination : '.swiper-pagination',
			prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
			loop : true,
			autoplayDisableOnInteraction: false
	    });
		mySwiper.slideTo(_index, 10, false);
	});
	
	$(".swiper").click(function(){
		$(this).hide();
	
	});
	$(".swiper-container").click(function(e){
		e.stopPropagation();
	});
});
