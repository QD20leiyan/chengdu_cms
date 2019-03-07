// 设备类型判断
function change(){
  var u = navigator.userAgent,
      app = navigator.appVersion;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isIOS) {
    $(".header_a .order,.top .order a").removeClass("js_wap_down");
  }
  if(isAndroid) {
    $(".header_a .order,.top .order a").addClass("js_wap_down");
    $(".header_a .order,.top .order a").attr("href", "javascript:;");
  }
}

$(function(){
   change();
  var swiper01 = new Swiper('.swiper-container1', {
    pagination: '.swiper-pagination1',
    slidesPerView: 1,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    autoplay:2000,
    loop:true
  });
  var swiper02 = new Swiper('.swiper-container2',{
    pagination: '.swiper-pagination2',
    paginationClickable: true,
    effect : 'coverflow',
    slidesPerView: 5,
    centeredSlides: true,
    loop:true,
    prevButton:'.swiper-button-prev2',
    nextButton:'.swiper-button-next2',
    coverflow: {
      rotate:0,
      stretch:-30,
      depth:500,
      modifier:1,
      slideShadows : false
    },
    onTouchEnd:function(swiper){
      $(".txt-img>img").addClass("hidden").eq(swiper.realIndex).removeClass("hidden");
    },
    onSlideChangeEnd: function (swiper) {
      $(".txt-img>img").addClass("hidden").eq(swiper.realIndex).removeClass("hidden");
    }
  });
  var swiper03 = new Swiper(".swiper-container3", {
    observer: true,
    observeParents: true,
    slideToClickedSlide: true,
    onTransitionEnd: function(swiper) {

    },
    onSlideChangeEnd: function(swiper){
      swiper04.slideTo(swiper.activeIndex);
      $(swiper04.slides).removeClass("active");
      var slide=$(swiper04.slides[swiper.activeIndex]);
      slide.addClass("active");
      if(autopaly){
        //播放过 切换 自动播放
        $(".playbtn").addClass("play");
        var slide=$(swiper.slides[swiper.activeIndex]);
        $(slide).find(".light").css({'transform':'rotate(250deg)'}).show();
        clearInterval(audiotimer);
        audiotimer=setInterval(function(){
          var t=20; //CD转一圈的时间（秒）
          var cd=$(slide).find(".cdbox");
          var deg=eval('get'+cd.css('transform'))||0;
          deg+=36/t;
          if(deg>360) deg-=360;
          cd.css({'transform':'rotate('+deg+'deg)'});
          var light=$(slide).find(".light");
          var deg=eval('get'+light.css('transform'))||0;
          deg+=36/t;
          if(deg>358) deg=358;
          light.css({'transform':'rotate('+deg+'deg)'});
        },100);
        $(slide).find(".shaft").addClass("play");
        var audiourl=slide.data('url');
        console.log(audiourl);
        $("#music1").attr("src",audiourl);
        $("#music1")[0].play();
      }
    }
  });
  var swiper04 = new Swiper(".swiper-container4", {
    prevButton:'.swiper4_prev',
    nextButton:'.swiper4_next',
    slidesPerView: 4,
    spaceBetween :-10,
    observer: true,
    observeParents: true,
    slideToClickedSlide: true,
    onClick: function(swiper){
      autopaly=true;
      $(swiper.slides).removeClass("active");
      var slide=$(swiper.slides[swiper.clickedIndex]);
      slide.addClass("active");
      swiper03.slideTo(swiper.clickedIndex);
    },
    onSlideChangeStart: function() {
    }
  });
  $('.swiper4_prev').click(function(){
    var index=$(".swiper-container4 .swiper-slide.active").prev(".swiper-slide").index();
    if(index==-1){
      index=swiper04.slides.length-1;
    }
    var slide=$(swiper04.slides[index]);
    $(swiper04.slides).removeClass("active");
    slide.addClass("active");
    swiper03.slideTo(index);
    swiper04.slideTo(index);
  });
  $('.swiper4_next').click(function(){
    var index=$(".swiper-container4 .swiper-slide.active").next(".swiper-slide").index();
    var slide=$(swiper04.slides[index]||swiper04.slides[0]);
    $(swiper04.slides).removeClass("active");
    slide.addClass("active");
    swiper03.slideTo(index);
    swiper04.slideTo(index);
  });
  autopaly=false;
  audiotimer=null;
  //获取旋转角度
  function getmatrix(a,b,c,d,e,f){
    var aa=Math.round(180*Math.asin(a)/ Math.PI);
    var bb=Math.round(180*Math.acos(b)/ Math.PI);
    var cc=Math.round(180*Math.asin(c)/ Math.PI);
    var dd=Math.round(180*Math.acos(d)/ Math.PI);
    var deg=0;
    if(aa==bb||-aa==bb){
      deg=dd;
    }else if(-aa+bb==180){
      deg=180+cc;
    }else if(aa+bb==180){
      deg=360-cc||360-dd;
    }
    return deg>=360?0:deg;
    //return (aa+','+bb+','+cc+','+dd);
  }

  //音乐播放
  $(".playbtn").click(function(){
    var slide=$(swiper03.slides[swiper03.activeIndex]);
    var audio=document.getElementById('music1');
    var audio_src=$(slide).attr("data-url");
    if($("#music1").attr("src")!=audio_src){
      $("#music1").attr("src",audio_src);
    }
    if($(this).hasClass("play")){
      audio.pause();
      $(this).removeClass("play");
      clearInterval(audiotimer);
      $(slide).find(".shaft").removeClass("play");
      $(slide).find(".light").fadeOut(800);
    }else{
      audio.play();
      autopaly=true;
      $(this).addClass("play");
      $(slide).find(".light").css({'transform':'rotate(250deg)'}).show();
      clearInterval(audiotimer);
      audiotimer=setInterval(function(){
        var t=20; //CD转一圈的时间（秒）
        var cd=$(slide).find(".cdbox");
        var deg=eval('get'+cd.css('transform'))||0;
        deg+=36/t;
        if(deg>360) deg-=360;
        cd.css({'transform':'rotate('+deg+'deg)'});
        var light=$(slide).find(".light");
        var deg=eval('get'+light.css('transform'))||0;
        deg+=36/t;
        if(deg>358) deg=358;
        light.css({'transform':'rotate('+deg+'deg)'});
      },100);
      $(slide).find(".shaft").addClass("play");
    }
  });
  //音乐播放完毕
  $("#music1")[0]&&$("#music1")[0].addEventListener('ended', function () {
    var slide=$(swiper03.slides[swiper03.activeIndex]);
    $(".playbtn").removeClass("play");
    clearInterval(audiotimer);
    $(slide).find(".shaft").removeClass("play");
    $(slide).find(".light").fadeOut(800);
  });
  //梦境体验js处理
  $(".mj_box .mj_type>span>i").click(function(){
    $(this).parent().addClass("active").siblings().removeClass("active");
    $(this).parent().parent().next().find(".video_box").addClass("hidden");
    $(this).parent().parent().next().find(".video_box").eq($(this).parent().index()).removeClass("hidden");
  });

  //视听盛宴js处理
  $(".i_main .st_sy .st_type>span").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    $(this).parent().next().find(".st_box1").addClass("hidden");
    $(this).parent().next().find(".st_box1").eq($(this).index()).removeClass("hidden");
  });

  //微信二维码
  $(".weixin_btn").click(function(){
    $(".wechat").removeClass("hidden");
  });
  $(".wechat").click(function(){
    $(".wechat").addClass("hidden");
  });

  //二级菜单下拉框
  //var clickNumber = 1;
  $(".header_a .type").click(function() {
    if(!$(this).hasClass("type1")) {
      $(this).parent().siblings(".nav-content").slideDown();
      $(this).addClass("type1");
    } else {
      $(this).parent().siblings(".nav-content").slideUp();
      $(this).removeClass("type1");
    }
    //clickNumber++;
  });
  //新闻对应内容显示
  $(".news_box .hd ul li").click(function(){
    var index=$(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
  });

  //锚点跳转
  function navscroll(idstr){
    var $a=$(idstr),
        $c=$a.offset().top-$(".header").height();
    $("html,body").stop().animate({ scrollTop:$c+"px" },300);
  }
  $("header .item-anchor").click(function(){
    var idstr=$(this).data("id");
    idstr&&navscroll(idstr);
    $(".header .nav-content").slideUp();
    $(".header_a .type").removeClass("type1");
  });
  window.onload=function(){
    location.hash&&navscroll(location.hash);
  }

  $(".big_img").on("click" , function (){
    var img = $(this).parent(".tk_img").find("img").attr("src");
    $(".z_img").attr("src",img);
    $(".b_img").stop().fadeIn();
  });
  $(".b_img").click(function() {
    $(this).stop().fadeOut();
  });
});





