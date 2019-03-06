$(function(){
	$(".call").click(function(){
		$(".call_info").addClass("con_active");
		windowHidden();
	})
	$(".close").click(function(){
		$(".call_info").removeClass("con_active");
		windowScroll();
	});
	function windowHidden(){
        $("html,body").css({
            "overflow":"hidden",
            "width":"100%",
            "height":"100%"
        });
    };
    function windowScroll(){
        $("html,body").css({
            "overflow":"visible",
            "width":"100%",
            "height":"auto"
        });
    }; 
    $(".swiper-container1 li").click(function(){
        var index=Swiper1.clickedIndex;
        $(".img_con1").removeClass("hide");
        Swiper1_sm.slideTo(index+1, 1000, false);
    });
    $(".swiper-container2 li").click(function(){
        var index2=Swiper2.clickedIndex;
        $(".img_con2").removeClass("hide");
        Swiper2_sm.slideTo(index2+1, 1000, false);
    });
    $(".swiper-container3 li").click(function(){
        var index3=Swiper3.clickedIndex;
        $(".img_con3").removeClass("hide");
        Swiper3_sm.slideTo(index3+1, 1000, false);
    });
    $(".img_con").click(function(){
        $(".img_con").addClass("hide");
    });
    // 24小时制时间判断
    function time_range(beginTime, endTime) {
        var begin_str = beginTime.split(":");
        var end_str = endTime.split(":");
        var bg=begin_str[0];
        var end=end_str[0];
        console.log("开始时间："+parseInt(bg) + "--------结束时间：" + parseInt(end));
        
        var myDate = new Date();
        var myDateHours = myDate.getHours();
        console.log("当前时间：" + myDateHours);
        if(myDateHours<end && myDateHours>bg){
            $(".status2").removeClass("hide");
            $(".status1").addClass("hide");
        }else{
            $(".status1").removeClass("hide");
            $(".status2").addClass("hide");
        }
    }
    time_range("04:00", "10:00");
})
