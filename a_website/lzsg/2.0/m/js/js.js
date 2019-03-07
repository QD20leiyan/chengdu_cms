//二级菜单下拉框
var clickNumber = 1;
var clickNumber2 = 0;
$(".header_a .type").click(function(e) {
  e.stopPropagation();
  if(clickNumber % 2 !== 0) {
    $(this).parent().siblings(".nav-content").slideDown();
    $(this).addClass("type1");
    $('.down_list').slideUp(500);
  } else {
    $(this).parent().siblings(".nav-content").slideUp();
    $(this).removeClass("type1");
    $('.down_list').slideUp(500);
  }
  clickNumber++;
  clickNumber2=0;
});
$(document).click(function(e){
  if($(e.target).closest(".nav-content").length==0&&clickNumber % 2 == 0){
    $(".nav-content").slideUp();
    $(".header_a .type").removeClass("type1");
    $('.down_list').slideUp(500);
    clickNumber++;
    clickNumber2=0;
  }
});
//新闻对应内容显示
$(".news_box .hd ul li").click(function(){
  var index=$(this).index();
  $(this).addClass("on").siblings().removeClass("on");
  $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});

$(function(){
  var swiper01 = new Swiper('.swiper-container1', {
    pagination: '.swiper-pagination1',
    slidesPerView: 1,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    autoplay:3000,
    loop:true
  });
  var swiper02 = new Swiper('.swiper-container2',{
    pagination: '.swiper-pagination2',
    paginationClickable: true,
    effect : 'coverflow',
    slidesPerView: 3,
    centeredSlides: false,
    loop:true,
    coverflow: {
      rotate:0,
      stretch:-90,
      depth:350,
      modifier:1,
      slideShadows : false
    }
  });
  var swiper03 = new Swiper('.swiper-container3',{
    pagination: '.swiper-pagination2',
    paginationClickable: true,
    slidesPerView: 1,
    centeredSlides: false,
    effect : 'fade',
    fade: {
      crossFade: true,
    },
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
  });
});