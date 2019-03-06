function tankuang(movieSrc){
	var tankuangHtml = '<div class="cover"></div><div class="moviePlay"><div class="movieClose"><img src="./images/c.png"></div><div class="videos"><iframe border="0" marginwidth="0" framespacing="0" marginheight="0" src='+movieSrc+' frameborder="0" noresize="" scrolling="no" width="100%" height="100%" vspale="0" id="iframe_btn" name="iframe_btn"></iframe></div></div>';
	$("body").append(tankuangHtml);
	windowHidden();
	$(".con_play").on("click",function(e){
		e.stopPropagation();

		$(".cover").show();
		$(".moviePlay").show();
		
	});
	$(".movieClose,.cover").on("click",function(e){
		$(".cover").remove();
		$(".moviePlay").remove();
		windowScroll();
	})
	function windowHidden(){
  		$("html,body").css({
		   	"overflow":"hidden",
		   	"width":"100%",
		   	"height":"100%"
		});
  	};
  	function windowScroll(){
  		$("html,body").css({
		   	"overflow":"visible",
		   	"width":"100%",
		   	"height":"auto"
		});
  	};
}