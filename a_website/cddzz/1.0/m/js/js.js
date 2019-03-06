$(function() {
	$("html").fitText(2);
	$(".validate_c_close").click(function() {
		$(".tel_test_c_mask").hide();
	})
	$(".order_btn_c").click(function() {
		$(".tel_test_c_mask").show();
		$(".tel_test_success_c_mask").hide();
		$(".tel_test_validate_mask").hide();
	})
	$(".tel_test_validate_close").click(function() {
		$(".tel_test_validate_mask").hide();
	})
	$(".android_c").click(function() {
		$(".android_c").attr('class', 'android_change');
		$(".ios_c").attr('class', 'ios_change');
	})
	$(".ios_c").click(function() {
		$(".android_change").attr('class', 'android_c');
		$(".ios_change").attr('class', 'ios_c');
	})
	$(".plat_c i").on("click", function() {
		$(this).addClass("on").end().siblings().removeClass("on")
	})

	$(".wx").click(function() {
		$(".mask3").css("display", "block");
	})

	$('.mask3').click(function() {
		$('.mask3').css('display', 'none');
	})

	var vedio_url = "/video/videosource.html";
	$(".video").click(function() {
		var uuid = $(this).attr("data-uid");
		var url = vedio_url + '?' + uuid;
		$("#video_tck").find('#player5').find("iframe").attr({
			src: url
		});
		$("#video_tck").show();
		$(".mask").show();
	});

	$("#video_tck #close").click(function() {
		$("#video_tck").hide();
		$(".mask").hide();
	})

//	$(".video").click(function (){
//		$(".video_bg").show();
//		$(".mask").show();
//	})
//	
//	$(".close_bg").click(function (){
//		$(".video_bg").hide();
//		$(".mask").hide();
//	})
})