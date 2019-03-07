//返回顶部
$(".go_top").click(function(){
    var a;
    function back(){
        a=setInterval(go_top,5);
    }
    function go_top(){
        if(window.scrollY<=0){
            clearInterval(a);
        }else{
            scrollTo(0,window.scrollY-50);
        }
    }
    back();
});
//微信显示
$(".s_ul li:eq(0)").hover(function() {
    $(".fl_wx").stop().fadeIn();
}, function() {
    $(".fl_wx").stop().fadeOut();
});
//搜索效果
$(".search").click(function(){
    $(this).addClass("active");
});
//菜单二级显示
$("#header .nav>li").hover(function() {
    $(this).find(".dropdown-menu").stop().slideDown(200);
}, function() {
    $(this).find(".dropdown-menu").stop().slideUp(200);
});

//规章制度显示
$(".rules_info .title1").click(function() {
    $(".rules_info .title1").removeClass("active");
    $(this).addClass("active");
    $(".big_info>div").html($(this).next(".sm_info").html());
    $(".big_info").stop().fadeIn();
});


//视频弹窗显示
$(".i_main .video_box .video_list ul li").click(function(){
    var tips_tit=$(this).find(".meta .title a").text();
    var tips_img=$(this).find(".thumb a img").attr("src");
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


$(function(){
    $(".rules_info>div:eq(0) .title1").trigger("click");
});