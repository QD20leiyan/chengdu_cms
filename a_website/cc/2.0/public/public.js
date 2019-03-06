/**
 * Created by lmy on 2017/6/12.
 */

var my_public = {};

my_public.init = function(){
    my_public.hide_nav_show();
    goTopFun();
};
//顶部隐藏导航显示
my_public.hide_nav_show = function(){
    var topNav = $("#topNav");
    $("#i_gfqd").hover(function(){
        topNav.css({
            display: 'block'
        });
    },function(){
        topNav.css({
            display: 'none'
        });
    });

    topNav.hover(function(){
        topNav.css({
            display: 'block'
        });
    },function(){
        topNav.css({
            display: 'none'
        });
    });
};

my_public.init();

//回到顶部
function goTopFun(){
    var myTopL = 200;
    var goTop = $(".goTop");
    //监听屏幕滚动
    window.onscroll = function(){
        var top = $(document).scrollTop();
        if(top > myTopL){
            goTop.fadeIn();
        }else{
            goTop.fadeOut();
        }
    };
    //点击回到顶部
    goTop.click(function(){
        $('body,html').animate({scrollTop:0},400);
        return false;
    });
}

//banner轮播
var banner = {};
banner.init = function(ele){
    if(!ele){
        return;
    }
    banner.banner = ele;
    banner.ul = ele.children("ul");
    banner.li = banner.ul.children("li");
    banner.lb_icon = ele.children(".lb_icon").children("label");
    banner.len = banner.li.length;
    banner.w = ele.width();
    banner.h = ele.height();
    banner.index = 0;
    banner.init_w_h();
    banner.isClick = true;
};

banner.init_w_h = function(){
    banner.len = banner.len*2;
    banner.ul.append(banner.ul.html()).width(banner.w*banner.len+"px").height(banner.h+"px").css({
        left: -banner.len/2*banner.w+"px"
    });;

    banner.li = banner.ul.children("li");
    banner.li.width(banner.w+"px");
    banner.start();
};

banner.start = function(){
    var w=banner.w;
    var l=0;
    var timer=null;

    //自动切换
    timer=setInterval(init,3000);

    function init(){
        banner.index++;
        l=parseInt(banner.ul.css("left"))-w;
        showCurrent(l);
    }

    banner.li.hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(init,3000);
    });

    banner.lb_icon.hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(init,3000);
    });

    banner.lb_icon.click(function(){
        var i_index = $(this).index();
        var init_left = (banner.len/2)*w;
        banner.index = i_index;
        l = -init_left-(w*banner.index);
        showCurrent(l);
    });

    $(".prev").click(function(){
    	if(!banner.isClick){
    		return;
    	}
    	banner.isClick = false;
        banner.index--;
        l=parseInt(banner.ul.css("left"))+w;
        showCurrent(l);
    });

    $(".prev").hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(init,3000);
    });

    $(".next").click(function(){
    	if(!banner.isClick){
    		return;
    	}
    	banner.isClick = false;
        banner.index++;
        l=parseInt(banner.ul.css("left"))-w;
        showCurrent(l);
    });

    $(".next").hover(function(){
        clearInterval(timer);
    },function(){
        timer=setInterval(init,3000);
    });


    function showCurrent(l){
        if(banner.ul.is(':animated')){
            return;
        }
        banner.ul.animate({"left":l},500,function(){
        	banner.isClick = true;
            if(banner.index == (banner.len/2-1)){
                banner.ul.css({
                    left: -(banner.len/2-1)*banner.w+"px"
                });
            }else if(banner.index == (banner.len/2)){
                banner.index = 0;
            }
            else if(banner.index == -2){
                banner.ul.css({
                    left: -(banner.len-2)*banner.w+"px"
                });
                banner.index = (banner.len/2)-2;
            }
            banner.change_icon(banner.index);
        });
    }
};

banner.change_icon = function(index){
    banner.lb_icon.attr("class","");
    banner.lb_icon.eq(index).attr("class","active");
};


