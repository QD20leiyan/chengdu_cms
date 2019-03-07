$(function(){
    // 二维码弹层
    $(".video").click(function(){
        $(".tack1").show();
    })
    $(".t1-close").click(function(){
        $(".tack1").hide();
    })
    $(".js_test").click(function(){
        $(".tack2").show();
    })
    $(".t2-close").click(function(){
        $(".tack2").hide();
    })
	$(".btn02").click(function(){
        $(".tack2").hide();
    })
    $(".btn01").click(function(){
		var phone = $('#phone').val();
		var type = $('.t2-on').attr('data-id');
		var man = $('.t3-on').attr('data-id');
		if($.trim(phone) == ''){
			alert('手机号不能为空');
			return false;
		}else{
			//验证手机
			var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
			if(!reg.test($.trim(phone)))
			{
				alert("手机号码格式不对！");
				return false;
			}
			if(phone.length != 11){
				alert("手机号格式不对！");
				return false;
            }
			$.post(
				'/site/yuyue',
				{
					phone:phone,
					type:type,
					man:man
				},
				function(msg){
					if(msg == 1){
						$(".tack2").hide();
						$(".tack3").show();
					}else if(msg == 0){
						$(".tack2").hide();
						alert('预约失败');
					}else if(msg == 2){
						$(".tack2").hide();
						alert('该手机号码已存在，请勿重复预约');
					}
				}
			);
		}
    })
    $(".t3-close").click(function(){
        $(".tack3").hide();
        $(".tack4").hide();
        $(".list_iframe").hide();
    })
	$(".t5-close").click(function(){
        $(".tack5").hide();
    });
	$(".and-down").on("click",function(){
		$(".tack5").show();
	})
    // TAB
    $(".formul li").click(function(){
    var index=$(this).index();
    $(this).find("span").addClass("t2-on").end().siblings().find("span").removeClass("t2-on");
    })
	// TAB2
    $(".formul02 li").click(function(){
    var index=$(this).index();
    $(this).find("span").addClass("t3-on").end().siblings().find("span").removeClass("t3-on");
    })

    // 内容渐入
	$(".moving_item_you").animate({
        top : "-20px",
        right : "-448px"
    },1000,function(){
        $(".moving_item_zuo").animate({
            top : "0",
            left : "-448px"
        },1000,function(){
            $(".cover").animate({
                opacity: "1"
            },2000);
            $(".con").animate({
                opacity: "1"
            },2000,function(){
                $(".share").animate({
                    top : "28px"
                },500)
            })
        })
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
        var i=0.5;
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
    $(".js_down").click(function(){
	alert('敬请期待!');return;
        $(".tack4").show();
    });
    //渐隐
    var index=0;
    var $_picn=$(".pic-show ul li").length;
    if($_picn>1){
        for(var i=1;i<=$_picn;i++){
          var $_span="<span>"+i+"</span>";
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
    $.fn.tab_switch=function(){
        return this.each(function(){ //tab导航元素
            $(this).find("ul li").hover(function(){
                var index=$(this).index();//获取当前划过元素的index值
                $(this).find("a").addClass("on").end().siblings().find("a").removeClass("on");//改变当前状态
                $(".infor").eq(index).css({"display":"block"}).siblings().css({"display":"none"});//切换内容
            })
        })
    }
    $(".n_til").tab_switch();
    $(".js_news").click(function(){
        $(".zx_iframe").show();
        $(".mask").show();
    })
    $(".t3-close").click(function(){
        $(".zx_iframe").hide();
        $(".mask").hide();
        $("#wx_iframe").hide();
    })
})
