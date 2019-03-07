$(function(){
	//	视频播放弹层	
	$(".play_btn img").click(function(){
 		$("#video_mask").show();
 		$('.vid_sp').trigger('play');
 	})
 	$("#close").click(function(){
 		$("#video_mask").hide();
 		$('.vid_sp').trigger('pause');
 	})
 	$(".link01").click(function(){
 		$(".main01_nav").show();
 	})
 	$(".wclose").click(function(){
 		$(this).parent(".main01_nav").hide();
 	})
 	$(".nav_slide").click(function(){
 		$(this).next(".nav_slides").slideToggle();
 	})
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
	/*$(".js_receive").click(function(){
		$("#receive_box").show();
		$(".vs_bg").show();
	})
	$(".demo_btn").click(function(){
		$("#re_btn").show();
		$("#receive_box").hide();
	})*/
    $(".active_nav ul li").click(function(){
    	$(this).addClass("on").siblings("li").removeClass("on");
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
	//	一周年入口
	$(".enter_load").click(function(){
		$(".load_wrap").slideToggle();
	})
	$(".enter_bg").click(function(){
		$(".load_wrap").hide();
	})
	$(".play_btn").click(function(){
	    $("#video_tck").show();
   		$('.vid_sp').trigger('play');
   		$("#mask").show();
	})
	$(".video_box ul li").click(function(){
	    $("#video_tck").show();
   		$('.vid_sp').trigger('play');
   		$("#mask").show();
	})
	$("#close").click(function(){
 		$("#video_tck").hide();
 		$("#mask").hide();
 		$('.vid_sp').trigger('pause');
 	})
	$(".link03").click(function(){
	    $(".gift_tck").show();
   		$("#mask").show();
	})
	$(".close").click(function(){
 		$(".gift_tck").hide();
 		$("#mask").hide();
 	})
	//添加img图标
    $(".video_box ul li").addClass("add_on");
    var btn="<div class='v_ico'><span class='img_ico'></span></div>";
	$(".video_box ul li").append(btn);
	$(".js_nctil ul li").click(function(){
		var index=$(this).index();
		var _index=index+1;
		$(this).find("a").addClass("on").end().siblings().find("a").removeClass("on");
		$(".game").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	});
	$.fn.img_fadeb=function(o){
			return this.each(function(){
				var $img_fade=$(this);
				var len=$img_fade.find("ul li").length;
				var lbc = $img_fade.find("ul li.on");
				if(o){
					$img_fade.find("i.abc").html($("<span>"+lbc.find("img").attr("alt")+"</span>"));
				}
				var index=lbc.index();
					$img_fade.find(".prev").click(function(){
						index--;
						if(index==-1){
							 index = len-1;
						}
						change(index);
					})
					$img_fade.find(".next").click(function(){
						index++;
						if(index==len){
							 index = 0;
						}
						change(index);
					})
					function change(index){
						$img_fade.find("ul li").eq(index).addClass("on").siblings().removeClass("on");
						if(o){
							$img_fade.find("i.abc").html($("<span>"+$img_fade.find("ul li").eq(index).find("img").attr("alt")+"</span>"));	
						}
						
					}	
			  })
		}
	$(".n_cm2 .a_left").click(function(){
		$(".bt_mask").show();
		$(".js_t1").show();
	});
	$(".n_cm2 .a_right").click(function(){
		$(".bt_mask").show();
		$(".js_t2").show();
	});
	$(".js_close").click(function(){
		$(".bt_mask").hide();
		$(".js_t1").hide();
		$(".js_t2").hide();
		$(".js_t3").hide();
	});
})
