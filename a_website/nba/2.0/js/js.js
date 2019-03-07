$(function(){
    //微信浮窗显示
    $(".s_ul li:nth-child(1)").hover(function() {
        $(".fl_wx").stop().fadeIn();
    }, function() {
        $(".fl_wx").stop().fadeOut();
    });
    //新闻滑动显示
    $(".second .news_tab li").hover(function() {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".second .news_div ul").eq(index).addClass("active").siblings().removeClass("active");
    });
    //高度大于350浮窗显示
    $(window).scroll(function(){
        var $t = $(this).scrollTop();
        if($t > 350){
            $(".float_index").stop().fadeIn();
        }else{
            $(".float_index").stop().fadeOut();
        }
    });
    //返回顶部
    $(".back_top").click(function(){
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
    //浮窗收起展开
    var clickNumber = 0;
    $(".float .op_close").click(function() {
        if(clickNumber % 2 == 0) {
            $("body").addClass("op");
            $(".float").addClass("active");
        } else {
            $(".float").removeClass("active");
            $("body").removeClass("op");
        }
        clickNumber++;
    });
    //视频大图展示
    var big_img_src=$(".five .video_banner li.swiper-slide-active .li_img").attr("src");
    var big_img_url=$(".five .video_banner li.swiper-slide-active").attr("data-url");
    $(".five .big_video .big_img .z_img").attr("src",big_img_src);
    $(".five .big_video .big_img").attr("data-url",big_img_url);
    //大联盟初始大图展示
    $(".last .swiper-container5 .lm.active").each(function(i,n){
        var src=$(n).find("img").attr("src");
        var txt=$(n).find(".txt").text();
        $(n).closest(".swiper-slide").find(".middle .lm_big_img img").attr("src",src);
        $(n).closest(".swiper-slide").find(".middle .desc span").text(txt);
    });
    $(".last .swiper-container5 .lm").click(function(){
        var src=$(this).find("img").attr("src");
        var txt=$(this).find(".txt").text();
        $(this).closest(".swiper-slide").find(".lm").removeClass("active");
        $(this).addClass("active");
        $(this).closest(".swiper-slide").find(".middle .lm_big_img img").attr("src",src);
        $(this).closest(".swiper-slide").find(".middle .desc span").text(txt);
    });
});