$(document).ready(function () {
    var page_width = document.body.clientWidth;
    var page_height = document.body.clientHeight;
    var i_banner_icon = "";
    var $i_main_nav = $(".i_main_nav");
    function init() {
        init_img_height();
        jz_animate();
        start_banner();
    }
    //js初始化图片高度
    function init_img_height(){
        $("#i_banner").height(page_width*0.853+"px");
        $(".i_new_s1>section>a>img").height(page_width*0.266+"px");
        $("#i_game>ul>li>img").height(page_width*0.266+"px");
    }
    //页面加载完成，模块加载特效
    function jz_animate() {
        $("#i_nav").attr("class","i_nav animated bounceInDown");
        //延迟加载后面动效
        setTimeout(function(){
            $("#i_new").attr("class","i_new animated bounceInUp");
            $("#i_game").attr("class","i_game animated bounceInUp");
            $("#i_foot").attr("class","i_foot animated bounceInUp");
        },400);
        show_nav();
    }

    function show_nav() {
        //显示隐藏导航模块
        $("#i_nav_icon").on("touchend",function (e) {
            e.preventDefault();
            $i_main_nav.css("display","block").attr("class","i_main_nav animated bounceInDown");
            //隐藏底部logo
            setTimeout(function(){
                $("#i_nav").css("display","none");
            },200);
            //禁止页面滑动
            $("html,body").css({
                height: page_height+"px",
                overflow: "hidden"
            });
        });
        //隐藏导航模块
        $("#n_close").on("touchend",function (e) {
            e.preventDefault();
            $i_main_nav.attr("class","i_main_nav animated bounceOutUp");
            //显示logo
            $("#i_nav").css("display","block");
            $("html,body").css({
                height: "auto",
                overflow: "auto"
            });
            setTimeout(function(){
                $i_main_nav.css("display","none");
            },700);
        });
    }

    function start_banner() {
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 1,
        });
    }

    init();
});