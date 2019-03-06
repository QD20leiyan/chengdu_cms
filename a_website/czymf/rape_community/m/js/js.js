$(function(){
    var swiper07 = new Swiper('.swiper-container7', {
        slidesPerView:1,
        //effect : 'fade',
        //fade: {
        //    crossFade: true,
        //},
//				prevButton:'.swiper-button-prev7',
//				nextButton:'.swiper-button-next7',
    });
    $(".go_top").click(function(){
        var a;
        function back(){
            a=setInterval(go_top,5);
        }
        function go_top(){
            if(window.scrollY<=0){
                clearInterval(a);
            }else{
                scrollTo(0,window.scrollY-15);
            }
        }
        back();
    });
    //详情页面内容切换
    $(".detail_bord .list_btn li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(this).parent().next(".dashed_box").find(".dashed_info").addClass("hidden");
        $(this).parent().next(".dashed_box").find(".dashed_info").eq($(this).index()).removeClass("hidden");
    });
    //大图查看
    $(".w_imgbox .big_img img").on("click" , function (){
        var h=this.height;
        var w=this.width;
        var length=$(this).closest(".big_img").next(".w_swiper_box").find(".swiper-slide").length;
        var naturalWidth = this.naturalWidth;
        if(w/h>=0.6){
            $(".b_img .swiper-container").removeClass("active");
        }else{
            $(".b_img .swiper-container").addClass("active");
        }

        //var img = $(this).attr("src");
        //$(".z_img").attr("src",img);
        $(".b_img").stop().fadeIn(function(){
            swiper07.update();
            if(length==1&&(naturalWidth< $(".b_img .swiper-container").width())){
                $(".b_img .b_cimg .z_img").css("width",naturalWidth);
            }
        });
        $(".co_tips").addClass("hidden");
    });
    $(".b_img").click(function() {
        $(this).stop().fadeOut(function(){
            swiper07.slideTo(0);
        });
    });
});
//回到顶部
$(window).scroll(function(){
    var $t = $(this).scrollTop();
    if($t > 50){
        $(".go_top").stop().fadeIn();
    }else{
        $(".go_top").stop().fadeOut();
    }
});
