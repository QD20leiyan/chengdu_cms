$(".sec01-nav li").click(function(){
        var index=$(this).index();//获取当前划过元素的index值
        $(this).addClass("on").siblings().removeClass("on");//改变当前状态
        $(".video-bor").eq(index).css({"display":"block"}).siblings(".video-bor").css({"display":"none"});//切换内容
    });
$(".m1").click(function(){
    $(".box_mask,.box1").show();
    $(".box2,.box3,.box4").hide();
})
$(".m2").click(function(){
    $(".box_mask1,.box3").show();
})
$(".m3").click(function(){
    $(".box_mask,.box2").show();
    $(".box3,.box1,.box4").hide();
})
$(".m4").click(function(){
    $(".box_mask,.box4").show();
    $(".box2,.box3,.box1").hide();
})
$(".cl").click(function(){
    $(".box_mask,.box_mask1").hide();
});
$(".box_mask,.box_mask1").click(function(){
	$(this).hide();
})