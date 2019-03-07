$(function (){
	$('html').fitText(2);
	//导航变化
	var clickNumber =0;
	$(".h_nav").on("click", function(e){
        e.stopPropagation();
        if(clickNumber %2==0){
            $(".d_t_t").addClass("d_t_t_tran");
            $(".d_t_m").addClass("d_t_m_tran");
            $(".d_t_b").addClass("d_t_b_tran");
            $(".header_nav").stop().slideDown();
        }else{
            $(".d_t_t").removeClass("d_t_t_tran");
            $(".d_t_m").removeClass("d_t_m_tran");
            $(".d_t_b").removeClass("d_t_b_tran");
            $(".header_nav").stop().slideUp();
        }
        clickNumber++;
    });
    $(".header_nav li").on("click" , function (){
    	$(this).addClass("active").siblings().removeClass("active");
    });
    $(".last_li a").click(function (){
    	$(".li_mask").stop().fadeIn();
    	$(".wx_code").stop().fadeIn();
    });
    $(".li_close").click(function (){
    	$(".li_mask").stop().fadeOut();
    	$(".wx_code").stop().fadeOut();
    });
    //tap
    var clicknum = 1;
    $("header .h_d").click(function() {
        if(clicknum % 2 !== 0) {
            $(this).siblings(".nav-content1").slideDown();
        } else {
            $(this).siblings(".nav-content1").slideUp();
        }
        clicknum++;
    });
});
