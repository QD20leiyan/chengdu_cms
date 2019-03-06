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
    prevButton:'.swiper-button-prev1',
    nextButton:'.swiper-button-next1',
    slidesPerView: 1,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    autoplay:3000,
    loop:true
  });
  var swiper02 = new Swiper('.swiper-container2', {
    prevButton:'.swiper-button-prev2',
    nextButton:'.swiper-button-next2',
    slidesPerView: 1,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    autoplay:3000,
    loop:true
  });
  var swiper03 = new Swiper('.swiper-container3',{
    pagination: '.swiper-pagination3',
    prevButton:'.swiper-button-prev3',
    nextButton:'.swiper-button-next3',
    paginationClickable: true,
    effect : 'coverflow',
    slidesPerView: 3,
    centeredSlides: false,
    loop:true,
    //autoplay:4000,
    autoplayDisableOnInteraction: false,
    coverflow: {
      rotate:60,
      stretch:-37,
      depth:400,
      modifier:1,
      slideShadows : false
    }
  });
  //技能切换样式
  $(".i_main .role_box .jn_info p").hover(function (){
    $(this).addClass("active").siblings().removeClass("active");
  });
});