$(function(){
	$(".links li").hover(function (){
		$(this).addClass('active');
	},function (){
		$(this).removeClass('active');
		$(".second").addClass("active");
	})
	
	$(".ico_wx").hover(function() {
		$(".ewm_wx").css("display", "block");
	}, function() {
		$(".ewm_wx").css("display", "none");
	})
	
	//关闭右侧二维码
	$(".close_btn").click(function (){
		$(".right_code").fadeOut();
	})
})
