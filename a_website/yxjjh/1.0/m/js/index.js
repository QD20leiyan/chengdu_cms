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

//菜单二级显示
$("header .nav-item").hover(function() {
  $(this).find(".dropdown-menu").stop().slideDown(200);
}, function() {
  $(this).find(".dropdown-menu").stop().slideUp(200);
});


//新闻对应内容显示
$(".news_box .hd ul li").click(function(){
  var index=$(this).index();
  $(this).addClass("on").siblings().removeClass("on");
  $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});

//视频弹窗显示
$(".i_main .video_box .img_li").click(function(){
  var tips_tit=$(this).find("p").text();
  var tips_img=$(this).find("span img").attr("src");
  var tips_url=$(this).attr("data-url");

  $(".co_tips_video .tips_url").attr("data-url",tips_url);
  $(".co_tips_video .tips_img").attr("src",tips_img);
  $(".co_tips_video .tips_tit").text(tips_tit);

  $(".co_tips_video").removeClass("hidden");
});
$(".co_tips_video .tips_url").unbind("click");
$(".co_tips_video .tips_url").click(function(){
  $(".co_tips_video").addClass("hidden");
});

//弹框关闭
$(".co_tips_close").click(function(){
  $(".co_tips_video .tips_url").attr("data-url","");
  $(".co_tips_video .tips_img").attr("src","");
  $(".co_tips_video .tips_tit").text("");
  $(".co_tips").addClass("hidden");
});
