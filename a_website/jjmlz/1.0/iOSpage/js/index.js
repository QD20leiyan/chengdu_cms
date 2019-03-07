$(function() {
	$("html").fitText(2);
	
	var vedio_url = "http://ca.yingxiong.com/video/videosource.html";
	$(".play").click(function() {
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
})