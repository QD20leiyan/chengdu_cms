 $(document).ready(function(){
       var l_list_nav = $(".l_list_nav li");
       var page_w = document.body.clientWidth;
       //重置页面某些模块高度
       (function(){
            $(".l_banner").height(page_w*0.46+"px");
       }());
       //调用swiper
       var list_Swiper = new Swiper ('#l_list_c1', {
            loop: false,
            onInit: function(){
                reset_list_h(0);
            },
            onSlideChangeEnd: function(swiper){
                //一张轮播结束之后的回调函数
                var activeIndex = swiper.activeIndex;
                //重置list的ul的高度
                reset_list_h(activeIndex);
                l_list_nav.find("span").removeClass();
                l_list_nav.eq(activeIndex).find("span").attr("class","active");
            }
        })

       function reset_list_h(index){
            var list_ul = $("#l_list_c1 ul");
            list_ul.height(0);
            list_ul.eq(index).css({
                height: "auto"
            })
       }

       //回到顶部
       public.goTop($(".i_goTop>div"));
       //添加事件
       l_list_nav.on("touchend",function(){
           var index = $(this).index();
           l_list_nav.find("span").removeClass();
           $(this).find("span").attr("class","active");
           list_Swiper.slideTo(index, 500, true);
       });
   });