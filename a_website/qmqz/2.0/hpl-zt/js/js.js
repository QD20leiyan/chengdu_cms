$(function(){
	// 视频
	$(".video").click(function(){
		$(".video_mask").show();
    })
    $(".m4-video").click(function(){
		$(".video_mask").show();
    })
    $(".m4-more1").click(function(){
		$(".video_mask").show();
    })
    $(".m4-more2").click(function(){
		$(".video_mask").show();
    })
    $(".m3-item-4").click(function(){
		//$(".video_mask").show();
    })
    $(".m1-btn1").click(function(){
		$(".video_mask").show();
    })
    $(".m1-btn2").click(function(){
		$(".video_mask").show();
    })
    $("#close").click(function(){
    	$(".video_mask").hide();
    })

    //滚动
	var $itemWidth = $(".m1-item").width(),
		$mtemWidth = $(".m1-mtem").width(),
		temNum = $(".m1-tem").length,
		itemNum = $(".m1-item").length,
		count = 1;
		$scrollWidth = $(".m1-scroll");
	$scrollWidth.width($itemWidth*itemNum+$mtemWidth*(temNum-itemNum));
	$(".m1-next").click(function(){
		if(parseInt($scrollWidth.width()) / count > 1220){
			if(parseInt($scrollWidth.width()) - 1220*count < 1220){
				$scrollWidth.animate({
					marginLeft :-(parseInt($scrollWidth.width()) - 1220)
				},500);
			}else{
				$scrollWidth.animate({
					marginLeft :-count*1220
				},500);
			}
		}else {
			count --;
		}
		if(parseInt($scrollWidth.width()) / count > 1220){
			count++;
		}
	})
	$(".m1-prev").click(function(){
		var count1;
		if(count <= 0){
			count = 0;
		}else{
			count1 = count - 2;
			if(count1 <= 0){
				count1 = 0;
			}
		}
		$scrollWidth.animate({
			marginLeft : -count1*1220
		},500);
		if(count <= 1){
			count = 1;
		}else{
			count--;
		}
	})
	
    //无缝滚动
	var m4Item = $(".m4-item"),
		m4ItemNum = $(".m4-item").length,
		m4Demo1 = $(".m4-demo1"),
		m4Demo2 = $(".m4-demo2"),
		m4Inner = $(".m4-inner"),
		m4Box = $(".m4-box");
	m4Demo1.append(m4Demo1.html());
	m4Demo1.width(m4ItemNum*506);
	m4Inner.width(m4ItemNum*506);
	var flag=0;
	var time1=null;
	var time2=null;
	function automove(){
		if(flag==0){
			time1=setInterval(function(){
				m4Box.scrollLeft(m4Box.scrollLeft()+1);
				if(m4Box.scrollLeft()>=m4ItemNum*253){
					m4Box.scrollLeft(0);
				}
			},10)	
		}else{
			time2=setInterval(function(){
				m4Box.scrollLeft(m4Box.scrollLeft()-1);
				if(m4Box.scrollLeft()<=0){
					m4Box.scrollLeft(m4ItemNum*253);
				}
			},10)
		}	
	}
	automove()
	$(".m4-prev").click(function(){
		flag=1;
		clearInterval(time1);
		clearInterval(time2);
		automove();
	})
	$(".m4-next").click(function(){
		flag=0;
		clearInterval(time1);
		clearInterval(time2);
		automove();
	})
	m4Box.mouseover(function(){
		clearInterval(time1);
		clearInterval(time2);
	})
	m4Box.mouseout(function(){
		clearInterval(time1);
		clearInterval(time2);
		automove();
	})

	// tab
	// $("#m1-nav ul li").click(function(){
	// 	var index=$(this).index();
	// 	$(this).find("span").addClass("m1-on").end().siblings().find("span").removeClass("m1-on");
	// 	// $(".m1-content").eq(index).css({"display":"block"}).siblings(".m1-content").css({"display":"none"});
	// })
	$(".m3-nav ul li").click(function(){
		var index=$(this).index();
		$(this).find("span").addClass("m1-on").end().siblings().find("span").removeClass("m1-on");
		$(".m3-infcon").eq(index).css({"display":"block"}).siblings(".m3-infcon").css({"display":"none"});
	})
	$(".g-m1-nav ul li").click(function(){
		var index=$(this).index();
		$(this).find("span").addClass("g-m1-of").end().siblings().find("span").removeClass("g-m1-of");
		$(".g-m1-fzcon").eq(index).css({"display":"block"}).siblings(".g-m1-fzcon").css({"display":"none"});
	})
	$(".g-m1-tab-item").click(function(){
		var index=$(this).index();
		$(this).find("span").addClass("g-m1-tab-on").end().siblings().find("span").removeClass("g-m1-tab-on");
		$(".g-m1-infcon").eq(index).css({"display":"block"}).siblings(".g-m1-infcon").css({"display":"none"});
	})
	//垂直居中
	$(".g-item .g-iteml div").each(function(){
		$(this).height($(this).find("span").length*19)
	})
	$(".g-mtem .g-mteml div").each(function(){
		$(this).height($(this).find("span").length*19)
	})

	//锚点
	var main1 = document.getElementById('main1');
	var main2 = document.getElementById('main2');
	var main3 = document.getElementById('main3');
	var main4 = document.getElementById('main4');
	var main5 = document.getElementById('main5');
	var main6 = document.getElementById('main6');
	var main7 = document.getElementById('main7');
	var main8 = document.getElementById('main8');
	var main9 = document.getElementById('main9');
	var cnavItem = [main1,main2,main3,main4,main5,main6,main7,main8,main9];
	$(".cnav ul li").click(function(){
		var index=$(this).index();
		$("html,body").animate({scrollTop: cnavItem[index].offsetTop}, 500);
	});
	$(window).scroll(function (){
		cnav($(this));
	});
	cnav($(window));
	function cnav(obj){
		var st = obj.scrollTop();
		if(obj.scrollTop()>=930){
			$(".cnav").addClass("cnavfix");
		}else{
			$(".cnav").removeClass("cnavfix");
		}
		if(st<=cnavItem[1].offsetTop){
			$(".cnav ul li").eq(0).find("p").addClass("cnav-on").end().siblings().find("p").removeClass("cnav-on");
		}
		if(st<=cnavItem[2].offsetTop&&st>=cnavItem[1].offsetTop){
			$(".cnav ul li").eq(1).find("p").addClass("cnav-on").end().siblings().find("p").removeClass("cnav-on");
		}
		if(st<=cnavItem[3].offsetTop&&st>=cnavItem[2].offsetTop){
			$(".cnav ul li").eq(2).find("p").addClass("cnav-on").end().siblings().find("p").removeClass("cnav-on");
		}
		if(st<=cnavItem[4].offsetTop&&st>=cnavItem[3].offsetTop){
			$(".cnav ul li").eq(3).find("p").addClass("cnav-on").end().siblings().find("p").removeClass("cnav-on");
		}
		if(st<=cnavItem[5].offsetTop&&st>=cnavItem[4].offsetTop){
			$(".cnav ul li").eq(4).find("p").addClass("cnav-on").end().siblings().find("p").removeClass("cnav-on");
		}
		if(st<=cnavItem[6].offsetTop&&st>=cnavItem[5].offsetTop){
			$(".cnav ul li").eq(5).find("p").addClass("cnav-on").end().siblings().find("p").removeClass("cnav-on");
		}
		if(st>=cnavItem[6].offsetTop){
			$(".cnav ul li").eq(6).find("p").addClass("cnav-on").end().siblings().find("p").removeClass("cnav-on");
		}
	}


})