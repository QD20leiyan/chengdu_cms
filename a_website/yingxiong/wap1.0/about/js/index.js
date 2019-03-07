$(document).ready(function () {
    var page_width = document.body.clientWidth;
    var page_height = document.body.clientHeight;
    var i_banner_icon = "";
    var $i_main_nav = $(".i_main_nav");
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
    show_nav();
});