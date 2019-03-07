$(function (){
	var listNumber = 0;
	$(".top_list_nav").click(function (){
		if(listNumber %2 == 0){
			$(".list_select").stop().slideDown();
		} else {
			$(".list_select").stop().slideUp();
		}
		listNumber++;
	})
})
