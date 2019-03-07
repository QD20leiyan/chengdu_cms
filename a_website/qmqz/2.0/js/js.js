$(function(){
	$(".about_btn .a_position01 img").click(function(){
   		$(".main03").show();
   	})
 	$(".m3_close").click(function(){
 		$(".main03").hide();
 	})
 	$(".play_btn").click(function(){
		$("#video_mask").show();
	})
	$("#close").click(function(){
		$("#video_mask").hide();
	})
	$(".about_btn .a_position02 img").click(function(){
   		$("#ios_download01").show();
   	})
	$(".about_btn .a_position03 img").click(function(){
   		$("#ios_download02").show();
   	})
	$(".about_btn .a_position05 img").click(function(){
   		$("#ios_download03").show();
   	})
 	$(".ios_download .m3_close").click(function(){
 		$("#ios_download01").hide();
 		$("#ios_download02").hide();
 		$("#ios_download03").hide();
 	})
 	//返回顶部
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
		var i=$(this).index(); 
		var rel=$(this).attr('id');
		$(".select_value").val(j); 
		$(".select_id").val(rel);
		$(".select_info").slideUp(); 
		$(".list02_main").eq(i).css({"display":"block"}).siblings(".list02_main").css({"display":"none"}); //切换对应的内容
	})
	$(".sub_close").click(function(){
		$("#receive_box").hide();
		$("#re_btn").hide();
		$(".vs_bg").hide();
	})
	/*$(".sub_receive").click(function(){
		$("#receive_box").show();
		$(".vs_bg").show();
	})
	$(".demo_btn").click(function(){
		$("#re_btn").show();
		$("#receive_box").hide();
	})*/
	
	//$(".active_sub_main").img_loop_lb();
	$(".arrow").mouseover(function(){
		$(this).find("i").addClass("on");
	})
	$(".arrow").mouseout(function(){
		$(this).find("i").removeClass("on");
	})
	$(".active_sub_wrap ul li").mouseenter(function(){
		$(this).find(".active_sub_info").slideDown();
	})
	$(".active_sub_wrap ul li").mouseleave(function(){
		$(this).find(".active_sub_info").slideUp();
	})
	$(".active_sub_wrap ul li").click(function(){
		var src=$(this).find("img").attr("src");
		var bigimg='<div class="big_img"><img src='+src+'><span class="js_close close_big"></span></div>';
		$(".active_sub_main").append(bigimg);
		$(".mask").show();
	})
	$(".active_sub_con").delegate('.js_close','click',function(){
		$(".big_img").remove();
		$(".mask").hide();
	})
	$(".mask").click(function(){
		$(".big_img").remove();
		$(".mask").hide();
	})
//下拉
	$(".b_text img").click(function(){
		$(".b_selectmain").slideToggle();
	})
	$("ul.b_selectmain li").click(function(){
		var b_j=$(this).text();
		var b_i=$(this).index(); 
		var rel=$(this).attr('id');
		$(".b_select_text").val(b_j);
		$("#sever_id").val(rel);
		$(".b_selectmain").slideUp(); 
	})
	$(".js_close").click(function(){
		$("#recruit_infor").hide();
		$("#recruit_tck").hide();
		$(".b_mask").hide();
		$("#add_infor").hide();
		$("#add_tck").hide();
	})
	//一周年入口
    $(".top01 a").click(function(){
    	$(this).addClass("cur").siblings().removeClass("cur");
    })
	$(".enter_load").click(function(){
		$(".enter_load_wrap").slideToggle();
		setTimeout(function(){
			$(".enter_load_wrap").hide();
		},20000);
	})
	$(".enter_load_wrap").click(function(){
		$(this).hide();
	})
	$(".lq_gift").click(function(){
		$(".gift_tck").show();
		$(".zz").show();
	})
	$(".zz").click(function(){
		$(".gift_tck").hide();
		$(".zz").hide();
	})
	$(".f_load_btn").click(function(){
		$(".f_load_con").fadeToggle();
	})
	var sWidth2 = $(".content5 ul li").width()+10;
    var cov_length2 = $(".content5 ul li").length;
	$(".content5 ul").css("width", sWidth2 * (cov_length2));
	var index2 = 1;
	$(".prev").click(function() {
		if (index2 == 0) {
			index2 = cov_length2 - 2;
			showPics2(index2);
		} else {
			index2 -= 1;
			showPics2(index2);
			$(".next").css({
				"display": "block"
			});
		}
	});
	$(".next").click(function() {
		if (index2 == (cov_length2 - 2)) {
			index2 = 0;
			showPics2(index2);
	
		} else {
			index2 += 1;
			showPics2(index2);
			$(".prev").css({
				"display": "block"
			});
		}
	});
	function showPics2(index2) {
		var nowLeft2 = -index2 * sWidth2;
		$(".content5 ul").stop(true, false).animate({
			"left": nowLeft2
		}, 300);
	}
	$(".v_con ul li").click(function(){
		$("#video_mask").show();
		$(".vs_bg").show();
	})
	//添加img图标
    $(".v_left_box ul li").addClass("add_on");
    //var btn="<div class='v_ico'><span class='img_ico'></span></div>";
	//$(".v_left_box ul li").append(btn);
	$(".v_r_main ul li").addClass("add_on");
	//$(".v_r_main ul li").append(btn);
	
})
