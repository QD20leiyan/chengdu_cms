$(function(){
        var a_i = 0;
        $(".bg_rw>img").each(function(){
           var d= $(this).attr("num",a_i++);
           $(".right1").hide();
           $(".right1").eq(0).show();
        });
        $(".bg_rw>img").click(function(){
            var this_i = $(this).attr("num");
            $(".bg_rw>img").removeClass("renwu-active");
            $(this).addClass("renwu-active");;
            $(".right1").hide();
            $(".right1").eq(this_i).show();
        });
})