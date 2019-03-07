$(function(){
//导航单击特效
    $(".top01 a").click(function(){
    	$(this).addClass("cur").siblings().removeClass("cur");
    })
//tab切换	
	$(".main02_nav ul li").mouseover(function(){
		var index=$(this).index();
		$(this).find("a").addClass("on").end().siblings().find("a").removeClass("on");
		$(".infor").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	})
	
//	图片轮播特效6-24修改	
    	$(".main02_right").img_lb(); 
    	$(".jchd_con").img_lb();
//	cover页手机号码验证并弹层	
        $(".check_from").click(function(){
    	var mobile=$(".mobile").val();
    	var myreg = /^(1[3|4|5|8][0-9]+\d{8})$/;
    	if(mobile.length==0)
        {
           alert('请输入手机号码！');
           document.form1.mobile.focus();
           return false;
        }
        else if(mobile.length!=11)
        {
            alert('请输入有效的手机号码！');
            document.form1.mobile.focus();
            return false;
        }else if(!myreg.test(mobile))
        {  
            alert('请输入有效的手机号码！');
            document.form1.mobile.focus();
            return false;
        }else{
        	$(".gift_iframe").show();
        	$(".mask").show();
        }        
    })
    $(".close_btn").click(function(){
 		$(".gift_iframe").hide();
 		$(".mask").hide();
 	})
    	
//	视频播放	
	$(".paly_btn").click(function(){
 		$("#video_mask").show();
 	})
 	$("#close").click(function(){
 		$("#video_mask").hide();
 	})
 	
 	
  $(".main04_link a").mouseover(function(){
  	  var index=$(this).attr("index");
  	  $(".hide div").eq(index).slideToggle();
  })
  $(".main04_link a").mouseout(function(){
  	  var index=$(this).attr("index");
  	  $(".hide div").eq(index).hide();
  })
    //改版添加
    $(".gift_hc").mouseover(function(){
        $(".gift_hover").show();
    })
    $(".gift_hc").mouseout(function(){
        $(".gift_hover").hide();
    })
    $(".gift_hc").click(function(){
        $(".gift_click").toggle();
    })
    $(".newuser_btn").click(function(){
        $(".gift_tck").show();
        $(".zz").show();
    })
    $(".hd_btn").click(function(){
        $(".gift_tck01").show();
        $(".zz").show();
    })
    $(".zz").click(function(){
        $(".gift_tck").hide();
        $(".gift_tck01").hide();
        $(".gift_click").hide();
        $(this).hide();
    })
    //6.10修改添加
    var s_index = 0;
    var $wrap = $(".main03");
    $wrap.find("ul li").click(function() {
        var ss_index = $(this).index();
        $(".tck_con").show();
        $(".mask").show();
        var dis = ss_index - s_index;
        var sl = dis * 1000;
        s_index = ss_index;
        $(".con ul").animate({
            left: '-=' + sl
        });
    })
    $(".prevbtn").click(function() {
			if (s_index == 0) {
				return false;
			}else{
				s_index--;
				$(".con ul").animate({
                   left: '+=1000px'
                });
			}
		});
	$(".nextbtn").click(function() {
		if (s_index == 3) {
			return false;
		}else{
			s_index++;
			$(".con ul").animate({
	            left: '-=1000px'
	        });
		}
	});
    $(".close").click(function() {
        $(".tck_con").hide();
        $(".mask").hide();
    })
//新添加
    $(".news_rtitle ul li").click(function() {
        var index = $(this).index();
        $(this).addClass("new_active").siblings().removeClass("new_active");
    })
    $(".number a").click(function(){
        $(this).addClass("nub_on").siblings("").removeClass("nub_on");
    })
	//底部友情链接滚动
	//0616
	var speed = 20; //数字越大速度越慢
	var tab_image = document.getElementById("demo");
	var tab1 = document.getElementById("demo1");
	var tab2 = document.getElementById("demo2");
	tab2.innerHTML = tab1.innerHTML;
	function Marquee() {
		if (tab2.offsetWidth - tab_image.scrollLeft <= 0)
			tab_image.scrollLeft -= tab1.offsetWidth
		else {
			tab_image.scrollLeft++;
		}
	}
	var MyMar = setInterval(Marquee, speed);
	tab_image.onmouseover = function() {
		clearInterval(MyMar)
	};
	tab_image.onmouseout = function() {
		MyMar = setInterval(Marquee, speed)
	};
//	首页新加
	$(".xs_nav li").click(function(){
		var index=$(this).index();
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".qzdq .qzdq_0").eq(index).show().siblings(".qzdq_0").hide();
	})
	$(".qzdq_01").img_loop_lb();
       
        $(".lq_gift").click(function(){
                $(".gift_tck").show();
                $(".zz").show();
        })
        $(".zz").click(function(){
                $(".gift_tck").hide();
                $(".zz").hide();
        })
})
