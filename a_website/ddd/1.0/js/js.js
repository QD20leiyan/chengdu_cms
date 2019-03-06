$(function(){

    $(".i_share_wx").hover(function(){
        $(".i_share_weixin").show();
    },function(){
        $(".i_share_weixin").hide();
    })

    $(".c_video").click(function(){
        $(".video_mask").show();
        $(".c_yulei").addClass("c_yl_animate")
    })
    $("#close").click(function(){
        $(".video_mask").hide();
        $(".c_yulei").removeClass("c_yl_animate")
    })
    $(".gi_left .gl_m").click(function(){
      $(".gift_tck").show();
      $(".gi_mask").show();
    })
    $(".gi_left .gl_close").click(function(){
      $(".gi_left").hide();
    })
    $(".ico_close").click(function(){
      $(".gift_tck").hide();
      $(".gi_mask").hide();
    })
    $(".pt a").click(function(){
      $(this).addClass("on").siblings().removeClass("on");
    })
    var timer = null;
        $(".c_libao").click(function(){
            clearInterval(timer);
            $(".c_libao").css({"transform":"rotateY(180deg)","z-index":"2"})
            $(".c_libao").find(".c_lb_font").hide();
            $(".c_libao").find(".c_lb_back").show();
        })
        $(".i_libao").click(function(){
            clearInterval(timer);
            $(".i_libao").css({"transform":"rotateY(180deg)","z-index":"2"})
            $(".i_libao").find(".i_lb_font").hide();
            $(".i_libao").find(".i_lb_back").show();
        })
        // timer=setInterval(function(){$(".c_libao").css({"transform":"rotateY(0deg)","z-index":"2"})
        // $(".c_libao").find(".c_lb_font").show();
        // $(".c_libao").find(".c_lb_back").hide();},100)

    // 浮动
    var $_window = $(window);
    var $main_visual = $('#main_visual');
    var itemLi =$main_visual.find('.move_item');
    var visualWidth = $main_visual.width();
    $main_visual.mousemove(function(e){
        var cursorX = e.clientX - $main_visual.offset().left;
        var cursorY = e.clientY - $main_visual.offset().top;
        var i=0.5;
        $(this).find('.move_item').each(function(){
            var item_width = $(this).width();
            var wrapperWidth =$_window.width();
            var wrapperHeight =(wrapperWidth-0)/1.26;
            var centerX = wrapperWidth / 2;
            var centerY = wrapperHeight / 2;
            var newLeft = ((cursorX - centerX) * (i) / 30) * (-1);
            var newTop = (cursorY - centerY) * (i) / 30 * (-1);
            $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
            i= i*2;
        });
        // $(this).find('.moving_item_bg').each(function(){
        //     var item_width = $(this).width();
        //     var wrapperWidth =$_window.width();
        //     var wrapperHeight =(wrapperWidth-0)/1.26;
        //     var centerX = wrapperWidth / 2;
        //     var centerY = wrapperHeight / 2;
        //     var newLeft = ((cursorX - centerX) * 0.3 / 100);
        //     var newTop = (cursorY - centerY) * 0.3 / 100;
        //     $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
        // });
    });
     $(function(){
          $(window).bind('scroll',function(){
            if($(document).scrollTop()>500){ 
              $(".sidebar").show(); 
            }
            else{ 
              $(".sidebar").hide(); 
            } 
          }) 
          $("#top").click(function(){ 
            $('body,html').animate({scrollTop:0},1000); 
          }) 
     });
     
    $(".ell div img").on('click' , function (){
//            $("#dialog").show();
//      $(".m1").show();
//            setTimeout('$(".m").fadeOut();$(".m1").fadeOut()', 1000);
    });
    
    $(".ell-1 div img").click(function(){
//            $("#dialog").show();
//      $(".m1").show();
//            setTimeout('$(".m").fadeOut();$(".m1").fadeOut()', 1000);
    });
    
    $(".one div img").click(function(){
//            $("#dialog").show();
//      $(".m1").show();
//            setTimeout('$(".m").fadeOut();$(".m1").fadeOut()', 1000);
    })
    
    $(".close_btn").click(function (){
    	$("#dialog").css("display" , "none");
    })
})
