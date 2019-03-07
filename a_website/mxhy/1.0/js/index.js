//新闻对应内容显示
$(".news_box .hd ul li").hover(function(){
    var index=$(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});
//点击隐藏和显示下载悬浮框
function show_hide_down() {
    $(".q_f_icon").click(function() {
        var state = $(this).attr("show");
        if(state) {
            $(".float_box").animate({
                "right": "100px"
            }, 200);
            $(this).attr({
                "show": "",
                "class": "show"
            });
        } else {
            $(".float_box").animate({
                "right": "-216"
            }, 200);
            $(this).attr({
                "show": "true",
                "class": "hide_float"
            });
        }
    })
}
show_hide_down();
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