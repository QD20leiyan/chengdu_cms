/*
create 2017-10-17
*/
$(function() {

	function init() {
		add_move_icon($(".mo1"));
		add_move_icon($(".mo2"));
		click_i1_list();
	}

	//点击新闻列表切换
	$(".i2_r_nav li").click(function() {
		var index = $(this).attr("data-index");
		changeShowContent($(".i2_r_nav li"), $(".i2_r_content > li"), index);
	});

	$(".i4_video .i4_l_nav li").click(function() {
		var index = $(this).attr("data-index");
		changeShowContent($(".i4_video .i4_l_nav li"), $(".i4_video .video_list"), index);
	});

	$(".i4_gl .i4_l_nav li").click(function() {
		var index = $(this).attr("data-index");
		changeShowContent($(".i4_gl .i4_l_nav li"), $(".i4_gl .i4_news"), index);
	});

	$(".i4_gl_video .i4_l_nav li").click(function() {
		var index = $(this).attr("data-index");
		changeShowContent($(".i4_gl_video .i4_l_nav li"), $(".i4_gl_video .video_list"), index);
	});

	$(".i4_r_user .nav_style2 li").click(function() {
		var index = $(this).attr("data-index");
		changeShowContent($(".i4_r_user .nav_style2 li"), $(".i4_r_user .text_list2"), index);
	});

	$(".i4_r_ph .nav_style2 li").click(function() {
		var index = $(this).attr("data-index");
		changeShowContent($(".i4_r_ph .nav_style2 li"), $(".i4_r_ph .text_list2"), index);
	});

	//点击切换精彩活动列表
	function click_i1_list() {
		var i1_list = $(".i1_list");
		var i1_list_index = 0;
		var i1_list_group = get_i1_list_group();
	    
		$(".i1_preve").click(function() {
			if(i1_list_index == 0) {
				return;
			}
			i1_list_index--;
			change_i1_list(i1_list,i1_list_index);
		});

		$(".i1_next").click(function() {
			
			if(i1_list_index == (i1_list_group - 1)){
				return;
			}
			i1_list_index++;
            change_i1_list(i1_list,i1_list_index);
		});
	}
	//彩活动列表切换
	function change_i1_list(ele,index) {
		ele.animate({
			"margin-left": -index*1080
		}, 400)
	}
	//得到彩活动列表的组数
	function get_i1_list_group(){
		var i1_list_len = $(".i1_list li").length;
		if(i1_list_len <= 6){
			return 0;
		}else{
		    if(i1_list_len%6 != 0){
		    	return parseInt(i1_list_len/6) + 1;
		    }else{
		    	return parseInt(i1_list_len/6);
		    }
		}
	}

	init();

});