$(function() {

	//滚动位置判断
	function showani(){
		$(".ani:not(.show-ani)").each(function(i,n){
			var offset=$(n).offset();
			var scrollY=window.pageYOffset || document.documentElement.scrollTop;
			if(scrollY > offset.top - document.documentElement.clientHeight + $(n).height()/2){
				$(n).addClass("show-ani");
			}
		})
	}
	$(window).scroll(function(e){
		showani();
	});
	showani();
});




