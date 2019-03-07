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
	
//	图片轮播特效	
	var sWidth = $(".main02_right").width(); 
	var cov_length = $(".main02_right ul li").length;
	var index = 0;
	var picTimer;
	var btn = "<div class='buttons'>";
	for (var i = 0; i < cov_length; i++) {
		btn += "<span></span>";
	}
	$(".main02_right").append(btn);
	$(".main02_right .buttons span").mouseover(function() {
		index = $(this).index();
		showPics(index);
	}).eq(0).trigger("mouseover");		
	$(".main02_right ul").css("width", sWidth * (cov_length));
	$(".main02_right").hover(function() {
		clearInterval(picTimer);
	}, function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if (index == cov_length) {
				index = 0;
			}
		}, 3000);
	}).trigger("mouseleave");

	function showPics(index) { 
		var nowLeft = -index * sWidth; 
		$(".main02_right ul").stop(true, false).animate({
			"left": nowLeft
		}, 300);
	
		$(".main02_right .buttons span").removeClass("on").eq(index).addClass("on"); 
	}
	
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
			s_index = 3;
			$(".con ul").css({
				'left': '-5000px'
			});
			$(".con ul").animate({
				left: '+=1000px'
			});
		} else {
			s_index--;
			$(".con ul").animate({
				left: '+=1000px'
			});
		}
	
	})
	$(".nextbtn").click(function() {
		if (s_index == 3) {
			s_index = 0;
			$(".con ul").css({
				'left': '0'
			});
			$(".con ul").animate({
				left: '-=1000px'
			});
		} else {
			s_index++;
			$(".con ul").animate({
				left: '-=1000px'
			});
		}
	
	})
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
})
