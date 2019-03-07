//新闻
$(".news_box .hd li").click(function(){
    $(this).addClass("on").siblings().removeClass("on");
    $(".news_box .news_info").addClass("hidden");
    $(".news_box .news_info").eq($(this).index()).removeClass("hidden");
});
////装备
//$(".i_main .equip .type span").click(function(){
//    $(this).addClass("active").siblings().removeClass("active");
//    $(".equip_img img").addClass("hidden");
//    $(".equip_img img").eq($(this).index()).removeClass("hidden");
//});
//视频
$(".i_main .video .type span").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    $(".video .video_infor ").addClass("hidden");
    $(".video .video_infor ").eq($(this).index()).removeClass("hidden");
});