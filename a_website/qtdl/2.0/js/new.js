function autoScroll(obj,dis){  
	$(obj).find("ul").animate({  
		marginTop : dis  
	},500,function(){  
		$(this).css({marginTop : "0px"}).find("li:first").appendTo(this); 
	})  
}
$(function(){
	// newsTab
	$(".i-m2-news-nav ul li").mouseover(function(){
	var index=$(this).index();
	$(this).find("span").addClass("i-m2-on").end().siblings().find("span").removeClass("i-m2-on");
	$(".i-m2-inf").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	})
    $(".gift_box .close").click(function(){
        $(".gift_box").hide();
    })
	// 实时新闻滚动
	$(".i-m2-newinf").hover(function(){
		clearInterval(time1);
	},function(){
		time1 = setInterval('autoScroll(".i-m2-newinfcon","-57px")',3000);
	}).trigger("mouseleave");

	// 首页轮播
	var index = 0;
	$(".i-m2-lb-box ul li").eq(0).css({"display":"block","opacity":"1"})
    $(".i-lb-nav ul li").click(function(){
    	index = $(this).index();
    	move(index);
    	if (index == 3){
    		index = 0;
    	}else{
    		index += 1;
    	}
    	console.log(index)
    })
    function move(index){
    	$(".i-lb-scrollbar").animate({
    		left : 128*index
    	},500);
    	$(".i-m2-lb-box ul").children("li").css("opacity","0")
    	$(".i-m2-lb-box ul li").eq(index).css("display","block").animate({
    		opacity : 1
    	},500)
    }
    $(".i-m2-lb").hover(function(){
    	clearInterval(time);
    },function(){
    	time = setInterval(function(){
        	move(index);
        	index++;
        	if (index >= 4){
        		index = 0;
        	}
        },3000)
    })
    function start(){
    	index = 1;
    	time = setInterval(function(){
        	move(index);
        	index++;
        	if (index >= 4){
        		index = 0;
        	}
        },3000)
    }
    start();
    $(".i-lb-nav ul li img").each(function(i){
        this.src = $(".i-m2-lb-box ul li img").eq(i).attr("src");
    })

    // 枪械Tab
	$(".i-m4-nav li").click(function(){
	var index=$(this).index();
	$(this).find("span").addClass("i-m4-on").end().siblings().find("span").removeClass("i-m4-on");
	$(".i-m4-infcon ul").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	})
	/* 使用js分组，每3个li放到一个ul里面 */
	jQuery(".i-m3-list1 li").each(function(i){ jQuery(".i-m3-list1 li").slice(i*3,i*3+3).wrapAll("<ul></ul>");});
	jQuery(".i-m3-list2 li").each(function(i){ jQuery(".i-m3-list2 li").slice(i*3,i*3+3).wrapAll("<ul></ul>");});
	jQuery(".i-m3-list3 li").each(function(i){ jQuery(".i-m3-list3 li").slice(i*3,i*3+3).wrapAll("<ul></ul>");});
	jQuery(".i-m3-list4 li").each(function(i){ jQuery(".i-m3-list4 li").slice(i*3,i*3+3).wrapAll("<ul></ul>");});
	jQuery(".i-m3-list5 li").each(function(i){ jQuery(".i-m3-list5 li").slice(i*3,i*3+3).wrapAll("<ul></ul>");});
	jQuery(".i-m3-list1 ul").eq(0).css("display","block");
	jQuery(".i-m3-list1 ul li").eq(1).css({"margin-top":"50px","margin-left":"-100px"});
	jQuery(".i-m3-list1 ul li").eq(2).css("margin-left","-85px");
	var a=0;
	$(".i-m3-prev").click(function(){
		var $this = $(this);	
		var ulSize = $(this).parent().find("ul").length;
		a+=1;
		if(a == ulSize) {
			a=0;
		}
		$(this).parent().find("ul").eq(a).css({"display":"block"}).siblings().css({"display":"none"});
		$this.show()
	})

    // 佣兵Tab
    $(".i-m3-nav ul li").click(function(){
        var index=$(this).index();
        $(this).find("span").addClass("i-m3-on").end().siblings().find("span").removeClass("i-m3-on");
        $(".i-m3-nav ul li").each(function(i){
            $(this).css("background","url(http://dev.static.yingxiong.com/qtdl/2.0/images/i_m3_ico"+(i+1)+".png)")
        })
        $(this).css("background","url(http://dev.static.yingxiong.com/qtdl/2.0/images/i_m3_ico"+(index+1)+"1.png)")
        $(".i-m3-con div").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
		$(".i-m3-list"+(index+1)).find("ul").eq(0).css("display","block");
		$(".i-m3-list"+(index+1)+" ul li").eq(1).css({"margin-top":"50px","margin-left":"-100px"});
		$(".i-m3-list"+(index+1)+" ul li").eq(2).css("margin-left","-85px");
		a=0;
    });
	
    $(".i-cs-weixin").hover(function(){
        $(".i-cs-weixinewm").show();
    },function(){
         $(".i-cs-weixinewm").hide();
    })
    $(".i-cs-qq").hover(function(){
        $(".i-cs-qqcon").show();
    },function(){
         $(".i-cs-qqcon").hide();
    })

	// 浮动
    var $_window = $(window);
    var $main_visual = $('#main_visual');
    var $item_bg = $('.moving_item_bg');
    var $item_chocobo_01 = $('.moving_item_zuo');
    var $item_chocobo_02 = $('.moving_item_you');
    var itemLi =$main_visual.find('.move_item');
    var visualWidth = $main_visual.width();
    $main_visual.mousemove(function(e){
        var cursorX = e.clientX - $main_visual.offset().left;
        var cursorY = e.clientY - $main_visual.offset().top;
        var i=0.8;
        $(this).find('.move_item').each(function(){
            var item_width = $(this).width();
            var wrapperWidth =$_window.width();
            var wrapperHeight =(wrapperWidth-0)/1.26;
            var centerX = wrapperWidth / 2;
            var centerY = wrapperHeight / 2;
            var newLeft = ((cursorX - centerX) * (i) / 100) * (-1);
            var newTop = (cursorY - centerY) * (i) / 100 * (-1);
            $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
            i= i*2;
        });
        $(this).find('.moving_item_bg').each(function(){
            var item_width = $(this).width();
            var wrapperWidth =$_window.width();
            var wrapperHeight =(wrapperWidth-0)/1.26;
            var centerX = wrapperWidth / 2;
            var centerY = wrapperHeight / 2;
            var newLeft = ((cursorX - centerX) * 0.3 / 100);
            var newTop = (cursorY - centerY) * 0.3 / 100;
            $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
        });
    });

    //animate
    setTimeout(function(){
        $(".time_con").addClass("animate");
    },100)
    //流光
    function light(){
        $(".t_line01 .t_dot").animate({
            top: "72",
            left:"370",
            opacity:"1"
        },1000,function(){
            $(".t_line01 .t_dot").css({top: "0",left:"0",opacity:"0"})
        })
        setTimeout(function(){
            $(".t_line02 .t_dot").animate({
                top: "310",
                left:"-45",
                opacity:"1"
            },800,function(){
                $(".t_line02 .t_dot").css({top: "0",left:"0",opacity:"0"})
            })
        },1500)
        setTimeout(function(){
            $(".t_line03 .t_dot").animate({
                top: "120",
                left:"-160",
                opacity:"1"
            },600,function(){
                $(".t_line03 .t_dot").css({top: "0",left:"0",opacity:"0"})
            })
        },2500)
        setTimeout(function(){
            $(".t_line04 .t_dot").animate({
                top: "0",
                left:"0",
                opacity:"1"
            },400,function(){
                $(".t_line04 .t_dot").css({top: "208px",left:"210px",opacity:"0"})
            })
        },3500)
        setTimeout(function(){
            $(".t_line05 .t_dot").animate({
                top: "-30",
                left:"160",
                opacity:"1"
            },200,function(){
                $(".t_line05 .t_dot").css({top: "0",left:"0",opacity:"0"})
            })
        },4500)
        
    }

    light();

    setInterval(light,10000);
    $(".t_07").click(function(){
        $(".time_wrap").addClass("ani_hide");
    })
    $(".n_til ul li").mouseover(function(){
        var index=$(this).index();
        $(this).find("a").addClass("on").end().siblings().find("a").removeClass("on");
        $(this).parents(".news_con").find(".n_infor").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
    })
    $(".n_s_sel").click(function(){
        $(".n_select").slideDown();
    });
    $(".n_select ul li").click(function(){
        $(".js_span").text($(this).text());
        $(".n_select").slideUp();
    });
    $(".video_con .v_main ul li").click(function(){
        $(".video_mask").show();
    });
    $("#close").click(function(){
        $(".video_mask").hide();
    });
    $(".js_til ul li").click(function(){
        var index=$(this).index();
        $(this).find("a").addClass("on").end().siblings().find("a").removeClass("on");
        $(this).parents(".yb_con").find(".y_i_con .js_a").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
    })
});
