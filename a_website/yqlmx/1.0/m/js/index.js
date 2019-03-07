$(document).ready(function(){
        //澹版槑鍙橀噺
        var i = {};
        i.width = document.body.clientWidth;
        //瀵硅薄鏂规硶
        i.init = function(){
        	i.resetW();
            //璋冪敤杞挱swiper
            i.lb_Swiper = new Swiper ('#i_z_lb', {
            	loop: true,
            	autoplay: 4000,
            	autoplayDisableOnInteraction: false,
                onInit: function(){
                    i.lb_add_icon();
                },
            	onSlideChangeEnd: function(swiper){
                    //涓€寮犺疆鎾粨鏉熶箣鍚庣殑鍥炶皟鍑芥暟
                    var len = $(".i_l_icon>label").length;
                    var activeIndex = swiper.activeIndex;
                    if(activeIndex == len+1){
                    	activeIndex = 1;
                    }
                    i.lb_reset_icon(activeIndex-1);
                }
            });
            //璋冪敤鏂伴椈鍒楄〃swiper
            i.list_Swiper = new Swiper ('#i_z_list', {
            	loop: false,
            	onSlideChangeEnd: function(swiper){
            		var i_z_nav = $(".i_z_nav li");
            		var activeIndex = swiper.activeIndex;
            		i_z_nav.find("span").removeClass();
            		i_z_nav.eq(activeIndex).find("span").attr("class","active");
            	}
            });
            //杩斿洖椤堕儴
            public.goTop($(".i_goTop>div"));
        };

        i.resetW = function(){
//      	$(".i_banner").height(i.width*1.17+"px");
        	$(".i_zx").height(i.width*1.7+"px");
        	$(".i_z_lb").width(i.width*0.93+"px").height(i.width*0.7+"px");
        	$(".i_z_inf").width(i.width*0.93+"px").height(i.width*0.7+"px");
        };

        i.lb_add_icon = function(){
            var len = $("#i_z_lb .swiper-slide").length-2;
            var html = "";
            for(var i=0; i<len; i++){
                if(i == 0){
                    html = html+'<label class="active"></label>';
                }else{
                    html = html+'<label></label>';
                }
            }
            $(".i_l_icon").append(html);
        }

        i.lb_reset_icon = function(index){
        	$(".i_l_icon>label").removeClass();
        	$(".i_l_icon>label").eq(index).attr("class","active");
        };

        //
        $(".i_z_nav li").on("touchend",function(){
        	var index = parseInt($(this).index());
        	$(".i_z_nav li>span").removeClass();
        	$(this).find("span").attr("class","active");
            //鍒囨崲鏂伴椈
            i.list_Swiper.slideTo(index, 500, true);
        });

        i.init();
    });