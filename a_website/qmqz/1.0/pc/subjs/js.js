$(document).ready(function(){
	//导航切换
	$(".links ul li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
	})
	$(".xf_main ul li a").click(function(){
		    $(this).addClass("active").parent("li").siblings().find("a").removeClass("active");
	})
	//div 随着滚动条滚动
	//$(window).scroll(function() { 
//	var top = $(window).scrollTop()+200; 
//	var right= $(window).scrollLeft()+10; 
//	$("#xf_box").css({ right:right + "px", top: top + "px" }); 
//	}); 
	//精美图片
	var sWidth = $("#focus").width(); 
	var cov_length = $("#focus ul li").length;
	var index = 0;
	var picTimer;
	var btn = "<div class='btn'>";
	for (var i = 0; i < cov_length; i++) {
		btn += "<span></span>";
	}
	$("#focus").append(btn);
	$("#focus .btn span").mouseover(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseover");
	$("#focus ul").css("width", sWidth * (cov_length));
	$("#focus").hover(function() {
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
		$("#focus ul").stop(true, false).animate({
			"left": nowLeft
		}, 300); 
	
		$("#focus .btn span").stop(true, false).animate({
			"opacity": "0.7"
		}, 300).eq(index).stop(true, false).animate({
			"opacity": "1"
		}, 300); 
	}
	
	//返回
	var offset = 300,
		offset_opacity = 1200,
		scroll_top_duration = 700,
		$back_to_top = $('.cd-top');
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 
		 	}, scroll_top_duration
		);
	});
	//下拉
$(".select_top span").click(function(){
		$(".select_info").slideToggle();
	})	
$(".select_info ul li").click(function(){
		var j=$(this).text();
		var i=$(this).index(); //获取到当前点击的index
		$(".select_top input").val(j); //将选中的li值赋给input
		$(".select_info").slideUp(); //点击之后收起下拉框
		$(".list02_main").eq(i).css({"display":"block"}).siblings(".list02_main").css({"display":"none"}); //切换对应的内容
	})
	//	视频播放	
	$(".image a").click(function(){
        var src=$(this).attr('rel');
        var flashvars="vcastr_file="+src+"&IsAutoPlay=0&width=570&height=300&DefaultVolume=100";
        var embed='<embed width="696" height="358" allowfullscreen="true" wmode="transparent" type="application/x-shockwave-flash" src='+src+' pluginspage="http://www.adobe.com/go/getflashplayer" flashvars='+flashvars+'>';
        $("#video_mask .videos").html(embed);
        $("#video_mask").show();
 	})
 	$("#close").click(function(){
 		$("#video_mask").hide();
 	})
 	$(".gz").click(function(){
 		$(".gz_box").toggle();
 	})
$(".fx").click(function(){
        $(".gift_box").show();
        $(".zz").show();
    })
    $(".zz").click(function(){
        $(this).hide();
        $(".gift_box").hide();
    })

    //底部友情链接滚动
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
$(".links ul li:last-child").hover(
        function(){
              $(".history").slideDown();
         },function(){
        $(".history").slideUp();
        });
 	$(".history").click(function(){
 		$(this).slideUp();
 	});
$(".sanjiao").floatadv();
    // 	2015/8/14新加
    //$(".js_vote").click(function() {
    //    $(".vote_iframe1").show();
    //    $(".mask").show();
    //})
    //$(".js_votes").click(function() {
    //    $(".vote_iframe1").hide();
    //    $(".vote_iframe2").show();
    //    $(".mask").show();
    //})
    $(".js_cvote").click(function() {
        $(".vote_iframe1").hide();
        $(".vote_iframe2").hide();
        $(".mask").hide();
    })
    $(".js_slide").click(function() {
        $(".vote_slide").slideToggle();
    })
    $(".vote_slide ul li").click(function() {
        var js=$(this).text();
        var is=$(this).index(); //获取到当前点击的index
        var selected_id=$(this).attr('id');
        $(".server_name").val(js);  $(".server_id").val(selected_id);  //将选中的li值赋给input
        $(".vote_slide").slideUp(); //点击之后收起下拉框
    })
})
jQuery.fn.floatadv = function(loaded) {
	var obj = this;
	body_height = parseInt($(window).height());
	block_height = parseInt(obj.height());	
	top_position = parseInt((body_height/2) - (block_height/2) + $(window).scrollTop());
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
		obj.animate({ 'top': top_position }, 300, 'linear');
	}
}
