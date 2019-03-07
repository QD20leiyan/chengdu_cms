$(function(){
  $('#carousel').carousel({
    width: $('#carousel').width(),
    height: $('#carousel').height(),
    horizontalRadius:$('#carousel').width()*0.38,
    verticalRadius:$('#carousel').height()*0.25,
    resize:false,
    mouseScroll:false,
    mouseDrag:true,
    scaleRatio:0.2,
    scrollbar:false,
    tooltip:false,
    mouseWheel:false,
    mouseWheelReverse:false,
    autoScroll:false,
    itemClick:function (e) {
      console.log(e);
      //var _indexTime = $('.time-line-group .group-item').eq(e.index);
      //$(".breaking-content").animate({
      //  scrollTop: $(_indexTime).position().top + "px"
      //}, {
      //  duration: 1500,
      //  easing: "swing"
      //})
      return false;
    }
  });

  //$('.carousel-item').addClass('dadian');

  var swiper01 = new Swiper('.swiper-container1', {
    pagination: '.swiper-pagination1',
    slidesPerView: 1,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    autoplay:2000,
    loop:true
  });
  //微信二维码
  $(".weixin_btn").click(function(){
    $(".wechat").removeClass("hidden");
  });
  $(".wechat").click(function(){
    $(".wechat").addClass("hidden");
  });
  //新闻对应内容显示
  $(".news_box .hd ul li").click(function(){
    var index=$(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
  });

});





