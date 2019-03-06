$(function(){
    var index=0;
    var $_picn=$(".pic-show ul li").length;
    if($_picn>1){
        for(var i=1;i<=$_picn;i++){
          var $_span="<span>"+"</span>";
          $(".pic-num").append($_span);
    }
        $(".pic-num span").eq(0).addClass("on");
        $(".pic-show ul li").eq(0).show().siblings(".pic-show ul li").hide();
    }
    function show(index){
        $(".pic-num span").removeClass("on").eq(index).addClass("on");
        $(".pic-show ul li").eq(index).fadeIn(500).siblings(".pic-show ul li").fadeOut(500);
    }
    var myshow=setInterval(function(){
            show(index);
            index++;
            if(index==$_picn){index=0;}
    },3000);
    $(".pic-num span").hover(
        function(){
          if(myshow){clearInterval(myshow);}
          index=$(".pic-num span").index(this);
          show(index);
        },function(){
          myshow=setInterval(
            function(){
              show(index);
              index++;
              if(index==$_picn){
                index=0;
              }
            },3000
          );
        }
    );
    $(".pic-show").hover(
        function(){
          if(myshow){clearInterval(myshow);}
        },function(){
          myshow=setInterval(function(){
            show(index);
            index++;
            if(index==$_picn){index=0;}
          },3000);
        }
    );
    $(".n_nav ul li").click(function(){
      $(this).addClass('on').siblings().removeClass('on');
    })
    $.fn.tab_switch=function(){
        return this.each(function(){ //tab导航元素
            $(this).find("ul li").click(function(){
                var index=$(this).index();//获取当前划过元素的index值
                $(this).find("a").addClass("on").end().siblings().find("a").removeClass("on");//改变当前状态
                $(".infor").eq(index).css({"display":"block"}).siblings().css({"display":"none"});//切换内容
            })
        })
    }
    $(".m_til").tab_switch();
    $(".gift .close").click(function(){
        $(".gift").hide();
    })
    $(".video a,.js_video a").click(function(){
        $("#video_mask").show();
        $(".mask").addClass("ani_mask");
    });
    $("#close").click(function(){
        $("#video_mask").hide();
        $(".mask").removeClass("ani_mask");
    });
    setTimeout(function(){
        $(".wrap").addClass("animate");
    },100);
    // 浮动
    var $_window = $(window);
    var $main_visual = $('.con');
    var $item_chocobo_01 = $('.bg');
    var visualWidth = $main_visual.width();
    $main_visual.mousemove(function(e){
        var cursorX = e.clientX - $main_visual.offset().left;
        var cursorY = e.clientY - $main_visual.offset().top;
        var i=0.5;
        $(this).find('.bg').each(function(){
            var item_width = $(this).width();
            var wrapperWidth =$_window.width();
            var wrapperHeight =(wrapperWidth-0)/1.26;
            var centerX = wrapperWidth / 2;
            var centerY = wrapperHeight / 2;
            var newLeft = ((cursorX - centerX) * 0.8 / 100);
            var newTop = (cursorY - centerY) * 0.3 / 100;
            $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
        });
    });
    $(".c_ico01,.c_ico02,.c_ico03,.c_ico04").addClass("c_ico");
    $('.c_ico01 a.a_c,.c_ico02 a.a_c,.c_ico03 a.a_c,.c_ico04 a.a_c').hover(function(){
       $(this).parent().removeClass("c_ico");
    }, function(){
       $(this).parent().addClass("c_ico");
    });
    $('.c_ico01,.c_ico02,.c_ico03,.c_ico04').hover(function(){
      $(this).find(".c_n").animate({ left: '0' }, "50");
    }, function(){
       $(this).find(".c_n").animate({ left: '-196px' }, "50");
    });
    $(".js_til ul li").click(function(){
        var index=$(this).index();//获取当前划过元素的index值
        $(this).addClass("on").siblings().removeClass("on");//改变当前状态
        $(this).parent().parent().next().find(".new_infor").eq(index).css({"display":"block"}).siblings().css({"display":"none"});//切换内容
    })
    // 首页轮播
	var new_index = 0;
	$(".i-m2-lb-box ul li").eq(0).css({"display":"block","opacity":"1"})
    $(".i-lb-nav ul li").click(function(){
    	new_index = $(this).index();
    	move(new_index);
    	if (new_index == 3){
    		new_index = 0;
    	}else{
    		new_index += 1;
    	}
    })
    function move(new_index){
    	$(".i-lb-scrollbar").animate({
    		left : 129*new_index
    	},500);
    	$(".i-m2-lb-box ul").children("li").css({"opacity":"1","display":"none"})
    	$(".i-m2-lb-box ul li").eq(new_index).css("display","block").animate({
    		opacity : 1
    	},500)
    }
    $(".i-m2-lb").hover(function(){
    	clearInterval(time);
    },function(){
    	time = setInterval(function(){
        	move(new_index);
        	new_index++;
        	if (new_index >= 4){
        		new_index = 0;
        	}
        },3000)
    })
    function start(){
    	new_index = 1;
    	time = setInterval(function(){
        	move(new_index);
        	new_index++;
        	if (new_index >= 4){
        		new_index = 0;
        	}
        },3000)
    }
    start();
    $(".i-lb-nav ul li img").each(function(i){
        this.src = $(".i-m2-lb-box ul li img").eq(i).attr("src");
    });

    $(".n_c_movebar").hover(function(){
    $(this).parent().addClass('on').siblings().removeClass('on');
    $(this).parent().parent().find(".n_c_move").not($(this).parent()).animate({width:'47px'},500);
		$(this).parent(".n_c_move").animate({width:'542px'},500);
	});
var data =
			[{
				"list" : [{
					"w" : "66.9%"
				},{
					"w" : "57%"
				},{
					"w" : "74%"
				}]
			},{
				"list" : [{
					"w" : "73.5%"
				},{
					"w" : "87%"
				},{
					"w" : "50.2%"
				}]
			},{
				"list" : [{
					"w" : "34.7%"
				},{
					"w" : "22.7%"
				},{
					"w" : "90%"
				}]
			},{
				"list" : [{
					"w" : "30.5%"
				},{
					"w" : "17.7%"
				},{
					"w" : "23.7%"
				}]
			},{
				"list" : [{
					"w" : "70%"
				},{
					"w" : "80%"
				},{
					"w" : "90%"
				}]
			}]


		$(".w_con").eq(0).find(".item").each(function(i){
        	$(this).find("i").animate({
        		width : data[0].list[i].w
        	},2000);
	    })

		$(".w_nav ul li").click(function(){
			var index=$(this).index();
			$(this).addClass("on").siblings().removeClass("on");
	        $(".w_con").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	        $(".w_con").not($(".w_con").eq(index)).find("i").width("0");
	        $(".w_con").eq(index).find(".item").each(function(i){
	        	$(this).find("i").animate({
	        		width : data[index].list[i].w
	        	},1000);
	        })
		})
	jQuery.fn.floatadv = function(loaded) {
		var obj = this;
		body_height = parseInt($(window).height());
		block_height = parseInt(obj.height());
		top_position = parseInt((body_height/2.5) - (block_height/2.5) + $(window).scrollTop());
		if (body_height<block_height) { top_position = 0 + $(window).scrollTop(); };
		if(!loaded) {
			obj.css({'position': 'absolute'});
			obj.css({ 'top': top_position });
			$(window).bind('resize', function() {
				obj.floatadv(!loaded);
			});
			$(window).bind('scroll', function() {
				obj.floatadv(!loaded);
			});
		} else {
			obj.stop();
			obj.css({'position': 'absolute'});
			obj.animate({ 'top': top_position }, 400, 'linear');
		}
	}
	$(".float_div").floatadv();
	$(".na_nav ul li").click(function(){
        var index=$(this).index();//获取当前划过元素的index值
        $(this).addClass("on").siblings().removeClass("on");//改变当前状态
        $(".js_infcon").eq(index).css({"display":"block"}).siblings().css({"display":"none"});//切换内容
    })
	$(".in_video").click(function(){
		$(".video_mask").show();
		//$(".mask").addClass('ani_mask');
	})
	$(".item").click(function(){
		var index3=$(this).index();
		var link_url = $(this).attr('rel');
		var image_url = $(this).attr('data-id');
		var a='<a href="javascript:"><i></i><img src="'+image_url+'" alt="img'+index3+'" /></a><div class="in_embed"><embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="748" height="350" align="middle" allowScriptAccess="always" flashvars="'+link_url+'&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed></div>';
		$(".new_4left").html(a);
		$(".new_4left a").click(function(){
			$(this).hide();
			$(".in_embed").show();
		})
	})
	$(".new_4left a").click(function(){
		$(this).hide();
		$(".in_embed").show();
	});
	//下载预约
	$(".in_down_ios").click(function(){
		//$(".mask").show()&&$(".makeApp").show();
	});
	$(".makeApp i.close").click(function(){
		  $(".makeApp").hide()&&$(".mask").hide();
	});
	/* var validCode=true;
	$(".makeApp span").on("click",function(){
		var time=60;
		var code=$(this);
		if(validCode){
			validCode=false;
			var t=setInterval(function(){
				time--;
				code.html(time+"秒");
				code.addClass("on");
				if (time==0) {
					clearInterval(t);
					code.html("重新获取");
					validCode=true;
					code.removeClass("on");
				 }
			},1000);
		}
	}); */

});
