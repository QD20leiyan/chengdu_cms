//$(function(){
//    //员工福利和发展图片滚动
//    $(".h-welfare-tab").joi_slider();
//
//    //英雄风采图片切换滚动
//    function resultImg(_num){
//        var resulturl1=[];
//        var resulturl = $(".h-photos-tab .slideBox").eq(_num).find(".sliderBoxImg img");
//        $(".h-photos-tab .slideBox").eq(_num).find(".sliderBoxImg img").each(function(){
//            resulturl1.push($(this).attr("src"));
//        });
//        var sBHtml = '<div class="sliderBoxImgs"><ul class="bd">';
//        for(var i in resulturl1){
//            sBHtml += '<li><img src="'+resulturl1[i]+'" alt=""></li>';
//        }
//        sBHtml+='</ul><div class="hdhd"><i class="botBtn-1"></i><ul class="hd"></ul><i class="botBtn-2"></i></div></div>';
//        $(".h-photos-tab .slideBox").eq(_num).append(sBHtml);
//        $($(".h-photos-tab .slideBox").eq(_num)).slide( { mainCell:"ul.bd",titCell:".hdhd ul", effect:"leftLoop",autoPlay:true,autoPage:true,startFun:function(i,c,s){var aa = c*29+38;s.find(".hdhd").width(aa);}});
//        var mLeft = $(".h-photos-tab .slideBox").eq(_num).find(".hdhd").width()/2;
//        $(".h-photos-tab .slideBox").eq(_num).find(".hdhd").css("margin-left","-"+mLeft+"px");
//    }
//    $(".h-photos-tab .parBd span").click(function(){
//        var sBHtmlnum = $(this).index();
//        $(".h-photos-tab .slideBox").eq(sBHtmlnum).find(".sliderBoxImgs").remove().end().siblings().find(".sliderBoxImgs").remove();
//        resultImg(sBHtmlnum);
//        $(this).addClass("on").siblings().removeClass("on");
//        $(".h-photos-tab .slideBox").eq(sBHtmlnum).css("z-index","2");
//        $(".h-photos-tab .slideBox .hdhd ul.hd li").text("");
//    });
//    $(".h-photos-tab .parBd span").eq(0).trigger('click');
//});

$(function(){
    var mySwiper = new Swiper('.swiper-container',{
        pagination : '#swiper-pagination',
        paginationClickable :true,
        autoplay:3000,
        autoplayDisableOnInteraction : false
    });
    var mySwiper4 = new Swiper('.swiper-container4',{
        pagination : '#swiper-pagination4',
        paginationClickable :true,
        autoplay:3000,
        autoplayDisableOnInteraction : false
    });

    $(".sta1").click(function(){
        $(this).addClass("on");
        $(".sta2").removeClass("on");
        $(".sta3").removeClass("on");
       $(".box1").removeClass("hidden");
        $(".box2").addClass("hidden");
        $(".box3").addClass("hidden");
        var mySwiper1 = new Swiper('.swiper-container1',{
            pagination : '#swiper-pagination1',
            paginationClickable :true,
            autoplay:3000,
            autoplayDisableOnInteraction : false
        });
    });
    $(".sta2").click(function(){
        $(this).addClass("on");
        $(".sta1").removeClass("on");
        $(".sta3").removeClass("on");
        $(".box1").addClass("hidden");
        $(".box2").removeClass("hidden");
        $(".box3").addClass("hidden");
        var mySwiper2 = new Swiper('.swiper-container2',{
            pagination : '#swiper-pagination2',
            paginationClickable :true,
            autoplay:3000,
            autoplayDisableOnInteraction : false
        });
    });
    $(".sta3").click(function(){
        $(this).addClass("on");
        $(".sta1").removeClass("on");
        $(".sta2").removeClass("on");
        $(".box1").addClass("hidden");
        $(".box2").addClass("hidden");
        $(".box3").removeClass("hidden");
        var mySwiper3 = new Swiper('.swiper-container3',{
            pagination : '#swiper-pagination3',
            paginationClickable :true,
            autoplay:3000,
            autoplayDisableOnInteraction : false
        });
    });
    $(".sta1").click();
});