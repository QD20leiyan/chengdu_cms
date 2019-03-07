$(function(){
    var swiper01 = new Swiper('.swiper-container1', {
        pagination: '.swiper-pagination1',
        slidesPerView: 1,
        paginationClickable: true,
        autoplayDisableOnInteraction : false,
//			autoplay:2000,
        loop:true
    });
    var swiper02 = new Swiper('.swiper-container2', {
        prevButton:'.swiper-button-prev2',
        nextButton:'.swiper-button-next2',
        slidesPerView: 1,
        paginationClickable: true,
        autoplayDisableOnInteraction : false,
//			autoplay:2000,
        loop:true
    });
    var swiper03 = new Swiper('.swiper-container3', {
        pagination: '.swiper-pagination3',
        slidesPerView: 1,
        paginationClickable: true,
        autoplayDisableOnInteraction : false,
//			autoplay:2000,
        loop:true
    });
    //新闻对应内容显示
    $(".news_box .hd ul li").hover(function(){
        var index=$(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
    });

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

    //人物对应显示1
    $(".s3_bottom .s3_peo_head span").click(function(){
        var index=$(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".s3_bottom .p_con .p").eq(index).removeClass("hidden").siblings(".s3_bottom .p_con .p").addClass("hidden");
    });
    $(".s3_bottom .i_main .s3_bottom .jineng span").hover(function(){
        $(this).parent().parent().find(".jineng_des span").addClass("hidden");
        $(this).parent().parent().find(".jineng_des span").eq($(this).index()).removeClass("hidden");
    });
    //人物对应显示2
    $(".s3_bottom1 .s3_peo_head span").click(function(){
        var index=$(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".s3_bottom1 .p_con .p").eq(index).removeClass("hidden").siblings(".s3_bottom1 .p_con .p").addClass("hidden");
    });
});