
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
    function show_s(index){
        $(".pic-num span").removeClass("on").eq(index).addClass("on");
        $(".pic-show ul li").eq(index).fadeIn(500).siblings(".pic-show ul li").fadeOut(500);
    }
    var myshow=setInterval(function(){
            show_s(index);
            index++;
            if(index==$_picn){index=0;}
    },3000);
    $(".pic-num span").hover(
        function(){
          if(myshow){clearInterval(myshow);}
          index=$(".pic-num span").index(this);
          show_s(index);
        },function(){
          myshow=setInterval(
            function(){
              show_s(index);
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
            show_s(index);
            index++;
            if(index==$_picn){index=0;}
          },3000);
        }
    );
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
    var $main_visual = $('.banner_box');
    var $item_chocobo_01 = $('.sea01');
    var visualWidth = $main_visual.width();
    $main_visual.mousemove(function(e){
        var cursorX = e.clientX - $main_visual.offset().left;
        var cursorY = e.clientY - $main_visual.offset().top;
        var i=0.5;
        $(this).find('.sea01,.sea03').each(function(){
            var item_width = $(this).width();
            var wrapperWidth =$_window.width();
            var wrapperHeight =(wrapperWidth-0)/1.26;
            var centerX = wrapperWidth / 2;
            var centerY = wrapperHeight / 2;
            var newLeft = ((cursorX - centerX) * 0.8 / 100);
            var newTop = (cursorY - centerY) * 0.3 / 100;
            $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
        });
        $(this).find('.sea02,.sologan').each(function(){
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
    });
    $(".js_til ul li").click(function(){
        var index=$(this).index();//获取当前划过元素的index值
        $(this).addClass("on").siblings().removeClass("on");//改变当前状态
        $(this).parent().parent().next().find(".new_infor").eq(index).css({"display":"block"}).siblings().css({"display":"none"});//切换内容
    });
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
    $(".float").floatadv();

	$(".in_video").click(function(){
		$(".video_mask").show();
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
  $(".li_box ul li").click(function(){
    $(this).addClass("on").siblings().removeClass("on");
  	$(".g_vimg").empty();
  	var index3=$(this).index();
  	var link_url = $(this).attr('rel');
  	var image_url = $(this).attr('data-id');
  	var a='<a href="javascript:"><img src="'+img_name01+'" alt="img'+index3+'" /><span class="v_logo"></span><i></i></a><div class="in_embed"><div id="vid" class="prism-player"></div></div>';
  	$(".g_vimg").html(a);
  	var img_name01=$(this).find('img').attr("src");
  	$(".g_vimg a").find('img').attr("src",img_name01);
    $(".g_vimg a").click(function(e){
      // $(".in_embed").empty();
        $('#vid').html('');
      e.stopPropagation();
  		$(this).hide();
  		// $(".in_embed").append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="1149" height="510" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'&auto_play=1&gpcflag=1&width=1149&height=510" type="application/x-shockwave-flash"></embed>');
  		$(".in_embed").show();
        videoPlay(link_url, '', '510px', '', 'vid', '1149px');
  	})
  })
  $(".g_vimg a").click(function(){
    $(this).hide();
    var url = $(this).attr('data-url');
    videoPlay(url, '', '510px', '', 'vid', '1149px');
    $(".in_embed").show();
  })
  var li_width=$(".li_box ul li").width();
  var index_w=$(".li_box ul li").index();
  var index_l=$(".li_box ul li").length;
  $(".li_box ul").width(li_width*index_l+3);
  function move(){
    var _left=li_width*index_w;
    $(".li_box ul").animate({left:-_left});
  }
  $(".g_next").click(function(){
    if(index_w>=index_l-4){
      index_w=index_l-4;
      return;
    }
    index_w++;
    move();
  });
  $(".g_pre").click(function(){
      index_w--;
      if(index_w==-1){
      index_w=0;
      return;
     }
    move();
  });

      // 首页轮播

  	function show(id,i) {
		var ii=0;
        var obj = $(id);
		if(obj.parent().find(".item i").length>0){
			if(typeof(obj.parent().find("li").eq(i).attr("dataw"))=="undefined"){}else{
				var datawarr = obj.parent().find("li").eq(i).attr("dataw").split("_");
				var dataName = obj.parent().find("li").eq(i).data("name");
				var dataDesc = obj.parent().find("li").eq(i).data("desc");
				obj.parent().find(".n_in_txt h3").html(dataName);
				obj.parent().find(".n_in_txt p").html(dataDesc);
  				for(var i in datawarr){
  					 ii++;
  					  obj.parent().find(".n_t"+ii).find("i").animate({
  					    width :datawarr[i]+"%"
  					  },1000);
  			    }
			}
  		}
  	}
    $(".w_nav ul li").click(function(){
      var index=$(this).index();
    var _index = $(this).index()+1;
      $(this).addClass("on").siblings().removeClass("on");
        $(".w_con").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
      $(".w_con").eq(index).find(".item i").css("width","0");
        show(".slideBox"+_index,0);
    $(".w_con").find("li").eq(0).show().siblings().hide();
    })
      $(".slideBox1").slide({mainCell:"ul",autoPage:false,pnLoop:false,
          endFun:function(i,c){

              show(".slideBox1",i)
          }
      });
      $(".slideBox2").slide({mainCell:"ul",autoPage:false,pnLoop:false,
          endFun:function(i,c){
              show(".slideBox2",i)
          }
      });
      $(".slideBox3").slide({mainCell:"ul",autoPage:false,pnLoop:false,
          endFun:function(i,c){
             show(".slideBox3",i)
          }
      });
      $(".slideBox4").slide({mainCell:"ul",autoPage:false,pnLoop:false,
          endFun:function(i,c){
              show(".slideBox4",i)
          }
      });
      $(".slideBox5").slide({mainCell:"ul",autoPage:false,pnLoop:false,
          endFun:function(i,c){
              show(".slideBox5",i);

          }
      });
});
