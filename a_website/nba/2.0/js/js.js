$(function(){
    //΢�Ÿ�����ʾ
    $(".s_ul li:nth-child(1)").hover(function() {
        $(".fl_wx").stop().fadeIn();
    }, function() {
        $(".fl_wx").stop().fadeOut();
    });
    //���Ż�����ʾ
    $(".second .news_tab li").hover(function() {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".second .news_div ul").eq(index).addClass("active").siblings().removeClass("active");
    });
    //�߶ȴ���350������ʾ
    $(window).scroll(function(){
        var $t = $(this).scrollTop();
        if($t > 350){
            $(".float_index").stop().fadeIn();
        }else{
            $(".float_index").stop().fadeOut();
        }
    });
    //���ض���
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
    //��������չ��
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
    //��Ƶ��ͼչʾ
    var big_img_src=$(".five .video_banner li.swiper-slide-active .li_img").attr("src");
    var big_img_url=$(".five .video_banner li.swiper-slide-active").attr("data-url");
    $(".five .big_video .big_img .z_img").attr("src",big_img_src);
    $(".five .big_video .big_img").attr("data-url",big_img_url);
    //�����˳�ʼ��ͼչʾ
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