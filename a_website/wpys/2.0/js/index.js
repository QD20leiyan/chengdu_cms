$(function(){
    //获取图片基础地址
    var baseurl=$(".i_main").data("src");

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

    //ios下载二维码显示
    $(" .top .download .btn a:eq(0)").click(function() {
        $(".ewm_bg").stop().fadeIn();
    });
    $(".ewm_bg").click(function(){
        $(".ewm_bg").stop().fadeOut();
    })

    //人物对应显示1
    $(".s3_bottom .s3_peo_head span").click(function(){
        var index=$(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".s3_bottom .p_con .p").eq(index).removeClass("hidden").siblings(".s3_bottom .p_con .p").addClass("hidden");
    });
    $(".s3_bottom .jineng span").hover(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(this).closest(".p_name").find(".jineng_des span").addClass("hidden");
        $(this).closest(".p_name").find(".jineng_des span").eq($(this).index()).removeClass("hidden");
    });
    //人物对应显示2
    $(".s3_bottom1 .s3_peo_head span").click(function(){
        var index=$(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".s3_bottom1 .p_con .p").eq(index).removeClass("hidden").siblings(".s3_bottom1 .p_con .p").addClass("hidden");
    });

    //top部分花瓣飘落效果
    //$(".top").snowfall({
    //    image: [
    //        baseurl + 'realLeaf1.png',
    //        baseurl + 'realLeaf2.png',
    //        baseurl + 'realLeaf3.png',
    //        baseurl + 'realLeaf4.png',
    //        baseurl + 'realLeaf5.png',
    //        baseurl + 'realLeaf6.png',
    //        baseurl + 'realLeaf7.png',
    //        baseurl + 'realLeaf8.png',
    //        baseurl + 'realLeaf9.png',
    //    ],
    //    flakeCount:5,
    //    minSize: 60,
    //    maxSize: 90,
    //    minSpeed:1,
    //    maxSpeed:4
    //});

    //御妹分页
    if($(".ym_support").length>0){
        $(".ym_img:lt(5)").removeClass("hidden");
    }
    if($(".i_main .ym_support .ym_img").length>5){
        $(".more3").removeClass("hidden");
    }
    $(".more3").click(function(){
        var end = $(".ym_img:not(.hidden):last");
        var next = $(".ym_img:gt("+end.index()+"):lt(5)");
        if(next.length==5) {
            $(".ym_img").addClass("hidden");
            next.removeClass("hidden")
        }else if(next.length==0) {
            $(".ym_img").addClass("hidden");
            next = $(".ym_img:lt(5)").clone(true);
            $(".ym_img:lt(5)").remove();
            $(".ym_box").append(next.removeClass("hidden"))
        }else {
            $(".ym_img").addClass("hidden");
            next.removeClass("hidden")
            var length=next.length

            next = $(".ym_img:lt("+(5-length)+")").clone(true);
            $(".ym_img:lt("+(5-length)+")").remove();
            $(".ym_box").append(next.removeClass("hidden"))
        }
    });

    //音乐播放
    $(".ss_deed .p_video").click(function(){
        var _this=$(this);
        var audio=document.getElementById('music1');
        var audio_src=_this.attr("data-url");
        if($("#music1").attr("src")!=audio_src){
            $("#music1").attr("src",audio_src);
            audio.pause();
            $(".ss_deed .p_video.play").removeClass("pause");
        }
        if(_this.hasClass("pause")){
            audio.pause();
            _this.removeClass("pause");
        }else{
            audio.play();
            _this.addClass("pause");
        }
    });



});

//scroll跳转
function navscroll(idstr){
    $(".nav .nav_ul li a").removeClass("active");
    $("[data-id='"+idstr+"']").addClass("active");
    var $a=$(idstr);
    var $c=$a.offset().top;
    console.log($c)
    $("html,body").stop().animate({ scrollTop:$c+"px" },300);
}

$(".nav .nav_ul li a").click(function(){
    var idstr=$(this).data("id");
    navscroll(idstr);
});

window.onload=function(){
    location.hash&&navscroll(location.hash);
    console.log(location.hash);
}