$(function() {
	$(".s_ul li:nth-child(1)").hover(function() {
		$(".fl_wx").stop().fadeIn();
	}, function() {
		$(".fl_wx").stop().fadeOut();
	});
});