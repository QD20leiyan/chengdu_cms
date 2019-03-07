$(function(){
    //��ȡͼƬ������ַ
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
    //���Ŷ�Ӧ������ʾ
    $(".news_box .hd ul li").hover(function(){
        var index=$(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
    });

    //���ض���
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
    //΢����ʾ
    $(".s_ul li:eq(0)").hover(function() {
        $(".fl_wx").stop().fadeIn();
    }, function() {
        $(".fl_wx").stop().fadeOut();
    });

    //ios���ض�ά����ʾ
    $(" .top .download .btn a:eq(0)").click(function() {
        $(".ewm_bg").stop().fadeIn();
    });
    $(".ewm_bg").click(function(){
        $(".ewm_bg").stop().fadeOut();
    })

    //�����Ӧ��ʾ1
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
    //�����Ӧ��ʾ2
    $(".s3_bottom1 .s3_peo_head span").click(function(){
        var index=$(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".s3_bottom1 .p_con .p").eq(index).removeClass("hidden").siblings(".s3_bottom1 .p_con .p").addClass("hidden");
    });

    //top���ֻ���Ʈ��Ч��
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

    //���÷�ҳ
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

    //���ֲ���
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

//scroll��ת
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