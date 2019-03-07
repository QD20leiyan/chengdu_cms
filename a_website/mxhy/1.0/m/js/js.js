//弹框关闭
$(".co_tips_close").click(function(){
    $(".co_tips").addClass("hidden");
    $(".loading").addClass("hidden");
    $('.co_tips_login .co_input input').val("");
    $(".co_error").removeClass("co_err_show");
});
// 微信弹窗出现
$(".wx_btn").click(function(){
    $(".gzh").show();
    $(".wx_tc.co_tips").removeClass("hidden");
});
$(".wx_tc.co_tips").click(function(){
    $(".gzh").hide();
    $(this).addClass("hidden");
})
//新闻对应内容显示
$(".news_box .hd ul li").hover(function(){
    var index=$(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});
//新闻对应内容显示
$(".news_box .hd2 ul li").hover(function(){
    var index=$(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});
//nav点击样式
$(".top_nav li").click(function(){
    $(this).addClass("on").siblings().removeClass("on");
});
//二级菜单下拉框
var clickNumber = 0;
var clickNumber2 = 0;
$('.down_btn').click(function () {
    if(clickNumber2 % 2 == 0) {
        $('.down_list').slideDown(500);
        $(".nav-content").slideUp();
        $(".d_t_t").removeClass("d_t_t_tran");
            $(".d_t_m").removeClass("d_t_m_tran");
            $(".d_t_b").removeClass("d_t_b_tran");
    } else {
         $('.down_list').slideUp(500);
        $(".nav-content").slideUp();
        $(".d_t_t").removeClass("d_t_t_tran");
            $(".d_t_m").removeClass("d_t_m_tran");
            $(".d_t_b").removeClass("d_t_b_tran");
    }
        clickNumber2++;
        clickNumber=0;
    });
$(".h_nav,.h_nav2").on("click", function(e) {
        e.stopPropagation();
        if(clickNumber % 2 == 0) {
            $(".d_t_t").addClass("d_t_t_tran");
            $(".d_t_m").addClass("d_t_m_tran");
            $(".d_t_b").addClass("d_t_b_tran");
            $(".nav-content").stop().slideDown();
            $('.down_list').slideUp(500);
        } else {
            $(".d_t_t").removeClass("d_t_t_tran");
            $(".d_t_m").removeClass("d_t_m_tran");
            $(".d_t_b").removeClass("d_t_b_tran");
            $(".nav-content").stop().slideUp();
            $('.down_list').slideUp(500);
        }
        clickNumber++;
        clickNumber2=0;
    });
    $(".header_nav li,.fade,.header_nav").click(function() {
        $(".d_t_t").removeClass("d_t_t_tran");
        $(".d_t_m").removeClass("d_t_m_tran");
        $(".d_t_b").removeClass("d_t_b_tran");
        $(".nav-content").stop().slideUp();
        clickNumber = 0;
    })




