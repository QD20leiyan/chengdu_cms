$(function(){
	$(".video_btn").click(function(){
		var link_url = $(this).attr('data-id');
		$("#player5").append('<embed class="vid_sp" src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'" type="application/x-shockwave-flash"></embed>');
 		$("#mask").show();
 		$('#video_tck').show();
 		$('#video_tck').trigger('play');
 	})
 	$("#close").click(function(){
 		$("#mask").hide();
 		$('#video_tck').hide();
 		$('#video_tck').trigger('pause');
 	})
 	$('.weixin_click').click(function(){
		$(".jiathis_button_weixin").click();
	})
	$('.sina_click').click(function(){
		$(".jiathis_button_tsina").click();
	})
	$('.zone_click').click(function(){
		$(".jiathis_button_qzone").click();
	})
	$(".tx_click").click(function(){
		$(".jiathis_button_tqq").click();
	})
})
