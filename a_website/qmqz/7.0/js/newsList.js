
$(function(){
	
	$(".nav li").click(function(){
    	var index = $(this).attr("data-index");
    	changeShowContent($(".nav li"),$(".n2_list"),index);
    });
});
