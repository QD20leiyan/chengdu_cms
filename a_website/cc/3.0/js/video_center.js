$(document).ready(function() {
	var v_embed = '<embed id="myEmbed" src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high" width="640" height="360" align="middle" allowscriptaccess="always" flashvars="uu=58546ec681&vu=d36a4ff707&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash">';
	
	function init() {
		banner_init();
	}

	function banner_init() {
		var v_banner = $(".v_banner");
		var b_w = v_banner.width();
		v_banner.height(b_w * 0.192 + "px");
		banner.init(v_banner);
	}

	//点击视频弹出播放器
	$(".v_c_item ul li").click(function() {
		var videoSrc = $(this).attr("video-src");
		videoSrc = videoSrc + "&auto_play=1&gpcflag=1&width=640&height=360";
		$("#my_video").append(v_embed);
		$(".page_video_box").css({
			"display": "block",
			"opacity": "1",
			"transform": "scale(1,1)"
		});
		$("#my_video embed").attr("flashvars",videoSrc);
	});

	//点击取消弹窗视频
	$(".v_close").click(function() {
		var page_video_box = $(".page_video_box"); 
		page_video_box.css({
			"opacity": "0",
			"transform": "scale(0,0)"
		});
		setTimeout(function() {
			page_video_box.css({
				"display": "none"
			});
			$("#myEmbed").remove();
		}, 210);
	});

	init();
});