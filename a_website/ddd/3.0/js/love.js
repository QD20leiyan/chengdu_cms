$(function (){
	$(".download").hover(function (){
		$(".hover_code").css("display" , "block");
	},function (){
		$(".hover_code").css("display" , "none");
	});
	
	$(".hover_code").hover(function (){
		$(this).css("display" , "block");
	},function (){
		$(this).css("display" , "none");
	})
})
