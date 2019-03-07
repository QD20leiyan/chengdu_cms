$(function (){
	var mySwiper = new Swiper(".l_banner",{
		pagination: '.swiper-pagination',
	});
    $(".l_nav li").on("click" , function (){
    	var index = $(this).index();
    	$(this).addClass("active").siblings().removeClass("active");
    	$(".n_news ul").eq(index).addClass("active").siblings().removeClass("active");
    });
    $(".wj_pic li").on("click" , function (){
    	var index = $(this).index();
    	$(this).addClass("active").siblings().removeClass("active");
    	$(".wj_con .wj_char").eq(index).addClass("active").siblings().removeClass("active");
    })
//  function windowHidden(){
//      $("html,body").css({
//          "overflow":"hidden",
//          "width":"100%",
//          "height":"100%"
//      });
//  };
//  function windowScroll(){
//      $("html,body").css({
//          "overflow":"visible",
//          "width":"100%",
//          "height":"auto"
//      });
//  };
})
