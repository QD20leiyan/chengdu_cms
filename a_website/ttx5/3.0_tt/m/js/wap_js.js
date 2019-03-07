$(function(){
	
 	//下拉
	$(".select_btn").click(function(){
		$(".select_info").slideToggle();
	})
	$(".select_info ul li").click(function(){
		var j=$(this).text();
		var i=$(this).index(); 
		$(".week_text").val(j); 
		$(".select_info").slideUp(); 
	})
})
