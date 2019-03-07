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
    autoplay:4000,
    autoplayDisableOnInteraction: false,
    coverflow: {
      rotate:45,
      stretch:5,
      depth:50,
      modifier:1,
      slideShadows : false
    }
  });
  var swiper3 = new Swiper('#swiper3', {
    prevButton:'.swiper-button-prev3',
    nextButton:'.swiper-button-next3',
    slidesPerView: 3,
    spaceBetween : 10,
    onClick: function(swiper){
      $(swiper.slides).removeClass("active");
      var slide=$(swiper.slides[swiper.clickedIndex]);
      slide.addClass("active");
      var src=slide.find(".w_sm_gun img").attr("src");
      var url=slide.attr("data-url");
      $(".w_imgbox .big_img img").attr("src",src);
      $(".w_imgbox .big_img").attr("data-url",url);
    }
  });
  $('.swiper-button-prev3').click(function(){
    var index=$("#swiper3 .swiper-slide.active").prev(".swiper-slide").index();
    if(index==-1){
      index=swiper3.slides.length-1;
    }
    var slide=$(swiper3.slides[index]);
    $(swiper3.slides).removeClass("active");
    slide.addClass("active");
    swiper3.slideTo(index);
    var src=slide.find(".w_sm_gun img").attr("src");
    var url=slide.attr("data-url");
    $(".w_imgbox .big_img img").attr("src",src);
    $(".w_imgbox .big_img").attr("data-url",url);
  });
  $('.swiper-button-next3').click(function(){
    var index=$("#swiper3 .swiper-slide.active").next(".swiper-slide").index();
    var slide=$(swiper3.slides[index]||swiper3.slides[0]);
    $(swiper3.slides).removeClass("active");
    slide.addClass("active");
    swiper3.slideTo(index);
    var src=slide.find(".w_sm_gun img").attr("src");
    var url=slide.attr("data-url");
    $(".w_imgbox .big_img img").attr("src",src);
    $(".w_imgbox .big_img").attr("data-url",url);
  });
  var swiper04 = new Swiper('.swiper-container4',{
    paginationClickable: true,
    slidesPerView: 1,
    centeredSlides: false,
    effect : 'fade',
    fade: {
      crossFade: true,
    },
    prevButton:'.swiper-button-prev4',
    nextButton:'.swiper-button-next4',
  });
  var swiper05 = new Swiper('.swiper-container5',{
    pagination: '.swiper-pagination5',
    paginationClickable: true,
    paginationBulletRender: function (swiper, index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
    slidesPerView: 1,
    centeredSlides: false,
    effect : 'fade',
    fade: {
      crossFade: true,
    }
  });
  //视频大图展示
  var big_img_src=$(".w_swiper_box .swiper-slide.active .w_sm_gun img").attr("src");
  var big_img_url=$(".w_swiper_box .swiper-slide.active").attr("data-url");
  $(".w_imgbox .big_img img").attr("src",big_img_src);
  $(".w_imgbox .big_img").attr("data-url",big_img_url);

  //大联盟初始大图展示
  $(".i_main .pvp3 .lm.active").each(function(i,n){
    var src=$(n).find("img").attr("src");
    var txt=$(n).find(".txt").text();
    $(n).closest(".swiper-slide").find(".middle .lm_big_img img").attr("src",src);
    $(n).closest(".swiper-slide").find(".middle .desc span").text(txt);
  });
  $(".i_main .pvp3 .lm").click(function(){
    var src=$(this).find("img").attr("src");
    var txt=$(this).find(".txt").text();
    $(this).closest(".swiper-slide").find(".lm").removeClass("active");
    $(this).addClass("active");
    $(this).closest(".swiper-slide").find(".middle .lm_big_img img").attr("src",src);
    $(this).closest(".swiper-slide").find(".middle .desc span").text(txt);
  });
});